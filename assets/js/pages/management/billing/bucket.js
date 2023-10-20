import {get_action, get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR, kws, deF, plg, CLS, Lyt, otR, sD, glob, STYLE, keys} from "../../../base/const.js";
import {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import extend from "../../../extend/extend.js";
import {$R_form_obj, $R_table_obj, $R_common_obj} from "../../../base/render.js";
import {getStateData} from "../../../bucket/state.js"
import {eTypes} from "../../../base/events.js";
import {getTagData} from "../../../bucket/tags.js";
import PB_defined from "../../../base/defined.js";

// Shared variables
let dataForForm = {};
let PageData, formData, redData;
let formEle, tableEle, filterEle;

const pageOpen = (data) => {
  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_update_states(data);
    return _return;
  }
  const _process_save_page_state = (data) => {
    // PageData = getStateData([keys.stateData.vehicles, keys.stateData.items, keys.stateData.categories]);
    return true;
  }
  const _process_update_states = (data) => {
    // into intro
    return true;
  }
  return _process(data.data);
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Buckets');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Buckets');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}


/**
 * load and append selects when user clicks on tab nav button.
 * @param element
 * @param event
 * @returns Promise<unknown>
 */
const tabsTarget = function (element, event) {

  if (element.hasAttribute(atr.load.form)) return Promise.resolve(true);

  const tab_customer = function (data) {

    Object.keys(data.customers).forEach((key) => {
      data.customers[key][2] = 'A/c Balance: ' + $R_common_obj.$_return(data.customers[key][2], rdR.common.methods.currency, {
        sign: true,
      });
    });

    // render the form. [append options into selects.]
    $R_form_obj.$global(
      data,
      element,
      rdR.form.method.simple
    );
    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_month = function (data) {

    Object.keys(data.months).forEach((key) => {
      data.months[key][2] = 'Total Credit Billing: ' + $R_common_obj.$_return(data.months[key][2], rdR.common.methods.currency, {
        sign: true,
      });
    });

    $R_form_obj.$global(data, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_status = function (data) {

    console.log(data);

    Object.keys(data.statuses).forEach((key) => {
      data.statuses[key][2] = 'Total Bills: ' + data.statuses[key][2];
    });

    // init the form.
    $R_form_obj.$global(data, element, rdR.form.method.simple);

    // update form status
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
      case pb.mng.billing.bucket.p.customer:
        return tab_customer(data);

      case pb.mng.billing.bucket.p.month:
        return tab_month(data);

      case pb.mng.billing.bucket.p.status:
        return tab_status(data);
    }
    return true;
  }

  return call_AJAX_GET({
    act : event.value,
    type: event.type,
  }, _process, false);
}

/**
 * it load table report for the selected account.
 * @param element
 * @param event
 * @param hybrid
 * @returns {Promise<never>|Promise<boolean>|Promise<unknown>}
 */
const reportsTarget = function (element, event, hybrid = false) {

  const report_direct = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_sale_direct(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData(['dates', 'vehicles', 'items', 'units'])}, [
        ["table", "dates", "date_id", 0],
        ["table", "vehicles", "vehicle_id", 0],
        ["table", "items", "item_id", 1],
        ["table", "units", "unit_id", 0]
      ])
      return true;
    }

    const _process_header_posting = (data) => {

      let accountInfo = data['account_detail'];

      // render date
      const range = ['from', 'to'];
      let i = 0;
      // range update
      for (const dateRangeKey in accountInfo.date_range) {
        const value = $R_common_obj.$_return(
          accountInfo.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      const right_value = range.join(' to ');

      // amount update
      const left_value = $R_common_obj.$_return(
        accountInfo.closing_balance,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );

      PB_defined.$_report_table_head(
        element.querySelector(`#table-header-${event.value}`),
        {
          title      : accountInfo.name,
          sub_title  : 'Sales Transaction Details',
          left_key   : 'Closing Balance',
          left_value : left_value,
          right_key  : 'Date Range',
          right_value: right_value,
        },
        keys.html.template.report_head
      );

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = accountInfo.name;

      return true;
    }

    const _process_report_sale_direct = (data) => {

      // basic HTMl table rendering
      __tableFormation(data.table, event.value);

      return true;
    }

    // get a target account id [customer id]
    event.data = hybrid ? event.data : formData.customer_id;

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
      _return &&= _process_report_sale_group(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData(['dates', 'items', 'units', 'customers', 'vehicles'])}, [
        ["table", "dates", "date_id", 0],
        ["table", "vehicles", "vehicle_id", 0],
        ["table", "items", "item_id", 1],
        ["table", "units", "unit_id", 0],
        ["table", "customers", "customer_id", 1]
      ])
      console.log(data);
      return true;
    }
    const _process_header_posting = (data) => {

      let accountInfo = data['account_detail'];

      // render date
      const range = ['from', 'to'];
      let i = 0;
      // range update
      for (const dateRangeKey in accountInfo.date_range) {
        const value = $R_common_obj.$_return(
          accountInfo.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      const right_value = range.join(' to ');

      // amount update
      const left_value = $R_common_obj.$_return(
        accountInfo.closing_balance,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );

      PB_defined.$_report_table_head(
        element.querySelector(`#table-header-${event.value}`),
        {
          title      : accountInfo.name,
          sub_title  : 'Sales Transaction Summary',
          left_key   : 'Closing Balance',
          left_value : left_value,
          right_key  : 'Date Range',
          right_value: right_value,
        },
        keys.html.template.report_head
      );

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = accountInfo.name;

      return true;
    }

    const _process_report_sale_group = (data) => {
      __tableFormation(data.table, event.value);
      return true;
    }

    // get target account id [customer id]
    event.data = hybrid ? event.data : formData.group_id;

    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : event.data,
    }, formData, _process, false);
  }

  const report_vehicle = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_sale_vehicle(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table(
        {...data, ...getStateData(['dates', 'items', 'units', 'customers'])},
        [
          ["table", "dates", "date_id", 0],
          ["table", "items", "item_id", 1],
          ["table", "units", "unit_id", 0],
          ["table", "customers", "customer_id", 1]
        ])
      console.log(data);
      return true;
    }
    const _process_header_posting = (data) => {

      let accountInfo = data['account_detail'];

      // render date
      const range = ['from', 'to'];
      let i = 0;
      // range update
      for (const dateRangeKey in accountInfo.date_range) {
        const value = $R_common_obj.$_return(
          accountInfo.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      const right_value = range.join(' to ');

      // amount update
      const left_value = $R_common_obj.$_return(
        accountInfo.outstanding,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );

      PB_defined.$_report_table_head(
        element.querySelector(`#table-header-${event.value}`),
        {
          title      : accountInfo.name,
          sub_title  : 'Vehicle Sales Transaction Details',
          left_key   : 'Outstanding Balance',
          left_value : left_value,
          right_key  : 'Date Range',
          right_value: right_value,
        },
        keys.html.template.report_head
      );

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = accountInfo.name;

      return true;
    }

    const _process_report_sale_vehicle = (data) => {
      __tableFormation(data.table, event.value);
      return true;
    }

    // get target account id [customer id]
    event.data = hybrid ? event.data : formData.vehicle_id;

    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : event.data,
    }, formData, _process, false);
  }

  // collect the form and send it to the server.
  const common_exe = function () {
    // form for parameters
    const _action = get_action();
    // formEle = _tabLE.action.querySelector('#form-' + event.value);
    formEle = _action.form;
    // check validation and do
    formData = extend.collect.$_form_step(formEle);
    if (!formData) return false;
    return true;
  }

  if (hybrid) {
    formData = {id: event.data};
  }
  else {
    const exe = common_exe();
    if (!exe) return Promise.reject('Formdata is not available');
  }
  // table for data loading
  tableEle = element.querySelector('table');
  filterEle = element.querySelector(querySA(atr.input.filter));

  // checking that table is loaded or not.
  if (tableEle.getAttribute(atr.load.table) === '1') return Promise.resolve(true);

  switch (event.value) {
    case pb.rpt.customers.sales.p.direct:
      return report_direct(element, event);

    case pb.rpt.customers.sales.p.group:
      return report_group(element, event);

    case pb.rpt.customers.sales.p.vehicle:
      return report_vehicle(element, event);

  }
}

/**
 * it just transfers the request to reportsTarget.
 * @param element
 * @param event
 * @returns {AjaxPB|boolean}
 */
const tablesTarget = function (element, event) {
  console.log('tablesTarget', element, event);
  return reportsTarget(element, event, true);
}

const get = function (event) {
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
const option = function (event) {
  switch (event.type) {
    case eTypes.tab:
      return eleCheck() ? tabsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}


export const MBB_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MBB_Requests', 'Request Type: ' + type);
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
