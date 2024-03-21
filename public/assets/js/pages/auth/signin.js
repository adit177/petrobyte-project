"use strict";

// Class definition
var KTSigninGeneral = function () {
  // Elements
  var form;
  var submitButton;
  var validator;
  var fpasswordbtn;
  var forgotpasswordform;
  var signindiv;

  // Handle form
  var handleForm = function (e) {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'email': {
            validators: {
              regexp: {
                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'The value is not a valid email address',
              },
              notEmpty: {
                message: 'Email address is required'
              }
            }
          },
          'password': {
            validators: {
              notEmpty: {
                message: 'The password is required'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',  // comment to enable invalid state icons
            eleValidClass: '' // comment to enable valid state icons
          })
        }
      }
    );

    // Handle form submit
    submitButton.addEventListener('click', function (e) {
      // Prevent button default action
      e.preventDefault();

      // Validate form
      validator.validate().then(function (status) {
        if (status === 'Valid') {
          // Show loading indication
          submitButton.setAttribute('data-kt-indicator', 'on');

          // Disable button to avoid multiple click
          submitButton.disabled = true;


          // Simulate ajax request
          setTimeout(function () {
            // Hide loading indication
            submitButton.removeAttribute('data-kt-indicator');

            // Enable button
            submitButton.disabled = false;

            // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
              text: "You have successfully logged in!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary"
              }
            }).then(function (result) {
              if (result.isConfirmed) {
                form.querySelector('[name="email"]').value = "";
                form.querySelector('[name="password"]').value = "";

                //form.submit(); // submit form
                var redirectUrl = form.getAttribute('data-kt-redirect-url');
                if (redirectUrl) {
                  location.href = redirectUrl;
                }
              }
            });
          }, 2000);
        }
        else {
          // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
          Swal.fire({
            text: "Sorry, Enter valid Username or Password",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-danger"
            }
          });
        }
      });
    });

    fpasswordbtn.onclick = function forgotpassword() {
      signindiv.classList.remove('d-flex');
      signindiv.classList.add('d-none');
      forgotpasswordform.classList.remove('d-none');
      forgotpasswordform.classList.add('d-flex');
    }
  }

  // Public functions
  return {
    // Initialization
    init: function () {
      form = document.querySelector('#kt_sign_in_form');
      submitButton = document.querySelector('#kt_sign_in_submit');
      fpasswordbtn = document.querySelector('#kt_forgot_password');
      signindiv = document.querySelector('#kt_sign_in');
      forgotpasswordform = document.querySelector('#kt_forgot_password_form');

      handleForm();
    }
  };


}();

var KTAuthResetPassword = function () {
  // Elements
  var form;
  var submitButton;
  var validator;
  var forgetpasswordform;
  var verifyresetform;

  var handleForm = function (e) {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'email': {
            validators: {
              regexp: {
                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'The value is not a valid email address',
              },
              notEmpty: {
                message: 'Email address is required'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',  // comment to enable invalid state icons
            eleValidClass: '' // comment to enable valid state icons
          })
        }
      }
    );

    submitButton.addEventListener('click', function (e) {
      e.preventDefault();

      // Validate form
      validator.validate().then(function (status) {
        if (status == 'Valid') {
          // Show loading indication
          submitButton.setAttribute('data-kt-indicator', 'on');

          // Disable button to avoid multiple click
          submitButton.disabled = true;

          // Simulate ajax request
          setTimeout(function () {
            // Hide loading indication
            submitButton.removeAttribute('data-kt-indicator');

            // Enable button
            submitButton.disabled = false;

            // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
              text: "We have send a password reset link to your email.",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary"
              }
            }).then(function (result) {
              if (result.isConfirmed) {
                form.querySelector('[name="email"]').value = "";
                //form.submit();
                forgetpasswordform.classList.remove('d-flex');
                forgetpasswordform.classList.add('d-none');
                verifyresetform.classList.remove('d-none');
                verifyresetform.classList.add('d-flex');


                // var redirectUrl = form.getAttribute('data-kt-redirect-url');
                // if (redirectUrl) {
                //     location.href = redirectUrl;
                // }
              }
            });
          }, 1500);
        }
        else {
          // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
          Swal.fire({
            text: "Sorry, Kindly Enter a Valid Email",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary"
            }
          });
        }
      });
    });

  }

  // Public Functions
  return {
    // public functions
    init: function () {
      form = document.querySelector('#kt_password_reset_form');
      submitButton = document.querySelector('#kt_password_reset_submit');
      forgetpasswordform = document.querySelector('#kt_forgot_password_form');
      verifyresetform = document.querySelector('#verify_reset');
      handleForm();
    }
  };
}();

var KTSigninTwoSteps = function () {
  // Elements
  var form;
  var submitButton;
  var twostepform;
  var newpasswordform;

  // Handle form
  var handleForm = function (e) {
    // Handle form submit
    submitButton.addEventListener('click', function (e) {
      e.preventDefault();

      var validated = true;

      var inputs = [].slice.call(form.querySelectorAll('input[maxlength="1"]'));
      inputs.map(function (input) {
        if (input.value === '' || input.value.length === 0) {
          validated = false;
        }
      });

      if (validated === true) {
        // Show loading indication
        submitButton.setAttribute('data-kt-indicator', 'on');

        // Disable button to avoid multiple click
        submitButton.disabled = true;

        // Simulate ajax request
        setTimeout(function () {
          // Hide loading indication
          submitButton.removeAttribute('data-kt-indicator');

          // Enable button
          submitButton.disabled = false;

          // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
          Swal.fire({
            text: "You have been successfully verified!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary"
            }
          }).then(function (result) {
            if (result.isConfirmed) {
              inputs.map(function (input) {
                input.value = '';
                twostepform.classList.remove('d-flex');
                twostepform.classList.add('d-none');
                newpasswordform.classList.remove('d-none');
                newpasswordform.classList.add('d-flex');
              });

              // var redirectUrl = form.getAttribute('data-kt-redirect-url');
              // if (redirectUrl) {
              //     location.href = redirectUrl;
              // }
            }
          });
        }, 1000);
      }
      else {
        swal.fire({
          text: "Please enter valid security code and try again.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          }
        }).then(function () {
          KTUtil.scrollTop();
        });
      }
    });
  }

  var handleType = function () {
    var input1 = form.querySelector("[name=code_1]");
    var input2 = form.querySelector("[name=code_2]");
    var input3 = form.querySelector("[name=code_3]");
    var input4 = form.querySelector("[name=code_4]");
    var input5 = form.querySelector("[name=code_5]");
    var input6 = form.querySelector("[name=code_6]");

    input1.focus();

    input1.addEventListener("keyup", function () {
      if (this.value.length === 1) {
        input2.focus();
      }
    });

    input2.addEventListener("keyup", function () {
      if (this.value.length === 1) {
        input3.focus();
      }
    });

    input3.addEventListener("keyup", function () {
      if (this.value.length === 1) {
        input4.focus();
      }
    });

    input4.addEventListener("keyup", function () {
      if (this.value.length === 1) {
        input5.focus();
      }
    });

    input5.addEventListener("keyup", function () {
      if (this.value.length === 1) {
        input6.focus();
      }
    });

    input6.addEventListener("keyup", function () {
      if (this.value.length === 1) {
        input6.blur();
      }
    });
  }

  // Public functions
  return {
    // Initialization
    init: function () {
      form = document.querySelector('#kt_sing_in_two_steps_form');
      submitButton = document.querySelector('#kt_sing_in_two_steps_submit');
      twostepform = document.querySelector('#verify_reset');
      newpasswordform = document.querySelector('#new_password');
      handleForm();
      handleType();
    }
  };
}();

var KTAuthNewPassword = function () {
  // Elements
  var form;
  var submitButton;
  var validator;
  var passwordMeter;

  var handleForm = function (e) {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(
      form,
      {
        fields: {
          'password': {
            validators: {
              notEmpty: {
                message: 'The password is required'
              },
              callback: {
                message: 'Please enter valid password',
                callback: function (input) {
                  if (input.value.length > 0) {
                    return validatePassword();
                  }
                }
              }
            }
          },
          'confirm-password': {
            validators: {
              notEmpty: {
                message: 'The password confirmation is required'
              },
              identical: {
                compare: function () {
                  return form.querySelector('[name="password"]').value;
                },
                message: 'The password and its confirm are not the same'
              }
            }
          },
          'toc': {
            validators: {
              notEmpty: {
                message: 'You must accept the terms and conditions'
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger({
            event: {
              password: false
            }
          }),
          bootstrap: new FormValidation.plugins.Bootstrap5({
            rowSelector: '.fv-row',
            eleInvalidClass: '',  // comment to enable invalid state icons
            eleValidClass: '' // comment to enable valid state icons
          })
        }
      }
    );

    submitButton.addEventListener('click', function (e) {
      e.preventDefault();

      validator.revalidateField('password');

      validator.validate().then(function (status) {
        if (status == 'Valid') {
          // Show loading indication
          submitButton.setAttribute('data-kt-indicator', 'on');

          // Disable button to avoid multiple click
          submitButton.disabled = true;

          // Simulate ajax request
          setTimeout(function () {
            // Hide loading indication
            submitButton.removeAttribute('data-kt-indicator');

            // Enable button
            submitButton.disabled = false;

            // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
              text: "You have successfully reset your password!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn btn-primary"
              }
            }).then(function (result) {
              if (result.isConfirmed) {
                form.querySelector('[name="password"]').value = "";
                form.querySelector('[name="confirm-password"]').value = "";
                passwordMeter.reset();  // reset password meter
                //form.submit();

                var redirectUrl = form.getAttribute('data-kt-redirect-url');
                if (redirectUrl) {
                  location.href = redirectUrl;
                }
              }
            });
          }, 1500);
        }
        else {
          // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
          Swal.fire({
            text: "Sorry, Valid Password is required",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-danger"
            }
          });
        }
      });
    });

    form.querySelector('input[name="password"]').addEventListener('input', function () {
      if (this.value.length > 0) {
        validator.updateFieldStatus('password', 'NotValidated');
      }
    });
  }

  var validatePassword = function () {
    return (passwordMeter.getScore() === 100);
  }

  // Public Functions
  return {
    // public functions
    init: function () {
      form = document.querySelector('#kt_new_password_form');
      submitButton = document.querySelector('#kt_new_password_submit');
      passwordMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));

      handleForm();
    }
  };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTSigninGeneral.init();
  KTAuthResetPassword.init();
  KTSigninTwoSteps.init();
  KTAuthNewPassword.init();

});
