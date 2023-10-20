import {CLS, kws} from "../base/const.js";
import plugins from "../plugins/plugins.js";
import {atr} from "../base/attributes.js";
import tagifyInput from "../plugins/tagifyInput.js";
import datePicker from "../plugins/datePicker.js";
import rangePicker from "../plugins/rangePicker.js";
import {getDatesData} from "../bucket/dates.js";
// Class definition
var fun = function () {
  // Shared variables


  // Private functions
  const _empty = (type, id) => {
    switch (type) {
      case 'select':
        $(id).empty().trigger('change');
        break;
    }
  }

  const _repeater = (formId, formSno) => {
    console.log('reset repeater', formId, formSno);
    plugins.formRepeater.$_set(formId, formSno, [{}]);
  }

  const _external = (formEle) => {

    // get exterenal form inputs from the form.
    formEle.querySelectorAll('div.no-repeater').forEach(
      (div) => {
        _plugin_input_reset(div);
        // normal input.
        div.querySelectorAll('input:not([data-pb-control])').forEach(__reset_input);
      }
    )


  }

  const __reset_input = (input) => {
    switch (input.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'hidden':
      case 'textarea':
        input.value = '';
        break;

      case 'radio':
        input.checked = false;
        break;

      case 'checkbox':
        input.checked = false;
        break;
    }
  }

  const __reset_select = (select) => {
    // de-select option
    $(select).val('').trigger('change');
  }

  const __reset_tagify = (tagify) => {
    const tagifyID = tagify.getAttribute(atr.plugins.id);
    const tagifyInstance = tagifyInput.$_get(tagifyID);
    // remove tag
    tagifyInstance.removeAllTags();
  }

  const __reset_date = (date) => {
    const dateID = date.getAttribute(atr.plugins.id);
    const dateInstance = datePicker.$_get(dateID);
    // clear date
    dateInstance.clear();
  }

  const __reset_range = (range) => {
    const rangeID = range.getAttribute(atr.plugins.id);
    const rangeInstance = rangePicker.$_get(rangeID);
    // clear range
    rangeInstance.val('');

    rangeInstance.on('show.daterangepicker', function (ev, picker) {
      // console.log(ev, picker);
      $(this).val('');
    });

    // -- if other is not working
    // $(range).val('').trigger('change');
  }

  const __reset_mask = (mask) => {
    mask.value = '';
  }

  const __reset_button = (button) => {
    // get the selector of the button.
    const selector = button.getAttribute(atr.inbuild.btn_target);
    // reset all the buttons.
    button.querySelectorAll(selector).forEach((btn) => {
        // remove the active class.
        btn.classList.contains(CLS.display.active)
          ? btn.classList.remove(CLS.display.active)
          : '';

        // remove the checked attribute.
        btn.querySelector('input').checked = false;
      }
    );
  }

  const _plugin_input_reset = (formElement) => {
    // reset select.
    formElement.querySelectorAll(querySA(atr.core.control, kws.plugin.sel)).forEach(__reset_select);

    // reset tagify
    formElement.querySelectorAll(querySA(atr.core.control, kws.plugin.tag)).forEach(__reset_tagify);

    // reset date
    formElement.querySelectorAll(querySA(atr.core.control, kws.plugin.date)).forEach(__reset_date);

    // reset range
    formElement.querySelectorAll(querySA(atr.core.control, kws.plugin.range)).forEach(__reset_range);

    // reset inputmask format
    formElement.querySelectorAll(querySA(atr.core.control, kws.plugin.mask)).forEach(__reset_mask);

    // option button reset.
    formElement.querySelectorAll(querySA(atr.inbuild.buttons, 'true')).forEach(__reset_button);
  }

  const _form = (formElement) => {


    _plugin_input_reset(formElement);

    /*
     plain input reset.
     ---
     ['input', 'switch', 'checkbox']
     */
    formElement.reset();

    // reset hidden values.
    let hiddenInputs = formElement.querySelectorAll('input[type="hidden"]');
    for (let i = 0; i < hiddenInputs.length; i++) {
      hiddenInputs[i].value = '';
    }
  }

  // Public methods
  return {
    // to reset the normal form and its elements.
    $_simple_form: function (form) {
      _form(form);
    },

    // to empty select list
    $_external_form: function (form) {
      _external(form);
    },

    // to empty select list
    $_empty: function (select) {
      _empty();
    },

    // reset the repeater form, this in-build function is called from the repeater plugin.
    $_repeater_form: function (formId, formSno) {
      _repeater(formId, formSno);
    }
  };
};

const PB_extend_reset = fun();
export default PB_extend_reset