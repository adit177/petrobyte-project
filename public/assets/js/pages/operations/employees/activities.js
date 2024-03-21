// Shared variables
import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {deF, exT, keys, kws, rdR} from "../../../base/const.js";
import {eTypes, eValues} from "../../../base/events.js";
import PB_defined from "../../../base/defined.js";
import {$R_common_obj, $R_form_obj, $R_menu_obj, $R_table_obj} from "../../../base/render.js";
import {_buttonLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import plg_dataTables from "../../../plugins/dataTables.js";
import plg_datePicker from "../../../plugins/datePicker.js";
import PB_option_datatables from "../../../options/datatables.js";
import extend from "../../../extend/extend.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import datePicker from "../../../plugins/datePicker.js";
import {getStateData} from "../../../bucket/state.js";
import {getTagData} from "../../../bucket/tags.js";
import {_k} from "../../../base/keys.js";


let redData;
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
    data = data.data;
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_menu_render(data);
    _return &&= _process_date_update(data);
    return _return;
  }
  const _process_save_page_state = (data) => {
    StateData = data['page_common_info'];
    return true;
  }
  const _process_menu_render = (data) => {
    // calling render to place data into menu.
    return $R_menu_obj.$_left(data.menu, rdR.menu.type.value);
  }

  //  const _process_date_update = (data) => {
  //
  //    // get form element.
  //    const formEle = _buttonLE.menu.querySelector('form');
  //
  //    // calling render to place data into menu inputs.
  //    extend.placement.$_form(data.session, formEle);
  //
  //    return true;
  //  }
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

  return _process(data);
}

function opensTarget(element, event) {
  // check the status.
  return PB_defined.$_open_menu(element, event);
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
  const _process = (data) => {

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
    console.log(data);
    console.log(get_callEl());
    // get the modal element.
    const modal = get_callEl().getElementsByClassName('modal-title')[0];
    // update the modal title.
    console.log(modal)
    modal.innerHTML = data.modal.title;

    const event_string = event.value + '-' + event.data;
    console.log(event_string);

    // find the target body element.
    const body = get_callEl().querySelector('#' + event_string);

    // append the table.

    console.log(body);


    return true;
  }
  const _process_delete = (data) => {
    console.log(data);
  }
  const _process_search = (data) => {
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
      if (!data.activities) {
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
      console.log("card search data", data)
      //      todo: data is not coming in keys format so we have to change it first
      extend.foreign.$_remote(
        exT.foreign.combine, data,
        [
          [_k.activities, keys.stateData.dates, 1, 0],
          [_k.activities, 'employee', 2, 0],
          [_k.activities, 'type', 3, 0]
        ]);


      PB_defined.$_append_table_simple(tableEle, data.activities, pb.opr.employees.activities.n)

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
    //    const formEle = get_callEl().querySelector('form');
    //    console.log(formEle);
    //
    //    // render form.
    //    $R_form_obj.$form(data.filters, formEle);
    //
    //    // render table.
    //    console.log(element)
    //    tableEle = element.querySelector('table');
    //
    //    if (!tableEle) {
    //      return false;
    //    }
    //
    //    if (tableEle.getAttribute(atr.load.table) === '1') {
    //      return true;
    //    }
    //
    //    // if no data found, then show no data found message.
    //    if (!data.activities) {
    //
    //      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
    //      tableEle.appendChild(redData);
    //      return true;
    //    }
    //    // render the response data (if required)
    //    extend.foreign.$_remote(
    //      exT.foreign.combine, data,
    //      [
    //        ['activities', 'dates', 1, 0],
    //        ['activities', 'employee', 2, 0],
    //        ['activities', 'type', 3, 0]
    //      ]);
    //
    //    // render the table.
    //    redData = $R_table_obj.$_simple(data.activities, pb.opr.employees.activities.n);
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
  const _card_modal = (element, event) => {

    const _process = (data) => {
      _process_a(data);
    }
    const _process_a = (data) => {
      let modal = new bootstrap.Modal(element);
      modal.show();
    }

    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: 'modal'
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    return call_AJAX_GET({
      act : event.value,
      type: 'modal'
    }, _process)

    // calling ajax with passing type.
    //      xResponse = dummy_ajax_employees_opr.activities([pb.opr.employees.activities.n, pb.opr.employees.activities.p.deposit, pb.opr.employees.activities.p.withdrawal, pb.opr.employees.activities.p.transfer, pb.opr.employees.activities.p.clearance]);

    // async await sleep(3000);
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
      return _process_search(params);

    default:
      alert('No action found for this button');
  }
  //  let params;
  //  // apply switch for params
  //  switch (event.value) {
  //    case eValues.card.buttons.modal:
  //      params = {
  //        act  : event.value,
  //        type : event.type,
  //        about: event.data,
  //      };
  //      break;
  //
  //    case eValues.card.buttons.delete:
  //    case eValues.card.buttons.edit:
  //    case eValues.card.buttons.view:
  //      params = {
  //        act   : event.value,
  //        type  : event.type,
  //        vou_no: event.data,
  //      };
  //      break;
  //
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

  //    return true;
}

const actionsTarget = function (element, event) {

  // event print
  console.log(event);

  /*
   -------------------------------
   private functions of actions
   -------------------------------
   */
  //    const action_save = (element, event) => {
  //
  //
  //      const _process = (data) => {
  //        console.log(data);
  //        toastr.success('Data saved successfully', 'Success');
  //        extend.reset.$_form(formEle, kws.attr.pb)
  //        //        toastr.error('Kindly fill all required steps', 'Incomplete Form');
  //      }
  //
  //
  //      //collect form data from the element
  //      const formData = extend.collect.$_form(formEle);
  //      console.log(formData);
  //
  //      //ajax call to save the data
  //      const ajax = new AjaxPB();
  //      const urlID = ajax.buildingURL([thePathArr], {
  //        act : event.value,
  //        type: event.type
  //      }, 'local', 0);
  //      ajax.callREQUEST({formData}, urlID, true, _process);
  //      return true;
  //      //      sleep(100).then(() => {
  //      //        formEle = element.querySelector('#' + event.place + '-' + event.data);
  //      //        const f_sno = formEle.getAttribute(atr.form.sno);
  //      //        if (!plg_formValid.$_get(f_sno)) {
  //      //          toastr.error('Kindly fill all required steps', 'Incomplete Form');
  //      //          return false;
  //      //        }
  //      //
  //      //        // collect form data.
  //      //        const formData = extend.collect.$_form(formEle);
  //      //
  //      //        // send POST ajax
  //      //        const ajax = new AjaxPB();
  //      //        const urlID = ajax.buildingURL([thePathArr], {
  //      //          act : event.value,
  //      //          type: event.type
  //      //        });
  //      //        ajax.callREQUEST({formData}, urlID, true, _process);
  //      //        const responseX = ajax.getRESPONSE();
  //      //        console.log(responseX);
  //
  //      // take status true from dummy
  //
  //      // get response from server.
  //
  //      //        swal.fire('Form has submitted');
  //      //
  //      //        // reset the form after submission of transaction to database.
  //      //        extend.reset.$_form(formEle, kws.attr.pb);
  //      //
  //      //        return true;
  //      //      })
  //    }
  const action_save = (element, event) => {

    console.log("action save hit");
    /**
     * this data save into variables.
     * it will be called when create form initiated.
     * @param data
     * @private
     */
    let formEle = element.querySelector('form')
    const _process = (data) => {
      let _return = true;
      _return &&= _process_save_return(data);
      _return &&= _process_form_old_data_reset(data);
      return _return;
    }
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

    const _process_save_return = (data) => {
      console.log(event, data)
      PB_defined.$_form_submit_response(data[event.value])
      //      plg_sweetAlert.$_alert(['Saved', 'Data has been saved successfully.'],
      //        {
      //          confirm: [false, '', 'btn btn-light-primary rounded'],
      //        },
      //        [2, 5, 1500],)
      return true;
    }

    const _process_form_old_data_reset = (data) => {
      extend.reset.$_simple_form(formEle, kws.attr.pb);
      //        plg_formRepeater.$_set(editForm.id, editForm.getAttribute(atr.form.sno), [{}]);
      return true;
    }

    const ___success = () => {
      // collect form data.

      const formData = __form_collect();

      return call_AJAX_POST({
        act : event.value,
        type: event.type,
        data: event.data
      }, formData, _process)
    }

    const __reject = () => {
      return false;
    }
    const param = {
      form_sno: formEle.getAttribute(atr.form.sno),
      method  : deF.form_promise.method.inbuild,
    };
    return PB_defined.$_form_validation(___success, __reject, param, deF.methods.promise.form);
  }
  //  const action_reset = (element, event) => {
  //    const method = true;
  //    if (method) {
  //      formEle = element.querySelector('form');
  //      extend.reset.$_simple_form(formEle, kws.attr.pb);
  //    }
  //    else {
  //      formEle = element.querySelector('form-' + event.value);
  //      extend.reset.$_simple_form(formEle, kws.attr.pb);
  //    }
  //    return true;
  //  }
  const action_delete = (element, event) => {
    const something_on_cancel = () => {
      console.log('something on cancel');
    }

    const swal_cb_on_confirm = () => {
      const __process = (data) => {
        _action.closest('tr').remove();
        toastr.success('Record has been deleted', 'Success');
        return true;
      }

      return call_AJAX_GET({
        act : event.value,
        type: event.type
      }, __process)

    }
    console.log('delete action hit');
    console.log(event, element);
    plg_sweetAlert.$_confirm(['Are You Sure'],
      {
        confirm: [true, 'Sure', 'btn btn-primary rounded'],
        cancel : [true, 'Cancel', 'btn btn-secondary rounded'],
      },
      [5, 5],
      {
        confirm: swal_cb_on_confirm,
        cancel : something_on_cancel,
      }
    )
    return true;
  }
  const action_reset = () => {

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
  console.log(element);
  console.log(event.value)
  switch (event.value) {

    case eValues.action.buttons.save:
      return action_save(element, event);

    case  eValues.action.buttons.reset:
      return action_reset(element, event);
    case eValues.action.buttons.delete:
      console.log(event.value)
      return action_delete(element, event);
  }


  console.log('actions event hit');

  return true;
}

function formsTarget(element, event) {

  // fetching new values or static values for form initial
  const load_absent_form = (element, event) => {
    return form_target_common(element, event);
  }
  const load_overtime_form = (element, event) => {
    return form_target_common(element, event);
  }
  const load_expense_form = (element, event) => {
    return form_target_common(element, event);
  }

  const form_target_common = (element, event) => {

    formEle = element.querySelector('form');

    if (formEle.getAttribute(atr.load.form) === '1') {
      return Promise.resolve(true);
    }

    const _process = (data) => {
      data = data.data;
      return _process_a(data);
    }
    const _process_a = (data) => {

      const sts = $R_form_obj.$global({...StateData, ...data}, formEle, rdR.form.method.repeater);

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
  switch (event.value) {
    case pb.opr.employees.activities.p.absent:
      return load_absent_form(element, event);

    case pb.opr.employees.activities.p.overtime:
      return load_overtime_form(element, event);

    case pb.opr.employees.activities.p.expense:
      return load_expense_form(element, event);

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
  const load_search_txns = function (element, event) {

    //    let formData;
    // get the data from form.
    //    const formEl = element.querySelector('form');
    //
    //    formData = extend.collect.$_step(formEl);
    //    console.log(formData)
    //
    //    // no state change, if required, is not passed.
    //    if (!formData) {
    //      return false;
    //    }

    const formEl = element.querySelector('form');

    const formData = extend.collect.$_form_simple(formEl);

    // no state change, if required, is not passed.
    if (!formData) {
      return Promise.reject('no data found for search');
    }

    const _process = (data) => {
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
      if (!data.activities) {
        return PB_defined.$_append_table_zero(formEle);
      }
      // render the response data (if required)
      extend.foreign.$_remote(
        exT.foreign.combine, data,
        [
          [_k.activities, keys.stateData.dates, 1, 0],
          [_k.activities, 'employee', 2, 0],
          [_k.activities, 'type', 3, 0]
        ]);

      // render the table.
      PB_defined.$_append_table_simple(tableEle, data.activities, pb.opr.employees.activities.n)
      return true;
      //      redData = $R_table_obj.$_simple(data.activities, pb.opr.employees.activities.n);
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
  switch (event.value) {

    case eValues.card.buttons.search:
      return load_search_txns(element, event);

    case 'function_b':
      return function_b(element, event);

  }
  const getLoad = function (form, button, values) {

    var fetchEntries;
    const _process = (data) => {
      return _process_a(data);
    }
    const _process_a = (data) => {
      button.querySelector('[data-pb-label="text"]').innerText = 'Loading...';

      // todo: a table

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
    //      act    : button.value,
    //      type   : button.name,
    //      account: values
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //    return ajax;

    return call_AJAX_GET({
      act : button.value,
      type: button.name,
    }, _process)

    //      xResponse = dummy_ajax_employees_opr.activities([button.value, button.getAttribute('name')], values)

    // render into table.

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

function tablesTarget(element, button) {
  const getTable = (button, params, htLen) => {

    var renderedData
    let profile, methods, options;
    const _process = (data) => {
      return _process_a(data);
    }
    const _process_a = (data) => {
      if (data !== false) {
        const OPTION = [4, ['view', 'edit', 'delete'], ['view-activities', 'edit-activities', 'delete-activities']];
        // todo: a new table
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

    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act    : button.value,
    //      type   : button.name,
    //      account: params
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //    return ajax;
    return call_AJAX_GET({
      act : button.value,
      type: button.name
    }, _process)

    //      xResponse = dummy_ajax_employees_opr.activities([button.value, button.getAttribute('name')], params)


  }
  // fetching new values from server and updating into table
  tableEle = element.querySelector('table');
  filterEle = element.querySelector('[data-pb-target="filter"]');

  if (!tableEle) {
    console.log('add table element');
    return;
  }
  if (tableEle.getAttribute('data-load-table') !== 'true') {

    var newValforTable = getTable(button, [], tableEle.querySelectorAll('thead>tr>th').length);

    // appending fetched values
    tableEle.appendChild(newValforTable.redData);
    // update table status
    tableEle.setAttribute('data-load-table', 'true');
    // todo: if new entry created then add 'false'

    // dataTables Plugin Calling.
    dataTableCalling(newValforTable.options, newValforTable.methods, newValforTable.profile, button.value);
    filterEvents(filterEle, button.value);


    // calling other basic plugin functions
    $R_common_obj.$_call(tableEle);

    // for enable dropdown in the table.
    KTMenu.init();
  }
}

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

  // console.log(optionsObj);

  // Init datatable --- more info on datatables: https://datatables.net/manual/
  tableObject[call] = plg_dataTables.$_manual(tableEle, optionsObj, 'new');

  // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
  /*
   tableObject[_RG_SAMP_A].on('draw', function () {
   console.log('i am call at the time of re-inti.')
   });
   */
}

const filterEvents = (element, btnValue) => {
  element.querySelectorAll('select, input').forEach((value, key, parent) => {

    //let col = value.getAttribute('data-dt-column');
    
  })
}

// Public methods

// fetching all basic required details


const get = function (event) {
  switch (event.type) {
    case eTypes.form:
      return eleCheck() ? formsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    // useMe
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
      return eleCheck() ? alterTarget(get_callEl(), event) : false;
    case eTypes.modal:
      return eleCheck() ? modalsTarget(get_callEl(), event) : Promise.reject('Call Element not found.');
    default:
      return Promise.reject('Invalid Event Type');
  }
}


// Public methods

export const OEA_Requests = (data, type) => {
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
