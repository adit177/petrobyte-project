"use strict";

var PB_employ_detail = function () {

  var editUser_btn;
  var editUser_form;
  var editOther_btn;
  var editOther_form;
  var clickButton;
  var goBack;
  var emp_setting;

  var fi, fs, fb;

  var initForm = function () {

    editUser_btn.addEventListener('click', function () {
      fi = editUser_form.querySelectorAll("input");
      fi.forEach((item) => {
        item.disabled = false;
      });
      fs = editUser_form.querySelectorAll("select");
      fs.forEach((item) => {
        item.disabled = false;
      });
      editUser_form.querySelector('.card-footer').classList.remove('d-none');
      editUser_btn.classList.add('d-none');
    })

    editOther_btn.addEventListener('click', function () {
      fi = editOther_form.querySelectorAll("input");
      fi.forEach((item) => {
        item.disabled = false;
      });
      fi = editOther_form.querySelectorAll("select");
      fi.forEach((item) => {
        item.disabled = false;
      });
      fb = editOther_form.querySelectorAll("button");
      fb.forEach((item) => {
        item.disabled = false;
        item.classList.remove('d-none');
      });
      editOther_btn.classList.add('d-none');
    });
  }

  return {
    // Public functions
    init: function () {

      emp_setting = document.getElementById('pb_employ_setting');
      if (!emp_setting) return;

      // Basic int table
      editUser_btn = document.querySelector('#pb_edit_employ_basic_detail');
      editUser_form = document.querySelector('#pb_employ_basic_detail');

      editOther_btn = document.querySelector('#edit_employ_other_detail');
      editOther_form = document.querySelector('#pb_employ_other_details');

      // formCards = document.querySelector('#customer_adding_forms');
      // goBack = document.getElementsByClassName('goBack');

      // custom int table
      // clickButton = formButtons.querySelectorAll('button');

      // element = document.querySelector('#pb_cust_custom_interest');
      // form = element.querySelector('#pb_cust_custom_interest_form');
      // submitButton = form.querySelector('#pb_cust_custom_interest_submit');
      // cancelButton = form.querySelector('#pb_cust_custom_interest_cancel');


      initForm();
    }
  };
}();

var PB_account_deactivate = function () {
  // Private variables
  var form;
  var validation;
  var submitButton;

  // Private functions
  var accountValidation = function () {
    var do_i_deactive;
    var ac_values = form.querySelectorAll('.deactivate_values');

    // due balance
    if ((ac_values[0].innerText) !== '0') {
      swal.fire({
        titleText: 'Salary is Due',
        text: "This account has " + ac_values[0].innerText + " Amount to be Paid",
        icon: "warning",
        buttonsStyling: false,
        showDenyButton: true,
        confirmButtonText: "Take me to Payments",
        denyButtonText: 'cancel this',
        customClass: {
          confirmButton: "btn btn-light-primary",
          denyButton: "btn btn-danger"
        }
      }).then((result) => {
        if (result.isConfirmed) {
          do_i_deactive = false;
          Swal.fire({
            text: 'Account deactivation required has submitted',
            icon: 'success',
            confirmButtonText: "Ok",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-light-primary"
            }
          })
        }
        else if (result.isDenied) {
          do_i_deactive = true;
          Swal.fire({
            text: 'Account is ready for deactivate',
            icon: 'info',
            confirmButtonText: "Ok",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-light-primary"
            }
          })
        }
      });
    }

    return do_i_deactive ?? true;

  }

  var formSubmission = function () {
    console.log('i called');
    swal.fire({
      text: "Are you sure you would like to deactivate your account?",
      icon: "warning",
      buttonsStyling: false,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: 'No',
      customClass: {
        confirmButton: "btn btn-light-primary",
        denyButton: "btn btn-danger"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'Account deactivation required has submitted',
          icon: 'success',
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-light-primary"
          }
        })
      }
      else if (result.isDenied) {
        Swal.fire({
          text: 'Account not deactivated.',
          icon: 'info',
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-light-primary"
          }
        })
      }
    });
  }

  var initValidation = function () {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validation = FormValidation.formValidation(
      form,
      {
        fields: {
          deactivate: {
            validators: {
              notEmpty: {
                message: 'Please check the box to deactivate your account'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          submitButton: new FormValidation.plugins.SubmitButton(),
          //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',
            eleValidClass: ''
          })
        }
      }
    );
  }

  var handleForm = function () {
    submitButton.addEventListener('click', function (e) {
      e.preventDefault();

      validation.validate().then(function (status) {
        if (status === 'Valid') {

          // level - 1
          // quick account validation
          if (accountValidation()) {
            formSubmission(); // take this function into the account validation.
          }

        }
        else {
          swal.fire({
            text: "Sorry, looks like there are some errors detected, please try again.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-light-primary"
            }
          });
        }
      });
    });
  }

  // Public methods
  return {
    init: function () {

      form = document.querySelector('#pb_employee_ac_deactivate');

      if (!form) return;
      submitButton = document.querySelector('#pb_do_deactive_employee');

      initValidation();
      handleForm();
    }
  }
}();

var KTCreateAccount = function () {
  // Elements
  var modal;
  var modalEl;

  var stepper;
  var form;
  var formSubmitButton;
  var formContinueButton;

  // Variables
  var stepperObj;
  var validations = [];

  // Private Functions
  var initStepper = function () {
    // Initialize Stepper
    stepperObj = new KTStepper(stepper);

    // Stepper change event
    stepperObj.on('kt.stepper.changed', function (stepper) {
      if (stepperObj.getCurrentStepIndex() === 3) {
        formSubmitButton.classList.remove('d-none');
        formSubmitButton.classList.add('d-inline-block');
        formContinueButton.classList.add('d-none');
      }
      else if (stepperObj.getCurrentStepIndex() === 4) {
        formSubmitButton.classList.add('d-none');
        formContinueButton.classList.add('d-none');
      }
      else {
        formSubmitButton.classList.remove('d-inline-block');
        formSubmitButton.classList.remove('d-none');
        formContinueButton.classList.remove('d-none');
      }
    });

    // Validation before going to next page
    stepperObj.on('kt.stepper.next', function (stepper) {
      console.log('stepper.next');

      // Validate form before change stepper step
      var validator = validations[stepper.getCurrentStepIndex() - 1]; // get validator for current step

      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status === 'Valid') {
            stepper.goNext();

            KTUtil.scrollTop();
          }
          else {
            Swal.fire({
              text: "Sorry, looks like form is incomplete.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
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
  }

  var handleForm = function () {
    formSubmitButton.addEventListener('click', function (e) {

      console.log(validations);
      var validator = validations[2]; // get validator for last form

      validator.validate().then(function (status) {
        console.log('validated!');

        if (status === 'Valid') {

          e.preventDefault();

          formSubmitButton.disabled = true;

          formSubmitButton.setAttribute('data-kt-indicator', 'on');

          swal.fire({
            titleText: 'Submitting...',
            text: 'Please wait until confirmation',
            timer: 10000,
            didOpen: () => {
              Swal.showLoading()
            },
            timerProgressBar: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            buttonsStyling: false,
            color: '#ff4040',
            background: '#ececec',
            confirmButtonText: "Ok, Got it!",
            customClass: {
              confirmButton: "btn btn-light"
            }
          });

          // Simulate form submission
          setTimeout(function () {
            // Hide loading indication
            formSubmitButton.removeAttribute('data-kt-indicator');

            // Enable button
            formSubmitButton.disabled = false;

            stepperObj.goNext();
            form.submit();

          }, 1000);

        }
        else {
          Swal.fire({
            text: "Sorry, looks like form is incomplete.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-light"
            }
          }).then(function () {
            KTUtil.scrollTop();
          });
        }
      });
    });
  }

  var initValidation = function () {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    // Step 1 - type
    validations.push(FormValidation.formValidation(
      form,
      {
        fields: {
          emp_role: {
            validators: {
              notEmpty: {
                message: 'Employee Account type is required'
              }
            }
          },
          joining: {
            validators: {
              notEmpty: {
                message: 'Joining Month is required to start Payroll'
              }
            }
          },
          allow_absents: {
            validators: {
              notEmpty: {
                message: 'Allowed Absents is required'
              }
            }
          }

        },

        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',
            eleValidClass: ''
          })
        }
      }
    ));

    // Step 2 - detail
    validations.push(FormValidation.formValidation(
      form,
      {
        fields: {
          // not validation because of form repeater
          'account_name': {
            validators: {
              notEmpty: {
                message: 'Name of Employee is required'
              }
            }
          },
          'mobile_number': {
            validators: {
              digits: {
                message: 'Mobile should be 10 digits'
              },
            }
          },
          'nett_salary': {
            validators: {
              notEmpty: {
                message: 'Net Salary is required'
              },
            }
          },
          'due_salary': {
            validators: {
              notEmpty: {
                message: 'Due Salary is required'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          // Bootstrap Framework Integration
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',
            eleValidClass: ''
          })
        }
      }
    ));

    // Step 3 - payroll
    validations.push(FormValidation.formValidation(
      form,
      {
        fields: {
          'absent_rule': {
            validators: {
              notEmpty: {
                message: 'Name on card is required'
              }
            }
          },
          'add_absents': {
            validators: {
              notEmpty: {
                message: 'Absent Method is Required'
              },
            }
          },
          'add_colldif': {
            validators: {
              notEmpty: {
                message: 'Collection method is Required'
              }
            }
          },
        },

        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          // Bootstrap Framework Integration
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',
            eleValidClass: ''
          })
        }
      }
    ));
  }

  var initSlider = function () {
    var budgetSlider = document.querySelector("#pb_emp_ac_absent_slider_bar");
    var budgetValue = document.querySelector("#pb_emp_ac_absent_slider_label");

    noUiSlider.create(budgetSlider, {
      start: [4],
      connect: true,
      range: {
        "min": 1,
        "max": 15
      }
    });

    budgetSlider.noUiSlider.on("update", function (values, handle) {
      budgetValue.innerHTML = Math.round(values[handle]);
      document.getElementById('allow_absents').value = Math.round(values[handle]);
    });
  }

  var intiRepeater = function () {
    $('#pb_employ_add_form_repeater').repeater({
      initEmpty: false,

      defaultValues: {
        'text-input': 'foo'
      },

      show: function () {
        bootstrap_things();
        $(this).slideDown();
      },

      hide: function (deleteElement) {
        $(this).slideUp(deleteElement);
      },
      ready: function () {
        bootstrap_things();
      }
    });
  }

  return {
    // Public Functions
    init: function () {

      stepper = document.querySelector('#pb_new_employee_ac_stepper');

      if (!stepper) {
        return;
      }

      form = stepper.querySelector('#pb_new_employee_ac_form');
      formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
      formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');

      intiRepeater();
      initSlider();
      initStepper();
      initValidation();
      handleForm();
    }
  };
}();


var PB_employ_listing = function () {
  // Shared variables
  var table;
  var datatable;
  var flatpickr;
  var minDate, maxDate;

  // Private functions
  var initDatatable = function () {
    // Init datatable --- more info on datatables: https://datatables.net/manual/
    datatable = $(table).DataTable({
      "info": false,
      'order': [],
      'pageLength': 10,
      'columnDefs': [
        {orderable: false, targets: 0}, // Disable ordering on column 0 (checkbox)
        {orderable: false, targets: 7}, // Disable ordering on column 7 (actions)
      ]
    });

    // Re-init functions on datatable re-draws
    datatable.on('draw', function () {
      handleDeleteRows();
    });
  }

  // Init flatpickr --- more info :https://flatpickr.js.org/getting-started/
  var initFlatpickr = () => {
    const element = document.querySelector('#kt_employ_last_payroll');
    flatpickr = $(element).flatpickr({
      altInput: true,
      altFormat: "d/m/Y",
      dateFormat: "Y-m-d",
      mode: "range",
      onChange: function (selectedDates, dateStr, instance) {
        handleFlatpickr(selectedDates, dateStr, instance);
      },
    });
  }

  // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
  var handleSearchDatatable = () => {
    const filterSearch = document.querySelector('[data-kt-employe-table-filter="search"]');
    filterSearch.addEventListener('keyup', function (e) {
      datatable.search(e.target.value).draw();
    });
  }

  // Handle status filter dropdown
  var handleStatusFilter = () => {
    const filterStatus = document.querySelector('[data-kt-employe-table-filter="status"]');
    $(filterStatus).on('change', e => {
      let value = e.target.value;
      if (value === 'all') {
        value = '';
      }
      datatable.column(3).search(value).draw();
    });
  }

  // Handle flatpickr --- more info: https://flatpickr.js.org/events/
  var handleFlatpickr = (selectedDates, dateStr, instance) => {
    minDate = selectedDates[0] ? new Date(selectedDates[0]) : null;
    maxDate = selectedDates[1] ? new Date(selectedDates[1]) : null;

    // Datatable date filter --- more info: https://datatables.net/extensions/datetime/examples/integration/datatables.html
    // Custom filtering function which will search data in column four between two values
    $.fn.dataTable.ext.search.push(
      function (settings, data, dataIndex) {
        var min = minDate;
        var max = maxDate;
        var dateAdded = new Date(moment($(data[5]).text(), 'DD/MM/YYYY'));
        var dateModified = new Date(moment($(data[5]).text(), 'DD/MM/YYYY'));

        if (
          (min === null && max === null) ||
          (min === null && max >= dateModified) ||
          (min <= dateAdded && max === null) ||
          (min <= dateAdded && max >= dateModified)
        ) {
          return true;
        }
        return false;
      }
    );
    datatable.draw();
  }

  // Handle clear flatpickr
  var handleClearFlatpickr = () => {
    const clearButton = document.querySelector('#kt_employ_last_payroll_clear');
    clearButton.addEventListener('click', e => {
      flatpickr.clear();
    });
  }

  // Delete cateogry
  var handleDeleteRows = () => {
    // Select all delete buttons
    const deleteButtons = table.querySelectorAll('[data-kt-employe-table-filter="delete_row"]');

    deleteButtons.forEach(d => {
      // Delete button on click
      d.addEventListener('click', function (e) {
        e.preventDefault();

        // Select parent row
        const parent = e.target.closest('tr');

        // Get category name
        const orderID = parent.querySelector('[data-kt-employe-table-filter="order_id"]').innerText;

        // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
        Swal.fire({
          text: "Are you sure you want to delete order: " + orderID + "?",
          icon: "warning",
          showCancelButton: true,
          buttonsStyling: false,
          confirmButtonText: "Yes, delete!",
          cancelButtonText: "No, cancel",
          customClass: {
            confirmButton: "btn fw-bold btn-danger",
            cancelButton: "btn fw-bold btn-active-light-primary"
          }
        }).then(function (result) {
          if (result.value) {
            Swal.fire({
              text: "You have deleted " + orderID + "!.",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              }
            }).then(function () {
              // Remove current row
              datatable.row($(parent)).remove().draw();
            });
          }
          else if (result.dismiss === 'cancel') {
            Swal.fire({
              text: orderID + " was not deleted.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
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
      table = document.querySelector('#kt_ecommerce_sales_table');

      if (!table) {
        return;
      }

      initDatatable();
      initFlatpickr();
      handleSearchDatatable();
      handleStatusFilter();
      handleDeleteRows();
      handleClearFlatpickr();
    }
  };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {

  // -f add
  KTCreateAccount.init();

  // -f listing
  PB_employ_listing.init();

  // -f detail
  PB_employ_detail.init();
  PB_account_deactivate.init();

});