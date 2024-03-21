import {get_action, get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR, kws, deF, plg, CLS, Lyt, otR, sD, glob, STYLE, keys} from "../../../base/const.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import extend from "../../../extend/extend.js";
import {$R_form_obj, $R_table_obj, $R_common_obj} from "../../../base/render.js";
import {_tabLE} from "../../../base/elements.js";
import {getStateData} from "../../../bucket/state.js"
import {eTypes} from "../../../base/events.js";


const host = {
  server: '',
  local : 'http://localhost:0000',
};
// Shared variables
let StateData, redData;
let tableEle;
let filterEle, formData, formEle

// Private functions

/**
 * preloaded data that will be same for this page
 */
const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {

    _process_a(data.data);
    _process_b(data.data);
    return true;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
  }

  const _process_b = (data) => {
    // what your want to process on page load.
  }

  return _process(data);
}

const cardsTarget = function (element, event) {

  /*
   ------------------
   internal functions
   ------------------
   */


  const _process_a = (data) => {


    const _process_a_inner_fun_a = function (element, data, event) {

      //
      return true;

    }
    // here we load receipts tab data
    const _process_a_inner_fun_b = function (element, data, event) {

      return true;
    }

    // switching
    switch (event.value) {

      case pb.rpt.petroleum.overview.a:
        return _process_a_inner_fun_a(element, event);

      case pb.rpt.petroleum.overview.b:
        return _process_a_inner_fun_b(element, event);

      default :
        eventNotFound(event);
        return false;
    }
  }

  const _process = (data) => {
    return _process_a(data);
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : event.value,
    type   : event.type,
    account: event.data
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  return ajax;
}


const actionsTarget = function (element, _event) {
  /*
   ------------
   internal functions
   ------------
   */

  /**
   * here we delete the contact
   * @param element
   * @param event
   * @returns {AjaxPB}
   */
  const eType_eValue_function_1 = (element, event) => {
    // :page-event-value-fn to get complete function.

    // code here for the event_value_function_1 function

    const _process = (data) => {
      console.log(data);
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      _return &&= _process_c(data);
      return _return
    }
    const _process_a = (data) => {

      if (!data) {
        toastr.error('We are unable to delete this account', "Failed to delete");
        return false;
      }

      // return on save data call.
      return true;
    }
    const _process_b = (data) => {
      // use the data for processing

      return true;
    }
    const _process_c = (data) => {
      // use the data for processing

      return true;
    }

    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: event.data
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);

    return ajax;
  }

  const eType_eValue_function_2 = (element, event) => {

    // code here for the event_value_function_2 function

    // add process
    // :page-process-function

    // call ajax
    // :page-ajax-calling
  };


  // request switching.
  // switching
  switch (_event.value) {

    case pb.rpt.petroleum.overview:
      return eType_eValue_function_1(element, _event);

    case pb.rpt.petroleum.overview:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}


const tabsTarget = function (element, event) {

  //  if (element.getAttribute(atr.load.form) == 1) return true;
  if (element.hasAttribute(atr.load.form)) return Promise.resolve(true);

  const tab_basic_overview = function (data) {
    console.log(data);

    $R_form_obj.$global(data, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_storage = function (data) {
    console.log(data);

    $R_form_obj.$global(data, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_incoming = function (data) {
    return true;
  }

  const tab_shortage = function (data) {

    return true;
  }
  const _process = (data) => {

    console.log("ajax data", data)

    let _return = true;

    _return &&= _process_tab(data.data);

    return _return;
  }
  const _process_tab = (data) => {
    switch (event.value) {
      case pb.rpt.petroleum.overview.p.basic_overview:
        return tab_basic_overview(data);

      case pb.rpt.petroleum.overview.p.storage:
        return tab_storage(data);

      case pb.rpt.petroleum.overview.p.incoming:
        return tab_incoming(data);

      case pb.rpt.petroleum.summary.p.shortage:
        return tab_shortage(data);
    }
    return true;
  }

  //  return _process_tab();

  console.log("calling ajax")
  return call_AJAX_GET({
    act : event.value,
    type: event.type,
  }, _process, false);

}


const reportsTarget = function (element, event, hybrid = false) {

  const report_basic_overview = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      //      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_summary_basic_overview(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "items", "item_id", 1],
        ["table", "units", "unit_id", 0]
      ])
      console.log(data);
      return true;
    }

    const _process_header_posting = (data) => {

      let ac = data['account_detail'];
      // render date
      let range = ['from', 'to'];
      let i = 0;
      // range update
      for (const dateRangeKey in ac.date_range) {
        const value = $R_common_obj.$_return(
          ac.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      ac.date_range = range.join(' to ');

      // amount update
      ac.closing_balance = $R_common_obj.$_return(
        ac.closing_balance,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );
      const headKey = `table-header-${event.value}`;
      // get template
      const headerTemplate = _tabLE.template.querySelector(querySA(atr.core.template, headKey));

      const header = element.querySelector(`#${headKey}`);
      header.innerHTML = extend.append.$_single_on_innerHTML(headerTemplate, ac);

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = ac.name;

      return true;
    }

    const _process_report_summary_basic_overview = (data) => {
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }
      redData = $R_table_obj.$_simple(data.table, pb.rpt.petroleum.overview.p.basic_overview);


      tableEle.appendChild(redData)

      tableEle.setAttribute(atr.load.table, '1');

      $R_common_obj.$_call(tableEle);
      return true;
    }

    // get a target account id

    event.data = hybrid ? event.data : formData.date_id;
    // get data into passable variable.
    let data = {};
    data = {...formData};
    console.log(data);


    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : event.data,
    }, formData, _process, false);
  }

  const report_storage = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      //      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_overview_storage(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      console.log(data);
      extend.foreign.$_table({...data.table, ...getStateData()}, [
        ["parent", "categories", "category_id", 1],
        ["parent", "employees", "maintainer", 1],
        ["child", "items", "item_id", 1],
        ["child", "units", "stock_unit_id", 0],
        ["child", "units", "bulk_unit_id", 0]
      ])
      console.log(data);
      return true;
    }
    const _process_header_posting = (data) => {

      let ac = data['account_detail'];
      // render date
      let range = ['from', 'to'];
      let i = 0;

      for (const dateRangeKey in ac.date_range) {
        const value = $R_common_obj.$_return(
          ac.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      ac.date_range = range.join(' to ');
      ac.closing_balance = $R_common_obj.$_return(
        ac.closing_balance,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );

      const headKey = `table-header-${event.value}`;
      // get template
      const headerTemplate = _tabLE.template.querySelector(querySA(atr.core.template, headKey));

      const header = element.querySelector(`#${headKey}`);
      header.innerHTML = extend.append.$_single_on_innerHTML(headerTemplate, ac);

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = ac.name;

      return true;
    }

    const _process_report_overview_storage = (data) => {
      // creating a profile for table.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }
      //    console.log(data);
      redData = $R_table_obj.$_nested(data.table, pb.rpt.petroleum.overview.p.storage,
        ["Item", "Description", "Stock Quantity", "Bulk Quantity"]);

      // have look into plain HTML table
      //    console.log(redData);

      tableEle.appendChild(redData)

      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);

      // dataTablesInit(event.value);

      //        _table_filterEvents(event.value);

      return true;
    }

    // get target account id [customer id]

    event.data = hybrid ? event.data : formData.date_id;
    // get data into passable variable.
    let data = {};
    data = {...formData};
    console.log(data);


    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : event.data,
    }, formData, _process, false);
  }

  const report_incoming = function (element, event) {
    const _process = (data) => {
      console.log(data);
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      //      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_overview_incoming(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data.table, ...getStateData()}, [
        ["parent", "dates", "date_id", 0],
        ["parent", "shift_slots", "slot_id", 1],
        ["child", "items", "item_id", 1],
        ["child", "units", "unit_id", 0],
      ])
      console.log(data);
      return true;
    }

    const _process_report_overview_incoming = (data) => {
      // creating a profile for table.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }
      //    console.log(data);
      redData = $R_table_obj.$_nested(data.table, pb.rpt.petroleum.overview.p.incoming,
        ["Item", "Storage", "Quantity", "Shortage"]);

      // have look into plain HTML table
      //    console.log(redData);

      tableEle.appendChild(redData)

      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);

      // dataTablesInit(event.value);

      //        _table_filterEvents(event.value);

      return true;
    }


    event.data = hybrid ? event.data : formData.date_id;
    // get data into passable variable.
    let data = {};
    data = {...formData};
    console.log(data);


    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : event.data,
    }, formData, _process, false);
  }

  const report_shortage = function (element, event) {
    const _process = (data) => {
      console.log(data);
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      //      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_overview_shortage(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "items", "item_id", 1],
        ["table", "units", "unit_id", 0],
      ])
      console.log(data);
      return true;
    }
    const _process_header_posting = (data) => {
      let ac = data['account_detail'];
      // render date
      let range = ['from', 'to'];
      let i = 0;
      console.log(ac.date_range);
      for (const dateRangeKey in ac.date_range) {
        const value = $R_common_obj.$_return(
          ac.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      ac.date_range = range.join(' to ');
      ac.closing_balance = $R_common_obj.$_return(
        ac.closing_balance,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );

      const headKey = `table-header-${event.value}`;
      // get template
      const headerTemplate = _tabLE.template.querySelector(querySA(atr.core.template, headKey));

      const header = element.querySelector(`#${headKey}`);
      header.innerHTML = extend.append.$_single_on_innerHTML(headerTemplate, ac);
      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = ac.name;

      return true;
    }

    const _process_report_overview_shortage = (data) => {
      // creating a profile for table.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }
      //    console.log(data);
      redData = $R_table_obj.$_simple(data.table, pb.rpt.petroleum.overview.p.shortage);

      // have look into plain HTML table
      //    console.log(redData);

      tableEle.appendChild(redData)

      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);

      // dataTablesInit(event.value);

      //        _table_filterEvents(event.value);

      return true;
    }


    event.data = hybrid ? event.data : formData.date_id;
    // get data into passable variable.
    let data = {};
    data = {...formData};
    console.log(data);


    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : event.data,
    }, formData, _process, false);
  }

  // collect the form and send it to the server.
  const common_exe = function () {
    // form for parameters

    // formEle = _tabLE.action.querySelector('#form-' + event.value);
    formEle = get_action().form;

    console.log(formEle);

    // check validation and do
    formData = extend.collect.$_form_step(formEle);

    console.log(formData);

    if (!formData) return false;

    // table for data loading
    tableEle = element.querySelector('table');
    filterEle = element.querySelector(querySA(atr.input.filter));
    return true;
  }

  if (hybrid) {
    formData = {id: event.data};
  }
  else {
    const exe = common_exe();
    if (!exe) return Promise.reject('Formdata is not available');
  }
  tableEle = element.querySelector('table');
  filterEle = element.querySelector(querySA(atr.input.filter));
  // checking that table is loaded or not.
  if (tableEle.getAttribute(atr.load.table) === '1') return Promise.resolve(true);


  switch (event.value) {
    case pb.rpt.petroleum.overview.p.basic_overview:
      return report_basic_overview(element, event);

    case pb.rpt.petroleum.overview.p.storage:
      return report_storage(element, event);

    case pb.rpt.petroleum.overview.p.incoming:
      return report_incoming(element, event);

    case pb.rpt.petroleum.overview.p.shortage:
      return report_shortage(element, event);

  }
}

const backsTarget = function (element, event) {
  /*
   // destroy the datatable
   tableObject[button.value].clear().destroy();
   tableObject[button.value].destroy();
   */
  // empty the table body.
  const _tableEl = get_passedEl().querySelector('table');
  // setting the status = 0 for the table
  _tableEl.setAttribute(atr.load.table, '0');
  // remove the previous account data from table.
  const tbody = _tableEl.querySelector('tbody');
  if (tbody) {
    tbody.remove();
  }
  return true;
}


// Public methods

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

const tablesTarget = function (element, event) {
  return reportsTarget(element, event, true);
}

const get = function (event) {
  console.log("EVENT TYPE IN GET", event);
  switch (event.type) {
    case eTypes.tab:
      return eleCheck() ? tabsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.report:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      alert(`eventType: ${event.type}, not GET, change nature to POST`);
      return Promise.reject('Invalid Event Type');
  }
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Sales of customer');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Sales of customer');
  return Promise.resolve(true);
}

// Public methods
const post = function (event) {
  console.log("POST OCCURED", event)

  switch (event.type) {
    case eTypes.report:
      return eleCheck() ? reportsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : Promise.reject('None');
    default:
      return Promise.reject('Invalid Event Type');
  }
}


const option = function (event) {
  switch (event.type) {
    case eTypes.tab:
      return eleCheck() ? tabsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}
//

export const RPO_Requests = (data, type) => {
  console.log("DATA SUMMARY")
  //  console.log(`${keys.event.nature.open}`)
  console.log(data, type);
  toastr.success('RPO_Requests', 'Request Type: ' + type);

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
    case keys.event.nature.hybrid:
      return post(data);

    case keys.event.nature.option:
      return option(data);

    default:
      return false;
  }
}
//// works on card event type hit
//export const RPO_cards = function (_event) {
//  // note: single ajax calling for any event
//  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
//};
//
//// works on action event type hit
//export const RPO_actions = function (_event) {
//  // note: multiple ajax calling for all events.
//  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
//};
//
//
//export const RPO_tabs = function (_event) {
//  return eleCheck() ? tabsTarget(get_callEl(), _event) : false;
//};
//
//export const RPO_reports = function (_event) {
//  console.log("reports");
//  return eleCheck() ? reportsTarget(get_callEl(), _event) : false;
//};
//
//export const RPO_backs = function (_event) {
//  return eleCheck() ? backsTarget(get_callEl(), _event) : false;
//};
//
//// fetching all upcoming required details
//export const RPO_pageOpen = function (data) {
//  return pageOpen(data);
//};
