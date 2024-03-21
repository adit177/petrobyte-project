import {deF, exT, Lyt, plg, rdR} from "./const.js";
import plg_formValid from "../plugins/formValid.js";
import {_buttonLE, _cardLE, _listingLE} from "./elements.js";
import {atr} from "./attributes.js";
import {$R_common_obj, $R_menu_obj, $R_table_obj} from "./render.js";
import {call_AJAX_GET} from "./ajax.js";
import {get_layoutName, get_LN, get_thePath, get_thePathArr} from "./global.js";
import Option_charts from "../options/apexcharts.js";
import plg_apexChart from "../plugins/apexCharts.js";
import extend from "../extend/extend.js";
import Holding from "./holding.js";
import {HTMLProps} from "../bucket/html.js";
import plugins from "../plugins/plugins.js";
import {_dc} from "./defaults.js";
import plg_sweetAlert from "../plugins/sweetAlert.js";
import {_k} from "./keys.js";

// Shared variables
let chartObject = {};

// Private functions

const _form_validation = (resolveFn, rejectFn, params) => {
  return new Promise((resolve, reject) => {

    // get the form element number.
    const form_sno = params.form_sno ?? _dc.define.form_valid.param.form_sno;

    switch (params.method ?? _dc.define.form_valid.param.method) {

      case deF.form_promise.method.inbuild:
        // get status promise.
        const form_validation_status_promise = plg_formValid.$_get_status(form_sno);
        // console.log(form_validation_status_promise)
        form_validation_status_promise.then((data) => {
          console.log('form valid promise resolve status', data);
          return data
            ? resolve(resolveFn())
            : resolve(rejectFn());
        });
        break;

      case deF.form_promise.method.callback:
        // method - B, when no return is required
        const res = () => {
          resolve(resolveFn());
        }
        const rej = () => {
          reject(rejectFn());
        }
        plg_formValid.$_callback(form_sno, res, rej);
        break;

      case deF.form_promise.method.event:
        const the_formValidator = (type, event) => {
          switch (type) {
            case plg.formValid.trigger.form.notvalidated:
              // Triggered when a particular validator isn't ignored and will not be excuted

              break;

            case plg.formValid.trigger.form.validating:
              // Triggered when starting validating the form
              break;

            case plg.formValid.trigger.form.invalid:
              // Triggered when the form is completely validated, and all fields are invalid
              reject(rejectFn());
              break;

            case plg.formValid.trigger.form.valid:
              // Triggered when the form is completely validated, and all fields are valid
              resolve(resolveFn())
              break;

            case plg.formValid.trigger.form.reset :
              // Triggered after reseting the form
              break;
          }
        }
        plg_formValid.$_event(form_sno, plg.formValid.trigger.keys.form, the_formValidator);
        break;
    }
  });
}

const _openMenu = (element, event) => {
  const menuEle = element.querySelector(_buttonLE.states.menu);
  const stateStatus = menuEle.hasAttribute(atr.load.state)
    ? menuEle.getAttribute(atr.load.state)
    : '0'

  if (stateStatus === '1') {
    console.log('already loaded');
    return Promise.resolve(true);
  }

  const _process = (data) => {
    // update menu value.
    return $R_menu_obj.$_left(
      data.data['menu_info'],
      rdR.menu.type.value,
      [],
      rdR.menu.role.update,
      rdR.menu.tags.menu
    );
  }

  const params = {
    act : 'menu',
    type: event.type,
  }
  return call_AJAX_GET(params, _process, false);
}

const _updateCatch = (element, data) => {
  // list of all id update-able html elements.
  const buttons = element.querySelectorAll(querySA(atr.event.catch));
  buttons.forEach((button) => {
    console.log(data);
    console.log(button);
    const key = button.getAttribute(atr.event.catch);
    const id = data[key];
    button.setAttribute(atr.event.value, id);
  });
  /*
   OLD method.
   element.querySelectorAll(querySA(atr.event.catch, key)).forEach((button) => {
   button.setAttribute(atr.event.data, data[key]);
   });
   */
}

const _updateTarget = (element, data) => {
  // update into HTML element
  element.querySelectorAll(querySA(atr.core.update)).forEach((ele) => {
    const key = ele.getAttribute(atr.core.update);
    ele.innerHTML = data[key];
  });
  // insert into the form Input element
  element.querySelectorAll(querySA(atr.core.insert)).forEach((ele) => {
    const key = ele.getAttribute(atr.core.insert);
    ele.value = data[key];
  });
}

const _createCharts = (element, data) => {
  console.log('create charts', data, element);
  let key, chartID, redData;
  // getting the final HTML element
  element.querySelectorAll(querySA(atr.core.child, 'chart', 'div')).forEach((chart) => {
    // get the chart key
    key = chart.getAttribute(atr.core.key);
    chartID = get_thePath() + '-' + key;
    // create the chart option.
    redData = Option_charts.createDataset(data[key]);
    // check if the chart is already initialized or not.
    if (!chartObject[chartID]) {
      // initialize of the chart
      redData = Option_charts.buildingOptions(redData, get_thePathArr(), key);
      chartObject[chartID] = plg_apexChart.$_manual(chart, redData);
    }
    else {
      // directly data loading into chart
      plg_apexChart.$_update(chartObject[chartID], redData);
    }
  });
}

const appendTemplates = (element, data, method) => {

  const layout = get_LN() === undefined ? get_layoutName()[0] : get_LN();

  if (element.getAttribute(atr.core.append) === null) {
    element.querySelectorAll(querySA(atr.core.append)).forEach((child) => {
      const key = child.getAttribute(atr.core.append);
      const keys = key.split('_');
      const xData = data[key] === undefined ? data[keys[keys.length - 1]] : data[key];
      // get template
      let template = Holding.Target(layout, 'templates').querySelector(querySA(atr.core.template, key));
      // render template and append into the element.
      switch (method) {
        case exT.append.method.single:
          child.innerHTML = extend.append.$_single_on_innerHTML(template, xData);
          break;

        case exT.append.method.loop:
          child.innerHTML = extend.append.$_loop_on_innerHTML(template, xData);
          break;
      }
    });
  }
  else {
    const key = element.getAttribute(atr.core.append);
    const keys = key.split('_');
    const xData = data[key] === undefined ? data[keys[keys.length - 1]] : data[key];
    // get template
    let template = Holding.Target(layout, 'templates').querySelector(querySA(atr.core.template, key));
    // render template and append into the element.
    switch (method) {
      case exT.append.method.single:
        element.innerHTML = extend.append.$_single_on_innerHTML(template, xData);
        break;

      case exT.append.method.loop:
        element.innerHTML = extend.append.$_loop_on_innerHTML(template, xData);
        break;
    }
  }
  $R_common_obj.$_call(element);
}

/**
 * <div data-append="bars__cards">
 *   <!---->
 * </div>
 * @param element
 */
const appendDirect = (element) => {
  element.querySelectorAll(querySA(atr.direct.append)).forEach((child) => {
    const key = child.getAttribute(atr.direct.append);
    const data = Holding.Target(get_LN()).layout.querySelector(`#${key}`);
    child.append(data);
  });
}


const appendTable_simple = (element, data, tag) => {
  const renderedData = $R_table_obj.$_simple(data, tag);

  if (!renderedData) return false;
  // remove old data or blank table
  element.querySelector('tbody') !== null ? element.querySelector('tbody').remove() : justPass();

  // append tbody into page table
  element.append(renderedData);
  // common render
  $R_common_obj.$_call(element);
  // update navtab status
  element.setAttribute(atr.load.state, '1');
}

const appendTable_zero = (element, text = 'No Data Found') => {
  const redData = $R_table_obj.$_zero(element.querySelectorAll('thead>tr>th').length, text);
  element.appendChild(redData);
  return true;
}

const appendChart_simple = (element, data, tag) => {
  // data with chart options.
  let xData = Option_charts.createDataset(data[tag]);

  if (!chartObject[tag]) {
    // initialize of the chart
    xData = Option_charts.buildingOptions(xData, get_thePathArr(), tag);
    chartObject[tag] = plugins.apexChart.$_manual(
      element.querySelector('#' + tag).querySelector('[data-pb-child="chart"]>div'),
      xData
    );
  }
  else {
    // data loading into chart
    plugins.apexChart.$_update(chartObject[tag], xData);
  }
}

const toggle_advance_search = (element, text = 'Advanced Search') => {
  let link = element.querySelector('[data-bs-toggle="collapse"]');

  link.addEventListener('click', function (e) {
    e.preventDefault();

    if (link.innerHTML === text) {
      link.innerHTML = "Hide " + text;
    }
    else {
      link.innerHTML = text;
    }
  })
}

const _report_table_head = (element, data, templateTag) => {
  element.innerHTML = HTMLProps(templateTag, data);
  return true;
}

const _form_submit_response = (response) => {
  if (response.status === 'success') {
    plg_sweetAlert.$_alert([response.title ?? 'Success', response.message],
      {
        confirm: [false, '', 'btn btn-light-primary rounded'],
      },
      [2, 5, 1500]);
    return true;
  }
  else {
    plg_sweetAlert.$_alert([response.title ?? 'Failed to Update', response.message, response.tip ?? undefined],
      {
        confirm: [true, 'Okay', 'btn btn-light-danger rounded'],
      },
      [4, 5]);
    return false;
  }
}

const _accordion_collapsed = (element) => {
  const targetEle = element.querySelector('.accordion');
  // console.log(targetEle);
  const collapseButtons = targetEle.querySelectorAll('[data-bs-toggle="collapse"]');

  collapseButtons.forEach(function (button) {

    // remove [collapse show] classes
    button.classList.remove('collapse', 'show');

    // add [collapsed] class
    button.classList.add('collapsed');

    targetEle.querySelector(button.getAttribute('data-bs-target')).classList.remove('show');
  });
}


// -----------------------------------------
// -----------------------------------------
// for export.
const $_form_validation = function (resolveFn, rejectFn, params) {
  return _form_validation(resolveFn, rejectFn, params);
}
/**
 * this will update things into menu.
 * @param element
 * @param event
 * @returns {Promise<boolean>|Promise<unknown>}
 */
const $_open_menu = function (element, event) {
  return _openMenu(element, event);
}
/**
 * this is used when we want to update event-value of the button.
 * triggered by any other button and we want to update the value of the button.
 * @param element
 * @param data
 */
const $_update_catch = function (element, data) {
  return _updateCatch(element, data);
}

const $_update_target = function (element, data) {
  return _updateTarget(element, data);
}

/**
 * it init the charts plugin and create the charts.
 * if the chart is already initialized then it will update the chart.
 * @param element HTML element
 * @param data data for the chart with keys, attribute: [data-pb-id].
 */
const $_create_charts = function (element, data) {
  return _createCharts(element, data);
}

/**
 * this will append the template into the element.
 * it also rendered with the data.
 * @param element
 * @param data
 * @param method
 */
const $_append_templates = function (element, data, method = exT.append.method.single) {
  return appendTemplates(element, data, method);
}

const $_append_direct = function (element) {
  return appendDirect(element);
}

const $_append_table_simple = function (tableEle, data, tag) {
  return appendTable_simple(tableEle, data, tag);
}

const $_append_table_zero = function (tableEle, text) {
  return appendTable_zero(tableEle, text);
}

const $_append_chart_simple = function (element, data, tag) {
  return appendChart_simple(element, data, tag);
}

const $_toggle_advance_search = function (element, data, tag) {
  return toggle_advance_search(element, data, tag);
}

const $_report_table_head = function (element, data, templateTag) {
  return _report_table_head(element, data, templateTag);
}

const $_form_submit_response = function (response) {
  return _form_submit_response(response);
}

const $_accordion_collapsed = function (element) {
  return _accordion_collapsed(element);
}

const PB_defined = {
  $_form_validation,
  $_open_menu,
  $_update_catch,
  $_update_target,
  $_create_charts,
  $_append_templates,
  $_append_direct,
  $_append_table_simple,
  $_append_table_zero,
  $_toggle_advance_search,
  $_report_table_head,
  $_form_submit_response,
  $_accordion_collapsed,
}

// Public methods
export default PB_defined;