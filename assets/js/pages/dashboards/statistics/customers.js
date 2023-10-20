// Shared variables
import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {rdR} from "../../../base/const.js";
import {_directLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {$R_common_obj, $R_table_obj} from "../../../base/render.js";
import Arranging from "../../../base/arranges.js";
import extend from "../../../extend/extend.js";

let StateData;
let xData;
let Direct;
let targetEle, tableEle;
let redData, chartObject = {};
const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4011',
};


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
    console.log(data);
    let _return = true;

    _return &&= _process_save_page_state(data);
    _return &&= _process_render_cards(data);
    _return &&= _process_render_account_nos(data);
    _return &&= _process_render_notable_customers(data);
    _return &&= _process_render_table(data);
    // _return &&= _process_render_static(data);
    // _return &&= _process_render_header(data);
    // _return &&= _process_render_tab(data);

    return _return;
  }

  const _process_render_table = (data) => {
    let tableEle = _directLE.summary.querySelector("table");

    if (!tableEle) {
      return false;
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return true;
    }

    console.log(StateData.table);

    const redData = $R_table_obj.$_simple(StateData.table, pb.dsb.statistics.customers.t.receipt_list);

    console.log(redData);

    tableEle.appendChild(redData)

    // update table status
    tableEle.setAttribute(atr.load.table, '1');

    // apply common renders
    $R_common_obj.$_call(tableEle);

    console.log(pb.dsb.statistics.customers.t.receipt_list);
    console.log(tableEle);
    console.log(StateData);
  }

  const _process_render_notable_customers = (data) => {
    const template = _directLE.template.querySelector(querySA(atr.core.template, "notableCustomers"));
    const child = _directLE.summary.querySelector(querySA(atr.core.append, "notableCustomers"));
    child.innerHTML = extend.append.$_loop_on_innerHTML(template.innerHTML, StateData.notableCustomers);
    $R_common_obj.$_call(child);
    return true;
  }
  const _process_render_account_nos = (data) => {
    console.log(StateData);
    for (let key in StateData.accountNos) {
      _directLE.visits.querySelector(`#account_number_${key}`).innerText = StateData.accountNos[key];
    }
    return true;
  }

  const _process_render_cards = (data) => {
    const child = _directLE.visits.querySelector(querySA(atr.core.append, "cards"));
    const template = _directLE.template.querySelector(querySA(atr.core.template, "cards"));
    child.innerHTML = extend.append.$_single_on_innerHTML(template, StateData.cardData);
    $R_common_obj.$_call(child);
    return true;
  }

  const _process_save_page_state = (data) => {
    StateData = data['pageState'];
    return true;
  }


  const _process_render_static = (data) => {
    StateData = data['pageState'];
    xData = data.month;
    return true;
  }

  const _process_render_header = (data) => {
    Direct = _directLE.visits;

    let header = Direct.querySelector(querySA(atr.core.control, "header"));

    console.log(header)


    header.innerHTML = extend.append.$_single_on_innerHTML(header, StateData.header);
    $R_common_obj.$_call(header);

    return true;
  }

  const _process_render_tab = (data) => {
    navtabsTarget(Direct.querySelector('#month'), {
      value: "month",
      type : eTypes.navtab
    }, true);

    return true;
  }

  return _process(data.data);
}

// create basic HTML table for accounts list.
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


const navtabsTarget = (element, event, onPageLoadCall = false) => {

  if (element.getAttribute(atr.load.tab) === '1') return true;


  // manual arranges
  if (onPageLoadCall) {
    let event = {
      type : 'navtab',
      value: 'month',
      place: 'nav'
    }
    let trigger = _directLE.navbar.querySelector('li').children[0];
    Arranging._directs(event, trigger);
  }
  const _process = (data) => {
    let _return = true;

    _return &&= loadTable(element, event, data);
    _return &&= loadChart(element, event, data);

    element.setAttribute(atr.load.tab, '1');
    return _return;
  }
  const loadTable = (element, event, data) => {

    // getting the final HTML element
    targetEle = element.getAttribute('id') === event.value
      ? element.querySelector('[data-pb-child="table"]>div')
      : element.querySelector('#' + event.value).querySelector('[data-pb-child="table"]>div');

    // put the percent max mark
    Object.keys(data.customer_list).forEach((key) => {
      let obj = data.customer_list[key];
      obj.push(StateData.header.amount);
    });

    tableEle = targetEle.querySelector('table');
    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }

    // rendering data into table using above profile.
    tableFormation(data.customer_list, pb.dsb.statistics.customers.t.customer_list);

    //dataTablesInit(event.value);

    //filterEvents(event.value);
    return true
  }
  const loadChart = (element, event, data) => {
    // getting the final HTML element
    targetEle = element.getAttribute('id') === event.value
      ? element.querySelector('[data-pb-child="chart"]>div')
      : element.querySelector('#' + event.value).querySelector('[data-pb-child="chart"]>div');

    redData = Option_charts.createDataset(data.chart);
    redData = Option_charts.buildingOptions(redData, thePathArr, event.value);

    // initialize of the chart
    chartObject[event.value] = plg_apexChart.$_manual(targetEle, redData);

    return true;
  }

  if (onPageLoadCall) {
    _process(xData);
  }
  else {
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);
  }
  return true;
}


// Public methods

export const DSC_navtabs = function (_event) {
  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;
}
// fetching all upcoming required details
export const DSC_Requests = function (data) {
  return pageOpen(data);
}
