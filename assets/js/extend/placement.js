import {exT, kws} from "../base/const.js";
import {atr} from "../base/attributes.js";
import datePicker from "../plugins/datePicker.js";
import tagifyInput from "../plugins/tagifyInput.js";
import rangePicker from "../plugins/rangePicker.js";
import plg_inputMask from "../plugins/inputMask.js";
import plg_formRepeater from "../plugins/formRepeater.js";


let fun = function () {

  // Private functions

  const __place_date = (date, data) => {
    const dateID = date.getAttribute(atr.plugins.id);
    const dateInstance = datePicker.$_get(dateID);
    // set the date
    dateInstance.setDate(data, true, 'Y-m-d');
  }

  const __place_range = (range, data) => {

    const rangeID = range.getAttribute(atr.plugins.id);
    const rangeInstance = rangePicker.$_get(rangeID);

    const locale = $(range).data('daterangepicker').getLocale();

    const startDate = moment(data[0], "YYYY-MM-DD").format(locale.format);
    const endDate = moment(data[1], "YYYY-MM-DD").format(locale.format);

    $(range).data('daterangepicker').setStartDate(startDate);
    $(range).data('daterangepicker').setEndDate(endDate);
  }

  const __place_tagify = (tagify, data) => {

    const tagifyID = tagify.getAttribute(atr.plugins.id);
    const tagifyInstance = tagifyInput.$_get(tagifyID);

    if (typeof data === 'string') {
      if (data.includes(',')) {
        data = data.split(',');
        data.map((item) => {
          tagifyInstance.addTags(item.trim());
        });
      }
      else {
        tagify.value = data;
      }
    }
    // OR
    console.log(data);
    data.map((item) => {
      tagifyInstance.addTags(item.value);
    });
  }

  const __place_select = (select, data) => {

    // check the multiple select or not
    if (select.multiple) {
      // const selectValues = [];
      // data.split(',').forEach((item) => selectValues.push(item.trim()));
      $(select).val(data).trigger('change');
    }
    else {
      console.log(data, select);
      $(select).val(data).trigger('change');
    }
  }

  const __place_mask = (mask, data) => {
    // $(mask).val(data).trigger('change');
    plg_inputMask.$_set(mask, data);
  }

  const __place_input = (input, data) => {
    // skip the input with class 'input'
    if (input.classList.contains('input')) return;
    // update others
    input.value = data;
  }

  const __place_button = (radio, data) => {
  }

  const __place_radio = (radio, data) => {
    radio.checked = radio.value === data;
  }

  const __place_checkbox = (cb, data) => {
    cb.checked = cb.value === data;
  }

  /**
   * @param {{}} data
   * @param {*} formElement
   */
  const _form = (data, formElement) => {

    let theInputData;
    // forms
    formElement.querySelectorAll("input[data-pb-control]").forEach((input) => {
      switch (input.getAttribute(atr.core.control)) {

        case kws.plugin.date:
          theInputData = data[input.name] ?? '';
          __place_date(input, theInputData);
          break;

        case kws.plugin.range:
          theInputData = data[input.name] ?? '';
          __place_range(input, theInputData);
          break;

        case kws.plugin.tag:
          theInputData = data[input.name] ?? '';
          __place_tagify(input, theInputData);
          break;

        case kws.plugin.mask:
          theInputData = data[input.name] ?? '';
          __place_mask(input, theInputData);
          break;

        default:
          console.log(input);
          break;

      }
    })

    // direct wale
    formElement.querySelectorAll("input:not([data-pb-control])").forEach((input) => {

      switch (input.type) {

        case 'radio':
          theInputData = data[input.name] ?? '';
          __place_radio(input, theInputData);
          break;

        case 'button':
          theInputData = data[input.name] ?? '';
          __place_button(input, theInputData);
          break;

        case 'checkbox':
          if (input.name.includes('[]')) {
            theInputData = data[input.name.replace('[]', '')] ?? '';
            if (typeof theInputData === 'object') {
              indexOf(theInputData, input.value) > -1 ? input.checked = true : input.checked = false;
            }
            else {
              __place_checkbox(input, theInputData);
            }
          }
          else {
            theInputData = data[input.name] ?? '';
            __place_checkbox(input, theInputData);
          }
          break;

        default:
          theInputData = data[input.name] ?? '';
          __place_input(input, theInputData);
          break;

      }
    });

    // select
    formElement.querySelectorAll("select").forEach((select) => {
      if (select.multiple) {
        theInputData = data[select.name.replace('[]', '')] ?? '';
      }
      else {
        theInputData = data[select.name] ?? '';
      }
      __place_select(select, theInputData);
    });

    // radio buttons
    formElement.querySelectorAll('div[data-kt-buttons="true"]').forEach((div) => {
      // get selector
      const selector = div.getAttribute('data-kt-buttons-target');
      div.querySelectorAll(`label${selector}`).forEach((radioLabel) => {
        const radio = radioLabel.querySelector('input');
        const value = data[radio.name] ?? '';
        if (radio.value === value) {
          // radio.checked = true;
          radioLabel.classList.add('active');
        }
        else {
          // radio.checked = false;
          radioLabel.classList.remove('active');
        }
      });
    });

    return true;
  }


  const _single = (data, element, type) => {
    switch (type) {
      case kws.plugin.date:
        __place_date(element, data);
        return true;

      case kws.plugin.range:
        __place_range(element, data);
        return true;

      case kws.plugin.tag:
        __place_tagify(element, data);
        return true;

      case kws.plugin.mask:
        __place_mask(element, data);
        return true;

      case kws.plugin.sel:
        __place_select(element, data);
        return true;

      default:
        console.log(element);
        return false;
    }
  }
  /**
   * place the data into the targeted block.
   * @param data
   * @param formEle
   * @param block
   * @private
   */
  const _block = (data, formEle, block) => {

    const accounts_block_in_mng = (data, form) => {
      // todo: enable the form and input
    }

    // todo: add more block.
    switch (block) {
      case 'management_accounts':
        accounts_block_in_mng(data, formEle);
        break;

      default:
        console.log(block + ' is not set up');
    }
  }

  const _repeater = (data, form) => {
    const sno = form.getAttribute(atr.form.sno);
    const fid = form.id;
    // get the main repeater
    const repeater_key = form.querySelector(`div.${kws.words.main_repeat}`).getAttribute(atr.repeater.list);

    const repeater_data = data.hasOwnProperty(repeater_key)
      ? data[repeater_key]
      : data;

    console.log(repeater_data);
    plg_formRepeater.$_set(fid, sno, repeater_data);

    // get no-repeater
    form.querySelectorAll(`div.${kws.words.no_repeat}`).forEach((subForm) => {
      _form(data, subForm);
    });
  }

  // Public methods
  return {
    $_single: function (data, input, type) {
      return _single(data, input, type)
    },

    // to place data into form.
    $_form: function (data, form) {
      return _form(data, form);
    },

    // to place data into block.
    $_block: function (data, form, block) {
      return _block(data, form, block);
    },

    // form repeater
    $_repeater: function (data, form) {
      _repeater(data, form);
    }
  };
};

const PB_extend_placement = fun();
export default PB_extend_placement;