"use strict";

// -f list
var PB_customer_listing = function () {
  // Define shared variables
  var datatable;
  var filterMonth;
  var filterPayment;
  var table

  // Private functions
  var initCustomerList = function () {
    // Set date data order
    const tableRows = table.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
      const dateRow = row.querySelectorAll('td');
      const realDate = moment(dateRow[5].innerHTML, "DD MMM YYYY, LT").format(); // select date from 5th column in table
      dateRow[5].setAttribute('data-order', realDate);
    });

    // Init datatable --- more info on datatables: https://datatables.net/manual/
    datatable = $(table).DataTable({
      "info": false,
      'order': [],
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
    const filterSearch = document.querySelector('[data-kt-customer-table-filter="search"]');
    filterSearch.addEventListener('keyup', function (e) {
      datatable.search(e.target.value).draw();
    });
  }

  // Filter Datatable
  var handleFilterDatatable = () => {
    // Select filter options
    filterMonth = $('[data-kt-customer-table-filter="month"]');
    filterPayment = document.querySelectorAll('[data-kt-customer-table-filter="payment_type"] [name="payment_type"]');
    const filterButton = document.querySelector('[data-kt-customer-table-filter="filter"]');

    // Filter datatable on submit
    filterButton.addEventListener('click', function () {
      // Get filter values
      const monthValue = filterMonth.val();
      let paymentValue = '';

      // Get payment value
      filterPayment.forEach(r => {
        if (r.checked) {
          paymentValue = r.value;
        }

        // Reset payment value if "All" is selected
        if (paymentValue === 'all') {
          paymentValue = '';
        }
      });

      // Build filter string from filter options
      const filterString = monthValue + ' ' + paymentValue;

      // Filter datatable --- official docs reference: https://datatables.net/reference/api/search()
      datatable.search(filterString).draw();
    });
  }

  // Delete customer
  var handleDeleteRows = () => {
    // Select all delete buttons
    const deleteButtons = table.querySelectorAll('[data-kt-customer-table-filter="delete_row"]');

    deleteButtons.forEach(d => {
      // Delete button on click
      d.addEventListener('click', function (e) {
        e.preventDefault();

        // Select parent row
        const parent = e.target.closest('tr');

        // Get customer name
        const customerName = parent.querySelectorAll('td')[1].innerText;

        // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
        Swal.fire({
          text: "Are you sure you want to delete " + customerName + "?",
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
              text: "You have deleted " + customerName + "!.",
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

  // Reset Filter
  var handleResetForm = () => {
    // Select reset button
    const resetButton = document.querySelector('[data-kt-customer-table-filter="reset"]');

    // Reset datatable
    resetButton.addEventListener('click', function () {
      // Reset month
      filterMonth.val(null).trigger('change');

      // Reset payment type
      filterPayment[0].checked = true;

      // Reset datatable --- official docs reference: https://datatables.net/reference/api/search()
      datatable.search('').draw();
    });
  }

  // Init toggle toolbar
  var initToggleToolbar = () => {
    // Toggle selected action toolbar
    // Select all checkboxes
    const checkboxes = table.querySelectorAll('[type="checkbox"]');

    // Select elements
    const deleteSelected = document.querySelector('[data-kt-customer-table-select="delete_selected"]');

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
    const toolbarBase = document.querySelector('[data-kt-customer-table-toolbar="base"]');
    const toolbarSelected = document.querySelector('[data-kt-customer-table-toolbar="selected"]');
    const selectedCount = document.querySelector('[data-kt-customer-table-select="selected_count"]');

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

  // Public methods
  return {
    init: function () {
      table = document.querySelector('#pb_customers_table');

      if (!table) {
        return;
      }

      initCustomerList();
      initToggleToolbar();
      handleSearchDatatable();
      handleFilterDatatable();
      handleDeleteRows();
      handleResetForm();
    }
  }
}();


// -f goto_detail
//var PB_customer_search = function () {
//  // Private variables
//  var element;
//  var suggestionsElement;
//  var resultsElement;
//  var wrapperElement;
//  var user_search_for;
//  var emptyElement;
//  var searchObject;
//  var got = false;
//
//  // Private functions
//  var processs = function (search) {
//
//    // console.log(search);
//
//    function findCustomer(item) {
//      if (
//        item.getAttribute('data-user-name').indexOf(user_search_for) > -1
//        ||
//        item.getAttribute('data-user-alias').indexOf(user_search_for) > -1
//      ) {
//        got = true;
//        item.classList.remove('d-none');
//      }
//      else {
//        item.classList.add('d-none');
//      }
//    }
//
//    setTimeout(function () {
//
//      // Hide recently viewed
//      suggestionsElement.classList.add('d-none');
//
//      user_search_for = searchObject.getQuery().toLowerCase();
//      console.log(user_search_for);
//
//      var searchable_zone = resultsElement.querySelector('[data-kt-target="search"]').children;
//
//
//      searchable_zone.forEach(findCustomer)
//
//      if (got) {
//        // Show results
//        resultsElement.classList.remove('d-none');
//        // Hide empty message
//        emptyElement.classList.add('d-none');
//        got = false;
//      }
//      else {
//        // Hide results
//        resultsElement.classList.add('d-none');
//        // Show empty message
//        emptyElement.classList.remove('d-none');
//      }
//
//      // Complete search
//      search.complete();
//    }, 100);
//  }
//
//  var clear = function (search) {
//    // Show recently viewed
//    suggestionsElement.classList.remove('d-none');
//    // Hide results
//    resultsElement.classList.add('d-none');
//    // Hide empty message
//    emptyElement.classList.add('d-none');
//    // got value reset
//    got = false;
//  }
//
//  // Public methods
//  return {
//    init: function () {
//      // Elements
//      element = document.querySelector('#pb_customer_search_handler');
//
//      if (!element) return;
//
//      suggestionsElement = element.querySelector('[data-kt-search-element="suggestions"]');
//      resultsElement = element.querySelector('[data-kt-search-element="results"]');
//      emptyElement = element.querySelector('[data-kt-search-element="empty"]');
//
//      // console.log(resultsElement);
//      // Initialize search handler
//      searchObject = new KTSearch(element);
//
//      // Search handler
//      searchObject.on('kt.search.process', processs);
//
//      // Clear handler
//      searchObject.on('kt.search.clear', clear);
//    }
//  };
//}();

// -f details
var PB_alter_balance = function () {
  var element;
  var submitButton;
  var cancelButton;
  var closeButton;
  var validator;
  var maskInput;
  var balType;
  var newBalance;
  var form;
  var modal;

  // Init form inputs
  var initForm = function () {
    //
  }

  var handleBalanceCalculator = function () {
    // Select elements
    const currentBalance = element.querySelector('[data-cs-custom="cur_bl"]');
    const oldOpening = element.querySelector('[data-cs-custom="old_ob"]');
    newBalance = element.querySelector('[data-cs-custom="new_bl"]');
    maskInput = document.getElementById('cust_new_ob');
    balType = document.getElementById('cust_nob_type');

    // Get current balance value
    const isNegative = currentBalance.innerHTML.includes('-');
    let currentValue = parseFloat(currentBalance.innerHTML.replace(/[^0-9.]/g, '').replace(',', ''));
    currentValue = isNegative ? currentValue * -1 : currentValue;

    // Get old opening balance value
    const isNegative_ob = oldOpening.innerHTML.includes('-');
    let oldValue = parseFloat(oldOpening.innerHTML.replace(/[^0-9.]/g, '').replace(',', ''));
    oldValue = isNegative_ob ? oldValue * -1 : oldValue;

    // On change event for inputmask
    let maskValue;
    maskInput.addEventListener('focusout', function (e) {
      // Get inputmask value on change
      maskValue = parseFloat(e.target.value.replace(/[^0-9.]/g, '').replace(',', ''));
      // Set mask value as 0 when NaN detected
      if (isNaN(maskValue)) {
        maskValue = 0;
      }

      const changeValue = maskValue - oldValue;
      // Calculate & set new balance value
      // newBalance.innerHTML = (@value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      newBalance.innerHTML = render_into_Currency(changeValue + currentValue, 2, 1);
    });

    balType.addEventListener('click', function (ev) {

      const bal_type = ev.target.value;

      maskValue = parseFloat(maskInput.value.replace(/[^0-9.]/g, '').replace(',', ''));
      if (isNaN(maskValue)) {
        maskValue = 0;
      }
      maskValue = maskValue * bal_type;
      const changeValue = maskValue - oldValue;
      // Calculate & set new balance value
      newBalance.innerHTML = render_into_Currency(changeValue + currentValue, 2, 1);
    })
  }

  // Handle form validation and submittion
  var handleForm = function () {
    // Stepper custom navigation

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'new_ob_amount': {
            validators: {
              notEmpty: {
                message: 'New Opening Balance is required'
              }
            }
          },
          'adjustment': {
            validators: {
              notEmpty: {
                message: 'Balance Type is required'
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
      // Prevent default button action
      e.preventDefault();

      // Validate form before submit
      if (validator) {
        validator.validate().then(function (status) {
          console.log('validated!');

          if (status === 'Valid') {
            // Show loading indication
            submitButton.setAttribute('data-kt-indicator', 'on');

            // Disable submit button whilst loading
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(function () {
              // Simulate form submission
              submitButton.removeAttribute('data-kt-indicator');

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

                  // Enable submit button after loading
                  submitButton.disabled = false;

                  // Reset form for demo purposes only
                  form.reset();
                  newBalance.innerHTML = "--";
                }
              });

              // form.submit();
            }, 500);
          }
          else {
            // Show popup warning
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
      // Elements
      element = document.querySelector('#pb_cust_ob_alter');
      if (!element) return;
      modal = new bootstrap.Modal(element);

      form = element.querySelector('#pb_cust_ob_alter_form');
      submitButton = form.querySelector('#pb_cust_ob_alter_submit');
      cancelButton = form.querySelector('#pb_cust_ob_alter_cancel');
      closeButton = element.querySelector('#pb_cust_ob_alter_close');

      initForm();
      handleBalanceCalculator();
      handleForm();
    }
  };
}();

var PB_customer_table = function () {

  const tables = ['pb_tbl_c_receipts'];
  var pb_tbl_c_receipts;
  // Table of Paid Invoices
  var initInvoicePaid = function () {
    // Define table element
    const id = '.pb_cust_invoices_paid';
    var table = document.querySelector(id);

    if (!table) {
      return;
    }

    // Set date data order
    const tableRows = table.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
      const dateRow = row.querySelectorAll('td');
      const ext_date = dateRow[1].innerHTML.split(' - ')[1];
      const realDate = moment(ext_date, "DD MMM YYYY").format(); // select date from 1st column in table
      dateRow[1].setAttribute('data-order', realDate);
    });

    var datatable = $(id).DataTable({
      "info": false,
      'order': [],
      "pageLength": 5,
      "lengthChange": false,
      'columnDefs': [
        {orderable: false, targets: 4},
      ]
    });
  }

  // Profit Statement
  var initProfitStatement = function () {
    // Define table element
    const id = '.pb_cust_profits_table';
    var table = document.querySelector(id);
    if (!table) {
      return;
    }

    // Set date data order
    const tableRows = table.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
      const dateRow = row.querySelectorAll('td');
      const realDate = moment(dateRow[0].innerHTML, "DD MMM YYYY, LT").format(); // select date from 1st column in table
      dateRow[0].setAttribute('data-order', realDate);
    });

    // Init datatable --- more info on datatables: https://datatables.net/manual/
    var datatable = $(id).DataTable({
      "info": false,
      'order': [],
      "pageLength": 10,
      "lengthChange": false,
      'columnDefs': [
        {orderable: false, targets: 4}, // Disable ordering on column 0 (download)
      ]
    });
  }

  // Receipts
  var initCustomerView = function () {
    const qry_id = 'pb_tbl_c_receipts';
    var table = document.querySelector('#' + qry_id);
    if (!table) return;
    // Set date data order
    const tableRows = table.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
      const dateRow = row.querySelectorAll('td');
      const realDate = moment(dateRow[0].innerHTML, "DD MMM YYYY").format();
      dateRow[0].setAttribute('data-order', realDate);
    });

    pb_tbl_c_receipts = $(table).DataTable({
      "info": true,
      'order': [],
      'select': false,
      "pageLength": 6,
      "lengthChange": false,
      'columnDefs': [
        {orderable: false, targets: 5}, // Disable ordering on column 5 (actions)
      ]
    });
  }

  function handleSearchDatatable(item) {
    const search_qry = '[data-table-search="' + item + '"]';
    const filterSearch = document.querySelector(search_qry);
    if (!filterSearch) {
      return;
    }
    filterSearch.addEventListener('keyup', function (e) {
      console.log(e.target.value);
      pb_tbl_c_receipts.search(e.target.value).draw();
    });
  }


  return {
    init: function () {
      initInvoicePaid();
      initProfitStatement();
      initCustomerView();
      tables.forEach(handleSearchDatatable)
    }
  }
}();
var PB_overdue_invoices = function () {

  var initPaymentMethod = function () {
    // Define variables
    const table = document.getElementById('kt_customer_view_payment_method');
    if (!table) return;
    const tableRows = table.querySelectorAll('[ data-kt-customer-payment-method="row"]');

    tableRows.forEach(row => {
      // Select delete button
      const deleteButton = row.querySelector('[data-kt-customer-payment-method="delete"]');

      // Delete button action
      deleteButton.addEventListener('click', e => {
        e.preventDefault();

        // Popup confirmation
        Swal.fire({
          text: "Are you sure you would like to delete this card?",
          icon: "warning",
          showCancelButton: true,
          buttonsStyling: false,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, return",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-active-light"
          }
        }).then(function (result) {
          if (result.value) {
            row.remove();
            modal.hide(); // Hide modal
          }
          else if (result.dismiss === 'cancel') {
            Swal.fire({
              text: "Your card was not deleted!.",
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
    });
  }

  const handlePrimaryButton = () => {
    // Define variable
    const button = document.querySelector('[data-kt-payment-mehtod-action="set_as_primary"]');
    if (!button) return;
    button.addEventListener('click', e => {
      e.preventDefault();

      // Popup confirmation
      Swal.fire({
        text: "Are you sure you would like to set this card as primary?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, set it!",
        cancelButtonText: "No, return",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          Swal.fire({
            text: "Your card was set to primary!.",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            }
          });
        }
        else if (result.dismiss === 'cancel') {
          Swal.fire({
            text: "Your card was not set to primary!.",
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
  };

  return {
    init: function () {
      initPaymentMethod();
      handlePrimaryButton();
    }
  }
}();

// Class definition
var PB_custom_interest = function () {
  var element;
  var submitButton;
  var cancelButton;
  var loadButton;
  var openButton;
  var validator;
  var form;

  // Init form inputs
  var initForm = function () {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'offset_date': {
            validators: {
              notEmpty: {
                message: 'Date is required'
              }
            }
          },
          'method': {
            validators: {
              notEmpty: {
                message: 'Method is required'
              }
            }
          },
          'int_rate': {
            validators: {
              notEmpty: {
                message: 'Interest rate is required'
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

    // Revalidate country field. For more info, plase visit the official plugin site: https://select2.org/
    $(form.querySelector('[name="method"]')).on('change', function () {
      // Revalidate the field when an option is chosen
      validator.revalidateField('method');
    });

    // Action buttons
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

            // Disable submit button whilst loading
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(function () {
              // Simulate form submission
              submitButton.removeAttribute('data-kt-indicator');

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

                  element.classList.toggle('d-none');

                  // Enable submit button after loading
                  submitButton.disabled = false;

                  // Reset form for demo purposes only
                  form.reset();
                }
              });

              //form.submit(); // Submit form
            }, 2000);
          }
          else {
            // Show popup warning
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
          element.classList.toggle('d-none');
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

    function toggleText(button_element, txt_1, txt_2) {
      if (button_element.innerText === txt_1) {
        button_element.innerText = txt_2;
      }
      else if (button_element.innerText === txt_2) {
        button_element.innerText = txt_1;
      }
      else {
        button_element.innerText = "--";
      }
    }

    openButton.addEventListener('click', function () {
      toggleText(openButton, 'Hide Form', 'Load Form')
      element.classList.toggle('d-none');
    });

    // cust_basic_int_table_load
    loadButton.addEventListener('click', function (e) {
      e.preventDefault();

      Swal.fire({
        titleText: 'Basic Interest Table',
        text: "Do you want to the table ?",
        icon: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, Load",
        cancelButtonText: "No, cancel",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          // loading table
          // TODO: load table using ajax
          document.getElementById('cust_basic_int_table').classList.remove('d-none');

        }
        else if (result.dismiss === 'cancel') {
          Swal.fire({
            text: "You have cancelled the loading!.",
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
      element = document.querySelector('#pb_cust_custom_interest');
      if (!element) return;
      // Basic int table
      loadButton = document.querySelector('#cust_basic_int_table_load');
      // custom int table
      openButton = document.querySelector('#pb_cust_custom_interest_open');
      form = element.querySelector('#pb_cust_custom_interest_form');
      submitButton = form.querySelector('#pb_cust_custom_interest_submit');
      cancelButton = form.querySelector('#pb_cust_custom_interest_cancel');


      initForm();
    }
  };
}();

var PB_customer_adding = function () {

  var formButtons;
  var formCards;
  var clickButton;
  var goBack;
  var add_cust;

  var initForm = function () {

    clickButton.forEach((item) => {
      item.addEventListener('click', function () {
        console.log(item.value);
        formCards.classList.remove('d-none');
        formButtons.classList.add('d-none');
        formCards.querySelector('#' + item.value).classList.remove('d-none');
        switch (item.value) {
          case 'add_customers':
            document.getElementById('pb_customer_group_bar').classList.add('d-none');
            add_cust.classList.remove('col-lg-8');
            add_cust.classList.remove('col-md-6');
            $('#pb_customers_repeat').repeater({
              initEmpty: false,
              defaultValues: {
                'text-input': 'foo'
              },
              show: function () {
                bootstrap_things();
                $(this).find('[data-kt-repeater="select2"]').select2();
                $(this).slideDown();
              },
              hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
              },
              ready: function () {
                $('[data-kt-repeater="select2"]').select2();
              }
            });
            break;

          case 'upload_customers':
            const id = "#pb_upload_customers";
            const dropzone = document.querySelector(id);

            var previewNode = dropzone.querySelector(".dropzone-item");
            previewNode.id = "";
            var previewTemplate = previewNode.parentNode.innerHTML;
            previewNode.parentNode.removeChild(previewNode);

            var myDropzone = new Dropzone(id, {
              url: "https://star.petrobyte.app/index.php", // Set the url for your upload script location
              parallelUploads: 1,
              maxFilesize: .5, // Max filesize in MB
              previewTemplate: previewTemplate,
              previewsContainer: id + " .dropzone-items",
              clickable: id + " .dropzone-select"
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

          case 'add_vehicle':
            document.getElementById('pb_customer_group_bar').classList.add('d-none');
            add_cust.classList.remove('col-lg-8');
            add_cust.classList.remove('col-md-6');

            $('#pb_vehicle_repeat').repeater({
              initEmpty: false,
              show: function () {
                $(this).find('[data-kt-repeater="select2"]').select2();
                $(this).slideDown();
              },

              hide: function (deleteElement) {
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
        document.getElementById('pb_customer_group_bar').classList.remove('d-none');
        add_cust.classList.add('col-lg-8');
        add_cust.classList.add('col-md-6');
        formCards.classList.add('d-none');
        formButtons.classList.remove('d-none');
        formCards.querySelector('#' + item.value).classList.add('d-none');
      })
    });
  }

  return {
    // Public functions
    init: function () {
      add_cust = document.getElementById('add_customer_page');
      if (!add_cust) return;
      // Basic int table
      formButtons = document.querySelector('#customer_adding_buttons');
      formCards = document.querySelector('#customer_adding_forms');
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

var PB_customer_chart = function () {

  var element = document.getElementById('pb_customer_total_sales');
  if (!element) {
    return {
      init: function () {
      }
    };
  }

  var height = parseInt(KTUtil.css(element, 'height'));
  var labelColor = KTUtil.getCssVariableValue('--kt-gray-500');
  var borderColor = KTUtil.getCssVariableValue('--kt-gray-200');
  var baseColor = KTUtil.getCssVariableValue('--kt-primary');
  var lightColor = KTUtil.getCssVariableValue('--kt-primary-light');

  var options = {
    series: [{
      name: 'Sold',
      data: [30, 40, 40, 90, 90, 70, 70, 90, 90, 70, 70]
    }],

    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: height,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
          customIcons: []
        }
      }
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'solid',
      opacity: 1
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor]
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px'
        }
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3
        }
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px'
        }
      },
      lines: {
        show: true,
      }
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      hover: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: '12px'
      },
      y: {
        formatter: function (val) {
          return render_into_Currency(val, 0, 1) + ' thousands'
        }
      }
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    markers: {
      strokeColor: baseColor,
      strokeWidth: 3
    }
  };

  return {
    init: function () {
      var chart = new ApexCharts(element, options);
      chart.render();
    }
  }
}();

var PB_customer_chart_sr = function () {

  var element = document.getElementById('pb_customer_sales_receipt');
  if (!element) {
    return {
      init: function () {
      }
    };
  }
  var height = parseInt(KTUtil.css(element, 'height'));
  var labelColor = KTUtil.getCssVariableValue('--kt-gray-500');
  var borderColor = KTUtil.getCssVariableValue('--kt-gray-200');
  var baseColor = KTUtil.getCssVariableValue('--kt-danger');
  var secondaryColor = KTUtil.getCssVariableValue('--kt-success');

  var options = {
    series: [{
      name: 'Sales',
      data: [44, 55, 57, 56, 61, 58, 44, 55, 57, 56, 61, 58]
    }, {
      name: 'Received',
      data: [76, 85, 101, 98, 87, 105, 76, 85, 101, 98, 87, 105]
    }],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
          customIcons: []
        }
      }
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: ['60%'],
        endingShape: 'rounded'
      },
    },

    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
    },

    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 5,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px'
        }
      }
    },
    fill: {
      opacity: 1
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      hover: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: '12px'
      },
      y: {
        formatter: function (val) {
          return render_into_Currency(val, 2, 1);
        }
      }
    },
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  return {
    init: function () {
      var chart = new ApexCharts(element, options);
      chart.render();
    }
  }
}();

var PB_customer_chart_sale = function () {

  var element = document.getElementById('pb_customer_stacks');
  if (!element) {
    return {
      init: function () {
        false;
      }
    };
  }

  var height = parseInt(KTUtil.css(element, 'height'));
  var labelColor = KTUtil.getCssVariableValue('--kt-gray-500');
  var borderColor = KTUtil.getCssVariableValue('--kt-gray-200');

  var baseColor = KTUtil.getCssVariableValue('--kt-primary');
  var baseLightColor = KTUtil.getCssVariableValue('--kt-warning-light');
  var secondaryColor = KTUtil.getCssVariableValue('--kt-danger');

  var options = {
    series: [{
      name: 'Sales, Paid',
      type: 'bar',
      stacked: true,
      data: [40, 50, 65, 70, 50, 30]
    }, {
      name: 'Sales, Unpaid',
      type: 'bar',
      stacked: true,
      data: [20, 20, 25, 30, 30, 20]
    }, {
      name: 'Total Sale',
      type: 'area',
      data: [60, 70, 90, 100, 80, 50]
    }],
    chart: {
      fontFamily: 'inherit',
      stacked: true,
      height: height,
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      bar: {
        stacked: true,
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: ['40%']
      },
    },
    legend: {
      show: true
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 1,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      max: 120,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px'
        }
      }
    },
    fill: {
      opacity: .8
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      hover: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: '12px'
      },
      y: {
        formatter: function (val) {
          return render_into_Currency(val, 2, 1)
        }
      }
    },
    colors: [baseColor, secondaryColor, baseLightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    markers: {
      strokeColor: baseLightColor,
      strokeWidth: 3
    }
  };

  return {
    init: function () {
      var chart = new ApexCharts(element, options);
      chart.render();
    }
  }
}();


// On document ready
KTUtil.onDOMContentLoaded(function () {

  // -f list
  PB_customer_listing.init();

  // -f goto
  //  PB_customer_search.init();

  // -f detail
  PB_alter_balance.init();
  PB_customer_table.init();
  PB_overdue_invoices.init();
  PB_custom_interest.init();
  // charts
  PB_customer_chart.init();
  PB_customer_chart_sr.init();
  PB_customer_chart_sale.init();

  // forms
  PB_customer_adding.init();

});