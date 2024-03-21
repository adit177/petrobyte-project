import {get_callEl} from "../../../base/global.js";
import pb           from "../../../base/structure.js";
import {rdR}        from "../../../base/const.js";

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4010',
};
// Shared variables
let redData, targetEle;
let chartObject = [];
let xData, StateData;

// Private functions

/**
 * this will be used inside charts
 */
const pageOpen = (data) => {
  // HTML Elements
  const _process = (data) => {
    let _return = true;

    _return &&= _process_a(data);
    _return &&= _process_b(data);

    return _return;
  }

  const _process_a = (data) => {
    StateData = data.pageState;
    console.log(StateData)
    $R_form_obj.$global(StateData, _dashboardLE.chart, rdR.form.method.selectOnly);

    return true;
  }
  const _process_b = (data) => {
    // fetch the required data.

    let sels;
    for (const dataKey in data) {
      _dashboardLE.chart.querySelectorAll('select').forEach((select) => {
        sels = $('[' + atr.core.target + '="' + dataKey + '"]')
        sels.val(data[dataKey]);
        sels.trigger('change');
      })
    }

    // render data for charts.
    Object.keys(data.session).forEach((key) => {
      xData = data[key];

      chartsTarget(_dashboardLE.chart, {
        type : eTypes.chart,
        value: key,
        data : data.session[key]
      }, true);
    });

    return true;
  }
  return _process(data.data);
}

/**
 * preloaded data as dropdowns for charts
 */

const tableFormation = () => {
  // todo @somesh @due: table render & append.
  return true;
}

/**
 * this is standard for create charts.
 * @param element
 * @param event
 * @param autoCall
 */
const chartFormation = (element, event, autoCall) => {
  // getting the final HTML element
  targetEle = element.getAttribute('id') === event.value
    ? element.querySelector('[' + atr.core.child + '="chart"]>div')
    : element.querySelector('#' + event.value).querySelector('[' + atr.core.child + '="chart"]>div');

  const _process = (data) => {
    return _process_making_charts(data);
  }
  const _process_making_charts = (data) => {

    redData = Option_charts.createDataset(data);

    if (autoCall) {
      // building chart options.
      redData = Option_charts.buildingOptions(redData, thePathArr, event.value);
      // initialize of the chart
      chartObject[event.value] = plg_apexChart.$_manual(targetEle, redData);
    }
    else {
      // update the initiated chart
      plg_apexChart.$_update(chartObject[event.value], redData);
    }
    return true;
  }

  if (autoCall) {
    // load at the page load time
    _process(xData);
    return true;
  }
  else {
    // for fetch on user action after load.
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }
}

/**
 * this is standard for create and render table.
 */


const chartsTarget = function (element, event, autoCall = false) {
  // get list of all contacts
  const chart_business_trade = function (element, event, autoCall) {
    let _return = true;
    // chart formation
    _return &&= chartFormation(element, event, autoCall);
    // table formation
    _return &&= tableFormation();

    return _return;
  }
  const chart_stock_flow = function (element, event, autoCall) {
    let _return = true;
    // chart formation
    _return &&= chartFormation(element, event, autoCall);
    // table formation
    _return &&= tableFormation();

    return _return;
  }
  const chart_sales_break = function (element, event, autoCall) {
    let _return = true;
    // chart formation
    _return &&= chartFormation(element, event, autoCall);
    // table formation
    _return &&= tableFormation();

    return _return;
  }


  switch (event.value) {
    case pb.dsb.charts.stock.p.trade:
      return chart_business_trade(element, event, autoCall);

    case pb.dsb.charts.stock.p.stock:
      return chart_stock_flow(element, event, autoCall);

    case pb.dsb.charts.stock.p.sales:
      return chart_sales_break(element, event, autoCall);

    default:
      return eventNotFound(event);
  }
}

// Public methods


// loading charts new data.
export const DCS_charts = function (_event) {
  return eleCheck() ? chartsTarget(get_callEl(), _event) : false;
};
// fetching all dropdown required in cards toolbar
export const DCS_pageOpen = function () {
  return pageOpen();
};

