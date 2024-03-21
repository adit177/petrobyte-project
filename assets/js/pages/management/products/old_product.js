"use strict";

var PB_product_adding = function () {

  var formButtons;
  var formCards;
  var clickButton;
  var goBack;
  var add_product, cate_bar;

  var initForm = function () {

    clickButton.forEach((item) => {
      item.addEventListener('click', function () {
        console.log(item.value);
        formCards.classList.remove('d-none');
        formButtons.classList.add('d-none');
        formCards.querySelector('#' + item.value).classList.remove('d-none');
        switch (item.value) {
          case 'add_fuel':
            cate_bar.classList.add('d-none');
            add_product.classList.add('col-xxl-12');
            add_product.classList.add('col-xl-12');
            add_product.classList.add('col-lg-12');
            add_product.classList.add('col-md-12');
            break;

          case 'add_lubes':
            cate_bar.classList.add('d-none');
            add_product.classList.add('col-xxl-12');
            add_product.classList.add('col-xl-12');
            add_product.classList.add('col-lg-12');
            add_product.classList.add('col-md-12');
            $('#pb_product_lube_rp').repeater({
              initEmpty    : false,
              defaultValues: {
                'text-input': 'foo'
              },
              show         : function () {
                bootstrap_things();
                $(this).find('[data-kt-repeater="select2"]').select2();
                $(this).slideDown();
              },
              hide         : function (deleteElement) {
                $(this).slideUp(deleteElement);
              },
              ready        : function () {
                $('[data-kt-repeater="select2"]').select2();
              }
            });
            break;

          case 'add_goods':
            const id = "#pb_upload_customers";
            const dropzone = document.querySelector(id);

            var previewNode = dropzone.querySelector(".dropzone-item");
            previewNode.id = "";
            var previewTemplate = previewNode.parentNode.innerHTML;
            previewNode.parentNode.removeChild(previewNode);

            var myDropzone = new Dropzone(id, {
              url              : "https://star.petrobyte.app/index.php", // Set the url for your upload script location
              parallelUploads  : 1,
              maxFilesize      : .5, // Max filesize in MB
              previewTemplate  : previewTemplate,
              previewsContainer: id + " .dropzone-items",
              clickable        : id + " .dropzone-select"
            });

            myDropzone.on("addedfile", function (file) {
              const dropzoneItems = dropzone.querySelectorAll('.dropzone-item');
              dropzoneItems.forEach(dropzoneItem => {
                dropzoneItem.style.display = '';
              });
            });

            myDropzone.on("totaluploadprogress", function (progress) {
              const progressBars = dropzone.querySelectorAll('.progress-bar');
              progressBars.forEach(progressBar => {
                progressBar.style.width = progress + "%";
              });
            });

            myDropzone.on("sending", function (file) {
              const progressBars = dropzone.querySelectorAll('.progress-bar');
              progressBars.forEach(progressBar => {
                progressBar.style.opacity = "1";
              });
            });

            myDropzone.on("complete", function (progress) {
              const progressBars = dropzone.querySelectorAll('.dz-complete');

              setTimeout(function () {
                progressBars.forEach(progressBar => {
                  progressBar.querySelector('.progress-bar').style.opacity = "0";
                  progressBar.querySelector('.progress').style.opacity = "0";
                });
              }, 300);
            });
            break;

          case 'add_services':
            document.getElementById('pb_product_cate_bar').classList.add('d-none');
            add_product.classList.remove('col-lg-8');
            add_product.classList.remove('col-md-6');

            $('#pb_vehicle_repeat').repeater({
              initEmpty: false,
              show     : function () {
                $(this).find('[data-kt-repeater="select2"]').select2();
                $(this).slideDown();
              },

              hide : function (deleteElement) {
                $(this).slideUp(deleteElement);
              },
              ready: function () {
                $('[data-kt-repeater="select2"]').select2();
              }
            });

            break;
        }
      })
    });

    goBack.forEach((item) => {
      item.addEventListener('click', function () {
        document.getElementById('pb_product_cate_bar').classList.remove('d-none');
        add_product.classList.remove('col-xxl-12');
        add_product.classList.remove('col-xl-12');
        add_product.classList.remove('col-lg-12');
        add_product.classList.remove('col-md-12');
        // add_product.classList.add('col-lg-8');
        // add_product.classList.add('col-md-6');
        formCards.classList.add('d-none');
        formButtons.classList.remove('d-none');
        formCards.querySelector('#' + item.value).classList.add('d-none');
      })
    });
  }

  return {
    // Public functions
    init: function () {
      add_product = document.getElementById('add_product_page');
      if (!add_product) return;
      // Basic int table
      cate_bar = document.getElementById('pb_product_cate_bar');
      formButtons = document.querySelector('#product_adding_buttons');
      formCards = document.querySelector('#product_adding_forms');
      goBack = document.getElementsByClassName('goBack');

      // custom int table
      clickButton = formButtons.querySelectorAll('button');

      // element = document.querySelector('#pb_cust_custom_interest');
      // form = element.querySelector('#pb_cust_custom_interest_form');
      // submitButton = form.querySelector('#pb_cust_custom_interest_submit');
      // cancelButton = form.querySelector('#pb_cust_custom_interest_cancel');


      initForm();
    }
  };
}();


var PB_product_fuel_adding = function () {
  // Elements
  var stepper;
  var form;
  var formSubmitButton;
  var formContinueButton;
  var formBackButton;

  // data
  const items = new Map([
    ['Diesel', ['HSD', '27101944']],
    ['Petrol', ['MS', '27101241']],
    ['Speed', ['SPD', '2710']],
    ['Power', ['PW', '2710']],
    ['XGreen', ['XG', '2710']],
    ['CNG', ['CNG', '2710']],
  ]);
  var tank_no, pump_no, ic, it;
  var mpd = [];
  var guns_no = [];

  // Variables
  var stepperObj;
  var validations = [];

  // template
  var tankTemplate, pumpTemplate, nozzleTemplate, gunTemplate;
  var tanks, pumps, nozzles, templates;
  var tank, pump, nozzle, gun;
  var item_sts = false;
  var tank_sts = false;
  var pump_sts = false;
  var nozzle_sts = false;

  // Private Functions
  var initStepper = function () {
    // Initialize Stepper
    stepperObj = new KTStepper(stepper);
    if (stepperObj.getCurrentStepIndex() === 1) {
      if (!item_sts) createItem();
    }
    // Stepper change event(handle hiding submit button for the last step)
    stepperObj.on('kt.stepper.changed', function (stepper) {
      switch (stepperObj.getCurrentStepIndex()) {

        case 1:
          formSubmitButton.classList.add('d-inline-block');
          formSubmitButton.classList.add('d-none');
          formContinueButton.classList.remove('d-none');
          break;
        case 2:
          formSubmitButton.classList.add('d-inline-block');
          formSubmitButton.classList.add('d-none');
          formContinueButton.classList.remove('d-none');
          // create tanks rows
          if (!tank_sts) createTanks(tank_no);
          // validations
          setTimeout(function () {
            initValidation();
          }, 101)
          break;
        case 3:
          formSubmitButton.classList.add('d-inline-block');
          formSubmitButton.classList.add('d-none');
          formContinueButton.classList.remove('d-none');
          // create pumps rows
          if (!pump_sts) createPumps(pump_no, tank_no);
          break;
        case 4:
          formSubmitButton.classList.remove('d-none');
          formSubmitButton.classList.add('d-inline-block');
          formContinueButton.classList.add('d-none');
          // create nozzles rows
          if (!nozzle_sts) createGuns(guns_no, pump_no);
          break;
        case 5:
          formBackButton.classList.add('d-none');
          formSubmitButton.classList.add('d-none');
          formContinueButton.classList.add('d-none');
          break;
      }
    });

    // Validation before going to next page
    stepperObj.on('kt.stepper.next', function (stepper) {
      console.log('stepper.next');

      // Validate form before change stepper step
      var validator = validations[stepper.getCurrentStepIndex() - 1]; // get validator for current step

      console.log(validator);

      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status === 'Valid') {
            stepper.goNext();

            //KTUtil.scrollTop();
          }
          else {
            // Show error message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
              text             : "Sorry, fill the required fields",
              icon             : "error",
              buttonsStyling   : false,
              confirmButtonText: "Ok, got it!",
              customClass      : {
                confirmButton: "btn btn-light"
              }
            }).then(function () {
              KTUtil.scrollTop();
            });
          }
        });
      }
      else {
        stepper.goNext();
        KTUtil.scrollTop();
      }
    });

    // Prev event
    stepperObj.on('kt.stepper.previous', function (stepper) {
      console.log('stepper.previous');

      stepper.goPrevious();
      KTUtil.scrollTop();
    });

    formSubmitButton.addEventListener('click', function (e) {
      // Validate form before change stepper step
      var validator = validations[3]; // get validator for last form

      validator.validate().then(function (status) {
        console.log('validated!');

        if (status === 'Valid') {
          // Prevent default button action
          e.preventDefault();

          // Disable button to avoid multiple click
          formSubmitButton.disabled = true;

          // Show loading indication
          formSubmitButton.setAttribute('data-kt-indicator', 'on');

          // Simulate form submission
          setTimeout(function () {
            // Hide loading indication
            formSubmitButton.removeAttribute('data-kt-indicator');

            // Enable button
            formSubmitButton.disabled = false;

            stepperObj.goNext();
            //KTUtil.scrollTop();
          }, 2000);
        }
        else {
          Swal.fire({
            text             : "Sorry, fill the all required fields",
            icon             : "error",
            buttonsStyling   : false,
            confirmButtonText: "Ok, got it!",
            customClass      : {
              confirmButton: "btn btn-light"
            }
          }).then(function () {
            KTUtil.scrollTop();
          });
        }
      });
    });
  }

  var initCustom = function () {
    // tanks
    var nos_tanks = form.querySelectorAll('[name="tanks"]');
    nos_tanks.forEach((tank => {
      tank.addEventListener('click', function (e) {
        if (tank_sts) {
          tank_sts = false;
          // remove child.
          var tank_node = tanks.querySelectorAll('[data-pb-nature="added"]');
          // console.log(pump_node);
          tank_node.forEach(function callback(value, index) {
            // console.log(value);
            tanks.removeChild(tank_node[index]);
          });
        }
        // get new values
        tank_no = tank.value;
      });
    }))
    // pumps
    var nos_pumps = form.querySelectorAll('[name="pumps"]');
    nos_pumps.forEach((pump => {
      pump.addEventListener('click', function (e) {
        if (pump_sts) {
          pump_sts = false;
          // remove child.
          var pump_node = pumps.querySelectorAll('[data-pb-nature="added"]');
          // console.log(pump_node);
          pump_node.forEach(function callback(value, index) {
            // console.log(value);
            pumps.removeChild(pump_node[index]);
          });
        }
        if (nozzle_sts) {
          console.log('delete nozzle_sts');
          nozzle_sts = false;
          // remove child.
          var noz_node = nozzles.querySelectorAll('[data-pb-nature="added"]');
          console.log(noz_node);
          noz_node.forEach(function callback(value, index) {
            console.log(value);
            nozzles.removeChild(noz_node[index]);
          });
        }
        // get new values
        pump_no = pump.value;
      });
    }))
  }

  // create things
  const createItem = function () {
    tagify_item_s1();
    item_sts = true;
  }
  const createTanks = function (t) {
    var inputs;
    var input_names = ['name', 'size', 'dia', 'len'];
    for (let i = 1; i <= t; i++) {
      tank = tankTemplate.cloneNode(true);
      tank.classList.remove('d-none');
      tank.querySelector('[data-pb-element="tank_sno"]').innerText = it + ' Tank: ' + i;
      inputs = tank.querySelectorAll('input');
      inputs.forEach((value, index) => {
        value.setAttribute('name', 'tanks[' + i + '][' + input_names[index] + ']');
      })
      // console.log(inputs);
      tank.setAttribute('data-pb-nature', 'added'); // for deleteElement
      tanks.appendChild(tank);
      // tagify
      tagify_tank_s2(inputs, i);
      tank.scrollTop = tank.scrollHeight;
    }
    tank_sts = true
  }
  const createPumps = function (p, t) {
    var inputs;
    var input_names = ['pump_no', 'mpd_name', 'joined_tank', 'guns'];
    const t_wl = [];
    for (let i = 1; i <= t; i++) {
      t_wl.push('TANK-' + i)
    }
    for (let j = 1; j <= p; j++) {
      pump = pumpTemplate.cloneNode(true);
      pump.classList.remove('d-none');
      pump.querySelector('[name="pump_sno"]').value = 'PUMP: ' + j;
      pump.querySelector('[data-pb-label="guname"]').innerText = it + ' Nozzles';
      inputs = pump.querySelectorAll('input');
      // console.log(inputs);
      inputs.forEach((value, index) => {
        value.setAttribute('name', 'pumps[' + j + '][' + input_names[index] + ']')
      })

      // console.log(inputs);
      pump.setAttribute('data-pb-nature', 'added'); // for deleteElement
      pumps.appendChild(pump);
      // tagify
      tagify_pump_s3(inputs, j, t_wl);
      pump.scrollTop = pump.scrollHeight;
    }
    pump_sts = true
  }
  const createGuns = function (g, p) {
    var input, iname, gun_node;
    // gun
    gunTemplate = templates.querySelector('[data-pb-element="template-gun"]');

    // nozzles
    for (let i = 1; i <= p; i++) {
      nozzle = nozzleTemplate.cloneNode(true);
      nozzle.classList.remove('d-none');
      nozzle.querySelector('[name="mpd_pump"]').value = mpd[i];
      nozzle.querySelector('[data-pb-label="nozzle"]').innerText = 'MPD PUMP : ' + i;
      gun_node = nozzle.querySelector('[data-pb-element="add-guns"]');
      for (let j = 1; j <= g[i]; j++) {
        gun = gunTemplate.cloneNode(true);
        gun.classList.remove('d-none');
        gun.querySelector('[data-pb-label="gun"]').innerText = it + ' Nozzle - ' + i + ' - ' + j;
        input = gun.querySelector('input');
        iname = '[' + i + '][' + j + ']';
        input.setAttribute('name', 'gun' + iname);
        gun_node.appendChild(gun);
        tagify_gun_s4(input, i, j);
      }
      nozzle.setAttribute('data-pb-nature', 'added'); // for deleteElement
      nozzles.appendChild(nozzle);
    }
    // adding guns into mpd rows
    nozzle_sts = true;
  }

  const tagify_item_s1 = function () {
    var form_inputs = form.querySelectorAll('input');
    var tagify_obj;
    // product names
    tagify_obj = new Tagify(form_inputs[0], {
      whitelist: ["Diesel", "Petrol", "Speed", "Power", "XGreen", "CNG"],
      // blacklist: [],
      enforceWhitelist: true,
      mode            : "select",
      maxTags         : 1,
      dropdown        : {
        maxItems      : 7,
        classname     : "color-blue",
        enabled       : 0,
        closeOnSelect : true,
        position      : "full",
        highlightFirst: false
      }
    })

    tagify_obj.on('add', onAddTag)

    function onAddTag(e) {
      form_inputs[1].value = '';
      form_inputs[2].value = '';
      it = e.detail.data.value;
      ic = items.get(e.detail.data.value)[0];
      form_inputs[1].value = items.get(e.detail.data.value)[0];
      form_inputs[2].value = items.get(e.detail.data.value)[1];
      form.querySelectorAll('[data-pb-label]').forEach((labels) => {
        switch (labels.getAttribute('data-pb-label')) {
          case 'tax':
            labels.innerHTML = 'VAT on ' + it;
            break;
          case 'tanks':
            labels.innerHTML = 'Number of ' + it + ' Tanks';
            break;
          case 'pumps':
            labels.innerHTML = 'Number of ' + it + ' Linked MPD Pump';
            break;
        }
      })
    }

    /*
     tagify_obj.DOM.input.addEventListener('focus', onSelectFocus)
     function onSelectFocus(e) {
     console.log(e)
     }
     tagify_obj.on("dropdown:select", function () {
     console.log(input);
     input.blur();
     });
     */
  }
  const tagify_tank_s2 = function (input, sno) {
    new Tagify(input[0], {
      whitelist: [ic + "-T-" + sno, ic + "-xxKL-" + sno, ic + "-TANK-" + sno, "TANK-" + ic, ic + "-TANK", "TANK-" + sno, ic + "-xxKL"],
      maxTags  : 1,
      dropdown : {
        maxItems     : 7,
        classname    : "tagify__inline__suggestions",
        enabled      : 0,
        closeOnSelect: true
      }
    });
    // tank capacity
    new Tagify(input[1], {
      whitelist: ["15000", "20000", "24000", "30000", "40000", "50000", "70000", "80000"],
      maxTags  : 1,
      dropdown : {
        maxItems     : 7,
        classname    : "tagify__inline__suggestions",
        enabled      : 0,
        closeOnSelect: true
      }
    });
  }
  const tagify_pump_s3 = function (input, sno, t_wl) {

    // MPD Name selection
    var tag_1 = new Tagify(input[1], {
      whitelist: ["MPD-" + sno, "PUMP-" + sno, "POINT-" + sno],
      maxTags  : 1,
      dropdown : {
        maxItems     : 3,
        classname    : "",
        enabled      : 0,
        closeOnSelect: true
      }
    });
    tag_1.on('add', onAddTag_name);

    function onAddTag_name(e) {
      // mpd name collect
      mpd[sno] = e.detail.data.value;
      // mpd rows alteration
      if (nozzle_sts) {
        nozzle_sts = false;
        // remove child.
        var noz_node = nozzles.querySelectorAll('[data-pb-nature="added"]');
        // console.log(pump_node);
        noz_node.forEach(function callback(value, index) {
          // console.log(value);
          nozzles.removeChild(noz_node[index]);
        });
      }
    }

    // tank selection
    new Tagify(input[2], {
      whitelist       : t_wl,
      enforceWhitelist: true,
      mode            : "select",
      maxTags         : 1,
      dropdown        : {
        maxItems     : 7,
        classname    : "",
        enabled      : 0,
        closeOnSelect: true
      }
    });
    // nozzles numbers
    var tag_3 = new Tagify(input[3], {
      whitelist       : [" 1 ", " 2 ", " 3 ", " 4 ", " 5 ", " 6 ", " 7 ", " 8 ", " 9 ", " 10 "],
      enforceWhitelist: true,
      mode            : "select",
      maxTags         : 1,
      dropdown        : {
        maxItems     : 9,
        classname    : "tagify__inline__suggestions",
        enabled      : 0,
        closeOnSelect: true
      }
    })
    tag_3.on('add', onAddTag_num);

    function onAddTag_num(e) {
      // collect the nozzles number
      guns_no[sno] = e.detail.data.value;
      // delete element on changed.
      if (nozzle_sts) {
        console.log('delete nozzle_sts');
        nozzle_sts = false;
        // remove child.
        var noz_node = nozzles.querySelectorAll('[data-pb-nature="added"]');
        console.log(noz_node);
        noz_node.forEach(function callback(value, index) {
          console.log(value);
          nozzles.removeChild(noz_node[index]);
        });
      }

      // console.log(guns_no);
    }

  }
  const tagify_gun_s4 = function (input, i, j) {
    new Tagify(input, {
      whitelist: [
        'GUN-' + i + '-' + j,
        'GUN-' + i + j,
        ic + "-N-" + i + '-' + j,
        ic + "-" + i + j,
      ],
      // enforceWhitelist: true,
      // mode: "select",
      maxTags : 1,
      dropdown: {
        maxItems     : 7,
        classname    : "",
        enabled      : 0,
        closeOnSelect: true
      }
    });
  }


  var initValidation = function () {

    // Step 1
    validations.push(FormValidation.formValidation(
      form,
      {
        fields : {
          name : {
            validators: {
              notEmpty: {
                message: 'Item Name is Required'
              }
            }
          },
          tax  : {
            validators: {
              notEmpty    : {
                message: 'VAT Rate is required'
              },
              digits      : {
                message: 'VAT Rate must contain only digits'
              },
              stringLength: {
                min    : 1,
                max    : 50,
                message: 'VAT should '
              }
            }
          },
          tanks: {
            validators: {
              notEmpty: {
                message: 'Number of Item Tanks is required'
              }
            }
          },
          pumps: {
            validators: {
              notEmpty: {
                message: 'Number of MPD (Pump) is required'
              }
            }
          }
        },
        plugins: {
          trigger  : new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector    : '.fv-row',
            eleInvalidClass: '',
            eleValidClass  : ''
          })
        }
      }
    ));

    // Step 2
    validations.push(FormValidation.formValidation(
      document.querySelector('#pb_fuel_adding_form'),
      {
        fields : {
          'tanks[1][name]': {
            validators: {
              notEmpty: {
                message: 'Database name is required'
              }
            }
          },
          'tanks[1][size]': {
            validators: {
              notEmpty: {
                message: 'Tank Capacity is required'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          // Bootstrap Framework Integration
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector    : '.fv-row',
            eleInvalidClass: '',
            eleValidClass  : ''
          })
        }
      }
    ));

    // Step 3
    validations.push(FormValidation.formValidation(
      document.querySelector('#pb_fuel_adding_form'),
      {
        fields : {
          pump_no    : {
            validators: {
              notEmpty: {
                message: 'Pump Number is required'
              }
            }
          },
          mpd_name   : {
            validators: {
              notEmpty: {
                message: 'MPD Name is required'
              }
            }
          },
          joined_tank: {
            validators: {
              notEmpty: {
                message: 'Connected Tank is required'
              }
            }
          },
          guns       : {
            validators: {
              notEmpty: {
                message: 'Total ' + it + ' Guns are required'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          // Bootstrap Framework Integration
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector    : '.fv-row',
            eleInvalidClass: '',
            eleValidClass  : ''
          })
        }
      }
    ));

    // Step 4
    validations.push(FormValidation.formValidation(
      document.querySelector('#pb_fuel_adding_form'),
      {
        fields: {
          'mpd_pump' : {
            validators: {
              notEmpty: {
                message: 'Name on card is required'
              }
            }
          },
          'gun[1][1]': {
            validators: {
              notEmpty: {
                message: 'Card member is required'
              },
            }
          },
        },

        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          // Bootstrap Framework Integration
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector    : '.fv-row',
            eleInvalidClass: '',
            eleValidClass  : ''
          })
        }
      }
    ));
  }

  return {
    // Public Functions
    init: function () {
      stepper = document.querySelector('#pb_fuel_adding_stepper');
      if (!stepper) {
        return;
      }
      form = document.querySelector('#pb_fuel_adding_form');
      formBackButton = stepper.querySelector('[data-kt-stepper-action="previous"]');
      formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
      formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');
      // template
      templates = document.querySelector('[data-pb-element="templates"]');
      tankTemplate = templates.querySelector('[data-pb-element="template-tank"]');
      pumpTemplate = templates.querySelector('[data-pb-element="template-pump"]');
      nozzleTemplate = templates.querySelector('[data-pb-element="template-nozzle"]');
      // tanks
      tanks = document.querySelector('[data-pb-element="tanks"]')
      // pumps
      pumps = document.querySelector('[data-pb-element="pumps"]')
      // nozzles
      nozzles = document.querySelector('[data-pb-element="nozzles"]')


      initStepper();
      initCustom();
      initValidation();
    }
  };
}();

export const PB_product_category = function () {
  // Shared variables
  var table;
  var datatable;

  // Private functions
  var initDatatable = function () {
    // Init datatable --- more info on datatables: https://datatables.net/manual/
    datatable = $(table).DataTable({
      "info"      : false,
      'order'     : [],
      'pageLength': 10,
      'columnDefs': [
        {
          orderable: false,
          targets  : 6
        }, // Disable ordering on column 3 (actions)
      ]
    });

    // Re-init functions on datatable re-draws
    datatable.on('draw', function () {
      handleDeleteRows();
    });
  }

  // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
  var handleSearchDatatable = () => {
    const filterSearch = document.querySelector('[data-pb-porduct-category="search"]');
    filterSearch.addEventListener('keyup', function (e) {
      datatable.search(e.target.value).draw();
    });
  }

  // Delete cateogry
  var handleDeleteRows = () => {
    // Select all delete buttons
    const deleteButtons = table.querySelectorAll('[data-pb-porduct-category="delete_row"]');

    deleteButtons.forEach(d => {
      // Delete button on click
      d.addEventListener('click', function (e) {
        e.preventDefault();

        // Select parent row
        const parent = e.target.closest('tr');

        // Get category name
        const categoryName = parent.querySelector('[data-pb-porduct-category="category_name"]').innerText;

        // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
        Swal.fire({
          text             : "Are you sure you want to delete " + categoryName + "?",
          icon             : "warning",
          showCancelButton : true,
          buttonsStyling   : false,
          confirmButtonText: "Yes, delete!",
          cancelButtonText : "No, cancel",
          customClass      : {
            confirmButton: "btn fw-bold btn-danger",
            cancelButton : "btn fw-bold btn-active-light-primary"
          }
        }).then(function (result) {
          if (result.value) {
            Swal.fire({
              text             : "You have deleted " + categoryName + "!.",
              icon             : "success",
              buttonsStyling   : false,
              confirmButtonText: "Ok, got it!",
              customClass      : {
                confirmButton: "btn fw-bold btn-primary",
              }
            }).then(function () {
              // Remove current row
              datatable.row($(parent)).remove().draw();
            });
          }
          else if (result.dismiss === 'cancel') {
            Swal.fire({
              text             : categoryName + " was not deleted.",
              icon             : "error",
              buttonsStyling   : false,
              confirmButtonText: "Ok, got it!",
              customClass      : {
                confirmButton: "btn fw-bold btn-primary",
              }
            });
          }
        });
      })
    });
  }


  // Public methods
  return {
    init: function () {
      table = document.querySelector('#pb_product_category');

      if (!table) {
        return;
      }

      initDatatable();
      handleSearchDatatable();
      handleDeleteRows();
    }
  };
}();

export const PB_product_lubes = function () {
  // Shared variables
  var table;
  var datatable;

  // Private functions
  var initDatatable = function () {
    // Init datatable --- more info on datatables: https://datatables.net/manual/
    datatable = $(table).DataTable({
      "info"      : false,
      'order'     : [],
      'pageLength': 10,
      'columnDefs': [
        {
          render : function (data, type, row) {
            if (type === 'filter' || type === 'type' || type === 'sort') {
              return data; // data-order="x"
            }
            if (data <= 0) {
              return "<span class='badge badge-light-danger'>Zero</span><span class='fw-bold text-danger ms-3'>" + data + "<br><small class='fs-8'>" + row[9] + "</small></span>";
            }
            else if (data <= 10) {
              return "<span class='badge badge-light-warning'>Low</span><span class='fw-bold text-warning ms-3'>" + data + "<br><small class='fs-8'>" + row[9] + "</small></span>";
            }
            else {
              return "<span class='fw-bold ms-3'>" + data + "<br><small class='fs-8'>" + row[9] + "</small></span>";
            }
          },
          targets: [3]
        },
        {
          render : function (data, type, row) {
            if (type === 'filter' || type === 'type' || type === 'sort') {
              return data;
            }
            console.log(data);
            switch (data) {
              case '0':
                return "<span class='badge badge-light-danger'>Disabled</span>";
              case '1':
                return "<span class='badge badge-light-success'>Enabled</span>";
            }
          },
          targets: 7
        },
        {
          render : DataTable.render.number(',', '.', 2),
          targets: [4]
        },
        {
          render : DataTable.render.number(',', '.', 0),
          targets: [5]
        },
        {
          render : function (data, type, row) {
            if (type === 'filter' || type === 'type' || type === 'sort') {
              return row[6];
            }
            return render_into_Currency(row[6], 0, 1);
          },
          targets: 6
        },
        {
          orderable: false,
          targets  : 0
        },
        {
          visible: false,
          targets: 9
        },
        {
          orderable: false,
          targets  : 8
        },
      ],
    });

    // Re-init functions on datatable re-draws
    datatable.on('draw', function () {
      handleDeleteRows();
    });
  }

  // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
  var handleSearchDatatable = () => {
    const filterSearch = document.querySelector('[data-pb-product-lube-filter="search"]');
    filterSearch.addEventListener('keyup', function (e) {
      datatable.search(e.target.value).draw();
    });
  }

  // Handle status filter dropdown
  var handleStatusFilter = () => {
    const filterStatus = document.querySelector('[data-pb-product-lube-filter="status"]');
    $(filterStatus).on('change', e => {
      let value = e.target.value;
      if (value === 'all') {
        value = '';
      }
      datatable.column(7).search(value).draw();
    });
  }

  // Delete category
  var handleDeleteRows = () => {
    // Select all delete buttons
    const deleteButtons = table.querySelectorAll('[data-pb-product-lube-filter="delete_row"]');

    deleteButtons.forEach(d => {
      // Delete button on click
      d.addEventListener('click', function (e) {
        e.preventDefault();

        // Select parent row
        const parent = e.target.closest('tr');

        // Get category name
        const productName = parent.querySelector('[data-pb-product-lube-filter="product_name"]').innerText;

        // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
        Swal.fire({
          text             : "Are you sure you want to delete " + productName + "?",
          icon             : "warning",
          showCancelButton : true,
          buttonsStyling   : false,
          confirmButtonText: "Yes, delete!",
          cancelButtonText : "No, cancel",
          customClass      : {
            confirmButton: "btn fw-bold btn-danger",
            cancelButton : "btn fw-bold btn-active-light-primary"
          }
        }).then(function (result) {
          if (result.value) {
            Swal.fire({
              text             : "You have deleted " + productName + "!.",
              icon             : "success",
              buttonsStyling   : false,
              confirmButtonText: "Ok, got it!",
              customClass      : {
                confirmButton: "btn fw-bold btn-primary",
              }
            }).then(function () {
              // Remove current row
              datatable.row($(parent)).remove().draw();
            });
          }
          else if (result.dismiss === 'cancel') {
            Swal.fire({
              text             : productName + " was not deleted.",
              icon             : "error",
              buttonsStyling   : false,
              confirmButtonText: "Ok, got it!",
              customClass      : {
                confirmButton: "btn fw-bold btn-primary",
              }
            });
          }
        });
      })
    });
  }


  // Public methods
  return {
    init: function () {
      table = document.querySelector('#pb_product_lube_table');

      if (!table) {
        return;
      }

      initDatatable();
      handleSearchDatatable();
      handleStatusFilter();
      handleDeleteRows();
    }
  };
}();


// On document ready
KTUtil.onDOMContentLoaded(function () {

  // forms
  PB_product_adding.init();

  // add petroleum fuel
  PB_product_fuel_adding.init();

  // product categories
  PB_product_category.init();

  // lubricant product
  PB_product_lubes.init();

});