import extend from "../../../extend/extend.js";
import {$R_menu_obj, $R_common_obj, $R_table_obj, $R_form_obj} from "../../../base/render.js";
import {get_action, get_callEl, get_layoutName, get_LN} from "../../../base/global.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {Lyt, otR, plg, exT, rdR, kws, CLS, sD, deF, glob, STYLE, keys} from "../../../base/const.js";
import {eTypes, eValues} from "../../../base/events.js";
import {atr} from "../../../base/attributes.js";
import pb from "../../../base/structure.js";
import {_buttonLE, _sampleLE} from "../../../base/elements.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import PB_defined from "../../../base/defined.js";
import plugins from "../../../plugins/plugins.js";
import PB_extend_calculate from "../../../extend/calculate.js";
import state from "../../../base/state.js";
import {_k} from "../../../base/keys.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import datePicker from "../../../plugins/datePicker.js";
import {getStateData} from "../../../bucket/state.js";
import {getTagData} from "../../../bucket/tags.js";
import Deploying from "../../../base/deploying.js";
// Shared variables
let PageData;
let tableEle, formEle;
let editedElement;
let redData;
let editForm;
let editData = [];
let tableData;// Private functions
const pageOpen = (data) => {
  // process.

  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_menu_render(data);
    _return &&= _process_date_update(data);
    return _return
      ? Promise.resolve(true)
      : Promise.reject('open page process failed.');
  }

  const _process_save_page_state = (data) => {
    PageData = data[_k.page_common_info];
    return true;
  }
  const _process_menu_render = (data) => {
    // calling render to place data into menu.
    return $R_menu_obj.$_left(data.menu, rdR.menu.type.value);
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
  toastr.info('bank clicked', 'pageBack - Banking');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Banking');
  return Promise.resolve(true);
}

/**
 * this will be used into forms
 * preloaded data that will not change for this page
 */
const cardsTarget = function (element, event) {

  const _search = (params) => {
    formEle = element.querySelector('form');
    // render table.
    tableEle = element.querySelector('table');
    if (!tableEle) {
      return Promise.reject('Table not found.');
    }

    /*
     // todo
     [] reset on load post-call.
     */
    if (tableEle.getAttribute(atr.load.state) === '1') {
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
        return PB_defined.$_append_table_zero(formEle);
      }
      // render the response data (if required)
      extend.foreign.$_combine(
        {
          ...data,
          ...getStateData([keys.stateData.dates, keys.stateData.ledgers]),
          ...getTagData([keys.tagData.voucher_types, keys.tagData.txn_types])
        },
        [
          [_k.transactions, keys.stateData.dates, _k.id.date, 0],
          [_k.transactions, keys.tagData.voucher_types, _k.type.vou, 1],
          [_k.transactions, keys.tagData.txn_types, _k.type.txn, 0],
          [_k.transactions, keys.stateData.ledgers, _k.lid.dr, 1],
          [_k.transactions, keys.stateData.ledgers, _k.lid.cr, 1],
          [_k.transactions, keys.stateData.ledgers, _k.lid.dr_alias, 2],
          [_k.transactions, keys.stateData.ledgers, _k.lid.cr_alias, 2]
        ]);


      PB_defined.$_append_table_simple(tableEle, data.transactions, pb.opr.transactions.banking.t.transactions)

      return true;
    }
    const _process_filter_form_placement = (data) => {

      // form render
      $R_form_obj.$form(data[_k.filters], formEle);

      // data placement.
      extend.placement.$_form(data[_k.parameters], formEle);
      return true;
    }

    return call_AJAX_GET(params, _process, false);
  }
  const _delete = (params) => {
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
  }
  const _view = (params) => {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_view_voucher(data.data);
      _return &&= _process_insert_id_in_buttons(data.data);
      return _return;
    }
    const _process_view_voucher = (data) => {
      const elementKey = `${event.value}-${event.type}`;
      const targetID = elementKey + '-voucher';

      // place update values into target HTML element.
      PB_defined.$_update_target(element, data[_k.info.voucher]);

      // get the template body
      const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
      console.log(template)
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
  const _edit = (params) => {

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

  switch (event.value) {

    case eValues.card.buttons.delete:
      params = {
        act : event.value,
        type: event.type,
        id  : event.data,
      };
      return _delete(params);

    case eValues.card.buttons.edit:
      params = {
        act : event.value,
        type: event.type,
        id  : event.data,
      };
      return _edit(params);

    case eValues.card.buttons.view:
      params = {
        act : event.value,
        type: event.type,
        id  : event.data,
      };
      return _view(params);

    case eValues.card.buttons.search:
      params = {
        act : event.value,
        type: event.type,
      };
      return _search(params);

    default:
      alert('No action found for this button');
  }
}

/**
 * internal action and operation
 * @param element
 * @param event
 * @returns {Promise<never>|Promise<Awaited<boolean>>}
 * @status done.
 * @author lokesh
 */
const altersTarget = function (element, event) {
  const _alter_transfer_unsettled = () => {
    const trigger = get_action();
    // transfer the amount from unsettled to be settled.
    const targetInput = trigger.closest('tr').querySelector(`input[${atr.core.catch}="unsettled"]`);
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

    PB_extend_calculate.$_table_direct(element, 'total_for_clearance', 'unsettled');

    return Promise.resolve(true);
  }

  const _calculate_total_for_settle = () => {
    PB_extend_calculate.$_table_direct(element, 'total_for_clearance', "unsettled");
    return Promise.resolve(true);
  }


  switch (event.value) {
    case 'move':
      return _alter_transfer_unsettled();

    case 'add':
      return _calculate_total_for_settle();
  }

  return Promise.reject('No action found for this button');
}

const modalsTarget = function (element, event) {
  const modalTargetBody = _buttonLE.modals.querySelector('#' + event.value + '-' + event.type);

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

      const targetModal = _buttonLE.modals.querySelector('#transaction-modal');
      const modalTitle = targetModal.querySelector('.modal-title');
      modalTitle.querySelector('h3').textContent = data.modal.title;
      modalTitle.querySelector('span').textContent = data.modal.date_range;

      return true;
    }
    const _process_append_into_table = (data) => {
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

/**
 * manage the form related post actions
 * @param element
 * @param event
 * @returns {Promise|Promise<*>}
 */
const actionsTarget = function (element, event) {
  console.log("action target ")
  console.log(event)
  /**
   * save the form data
   * @returns {Promise | Promise<unknown>}
   * @status done.
   */
  const action_save = () => {
    console.log("action save pe gaya ")
    formEle = element.querySelector(`form`);

    const __form_collect = () => {
      const form_collect_repeater = () => {
        return extend.collect.$_form_repeater(formEle);
      }
      const form_collect_table = () => {
        return extend.collect.$_form_table(formEle);
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
  const action_update = () => {
    console.log("action update")
    console.log(event);

    const targetKey = `${event.place}-${event.data}`;
    const targetEle = element.querySelector(`#${targetKey}`);
    const formEle = targetEle.querySelector(`form`);
    let result = false;


    const _process = (data) => {
      let _return = true;
      _return &&= _process_save_return(data.data);
      _return &&= _process_form_empty(data.data);
      return _return;
    }

    const _process_save_return = (data) => {
      result = PB_defined.$_form_submit_response(data[_k.ev.update]);
      return true;
    }

    const _process_form_empty = (data) => {
      if (result) {
        // empty the form.
        extend.reset.$_simple_form(formEle);
        extend.reset.$_repeater_form(formEle.id, formEle.getAttribute(atr.form.sno));

        // redirect to the search page.
        // todo: redirect to the search page.
      }
      else {
        // user can do changes as per the error.
      }
      return true;
    }

    const ___success = () => {
      // get the form and collect the data.

      const formData = extend.collect.$_form_repeater(formEle);

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
    return PB_defined.$_form_validation(___success, __reject, param);

  }
  /**
   * reset the form.
   * @returns {Promise<Awaited<boolean>> | Promise<never>}
   * @status done.
   */
  const action_reset = () => {
    console.log("action reset pe gaya ")
    const __form_reset_repeater = () => {
      formEle = element.querySelector('form');
      console.log(formEle.id, formEle.getAttribute(atr.form.sno))
      extend.reset.$_repeater_form(formEle.id, formEle.getAttribute(atr.form.sno));
      return true;
    }
    const __form_reset_table = () => {
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

    const _process = () => {
      let _return = false;
      _return &&= _process_form_reset();
      return _return;
    }
    const _process_form_reset = () => {

      switch (event.data) {
        case pb.opr.transactions.banking.p.deposit:
          return __form_reset_repeater();
        case pb.opr.transactions.banking.p.withdrawal:
          return __form_reset_repeater();
        case pb.opr.transactions.banking.p.transfer:
          return __form_reset_repeater();
        case pb.opr.transactions.banking.p.clearance:
          return __form_reset_table();
      }
    }
    // final return.
    return _process() ? Promise.resolve(true) : Promise.reject('Form reset failed.');
  }
  const action_restore = () => {
    console.log("action.restore pe gaya")
    const _process = (data) => {
      return _process_form_reset(data);
    }
    const _process_form_reset = (data) => {


      formEle = element.querySelector('form');

      plg_formRepeater.$_set(
        editForm.id,
        editForm.getAttribute(atr.form.sno),
        editData
      );


      return true;
    }


    return _process();

  }
  const action_delete = () => {
    // collect form data.
    console.log("action.delete pe gya")
    const formEl = element.querySelector('form');
    const formData = extend.collect.$_form_simple(formEl);

    // check delete code is empty or not
    if (formData[_k.i.delete_code] === '') {
      alert('Please enter delete code');
      return Promise.reject('Form validation failed.');
    }

    // vars for the functions.
    let do_redirect = false;

    const _process = (data) => {
      data = data.data;
      let _return = true;
      _return &&= _process_alert_info_about_delete(data);
      _return &&= _process_go_back_and_refresh(data);
      return _return;
    }
    const _process_alert_info_about_delete = (data) => {

      do_redirect = PB_defined.$_form_submit_response(data[_k.ev.delete]);
      return true;
    }
    const _process_go_back_and_refresh = (data) => {
      // remove the target element
      const targetID = element.id + '-preview';
      element.querySelector(`#${targetID}`).innerHTML = '';
      // reset the form
      extend.reset.$_simple_form(element.querySelector('form'));

      // go back and refresh.
      // todo: go back and refresh.
      return true;
    }

    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : event.data
    }, formData, _process);
  }

  const action_edit = () => {
    console.log("action_edit pe gaya")
    const _process = (data) => {
      _process_a(data);
      _process_b(data);
      return true;
    }
    const _process_a = (data) => {

    }
    const _process_b = (data) => {

    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type,
    }, _process, false);
  }
  const action_view = () => {
    return true;
  }
  const action_change = () => {
    // console.log("action_change pe gya ")
    // form submit after getting data.

    const _process = (data) => {
      // console.log(data)
      // console.log(data.data)
      let _return = true;
      _return &&= _process_menu_value_update(data.data);
      _return &&= _process_date_changed_alert(data.data);
      return _return;
    }

    const _process_date_changed_alert = (data) => {
      if (data.status) {
        toastr.success('date changed', `Date [${data.date}] Updated`);
      }
      return true;
    }

    const _process_menu_value_update = (data) => {
      // update menu value.
      return $R_menu_obj.$_left(data[_k.info.menu], rdR.menu.type.value, [], rdR.menu.role.update, rdR.menu.tags.menu);
    }

    // collect form data.
    // console.log(element)
    // console.log(element.querySelector('form'))
    const formData = extend.collect.$_form_simple(element.querySelector('form'));
    // console.log(formData)

    // ajax calling
    return call_AJAX_POST({
      act : event.value,
      type: event.type,
    }, formData, _process, false)

  }


  switch (event.value) {
    case eValues.action.buttons.save:
      return action_save();

    case eValues.action.buttons.update:
      return action_update();

    case eValues.action.buttons.reset:
      return action_reset();

    case eValues.action.buttons.restore:
      return action_restore();

    case eValues.action.buttons.delete:
      return action_delete();

    case eValues.action.buttons.edit:
      return action_edit();

    case eValues.action.buttons.view:
      return action_view();

    case eValues.action.buttons.change:
      return action_change();

    case eValues.action.buttons.amount:
      alert('amount, i got finished.');

    default :
      return eventNotFound(event);
  }
}

const opensTarget = function (element, event) {
  // check the status.
  return PB_defined.$_open_menu(element, event);
}

/**
 * Creates Target is For forms
 * @param element
 * @param event
 * @returns {boolean|*|void}
 * @status done.
 * @author lokesh
 */
const formsTarget = function (element, event) {
  console.log("forms target pe gaya")
  formEle = element.querySelector('form');

  if (formEle.getAttribute(atr.load.form) === '1') {
    return Promise.resolve(true);
  }

  const load_deposit_form = (element, event) => {
    return __form_target_common(element, event);
  }
  const load_withdrawal_form = (element, event) => {
    return __form_target_common(element, event);
  }
  const load_transfer_form = (element, event) => {
    return __form_target_common(element, event);
  }
  const load_clearance_form = (element, event) => {

    const targetID = `${event.type}-${event.value}`;
    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
    formEle.appendChild(template.cloneNode(true));
    if (formEle.getAttribute(atr.load.form) === '1') {
      return true;
    }
    const _process = (data) => {
      return _process_form_render(data.data);
    }
    const _process_form_render = (data) => {
      const sts = $R_form_obj.$global(
        {...PageData, ...data},
        formEle,
        rdR.form.method.advance
      );

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }

    // initiated page blockUIElement until all things load for the page.

    // fetching, rendering and loading values into forms
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    return ajax.callREQUEST({}, urlID, false, _process);
  }

  const __form_target_common = (element, event) => {

    const targetID = `${event.type}-${event.value}`;

    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
    formEle.append(template.cloneNode(true));

    const _process = (data) => {
      return _process_form_render(data.data);
    }
    const _process_form_render = (data) => {

      const sts = $R_form_obj.$global(
        {...data, ...PageData},
        formEle,
        rdR.form.method.repeater
      );

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }

    // initiated page blockUIElement until all things load for the page.
    // todo: add blockUIElement and unblockUIElement

    // fetching, rendering and loading values into forms
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process, false);
  }

  switch (event.value) {
    case pb.opr.transactions.banking.p.deposit:
      return load_deposit_form(element, event);

    case pb.opr.transactions.banking.p.withdrawal:
      return load_withdrawal_form(element, event);

    case pb.opr.transactions.banking.p.transfer:
      return load_transfer_form(element, event);

    case pb.opr.transactions.banking.p.clearance:
      return load_clearance_form(element, event);

    default :
      return __form_target_common(element, event);
  }
}

/**
 * for load button in forms
 * @param element
 * @param event
 * @returns {kws.promise.bool|*}
 * @status working...
 * @auther lokesh
 */
const loadsTarget = function (element, event) {
  console.log("loads target ki file idhar hai ")
  const load_unsettled_clearance = function () {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_key_match(data.data);
      _return &&= _process_table_render(data.data);
      return _return;
    }
    const _process_key_match = (data) => {

      let tableEle = element.querySelector('table');

      if (tableEle.getAttribute(atr.load.table) === '1') return true;

      if (!data[_k.transactions]) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }
      // render the response data (if required)
      extend.foreign.$_combine({
        ...data,
        ...getStateData([keys.stateData.dates, keys.stateData.ledgers]),
        ...getTagData([keys.tagData.voucher_types, keys.tagData.txn_types]),
      }, [
        [_k.transactions, keys.stateData.dates, _k.id.date, 0],
        [_k.transactions, keys.stateData.ledgers, _k.lid.account, 1],
        [_k.transactions, keys.tagData.voucher_types, _k.type.vou, 0],
        [_k.transactions, keys.tagData.txn_types, _k.type.txn, 0]
      ]);
      return true;
    }
    const _process_table_render = (data) => {
      let tableEle = element.querySelector('table');
      // render the table.
      redData = $R_table_obj.$_simple(
        data[_k.transactions],
        pb.opr.transactions.banking.t.clearance,
        data[_k.ids][_k.transactions]
      );

      tableEle.appendChild(redData)


      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);
      tableEle.classList.remove('d-none');

      // for total calculation
      PB_extend_calculate.$_table_direct(element, 'total_for_clearance', 'unsettled');
      // alterTarget(element, event);
      return true;
    }

    //      const formData = new formData();
    let form = element.querySelector('form');

    const targetButton = form
      .querySelector(querySA(atr.core.calling, pb.opr.transactions.banking.c.sub.unsettled));

    const targetKey = targetButton.getAttribute(atr.core.calling);

    const formData = extend.collect.$_collect_formdata(form, targetKey);

    return call_AJAX_POST({
      act : event.value,
      type: event.type,
    }, formData, _process, false);
  }

  const load_search_transactions = function () {

    // get the data from form.
    const formEl = element.querySelector('form');

    const formData = extend.collect.$_form_simple(formEl);

    // no state change, if required, is not passed.
    if (!formData) {
      return Promise.reject('no data found for search');
    }

    const _process = (data) => {
      data = data.data;
      let _return = true;
      console.log(data);
      _return &&= _process_load_table_as_per_new_filter(data);
      _return &&= _process_close_accordion(data);
      return _return;
    }

    const _process_load_table_as_per_new_filter = (data) => {


      const formEle = element.querySelector('table');
      // remove the old table data.
      formEle.removeChild(formEle.querySelector('tbody'));

      // if no data found, then show no data found message.
      if (!data[_k.transactions]) {
        return PB_defined.$_append_table_zero(formEle);
      }
      // render the response data (if required)
      // render the response data (if required)
      extend.foreign.$_combine(
        {
          ...data,
          ...getStateData([keys.stateData.dates, keys.stateData.ledgers]),
          ...getTagData([keys.tagData.voucher_types, keys.tagData.txn_types])
        },
        [
          [_k.transactions, keys.stateData.dates, _k.id.date, 0],
          [_k.transactions, keys.tagData.voucher_types, _k.type.vou, 1],
          [_k.transactions, keys.tagData.txn_types, _k.type.txn, 0],
          [_k.transactions, keys.stateData.ledgers, _k.lid.dr, 1],
          [_k.transactions, keys.stateData.ledgers, _k.lid.cr, 1],
          [_k.transactions, keys.stateData.ledgers, _k.lid.dr_alias, 2],
          [_k.transactions, keys.stateData.ledgers, _k.lid.cr_alias, 2]
        ]);

      PB_defined.$_append_table_simple(tableEle, data.transactions, pb.opr.transactions.banking.t.transactions)
      return true;
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
      return load_search_transactions();

    case eValues.load.buttons.clearance:
      return load_unsettled_clearance();

  }

  element.querySelector('[data-pb-control="delete-entry"]').children.forEach((child) => {
    const key = child.getAttribute(atr.core.key);
    child.innerHTML = extend.append.$_single_on_innerHTML(child, data[key]);
    $R_common_obj.$_call(child);
  });

}


/**
 * for load overview of the tables.
 * @param element
 * @param button
 * @returns {Promise<Awaited<boolean>>}
 */
function tablesTarget(element, button) {
  return Promise.resolve(true);
}

const get = function (event) {
  console.log("get file idhar hai")
  console.log(event)

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
      // console.log("switch call hua")
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

    default:
      return Promise.reject('Invalid Event Type');
  }
}


// Public methods
export const OTB_Requests = (data, type) => {
  console.log(data, type);

  console.log(type);
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

