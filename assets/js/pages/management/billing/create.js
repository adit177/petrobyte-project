import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, keys, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {$R_common_obj, $R_form_obj, $R_table_obj} from "../../../base/render.js";
import {_wizardLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import PB_defined from "../../../base/defined.js";
import {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import extend from "../../../extend/extend.js";


// Shared variables
let StateData, redData, formEl;
let tableEle;
let chartObject = [];

let Template;

// Private functions

/**
 * preloaded data that will not change for this page
 */
const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
    // page required functions.

    // render the table object.

  const _process = (data) => {
      let _return = true;

      _return &&= _process_a(data);
      _return &&= _process_template(data);
      _return &&= _process_table(data);

      return _return;
    }

  const _process_a = (data) => {
    StateData = data['pageState'];
    //enable select2
    $R_form_obj.$global(StateData, _wizardLE.search, rdR.form.method.selectOnly);
    return true;
  }

  const _process_template = (data) => {
    Template = _wizardLE.template;
    return true;
  }

  // process the table
  const _process_table = (data) => {
    tableEle = _wizardLE.result.querySelector('table');

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return true;
    }

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.append(redData);
      return true;
    }

    extend.foreign.$_remote(exT.foreign.combine, data, [['list', 'dates', '1', '0']]);
    // rendering data into table using above profile.
    PB_defined.$_append_table_simple(tableEle, data.list, pb.mng.billing.create.t.list);


    return true;
  }

  return _process(data.data);
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

const tableFormation = function (lists, key) {
  // rendering data into table using above profile.
  redData = $R_table_obj.$_simple(lists, key);

  // have look into plain HTML table
  //console.log(redData);

  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);

  // for enable dropdown in the table.
  KTMenu.init();
}

const actionsTarget = function (element, event) {
  console.log(element, event);
  const action_result_table = (element, event) => {
    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_table(data);

      return _return;
    }

    // collect the all form data.

    const _process_table = (data) => {
      let tableEle = _wizardLE.result.querySelector('table');

      tableEle.removeChild(tableEle.querySelector('tbody'));

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData);
        return true;
      }

      //foreign match of the data
      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.combine, data.pageState, [['list', 'dates', '1', '0']]);
      // rendering data into table using above profile.

      PB_defined.$_append_table_simple(tableEle, data.pageState.list, pb.mng.billing.display.t.list);
      // rendering data into table using above profile.
      //dataTablesInit(event.value);
      $R_common_obj.$_call(tableEle);
      //filterEvents(event.value);


      return true;
    }


    // other things, not connected to dynamic data.

  }
  switch (event.value) {
    case pb.mng.billing.display.p.result:
      return action_result_table(element, event);

    default:
      return eventNotFound(event);
  }
}

const loadsTarget = function (element, event) {
  const load_present = () => {
    console.log(element, event);
    const _process = (data) => {
      data = data.data;
      let _return = true;

      _return &&= _process_header(data);
      _return &&= _process_customer(data);
      _return &&= _process_invoice(data);
      _return &&= _process_detail_invoice(data);
      _return &&= _process_summary(data);
      _return &&= _process_final(data);

      return _return;
    }

    const _process_header = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "header"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "header"));

      // load the data into the header.
      template.innerHTML = extend.append.$_single_on_innerHTML(template, data.header);
      $R_common_obj.$_call(template);
      targetEle.append(template);


      return true;
    }
    const _process_customer = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "customer"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "customer"));
      template.innerHTML = extend.append.$_single_on_innerHTML(template, data.customer);
      $R_common_obj.$_call(template);
      targetEle.append(template);
      return true;
    }
    const _process_invoice = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "invoice"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "invoice"));
      template.innerHTML = extend.append.$_single_on_innerHTML(template, data.invoice);
      $R_common_obj.$_call(template);
      targetEle.append(template);
      return true;
    }
    const _process_detail_invoice = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "detail_invoice"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "detail_invoice"));
      tableEle = template.querySelector('table');

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      //foreign match of the data
      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.individual, [data.detail_invoice.body, data.dates], [[1, 0]]);
      extend.foreign.$_remote(exT.foreign.individual, [data.detail_invoice.body, data.products], [[2, 0]]);
      PB_defined.$_append_table_simple(tableEle, data.detail_invoice.body, pb.mng.billing.display.t.detail_invoice);
      // rendering data into table using above profile.
      //dataTablesInit(event.value);
      $R_common_obj.$_call(template);
      //filterEvents(event.value);
      targetEle.append(template);

      return true;
    }
    const _process_summary = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "summary"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "summary"));
      tableEle = template.querySelector('table');

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      //foreign match of the data
      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.combine, data, [['summary', 'products', 1, 0]]);
      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(tableEle, data.summary, pb.mng.billing.display.t.summary);


      targetEle.append(template);
      $R_common_obj.$_call(targetEle);

      return true;
    }

    const _process_final = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "final"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "final"));
      template.innerHTML = extend.append.$_single_on_innerHTML(template, data.final);

      targetEle.append(template);
      $R_common_obj.$_call(targetEle);
      return true;
    }


    // other things, not connected to dynamic data.

    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      id  : event.data
    }, _process)
  }

  switch (event.value) {
    case pb.mng.billing.display.p.present:
      return load_present(element, event);
    default:
      return eventNotFound(event);
  }
}
// Public methods


const get = function (event) {
  switch (event.type) {
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

    default:
      return Promise.reject('Invalid Event Type');
  }
}

export const MBC_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('OTS_Requests', 'Request Type: ' + type);
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
