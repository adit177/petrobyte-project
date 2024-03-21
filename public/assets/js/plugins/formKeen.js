import {plg} from "../base/const.js";
import {atr} from "../base/attributes.js";

var fun = function () {

  const params_validation = (type, params) => {

    const pv__splitter = () => {
      let temp = _dc.plugin.formKeen.splitter;
      if (Object.keys(params).length) {
        if (params.size) {
          temp.size = params.size;
        }
        if (params.max) {
          temp.max = params.max;
        }
      }
      return temp;
    }

    const pv__block = () => {
      let temp = _dc.plugin.formKeen.block;
      if (Object.keys(params).length) {
        if (params.text) {
          temp.text = params.text;
        }
        if (params.color) {
          temp.color = params.color;
        }
        if (params.opacity) {
          temp.opacity = params.opacity;
        }
      }
      return temp;
    }

    const pv__maxlength = () => {
      let temp = _dc.plugin.formKeen.maxlength;
      if (Object.keys(params).length) {
        if (params.placement) {
          temp.placement = params.placement;
        }
        if (params.warn) {
          temp.warn = params.warn;
        }
        if (params.limit) {
          temp.limit = params.limit;
        }
      }
      return temp;
    }

    switch (type) {
      case plg.formKeen.method.splitter:
        return pv__splitter();

      case plg.formKeen.method.block:
        return pv__block();

      case plg.formKeen.method.maxlength:
        return pv__maxlength();

    }
  }
  // common properties
  let blockUI = {};

  var __radio = function (form) {
    var buttonsGroup = [].slice.call(form.querySelectorAll('[data-pb-buttons="true"]'));

    buttonsGroup.map(function (group) {
      if (group.getAttribute(atr.status.initiated) === "1") {
        return;
      }

      var selector = group.hasAttribute('data-kt-buttons-target') ? group.getAttribute('data-kt-buttons-target') : 'label';
      var activeButtons = [].slice.call(group.querySelectorAll(selector));

      // Toggle Handler
      KTUtil.on(group, selector, 'click', function (e) {
        activeButtons.map(function (button) {
          button.classList.remove('active');
        });

        this.classList.add('active');
      });

      group.setAttribute(atr.status.initiated, "1");
    });
  }

  var __slider = function (form) {
    var sliders = form.querySelectorAll('[data-pb-control="slider"]');
    sliders.forEach(function (slider) {
      var prefix = slider.getAttribute("data-pb-value");
      if (!slider.hasAttribute('data-kt-initialized')) {
        slider.setAttribute('data-kt-initialized', '1');
        var sInput = slider.querySelector('input');
        var sSpan = slider.querySelector('[data-pb-call]')
        noUiSlider.create(slider, {
          start   : 100,
          step    : 25,
          padding : [25],
          tooltips: [true],
          format  : {
            from: Number,
            to  : function (value) {
              return sliderTT(value, prefix);
            }
          },
          range   : {
            min: 0,
            max: 200
          },
          pips    : false
        });
        slider.noUiSlider.on("update", function (value) {
          sSpan.innerHTML = value;
          sInput.value = sSpan.innerText.replace(/\D/g, "");
        });
      }
    })
  }

  const sliderTT = function (value, prefix) {
    return '<span class="fs-5">' + prefix + ': <span class="fw-bold">' + value + '</span> %</span>';
  }

  var __block = function (target, params) {
    // https://preview.keenthemes.com/html/keen/docs/general/blockui

    const _param = params_validation(plg.formKeen.method.block, params);
    let options = {
      message     : `<div class="blockui-message"><span class="spinner-border text-${_param.color}"></span>${_param.text}</div>`,
      overlayClass: `bg-${_param.color} bg-opacity-${_param.opacity}`
    };

    let blockId;
    if (target.getAttribute(atr.element.block) !== null) {
      blockId = KTUtil.getUniqueId('block');
      target.setAttribute(atr.element.block, blockId);
    }
    else {
      blockId = target.getAttribute(atr.element.block);
    }

    if (!blockUI.hasOwnProperty(blockId)) {
      blockUI[blockId] = new KTBlockUI(target, options);
    }
    // doing block and release as toggle.
    if (blockUI[blockId].isBlocked() === true) {
      blockUI[blockId].release();
    }
    else {
      blockUI[blockId].block();
    }
  }


  var __splitter = function (targetEl, params) {
    const elements = targetEl.querySelectorAll(querySA(atr.input.splitter, false));

    // param validation.
    const _param = params_validation(plg.formKeen.method.splitter, params);

    // run.
    elements.forEach((el) => {
      $(el).multiselectsplitter({
        onlySameGroup     : true,
        clearOnFirstChange: true,
        groupCounter      : true,
        selectSize        : _param.size,
        maximumSelected   : _param.max,
        // events functions
        maximumAlert     : function (maximumSelected) {
          console.log("You choose " + (maximumSelected + 1) + " options. Are you crazy ?");
        },
        createFirstSelect: function (label, $originalSelect) {
          return "<option class=\"text-success\">prefix - " + label + "</option>";
        },
      });
    });
  }

  /**
   * https://preview.keenthemes.com/html/keen/docs/forms/autosize
   * @param targetEl
   * @private
   */
  const __autoSize = (targetEl) => {
    targetEl.querySelectorAll(querySA(atr.input.autosize)).forEach((el) => {
      autosize(el);
    });
  }

  const __maxLength = (targetEl, params = {}) => {

    // param validation.
    const _param = params_validation(plg.formKeen.method.maxlength, params);

    const element = targetEl.querySelectorAll(querySA(atr.input.maxlength, false));
    $(element).maxlength({
      alwaysShow       : true,
      threshold        : 20,
      placement        : _param.placement,
      warningClass     : `badge badge-${_param.warning}`,
      limitReachedClass: `badge badge-${_param.limit}`,
    });
  }

  const __clipBoard = (targetEl, params = {}) => {
    const element = targetEl.querySelectorAll(querySA(atr.input.clipboard, false));
    element.forEach((el) => {
      const target = el.nextElementSibling;
      const button = target.nextElementSibling;

      // Init clipboard -- for more info, please read the offical documentation: https://clipboardjs.com/
      var clipboard = new ClipboardJS(button, {
        target: target,
        text  : function () {
          return target.value;
        }
      });

      // Success action handler
      clipboard.on('success', function (e) {
        const currentLabel = button.innerHTML;

        // Exit label update when already in progress
        if (button.innerHTML === 'Copied!') {
          return;
        }

        // Update button label
        button.innerHTML = 'Copied!';

        // Revert button label after 3 seconds
        setTimeout(function () {
          button.innerHTML = currentLabel;
        }, 3000)
      });
    });
  }

  const _manual = (target, methods = null, params = null) => {

    let method_obj;
    if (!methods) {
      method_obj = plg.formKeen.method;
      methods = Object.values(method_obj);
    }

    methods.forEach((method) => {
      switch (method) {
        case plg.formKeen.method.none:
          // none
          break;

        case plg.formKeen.method.radio:
          __radio(target, params);
          break;

        case plg.formKeen.method.splitter:
          __splitter(target, params);
          break;

        case plg.formKeen.method.range:
          __slider(target, params);
          break;

        case plg.formKeen.method.block:
          __block(target, params);
          break;

        case plg.formKeen.method.autosize:
          __autoSize(target, params);
          break;

        case plg.formKeen.method.maxlength:
          __maxLength(target, params);
          break;

        case plg.formKeen.method.clipboard:
          __clipBoard(target, params);
          break;

        default:
      }
    });
  }

  return {
    $_page: function () {
      return false;
    },

    $_manual: function (target, components, params = {}) {
      _manual(target, components, params);
    }
  };
};

const plg_formKeen = fun();
export default plg_formKeen;

