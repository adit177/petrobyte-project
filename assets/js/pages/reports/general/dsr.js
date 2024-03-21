import {get_action, get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR, kws, deF, plg, CLS, Lyt, otR, sD, glob, STYLE, keys} from "../../../base/const.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import extend from "../../../extend/extend.js";
import {$R_form_obj, $R_table_obj, $R_common_obj} from "../../../base/render.js";
import {_tabLE} from "../../../base/elements.js";
import {getStateData} from "../../../bucket/state.js"
import ajax from "../../../base/ajax.js";import {eTypes} from "../../../base/events.js";


// Shared variables
let StateData, redData;
let tableEle;
let formEle, formData, filterEle;

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
    _process_a(data);
    _process_b(data);
    return true;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
  }

  const _process_b = (data) => {
    // what your want to process on page load.
  }

  return _process(data.data);
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

      case pb.rpt.general.dsr.a:
        return _process_a_inner_fun_a(element, event);

      case pb.rpt.general.dsr.b:
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

    case pb.rpt.general.dsr:
      return eType_eValue_function_1(element, _event);

    case pb.rpt.general.dsr:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}

// Public methods

const tabsTarget = function (element, event) {
  if (element.hasAttribute(atr.load.select)) return Promise.resolve(true);

  const lubricants_tab = (element, data, event) => {

    $R_form_obj.$global({items: getStateData().items}, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const petroleum_tab = (element, data, event) => {
    $R_form_obj.$global({items: getStateData().items}, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');

    return true;
  }
  const _process = (data) => {
    let _return = true;

    _return &&= _process_tab(data);

    return _return;
  }

  const _process_tab = (data) => {
    switch (event.value) {
      case pb.rpt.general.dsr.p.lubricants:
        return lubricants_tab(element, data.data, event);
      case pb.rpt.general.dsr.p.petroleum:
        return petroleum_tab(element, data.data, event);
    }
    return true;
  }

  return call_AJAX_GET({
    act : event.value,
    type: event.type,
  }, _process, false);


}

const reportsTarget = function (element, event, hybrid = false) {
  const lubricants_report = (element, event) => {


    const _process = (data) => {
      console.log(data);
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

  const petroleum_report = (element, event) => {
    const _process = (data) => {


      if (!data) {
        let redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }

      const redData = $R_table_obj.$advance_new(data.data.headers, data.data.table, tableEle,
        [["meter_readings", 3], ["tank_readings", 7]], pb.rpt.general.dsr.p.petroleum);

      tableEle.appendChild(redData);

      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);
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


  const common_exe = function () {
    formEle = get_action().form;
    formData = extend.collect.$_form_step(formEle);
    if (!formData) return false;
    tableEle = element.querySelector('table');
    filterEle = element.querySelector(querySA(atr.input.filter));
    tableEle = element.querySelector("table");
    return true;
  }
  //  const exe = common_exe();
  //  if (!exe) return false;
  if (hybrid) {
    formData = {id: event.data};
  }
  else {
    const exe = common_exe();
    if (!exe) return Promise.reject('Formdata is not available');
  }
  //  console.log(element)
  console.log("ELEMENT", element)
  //  const exe = common_exe();
  //  if (!exe) return false;
  console.log(element)
  tableEle = element.querySelector('table');
  filterEle = element.querySelector(querySA(atr.input.filter));
  if (tableEle.getAttribute(atr.load.table) === '1') return Promise.resolve(true);

  switch (event.value) {
    case pb.rpt.general.dsr.p.lubricants:
      return lubricants_report(element, event);
    case pb.rpt.general.dsr.p.petroleum:
      return petroleum_report(element, event);

  }
}
const tablesTarget = function (element, event) {
  console.log("ELEMENT", element)
  return reportsTarget(element, event, true);
}
//// works on card event type hit
//export const RGD_cards = function (_event) {
//  // note: single ajax calling for any event
//  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
//};
//
//// works on action event type hit
//export const RGD_actions = function (_event) {
//  // note: multiple ajax calling for all events.
//  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
//};
//
//export const RGD_tabs = function (_event) {
//  // note: multiple ajax calling for all events.
//  return eleCheck() ? tabsTarget(get_callEl(), _event) : false;
//}
//
//// fetching all upcoming required details
//export const RGD_pageOpen = function (data) {
//  return pageOpen(data);
//};
//
//export const RGD_reports = function (_event) {
//  console.log("reports")
//  return eleCheck() ? reportsTarget(get_callEl(), _event) : false;
//}
function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

const get = function (event) {
  console.log("EVENT TYPE", event)
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
const post = function (event) {

  switch (event.type) {
    case eTypes.report:
      return eleCheck() ? reportsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : Promise.reject('None');
    default:
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
const option = function (event) {
  switch (event.type) {
    case eTypes.tab:
      return eleCheck() ? tabsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}

export const RGD_pageOpen = (data, type) => {
  console.log("DATA SUMMARY", type)
  //  console.log(`${keys.event.nature.open}`)
  console.log(data, type);
  toastr.success('RC_pageOpen', 'Request Type: ' + type);

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



