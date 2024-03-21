import {kws, plg} from "../base/const.js";
import {atr} from "../base/attributes.js";

var fun = function () {
  // https://robinherbots.github.io/Inputmask/#/documentation
  // private variables
  let currencySign = "₹ "; // default currency sign is '₹'
  let maskObject = {};


  const _amount_unmask = (maskedValue, unmaskedValue) => {
    // Remove commas from the input value
    let cleanedInput = maskedValue.replace(/^[₹$]\s*/, '').replace(/,/g, '');

    cleanedInput = cleanedInput === '' ? '0' : cleanedInput;
    // Calculate the number of decimal places based on the position of the decimal point
    const decimalIndex = cleanedInput.indexOf('.');
    const decimalPlaces = cleanedInput.length - decimalIndex - 1;

    // Convert the input value to a number by removing the decimal point
    const value = parseInt(cleanedInput.replace('.', ''));


    // Divide the value by 10^(number of decimal places) to get the desired result
    const _returnValue = Number((value / Math.pow(10, decimalPlaces)).toFixed(decimalPlaces));
    console.log('value', _returnValue);
    return _returnValue;
  }

  const execute = (target) => {

    let method, maskOptions;

    // check if already initialized
    if (target.getAttribute(atr.status.initiated) === '1') {
      return;
    }

    // get options
    method = target.getAttribute(atr.core.method);

    maskOptions = createMasks(method);


    if (target.getAttribute(atr.mask.extend) === '1') {
      Object.keys(atr.mask.options).forEach((value) => {
        maskOptions[value] = target.hasAttribute(atr.mask.options[value])
          ? target.getAttribute(atr.mask.options[value])
          : maskOptions[value];
      });
    }

    // console.log(method, maskOptions);
    const uid = KTUtil.getUniqueId('mask');

    // initialize the mask, m-2: Inputmask(maskOptions).mask(target);
    var inputmask = new Inputmask(maskOptions);
    inputmask.mask(target);

    maskObject[uid] = inputmask;

    // default options
    Inputmask.extendDefaults({
      // default options
      clearMaskOnLostFocus: true,
      autoUnmask          : true,
      clearIncomplete     : false,
      showMaskOnFocus     : true,
      showMaskOnHover     : true,
      onUnMask            : function (maskedValue, unmaskedValue, options) {
        // console.log('unmaskedValue: ' + unmaskedValue);
        let filterValue;
        if (options.hasOwnProperty('unmaskFun')) {
          switch (options['unmaskFun']) {
            case 'amount':
              filterValue = _amount_unmask(maskedValue, unmaskedValue);
              break;
            default:
              filterValue = unmaskedValue;
          }
        }
        else {
          filterValue = unmaskedValue;
        }
        // console.log('filterValue: ' + filterValue);
        return filterValue;
      },

      // default events.
      onKeyValidation: function (key, result) {
        // console.log('key: ' + key + ' result: ' + result);
        if (!result) {
          console.log('input not valid for add into mask.')
        }
      }
    });

    // update status as initialize
    target.setAttribute(atr.plugins.id, uid);
    target.setAttribute(atr.status.initiated, '1');
  }
  const _run = (element, control) => {


    const _form = (form) => {
      _initialize(form.querySelectorAll(querySA(atr.core.control, kws.plugin.mask)));
    }

    const _collective = () => {
      element.querySelectorAll('form' + querySA(atr.core.control, control)).forEach((form) => {
        _form(form);
      });
    }

    const _toRun = () => {
      if (element.tagName === 'FORM') {
        control === false || element.getAttribute(atr.core.control) === control
          ? _form(element)
          : printError('form element does not have the control attribute');
      }
      else {
        _collective()
      }
    }
    _toRun();
  }

  function _initialize(targets) {
    // execute for each target
    targets.forEach(execute);
  }


  const createMasks = (method) => {

    const gstVerify = (gstin) => {
      console.log(gstin.target);
      //      gstin.target.classList.add('is-valid');

      console.log('GSTIN verified.: ' + gstin.target.value);
    }

    const _mask_theAll = () => {
      return {
        mask                : ["99,99,999.99", "X"],
        prefix              : '₹ ',
        jitMasking          : true,
        numericInput        : true,
        rightAlignNumerics  : false,
        clearMaskOnLostFocus: true,
        showMaskOnFocus     : true,
        showMaskOnHover     : true,
        definitions         : {
          "X": {
            validator: "[xX]",
            casing   : "upper"
          }
        }
      }
    }
    // number
    const _mask_amount = () => {
      return {
        alias               : "numeric",
        groupSeparator      : ",",
        autoGroup           : false,
        digits              : 2,
        digitsOptional      : false,
        radixPoint          : '.',
        prefix              : currencySign,
        suffix              : '',
        min                 : '0',
        clearMaskOnLostFocus: true,
        placeholder         : "0"
      }
    }
    const _mask_volume = () => {
      return {
        alias               : "numeric",
        groupSeparator      : ",",
        autoGroup           : false,
        digits              : 2,
        digitsOptional      : false,
        radixPoint          : '.',
        prefix              : '',
        suffix              : ' Unit',
        min                 : '0',
        clearMaskOnLostFocus: true,
        placeholder         : "0"
      }
    }
    const _mask_curr = () => {
      return {
        mask                : `${currencySign}(,99){+|1},999.00`,
        positionCaretOnClick: "radixFocus", // [none, lvp, select, ignore, radixFocus]
        groupSeparator      : ",",
        radixPoint          : ".",
        _radixDance         : true,
        numericInput        : true,
        greedy              : false,
        placeholder         : "0",
        rightAlignNumerics  : true,
        clearMaskOnLostFocus: true,
        rightAlign          : true,
        autoUnmask          : true,
        definitions         : {"0": {validator: "[0-9\uFF11-\uFF19]"},},
        // custom
        unmaskFun: 'amount'
      }
    }
    const _mask_define = () => {
      return {
        mask                : ["₹ 99,99,999.99", "X"],
        numericInput        : true,
        rightAlignNumerics  : false,
        rightAlign          : true,
        clearMaskOnLostFocus: true,
        jitMasking          : true,
        greedy              : false,
        autoUnmask          : true,
        definitions         : {
          "X": {
            validator: "[xX]",
            casing   : "upper"
          }
        },
        // custom
        unmaskFun: 'amount'
      }
    }
    const _mask_number = () => {
      return {
        numericInput        : false,
        alias               : "numeric",
        groupSeparator      : ",",
        digits              : 3,
        digitsOptional      : true,
        clearMaskOnLostFocus: true,
        prefix              : "",
        suffix              : "",
        placeholder         : "0"
      }
    }
    // global
    const _mask_gst = () => {
      return {
        mask  : "9{2}-A{5}9{4}A{1}-X{3}",
        greedy: true,
        //        placeholder         : "08-AAICB3281H-1ZM",
        clearMaskOnLostFocus: true,
        oncomplete          : function (e) {
          gstVerify(e)
        },
        onincomplete        : function (e) {
          alert('inputmask incomplete');
        },
        definitions         : {
          'X': {
            validator: "[0-9A-Za-z]",
            casing   : "upper"
          }
        }
      }
    }
    const _mask_pan = () => {
      return {
        mask  : "A{5}9{4}A{1}",
        greedy: false,
        // placeholder: "AAICB3281H",
        clearMaskOnLostFocus: true,
      }
    }
    const _mask_vehicle = () => {
      return {
        mask                : "A{2}-9{2}-A{2}-9{4}",
        greedy              : true,
        placeholder         : "MH-12-AB-1234",
        clearMaskOnLostFocus: true,
      }
    }
    const _mask_ifsc = () => {
      return {
        mask                : "A{4}9{7}",
        greedy              : false,
        placeholder         : "SBIN0000001",
        clearMaskOnLostFocus: true,
      }
    }
    //
    const _mask_phone = () => {
      return {
        mask  : "9{5}-9{5}",
        prefix: "+91",
        greedy: false,
      }
    }
    const _mask_mobile = () => {
      return {
        mask                : "9{10}",
        greedy              : true,
        placeholder         : "8303270125",
        clearMaskOnLostFocus: true,
      }
    }
    const _mask_email = () => {
      return {
        // mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
        alias        : "email",
        greedy       : false,
        onBeforePaste: function (pastedValue, opts) {
          pastedValue = pastedValue.toLowerCase();
          return pastedValue.replace("mailto:", "");
        },
      }
    }
    // other
    const _mask_collection = () => {
      return {}
    }
    const _mask_meter = () => {
      return {
        // todo: update this as per shift requirement. get more from https://robinherbots.github.io/Inputmask/#/documentation
        alias         : "decimal",
        groupSeparator: "_",
        digits        : 3,
        digitsOptional: false,
        placeholder   : "0",
        autoUnmask    : true,
        inputType     : 'number',
        // oncomplete: function () { alert('sale calculated.'); },
      }
    }
    const _mask_date = () => {
      return {
        alias      : "datetime",
        inputFormat: "dd-mm-yyyy",
        greedy     : true,
      }
    }
    const _mask_other = () => {
      return {
        "mask"  : "9",
        "repeat": 10,
        "greedy": false
      }
    }


    // looks into https://github.com/RobinHerbots/Inputmask#via-inputmask-class
    switch (method) {
      case plg.inputMask.method.theall:
        return _mask_theAll();
      case plg.inputMask.method.amount:
        return _mask_amount();
      // number
      case plg.inputMask.method.volume:
        return _mask_volume();
      case plg.inputMask.method.currency:
        return _mask_curr();
      case plg.inputMask.method.number:
        return _mask_number();
      case plg.inputMask.method.define:
        return _mask_define();
      // global
      case plg.inputMask.method.gstin:
        return _mask_gst();
      case plg.inputMask.method.pan:
        return _mask_pan();
      case plg.inputMask.method.vehicleNumber:
        return _mask_vehicle();
      case plg.inputMask.method.ifsc:
        return _mask_ifsc();
      // connect
      case plg.inputMask.method.phone:
        return _mask_phone();
      case plg.inputMask.method.email:
        return _mask_email();
      case plg.inputMask.method.mobileNumber:
        return _mask_mobile();
      // other
      case plg.inputMask.method.collection:
        return _mask_collection();
      case plg.inputMask.method.meter:
        return _mask_meter();
      case plg.inputMask.method.date:
        return _mask_date();
      case plg.inputMask.method.other:
        return _mask_other();
    }
  }

  const _unmaskValue = (input) => {

    if (1) {
      if (input.inputmask) {
        return input.inputmask.unmaskedvalue()
      }
      else {
        return input.value;
      }
    }
    else {
      const instanceID = input.getAttribute(atr.plugins.id)
      const inputmask = maskObject.hasOwnProperty(instanceID) ? maskObject[instanceID] : null;
      var unformattedMask = inputmask.unmask(); //1234567890
      return unformattedMask;
    }
  }

  const _unmaskValues = (element) => {
    // check the element type
    if (element.tagName === 'INPUT') {
      return _unmaskValue(element);
    }
    else {
      let values = {};
      element.querySelectorAll(querySA(atr.core.control, kws.plugin.mask))
        .forEach((input) => {
          console.log(input.name);
          values[input.name] = _unmaskValue(input);
        });
      return values;
    }

  }

  const _removeMask = (element) => {
    element.querySelectorAll(querySA(atr.core.control, kws.plugin.mask))
      .forEach((input) => {
        if (input.inputmask) {
          input.inputmask.remove();
        }
      });
  }

  const _setValue = (input, value) => {
    switch (2) {
      case 1:
        input.inputmask.setValue(value);
        break;
      case 2: // default
        Inputmask.setValue(input, value);
        break;
      case 3:
        $(input).inputmask("setvalue", value);
        break;
    }
  }

  const _page = () => {
    // get all the select elements [inside or outside of a form]
    const maskNodeList = PBapp.querySelectorAll(querySA(atr.core.control, kws.plugin.mask));
    // filter out the selects outside a form
    const maskDirects = [].slice.call(maskNodeList).filter((mask) => {
      return !mask.closest('form');
    });
    // execute:
    _initialize(maskDirects);
  }

  // Public methods
  return {

    $_unmask: function (element) {
      return _unmaskValues(element);
    },

    $_remove: function (element) {
      return _removeMask(element);
    },

    $_set: function (input, value) {
      return _setValue(input, value);
    },

    $_page: function () {
      _page();
    },

    $_manual: function (element, control = false) {
      _run(element, control);
    },

    $_single: function (input) {
      _initialize([input]);
    }
  };
};

const plg_inputMask = fun();
export default plg_inputMask;

