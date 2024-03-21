import {get_LN} from "../base/global.js";
import Deploying from "../base/deploying.js";
import {plg, kws} from "../base/const.js";
import {atr} from "../base/attributes.js";
import plg_sweetAlert from "./sweetAlert.js";
import {exe_plugins_on_manualCall} from "../base/plugins.js";
import HTML from "../bucket/html.js";
// Class definition
//import Deploying from "../base/deploying.js";

var fun = function () {

  /*
   official documentation
   + https://github.com/DubFriend/jquery.repeater
   +
   */

  // Shared variables

  let id;
  let comboObj = {};
  const connector = '-';

  /**
   *
   * @param form form element
   * @param sno
   */
  const $simple = (form, sno) => {

    const form_id_sno = form.id + connector + sno;
    const params = {
      control : kws.plugin.combo,
      form_id : form.id,
      form_sno: sno,
    }

    comboObj[form_id_sno] = form;
    // set control if not set-ed.
    if (!form.hasAttribute(atr.core.control)) {
      form.setAttribute(atr.core.control, kws.plugin.combo);
      form.setAttribute(atr.form.valid, "1");
    }
    exe_plugins_on_manualCall(form, params, kws.plugins_on_call.basicForm);
  }

  const $default = (form, sno) => {

    const form_id_sno = form.id + connector + sno;
    const params = {
      control : false,
      form_id : form.id,
      form_sno: sno,
    }

    comboObj[form_id_sno] = form;
    // set control if not set-ed.
    exe_plugins_on_manualCall(form, params, kws.plugins_on_call.basicForm);
  }


  const form_checkup_formalities = (formEle) => {

    id = formEle.getAttribute('id');
    // id validation check
    if (id === null || id === '') {
      alert('Please add id into form element! ha ha ha');
      return false;
    }
    // if the form do not have validation then no need to check the submit button.
    const submitCheck = formEle.hasAttribute(atr.form.valid);

    const form_submit_checks = () => {

      // form button collection
      const buttonNodeList = PBapp.querySelectorAll('button[form="' + id + '"]');

      // buttons checkup.
      if (buttonNodeList.length === 0) {
        alert('form action button mission - combo, kindly add attribute form="form_id" in submit button.')
        return false;
      }
      else {
        // submit button checking.
        let is_submit_btn = false;
        // loop for submitted button
        buttonNodeList.forEach((btn) => {
          // submit button identifier
          if (btn.hasAttribute(atr.form.submit)) {
            is_submit_btn = true;
          }
        });
        if (!is_submit_btn) {
          alert('Please add attribute ' + atr.form.submit + ' in submit button for the form.');
          return false;
        }
      }
    }

    submitCheck ? form_submit_checks() : justPass();

    // validation checkup. || not required, manually called.
    if (formEle.getAttribute(atr.core.control)) {
      if (!formEle.hasAttribute(atr.form.valid)) {
        formEle.setAttribute(atr.form.valid, "1");
        console.log('Please add attribute ' + atr.form.valid + ' in form element.');
      }
    }

    // serial number for validation
    if (!formEle.hasAttribute(atr.form.sno)) {
      formEle.setAttribute(atr.form.sno, KTUtil.getRandomInt(10, 99));
      printError('Please add attribute ' + atr.form.sno + ' and its value in form element.')
      return true;
    }
    return true;
  }

  const _initialize = (forms) => {
    forms.forEach((form) => {
      _execute(form)
    });
  }

  const _prepare = (element) => {
    if (element.tagName === 'FORM') {
      // this is a single form in the given element.
      element.getAttribute(atr.core.control) === kws.plugin.combo
        ? _execute(element)
        : printError('given form is not valid form.');
    }
    else {
      // checking inside the element.
      element.querySelectorAll('form' + querySA(atr.core.control, kws.plugin.combo))
        .forEach((form) => {
          console.log('form for combo init:', form);
          _execute(form);
        });
    }
  }

  const _execute = (element) => {

    // check the form element is existed or not.
    const formEle = element;

    if (formEle.dataset.stsInitialized === '1') {
      console.log('Form Repeater is already initiated.');
      return;
    }

    // form identifier
    if (!form_checkup_formalities(formEle)) {
      plg_sweetAlert.$_confirm(
        ['Form Validation Failed', 'Please checkup form formalities.'],
        {
          confirm: [true, 'Okay', 'btn btn-light-primary'],
        },
        [1, 5]
      );
      return false;
    }

    console.log('success: Form validation initiated to the combo plugin.');

    // collect form sno.
    const form_sno = formEle.getAttribute(atr.form.sno);

    if (!formEle.hasAttribute(atr.core.method)) {
      // adding the default method.
      // formEle.setAttribute(atr.core.method, plg.formCombo.simple);
    }

    switch (formEle.getAttribute(atr.core.method)) {

      case plg.formCombo.simple:
        $simple(formEle, form_sno);
        break;

      default:
        $default(formEle, form_sno);

    }

    formEle.dataset.stsInitialized = '1';

    return true;
  }

  const _page = () => {
    // not combo and not repeater and not plugin.
    const not_combo = `:not(${querySA(atr.core.control, kws.plugin.combo)})`;
    const not_repeater = `:not(${querySA(atr.core.control, kws.plugin.repeater)})`;
    const not_none = `:not(${querySA(atr.core.control, kws.attrVal.ignore)})`;
    // get all form nodes that will be initialized on the page load.
    const formNodeList = PBapp
      .querySelectorAll(`form${not_combo}${not_repeater}${not_none}`);
    // execute:
    console.log(formNodeList);
    _initialize(formNodeList);
  }

  // Public methods
  return {

    /**
     * Initiate form repeater plugin.
     */
    $_page: function () {
      _page();
    },

    /**
     * Manual initiation of form repeater plugin.
     * @param element
     */
    $_manual: function (element) {
      _prepare(element);
    },
  };
};

const plg_formCombo = fun();
export default plg_formCombo;