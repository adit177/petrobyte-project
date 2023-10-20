import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, keys, rdR} from "../../../base/const.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js"
import {$R_common_obj, $R_form_obj, $R_menu_obj} from "../../../base/render.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import {atr} from "../../../base/attributes.js";
import plg_formKeen from "../../../plugins/formKeen.js";
import extend from "../../../extend/extend.js";
import {eTypes} from "../../../base/events.js";
// Shared variables
let StateData;
var ajaxResponse;
let tableEl, formEl, success;
let myPath;


// Private functions


const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */

  const _process = (data) => {
    data = data.data;
    let _return = true;
    _return &&= _process_a(data);
    _return &&= _process_b(data);
    return _return;
  }

  const _process_a = (data) => {
    console.log(data);
    StateData = data['page_common_info'];
    return true;
  }

  const _process_b = (data) => {
    extend.foreign.$_remote(exT.foreign.individual, [data.menu_info.body, data.page_common_info.categories], [['name', 'name']]);

    // calling render to place data
    $R_menu_obj.$_left(
      data['menu_info'],
      rdR.menu.type.stack,
      {
        'type': rdR.common.params.num.number
      }
    );

    return true;
  }


  // other things, not connected to dynamic data.


  return _process(data);
}
const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Contacts');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Contacts');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}


const _getTable = (event, params, htLen) => {

  var renderedData

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : event.value,
    line   : event.name,
    account: params
  });
  ajax.callREQUEST({}, urlID, false);


  ajaxResponse = add_ajaxCalling([event.value, event.getAttribute('name')], params)

  if (ajaxResponse !== false) {
    const OPTION = [4, ['view', 'edit', 'delete'], ['view-add', 'edit-add', 'delete-add']];
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
    }
    // render the received data from server.
    renderedData = PB_render_table.$_simple(ajaxResponse, tableProfile);
  }
  else {
    console.log('status has failed, table data :' + JSON.stringify(ajaxResponse));
    renderedData = PB_render_table.$_zero(htLen);
  }

  return renderedData;
}

const _getLoad = function (form, event, values) {

  var fetchEntries;

  // button.getAttribute('data-pb-calling');
  event.querySelector('[data-pb-label="text"]').innerText = 'Loading...';

  ajaxResponse = add_ajaxCalling([event.value, event.getAttribute('name')], values)

  // render into table.
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

  fetchEntries = PB_render_table.$_simple(ajaxResponse, $R_table_obj.tableShapes);

  event.querySelector('[data-pb-label="text"]').innerText = 'Loaded.';
  if (fetchEntries === false) {
    return false;
  }


  tableEl = form.querySelector('[data-pb-table="' + event.getAttribute('data-pb-calling') + '"]');
  tableEl.classList.remove('d-none');
  tableEl.appendChild(fetchEntries);

  // calling custom
  $R_common_obj.$_call(tableEl);
  plg_formKeen.$_manual(tableEl, [3])
  return true;
}


function formsTarget(element, event) {
  const form_add = function (element, event) {
    // fetching new values or static values for form initial
    formEl = element.querySelector('form');

    const _process = (data) => {
      data = data.data
      return _process_form(data);
    }

    const _process_form = (data) => {
      console.log(data, formEl)
      $R_form_obj.$form(data, formEl);
      return true;
      //      if (formEl.getAttribute('data-load-form') !== 'true') {
      //
      //        //add page blockUIElement until all things load for the page.
      //        //Plug_formKeen.loadIndeed(element, [plg.keen.method.block], ['Loading Functions', 'primary']);
      //
      //        //fetching, rendering and loading values into forms
      //        //        ajaxResponse = add_ajaxCalling([button.value, button.getAttribute('name')], [])
      //        //        const ajaxResponseNew = {...StateData, ...ajaxResponse};
      //        //
      //        //        const sts = PB__OPR_transactions.getFormReady(ajaxResponseNew, formEl);
      //        //
      //        //        if (!sts) return false;
      //
      //        //        element.setAttribute('data-sts-loaded', 'true');
      //        // Plug_formKeen.loadIndeed(element, [plg.keen.method.block],) // or pass params as ['', '', '', false]
      //        //        formEl.setAttribute('data-load-form', 'true');
      //      }
    }


    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }

  const form_bulk = function (element, event) {
    // fetching new values or static values for form initial
    formEl = element.querySelector('form');

    if (formEl.getAttribute(atr.load.form) === '1') {
      return true;
    }

    const _process = (data) => {
      data = data.data
      return _process_form(data);

    }

    const _process_form = (data) => {
      $R_form_obj.$global(data, formEl, rdR.form.method.repeater);
      return true;
    }


    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);


  }

  const form_upload = function (element, event) {
    // fetching new values or static values for form initial
    formEl = element.querySelector('form');

    const _process = (data) => {
      return _process_form(data);
    }

    const _process_form = (data) => {
      return true;
      //      if (formEl.getAttribute('data-load-form') !== 'true') {
      //
      //        //add page blockUIElement until all things load for the page.
      //        //Plug_formKeen.loadIndeed(element, [plg.keen.method.block], ['Loading Functions', 'primary']);
      //
      //        //fetching, rendering and loading values into forms
      //        //        ajaxResponse = add_ajaxCalling([button.value, button.getAttribute('name')], [])
      //        //        const ajaxResponseNew = {...StateData, ...ajaxResponse};
      //        //
      //        //        const sts = PB__OPR_transactions.getFormReady(ajaxResponseNew, formEl);
      //        //
      //        //        if (!sts) return false;
      //
      //        //        element.setAttribute('data-sts-loaded', 'true');
      //        // Plug_formKeen.loadIndeed(element, [plg.keen.method.block],) // or pass params as ['', '', '', false]
      //        //        formEl.setAttribute('data-load-form', 'true');
      //      }
    }


    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }

  const form_vehicle = function (element, event) {
    // fetching new values or static values for form initial
    formEl = element.querySelector('form');

    const _process = (data) => {
      return _process_form(data);
    }

    const _process_form = (data) => {
      console.log(data)
      $R_form_obj.$form(data, formEl);
      return true;
      //      if (formEl.getAttribute('data-load-form') !== 'true') {
      //
      //        //add page blockUIElement until all things load for the page.
      //        //Plug_formKeen.loadIndeed(element, [plg.keen.method.block], ['Loading Functions', 'primary']);
      //
      //        //fetching, rendering and loading values into forms
      //        //        ajaxResponse = add_ajaxCalling([button.value, button.getAttribute('name')], [])
      //        //        const ajaxResponseNew = {...StateData, ...ajaxResponse};
      //        //
      //        //        const sts = PB__OPR_transactions.getFormReady(ajaxResponseNew, formEl);
      //        //
      //        //        if (!sts) return false;
      //
      //        //        element.setAttribute('data-sts-loaded', 'true');
      //        // Plug_formKeen.loadIndeed(element, [plg.keen.method.block],) // or pass params as ['', '', '', false]
      //        //        formEl.setAttribute('data-load-form', 'true');
      //      }
    }


    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }

  switch (event.value) {
    case pb.mng.customers.add.p.add:
      return form_add(element, event);

    case pb.mng.customers.add.p.bulk:
      return form_bulk(element, event);

    case pb.mng.customers.add.p.upload:
      return form_upload(element, event);

    case pb.mng.customers.add.p.vehicle:
      return form_vehicle(element, event);

    default:
      return eventNotFound(event);
  }
}

function loadsTarget(element, event) {
  var values = [];
  var target = event.getAttribute('data-pb-calling');
  if (event.getAttribute('data-pb-called') !== 'true') {

    // collect pre-filled required inputs.
    let form = element.querySelector('form'); // button.closest('form');
    form.querySelectorAll('[data-pb-prefill="' + target + '"]').forEach((item) => {
      item.name.search('amount') ? values.push(amt_mask_filter(item.value)) : values.push(item.name);
    });

    success = _getLoad(form, event, values);

    if (success) {
      // todo: this attribute will be changed in case pre-filled data has changed by the user.
      event.setAttribute('data-pb-called', 'true');
    }
  }
  else {
    plg_sweetAlert.$call(plg.sweetAlert.type.simple, [0, 'ho gya to load', 'Aur kya chahata hai??', 'Nahi, kuch nahi chihiye :)'])
  }
}

function tablesTarget(element, event) {
  console.log(element)
  // fetching new values from server and updating into table
  tableEl = element.querySelector('table');
  if (!tableEl) {
    console.log('add table element');
    return;
  }
  if (tableEl.getAttribute('data-load-table') !== 'true') {

    var newValforTable = _getTable(event, [], tableEl.querySelectorAll('thead>tr>th').length);

    // appending fetched values
    tableEl.appendChild(newValforTable);
    // update table status
    tableEl.setAttribute('data-load-table', 'true');
    // todo: if new entry created then add 'false'

    // dataTables Plugin Calling.
    //

    // calling other basic plugin functions
    $R_common_obj.$_call(tableEl);

    // for enable dropdown in the table.
    KTMenu.init();
  }
}

function actionsTarget(element, event) {
  const action_add = (element, event) => {
    let fno = element.querySelector('form');

    //      if (!plg_formValid.$_get(fno)) {
    //        return true;
    //      }
    // collect data.
    const formData = extend.collect.$_form_simple(formEl);

    const _process = (data) => {
      console.log('i am here - 435');
      return _process_a(data);
    }
    const _process_a = (data) => {

      // getting the response
      if (!data.status) {
        toastr.success("Failed to create new Customer", `Reason: ${data.message}`);
      }
      toastr.success('New Customer has been created', "Success");


      // return on save data call.
      return true;
    }
    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, formData, _process);
  }
  const action_bulk = (element, event) => {
    let fno = element.querySelector('form');

    //      if (!plg_formValid.$_get(fno)) {
    //        return true;
    //      }
    // collect data.
    const formData = extend.collect.$_form_simple(formEl);

    const _process = (data) => {
      console.log('i am here - 435');
      return _process_a(data);
    }
    const _process_a = (data) => {

      // getting the response
      if (!data.status) {
        toastr.success("Failed to create new Customer", `Reason: ${data.message}`);
      }
      toastr.success('New Customer has been created', "Success");


      // return on save data call.
      return true;
    }
    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, formData, _process);
  }

  const action_upload = (element, event) => {
    let fno = element.querySelector('form');

    //      if (!plg_formValid.$_get(fno)) {
    //        return true;
    //      }
    // collect data.
    const formData = extend.collect.$_form_simple(formEl);

    const _process = (data) => {
      console.log('i am here - 435');
      return _process_a(data);
    }
    const _process_a = (data) => {

      // getting the response
      if (!data.status) {
        toastr.success("Failed to create new Customer", `Reason: ${data.message}`);
      }
      toastr.success('New Customer has been created', "Success");


      // return on save data call.
      return true;
    }
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);

    return ajax;
  }

  const action_vehicle = (element, event) => {
    let fno = element.querySelector('form');

    //      if (!plg_formValid.$_get(fno)) {
    //        return true;
    //      }
    // collect data.
    const formData = extend.collect.$_form_simple(formEl);

    const _process = (data) => {
      console.log('i am here - 435');
      return _process_a(data);
    }
    const _process_a = (data) => {

      // getting the response
      if (!data.status) {
        toastr.success("Failed to create new Customer", `Reason: ${data.message}`);
      }
      toastr.success('New Customer has been created', "Success");


      // return on save data call.
      return true;
    }
    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, formData, _process);
  }


  switch (event.value) {
    case pb.mng.customers.add.p.add:
      return action_add(element, event);

    case pb.mng.customers.add.p.bulk:
      return action_bulk(element, event);

    case pb.mng.customers.add.p.upload:
      return action_upload(element, event);

    case pb.mng.customers.add.p.vehicle:
      return action_vehicle(element, event);
    default:
      return eventNotFound(event);
  }
}


const get = function (event) {
  switch (event.type) {
    case eTypes.form:
      return eleCheck() ? formsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.switch:
      return eleCheck() ? switchsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
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

    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : false;

    default:
      return Promise.reject('Invalid Event Type');
  }
}
const option = function (event) {
  switch (event.type) {

    default:
      return Promise.reject('Invalid Event Type');
  }
}


export const MCA_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MCA_Requests', 'Request Type: ' + type);
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