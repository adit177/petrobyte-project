import {get_action, get_callEl, get_LN} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {deF, exT, keys, kws, rdR} from "../../../base/const.js";
import {$R_common_obj, $R_form_obj, $R_menu_obj, $R_table_obj} from "../../../base/render.js";
import {eTypes, eValues} from "../../../base/events.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import plg_formValid from "../../../plugins/formValid.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import extend from "../../../extend/extend.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import PB_defined from "../../../base/defined.js";
import {_k} from "../../../base/keys.js";
import {_buttonLE} from "../../../base/elements.js";
import datePicker from "../../../plugins/datePicker.js";
import state from "../../../base/state.js";
import {getStateData} from "../../../bucket/state.js";
import {getTagData} from "../../../bucket/tags.js";

// Shared variables
const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4140',
};
let StateData = {}
let tableEle, formEle, success, filterEle;
let tableObject = [];
let redData;
// Private functions

/**
 * this will be used for show page's base-0 data.
 */

const pageOpen = (data) => {
  console.log(data)
  const _process = (data) => {
    data = data.data
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_menu_render(data);
    _return &&= _process_date_update(data);
    return _return
      ? Promise.resolve(true)
      : Promise.reject('open page process failed.');
  }
  const _process_save_page_state = (data) => {
    console.log("state data", data)
    //    PageData = data[_k.page_common_info];
    StateData.form = data[_k.pageState];
    return true;
  }
  //  const _process = (data) => {
  //    console.log(data.data)
  //    _process_a(data);
  //    _process_b(data);
  //    return true;
  //  }
  //  const _process_a = (data) => {
  //    StateData.form = data['pageState'];

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
  const _process_menu_render = (data) => {
    // calling render to place data into menu.
    return $R_menu_obj.$_left(data.menu, rdR.menu.type.value);
  }
  //  const _process_b = (data) => {
  //    // calling render to place data into menu.
  //    console.log(data);
  //    $R_menu_obj.$_left(data.menu, 'value');
  //  }

  return _process(data);
}

/**
 * this will be used into forms
 * preloaded data that will not change for this page
 */
const cardsTarget = function (element, event) {
  console.log(element, event);
  const _process = (data) => {
    data = data.data
    switch (event.value) {
      case eValues.card.buttons.search:
        console.log(data);
        return _process_search(data);
      case eValues.card.buttons.modal:
        return _process_modal(data);

      case eValues.card.buttons.delete:
        return _process_delete(data);

      case eValues.card.buttons.edit:
        return _process_edit(data);

      case eValues.card.buttons.view:
        return _process_view(data);


      default:
        alert('No action found for this button');
    }
  }
  const _search = (data) => {
    //    const formEle = get_callEl().querySelector('form');
    //
    //    // render form.
    //    $R_form_obj.$form(data.filters, formEle);
    //
    //    // render table.
    //    console.log(element)
    //    tableEle = element.querySelector('table');
    //    console.log(tableEle);
    //    if (!tableEle) {
    //      return false;
    //    }
    //
    //    if (tableEle.getAttribute(atr.load.table) === '1') {
    //      return true;
    //    }
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
      if (!data.transfer) {
        return PB_defined.$_append_table_zero(formEle);
      }
      // render the response data (if required)
      //      extend.foreign.$_combine(
      //        {
      //          ...data,
      //          ...getStateData([keys.stateData.dates, keys.stateData.ledgers]),
      //          ...getTagData([keys.tagData.voucher_types, keys.tagData.txn_types])
      //        },
      //        [
      //          [_k.transactions, keys.stateData.dates, _k.id.date, 0],
      //          [_k.transactions, keys.tagData.voucher_types, _k.type.vou, 1],
      //          [_k.transactions, keys.tagData.txn_types, _k.type.txn, 0],
      //          [_k.transactions, keys.stateData.ledgers, _k.lid.dr, 1],
      //          [_k.transactions, keys.stateData.ledgers, _k.lid.cr, 1],
      //          [_k.transactions, keys.stateData.ledgers, _k.lid.dr_alias, 2],
      //          [_k.transactions, keys.stateData.ledgers, _k.lid.cr_alias, 2]
      //        ]);
      extend.foreign.$_remote(
        exT.foreign.combine, data,
        [
          [_k.transfer, keys.stateData.dates, 1, 0],
          [_k.transfer, 'type', 5, 0],
          [_k.transfer, 'type', 6, 0]
        ]);
      //todo: find problem in appending table please also let me know the problem
      PB_defined.$_append_table_simple(tableEle, data.transfer, pb.opr.stocks.transfer.n)

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
    // if no data found, then show no data found message.
    //    if (!data.transfer) {
    //      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
    //      tableEle.appendChild(redData);
    //      return true;
    //    }
    //    console.log(data);
    //    // render the response data (if required)
    //    extend.foreign.$_remote(
    //      exT.foreign.combine, data,
    //      [
    //        ['transfer', 'dates', 1, 0],
    //        ['transfer', 'type', 5, 0],
    //        ['transfer', 'type', 6, 0]
    //      ]);
    //
    //    // render the table.
    //    redData = $R_table_obj.$_simple(data.transfer, pb.opr.stocks.transfer.n);
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
  }
  const _process_modal = (data) => {
    let modal = new bootstrap.Modal(element);
    modal.show();

    return true;
  }
  const _process_delete = (data) => {
    var table = _buttonLE.cards.getElementById("table1"); //similar to document.getElementById("table1")
    const key = table.getAttribute("data-pb-key");
    console.log(key);
    for (var i = 0, row; row = table.rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        console.log(col);
        console.log(data[table1]);
        col.innerHTML = extend.append.$_single_on_innerHTML(col, data[key]);
        $R_common_obj.$_call(col);
      }
    }

    return true;


    // have a look.
    //      const asd = a.getAttribute(atr.core.key);
    //      console.log(a);
    //      element.querySelector('[data-pb-control="delete-entry"]').children.forEach((child) => {
    //        console.log(child);
    //        const key = child.getAttribute(atr.core.key);
    //        child.innerHTML = extend.append.$_single(child.innerHTML, data[key]);
    //        PB_render_common.$_call(child);
    //      });
  }
  const _process_view = (data) => {
    return true;
  }
  const _process_edit = (data) => {
    return true;
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

  // send POST ajax
  //  const ajax = new AjaxPB();
  //  console.log(params);
  //  const urlID = ajax.buildingURL([], params, 'local', 0);
  //  ajax.callREQUEST({}, urlID, false, _process);
  //  return ajax;
}

const changeTarget = function (element, event) {
  console.log(element, event);

  const warehouse = () => {
    const input = element.querySelector(querySA(atr.core.catch, "items"));
    console.log(input)
    const _process = (data) => {
      data = data.data;
      StateData.itemsWithUnits = data;
      const sts = $R_form_obj.$global(
        data,
        input,
        rdR.form.method.single
      );

      exe_plugins_on_manualCall(element.querySelector('form'), [], kws.plugins_on_call.formRepeater);
      if (!sts) return false;


    }
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type,
    //      data: event.data
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //    return ajax;
    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      data: event.data
    }, _process)

  }

  const storage = () => {
    const input = element.querySelector(querySA(atr.core.catch, "items"));
    console.log(input)
    const _process = (data) => {
      data = data.data;
      StateData.assignedStocks = data;
      const sts = $R_form_obj.$global(
        data,
        input,
        rdR.form.method.single
      );

      exe_plugins_on_manualCall(element.querySelector('form'), [], kws.plugins_on_call.formRepeater);
      if (!sts) return false;
    }
    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      data: event.data
    }, _process)

  }
  const items = () => {
    console.log(element, event);
    const input = get_action().closest('div > .fv-row').querySelector(querySA(atr.core.catch, "unit"));
    console.log(input)
    console.log(StateData.itemsWithUnits)
    //    console.log(StateData.itemsWithUnits.units[`${event.data}`])
    const unit = StateData.itemsWithUnits.units[`${event.data}`];
    console.log(unit)
    const sts = $R_form_obj.$global(
      unit,
      input,
      rdR.form.method.single
    )
    if (!sts) return false;
    // update form's core element status.
    formEle.setAttribute(atr.load.form, '1');
    return true;

  }
  const assignitems = () => {
    console.log(element, event);
    const input = get_action().closest('div > .fv-row').querySelector(querySA(atr.core.catch, "unit"));
    console.log(input)
    console.log(StateData.assignedStocks)
    //    console.log(StateData.itemsWithUnits.units[`${event.data}`])
    const unit = StateData.assignedStocks.units[`${event.data}`];
    console.log(unit)
    const sts = $R_form_obj.$global(
      unit,
      input,
      rdR.form.method.single
    )
    if (!sts) return false;
    // update form's core element status.
    formEle.setAttribute(atr.load.form, '1');
    return true;
  }

  switch (event.value) {
    case pb.opr.stocks.transfer.c.warehouse:
      return warehouse();
    case pb.opr.stocks.transfer.c.items:
      return items();
    case pb.opr.stocks.transfer.c.storage:
      return storage();
    case pb.opr.stocks.transfer.c.assignitems:
      return assignitems();
  }
}

const actionsTarget = function (element, event) {

  /*
   -------------------------------
   private functions of actions
   -------------------------------
   */
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
      PB_defined.$_form_submit_response(data[event.value])
      console.log(data);
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
  //
  //
  //    }
  //
  //    const _process_save_return = (data) => {
  //
  //      plg_sweetAlert.$_alert(['Saved', 'Data has been saved successfully.'],
  //        {
  //          confirm: [false, '', 'btn btn-light-primary rounded'],
  //        },
  //        [2, 5, 1500],)
  //      return _process_form_old_data_reset(data);
  //    }
  //    const _process_form_old_data_reset = (data) => {
  //      extend.reset.$_repeater_form(formEle.id, formEle.getAttribute(atr.form.sno))
  //      //todo @lokesh reset for advance form!
  //      return true;
  //    }
  //
  //    const __init_the_process = () => {
  //      return ___ajax_process();
  //    }
  //
  //    const __revert_the_process = () => {
  //      console.log('this is revert');
  //      return true;
  //    }
  //    console.log(formEle);
  //    const formData = extend.collect.$_form_repeater(formEle)
  //    console.log(formData);
  //    // get the form element number.
  //    const fno = formEle.getAttribute(atr.form.sno);
  //    console.log(fno)
  //    plg_formValid.$_callback(fno, __init_the_process, __revert_the_process);
  //
  //    const ___ajax_process = () => {
  //      const ajax = new AjaxPB();
  //      // collect form data.
  //      const formData = extend.collect.$_form_repeater(formEle)
  //      console.log(formData)
  //
  //      const urlID = ajax.buildingURL([], {
  //        act : event.value,
  //        type: event.type
  //      }, 'local', 0);
  //      ajax.callREQUEST({formData}, urlID, true, _process);
  //      return ajax;
  //    }
  //
  //    return true;
  //  }

  const action_reset = (element, event) => {
    const _process = (data) => {
      data = data.data
      return _process_form_reset(data);
    }
    const _process_form_reset = (data) => {
      const method = true;
      if (method) {
        formEle = element.querySelector('form');
        extend.reset.$_simple_form(formEle, kws.attr.pb);
      }
      else {
        formEle = element.querySelector(event.type + '-' + event.value);
        extend.reset.$_simple_form(formEle, kws.attr.pb);
      }
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
      type: event.type
    }, _process)

  }

  const action_delete = (element, event) => {
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

    return call_AJAX_GET({
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
    }
    const _process_a = (data) => {

    }
    const _process_b = (data) => {

    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)
  }


  switch (event.value) {
    case eValues.action.buttons.save:
      return action_save();

    case eValues.action.buttons.reset:
      return action_reset(element, event);

    case eValues.action.buttons.delete:
      return action_delete(element, event);

    case eValues.action.buttons.edit:
      return action_edit(element, event);

    default :
      eventNotFound(event);
      return false;
  }
}


function formsTarget(element, event) {
  console.log(element, event);
  formEle = element.querySelector('form');
  if (formEle.getAttribute(atr.load.form) === '1') {
    return Promise.resolve(true);
  }
  // fetching new values or static values for form initial
  const load_tank_form = (element, event) => {
    return form_target_common(element, event);
  }
  const load_air_form = (element, event) => {
    return form_target_common(element, event);
  }
  const load_location_form = (element, event) => {
    return form_godown_location(element, event);
  }
  const load_stock_assign = (element, event) => {
    return form_assign_stocks(element, event);
  }
  const form_target_common = (element, event) => {
    const targetID = `${event.type}-${event.value}`;

    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
    formEle.append(template.cloneNode(true));
    console.log(formEle)

    const _process = (data) => {
      data = data.data
      console.log(data);
      console.log(StateData);
      return _process_form_render(data);
    }
    const _process_form_render = (data) => {
      const sts = $R_form_obj.$global({...StateData.form, ...data}, formEle, rdR.form.method.advance);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }

    // initiated page blockUIElement until all things load for the page.

    // fetching, rendering and loading values into forms
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process, false);

  }
  const form_godown_location = (element, event) => {
    formEle = element.querySelector('form');
    console.log(formEle)

    if (formEle.getAttribute(atr.load.form) === '1') {
      return true;
    }

    const _process = (data) => {
      data = data.data
      return _process_form(data);
    }
    const _process_form = (data) => {
      let ele = formEle.querySelector(querySA(atr.core.catch, "preload"))
      console.log(ele)
      const sts = $R_form_obj.$global({...StateData.form, ...data}, ele, rdR.form.method.advance);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }

    // initiated page blockUIElement until all things load for the page.

    // fetching, rendering and loading values into forms
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)

  }
  const form_assign_stocks = (element, event) => {
    console.log(element)
    formEle = element.querySelector('form');
    console.log(formEle)

    if (formEle.getAttribute(atr.load.form) === '1') {
      return true;
    }

    const _process = (data) => {
      data = data.data
      console.log(data);
      console.log(StateData);
      return _process_form(data);
    }
    const _process_form = (data) => {
      let ele = formEle.querySelector(querySA(atr.core.catch, "assignStock"))
      console.log(ele)
      const sts = $R_form_obj.$global({...StateData.form, ...data}, ele, rdR.form.method.advance);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }

    // initiated page blockUIElement until all things load for the page.

    //    // fetching, rendering and loading values into forms
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
    }, _process)
  }
  switch (event.value) {
    case pb.opr.stocks.transfer.p.tank:
      return load_tank_form(element, event);

    case pb.opr.stocks.transfer.p.air:
      return load_air_form(element, event);

    case pb.opr.stocks.transfer.p.location:
      return load_location_form(element, event);

    case pb.opr.stocks.transfer.p.stocks:
      return load_stock_assign(element, event);

    default :
      return form_target_common(element, event);
  }
}

// Public methods

//export const OST_forms = function (_event) {
//  return eleCheck() ? formsTarget(get_callEl(), _event) : false;
//};
//// fetching all basic required details
//
//
//export const OST_cards = function (_event) {
//  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
//};
//export const OST_actions = function (_event) {
//  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
//};
//export const OST_change = function (_event) {
//  return eleCheck() ? changeTarget(get_callEl(), _event) : false;
//}
//export const OST_pageOpen = function (data) {
//  console.log(data)
//  return pageOpen(data);
//};

const opensTarget = function (element, event) {
  // check the status.
  return PB_defined.$_open_menu(element, event);
}

function tablesTarget(element, button) {
  return Promise.resolve(true);
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Banking');
  return Promise.resolve(true);
}
const get = function (event) {
  console.log("in get", event)
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
const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Banking');
  return Promise.resolve(true);
}
export const OST_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('OSST_Requests', 'Request Type: ' + type);
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
