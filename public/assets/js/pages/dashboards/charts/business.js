import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {keys, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {$R_form_obj} from "../../../base/render.js";
import {_dashboardLE} from "../../../base/elements.js";
import PB_defined from "../../../base/defined.js";
import {call_AJAX_GET} from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";

// Shared variables
let PageData, xData = {};
// Private functions

/**
 * this will be used inside charts
 */
const pageOpen = (data) => {
  // HTML Elements
  const _process = (data) => {
    let _return = true;

    _return &&= _process_save_page_state(data);
    _return &&= _process_render_inputs(data);
    _return &&= _process_charts_render(data);

    return _return;
  }

  const _process_save_page_state = (data) => {
    PageData = data['page_common_info'];
    return true;
  }
  const _process_render_inputs = (data) => {
    $R_form_obj.$global(data['page_common_info'], _dashboardLE.chart, rdR.form.method.selectOnly);
    return true;
  }
  const _process_charts_render = (data) => {

    console.log(data);
    // fetch the required data.
    const session = data['session'];
    let sels;
    for (const dataKey in session) {
      _dashboardLE.chart.querySelectorAll('select').forEach((select) => {
        sels = $(querySA(atr.event.value, dataKey));
        sels.val(session[dataKey]);
        sels.trigger('change');
      });
    }


    // render data for charts.
    Object.keys(data.session).forEach((key) => {
      // setting up the data for direct use.
      xData[key] = data[key];
      //hold the chart data into global variable for rendering the chart
      chartsTarget(_dashboardLE.chart.querySelector(`#${key}`), {
        type : eTypes.chart,
        value: key,
        id   : data.session[key]
      }, true);
    });

    return true;
  }

  return _process(data.data);
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Business');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Business');
  // todo: destroy the charts here. to remove the error and memory leak.
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

/**
 * preloaded data as dropdowns for charts
 */


/**
 * this is standard for create charts.
 * @param element
 * @param event
 * @param autoCall
 */
const chartFormation = (element, event, autoCall) => {

  const _process = (data, mode = 'ajax') => {
    switch (mode) {
      case 'direct':
        return _process_chart_render(data);
      case 'ajax':
        return _process_chart_render(data.data);
    }
  }
  const _process_chart_render = (data) => {
    PB_defined.$_create_charts(element, data);
    return true;
  }
  // load the chart on page-load
  if (autoCall) {
    _process(xData, 'direct');
    return Promise.resolve(true);
  }
  //load the chart on select event hit
  else {
    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      id  : event.data
    }, _process);
  }
}

/**
 * this is standard for create and render table.
 * // todo: finish this.
 */
const tableFormation = () => {
  return true;
}

const chartsTarget = function (element, event, autoCall = false) {
  console.log(element, event, autoCall);
  const chart_daily_sales = function (element, event, autoCall) {
    return chartFormation(element, event, autoCall);
  }
  const chart_working_capital = function (element, event, autoCall) {
    return chartFormation(element, event, autoCall);
  }
  const chart_heads_breakup = function (element, event, autoCall) {
    return chartFormation(element, event, autoCall);
  }


  switch (event.value) {
    case pb.dsb.charts.business.p.sales:
      return chart_daily_sales(element, event, autoCall);

    case pb.dsb.charts.business.p.working:
      return chart_working_capital(element, event, autoCall);

    case pb.dsb.charts.business.p.heads:
      return chart_heads_breakup(element, event, autoCall);

    default:
      return eventNotFound(event);
  }
}

const modesTarget = function (element, event, autoCall = false) {
  console.log(element, event, autoCall);
  const mode_chart = function (element, event, autoCall) {
    return Promise.resolve(true);
  }
  const mode_table = function (element, event, autoCall) {
    return Promise.resolve(true);
  }


  switch (event.value) {
    case pb.dsb.charts.business.c.mode.chart:
      return mode_chart(element, event, autoCall);

    case pb.dsb.charts.business.c.mode.table:
      return mode_table(element, event, autoCall);

    default:
      return eventNotFound(event);
  }
}

const get = function (event) {
  switch (event.type) {
    case eTypes.chart:
      return eleCheck() ? chartsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
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
    case eTypes.chart:
      return eleCheck() ? chartsTarget(get_callEl(), event) : false;
    case eTypes.mode:
      return eleCheck() ? modesTarget(get_callEl(), event) : false;
    default:
      return Promise.reject('Invalid Event Type');
  }
}


export const DCB_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MAC_Requests', 'Request Type: ' + type);
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
