import extend from "../../../extend/extend.js";
import {$R_menu_obj, $R_common_obj, $R_table_obj, $R_form_obj} from "../../../base/render.js";
import {get_action, get_callEl, get_LN, get_thePathArr} from "../../../base/global.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {Lyt, otR, plg, exT, rdR, kws, CLS, sD, deF, glob, STYLE, keys} from "../../../base/const.js";
import {eTypes, eValues} from "../../../base/events.js";
import {atr} from "../../../base/attributes.js";
import pb from "../../../base/structure.js";
import {_buttonLE} from "../../../base/elements.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import PB_defined from "../../../base/defined.js";
import PB_extend_calculate from "../../../extend/calculate.js";
import {_k} from "../../../base/keys.js";
import datePicker from "../../../plugins/datePicker.js";
import {getStateData} from "../../../bucket/state.js";
import {getTagData} from "../../../bucket/tags.js";
import Deploying from "../../../base/deploying.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import state from "../../../base/state.js";
// Private variables
let PageData;
let redData;
let flashData = {};
let tableEle, formEle, success, filterEle;
let tableObject = [];
let method;

// Private functions
const pageOpen = (data) => {

  const _process = (data) => {
    console.log(data);
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_menu_render(data);
    _return &&= _process_date_update(data);
    return _return
      ? Promise.resolve(true)
      : Promise.reject('open page process failed.');
  }
  const _process_save_page_state = (data) => {
    PageData = data[_k.info.page_common];
    return true;
  }
  const _process_menu_render = (data) => {
    // calling render to place data into menu.
    return $R_menu_obj.$_left(data.menu, 'value');
  }
  const _process_date_update = (data) => {

    // enable the forms plugins
    exe_plugins_on_manualCall(_buttonLE.menu, {}, kws.plugin.combo);

    // get the form element
    const formEle = _buttonLE.menu.querySelector('form');

    // calling render to place data into menu inputs.
    extend.placement.$_form(data.session, formEle);

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

  return _process(data.data);
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Payments');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Payments');
  return Promise.resolve(true);
}
/**
 * this will be used into forms
 * preloaded data that will not change for this page
 */
const cardsTarget = function (element, event) {

  //        element.classList.remove(CLS.display.none);
  const _process = (data) => {
    data = data.data
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
    const modal = _callEl.getElementsByClassName('modal-title')[0];
    modal.innerHTML = data.modal.title;
    const event_string = event.value + '-' + event.data;
    console.log(data);
    const body = _callEl.querySelector('#' + event_string);
    console.log(body);
    return true;
  }
  const _process_search = (data) => {
    // log
    console.log(data.filters);

    const formEle = _callEl.querySelector('form');
    // render form.
    $R_form_obj.$form(data.filters, formEle);

    console.log(element)
    tableEle = element.querySelector('table');

    if (!tableEle) {
      return false;
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return true;
    }

    // if no data found, then show no data found message.
    if (!data.transactions) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
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
    redData = $R_table_obj.$_simple(data.transactions, pb.opr.transactions.payments.t.transactions);

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
    const eleKey = _callEl.getAttribute(atr.core.id);
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

  const _process_edit = (data) => {
    return true;
  }
  const _process_view = (data) => {
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

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], params, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  return ajax;
}
const alterTarget = function (element, event) {


  const _alter_unpaid_invoices = () => {
    console.log(event);
    const trigger = get_action();
    // transfer the amount from unsettled to be settled.
    const targetInput = trigger.closest('tr').querySelector(`input[${atr.core.catch}="unpaid_bills"]`);
    console.log(targetInput);
    if (trigger.checked) {
      // insert the value
      targetInput.value = event.data;
      targetInput.readOnly = true;
    }
    else {
      // remove the value
      targetInput.value = 0;
      targetInput.readOnly = false;
    }

    PB_extend_calculate.$_table_direct(element, 'total_paid', 'unpaid_bills');

    return Promise.resolve(true);
  }

  const _calculate_total_invoice_payable = () => {
    PB_extend_calculate.$_table_direct(element, 'total_paid', "unpaid_bills");
    return Promise.resolve(true);
  }


  switch (event.value) {
    case 'move':
      return _alter_unpaid_invoices();

    case 'add':
      return _calculate_total_invoice_payable();
  }

  return Promise.reject('No action found for this button');

  return true;
}
const modalsTarget = function (element, event) {

  const modalTargetBody = _buttonLE.modals.querySelector('#' + event.value + '-' + event.type);
  console.log(modalTargetBody);

  const banking_modal = () => {
    return __show_modal();
  }

  const deposit_modal = () => {
    return __show_modal();
  }
  const withdraw_modal = () => {
    return __show_modal();
  }
  const transfer_modal = () => {
    return __show_modal();
  }
  const clearance_modal = () => {
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
      modalTitle.querySelector('h3').textContent = data.modal.title;
      modalTitle.querySelector('span').textContent = data.modal.date_range;

      return true;
    }
    const _process_append_into_table = (data) => {
      console.log(data);
      // foreign match the data
      extend.foreign.$_combine(
        {
          ...data[_k.modal][_k.table],
          ...getStateData([keys.stateData.dates, keys.stateData.ledgers]),
          ...getTagData([keys.tagData.txn_types])
        },
        [
          [_k.parent, keys.stateData.dates, _k.id.date, 0],
          [_k.parent, keys.stateData.ledgers, _k.ledger_dr, 1],
          [_k.parent, keys.stateData.ledgers, _k.ledger_cr, 1],
          [_k.parent, keys.tagData.txn_types, _k.type.txn, 0],
        ]
      )

      // nested table.
      const table = $R_table_obj.$_nested(data[_k.modal][_k.table], pb.opr.transactions.banking.t.modal, 'modal');

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

    case pb.opr.transactions.banking.n:
      return banking_modal();

    case pb.opr.transactions.banking.p.deposit:
      return deposit_modal();

    case pb.opr.transactions.banking.p.withdrawal:
      return withdraw_modal();

    case pb.opr.transactions.banking.p.transfer:
      return transfer_modal();

    case pb.opr.transactions.banking.p.clearance:
      return clearance_modal();

  }
}
const opensTarget = function (element, event) {
  // check the status.
  return PB_defined.$_open_menu(element, event);
}
const changeTarget = function (element, event) {

  const _supplier = () => {

    console.log(event);
    console.log();
    const need = ['due_balance', 'due_bills'];

    const row = get_action().closest('div .row');

    // task: update the balance and bills.
    function getDueBalanceByLid(lid) {
      console.log(flashData[event.value][_k.s.suppliers]);
      const item = _.find(flashData[event.value][_k.s.suppliers], {lid: lid});
      /*
       without lodash
       const item = flashData[event.value][_k.s.suppliers].find(entry => entry['lid'] === lid);
       */
      return item ? item : null;
    }

    let requiredData = getDueBalanceByLid(+event.data);
    requiredData[need[0]] = $R_common_obj.$_return(requiredData[need[0]], rdR.common.methods.currency, {sign: true})
    const dueElement = row.querySelector(querySA(atr.core.control, 'due'));
    dueElement.querySelector('input').value = `${requiredData[need[1]]} Bills Due of ${requiredData[need[0]]}`;
    dueElement.querySelector('button').setAttribute(atr.event.data, event.data);

    // task: change the select bank account.
    // get the target select element to change the payment account.
    const payment_account = row.querySelector(querySA(atr.core.update, 'payment_accounts'));
    // update the select value.
    extend.placement.$_single(requiredData[_k.lid.payment], payment_account, kws.plugin.sel);

    return Promise.resolve(true);
  }

  const _salary = () => {
    /*
     // todo: tasks
     [] -> amount salary rows me set ho jave inside php-db
     [] -> if advance ho to account me diect add ho jave and jab payroll bane tab payable of month equal ho jave.
     */

    const attrVAl = {
      amount: 'salary_amount',
      month : 'salary_month',
    };

    const _process = (data) => {
      let _return = true;
      _return &&= _process_salary_info(data.data);
      _return &&= _process_clear_info();
      return _return;
    }

    const _process_salary_info = (data) => {
      console.log(data);
      const info = data[_k.info.salary];
      const form_input_row = get_action().closest('div > .row');
      const due_salary = $R_common_obj.$_return(info.due_salary, rdR.common.methods.currency, {sign: true});
      form_input_row.querySelector(querySA(atr.core.catch, attrVAl.amount, 'p')).innerText = `${due_salary} to be paid.`;
      return true;
    }

    const _process_clear_info = () => {
      const select = get_action();
      console.log(select);
      $(select).on('select2:clear', function (e) {
        const form_input_row = select.closest('div > .row');
        console.log(form_input_row);
        form_input_row.querySelector(querySA(atr.core.catch, attrVAl.amount, 'p')).innerText = '';
      });
      return true;
    }

    let block = get_action().closest('div[data-repeater-item="outer"]');
    const month = block.querySelector(querySA(atr.core.catch, attrVAl.month)).value;
    let employee_lid = event.data;

    let formData = {
      month       : month,
      employee_lid: employee_lid
    }

    return call_AJAX_POST({
      act : event.value,
      type: eTypes.load,
    }, formData, _process, false);
  }

  switch (event.value) {
    case pb.opr.transactions.payments.c.supplier:
      return _supplier();

    case pb.opr.transactions.payments.c.salary:
      return _salary();

    default :
      return eventNotFound(event);
  }
}

const actionsTarget = function (element, event) {

  /*
   -------------------------------
   private functions of actions
   -------------------------------
   */
  const action_amount = () => {
    let tbody = element.querySelector('table').querySelector('tbody');

    let tr = tbody.querySelector('[data-e-value="' + event.data + '"]').closest('tr');
    let td = tr.querySelector('[data-pb-catch = "input_field"]');
    let input_value = [];
    tr.querySelectorAll('.rc_currency').forEach((ele) => {
      input_value.push(amt_mask_filter(ele.innerText));
    })
    td.value = parseFloat(input_value[0]) - parseFloat(input_value[1]);

    // calculate total
    PB_extend_calculate.$_table_direct(formEle, "vendor_payments_total");
    return true;

  }
  const action_save = () => {

    formEle = element.querySelector(`form`);

    const __form_collect = () => {

      const ___form_collect_repeater = () => {
        return extend.collect.$_form_repeater(formEle);
      }
      const ___form_collect_table = () => {
        return extend.collect.$_form_table(formEle);
      }

      switch (event.data) {
        case pb.opr.transactions.payments.p.supplier:
          return ___form_collect_repeater();
        case pb.opr.transactions.payments.p.expense:
          return ___form_collect_repeater();
        case pb.opr.transactions.payments.p.salary:
          return ___form_collect_repeater();
        case pb.opr.transactions.payments.p.vendor:
          return ___form_collect_table();
        case pb.opr.transactions.payments.p.loans:
          return ___form_collect_table();
        case pb.opr.transactions.payments.p.drawing:
          return __drawing();
      }
    }


    console.log(element, event);
    /**
     * this data save into variables.
     * it will be called when create form initiated.
     * @param data
     * @private
     */

    const _process = (data) => {
      let _return = true;
      _return &&= _process_save_return(data.data);
      _return &&= _process_form_old_data_reset(data.data);

      const stateObj = _buttonLE.states;
      // clear the states.
      state.manage(get_LN(), [stateObj.menu, stateObj.search]);

      return _return;
    }

    const _process_save_return = (data) => {
      PB_defined.$_form_submit_response(data[event.value]);
      return true;
    }

    const _process_form_old_data_reset = () => {
      action_reset();
      return true;
    }

    const ___success = () => {

      // collect form data.
      const formData = __form_collect();

      return call_AJAX_POST({
        act : event.value,
        type: event.type,
        id  : event.data
      }, formData, _process, false);
    }

    const __reject = () => {
      return Promise.reject('form validation failed.');
    }

    const param = {
      form_sno: formEle.getAttribute(atr.form.sno),
      method  : deF.form_promise.method.inbuild,
    };

    return PB_defined.$_form_validation(___success, __reject, param);
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
  const action_delete = () => {
    const _process = (data) => {
      data = data.data
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
    //      type: event.type,
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //
    //    return ajax;
    return call_AJAX_GET({
      act : event.value,
      type: event.type,
    }, _process)
  }
  const action_edit = () => {

    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      return _return;
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
      type: event.type,
    }, _process)
  }
  const action_view = () => {
    return true;
  }
  const action_change = () => {

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
      type: event.type,
    }, formData, _process, false);

  }

  switch (event.value) {
    case eValues.action.buttons.save:
      return action_save();

    case eValues.action.buttons.reset:
      return action_reset();

    case eValues.action.buttons.delete:
      return action_delete();

    case eValues.action.buttons.edit:
      return action_edit();

    case eValues.action.buttons.view:
      return action_view();

    case eValues.action.buttons.change:
      return action_change();

    case eValues.action.buttons.amount:
      return action_amount();

    default :
      eventNotFound(event);
      return false;
  }
}

function formsTarget(element, event) {

  formEle = element.querySelector('form');

  // if the form is already loaded, then return true
  if (formEle.getAttribute(atr.load.form) === '1') {
    return Promise.resolve(true);
  }
  // fetching new values or static values for form initial

  const load_supplier_form = () => {
    return _form_target_repeater();
  }
  const load_expenses_form = () => {
    return _form_target_repeater();
  }
  const load_salary_form = () => {
    return _form_target_repeater();
  }
  const load_vendor_form = () => {
    return _form_target_simple();
  }
  const load_loans_form = () => {
    return _form_target_simple();
  }

  const _form_target_simple = () => {

    const targetID = `${event.type}-${event.value}`;
    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
    console.log(template);
    formEle.appendChild(template.cloneNode(true));

    if (formEle.getAttribute(atr.load.form) === '1') {
      return true;
    }

    const _process = (data) => {
      let _return = true;
      _return &&= _process_form(data.data);
      return _return;
    }
    const _process_form = (data) => {

      console.log(data);

      const sts = $R_form_obj.$global({...data, ...PageData}, formEle, rdR.form.method.advance);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }

    // initiated page blockUIElement until all things load for the page.
    // todo: blockElement.

    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }
  const _form_target_repeater = () => {
    const targetID = `${event.type}-${event.value}`;
    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
    if (template === null) {
      alert('template not found');
      return Promise.reject('template not found');
    }

    formEle.append(template.cloneNode(true));

    const _process = (data) => {
      let _return = true;
      // save data info flash.
      flashData[event.value] = data.data;
      console.log(flashData);
      _return &&= _process_form(data.data);
      return _return;
    }
    const _process_form = (data) => {

      const sts = $R_form_obj.$global({...data, ...PageData}, formEle, rdR.form.method.repeater);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }

    // initiated page blockUIElement until all things load for the page.
    // todo: block UI

    // ajax
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }

  switch (event.value) {

    case pb.opr.transactions.payments.p.supplier:
      return load_supplier_form();

    case pb.opr.transactions.payments.p.expenses:
      return load_expenses_form();

    case pb.opr.transactions.payments.p.salary:
      return load_salary_form();

    case pb.opr.transactions.payments.p.vendor:
      return load_vendor_form();

    case pb.opr.transactions.payments.p.loans:
      return load_loans_form();

    default :
      return _form_target_repeater();
  }
}

function loadsTarget(element, event) {

  const _bills_supplier = function () {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_key_matching(data.data);
      _return &&= _process_render_into_modal(data.data);
      return _return;
    }
    const _process_key_matching = (data) => {
      return true;
    }
    const _process_render_into_modal = (data) => {
      // bb
      return true;
    }

    // generate form data.
    const formData = {
      ledger_dr  : event.data,
      supplier_id: event.data,
    }

    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, formData, _process);
  }

  const _emi_loans = function () {
    const _process = (data) => {
      data = data.data

      let tableEle = element.querySelector('table');

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }
      if (!data.emi) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }
      // render the response data (if required)


      // render the table.
      redData = $R_table_obj.$_simple(data.emi, pb.opr.transactions.payments.t.emi);

      tableEle.appendChild(redData)


      // update table status
      tableEle.setAttribute(atr.load.table, '1');


      // apply common renders
      $R_common_obj.$_call(tableEle);
      tableEle.classList.remove('d-none');

      // for enable dropdown in the table.


      // dataTablesInit(event.value);
      // filterEvents(event.value);
      //        calculateTotal(element, event);
      method = true;
      return true;
    }

    let loadFormData = {};
    let form = element.querySelector('form');
    const targetButton = form.querySelector('[data-pb-calling="e_a_load_entries"]');
    const target = targetButton.getAttribute(atr.core.calling);
    //      form.querySelectorAll('[data-pb-prefill="' + target + '"]').forEach((item) => {
    //        loadFormData[item.name] = item.value;
    //      });
    loadFormData = extend.collect.$_collect_formdata(form, target);
    console.log(loadFormData);
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
      type: event.type,
    }, loadFormData, _process, false);
  }

  const _invoices_vendor = function () {

    const _process = (data) => {
      console.log(data.data);
      let _return = true;
      _return &&= _process_key_match(data.data);
      _return &&= _process_table_render(data.data);
      return _return;
    }
    const _process_key_match = (data) => {

      let tableEle = element.querySelector('table');

      if (tableEle.getAttribute(atr.load.table) === '1') return true;

      if (!data[_k.s.invoices]) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }
      // render the response data (if required)
      extend.foreign.$_combine({
        ...data,
        ...getStateData([keys.stateData.dates, keys.stateData.ledgers, keys.stateData.groups])
      }, [
        [_k.s.invoices, keys.stateData.dates, _k.id.date, 0],
        [_k.s.invoices, keys.stateData.dates, _k.id.due_date, 0],
        [_k.s.invoices, keys.stateData.ledgers, _k.lid.expense, 1],
        [_k.s.invoices, keys.stateData.groups, _k.gid.expense, 1],
      ]);
      return true;
    }
    const _process_table_render = (data) => {
      let tableEle = element.querySelector('table');
      // render the table.
      redData = $R_table_obj.$_simple(
        data[_k.s.invoices],
        pb.opr.transactions.payments.t.vendor,
        data[_k.ids][_k.s.invoices]
      );

      tableEle.appendChild(redData)

      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);
      tableEle.classList.remove('d-none');

      // for total calculation
      PB_extend_calculate.$_table_direct(element, 'total_paid', 'unpaid_bills');
      // alterTarget(element, event);
      return true;
    }

    //      const formData = new formData();
    let form = element.querySelector('form');
    console.log(element);

    const targetButton = form
      .querySelector(querySA(atr.core.calling, pb.opr.transactions.payments.c.sub.unpaid_bills));

    const targetKey = targetButton.getAttribute(atr.core.calling);

    const formData = extend.collect.$_collect_formdata(form, targetKey);

    console.log(formData);

    return call_AJAX_POST({
      act : event.value,
      type: event.type,
    }, formData, _process, false);
  }

  const _transactions_search = function () {

    let formData;
    // get the data from form.
    const formEl = element.querySelector('form');

    formData = extend.collect.$_form_step(formEl);

    // no state change, if required, is not passed.
    if (!formData) {
      return false;
    }


    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_load_table_as_per_new_filter(data);
      return _return;
    }

    const _process_load_table_as_per_new_filter = (data) => {
      console.log(data);
      console.log(element);
      const formEle = element.querySelector('table');
      formEle.removeChild(formEle.querySelector('tbody'));
      console.log(formEle);
      // if no data found, then show no data found message.
      if (!data.transactions) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
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
      type: event.type,
    }, formData, _process, false);
  }

  // switching
  switch (event.value) {

    case eValues.card.buttons.search:
      return _transactions_search();

    case pb.opr.transactions.payments.c.bills:
      return _bills_supplier();

    case pb.opr.transactions.payments.c.emi:
      return _emi_loans();

    case pb.opr.transactions.payments.c.invoices:
      return _invoices_vendor();

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

    // render into table.

  }
  const load_fund_clearance = (a, event) => {
    //todo: @lokesh

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
}

function tablesTarget(element, event) {
  return Promise.reject('Table Target not created Yet.');
}

// Public methods

const get = function (event) {
  switch (event.type) {
    case eTypes.form:
      return eleCheck() ? formsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
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
      return eleCheck() ? altersTarget(get_callEl(), event) : Promise.reject('Call Element not found.');

    case eTypes.modal:
      return eleCheck() ? modalsTarget(get_callEl(), event) : Promise.reject('Call Element not found.');

    case eTypes.change:
      return eleCheck() ? changeTarget(get_callEl(), event) : Promise.reject('Call Element not found.');

    default:
      return Promise.reject('Invalid Event Type');
  }
}


// Public methods
export const OTY_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('OTY_Requests', 'Request Type: ' + type);
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

