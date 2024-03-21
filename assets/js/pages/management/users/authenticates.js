"use strict";

// Class definition
var KTUsersViewRole = function () {
  // Shared variables
  var datatable;
  var table;

  // Init add schedule modal
  var initViewRole = () => {
    // Set date data order
    const tableRows = table.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
      const dateRow = row.querySelectorAll('td');
      const realDate = moment(dateRow[3].innerHTML, "DD MMM YYYY, LT").format(); // select date from 5th column in table
      dateRow[3].setAttribute('data-order', realDate);
    });

    // Init datatable --- more info on datatables: https://datatables.net/manual/
    datatable = $(table).DataTable({
      "info": false,
      'order': [],
      "pageLength": 5,
      "lengthChange": false,
      'columnDefs': [
        {orderable: false, targets: 0}, // Disable ordering on column 0 (checkbox)
        {orderable: false, targets: 4}, // Disable ordering on column 4 (actions)
      ]
    });
  }

  // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
  var handleSearchDatatable = () => {
    const filterSearch = document.querySelector('[data-kt-roles-table-filter="search"]');
    filterSearch.addEventListener('keyup', function (e) {
      datatable.search(e.target.value).draw();
    });
  }

  // Delete user
  var handleDeleteRows = () => {
    // Select all delete buttons
    const deleteButtons = table.querySelectorAll('[data-kt-roles-table-filter="delete_row"]');

    deleteButtons.forEach(d => {
      // Delete button on click
      d.addEventListener('click', function (e) {
        e.preventDefault();

        // Select parent row
        const parent = e.target.closest('tr');

        // Get customer name
        const userName = parent.querySelectorAll('td')[1].innerText;

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
    const deleteSelected = document.querySelector('[data-kt-view-roles-table-select="delete_selected"]');

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
        text: "Are you sure you want to delete selected customers?",
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
    // Define variables
    const toolbarBase = document.querySelector('[data-kt-view-roles-table-toolbar="base"]');
    const toolbarSelected = document.querySelector('[data-kt-view-roles-table-toolbar="selected"]');
    const selectedCount = document.querySelector('[data-kt-view-roles-table-select="selected_count"]');

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
      table = document.querySelector('#kt_roles_view_table');

      if (!table) {
        return;
      }

      initViewRole();
      handleSearchDatatable();
      handleDeleteRows();
      initToggleToolbar();
    }
  };
}();

var KTUsersUpdatePermissions = function () {
  // Shared variables

  // Init add schedule modal
  var initUpdatePermissions = () => {

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    var validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'role_name': {
            validators: {
              notEmpty: {
                message: 'Role name is required'
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

    // Close button handler
    const closeButton = element.querySelector('[data-kt-roles-modal-action="close"]');
    closeButton.addEventListener('click', e => {
      e.preventDefault();

      Swal.fire({
        text: "Are you sure you would like to close?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, close it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          modal.hide(); // Hide modal
        }
      });
    });

    // Cancel button handler
    const cancelButton = element.querySelector('[data-kt-roles-modal-action="cancel"]');
    cancelButton.addEventListener('click', e => {
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

    // Submit button handler
    const submitButton = element.querySelector('[data-kt-roles-modal-action="submit"]');
    submitButton.addEventListener('click', function (e) {
      // Prevent default button action
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status === 'Valid') {
            // Show loading indication
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            setTimeout(function () {
              // Remove loading indication
              submitButton.removeAttribute('data-kt-indicator');

              // Enable button
              submitButton.disabled = false;

              // Show popup confirmation
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
            // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
  }

  // Select all handler
  const handleSelectAll = () => {
    // Define variables
    const selectAll = form.querySelector('#kt_roles_select_all');
    const allCheckboxes = form.querySelectorAll('[type="checkbox"]');

    // Handle check state
    selectAll.addEventListener('change', e => {

      // Apply check state to all checkboxes
      allCheckboxes.forEach(c => {
        c.checked = e.target.checked;
      });
    });
  }

  return {
    // Public functions
    init: function () {
      const element = document.getElementById('pb_user_role_edit');
      if (!element) return;
      const form = element.querySelector('#pb_user_role_edit_form');
      const modal = new bootstrap.Modal(element);
      initUpdatePermissions();
      handleSelectAll();
    }
  };
}();

var KTUsersPermissionsList = function () {
  // Shared variables
  var datatable;
  var table;

  // Init add schedule modal
  var initPermissionsList = () => {
    // Set date data order
    const tableRows = table.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
      const dateRow = row.querySelectorAll('td');
      const realDate = moment(dateRow[2].innerHTML, "DD MMM YYYY, LT").format(); // select date from 2nd column in table
      dateRow[2].setAttribute('data-order', realDate);
    });

    // Init datatable --- more info on datatables: https://datatables.net/manual/
    datatable = $(table).DataTable({
      "info": false,
      'order': [],
      'columnDefs': [
        {orderable: false, targets: 1}, // Disable ordering on column 1 (assigned)
        {orderable: false, targets: 3}, // Disable ordering on column 3 (actions)
      ]
    });
  }

  // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
  var handleSearchDatatable = () => {
    const filterSearch = document.querySelector('[data-kt-permissions-table-filter="search"]');
    filterSearch.addEventListener('keyup', function (e) {
      datatable.search(e.target.value).draw();
    });
  }

  // Delete user
  var handleDeleteRows = () => {
    // Select all delete buttons
    const deleteButtons = table.querySelectorAll('[data-kt-permissions-table-filter="delete_row"]');

    deleteButtons.forEach(d => {
      // Delete button on click
      d.addEventListener('click', function (e) {
        e.preventDefault();

        // Select parent row
        const parent = e.target.closest('tr');

        // Get permission name
        const permissionName = parent.querySelectorAll('td')[0].innerText;

        // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
        Swal.fire({
          text: "Are you sure you want to delete " + permissionName + "?",
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
              text: "You have deleted " + permissionName + "!.",
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


  return {
    // Public functions
    init: function () {
      table = document.querySelector('#kt_permissions_table');

      if (!table) {
        return;
      }

      initPermissionsList();
      handleSearchDatatable();
      handleDeleteRows();
    }
  };
}();
var KTUsersAddPermission = function () {

  // Init add schedule modal
  var initAddPermission = () => {

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    var validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'permission_name': {
            validators: {
              notEmpty: {
                message: 'Permission name is required'
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

    // Close button handler
    const closeButton = element.querySelector('[data-kt-permissions-modal-action="close"]');
    closeButton.addEventListener('click', e => {
      e.preventDefault();

      Swal.fire({
        text: "Are you sure you would like to close?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, close it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          modal.hide(); // Hide modal
        }
      });
    });

    // Cancel button handler
    const cancelButton = element.querySelector('[data-kt-permissions-modal-action="cancel"]');
    cancelButton.addEventListener('click', e => {
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

    // Submit button handler
    const submitButton = element.querySelector('[data-kt-permissions-modal-action="submit"]');
    submitButton.addEventListener('click', function (e) {
      // Prevent default button action
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status == 'Valid') {
            // Show loading indication
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            setTimeout(function () {
              // Remove loading indication
              submitButton.removeAttribute('data-kt-indicator');

              // Enable button
              submitButton.disabled = false;

              // Show popup confirmation
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
            // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
  }

  return {
    // Public functions
    init: function () {
      const element = document.getElementById('kt_modal_add_permission');
      if (!element) return;
      const form = element.querySelector('#kt_modal_add_permission_form');
      const modal = new bootstrap.Modal(element);
      initAddPermission();
    }
  };
}();
var KTUsersUpdatePermission = function () {

  // Init add schedule modal
  var initUpdatePermission = () => {

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    var validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'permission_name': {
            validators: {
              notEmpty: {
                message: 'Permission name is required'
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

    // Close button handler
    const closeButton = element.querySelector('[data-kt-permissions-modal-action="close"]');
    closeButton.addEventListener('click', e => {
      e.preventDefault();

      Swal.fire({
        text: "Are you sure you would like to close?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, close it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          modal.hide(); // Hide modal
        }
      });
    });

    // Cancel button handler
    const cancelButton = element.querySelector('[data-kt-permissions-modal-action="cancel"]');
    cancelButton.addEventListener('click', e => {
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

    // Submit button handler
    const submitButton = element.querySelector('[data-kt-permissions-modal-action="submit"]');
    submitButton.addEventListener('click', function (e) {
      // Prevent default button action
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status == 'Valid') {
            // Show loading indication
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            setTimeout(function () {
              // Remove loading indication
              submitButton.removeAttribute('data-kt-indicator');

              // Enable button
              submitButton.disabled = false;

              // Show popup confirmation
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
            // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
  }

  return {
    // Public functions
    init: function () {
      const element = document.getElementById('kt_modal_update_permission');
      if (!element) return;
      const form = element.querySelector('#kt_modal_update_permission_form');
      const modal = new bootstrap.Modal(element);
      initUpdatePermission();
    }
  };
}();

var KTUsersAddRole = function () {

  var element;
  var form;
  var modal;
  // Init add schedule modal
  var initAddRole = () => {

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    var validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'role_name': {
            validators: {
              notEmpty: {
                message: 'Role name is required'
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

    // Close button handler
    const closeButton = element.querySelector('[data-kt-roles-modal-action="close"]');
    closeButton.addEventListener('click', e => {
      e.preventDefault();

      Swal.fire({
        text: "Are you sure you would like to close?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, close it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          modal.hide(); // Hide modal
        }
      });
    });

    // Cancel button handler
    const cancelButton = element.querySelector('[data-kt-roles-modal-action="cancel"]');
    cancelButton.addEventListener('click', e => {
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

    // Submit button handler
    const submitButton = element.querySelector('[data-kt-roles-modal-action="submit"]');
    submitButton.addEventListener('click', function (e) {
      // Prevent default button action
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status == 'Valid') {
            // Show loading indication
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            setTimeout(function () {
              // Remove loading indication
              submitButton.removeAttribute('data-kt-indicator');

              // Enable button
              submitButton.disabled = false;

              // Show popup confirmation
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
            // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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


  }

  // Select all handler
  const handleSelectAll = () => {
    // Define variables
    const selectAll = form.querySelector('#kt_roles_select_all');
    const allCheckboxes = form.querySelectorAll('[type="checkbox"]');

    // Handle check state
    selectAll.addEventListener('change', e => {

      // Apply check state to all checkboxes
      allCheckboxes.forEach(c => {
        c.checked = e.target.checked;
      });
    });
  }

  return {
    // Public functions
    init: function () {
      element = document.getElementById('kt_modal_add_role');
      if (!element) return;
      form = element.querySelector('#kt_modal_add_role_form');
      modal = new bootstrap.Modal(element);
      initAddRole();
      handleSelectAll();
    }
  };
}();

var KTUsersUpdatePermissions_1212 = function () {
  // Shared variables
  var element;
  var form;
  var modal;

  // Init add schedule modal
  var initUpdatePermissions = () => {

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    var validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'role_name': {
            validators: {
              notEmpty: {
                message: 'Role name is required'
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

    // Close button handler
    const closeButton = element.querySelector('[data-kt-roles-modal-action="close"]');
    closeButton.addEventListener('click', e => {
      e.preventDefault();

      Swal.fire({
        text: "Are you sure you would like to close?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, close it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          modal.hide(); // Hide modal
        }
      });
    });

    // Cancel button handler
    const cancelButton = element.querySelector('[data-kt-roles-modal-action="cancel"]');
    cancelButton.addEventListener('click', e => {
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

    // Submit button handler
    const submitButton = element.querySelector('[data-kt-roles-modal-action="submit"]');
    submitButton.addEventListener('click', function (e) {
      // Prevent default button action
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status == 'Valid') {
            // Show loading indication
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            setTimeout(function () {
              // Remove loading indication
              submitButton.removeAttribute('data-kt-indicator');

              // Enable button
              submitButton.disabled = false;

              // Show popup confirmation
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
            // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
  }

  // Select all handler
  const handleSelectAll = () => {
    // Define variables
    const selectAll = form.querySelector('#kt_roles_select_all');
    const allCheckboxes = form.querySelectorAll('[type="checkbox"]');

    // Handle check state
    selectAll.addEventListener('change', e => {

      // Apply check state to all checkboxes
      allCheckboxes.forEach(c => {
        c.checked = e.target.checked;
      });
    });
  }

  return {
    // Public functions
    init: function () {
      element = document.getElementById('kt_modal_update_role');
      if (!element) return;
      form = element.querySelector('#kt_modal_update_role_form');
      modal = new bootstrap.Modal(element);
      initUpdatePermissions();
      handleSelectAll();
    }
  };
}();

var KTUsersList = function () {
  // Define shared variables
  var table = document.getElementById('kt_table_users');
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
        text: "Are you sure you want to delete selected customers?",
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

var KTModalExportUsers = function () {
  // Shared variables
  const element = document.getElementById('kt_modal_export_users');
  const form = element.querySelector('#kt_modal_export_users_form');
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

var KTUsersAddUser = function () {
  // Shared variables
  const element = document.getElementById('kt_modal_add_user');
  const form = element.querySelector('#kt_modal_add_user_form');
  const modal = new bootstrap.Modal(element);

  // Init add schedule modal
  var initAddUser = () => {

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    var validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'user_name': {
            validators: {
              notEmpty: {
                message: 'Full name is required'
              }
            }
          },
          'user_email': {
            validators: {
              notEmpty: {
                message: 'Valid email address is required'
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
    submitButton.addEventListener('click', e => {
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status == 'Valid') {
            // Show loading indication
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            setTimeout(function () {
              // Remove loading indication
              submitButton.removeAttribute('data-kt-indicator');

              // Enable button
              submitButton.disabled = false;

              // Show popup confirmation
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
            // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
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
    cancelButton.addEventListener('click', e => {
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
          modal.hide();
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
    closeButton.addEventListener('click', e => {
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
          modal.hide();
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
      initAddUser();
    }
  };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTUsersList.init();
  KTUsersViewRole.init();
  KTUsersUpdatePermissions.init();
  KTUsersPermissionsList.init();
  KTUsersAddPermission.init();
  KTUsersUpdatePermission.init();
  KTUsersAddRole.init();
  KTUsersUpdatePermissions_1212.init();
  KTModalExportUsers.init();
  KTUsersAddUser.init();
});