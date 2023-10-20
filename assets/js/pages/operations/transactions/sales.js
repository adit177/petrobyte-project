import {$R_menu_obj, $R_common_obj, $R_table_obj, $R_form_obj} from "../../../base/render.js";
import {get_action, get_callEl, get_LN, get_thePathArr} from "../../../base/global.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {Lyt, otR, plg, exT, rdR, kws, CLS, sD, deF, glob, STYLE, keys} from "../../../base/const.js";
import {eTypes, eValues} from "../../../base/events.js";
import {atr} from "../../../base/attributes.js";
import pb from "../../../base/structure.js";
import {_buttonLE} from "../../../base/elements.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import Arranging from "../../../base/arranges.js";
import PB_defined from "../../../base/defined.js";
import plugins from "../../../plugins/plugins.js";
import PB_extends from "../../../extend/extend.js";
import extend from "../../../extend/extend.js";
import PB_extend_calculate from "../../../extend/calculate.js";
import {_k} from "../../../base/keys.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import datePicker from "../../../plugins/datePicker.js";
import state from "../../../base/state.js";
import {getStateData} from "../../../bucket/state.js";
import {getTagData} from "../../../bucket/tags.js";
import Deploying from "../../../base/deploying.js";

// Shared variables
const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4110',
};
let redData;
let method;
let StateData;
let tableEle, formEle, success, filterEle;
let tableObject = [];


// Private functions

/**
 * this will be used for show page's base-0 data.
 */

const pageOpen = (data) => {

  // init the required classes.


  // process.

  const _process = (data) => {
    data = data.data
    console.log(data);
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_menu_render(data);
    _return &&= _process_date_update(data);
    return _return;
  }
  const _process_save_page_state = (data) => {
    StateData = data[_k.pageState];
    return true;
  }
  const _process_menu_render = (data) => {
    // calling render to place data into menu.
    return $R_menu_obj.$_left(data.menu, rdR.menu.type.value);
  }

  const _process_date_update = (data) => {

    // get form element.
    exe_plugins_on_manualCall(_buttonLE.menu, {}, kws.plugin.combo);
    const formEle = _buttonLE.menu.querySelector('form');

    // calling render to place data into menu inputs.
    extend.placement.$_form(data.session, formEle);
    const dateInstanceID = formEle.querySelector(`input[${atr.core.control}="date"]`).getAttribute(atr.plugins.id);

    const Instance = datePicker.$_get(dateInstanceID);
    // call the target event.
    const __update_the_work_date = () => {
      actionsTarget(_buttonLE.menu, {
        type : eTypes.action,
        value: eValues.action.buttons.change
      })
    }

    Instance.config.onChange.push(function (date) {
      __update_the_work_date();
    });

    return true;
  }
  return _process(data)
  //  const ajax = new AjaxPB();
  //  const urlID = ajax.buildingURL([], {
  //    act : 'page',
  //    type: 'open'
  //  }, 'local', 0);
  //  ajax.callREQUEST({}, urlID, false, _process);
  //  return ajax;
}

/**
 * this will be used into forms
 * preloaded data that will not change for this page
 */
const cardsTarget = function (element, event) {

  // display the element.
  console.log(element, event);
  //    element.classList.remove(CLS.display.none);

  //  const _process = (data) => {
  //    data = data.data
  //
  //    switch (event.value) {
  //      case eValues.card.buttons.modal:
  //        return _process_modal(data);
  //
  //      case eValues.card.buttons.delete:
  //        return _process_delete(data);
  //
  //      case eValues.card.buttons.edit:
  //        return _process_edit(data);
  //
  //      case eValues.card.buttons.view:
  //        return _process_view(data);
  //
  //      case eValues.card.buttons.search:
  //        return _process_search(data);
  //
  //      default:
  //        alert('No action found for this button');
  //    }
  //  }
  const _process_modal = (data) => {
    // get the modal element.
    const modal = _callEl.getElementsByClassName('modal-title')[0];
    // update the modal title.
    modal.innerHTML = data.modal.title;

    const event_string = event.value + '-' + event.data;

    // find the target body element.
    const body = _callEl.querySelector('#' + event_string);

    // append the table.

    console.log(body);


    return true;
  }
  const _process_search = (data) => {
    // log
    console.log(data.filters);

    //    const formEle = _callEl.querySelector("form");
    // render form.
    formEle = element.querySelector('form');
    tableEle = element.querySelector('table');
    //    $R_form_obj.$form(data.filters, formEle);


    if (!tableEle) {
      return Promise.reject('Table not found.');
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return Promise.resolve(true);
    }
    const _process = (data) => {
      let _return = true;
      _return &&= _process_table_render(data.data);
      _return &&= _process_filter_form_placement(data.data);
      return _return;
    }
    const _process_table_render = (data) => {
      // if no data found, then show no data found message.
      if (!data.transactions) {
        //      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        //      tableEle.appendChild(redData);
        //      return true;
        return PB_defined.$_append_table_zero(formEle);
      }
      extend.foreign.$_remote(
        exT.foreign.combine, data,
        [
          [_k.transactions, _k.s.dates, 1, 0],
          [_k.transactions, keys.stateData.ledgers, 4, 0],
          [_k.transactions, keys.stateData.ledgers, 5, 0]
        ]);
      PB_defined.$_append_table_simple(tableEle, data.transactions, pb.opr.transactions.sales.t.transactions)

      return true;
    }
    const _process_filter_form_placement = (data) => {

      // form render
      $R_form_obj.$form(data[_k.filters], formEle);

      // data placement.
      extend.placement.$_form(data[_k.parameters], formEle);
      return true;
    }

    // if no data found, then show no data found message.
    //    if (!data.transactions) {
    ////      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
    ////      tableEle.appendChild(redData);
    ////      return true;
    //      return PB_defined.$_append_table_zero(formEle);
    //    }
    // render the response data (if required)
    //    extend.foreign.$_remote(
    //      exT.foreign.combine, data,
    //      [
    //        ['transactions', 'dates', 1, 0],
    //        ['transactions', 'ledgers', 4, 0],
    //        ['transactions', 'ledgers', 5, 0]
    //      ]);
    //
    //    // render the table.
    //    redData = $R_table_obj.$_simple(data.transactions, pb.opr.transactions.sales.t.transactions);
    //
    //    tableEle.appendChild(redData)
    //    console.log(tableEle);
    //    // update table status
    //    tableEle.setAttribute(atr.load.table, '1');
    //
    //    // apply common renders
    //    $R_common_obj.$_call(tableEle);
    //
    //    // for enable dropdown in the table.
    //    KTMenu.init();
    //
    //    // dataTablesInit(event.value);
    //
    //    // filterEvents(event.value);
    //    return true;

    return call_AJAX_GET(params, _process, false);
  }
  const _process_delete = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_preview_voucher_before_delete(data.data);
      _return &&= _process_insert_and_update(data.data);
      return _return;
    }
    const _process_preview_voucher_before_delete = (data) => {
      const eleKey = `${event.value}-${event.type}`;
      const targetID = eleKey + '-preview';

      // get the template body
      const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));

      console.log(template)

      // get the target element.
      let previewEl = element.querySelector('#' + targetID);

      // insert new values
      previewEl.innerHTML = extend.append.$_single_on_innerHTML(template, data[_k.info.voucher]);

      /*
       OLD and lengthy way to do this.
       // update voucher number
       const voucher_no = data[key][valueID];
       element.querySelector(querySA(atr.core.control, valueID)).innerText = voucher_no;

       // add voucher number into button
       const form_id = element.querySelector('form').id;
       const button = element.querySelector('button[form="' + form_id + '"]');
       button.setAttribute(atr.event.value, voucher_no);

       // update voucher no into input.
       const inputEl = element.querySelector(`input[${atr.core.control}='${valueID}']`);
       inputEl.value = voucher_no;
       */

      // apply common render.
      $R_common_obj.$_call(previewEl);
      return true;
    }

    const _process_insert_and_update = (data) => {
      PB_defined.$_update_target(element, data[_k.info.voucher]);
      PB_defined.$_update_catch(element, data[_k.info.voucher]);
      return true;
    }

    return call_AJAX_GET(params, _process, false);
    //    const eleKey = _callEl.getAttribute(atr.core.id);
    //    const targetID = eleKey + '-preview';
    //    const valueID = 'voucher_no';
    //
    //    // get the template body
    //    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
    //
    //    // get the target element.
    //    let previewEl = element.querySelector('#' + targetID);
    //    const key = previewEl.getAttribute(atr.core.key);
    //
    //    // insert new values
    //    previewEl.innerHTML = extend.append.$_single_on_innerHTML(template, data[key]);
    //
    //    // update voucher number
    //    const voucher_no = data[key][valueID];
    //    element.querySelector(querySA(atr.core.control, valueID)).innerText = voucher_no;
    //
    //    // add voucher number into button
    //    const form_id = element.querySelector('form').id;
    //    const button = element.querySelector('button[form="' + form_id + '"]');
    //    button.setAttribute(atr.event.value, voucher_no);
    //
    //    // update voucher no into input.
    //    const inputEl = element.querySelector(`input[${atr.core.control}='${valueID}']`);
    //    inputEl.value = voucher_no;
    //
    //    // apply common render.
    //    $R_common_obj.$_call(previewEl);
    //
    //    return true;
  }
  const _process_view = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_view_voucher(data.data);
      _return &&= _process_insert_id_in_buttons(data.data);
      return _return;
    }
    const _process_view_voucher = (data) => {
      const elementKey = `${event.value}-${event.type}`;
      const targetID = elementKey + '-voucher';
      console.log("target ID", targetID)
      // place update values into target HTML element.
      PB_defined.$_update_target(element, data[_k.info.voucher]);

      // get the template body
      const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
      console.log(element.querySelector(`#${targetID}`))
      element.querySelector(`#${targetID}`).innerHTML = extend.append.$_single_on_innerHTML(template, data[_k.info.voucher]);
      // common render on element
      $R_common_obj.$_call(element);
      return true;
    }
    const _process_insert_id_in_buttons = (data) => {
      PB_defined.$_update_catch(element, data[_k.info.voucher])
      return true;
    }

    return call_AJAX_GET(params, _process, false);
  }
  const _process_edit = (params) => {

    // vars for the function
    let targetEleID;
    let targetFormID;
    const __process = (data) => {
      data = data.data;

      let _return = true;
      _return &&= __process_form_init(data);
      _return &&= __process_render_form(data);
      return _return;
    }
    const __process_form_init = (data) => {
      const vou_type = data[_k.info.voucher].type;

      targetEleID = `edit-card-${vou_type}`;
      targetFormID = `edit-card-${vou_type}-form`;
      const template = `form-${vou_type}`;

      // get the template
      const templateEle = _buttonLE.templates.querySelector(querySA(atr.core.template, template, 'div'));
      // clone the template
      const cloneEle = templateEle.cloneNode(true);

      element.querySelector(`#${targetFormID}`).append(cloneEle);

      return true;
    }
    const __process_render_form = (data) => {
      // call the server to get the fixed data.
      call_AJAX_GET({
        type: eTypes.form,
        act : data[_k.info.voucher].type,
      }, false, true).then((data_2) => {
        console.log(data_2);
        // render the form.
        const sts = $R_form_obj.$global(
          {...data_2.data, ...PageData},
          element.querySelector(`#${targetFormID}`),
          rdR.form.method.repeater
        );
        // load the data.
        __process_form_load(data);
      });
      return true;
    }
    const __process_form_load = (data) => {
      // console.log(data[_k.info.voucher][_k.info.edit]);
      // insert data into form
      extend.placement.$_repeater(data[_k.info.voucher][_k.info.edit], element.querySelector(`#${targetFormID}`));

      // insert values
      PB_defined.$_update_target(element.querySelector(`#${targetEleID}`), data[_k.info.voucher]);

      // make visible
      element.querySelector(`#${targetEleID}`).classList.remove(CLS.display.none);
      return true;
    }

    return call_AJAX_GET(params, __process, false);
  }
  let params;
  // apply switch for params
  switch (event.value) {

    case eValues.card.buttons.delete:
      params = {
        act : event.value,
        type: event.type,
        id  : event.data,
      };
      return _process_delete(params);

    case eValues.card.buttons.edit:
      params = {
        act : event.value,
        type: event.type,
        id  : event.data,
      };
      return _process_edit(params);

    case eValues.card.buttons.view:
      params = {
        act : event.value,
        type: event.type,
        id  : event.data,
      };
      return _process_view(params);

    case eValues.card.buttons.search:
      params = {
        act : event.value,
        type: event.type,
      };
      return _process_search(params);

    default:
      alert('No action found for this button');
  }
  //  switch (event.value) {
  //    case eValues.card.buttons.modal:
  //      params = {
  //        act  : event.value,
  //        type : event.type,
  //        about: event.data,
  //      };
  //      break;
  //    case eValues.card.buttons.delete:
  //    case eValues.card.buttons.edit:
  //    case eValues.card.buttons.view:
  //      params = {
  //        act   : event.value,
  //        type  : event.type,
  //        vou_no: event.data,
  //      };
  //      break;
  //    case eValues.card.buttons.search:
  //      params = {
  //        act : event.value,
  //        type: event.type,
  //      }
  //      break;
  //
  //  }
  //
  //  // send POST ajax
  //  const ajax = new AjaxPB();
  //  const urlID = ajax.buildingURL([], params, 'local', 0);
  //  ajax.callREQUEST({}, urlID, false, _process);
  //  return ajax;
}

const actionsTarget = function (element, event) {

  /*
   -------------------------------
   private functions of actions
   -------------------------------
   */
  //  const action_save = (element, event) => {
  //
  //
  //    /**
  //     * this data save into variables.
  //     * it will be called when create form initiated.
  //     * @param data
  //     * @private
  //     */
  //    const _process = (data) => {
  //      data = data.data
  //      return _process_save_return(data);
  //      return _process_form_old_data_reset(data);
  //    }
  //
  //    const _process_save_return = (data) => {
  //      sleep(100).then(() => {
  //        formEle = element.querySelector('#' + event.place + '-' + event.data);
  //        const f_sno = formEle.getAttribute(atr.form.sno);
  //        if (!plg_formValid.$_get_status(f_sno)) {
  //          toastr.error('Kindly fill all required steps', 'Incomplete Form');
  //          return false;
  //        }
  //      });
  //      return true;
  //    }
  //
  //    const _process_form_old_data_reset = (data) => {
  //      extend.reset.$_simple_form(formEle, kws.attr.pb);
  //      return true;
  //    }
  //
  //    // collect form data.
  //    const formData = extend.collect.$_form_simple(formEle);
  //
  //    const ajax = new AjaxPB();
  //    const urlID = ajax.buildingURL([], {
  //      act : event.value,
  //      type: event.type
  //    }, 'local', 0);
  //    ajax.callREQUEST({formData}, urlID, true, _process);
  //
  //    // other things, not connected to dynamic data.
  //
  //    return ajax;
  //  }
  const action_save = () => {

    formEle = element.querySelector(`form`);

    const __form_collect = () => {
      const form_collect_repeater = () => {
        return extend.collect.$_form_repeater(formEle);
      }
      const form_collect_table = () => {
        return extend.collect.$_form_table(formEle)
      }

      switch (event.data) {
        case pb.opr.transactions.banking.p.deposit:
          return form_collect_repeater();
        case pb.opr.transactions.banking.p.withdrawal:
          return form_collect_repeater();
        case pb.opr.transactions.banking.p.transfer:
          return form_collect_repeater();
        case pb.opr.transactions.banking.p.clearance:
          return form_collect_table();
      }
    }

    const _process = (data) => {
      let _return = true;
      console.log("data inside save", data)
      _return &&= _process_save_return(data.data);
      _return &&= _process_form_old_data_reset(data.data);

      const stateObj = _buttonLE.states;
      // clear the states.
      state.manage(get_LN(), [stateObj.menu, stateObj.search]);

      return _return;
    }

    const _process_save_return = (data) => {
      // show sweet alert.
      console.log(data);
      PB_defined.$_form_submit_response(data[event.value])
      //      plg_sweetAlert.$_alert([data[event.value].status, data[event.value].message],
      //        {
      //          confirm: [false, '', 'btn btn-light-primary rounded'],
      //        },
      //        [2, 5, 1500],)
      return true;
    }

    const _process_form_old_data_reset = () => {
      action_reset();
      return true;
    }

    const __success = () => {

      const formData = __form_collect();

      return call_AJAX_POST({
        act : event.value,
        type: event.type,
        id  : event.data
      }, formData, _process, false);
    }
    const __reject = () => {
      return Promise.reject('Form validation failed.');
    }

    const param = {
      form_sno: formEle.getAttribute(atr.form.sno),
      method  : deF.form_promise.method.inbuild,
    };
    // return the promise.
    return PB_defined.$_form_validation(__success, __reject, param);
  }
  const action_reset = () => {
    const _process = () => {
      return _process_form_reset();
    }
    const _process_form_reset = () => {

      function __form_reset_repeater() {
        formEle = element.querySelector('form');
        console.log(formEle.id, formEle.getAttribute(atr.form.sno))
        extend.reset.$_repeater_form(formEle.id, formEle.getAttribute(atr.form.sno));
        return true;
      }

      function __form_reset_table() {
        // table reset.
        formEle = element.querySelector('form');
        let tableEle = element.querySelector('table');
        tableEle.setAttribute(atr.load.table, '0');
        let tbodyEle = tableEle.querySelector('tbody');
        // remove the tbody.
        if (tbodyEle !== null) {
          tbodyEle.remove();
          tableEle.classList.add('d-none');
        }
        // form-reset
        extend.reset.$_simple_form(formEle);
        return true;
      }

      switch (event.data) {
        case pb.opr.transactions.payments.p.supplier:
          return __form_reset_repeater();
        case pb.opr.transactions.payments.p.expense:
          return __form_reset_repeater();
        case pb.opr.transactions.payments.p.salary:
          return __form_reset_repeater();
        case pb.opr.transactions.payments.p.vendor:
          return __form_reset_table();
        case pb.opr.transactions.payments.p.loans:
          return __form_reset_table();
        case pb.opr.transactions.payments.p.drawing:
          return __form_reset_table();
      }


      if (method) {

        formEle = element.querySelector('form');
        let tableEle = element.querySelector("table");
        tableEle.setAttribute(atr.load.table, '0');
        let tbodyEle = tableEle.querySelector('tbody');
        tbodyEle.remove();

        tableEle.classList.add('d-none');
        extend.reset.$_simple_form(formEle, kws.attr.pb);
        method = false;
      }
      else {

      }
      return true;
    }

    return _process() ? Promise.resolve(true) : Promise.reject('reset failed.');
  }
  //  const action_reset = () => {
  //
  //    const __form_reset_repeater = () => {
  //      formEle = element.querySelector('form');
  //      console.log(formEle.id, formEle.getAttribute(atr.form.sno))
  //      extend.reset.$_repeater_form(formEle.id, formEle.getAttribute(atr.form.sno));
  //      return true;
  //    }
  //    const __form_reset_table = () => {
  //      // table reset.
  //      formEle = element.querySelector('form');
  //      let tableEle = element.querySelector('table');
  //      tableEle.setAttribute(atr.load.table, '0');
  //      let tbodyEle = tableEle.querySelector('tbody');
  //      // remove the tbody.
  //      if (tbodyEle !== null) {
  //        tbodyEle.remove();
  //        tableEle.classList.add('d-none');
  //      }
  //      // form-reset
  //      extend.reset.$_simple_form(formEle);
  //      return true;
  //    }
  //
  //    const _process = () => {
  //      let _return = false;
  //      _return &&= _process_form_reset();
  //      return _return;
  //    }
  //    const _process_form_reset = () => {
  //
  //      switch (event.data) {
  //        case pb.opr.transactions.banking.p.deposit:
  //          return __form_reset_repeater();
  //        case pb.opr.transactions.banking.p.withdrawal:
  //          return __form_reset_repeater();
  //        case pb.opr.transactions.banking.p.transfer:
  //          return __form_reset_repeater();
  //        case pb.opr.transactions.banking.p.clearance:
  //          return __form_reset_table();
  //      }
  //    }
  //    // final return.
  //    return _process() ? Promise.resolve(true) : Promise.reject('Form reset failed.');
  //  }
  //  const action_reset = (element, event) => {
  //    const _process = (data) => {
  //      data = data.data
  //      return _process_form_reset(data);
  //    }
  //    const _process_form_reset = (data) => {
  //      const method = true;
  //      if (method) {
  //        formEle = element.querySelector('form');
  //        extend.reset.$_simple_form(formEle, kws.attr.pb);
  //      }
  //      else {
  //        formEle = element.querySelector(event.type + '-' + event.value);
  //        extend.reset.$_simple_form(formEle, kws.attr.pb);
  //      }
  //      return true;
  //    }
  //    const ajax = new AjaxPB();
  //    const urlID = ajax.buildingURL([], {
  //      act : event.value,
  //      type: event.type,
  //    }, 'local', 0);
  //    ajax.callREQUEST({}, urlID, false, _process);
  //
  //    return ajax;
  //
  //  }

  const action_delete = (element, event) => {
    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      return _return;
      //      return _process_a(data);
      //      return _process_b(data);
    }
    const _process_a = (data) => {
      return true;
    }
    const _process_b = (data) => {
      return true;


    }
    //
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type,
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //
    //    return ajax;
    call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)

  }

  const action_edit = (element, event) => {
    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      return _return;
      //      _process_a(data);
      //      _process_b(data);
      //      return true;
    }
    const _process_a = (data) => {

    }
    const _process_b = (data) => {

    }

    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type,
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //
    //    return ajax;
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)
  }

  const action_view = (element, event) => {
    return true;
  }

  const action_change = (element, event) => {

    // form submit after getting data.
    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_menu_value_update(data);
      _return &&= _process_date_changed_alert(data);
      return _return;
    }

    const _process_date_changed_alert = (data) => {
      if (data.status) {
        alert('date changed');
      }
      return true;
    }

    const _process_menu_value_update = (data) => {
      // update menu value.
      return $R_menu_obj.$_left(data['menu_info'], rdR.menu.type.value, [], rdR.menu.role.update, rdR.menu.tags.menu);
    }

    // collect form data.
    const formData = extend.collect.$_form_simple(element);

    // ajax calling
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type,
    //    }, 'local', 0);
    //    ajax.callREQUEST({formData}, urlID, true, _process);
    //    return ajax;
    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, formData, _process, false);


  }

  switch (event.value) {
    case eValues.action.buttons.save:
      return action_save();

    case eValues.action.buttons.reset:
      return action_reset();

    case eValues.action.buttons.delete:
      return action_delete(element, event);

    case eValues.action.buttons.edit:
      return action_edit(element, event);

    case eValues.action.buttons.view:
      return action_view(element, event);

    case eValues.action.buttons.change:
      return action_change(element, event);

    default :
      eventNotFound(event);
      return false;
  }
}


// Creates Target is For forms
function formsTarget(element, event) {
  formEle = element.querySelector('form');

  if (formEle.getAttribute(atr.load.form) === '1') {
    return Promise.resolve(true);
  }
  const load_credit_form = (element, event) => {
    return form_target_common(element, event);
  }
  const load_cash_form = (element, event) => {
    return form_target_common(element, event);
  }
  const load_separate_form = (element, event) => {
    return form_target_common(element, event);
  }
  const load_regular_form = (element, event) => {
    return form_target_common(element, event);
  }
  const form_target_common = (element, event) => {
    const targetID = `${event.type}-${event.value}`;

    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
    console.log(template, targetID);
    formEle.append(template.cloneNode(true));
    //    formEle = element.querySelector('form');
    //    console.log(formEle);
    //
    //    if (formEle.getAttribute(atr.load.form) === '1') {
    //      return true;
    //    }

    const _process = (data) => {
      data = data.data
      return _process_form(data);
    }
    const _process_form = (data) => {

      const sts = $R_form_obj.$global({...StateData, ...data}, formEle, rdR.form.method.repeater);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }
    // fetching new values or static values for form initial


    // initiated page blockUIElement until all things load for the page.

    // fetching, rendering and loading values into forms
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //
    //    return ajax;
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process, false);

  }
  switch (event.value) {
    case pb.opr.transactions.sales.p.credit:
      return load_credit_form(element, event);

    case pb.opr.transactions.sales.p.cash:
      return load_cash_form(element, event);

    case pb.opr.transactions.sales.p.separate:
      return load_separate_form(element, event);

    case pb.opr.transactions.sales.p.regular:
      return load_regular_form(element, event);

    default :
      return form_target_common(element, event);
  }
}

function loadsTarget(element, event) {
  const function_b = function (element, event) {

    if (!event.data) {
      toastr.error('Please provide a valid Contact', 'Failed to Load')
      return false;
    }

    // init the form
    const formEl = element.querySelector('form');
    const sts = ext_render_form.formRender_simple(StateData, formEl);

    if (!sts) {
      toastr.error('Form initialized has failed', 'Failed to Load');
      return false;
    }

    const _process = (data) => {
      data = data.data
      return _process_a(data)
    }
    const _process_a = (data) => {

      // process that i want to process.
      // using data

    }

    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act    : event.value,
    //      type   : event.type,
    //      account: event.data
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //
    //    return ajax;
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: event.data
    }, _process)
  }

  /**
   * here we load add contact page for user
   * @param element
   * @param event
   * @returns {bool||AjaxPB}
   */
  const load_search_txns = function () {

    let formData;
    // get the data from form.
    const formEl = element.querySelector('form');

    formData = extend.collect.$_form_step(formEl);

    // no state change, if required, is not passed.
    if (!formData) {
      return Promise.reject('no data found for search');
    }


    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_load_table_as_per_new_filter(data);
      _return &&= _process_close_accordion(data);
      return _return;
    }

    const _process_load_table_as_per_new_filter = (data) => {
      console.log(data);
      console.log(element);
      const formEle = element.querySelector('table');
      formEle.removeChild(formEle.querySelector('tbody'));
      console.log(formEle);
      // if no data found, then show no data found message.
      //      if (!data.transactions) {
      //        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      //        tableEle.appendChild(redData);
      //        return true;
      //      }
      if (!data[_k.transactions]) {
        return PB_defined.$_append_table_zero(formEle);
      }
      // render the response data (if required)
      extend.foreign.$_remote(
        exT.foreign.combine, data,
        [
          [_k.transactions, _k.s.dates, 1, 0],
          [_k.transactions, _k.s.ledgers, 4, 0],
          [_k.transactions, _k.s.ledgers, 5, 0]
        ]);


      // render the table.
      PB_defined.$_append_table_simple(tableEle, data.transactions, pb.opr.transactions.sales.t.transactions)
      return true;
      //      redData = $R_table_obj.$_simple(data.transactions, pb.opr.transactions.banking.t.transactions);
      //
      //      tableEle.appendChild(redData)
      //      console.log(redData);
      //
      //      // update table status
      //      tableEle.setAttribute(atr.load.table, '1');
      //
      //      // apply common renders
      //      $R_common_obj.$_call(tableEle);
      //
      //      // for enable dropdown in the table.
      //      KTMenu.init();
      //
      //      // dataTablesInit(event.value);
      //
      //      // filterEvents(event.value);
      //
      //
      //      return true;
    }
    const _process_close_accordion = (data) => {
      PB_defined.$_accordion_collapsed(element.querySelector('#search-card-form'));

      return true;
    }
    // ajax call and get a response.
    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, formData, _process, false);
  }



  // switching
  switch (event.value) {

    case eValues.card.buttons.search:
      return load_search_txns();

    case 'function_b':
      return function_b(element, event);

  }
  const getLoad = function (form, event, values) {

    var fetchEntries;
    const _process = (data) => {
      data = data.data
      return _process_load(data);
    }
    const _process_load = (data) => {
      button.querySelector('[data-pb-label="text"]').innerText = 'Loading...';
      let tableProfile = {
        0: {
          type  : rdR.table.cell.checkbox,
          method: 'a',
          value : '0',
          param : [],
          style : 0,
          css   : []
        },
        1: {
          type  : rdR.table.cell.date,
          method: 'a',
          value : '1',
          param : ['b'],
          style : 0,
          css   : []
        },
        2: {
          type  : rdR.table.cell.account,
          method: 'a',
          value : '2',
          param : [],
          style : 0,
          css   : []
        },
        3: {
          type  : rdR.table.cell.text,
          method: 'a',
          value : '3',
          param : [],
          style : 0,
          css   : []
        },
        4: {
          type  : rdR.table.cell.amount,
          method: 'a',
          value : '4',
          param : [],
          style : 0,
          css   : []
        },
        5: {
          type  : rdR.table.cell.amount,
          method: 'a',
          value : '5',
          param : [],
          style : 0,
          css   : []
        },
        6: {
          type  : rdR.table.cell.input,
          method: 'c',
          value : '6',
          param : ['text', 'amount', 'w-125px inr_mask_62 py-1', true, 'To be Settled Amount', '6'],
          style : 1,
          css   : []
        },
      }
      fetchEntries = PB_render_table.$_simple(data, tableProfile);

      button.querySelector('[data-pb-label="text"]').innerText = 'Loaded.';
      if (fetchEntries === false) {
        return false;
      }


      tableEle = form.querySelector('[data-pb-table="' + button.getAttribute('data-pb-calling') + '"]');
      tableEle.classList.remove('d-none');
      tableEle.appendChild(fetchEntries);

      // calling custom
      $R_common_obj.$_call(tableEle);
      plg_formKeen.$_manual(tableEle, [3])
      return true;
    }
    // button.getAttribute('data-pb-calling');

    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act    : event.value,
    //      type   : event.type,
    //      account: values
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //    return ajax;
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: values
    }, _process)


  }
  const load_fund_clearance = (a, event) => {
    var values = [];
    var target = event.getAttribute('data-pb-calling');
    if (event.getAttribute('data-pb-called') !== 'true') {

      // collect pre-filled required inputs.
      let form = element.querySelector('form'); // button.closest('form');
      form.querySelectorAll('[data-pb-prefill="' + target + '"]').forEach((item) => {
        item.name.search('amount') ? values.push(amt_mask_filter(item.value)) : values.push(item.name);
      });

      success = getLoad(form, event, values);

      if (success) {
        // todo: this attribute will be changed in case pre-filled data has changed by the user.
        event.setAttribute('data-pb-called', 'true');
      }
    }
    else {
      plg_sweetAlert.$call(plg.sweetAlert.type.simple, [0, 'ho gya to load', 'Aur kya chahata hai??', 'Nahi, kuch nahi chihiye :)'])
    }
  }

  //    element.querySelector('[data-pb-control="general-header"]').children.forEach((child) => {
  //      const key = child.getAttribute(atr.core.key);
  //      child.innerHTML = extend.append.collectAppend(child.innerHTML, data[key]);
  //      PB_render_common.initOnCall(child);
  //    });

  element.querySelector('[data-pb-control="delete-entry"]').children.forEach((child) => {
    const key = child.getAttribute(atr.core.key);
    child.innerHTML = extend.append.$_single_on_innerHTML(child, data[key]);
    $R_common_obj.$_call(child);
  });

}

function tablesTarget(element, event) {

  const dataTableCalling = (options, methods, profile, call) => {
    let DT_options = {};
    console.log(methods);
    // create options
    const end = PB_option_datatables.optionKeys();
    end.forEach((i) => {
      if (options[i]) {
        DT_options[i] = PB_option_datatables.building(i, methods[i], profile[i]);
      }
    })

    console.log(DT_options);

    let optionsObj = {};
    Object.entries(DT_options).forEach(([key, value]) => {
      optionsObj = {...optionsObj, ...value}
    })


    tableObject[call] = plg_dataTables.$_manual(tableEle, optionsObj, 'new');


  }

  const filterEvents = (element, btnValue) => {

  }

  const getTable = (event, params, htLen) => {

    var renderedData
    let profile, methods, options;
    const _process = (data) => {
      data = data.data
      return _process_table(data);
    }
    const _process_table = (data) => {
      if (data !== false) {
        const OPTION = [4, ['view', 'edit', 'delete'], ['view-sales', 'edit-sales', 'delete-sales']];
        let tableProfile = {
          0: {
            type  : rdR.table.cell.checkbox,
            method: 'a',
            value : '0',
            param : [],
            style : 0,
            css   : []
          },
          1: {
            type  : rdR.table.cell.date,
            method: 'a',
            value : '1',
            param : [],
            style : 0,
            css   : []
          },
          2: {
            type  : rdR.table.cell.account,
            method: 'a',
            value : '2',
            param : [],
            style : 0,
            css   : []
          },
          3: {
            type  : rdR.table.cell.account,
            method: 'a',
            value : '3',
            param : [],
            style : 0,
            css   : []
          },
          4: {
            type  : rdR.table.cell.amount,
            method: 'a',
            value : '4',
            param : [2, 1],
            style : 0,
            css   : []
          },
          5: {
            type  : rdR.table.cell.note,
            method: 'a',
            value : '5',
            param : [],
            style : 0,
            css   : []
          },
          6: {
            type  : rdR.table.cell.dropdown,
            method: 'b',
            value : '0',
            param : [],
            style : 100,
            css   : ['pe-0 text-end', 100]
          },
        };
        methods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal',
        };
        options = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
        };
        profile = {
          0: [],
          1: [],
          2: []
        };
        // render the received data from server.
        renderedData = PB_render_table.$_simple(data, tableProfile);
      }
      else {
        console.log('status has failed, table data :' + JSON.stringify(data));
        renderedData = PB_render_table.$_zero(htLen);
      }

      return {
        redData: renderedData,
        methods: methods,
        options: options,
        profile: profile
      };
    }
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: params
    }, _process)

    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act    : event.value,
    //      type   : event.type,
    //      account: params
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //    return ajax

    //      xResponse = dummy_ajax_transactions_opr.sales([button.value, button.getAttribute('name')], params)


  }
  // fetching new values from server and updating into table
  tableEle = element.querySelector('table');
  filterEle = element.querySelector('[' + atr.core.target + '="filter"]');

  if (!tableEle) {
    console.log('add table element');
    return Promise.reject('Table not found.');
  }
  if (tableEle.getAttribute(atr.load.table) !== 'true') {


    var newValforTable = getTable(event, [], tableEle.querySelectorAll('thead>tr>th').length);

    // appending fetched values
    tableEle.appendChild(newValforTable.redData);
    // update table status
    tableEle.setAttribute('data-load-table', 'true');
    // todo: if new entry created then add 'false'

    // dataTables Plugin Calling.
    dataTableCalling(newValforTable.options, newValforTable.methods, newValforTable.profile, event.value);
    filterEvents(filterEle, event.value);


    // calling other basic plugin functions
    $R_common_obj.$_call(tableEle);

    // for enable dropdown in the table.
    KTMenu.init();
  }
}

//  const eleCheck = () => {
//    if (_callEl === null || _callEl === undefined) {
//      alert('call element is not defined');
//      return false;
//    }
//    else {
//      return true;
//    }
//  }
// Public methods
const opensTarget = (element, event) => {
  return PB_defined.$_open_menu(element, event);
}
const modalsTarget = function (element, event) {

  const modalTargetBody = _buttonLE.modals.querySelector('#' + event.value + '-' + event.type);
  console.log(modalTargetBody);

  const sales_modal = () => {
    return __show_modal();
  }

  const credit_modal = () => {
    return __show_modal();
  }
  const cash_modal = () => {
    return __show_modal();
  }
  const seperate_modal = () => {
    return __show_modal();
  }
  const regular_modal = () => {
    return __show_modal();
  }

  const __show_modal = () => {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_match_data(data.data);
      _return &&= _process_append_into_table(data.data);
      _return &&= _process_register_event();
      return _return;
    }
    const _process_match_data = (data) => {
      console.log(data);

      const targetModal = _buttonLE.modals.querySelector('#transaction-modal');
      const modalTitle = targetModal.querySelector('.modal-title');
      console.log(targetModal, modalTitle)
      modalTitle.querySelector('h3').textContent = data.modal.title;
      modalTitle.querySelector('span').textContent = data.modal.date_range;

      return true;
    }
    const _process_append_into_table = (data) => {
      console.log(data);
      // foreign match the data
      extend.foreign.$_combine(
        {
          ...data[_k.modal],
          ...getStateData([keys.stateData.dates, keys.stateData.ledgers]),
          ...getTagData([keys.tagData.txn_types])
        },
        [
          [_k.table, keys.stateData.dates, _k.id.date, 0],
          [_k.table, keys.stateData.ledgers, _k.ledger_dr, 1],
          [_k.table, keys.stateData.ledgers, _k.ledger_cr, 1],
          [_k.table, keys.tagData.txn_types, _k.type.note, 0],
        ]
      )

      // nested table.
      const table = $R_table_obj.$_nested(data[_k.modal][_k.table], pb.opr.transactions.sales.t.modal, 'modal');

      // append the table into the modal.
      const target_modal_table = _buttonLE.modals.querySelector('#' + event.value + '-' + event.type + '-table');

      console.log(table);

      // remove the tbody if existed.
      target_modal_table.querySelector('tbody')?.remove();

      // add the tbody.
      target_modal_table.append(table);

      // common render for the table
      $R_common_obj.$_call(target_modal_table);

      return true;
    }

    const _process_register_event = (data) => {
      // the target element.
      const targetEle = _buttonLE.modals.querySelector('#' + event.value + '-' + event.type + '-table');

      Deploying.NewEvents(get_LN(), targetEle);

      // add dismiss attribute to close the modal on event hit.
      targetEle.querySelectorAll('button[type=button]').forEach((ele) => {
        ele.setAttribute('data-bs-dismiss', 'modal');
      });
      return true;
    }

    return call_AJAX_GET({
      type: event.type,
      act : event.value
    }, _process, false);
  }

  // switching
  switch (event.value) {

    case pb.opr.transactions.sales.n:
      return sales_modal();

    case pb.opr.transactions.sales.p.credit:
      return credit_modal();

    case pb.opr.transactions.sales.p.cash:
      return cash_modal();

    case pb.opr.transactions.sales.p.separate:
      return seperate_modal();

    case pb.opr.transactions.sales.p.regular:
      return regular_modal();

  }
}


const get = function (event) {
  console.log("event tt", event)
  switch (event.type) {
    case eTypes.form:
      return eleCheck() ? formsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : false;
    default:
      alert(`eventType: ${event.type}, not GET, change nature to POST`);
      return Promise.reject('Invalid Event Type');
  }
}
const post = function (event) {
  switch (event.type) {
    case eTypes.load:
      return eleCheck() ? loadsTarget(get_callEl(), event) : false;

    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : false;

    default:
      return Promise.reject('Invalid Event Type');
  }
}

const option = function (event) {

  switch (event.type) {
    case eTypes.alter:
      return eleCheck() ? alterTarget(get_callEl(), event) : Promise.reject('Call Element not found.');

    case eTypes.modal:
      return eleCheck() ? modalsTarget(get_callEl(), event) : Promise.reject('Call Element not found.');

    default:
      return Promise.reject('Invalid Event Type');
  }
}
const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Banking');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Banking');
  return Promise.resolve(true);
}

export const OTS_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('OTB_Requests', 'Request Type: ' + type);
  switch (type) {

    case keys.event.nature.back:
      return pageBack(data);

    case keys.event.nature.open:
      return pageOpen(data);

    case keys.event.nature.clear:
      return pageClear(data);

    case keys.event.nature.get:
      return get(data);

    case keys.event.nature.post:
      return post(data);

    case keys.event.nature.option:
      return option(data);

    default:
      return false;
  }
}

