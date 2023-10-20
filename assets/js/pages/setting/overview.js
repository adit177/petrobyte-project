export const PB_bankDetails_copy = function () {
  // Private functions
  var initBankDetailCopy = function () {
    KTUtil.each(document.querySelectorAll('#bank_detail_cards [data-action="copy"]'), function (button) {
      var span = button.closest('div');
      var bank = KTUtil.find(span, '[data-bs-target="bank_card"]');

      var clipboard = new ClipboardJS(button, {
        target: bank,
        text  : function () {
          return bank.innerHTML;
        }
      });

      clipboard.on('success', function (e) {
        // Icons
        var svgIcon = button.querySelector('.svg-icon');
        var checkIcon = button.querySelector('.bi.bi-check');

        // exit if check icon is already shown
        if (checkIcon) {
          return;
        }

        // Create check icon
        checkIcon = document.createElement('i');
        checkIcon.classList.add('bi');
        checkIcon.classList.add('bi-check');
        checkIcon.classList.add('fs-2');

        // Append check icon
        button.appendChild(checkIcon);

        // Highlight target
        bank.classList.add('text-success');

        // Hide copy icon
        svgIcon.classList.add('d-none');

        // Set 3 seconds timeout to hide the check icon and show copy icon back
        setTimeout(function () {
          // Remove check icon
          svgIcon.classList.remove('d-none');
          // Show check icon back
          button.removeChild(checkIcon);

          // Remove highlight
          bank.classList.remove('text-success');
        }, 3000);
      });
    });
  }

  // Public methods
  return {
    init: function () {
      initBankDetailCopy();
    }
  }
}();

// Class definition
var PB_bankDetails_adding = function () {
  var submitButton;
  var cancelButton;
  var validator;
  var form;
  var modal;
  var modalEl;

  // Init form inputs
  var initForm = function () {
    $(form.querySelector('[name="bank_ac_type"]')).on('change', function () {
      // Revalidate the field when an option is chosen
      validator.revalidateField('bank_ac_type');
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
          'bank_name'     : {
            validators: {
              notEmpty: {
                message: 'Bank Name is required'
              }
            }
          },
          'account_number': {
            validators: {
              notEmpty: {
                message: 'Account number is required'
              },
              number  : {
                message: 'Invalid account number'
              }
            }
          },
          'bank_ac_type'  : {
            validators: {
              notEmpty: {
                message: 'Account type is required'
              }
            }
          },
          'bank_ifsc'     : {
            validators: {
              notEmpty    : {
                message: 'IFSC is required'
              },
              stringLength: {
                min    : 11,
                max    : 11,
                message: 'IFSC must contain 11 characters only'
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
    );

    // Action buttons
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
                text             : "Form has been successfully submitted!",
                icon             : "success",
                buttonsStyling   : false,
                confirmButtonText: "Ok, got it!",
                customClass      : {
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
              text             : "Sorry, looks like there are some errors detected, please try again.",
              icon             : "error",
              buttonsStyling   : false,
              confirmButtonText: "Ok, got it!",
              customClass      : {
                confirmButton: "btn btn-primary"
              }
            });
          }
        });
      }
    });

    cancelButton.addEventListener('click', function (e) {
      e.preventDefault();

      // Show success message. For more info check the plugin's official documentation: https://sweetalert2.github.io/
      Swal.fire({
        text             : "Are you sure you would like to cancel?",
        icon             : "warning",
        showCancelButton : true,
        buttonsStyling   : false,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText : "No, return",
        customClass      : {
          confirmButton: "btn btn-primary",
          cancelButton : "btn btn-active-light"
        }
      }).then(function (result) {
        if (result.value) {
          form.reset(); // Reset form
          modal.hide(); // Hide modal
        }
        else if (result.dismiss === 'cancel') {
          // Show error message.
          Swal.fire({
            text             : "Your form has not been cancelled!.",
            icon             : "error",
            buttonsStyling   : false,
            confirmButtonText: "Ok, got it!",
            customClass      : {
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
      modalEl = document.querySelector('#kt_modal_new_bank');

      if (!modalEl) {
        return;
      }

      modal = new bootstrap.Modal(modalEl);

      form = document.querySelector('#kt_modal_new_bank_form');
      submitButton = document.getElementById('kt_modal_new_bank_submit');
      cancelButton = document.getElementById('kt_modal_new_bank_cancel');

      initForm();
      handleForm();
    }
  };
}();


// On document ready
KTUtil.onDOMContentLoaded(function () {
  PB_bankDetails_adding.init();
  PB_bankDetails_copy.init();
});
