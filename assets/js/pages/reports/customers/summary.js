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

// Shared variables
let combineData = {};
let PageData, formData, redData;
let formEle, tableEle, filterEle;
let tableObject = [];
let nestedDt;


// Private functions

/**
 * this will be used for show page's base-0 data.
 */


const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */



  const _process = (data) => {
    console.log("PAGE OPEN DATA", data)
    // console.log(data);
    let _return = true;
    _return &&= _process_save_page_state(data);

    return _return;

  }

  const _process_save_page_state = (data) => {
    // StateData = data['pageState'];
    return true;
  }

  return _process(data.data);
}
/**
 * preloaded data that will not change for this page
 */

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Sales of customer');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Sales of customer');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

const _tableFormation = function (data, event) {
  // creating a profile for table.
  if (!data) {
    redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
    return true;
  }

  //    console.log(data);
  redData = $R_table_obj.$_simple(data, event);

  // have look into plain HTML table
  //    console.log(redData);

  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);
}

/**
 * load and append selects when user click on tab nav button.
 * @param element
 * @param event
 * @returns {AjaxPB||boolean}
 */

const tabsTarget = function (element, event) {
  console.log("INSIDE tabs target")

  if (element.hasAttribute(atr.load.form)) return Promise.resolve(true);

  // tabsTarget functions
  const tab_accounts = function (data) {
    $R_form_obj.$global(PageData, element, rdR.form.method.simple);
    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_trade = function (data) {
    $R_form_obj.$global(data, element, rdR.form.method.simple);
    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_group = function (data) {

    Object.assign(combineData, data, PageData);

    $R_form_obj.$global(combineData, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const _process = (data) => {
    let _return = true;
    _return &&= _process_tab(data.data);
    return _return;
  }

  const _process_tab = (data) => {
    switch (event.value) {
      case pb.rpt.customers.summary.p.accounts:
        return tab_accounts(data);

      case pb.rpt.customers.summary.p.trade:
        return tab_trade(data);

      case pb.rpt.customers.summary.p.group:
        return tab_group(data);
    }
    return true;
  }

  return call_AJAX_GET({
    act : event.value,
    type: event.type,
  }, _process, false);
}

const reportsTarget = function (element, event, hybrid = false) {

  console.log("INSIDE REPORTS TRADE")
  console.log(element, event)

  const report_accounts = function (element, event) {
    const _process = (data) => {
      console.log(data);
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_summary_accounts(data.data);

      return _return;
    }
    const _process_key_value_match = (data) => {
      console.log(getStateData())
      console.log({...data, ...getStateData()})
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["accounts", "customers", "customer_id", 1]
      ]);
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

    const _process_report_summary_accounts = (data) => {

      const select = _tabLE.result.querySelector("#status-select")
      $R_form_obj.$global({
        statuses: {
          "1": ["true", "true"],
          "2": ["false", "false"]
        }
      }, select, rdR.form.method.singleElement);

      const groupByEl = _tabLE.result.querySelector("#group-by-select")
      console.log(groupByEl);
      $R_form_obj.$global({
        group_by: {
          "1": [6, "Is Active"],
          "2": [5, "Eye Color"],
          "3": [3, "Date"],
        }
      }, groupByEl, rdR.form.method.singleElement);

      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }
      $R_table_obj.$simple_dt(data.table, "summary-quick-table",
        _tabLE.result.querySelector("#report-accounts").querySelector(".filter-form"),
        event.value)
      //      nestedDt = $R_table_obj.$nested_dt({
      //        parent: data.table,
      //        child : data.child
      //      }, "summary-quick-table", _tabLE.result, event.value, ["name", "email"]);


      return true;
    }

    // get target account id [customer id]
    //
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

  const report_trade = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_summary_trade(data.data);

      return _return;
    }
    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [["table", "customers", "customer_id", 0]])
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

    const _process_report_summary_trade = (data) => {

      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      //        _table_filterEvents(event.value);

      return true;
    }

    // get target account id [customer id]
    //    event.data = formData.date_id;
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

  const report_group = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_summary_group(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [["table", "customers", "customer_id", 0]])
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

    const _process_report_summary_group = (data) => {

      _tableFormation(data.table, event.value);

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

    formEle = get_action().form;
    //      formEle = _tabLE.action.querySelector('#form-' + event.value)
    formData = extend.collect.$_form_step(formEle);

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
  //  const exe = common_exe();

  //  if (!exe) return false;
  tableEle = element.querySelector('table');
  // checking that table is loaded or not.
  //  console.log("INSIDE REPORTS TRADE 463")

  if (tableEle.getAttribute(atr.load.table) === '1') {
    return Promise.resolve(true)
    //    return true;

    //    console.log("INSIDE REPORTS TRADE 468")

  }

  //  console.log("INSIDE REPORTS TRADE 481")

  console.log("post switch case")
  console.log(element, event);
  switch (event.value) {

    case pb.rpt.customers.summary.p.accounts:
      return report_accounts(element, event);

    case pb.rpt.customers.summary.p.trade:
      return report_trade(element, event);

    case pb.rpt.customers.summary.p.group:
      return report_group(element, event);

  }
}

/**
 * it just transfers the request to tabsTarget.
 * @param element
 * @param event
 * @returns {AjaxPB|boolean}
 */
const tablesTarget = function (element, event) {
  //  return tabsTarget(element, event);
  return reportsTarget(element, event, true);
}
const backsTarget = function (element, event) {
  // destroy the datatable
  // tableObject[button.value].clear().destroy();
  // tableObject[button.value].destroy();

  // empty the table body.
  //  const _tableEl = get_passedEl().querySelector('table');
  //  _tableEl.setAttribute(atr.load.table, '0');
  //  _tableEl.querySelector('tbody').remove();
  //  $R_table_obj.$destroy_nested_dt(nestedDt);
  return true;
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

export const RCY_pageOpen = (data, type) => {
  console.log("DATA SUMMARY")
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