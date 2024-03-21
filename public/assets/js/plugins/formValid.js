import {plg, kws, glob} from "../base/const.js";
import {atr} from "../base/attributes.js";
import plg_sweetAlert from "./sweetAlert.js";
// Class Definitions
let fun = function () {
  // make this enable for direct forms also.
  let validator = [];
  let valid_status = [];
  let fno = 0;
  let callbacks_success = [];
  let callbacks_error = [];
  let doescallbackExist = {};

  const getValidator = (form_no) => {
    console.log("getValidator", validator);
    return validator[form_no];
  }

  const generate_options = (input) => {
    let finalReturn = {};
    const _switchInMethods = (method) => {
      switch (method) {
        case plg.formValid.method.length:
          let stringLength = {};
          stringLength.stringLength = {
            min    : input.getAttribute('minlength') ?? 0,
            max    : input.getAttribute('maxlength') ?? 255,
            message: 'Length should match the criteria.'
          };
          return stringLength;

        case plg.formValid.method.empty:

          // set notEmpty validator.
          let notEmpty = {};
          notEmpty.notEmpty = {
            message: input.getAttribute('title') ?? 'This field is required.'
          };
          return notEmpty;

        case plg.formValid.method.number:
          let numeric = {};

          numeric.numeric = {
            message: 'The value is not a number',
            // The default separators
            thousandsSeparator: ',',
            decimalSeparator  : '.',
          }
          return numeric;

        case plg.formValid.method.case:
          let stringCase = {};
          stringCase.stringCase = {
            message: 'Value must be in uppercase',
            case   : 'upper',
          }
          return stringCase;

        case plg.formValid.method.between:
          let between = {};
          between.between = {
            min    : input.getAttribute('min') ?? 0,
            max    : input.getAttribute('max') ?? 255,
            message: 'Value must be between ' + input.getAttribute('min') + ' and ' + input.getAttribute('max'),
          }
          return between;

        case plg.formValid.method.zip:
          let zipCode = {};
          zipCode.zipCode = {
            country: $R_common_obj.getShared('country'),
            message: 'The value is not a valid Postal code',
          }
          return zipCode;
      }
    }

    if (input.hasAttribute(atr.valid.methods)) {
      input.getAttribute(atr.valid.methods).split(',').forEach((method) => {
        finalReturn = {...finalReturn, ..._switchInMethods(plg.formValid.method[method])};
      });
      return finalReturn;
    }
    else {
      return _switchInMethods(plg.formValid.method.empty);
    }
  }

  // ------------------------------
  let init_validation = function (form, no) {
    // select inputs for validation.
    const inputs_for_valid = form.querySelectorAll('[required]');

    let valid, form_fields = {};
    inputs_for_valid.forEach((input) => {
      valid = {};
      // generate options for each input.
      valid.validators = generate_options(input);
      // set input name as key and valid object as value.
      form_fields[input.name] = valid;
    });
    // delete old validator if existed.
    if (validator[no]) {
      delete validator[no];
    }
    validator[no] = FormValidation.formValidation(form, {
      fields : form_fields,
      plugins: {
        trigger  : new FormValidation.plugins.Trigger(),
        bootstrap: new FormValidation.plugins.Bootstrap5(
          {
            rowSelector    : '.fv-row',
            eleInvalidClass: 'is-invalid', // border border-1 border-danger
            eleValidClass  : '' // is-valid
          }
        )
      }
    });
  };

  let _get_validation_status = async function (fno) {
    // get the validation promise and wait for it to resolve.
    await getValidator(fno).validate().then((sts) => {
      valid_status[fno] = sts === 'Valid';
    });
    // return the status after validation promise resolved.
    return valid_status[fno] ?? false;
  }

  const save_callback = (fno, cb_success, cb_error) => {
    doescallbackExist['form' + fno] = true;
    callbacks_success[fno] = cb_success;
    callbacks_error[fno] = cb_error;
  }

  const call_success_function = (fno) => {
    // check: if callback exists.
    if (!doescallbackExist.hasOwnProperty('form' + fno)) {
      return;
    }
    try {
      callbacks_success[fno]();
    } catch (error) {
      glob.env === kws.env.dev
        ? console.log('critical error: ' + error)
        : false;
    }
  }
  const call_error_function = (fno) => {
    // check: if callback exists.
    if (!doescallbackExist.hasOwnProperty('form' + fno)) {
      return;
    }
    try {
      callbacks_error[fno]();
    } catch (error) {
      glob.env === kws.env.dev
        ? console.log('critical error: ' + error)
        : false;
    }
  }

  let run_validation = function (submitButton, form_sno, formEle) {
    submitButton.addEventListener(kws.listen.click, function (e) {
      // Prevent default button action
      e.preventDefault();

      // Validate form before submit
      if (validator[form_sno]) {
        validator[form_sno].validate().then((sts) => {
          if (sts === 'Valid') {
            toastr.success('Form Validated Successfully');
            call_success_function(form_sno);
          }
          else {
            call_error_function(form_sno);
            // throw swal for user acknowledge.
            plg_sweetAlert.$_alert(
              ['STOP!! Incomplete Form', 'Some inputs are missing'],
              {
                confirm: [true, 'Okay, Let me fix it.', 'btn btn-light-danger']
              },
              [4, 5]
            )
          }
        });
      }
      else {
        plg_sweetAlert.$_alert(
          ['Unable to Validate form', 'Form validation has not initiated properly.'],
          {
            confirm: [true, 'Okay, Let me fix it.', 'btn btn-light-danger']
          },
          [4, 5]
        );
      }
    });
  }

  let _renew_validation = (formEle, fno) => {
    init_validation(formEle, fno);
  }

  const _manual_execute = (element, control) => {
    if (element.tagName === 'FORM') {
      if (element.hasAttribute('data-form-valid') && element.getAttribute('data-form-valid') !== kws.labels.page) {
        _execute(element)
      }
      else {
        printError('invalid form has called for form valid, either remove data-form-valid="page" or add data-form-valid attribute');
      }
    }
    else {
      let theString;
      if (control !== undefined) {
        theString = `form${querySA(atr.core.control, control)}`;
      }
      else {
        theString = 'form[data-form-valid]:not([data-form-valid="page"])';
      }
      element.querySelectorAll(theString)
        .forEach((form) => {
          _execute(form);
        });
    }
  }

  const _execute = (element) => {
    console.log(element);
    // get form id
    const formId = element.id;
    // querySA(atr.form.submit)
    const findString = `button[form="${formId}"][${atr.form.submit}]`;
    const submitButtons = PBapp.querySelectorAll(findString);

    switch (submitButtons.length) {
      case 0:
        // if zero submit button found.
        printError('no submit button found for the form' + formId)
        break;
      case 2:
        // if two submit buttons found.
        printError('two submit buttons found for single form. kindly remove one.');
        break;
      default:
        break;
      // if one submit button found.
    }

    submitButtons.forEach((button) => {
      const formEle = button.form;

      // getting unique form id.
      fno = formEle.hasAttribute(atr.form.sno)
        // if developer added FNO into form.
        ? formEle.getAttribute(atr.form.sno)
        // if developer added FNO into button.
        : (button.hasAttribute(atr.form.sno) ? button.getAttribute(atr.form.sno) : ((fno) + 1));

      // collect and assign all validations
      init_validation(formEle, fno);

      // validation on submit button click.
      run_validation(button, fno, formEle);

    });
  }

  const _page_exe = () => {

    return;

    // get all forms for validation at DOM stage.
    const forms_for_validation = PBapp.querySelectorAll('form' + querySA(atr.form.valid, kws.labels.page));

    console.log(forms_for_validation);
    // if no form found for validation.
    if (forms_for_validation.length === 0) {
      glob.env === kws.env.dev
        ? console.log('-i: no form found for validation on Page Load.')
        : false;
      return;
    }

    // init validate one by one on the form.
    forms_for_validation.forEach((element) => {
      [kws.plugin.repeater, kws.plugin.combo].indexOf(element.getAttribute(atr.core.control)) !== -1
        ? justPass()
        : _execute(element);
    });
  }

  const _event_on_validation = (fno, eventType, callback) => {

    const fv = getValidator(fno);
    // console.log(event.formValidation);

    if (Object.values(plg.formValid.trigger.keys).indexOf(eventType) === -1) {
      console.log('invalid event type');
      return false;
    }

    switch (eventType) {
      case plg.formValid.trigger.keys.field:
        fv.on('core.field.added', function (event) {
          callback('added', event);
        });
        break;

      case plg.formValid.trigger.keys.form:
        fv.on('core.form.notvalidated', function (event) {
          console.log('core.form.notvalidated');
          callback('notvalidated', event);
        });
        fv.on('core.form.validating', function (event) {
          console.log('core.form.validating');
          // callback('validating', event);
        });
        fv.on('core.form.invalid', function (event) {
          console.log('core.form.invalid');
          callback('invalid', event);
        });
        fv.on('core.form.valid', function (event) {
          console.log('core.form.valid');
          callback('valid', event);
        });
        fv.on('core.form.reset', function (event) {
          console.log('core.form.reset');
          callback('reset', event);
        });
        break;

      case plg.formValid.trigger.keys.validator:
        fv.on('core.validator.validated', function (event) {
          console.log('core.validator.validated');
        });
        fv.on('core.validator.invalid', function (event) {
          console.log('core.validator.invalid')
        });
        break;
    }
  }

  const _event_checking = (type) => {
    switch (type) {

      case plg.formValid.trigger.form.notvalidated:
        // Triggered when a particular validator isn't ignored and will not be excuted

        break;

      case plg.formValid.trigger.form.validating:
        // Triggered when starting validating the form
        break;

      case plg.formValid.trigger.form.invalid:
        // Triggered when the form is completely validated, and all fields are invalid
        break;

      case plg.formValid.trigger.form.valid:
        // Triggered when the form is completely validated, and all fields are valid
        break;

      case plg.formValid.trigger.form.reset :
        // Triggered after reseting the form

        break;
    }
  }

  // Public methods
  return {
    // exe on page load.
    $_page: function () {
      _page_exe();
    },

    // used in form repeater.
    $_manual: function (element, control = undefined) {
      // todo: add control for proper initialization of plugins.
      _manual_execute(element, control);
    },

    // when user changes value of inputs and check the validator.
    $_changes: function (form, fno) {
      _renew_validation(form, fno);
    },

    // get status, it returns promise.
    $_get_status: function (fno) {
      return _get_validation_status(fno);
    },

    // pass the function to call on success and error.
    $_callback: function (fno, cb_success, cb_error) {
      save_callback(fno, cb_success, cb_error);
    },

    // inbuilt events of the validator.
    $_event: function (fno, trigger_type, callback) {
      return _event_on_validation(fno, trigger_type, callback);
    },
  };
};

const plg_formValid = fun();
export default plg_formValid;


