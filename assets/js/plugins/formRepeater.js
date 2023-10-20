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
  let repeaterObj = {};
  const connector = '-';

  // form repeater functions
  const remove_fv_labels = (form) => {
    form.querySelectorAll('.fv-plugins-message-container').forEach((textEle) => {
      textEle.remove();
    });
  }

  const init_new_buttons_event = (isRecall) => {
    if (isRecall) {
      Deploying.NewEvents(get_LN());
    }
  }

  const __show = (Obj, form, params) => {
    Obj.slideDown();
    remove_fv_labels(form);
    exe_plugins_on_manualCall(form, params, kws.plugins_on_call.repeatForm);
    // recall new events.
    init_new_buttons_event(form.hasAttribute(atr.event.recall));
  }
  const __hide = (Obj, form, deleteElement) => {
    if (form.hasAttribute(atr.repeater.slideup)) {
      console.log('slideup');
      if (confirm('Are you sure you want to delete this element?')) {
        Obj.slideUp(deleteElement);
        remove_fv_labels(form);
      }
    }
    else {
      Obj.slideUp(deleteElement);
      remove_fv_labels(form);
    }
  }
  const __ready = (form, params) => {
    remove_fv_labels(form);
    exe_plugins_on_manualCall(form, params, kws.plugins_on_call.repeatForm);
  }

  /**
   *
   * @param form form element
   * @param sno
   */
  const $simple = (form, sno) => {

    if (form.dataset.stsInitialized === '1') {
      toastr.info('Form is already initialized.');
      return;
    }

    const form_id_sno = form.id + connector + sno;
    const params = {
      form_sno: sno,
      control : kws.plugin.repeater
    }

    repeaterObj[form_id_sno] = $(form).repeater({

      initEmpty             : false,
      defaultValues         : {},
      isFirstItemUndeletable: true,

      // it triggers when a new element added.
      show: function () {
        __show($(this), form, params);
      },

      // it triggers when user click on delete button
      hide: function (deleteElement) {
        __hide($(this), form, deleteElement);
      },

      // it triggers when user load page and form is ready to fill.
      ready: function () {
        __ready(form, params);
      }
    });

    // form.setAttribute(atr.status.initiated, '1');
    form.dataset.stsInitialized = '1';
  }

  /**
   *
   * @param form form element
   * @param sno
   */
  const $nested = (form, sno) => {

    if (form.dataset.stsInitialized === '1') {
      toastr.info('Form is already initialized.');
      return;
    }

    const form_id_sno = form.id + connector + sno;
    const params = {
      form_sno: sno,
      control : kws.plugin.repeater
    }

    repeaterObj[form_id_sno] = $(form).repeater({

      initEmpty             : false,
      isFirstItemUndeletable: true,

      defaultValues: {},

      // this repeater works as a nested repeater.
      repeaters: [
        {
          initEmpty             : false,
          isFirstItemUndeletable: true,
          selector              : '.inner-repeater',

          // it triggers when a new element added.
          show: function () {
            __show($(this), form, params);
          },

          // it triggers when user click on delete button
          hide: function (deleteElement) {
            __hide($(this), form, deleteElement);
          },

          // it triggers when user load page and form is ready to fill.
          ready: function () {
            __ready(form, params);
          }
        }
      ],

      // ## core repeater [outer]
      // it triggers when a new element added.
      show: function () {
        __show($(this), form, params);
      },

      // it triggers when user click on delete button
      hide: function (deleteElement) {
        __hide($(this), form, deleteElement);
      },

      // it triggers when user load page and form is ready to fill.
      ready: function () {
        __ready(form, params);
      }
    });

    // form.setAttribute(atr.status.initiated, '1');
    form.dataset.stsInitialized = '1';
  }

  /**
   *
   * @param form form element
   * @param sno
   */
  const $advance = (form, sno) => {

    if (form.dataset.stsInitialized === '1') {
      toastr.info('Form is already initialized.');
      return;
    }

    const form_id_sno = form.id + connector + sno;
    const params = {
      form_sno: sno,
      control : kws.plugin.repeater,
      formKeen: [plg.formKeen.method.range]
    }
    repeaterObj[form_id_sno] = $(form).repeater({
      initEmpty             : false,
      isFirstItemUndeletable: true,
      // defaultValues: {'text-input-name': 'foo'},

      // it triggers when a new element added.
      show: function () {
        __show($(this), form, params);
      },

      // it triggers when user click on delete button
      hide: function (deleteElement) {
        __hide($(this), form, deleteElement);
      },

      // it triggers when user load page and form is ready to fill.
      ready: function () {
        __ready(form, params);
      }
    });

    // form.setAttribute(atr.status.initiated, '1');
    form.dataset.stsInitialized = '1';
  }

  const form_checkup_formalities = (formEle) => {
    id = formEle.getAttribute('id');
    // id validation check
    if (id === null || id === '') {
      alert('Please add id into form element!');
      return false;
    }
    // form submit button identifier
    const submit_btns = PBapp.querySelectorAll('button[form="' + id + '"]');
    if (submit_btns.length === 0) {
      alert('form action button mission, kindly add attribute form="form_id" in submit button.')
      return false;
    }
    else {
      let submit_btn = false;
      // loop for submitted button
      submit_btns.forEach((btn) => {
        // submit button identifier
        if (btn.hasAttribute(atr.form.submit)) {
          submit_btn = true;
        }
      });
      if (!submit_btn) {
        alert('Please add attribute ' + atr.form.submit + ' in submit button for the form.');
        return false;
      }
    }

    // validation checkup. || not required, manually called.
    if (formEle.getAttribute(atr.core.control) !== kws.plugin.repeater) {
      if (!formEle.hasAttribute(atr.form.valid)) {
        alert('Please add attribute ' + atr.form.valid + ' in form element.');
        return false;
      }
    }

    // serial number for validation
    if (!formEle.hasAttribute(atr.form.sno)) {
      alert('Please add attribute ' + atr.form.sno + ' in form element.');
      return false;
    }
    return true;
  }

  const _initialize = (forms) => {
    console.log('forms for init the repeaters: ', forms);
    forms.forEach((form) => {
      _execute(form)
    });
  }

  const _prepare = (element) => {
    if (element.tagName === 'FORM') {
      // this is a single form in the given element.
      element.getAttribute(atr.core.control) === kws.plugin.repeater
        ? _execute(element)
        : printError('given form is not repeater form.');
    }
    else {
      // checking inside the element.
      element.querySelectorAll('form' + querySA(atr.core.control, kws.plugin.repeater))
        .forEach((form) => {
          _execute(form);
        });
    }
  }

  const __extra_ui_changes = (formEle) => {
    formEle.querySelectorAll('[' + atr.repeater.create + ']').forEach((button) => {
      button.addEventListener('click', function (e) {
        /*
         // remove invalid input message container
         formEle.querySelectorAll('.fv-plugins-message-container').forEach((textEle) => {
         textEle.remove();
         });
         */

        // create separate line
        if (button.getAttribute(atr.repeater.create) === kws.labels.outer) {
          formEle.querySelectorAll(querySA(atr.core.append, kws.labels.separate))
            .forEach((div) => {
              div.innerHTML = HTML.design.separate;
            })
        }
      });
    });
  }

  const _execute = (element) => {

    // check the form element is existed or not.
    const formEle = element;

    if (formEle.hasAttribute(atr.status.initiated) && formEle.getAttribute(atr.status.initiated) === '1') {
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

    console.log('success: Form validation initiated to the repeater plugin.');

    // setting up event listeners.
    __extra_ui_changes(formEle);

    // collect form sno.
    const form_sno = formEle.getAttribute(atr.form.sno);

    switch (formEle.getAttribute(atr.core.method)) {

      case plg.formRepeater.simple:
        $simple(formEle, form_sno);
        break;

      case plg.formRepeater.nested:
        $nested(formEle, form_sno);
        break;

      case plg.formRepeater.advance:
        $advance(formEle, form_sno);
        break;

      case plg.formRepeater.table:
        // https://github.com/DubFriend/jquery.repeater/issues/169
        break;
    }

    return true;
  }

  const _setList = (form_id, form_sno, data) => {
    // this is all about setting.
    const form_id_sno = form_id + connector + form_sno;
    console.log(form_id_sno);

    console.log(repeaterObj);
    // this applies the data into the form.
    repeaterObj[form_id_sno].setList(data);
  }

  // Public methods
  return {

    /**
     * Initiate form repeater plugin.
     */
    $_page: function () {
      _initialize(PBapp.querySelectorAll('form' + querySA(atr.dom.control, kws.plugin.repeater)));
    },

    /**
     * Manual initiation of form repeater plugin.
     * @param element
     */
    $_manual: function (element) {
      _prepare(element);
    },

    /**
     *
     * @param form_id
     * @param form_sno
     * @param data for load into the form
     */
    $_set: function (form_id, form_sno, data) {
      return _setList(form_id, form_sno, data);
    }
  };
};

const plg_formRepeater = fun();
export default plg_formRepeater;