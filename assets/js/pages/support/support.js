"use strict";

// Class definition
var KTModalNewTicket = function () {
  var submitButton;
  var cancelButton;
  var validator;
  var form;
  var modal;
  var modalEl;

  // Init form inputs
  var initForm = function () {
    // Ticket attachments
    // For more info about Dropzone plugin visit:  https://www.dropzonejs.com/#usage
    var myDropzone = new Dropzone("#kt_modal_create_ticket_attachments", {
      url: "https://keenthemes.com/scripts/void.php", // Set the url for your upload script location
      paramName: "file", // The name that will be used to transfer the file
      maxFiles: 10,
      maxFilesize: 10, // MB
      addRemoveLinks: true,
      accept: function (file, done) {
        if (file.name == "justinbieber.jpg") {
          done("Naha, you don't.");
        }
        else {
          done();
        }
      }
    });

    // Due date. For more info, please visit the official plugin site: https://flatpickr.js.org/
    var dueDate = $(form.querySelector('[name="due_date"]'));
    dueDate.flatpickr({
      enableTime: true,
      dateFormat: "d, M Y, H:i",
    });

    // Ticket user. For more info, plase visit the official plugin site: https://select2.org/
    $(form.querySelector('[name="user"]')).on('change', function () {
      // Revalidate the field when an option is chosen
      validator.revalidateField('user');
    });

    // Ticket status. For more info, plase visit the official plugin site: https://select2.org/
    $(form.querySelector('[name="status"]')).on('change', function () {
      // Revalidate the field when an option is chosen
      validator.revalidateField('status');
    });
  }

  // Handle form validation and submittion
  var handleForm = function () {
    // Stepper custom navigation

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(
      form,
      {
        fields: {
          subject: {
            validators: {
              notEmpty: {
                message: 'Ticket subject is required'
              }
            }
          },
          user: {
            validators: {
              notEmpty: {
                message: 'Ticket user is required'
              }
            }
          },
          due_date: {
            validators: {
              notEmpty: {
                message: 'Ticket due date is required'
              }
            }
          },
          description: {
            validators: {
              notEmpty: {
                message: 'Target description is required'
              }
            }
          },
          'notifications[]': {
            validators: {
              notEmpty: {
                message: 'Please select at least one notifications method'
              }
            }
          },
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
    );

    // Action buttons
    submitButton.addEventListener('click', function (e) {
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status == 'Valid') {
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            setTimeout(function () {
              submitButton.removeAttribute('data-kt-indicator');

              // Enable button
              submitButton.disabled = false;

              // Show success message. For more info check the plugin's official documentation: https://sweetalert2.github.io/
              Swal.fire({
                text: "Form has been successfully submitted!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary"
                }
              }).then(function (result) {
                if (result.isConfirmed) {
                  modal.hide();
                }
              });

              //form.submit(); // Submit form
            }, 2000);
          }
          else {
            // Show error message.
            Swal.fire({
              text: "Sorry, looks like there are some errors detected, please try again.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary"
              }
            });
          }
        });
      }
    });

    cancelButton.addEventListener('click', function (e) {
      e.preventDefault();

      Swal.fire({
        text: "Are you sure you would like to cancel?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          form.reset(); // Reset form
          modal.hide(); // Hide modal
        }
        else if (result.dismiss === 'cancel') {
          Swal.fire({
            text: "Your form has not been cancelled!.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            }
          });
        }
      });
    });
  }

  return {
    // Public functions
    init: function () {
      // Elements
      modalEl = document.querySelector('#kt_modal_new_ticket');

      if (!modalEl) {
        return;
      }

      modal = new bootstrap.Modal(modalEl);

      form = document.querySelector('#kt_modal_new_ticket_form');
      submitButton = document.getElementById('kt_modal_new_ticket_submit');
      cancelButton = document.getElementById('kt_modal_new_ticket_cancel');

      initForm();
      handleForm();
    }
  };
}();


// Class definition
var KTContactApply = function () {
  var submitButton;
  var validator;
  var form;


  // Init form inputs
  var initForm = function () {
    // Team assign. For more info, plase visit the official plugin site: https://select2.org/
    $(form.querySelector('[name="position"]')).on('change', function () {
      // Revalidate the field when an option is chosen
      validator.revalidateField('position');
    });
  }

  // Handle form validation and submittion
  var handleForm = function () {
    // Stepper custom navigation

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'subject': {
            validators: {
              notEmpty: {
                message: 'Subject is required'
              },
            }
          },
          'message': {
            validators: {
              notEmpty: {
                message: 'Message is required'
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
    );

    // Action buttons
    submitButton.addEventListener('click', function (e) {
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status == 'Valid') {
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            setTimeout(function () {
              submitButton.removeAttribute('data-kt-indicator');

              // Enable button
              submitButton.disabled = false;

              Swal.fire({
                text: "Form has been successfully submitted!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary"
                }
              }).then(function (result) {
                if (result.isConfirmed) {
                  //form.submit();
                }
              });

              //form.submit(); // Submit form
            }, 2000);
          }
          else {
            // Scroll top

            // Show error popuo. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
              text: "Sorry, looks like there are some errors detected, please try again.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary"
              }
            }).then(function (result) {
              KTUtil.scrollTop();
            });
          }
        });
      }
    });
  }

  return {
    // Public functions
    init: function () {
      // Elements
      form = document.querySelector('#kt_contact_form');
      if (!form) {
        return;
      }
      submitButton = document.getElementById('kt_contact_submit_button');

      initForm();
      handleForm();
    }
  };
}();

var PB_TBL_Ticket = function () {
  // Define shared variables
  var table = document.getElementById('pb_table_tickets');
  var datatable;
  var toolbarBase;
  var toolbarSelected;
  var selectedCount;

  // Private functions
  var initUserTable = function () {
    // Set date data order
    const tableRows = table.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
      const dateRow = row.querySelectorAll('td');
      const lastLogin = dateRow[3].innerText.toLowerCase(); // Get last login time
      let timeCount = 0;
      let timeFormat = 'minutes';

      // Determine date & time format -- add more formats when necessary
      if (lastLogin.includes('yesterday')) {
        timeCount = 1;
        timeFormat = 'days';
      }
      else if (lastLogin.includes('mins')) {
        timeCount = parseInt(lastLogin.replace(/\D/g, ''));
        timeFormat = 'minutes';
      }
      else if (lastLogin.includes('hours')) {
        timeCount = parseInt(lastLogin.replace(/\D/g, ''));
        timeFormat = 'hours';
      }
      else if (lastLogin.includes('days')) {
        timeCount = parseInt(lastLogin.replace(/\D/g, ''));
        timeFormat = 'days';
      }
      else if (lastLogin.includes('weeks')) {
        timeCount = parseInt(lastLogin.replace(/\D/g, ''));
        timeFormat = 'weeks';
      }

      // Subtract date/time from today -- more info on moment datetime subtraction: https://momentjs.com/docs/#/durations/subtract/
      const realDate = moment().subtract(timeCount, timeFormat).format();

      // Insert real date to last login attribute
      dateRow[3].setAttribute('data-order', realDate);

      // Set real date for joined column
      const joinedDate = moment(dateRow[5].innerHTML, "DD MMM YYYY, LT").format(); // select date from 5th column in table
      dateRow[5].setAttribute('data-order', joinedDate);
    });

    // Init datatable --- more info on datatables: https://datatables.net/manual/
    datatable = $(table).DataTable({
      "info": false,
      'order': [],
      "pageLength": 10,
      "lengthChange": false,
      'columnDefs': [
        {orderable: false, targets: 0}, // Disable ordering on column 0 (checkbox)
        {orderable: false, targets: 6}, // Disable ordering on column 6 (actions)
      ]
    });

    // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
    datatable.on('draw', function () {
      initToggleToolbar();
      handleDeleteRows();
      toggleToolbars();
    });
  }

  // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
  var handleSearchDatatable = () => {
    const filterSearch = document.querySelector('[data-kt-user-table-filter="search"]');
    filterSearch.addEventListener('keyup', function (e) {
      datatable.search(e.target.value).draw();
    });
  }

  // Filter Datatable
  var handleFilterDatatable = () => {
    // Select filter options
    const filterForm = document.querySelector('[data-kt-user-table-filter="form"]');
    const filterButton = filterForm.querySelector('[data-kt-user-table-filter="filter"]');
    const selectOptions = filterForm.querySelectorAll('select');

    // Filter datatable on submit
    filterButton.addEventListener('click', function () {
      var filterString = '';

      // Get filter values
      selectOptions.forEach((item, index) => {
        if (item.value && item.value !== '') {
          if (index !== 0) {
            filterString += ' ';
          }

          // Build filter value options
          filterString += item.value;
        }
      });

      // Filter datatable --- official docs reference: https://datatables.net/reference/api/search()
      datatable.search(filterString).draw();
    });
  }

  // Reset Filter
  var handleResetForm = () => {
    // Select reset button
    const resetButton = document.querySelector('[data-kt-user-table-filter="reset"]');

    // Reset datatable
    resetButton.addEventListener('click', function () {
      // Select filter options
      const filterForm = document.querySelector('[data-kt-user-table-filter="form"]');
      const selectOptions = filterForm.querySelectorAll('select');

      // Reset select2 values -- more info: https://select2.org/programmatic-control/add-select-clear-items
      selectOptions.forEach(select => {
        $(select).val('').trigger('change');
      });

      // Reset datatable --- official docs reference: https://datatables.net/reference/api/search()
      datatable.search('').draw();
    });
  }


  // Delete subscirption
  var handleDeleteRows = () => {
    // Select all delete buttons
    const deleteButtons = table.querySelectorAll('[data-kt-users-table-filter="delete_row"]');

    deleteButtons.forEach(d => {
      // Delete button on click
      d.addEventListener('click', function (e) {
        e.preventDefault();

        // Select parent row
        const parent = e.target.closest('tr');

        // Get user name
        const userName = parent.querySelectorAll('td')[1].querySelectorAll('a')[1].innerText;

        // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
        Swal.fire({
          text: "Are you sure you want to delete " + userName + "?",
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
              text: "You have deleted " + userName + "!.",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              }
            }).then(function () {
              // Remove current row
              datatable.row($(parent)).remove().draw();
            }).then(function () {
              // Detect checked checkboxes
              toggleToolbars();
            });
          }
          else if (result.dismiss === 'cancel') {
            Swal.fire({
              text: customerName + " was not deleted.",
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

  // Init toggle toolbar
  var initToggleToolbar = () => {
    // Toggle selected action toolbar
    // Select all checkboxes
    const checkboxes = table.querySelectorAll('[type="checkbox"]');

    // Select elements
    toolbarBase = document.querySelector('[data-kt-user-table-toolbar="base"]');
    toolbarSelected = document.querySelector('[data-kt-user-table-toolbar="selected"]');
    selectedCount = document.querySelector('[data-kt-user-table-select="selected_count"]');
    const deleteSelected = document.querySelector('[data-kt-user-table-select="delete_selected"]');

    // Toggle delete selected toolbar
    checkboxes.forEach(c => {
      // Checkbox on click event
      c.addEventListener('click', function () {
        setTimeout(function () {
          toggleToolbars();
        }, 50);
      });
    });

    // Deleted selected rows
    deleteSelected.addEventListener('click', function () {
      // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
      Swal.fire({
        text: "Are you want to final close selected tickets?",
        icon: "info",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, close!",
        cancelButtonText: "No, cancel",
        customClass: {
          confirmButton: "btn fw-bold btn-success",
          cancelButton: "btn fw-bold btn-active-light-primary"
        }
      }).then(function (result) {
        if (result.value) {
          Swal.fire({
            text: "You have deleted all selected customers!.",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-primary",
            }
          }).then(function () {
            // Remove all selected customers
            checkboxes.forEach(c => {
              if (c.checked) {
                datatable.row($(c.closest('tbody tr'))).remove().draw();
              }
            });

            // Remove header checked box
            const headerCheckbox = table.querySelectorAll('[type="checkbox"]')[0];
            headerCheckbox.checked = false;
          }).then(function () {
            toggleToolbars(); // Detect checked checkboxes
            initToggleToolbar(); // Re-init toolbar to recalculate checkboxes
          });
        }
        else if (result.dismiss === 'cancel') {
          Swal.fire({
            text: "Selected customers was not deleted.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-primary",
            }
          });
        }
      });
    });
  }

  // Toggle toolbars
  const toggleToolbars = () => {
    // Select refreshed checkbox DOM elements
    const allCheckboxes = table.querySelectorAll('tbody [type="checkbox"]');

    // Detect checkboxes state & count
    let checkedState = false;
    let count = 0;

    // Count checked boxes
    allCheckboxes.forEach(c => {
      if (c.checked) {
        checkedState = true;
        count++;
      }
    });

    // Toggle toolbars
    if (checkedState) {
      selectedCount.innerHTML = count;
      toolbarBase.classList.add('d-none');
      toolbarSelected.classList.remove('d-none');
    }
    else {
      toolbarBase.classList.remove('d-none');
      toolbarSelected.classList.add('d-none');
    }
  }

  return {
    // Public functions
    init: function () {
      if (!table) {
        return;
      }

      initUserTable();
      initToggleToolbar();
      handleSearchDatatable();
      handleResetForm();
      handleDeleteRows();
      handleFilterDatatable();

    }
  }
}();

// Class definition
var KTModalExportUsers = function () {
  // Shared variables
  const element = document.getElementById('pb_ticket_reminder');
  const form = element.querySelector('#pb_ticket_reminder_form');
  const modal = new bootstrap.Modal(element);

  // Init form inputs
  var initForm = function () {

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    var validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'format': {
            validators: {
              notEmpty: {
                message: 'File format is required'
              }
            }
          },
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
    );

    // Submit button handler
    const submitButton = element.querySelector('[data-kt-users-modal-action="submit"]');
    submitButton.addEventListener('click', function (e) {
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status == 'Valid') {
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable submit button whilst loading
            submitButton.disabled = true;

            setTimeout(function () {
              submitButton.removeAttribute('data-kt-indicator');

              Swal.fire({
                text: "User list has been successfully exported!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary"
                }
              }).then(function (result) {
                if (result.isConfirmed) {
                  modal.hide();

                  // Enable submit button after loading
                  submitButton.disabled = false;
                }
              });

              //form.submit(); // Submit form
            }, 2000);
          }
          else {
            Swal.fire({
              text: "Sorry, looks like there are some errors detected, please try again.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary"
              }
            });
          }
        });
      }
    });

    // Cancel button handler
    const cancelButton = element.querySelector('[data-kt-users-modal-action="cancel"]');
    cancelButton.addEventListener('click', function (e) {
      e.preventDefault();

      Swal.fire({
        text: "Are you sure you would like to cancel?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          form.reset(); // Reset form
          modal.hide(); // Hide modal
        }
        else if (result.dismiss === 'cancel') {
          Swal.fire({
            text: "Your form has not been cancelled!.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            }
          });
        }
      });
    });

    // Close button handler
    const closeButton = element.querySelector('[data-kt-users-modal-action="close"]');
    closeButton.addEventListener('click', function (e) {
      e.preventDefault();

      Swal.fire({
        text: "Are you sure you would like to cancel?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          form.reset(); // Reset form
          modal.hide(); // Hide modal
        }
        else if (result.dismiss === 'cancel') {
          Swal.fire({
            text: "Your form has not been cancelled!.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            }
          });
        }
      });
    });
  }

  return {
    // Public functions
    init: function () {
      initForm();
    }
  };
}();


// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTContactApply.init();
  KTModalNewTicket.init();
  PB_TBL_Ticket.init();
  KTModalExportUsers.init();
});
