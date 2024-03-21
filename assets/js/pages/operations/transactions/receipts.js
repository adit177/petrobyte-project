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

// Shared variables
let method;
let StateData, redData;
let tableEle, formEle, success, filterEle;
let tableObject = [];
let newEvent;

let methord = false;
// Private functions
/**
 * this will be used for show page's base-0 data.
 */
console.log("receipts.js ki file idhar hai ");
const pageOpen = (data) => {

  // init the required classes.


  // process.

  const _process = (data) => {
    data = data.data;
    console.log("process data")
    console.log(data);
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_menu_render(data);
    _return &&= _process_date_update(data);
    // _return &&=_process_save_page_state()
    //      _return &&= _process_table_render(element);
    //    return Promise.resolve(_return);
    return _return
      ? Promise.resolve(true)
      : Promise.reject('open page process failed.');
  }
  const _process_save_page_state = (data) => {
    console.log("state data", data[_k.pageState])
    StateData = data[_k.pageState];
    return true;
  }
  const _process_menu_render = (data) => {
    // calling render to place data into menu.
    console.log(data.menu);
    return $R_menu_obj.$_left(data.menu, rdR.menu.type.value);
  }

  const _process_date_update = (data) => {
    exe_plugins_on_manualCall(_buttonLE.menu, {}, kws.plugin.combo);

    // get form element.
    const formEle = _buttonLE.menu.querySelector('form');
    console.log(formEle);
    console.log(data.session);
    // calling render to place data into menu inputs.
    PB_extends.placement.$_form(data.session, formEle);
    // get the date instance to make event-able on change.
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
}


const pageBack = (data) => {
  toastr.info('back clicked', 'pageBack - Receipts');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Receipts');
  return Promise.resolve(true);
}

const opensTarget = (element, event) => {
  return PB_defined.$_open_menu(element, event);
}
/**
 * this will be used into forms
 * preloaded data that will not change for this page
 */
const cardsTarget = function (element, event) {
  //    element.classList.remove(CLS.display.none);
  console.log(element, event);
  const _process = (data) => {
    data = data.data;

    switch (event.value) {
      case eValues.card.buttons.modal:
        return _process_modal(data);

      case eValues.card.buttons.delete:
        return _process_delete(data);

      case eValues.card.buttons.edit:
        return _process_edit(data);

      case eValues.card.buttons.view:
        return _process_view(data);

      case eValues.card.buttons.search:
        return _process_search(data);

      default:
        alert('No action found for this button');
    }
  }
  const _process_modal = (data) => {
    // get the modal element.
    const modal = get_callEl().getElementsByClassName('modal-title')[0];
    // update the modal title.
    modal.innerHTML = data.modal.title;

    const event_string = event.value + '-' + event.data;

    // find the target body element.
    const body = get_callEl().querySelector('#' + event_string);

    // append the table.

    console.log(body);


    return true;
  }
  const _process_search = (data) => {
    // log
    console.log(data);
    const formEle = get_callEl().querySelector("form");
    // render form.
    $R_form_obj.$form(data.filters, formEle);
    console.log(element)
    tableEle = element.querySelector('table');

    if (!tableEle) {
      return Promise.reject('Table not found.');
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return true;
    }

    // if no data found, then show no data found message.
    if (!data.transactions) {
      return PB_defined.$_append_table_zero(formEle)
    }
    // render the response data (if required)
    extend.foreign.$_remote(
      exT.foreign.combine, data,
      [
        [_k.transactions, keys.stateData.dates, 1, 0],
        [_k.transactions, keys.stateData.ledgers, 4, 0],
        [_k.transactions, keys.stateData.ledgers, 5, 0]
      ]);

    // render the table.
    redData = $R_table_obj.$_simple(data.transactions, pb.opr.transactions.receipts.t.transactions);

    tableEle.appendChild(redData)
    console.log(tableEle);
    // update table status
    tableEle.setAttribute(atr.load.table, '1');

    // apply common renders
    $R_common_obj.$_call(tableEle);

    // for enable dropdown in the table.
    KTMenu.init();

    // dataTablesInit(event.value);

    // filterEvents(event.value);
    return true;
  }
  const _process_delete = (data) => {
    console.log(data);
    const eleKey = get_callEl().getAttribute(atr.core.id);
    const targetID = eleKey + '-preview';
    const valueID = 'voucher_no';

    // get the template body
    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));

    // get the target element.
    let previewEl = element.querySelector('#' + targetID);
    const key = previewEl.getAttribute(atr.core.key);

    // insert new values
    previewEl.innerHTML = extend.append.$_single_on_innerHTML(template, data[key]);

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

    // apply common render.
    $R_common_obj.$_call(previewEl);

    return true;

  }
  const _process_view = (data) => {
    console.log("process view function me aa gya ")
    return true;
  }
  const _process_edit = (data) => {
    return true;
  }
  let params;
  // apply switch for params
  switch (event.value) {
    case eValues.card.buttons.modal:
      params = {
        act  : event.value,
        type : event.type,
        about: event.data,
      };
      break;

    case eValues.card.buttons.delete:
    case eValues.card.buttons.edit:
    case eValues.card.buttons.view:
      params = {
        act   : event.value,
        type  : event.type,
        vou_no: event.data,
      };
      break;
    case eValues.card.buttons.search:
      params = {
        act : event.value,
        type: event.type,
      }
      break;

  }

  // send POST ajax
  //  const ajax = new AjaxPB();
  //  const urlID = ajax.buildingURL([], params, 'local', 0);
  //  ajax.callREQUEST({}, urlID, false, _process);
  //
  //  return ajax;
  return call_AJAX_GET({
    act : event.value,
    type: event.type,
  }, _process)
}

const actionsTarget = function (element, event) {

  // event print
  console.log("yahan pe event print ho rha ")
  console.log(event);

  /*
   -------------------------------
   private functions of actions
   -------------------------------
   */

  const action_amount = (element, event) => {
    console.log(formEle.querySelector('table'));
    let table = formEle.querySelector('table');
    let tbody = table.querySelector('tbody');
    let tr = tbody.querySelector('[data-e-value="' + event.data + '"]').closest('tr');
    let td = tr.querySelector('[data-pb-catch = "input_field"]');
    let input_value = [];
    tr.querySelectorAll('.rc_currency').forEach((ele) => {
      input_value.push(amt_mask_filter(ele.innerText));
    })
    td.value = parseFloat(input_value[0]) - parseFloat(input_value[1]);
    console.log(formEle.id);
    // calculate total
    switch (formEle.id) {
      case "form-receipt-entry":
        PB_extend_calculate.$_table_direct(formEle, "total_collected_amount");
        break;
      case "form-receipt-bill":
        PB_extend_calculate.$_table_direct(formEle, "total_received_amount");
        break;
    }
    return true;

  }
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
      plg_sweetAlert.$_alert([data[event.value].status, data[event.value].message],
        {
          confirm: [false, '', 'btn btn-light-primary rounded'],
        },
        [2, 5, 1500],)
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

  // const action_save = (element, event) => {
  //
  //   const _process = (data) => {
  //     data = data.data;
  //
  //     return _process_save_return(data);
  //     return _process_form_old_data_reset(data);
  //   }
  //   const _process_save_return = (data) => {
  //     sleep(100).then(() => {
  //       formEle = element.querySelector('#' + event.place + '-' + event.data);
  //       const f_sno = formEle.getAttribute(atr.form.sno);
  //       if (!plg_formValid.$_get_status(f_sno)) {
  //         toastr.error('Kindly fill all required steps', 'Incomplete Form');
  //         return false;
  //       }
  //     });
  //     return true;
  //   }
  //
  //   const _process_form_old_data_reset = (data) => {
  //     // calling render to place data into menu.
  //     extend.reset.$_simple_form(formEle, kws.attr.pb);
  //     return true;
  //   }
  //   let formData;
  //   if (methord) {
  //     formData = extend.collect.$_form_table(formEle);
  //   }
  //   else {
  //     formData = extend.collect.$_form_repeater(formEle);
  //   }
  //
  //
  //   return call_AJAX_POST({
  //     act : event.value,
  //     type: event.type
  //   }, formData, _process, false);
  // }
  //
  // const action_reset = (element, event) => {
  //
  //   const _process = (data) => {
  //     data = data.data;
  //
  //     return _process_form_reset(data);
  //   }
  //   const _process_form_reset = (data) => {
  //     const method = true;
  //     if (method) {
  //       formEle = element.querySelector('form');
  //       extend.reset.$_simple_form(formEle, kws.attr.pb);
  //     }
  //     else {
  //       formEle = element.querySelector(event.type + '-' + event.value);
  //       extend.reset.$_simple_form(formEle, kws.attr.pb);
  //     }
  //     return true;
  //   }
  //
  //   const ajax = new AjaxPB();
  //   const urlID = ajax.buildingURL([], {
  //     act : event.value,
  //     type: event.type
  //   }, 'local', 0);
  //   ajax.callREQUEST({}, urlID, false, _process);
  //
  //   return ajax;
  //
  // }

  const action_delete = (element, event) => {
    const _process = (data) => {
      data = data.data;

      let _return = true;
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      return _return;
    }
    const _process_a = (data) => {
      return true;
    }
    const _process_b = (data) => {
      return true;


    }

    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //
    //    return ajax;
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: values
    }, _process)

  }

  const action_edit = (element, event) => {
    const _process = (data) => {
      data = data.data;
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
    //      type: event.type
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //
    //    return ajax;
    return call_AJAX_GET({
      act : event.value,
      type: event.type,
    }, _process)
  }

  const action_view = (element, event) => {
    return true;
  }

  const action_change = (element, event) => {
    // form submit after getting data.
    const _process = (data) => {
      console.log(data)
      data = data.data;
      console.log(data)

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
      console.log(data);
      return $R_menu_obj.$_left(data['menu_info'], rdR.menu.type.value, [], rdR.menu.role.update, rdR.menu.tags.menu);
    }
    // console.log(element)
    // collect form data.
    const formData = extend.collect.$_form_simple(element.querySelector('form'));

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
    case eValues.action.buttons.amount:
      return action_amount(element, event);
    default :
      eventNotFound(event);
      return false;
  }

}


// Creates Target is For forms
function formsTarget(element, event) {
  console.log(event)
  formEle = element.querySelector('form');

  if (formEle.getAttribute(atr.load.form) === '1') {
    return Promise.resolve(true);
  }

  // fetching new values or static values for form initial


  const load_customer_form = (element, event) => {
    //    return form_target_common(element, event);
    formEle = element.querySelector('form');

    if (formEle.getAttribute(atr.load.form) === '1') {
      return true;
    }

    const _process = (data) => {
      data = data.data;

      return _process_form(data);

    }
    const _process_form = (data) => {

      StateData.customer_form = data;
      console.log(StateData)
      const sts = $R_form_obj.$global({...StateData, ...data}, formEle, rdR.form.method.repeater);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');

      newEvent = {
        type : "navtab",
        value: "direct",
        place: "customer-form"
      }
      const newEle = element.querySelector('#' + newEvent.value + '-' + newEvent.type);
      navtabsTarget(newEle, newEvent, true)
      console.log(data, event, element);
      return true;
    }

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
  const load_income_form = (element, event) => {
    //    return form_target_common(element, event);
    formEle = element.querySelector('form');

    if (formEle.getAttribute(atr.load.form) === '1') {
      return true;
    }

    const _process = (data) => {
      data = data.data;

      return _process_form(data);

    }
    const _process_form = (data) => {

      const sts = $R_form_obj.$global({...StateData, ...data}, formEle, rdR.form.method.repeater);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');

      newEvent = {
        type : "navtab",
        value: "receive",
        place: "income-form"
      }
      const newEle = element.querySelector('#' + newEvent.value + '-' + newEvent.type);
      navtabsTarget(newEle, newEvent, true)
      console.log(data, event, element);
      return true;
    }

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

  const load_contact_form = (element, event) => {
    return form_target_common(element, event);
  }

  const load_transact_form = (element, event) => {
    return form_target_common(element, event);
  }

  const form_target_common = (element, event) => {
    const targetID = `${event.type}-${event.value}`;

    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
    console.log(template, targetID);
    formEle.append(template.cloneNode(true));
    //    formEle = element.querySelector('form');
    //
    //    if (formEle.getAttribute(atr.load.form) === '1') {
    //      return true;
    //    }

    const _process = (data) => {
      data = data.data;

      return _process_form(data);

    }
    const _process_form = (data) => {

      const sts = $R_form_obj.$global({...StateData, ...data}, formEle, rdR.form.method.repeater);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');

      return true;
    }

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
    case pb.opr.transactions.receipts.p.customer:
      return load_customer_form(element, event);

    case pb.opr.transactions.receipts.p.income:
      return load_income_form(element, event);

    case pb.opr.transactions.receipts.p.contact:
      return load_contact_form(element, event);

    case pb.opr.transactions.receipts.p.transact:
      return load_transact_form(element, event);


    default :
      return form_target_common(element, event);
  }
}

function loadsTarget(element, event) {
  /**
   * here we load add contact page for user
   * @param element
   * @param event
   * @returns {bool||AjaxPB}
   */

  const load_receipt_bills = function (element, event) {
    console.log(formEle, event, element);
    const _process = (data) => {
      data = data.data
      console.log(data);

      let tableEle = formEle.querySelector('table');
      //
      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }
      if (!data.bills) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }
      // render the response data (if required)

      // render the table.
      redData = $R_table_obj.$_simple(data.bills, pb.opr.transactions.receipts.t.unpaidBills);
      tableEle.appendChild(redData)
      //
      //
      // update table status
      tableEle.setAttribute(atr.load.table, '1');


      // apply common renders
      $R_common_obj.$_call(tableEle);
      tableEle.classList.remove('d-none');
      methord = true;
      // for enable dropdown in the table.

      //      calculateTotal(element, event);
      //      method = true;
      return true;
    }

    let loadFormData = {};
    console.log(formEle);

    const targetButton = formEle.querySelector('[data-pb-calling="rc_unpaid_bills"]');
    const target = targetButton.getAttribute(atr.core.calling);
    //      form.querySelectorAll('[data-pb-prefill="' + target + '"]').forEach((item) => {
    //        loadFormData[item.name] = item.value;
    //      });

    loadFormData = extend.collect.$_collect_formdata(formEle, target);
    console.log(loadFormData);
    //
    //
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type,
    //    }, 'local', 0);
    //    ajax.callREQUEST(loadFormData, urlID, true, _process);
    //
    //    return ajax;
    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, loadFormData, _process, false);
  }

  const load_receipt_interest = function (element, event) {
    console.log(formEle, event, element);
    const _process = (data) => {
      data = data.data
      console.log(data);

      let tableEle = formEle.querySelector('table');
      //
      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }
      if (!data.interest) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }
      // render the response data (if required)

      // render the table.
      redData = $R_table_obj.$_simple(data.interest, pb.opr.transactions.receipts.t.interest);
      tableEle.appendChild(redData)
      //
      //
      // update table status
      tableEle.setAttribute(atr.load.table, '1');


      // apply common renders
      $R_common_obj.$_call(tableEle);
      tableEle.classList.remove('d-none');

      // for enable dropdown in the table.
      methord = true;
      //      calculateTotal(element, event);
      //      method = true;
      return true;
    }

    let loadFormData = {};
    console.log(formEle);

    const targetButton = formEle.querySelector('[data-pb-calling="rc_interest_amount"]');
    const target = targetButton.getAttribute(atr.core.calling);
    //      form.querySelectorAll('[data-pb-prefill="' + target + '"]').forEach((item) => {
    //        loadFormData[item.name] = item.value;
    //      });

    loadFormData = extend.collect.$_collect_formdata(formEle, target);
    console.log(loadFormData);
    //
    //
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type,
    //    }, 'local', 0);
    //    ajax.callREQUEST(loadFormData, urlID, true, _process);
    //
    //    return ajax;
    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, formData, _process, false);

  }
  const load_receipt_entry = function (element, event) {

    const _process = (data) => {
      data = data.data
      console.log(data);

      let tableEle = formEle.querySelector('table');
      //
      if (tableEle.getAttribute(atr.load.table) === '1') {
        return Promise.reject('no data found for search');
      }
      if (!data.entry) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }
      // render the response data (if required)

      // render the table.
      redData = $R_table_obj.$_simple(data.entry, pb.opr.transactions.receipts.t.unpaidEntries);
      tableEle.appendChild(redData)
      //
      //
      // update table status
      tableEle.setAttribute(atr.load.table, '1');


      // apply common renders
      $R_common_obj.$_call(tableEle);
      tableEle.classList.remove('d-none');
      methord = true;
      // for enable dropdown in the table.

      //      calculateTotal(element, event);
      //      method = true;
      return true;
    }

    let loadFormData = {};
    console.log(formEle);

    const targetButton = formEle.querySelector('[data-pb-calling="rc_unpaid_entries"]');
    const target = targetButton.getAttribute(atr.core.calling);
    //      form.querySelectorAll('[data-pb-prefill="' + target + '"]').forEach((item) => {
    //        loadFormData[item.name] = item.value;
    //      });

    loadFormData = extend.collect.$_collect_formdata(formEle, target);
    console.log(loadFormData);
    //
    //
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type,
    //    }, 'local', 0);
    //    ajax.callREQUEST(loadFormData, urlID, true, _process);
    //
    //    return ajax;
    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, formData, _process, false);

  }


  const load_search_txns = function (element, event) {

    let formData;
    // get the data from form.
    const formEl = element.querySelector('form');

    formData = extend.collect.$_form_step(formEl);

    // no state change, if required, is not passed.
    if (!formData) {
      return Promise.reject('no data found for search');
    }


    const _process = (data) => {
      data = data.data;

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
      if (!data[_k.transactions]) {
        return PB_defined.$_append_table_zero(formEle);
        //        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        //        tableEle.appendChild(redData);
        //        return true;
      }
      // render the response data (if required)
      extend.foreign.$_remote(
        exT.foreign.combine, data,
        [
          ['transactions', 'dates', 1, 0],
          ['transactions', 'ledgers', 4, 0],
          ['transactions', 'ledgers', 5, 0]
        ]);

      // render the table.
      redData = $R_table_obj.$_simple(data.transactions, pb.opr.transactions.banking.t.transactions);

      tableEle.appendChild(redData)
      console.log(redData);

      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);

      // for enable dropdown in the table.
      KTMenu.init();

      // dataTablesInit(event.value);

      // filterEvents(event.value);


      return true;
    }
    const _process_close_accordion = (data) => {
      PB_defined.$_accordion_collapsed(element.querySelector('#search-card-form'));

      return true;
    }

    // ajax call and get a response.
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type
    //    }, 'local', 0);
    //    ajax.callREQUEST(formData, urlID, true, _process);
    //
    //    return ajax;
    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, formData, _process, false);
  }


  // switching
  console.log(event)

  switch (event.value) {

    case eValues.card.buttons.search:
      return load_search_txns(element, event);
    case eValues.load.buttons.receipt.entry:
      return load_receipt_entry(element, event);
    case eValues.load.buttons.receipt.bills:
      return load_receipt_bills(element, event);
    case eValues.load.buttons.receipt.interest:
      return load_receipt_interest(element, event);
  }
  //for each loop
}

function tablesTarget(element, button) {
  return Promise.resolve(true);
  //  return Promise.reject('No table created.');
}

const alterTarget = function (element, event) {
  console.log(formEle.id);
  const action_receipt_entry = () => {
    PB_extend_calculate.$_table_direct(formEle, "total_collected_amount")
    return true;
  }
  const action_receipt_bill = () => {
    PB_extend_calculate.$_table_direct(formEle, "total_received_amount")
    return true;
  }
  switch (formEle.id) {
    case 'form-receipt-entry':
      return action_receipt_entry();
    case 'form-receipt-bill':
      return action_receipt_bill();
    default :
      alert('form not found');
      return false;
  }

}
const changeTarget = function (element, event) {

  const action_customer_change = (element, event) => {
    const _process = (data) => {
      data = data.data;
      return _process_customer_change(data);
    }
    const _process_customer_change = (data) => {
      const vehicleEle = formEle.querySelector('[' + atr.core.source + '="vehicle_account"]');
      $R_form_obj.$global(data, vehicleEle, rdR.form.method.single);
      return true;
    }
    console.log(event);
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type,
    //      data: event.data,
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //    return true;
    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      data: event.data
    }, _process)
  }
  alert(event.value);
  switch (event.value) {

    case pb.opr.transactions.receipts.c.customer.n:
      return action_customer_change(element, event);


    default :
      eventNotFound(event);
      return false;
  }

}

function navtabsTarget(element, event, autoCall = false) {
  console.log(event, element);
  const _process = (data) => {
    data = data.data;

    return _process_navtabs(data);
  }
  const _process_navtabs = (data) => {
    formEle = element.querySelector('form')
    console.log(formEle);
    const newFormEle = element.querySelector(`#${event.value}-${event.type}`);
    console.log(formEle);

    if (!newFormEle) {
      return true;
    }

    formEle = newFormEle.querySelector('form');
    console.log({...StateData['customer_form'], ...data})
    const sts = $R_form_obj.$global({...StateData['customer_form'], ...data}, formEle, rdR.form.method.advance);
    if (!sts) return false;
    // update form's core element status.
    formEle.setAttribute(atr.load.form, '1');

    return true;

  }
  if (autoCall) {
    // get the trigger from the element.
    const trigger = get_callEl().querySelector(querySA(atr.core.target, kws.attrVal.trigger));
    console.log(trigger);
    Arranging._buttons(event, trigger);
  }
  //  const ajax = new AjaxPB();
  //  const urlID = ajax.buildingURL([], {
  //    act : event.value,
  //    type: event.type
  //  }, 'local', 0);
  //  ajax.callREQUEST({}, urlID, false, _process);
  //
  //  return ajax;
  return call_AJAX_GET({
    act    : event.value,
    type   : event.type,
    account: values
  }, _process)
}


// Public methods


const get = function (event) {
  console.log("get function called")
  console.log(event.type);
  switch (event.type) {
    case eTypes.form:
      return eleCheck() ? formsTarget(get_callEl(), event) : false;
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : false;
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : false;
    case eTypes.navtab:
      return eleCheck() ? navtabsTarget(get_callEl(), event) : false;
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : false;
  }
}
const post = function (event) {
  switch (event.type) {
    case eTypes.load:
      return eleCheck() ? loadsTarget(get_callEl(), event) : false;
    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : false;
  }
}

const option = function (event) {
  switch (event.type) {
    case eTypes.alter:
      return eleCheck() ? alterTarget(get_callEl(), event) : false;
    case eTypes.change:
      return eleCheck() ? changeTarget(get_callEl(), event) : false;
  }
}


export const OTR_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('OTR_Requests', 'Request Type: ' + type);
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