import {exT, kws, plg} from "../base/const.js"
import plugins from "../plugins/plugins.js";
import {atr} from "../base/attributes.js";
import plg_datePicker from "../plugins/datePicker.js";
import plg_tagifyInput from "../plugins/tagifyInput.js";
import inputMask from "../plugins/inputMask.js";

// Class definition
let fun = function () {


  const _collect_formdata = (form, target) => {
    let loadFormData = {};
    // item.name.search('amount') ? loadFormData[item.name] = amt_mask_filter(item.value)
    form.querySelectorAll('[data-pb-prefill="' + target + '"]').forEach((item) => {
      if (item.hasAttribute(atr.core.control) && item.getAttribute(atr.core.control) === kws.plugin.mask) {
        // unmask the value.
        loadFormData[item.name] = inputMask.$_unmask(item);
      }
      else {
        // direct value to the form.
        loadFormData[item.name] = item.value
      }

    });
    return loadFormData;
  }
  const _step = (form, methods = ['select', 'input']) => {
    let required = [];
    let titles = [];

    // inner calling
    const __requiredCheck = (input, index) => {
      if (input.hasAttribute('required') && input.value === '') {
        required[index] = input.name;
        titles[index] = input.title;
      }
    }

    const input = (elements) => {
      let collect = [];

      elements.forEach((input_item, index) => {

        // do follow a required check in all.
        __requiredCheck(input_item, index);

        switch (input_item.type) {
          case kws.inputs.radio:
            if (input_item.checked && input_item.name !== '') {
              collect[input_item.name] = input_item.value;
            }
            break;

          case kws.inputs.checkbox:
            if (input_item.checked && input_item.name !== '') {
              collect[input_item.name] = input_item.value;
            }
            break;

          case kws.inputs.text:
          case kws.inputs.hidden:
            if (input_item.name !== '') {
              collect[input_item.name] = input_item.value;
            }
            break;

          case kws.inputs.number:
            if (input_item.name !== '') {
              collect[input_item.name] = input_item.value;
            }
            break;

          case kws.inputs.select:
            if (input_item.name !== '') {
              collect[input_item.name] = input_item.value;
            }
            break;

          case kws.inputs.selectM:
            if (input_item.name !== '') {
              collect[input_item.name] = input_item.value;
            }
            break;
        }
      });
      return collect;
    }

    // all inputs including selects
    let collects = input(form.querySelectorAll(methods));

    const throughAlert = (key) => {
      console.log(key)
      if (collects[required[key]] === '') {
        plugins.sweetAlert.$_alert(
          ['Required Input is missing', `${titles[key]}`],
          {
            confirm: [true, 'Okay, Let me add', 'btn btn-light-danger rounded'],
          },
          [4],
        );
        return false;
      }
    }

    for (const requiredKey in required) {
      throughAlert(requiredKey);
    }
    if (collects[required[0]] === '') return false;
    return {...collects};
  }

  const _table = (form) => {

    console.log(form);
    const formData = new FormData(form);

    let names = [];
    let tableObj = {}

    try {
      form.querySelector('table')
        .querySelector('tbody')
        .querySelectorAll('tr')
        .forEach((tr) => {
          // get the row id
          const row_id = tr.getAttribute('data-row-id');

          const _af_form = document.createElement('form');
          _af_form.append(tr.cloneNode(true));

          tableObj[row_id] = _form(_af_form, 1);
          // destroy the form
          _af_form.remove();

          // collect names to skipp for them
          tr.querySelectorAll('input').forEach((input) => {
            // ignore empty names
            if (input.name === '') return;
            // names
            names.push(input.name);
          });
        });
    } catch (e) {
      console.log(e)
    }


    let formObj = {};
    for (const [name, value] of formData.entries()) {
      if (!names.includes(name)) {
        formObj[name] = value;
      }
    }

    const _return = {
      ...formObj,
      rows: tableObj
    };
    return _return;
  }

  const _form = (form, method) => {

    // let formData = new FormData(document.getElementById("action-change"));
    let formData = new FormData(form);
    switch (method) {
      // all form data into a single object
      // it supports multiples.
      case 0:
        let items_0 = {};
        for (const [name, value] of formData.entries()) {
          if (name.includes('[]')) {
            const selectedValues = Array.from(formData.getAll(name))
            const fieldName = name.replace('[]', '');
            items_0[fieldName] = selectedValues.join(',');
          }
          else {
            items_0[name] = value;
          }
        }
        return items_0;

      case 1:
        let items_1 = {};
        for (const [name, value] of formData.entries()) {
          if (name.includes('[]')) {
            const selectedValues = Array.from(formData.getAll(name))
            const fieldName = name.replace('[]', '');
            items_1[fieldName] = selectedValues;
          }
          else {
            items_1[name] = value;
          }
        }

        return items_1;

      // from jQuery
      case 2:
        return $(form).serializeArray();

      // Null
      case 3:
        let returnObj = [];
        for (const [name, value] of formData.entries()) {
          let tempObj = {};
          tempObj[name] = value;
          returnObj.push(tempObj);
        }
        return returnObj;

      // to only get multiple values of a single input
      case 4:
        const selectedValues = {};
        for (const [key, value] of formData.entries()) {
          if (key.includes('[]')) {
            const fieldName = key.replace('[]', '');
            selectedValues[fieldName] = Array.isArray(selectedValues[fieldName])
              ? [...selectedValues[fieldName], value]
              : [value];
          }
        }
        return selectedValues;
    }
  }

  const _repeater = (form) => {
    //get the values of the inputs as a formatted object
    let repeaterValues, nonRepeaterValues = {};

    // get repeater values
    repeaterValues = $(form.querySelector(`.${kws.words.main_repeat}`)).repeaterVal();

    // get non repeater values.
    form.querySelectorAll(`.${kws.words.no_repeat}`).forEach((sub_form) => {
      // all other inputs
      const _af_form = document.createElement('form');
      _af_form.append(sub_form.cloneNode(true));
      nonRepeaterValues = {...nonRepeaterValues, ..._form(_af_form, 0)};
      _af_form.remove();

      // selects
      sub_form.querySelectorAll('select').forEach((select) => {
        let name;
        if (select.multiple) {
          name = select.name.includes('[]') ? select.name.replace('[]', '') : select.name;
        }
        else {
          name = select.name;
        }
        nonRepeaterValues[name] = $(select).val();
      });

    });

    // select values


    //    const newForm = form.cloneNode(true);
    //    const repeaterEle = newForm.querySelector(`.${kws.words.main_repeat}`);
    //    console.log(repeaterEle, repeaterValues)
    //    if (repeaterEle !== undefined) {
    //      newForm.querySelector(`.${kws.words.main_repeat}`).remove();
    //      nonRepeaterValues = _form(newForm, 0);
    //    }
    //    else {
    //      alert('kindly add "main-repeater" class into this div "data-repeater-list"');
    //      nonRepeaterValues = [];
    //    }


    /*
     nonRepeaterValues = $(newForm).serializeArray();
     console.log(nonRepeaterValues);
     */
    return {...repeaterValues, ...nonRepeaterValues};
  }
  const _state = (form, state) => {

    const _range_abcd = (event) => {
      $(event.target).data('daterangepicker').toggle();
    }

    const _plugins_state_change = (element, state = true) => {
      // global plugin id.
      const plugin_id = element.getAttribute(atr.plugins.id);
      // disable the plugin-initiated inputs.
      switch (element.getAttribute(atr.core.control)) {
        case kws.plugin.sel:
          // disable the selectPicker.
          // $(element).prop('readonly', state).trigger('change.select2');
          // OR
          // disable all options of selectPicker.
          element.querySelectorAll("option").forEach((option) => {
            option.disabled = state;
          });
          break;

        case kws.plugin.date:
          // Disable the flatpickr instance
          const opens = state !== true;
          plg_datePicker.$_get(plugin_id).set({clickOpens: opens})
          break;

        case kws.plugin.range:
          if (state === true) {
            element.addEventListener('click', _range_abcd);
          }
          else {
            element.removeEventListener('click', _range_abcd);
          }
          $(element).data('daterangepicker').disableApply(state);

          /*
           disable
           ---
           const range = plg_rangePicker.$_get(plugin_id);
           range.attr('disabled', state);
           element.disabled = state;
           */

          break;

        case kws.plugin.tag:
          if (state === true) {
            // destroy the tagify instance
            plg_tagifyInput.$_destroy(element);
            element.readOnly = state;
            const options = {
              userInput: state !== true,
            }
            plg_tagifyInput.$_single_on_innerHTML(element, options);
          }
          else {
            // destroy the tagify instance
            plg_tagifyInput.$_destroy(element);
            element.readOnly = state;
            const options = {
              userInput: state !== true,
            }
            plg_tagifyInput.$_single_on_innerHTML(element, options);
          }
          /*
           method - 2, have few limitations. can not reinitialize with base data.
           --
           const tagify = plg_tagifyInput.$_get(plugin_id);
           tagify.settings.userInput = state !== true;
           tagify.settings.readonly = state;
           tagify.settings.maxTags = 0;
           tagify.settings.mode = (state === true && tagify.settings.mode === 'select')
           ? 'mix' : tagify.settings.mode;
           */
          /*
           it can work before the plugin is initiated.
           ---
           element.readOnly = state;
           element.disabled = state;
           */
          break;

        case kws.plugin.mask:
          element.readOnly = state;
          break;

        default:
          //
          break;
      }
    }

    // changes into the form inputs
    switch (state) {
      // to make them ready-only or disabled
      case exT.collect.states.read:
        form.querySelectorAll('select, input').forEach((selector) => {

          // disable the plugin-initiated inputs.
          if (selector.hasAttribute(atr.core.control)) {
            _plugins_state_change(selector, true);
          }

          if (selector.type === 'radio' || selector.type === 'checkbox') {
            if (selector.disabled === false) {
              selector.disabled = true;
              selector.dataset.editable = '1';
            }
          }
          else {
            if (selector.readOnly === false) {
              // input and select
              selector.readOnly = true;
              selector.dataset.editable = '1';
            }
          }
        });
        break;

      // to make them editable again.
      case exT.collect.states.edit:
        form.querySelectorAll('select, input').forEach((selector) => {
          // enable the plugin-initiated inputs.
          if (selector.hasAttribute(atr.core.control)) {
            _plugins_state_change(selector, false);
          }

          if (selector.type === 'radio' || selector.type === 'checkbox') {
            if (selector.disabled === true && selector.dataset.editable === '1') {
              selector.disabled = false;
              selector.dataset.editable = '0';
            }
          }
          else {
            if (selector.readOnly === true && selector.dataset.editable === '1') {
              // input and select
              selector.readOnly = false;
              selector.dataset.editable = '0';
            }
          }
        });
        break;
    }
  }

  const _run = (element, type) => {

    const collect_all = (param) => {
      // this.collection_stepForm
    }
    /**
     * It collects all required inputs from the form.
     * @param param
     */
    const collect_required = (param) => {
      // this.collection_stepForm
    }

    switch (type) {
      case 'a':
        return collect_all(element);
      case 'b':
        return collect_required(element);
    }
  }

  // Public methods
  return {
    // to get simple form data
    $_form_simple: function (form, method = 1) {
      return _form(form, method);
    },
    // to get form data with the table of same name inputs
    $_form_table: function (form) {
      return _table(form);
    },
    /**
     * to get form data from pure repeater, no external.
     * @param form
     * @returns {*}
     */
    $_form_repeater: function (form) {
      return _repeater(form);
    },

    /**
     * it makes the form editable or read only as per request.
     * @param form element
     * @param state string ['read', 'edit']
     */
    $_form_state: function (form, state) {
      return _state(form, state);
    },

    /**
     * it collects all inputs in given form-element with self-validator for required inputs.
     * @param form
     * @returns {boolean|*[]}
     */
    $_form_step: function (form) {
      return _step(form);
    },

    $_collect_formdata: function (form, target) {
      return _collect_formdata(form, target);
    },

    $_form_stepper: function (form) {
      return _step(form);
    },

    $_run: function (elements, type) {
      return _run(elements);
    },
  };
};

const PB_extend_collect = fun();
export default PB_extend_collect;