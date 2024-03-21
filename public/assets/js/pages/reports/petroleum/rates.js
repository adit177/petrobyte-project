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
let StateData, formData, redData;
let formEle, tableEle, filterEle;
let tableObject = [];


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
    let _return = true;
    _return &&= _process_save_page_state(data);
    return _return;

  }

  const _process_save_page_state = (data) => {
    StateData = data['pageState'];
    console.log(StateData);
    return true;
  }

  return _process(data.data);
}
/**
 * preloaded data that will not change for this page
 */


      // get list of all contacts

const dataTablesInit = (eventValue) => {

        let DT_options = {};

        // create options
        const end = PB_option_datatables.optionKeys();
        end.forEach((i) => {
          if ($R_table_obj.tableOptions[i]) {
            DT_options[i] = PB_option_datatables.building(i, $R_table_obj.tableMethods[i], $R_table_obj.tableParams[i]);
          }
        })

        let optionsObj = {};
        Object.entries(DT_options).forEach(([key, value]) => {
          optionsObj = {...optionsObj, ...value}
        })

        // console.log(optionsObj);

        // Init datatable --- more info on datatables: https://datatables.net/manual/
        tableObject[eventValue] = plg_dataTables.$_manual(tableEle, optionsObj, 'new');

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        /*
         tableObject[_RG_SAMP_A].on('draw', function () {
         console.log('i am call at the time of re-inti.')
         });
         */
      }

const __tableFormation = function (data, event) {
  // creating a profile for table.
  if (!data) {
    redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
    return true;
  }

  redData = $R_table_obj.$_simple(data, event);

  // have a look into plain HTML table
  // console.log(redData);

  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);
}


const filterEvents = (eventValue) => {
  filterEle.querySelectorAll('select, input').forEach((value) => {

    //let col = value.getAttribute('data-dt-column');

    switch (value.name) {
      case 'search':
        const regex = value.getAttribute('data-dt-regex') === '1';
        value.addEventListener('keyup', function (evt) {
          tableObject[eventValue].search(evt.target.value, regex).draw();
        })
        break;

      case 'select':
        value.addEventListener('change', function (evt) {
          var val = evt.target.value;
          if (val === 'all') val = '';
          tableObject[eventValue].column(evt.target.getAttribute('data-dt-column')).search(val).draw();
        })
        break;

      case 'clear':
        value.addEventListener('click', function (evt) {
          const iid = evt.target.getAttribute('data-pb-instance');
          console.log(iid);
          const fp = plg_datePicker.$_get(kws.labels.instance, iid)
          fp.clear();
          $.fn.dataTable.ext.search.push(function () { return true});
          tableObject[eventValue].draw();
        })
        break;

      case 'date':
        value.addEventListener('change', function (evt) {
          let dates;
          var val = evt.target.value;
          if (!val.includes(' to ')) {
            return;
          }
          else {
            //dates = val.split(' to ');
          }
          dates = plg_datePicker.$_get(kws.labels.value)[0];
          let min = moment(dates[0]).format('YYYY-MM-DD');
          let max = moment(dates[1]).format('YYYY-MM-DD');
          $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
              let date = moment(data[evt.target.getAttribute('data-dt-column')]).format('YYYY-MM-DD');
              //console.log(date);
              //console.log(min, max);
              return (min === null && max === null) ||
                (min === null && date <= max) ||
                (min <= date && max === null) ||
                (min <= date && date <= max);
            }
          );
          tableObject[eventValue].draw();
        })
        break;
    }
  })
}

const tabsTarget = function (element, event) {

  if (element.hasAttribute(atr.load.form)) return Promise.resolve(true);

  const tab_rate_simple = function (data) {
    console.log("data inside tab rate simple", data)

    $R_form_obj.$global(data, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_rate_difference = function (data) {
    console.log("getting form ready");

    $R_form_obj.$global(data, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_rate_valuation = function (data) {

    $R_form_obj.$global(data, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_rate_advance = function (data) {

    $R_form_obj.$global(data, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const _process = (data) => {
    let _return = true;

    _return &&= _process_tab(data.data);

    return _return;
  }

  const _process_tab = (data) => {
    console.log("process tavb", data);
    switch (event.value) {
      case pb.rpt.petroleum.rates.p.simple:
        return tab_rate_simple(data);

      case pb.rpt.petroleum.rates.p.difference:
        return tab_rate_difference(data);

      case pb.rpt.petroleum.rates.p.valuation:
        return tab_rate_valuation(data);

      case pb.rpt.petroleum.rates.p.advance:
        return tab_rate_advance(data);
    }
    return true;
  }
  return call_AJAX_GET({
    act : event.value,
    type: event.type,
  }, _process, false);

}
// tabsTarget functions

/**
 * load and append selects when user click on tab nav button.
 * @param element
 * @param event
 * @returns {boolean}
 */


const reportsTarget = function (element, event, hybrid = false) {

  const report_rate_simple = function (element, event) {

    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_only_rates(data.data);

      return _return;
    }
    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "dates", "date_id", 0],
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

      console.log(element);
      const header = element.querySelector(`#${headKey}`);
      header.innerHTML = extend.append.$_single_on_innerHTML(headerTemplate, ac);

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = ac.name;

      return true;
    }

    const _process_report_only_rates = (data) => {
      console.log(data);
      if (!data) {
        let redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }

      const redData = $R_table_obj.$advance_new(data.headers, data.table, tableEle,
        [["items", 0]], pb.rpt.petroleum.rates.p.simple);

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


  const report_rate_difference = function (element, event) {

    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_rate_with_variation(data.data);

      return _return;
    }
    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "dates", "date_id", 0],
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

    const _process_report_rate_with_variation = (data) => {
      if (!data) {
        let redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }

      const redData = $R_table_obj.$advance_new(data.headers, data.table, tableEle,
        [["items", 0]], pb.rpt.petroleum.rates.p.difference);

      tableEle.appendChild(redData);

      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);
      return true;

    }


    //    let data = {};
    //    data = {...formData};
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


  const report_rate_advance = function (element, event) {
    const _process = (data) => {
      console.log(data);
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_with_stock_value(data.data);

      return _return;
    }
    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "dates", "date_id", 0],
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
    const _process_report_with_stock_value = (data) => {
      __tableFormation(data.table, event.value);
      return true;
    }
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


  const report_rate_valuation = function (element, event) {

    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_report_rate_with_valuation(data.data);

      return _return;
    }


    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "dates", "date_id", 0],
      ])
      console.log(data);
      return true;
    }

    const _process_report_rate_with_valuation = (data) => {
      if (!data) {
        let redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }

      const redData = $R_table_obj.$advance_new(data.headers, data.table, tableEle,
        [["items", 0]], pb.rpt.petroleum.rates.p.valuation);

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
    // form for parameters

    // formEle = _tabLE.action.querySelector('#form-' + event.value);
    formEle = get_action().form;

    // check validation and do
    formData = extend.collect.$_form_step(formEle);

    if (!formData) return false;

    console.log(formData);

    // table for data loading
    tableEle = element.querySelector('table');
    filterEle = element.querySelector(querySA(atr.input.filter));
    return true;
  }
  //  const exe = common_exe();
  //  if (!exe) return false;
  //
  //  // checking that table is loaded or not.
  //  if (tableEle.getAttribute(atr.load.table) === '1') return true;
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
    case pb.rpt.petroleum.rates.p.simple:
      return report_rate_simple(element, event);
    case pb.rpt.petroleum.rates.p.difference:
      return report_rate_difference(element, event);
    case pb.rpt.petroleum.rates.p.advance:
      return report_rate_advance(element, event);
    case pb.rpt.petroleum.rates.p.valuation:
      return report_rate_valuation(element, event);

  }
}
const tablesTarget = function (element, event) {
  return reportsTarget(element, event, true);
}
const backsTarget = function (element, event) {
  /*
   // destroy the datatable
   tableObject[button.value].clear().destroy();
   tableObject[button.value].destroy();
   */

  // empty the table body.
  const _tableEl = get_passedEl().querySelector('table');

  const els = _tableEl.querySelector("thead tr")
  els.querySelectorAll("[is-dynamic-header='1']").forEach((el) => {
    console.log(el);
    el.remove();
  })


  console.log(_tableEl);

  console.log(_tableEl);
  // setting the status = 0 for the table
  _tableEl.setAttribute(atr.load.table, '0');
  // remove the previous account data from table.

  _tableEl.querySelector('tbody').remove();
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

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
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

export const RPR_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('RPR_Requests', 'Request Type: ' + type);

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
