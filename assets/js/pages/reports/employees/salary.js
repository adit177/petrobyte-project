import {get_action, get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {rdR, kws, exT, keys} from "../../../base/const.js";
import {atr} from "../../../base/attributes.js";
import {$R_table_obj, $R_form_obj, $R_common_obj} from "../../../base/render.js";
import {_tabLE} from "../../../base/elements.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import extend from "../../../extend/extend.js";
import {eTypes} from "../../../base/events.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4360',
};
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
    console.log(data);
    let _return = true;
    _return &&= _process_save_page_state(data.data);

    return _return;

  }

  const _process_save_page_state = (data) => {
    StateData = data['pageState'];
    return true;
  }

  return _process(data);
}
/**
 * preloaded data that will not change for this page
 */

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

const _tableFormation = function (data, table_tag) {
  // creating a profile for table.
  if (!data) {
    redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
    return true;
  }
  redData = $R_table_obj.$_simple(data, table_tag);

  // have look into plain HTML table
  //    console.log(redData);

  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);
}


const _table_filterEvents = (eventValue) => {
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

/**
 * load and append selects when user click on tab nav button.
 * @param element
 * @param event
 * @returns {AjaxPB||boolean}
 */
const tabsTarget = function (element, event) {

  if (element.hasAttribute(atr.load.form)) return Promise.resolve(true);

  // tabsTarget functions
  const tab_payroll = function (data) {

    console.log(data);

    Object.assign(combineData, data.data, StateData);

    $R_form_obj.$global(combineData, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_ledger = function (data) {

    Object.assign(combineData, data.data, StateData);

    $R_form_obj.$global(combineData, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_slip = function (data) {
    console.log(data);
    Object.assign(combineData, data.data, StateData);

    $R_form_obj.$global(combineData, element, rdR.form.method.simple);

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
      case pb.rpt.employees.salary.p.payroll:
        return tab_payroll(data);

      case pb.rpt.employees.salary.p.ledger:
        return tab_ledger(data);

      case pb.rpt.employees.salary.p.slip:
        return tab_slip(data);
    }
    return true;
  }


  console.log("calling ajax")
  return call_AJAX_GET({
    act : event.value,
    type: event.type,
  }, _process, false);
}

const reportsTarget = function (element, event, hybrid = false) {

  const report_payroll = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_salary_payroll(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      console.log(data);
      extend.foreign.$_remote(
        exT.foreign.combine,
        {...data, ...StateData},
        [
          ['table', 'months', 1, 0],
        ]
      );
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

    const _process_report_salary_payroll = (data) => {

      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      //        _table_filterEvents(event.value);

      return true;
    }

    // get target account id [customer id]
    event.data = hybrid ? event.data : formData.date_id;
    // get data into passable variable.
    let data = {};
    data = {...formData};


    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : event.data,
    }, formData, _process, false);//    event.data = formData.employee_id;

  }

  const report_ledger = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_salary_ledger(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_remote(
        kws.value.single,
        {...data, ...StateData},
        [
          ['table', 'dates', 2, 0],
          ['table', 'particulars', 3, 1],
          ['table', 'types', 4, 1],
          ['table', 'way', 1, 0],
        ]
      );
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

    const _process_report_salary_ledger = (data) => {

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


  const report_slip = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_salary_slip(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_remote(
        kws.value.single,
        {...data, ...StateData},
        [
          ['table', 'dates', 2, 0],
          ['table', 'items', 3, 1],
          ['table', 'employees', 1, 0],
        ]
      );
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

    const _process_report_salary_slip = (data) => {

      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      //        _table_filterEvents(event.value);

      return true;
    }

    // get target account id [customer id]

    event.data = hybrid ? event.data : formData.date_id;
    // get data into passable variable.
    let data = {};
    data = {...formData};


    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : event.data,
    }, formData, _process, false);
  }

  // collect the form and send it to the server.

  const common_exe = function () {
    // form for parameters

    formEle = _tabLE.action.querySelector('#form-' + event.value);
    //      formEle = _tabLE.action.querySelector('#form-' + event.value)
    formData = extend.collect.$_form_step(formEle);

    if (!formData) return false;

    // table for data loading
    tableEle = element.querySelector('table');
    filterEle = element.querySelector(querySA(atr.input.filter));

    return true;
  }
  //
  //  const exe = common_exe();
  //  if (!exe) return false;
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

  // checking that table is loaded or not.
  if (tableEle.getAttribute(atr.load.table) === '1') return true;

  switch (event.value) {
    case pb.rpt.employees.salary.p.payroll:
      return report_payroll(element, event);

    case pb.rpt.employees.salary.p.ledger:
      return report_ledger(element, event);

    case pb.rpt.employees.salary.p.slip:
      return report_slip(element, event);

  }
}
/**
 * it just transfers the request to tabsTarget.
 * @param element
 * @param event
 * @returns {AjaxPB|boolean}
 */
const tablesTarget = function (element, event) {
  console.log("ELEMENT", element)
  return reportsTarget(element, event, true);
}
const backsTarget = function (element, event) {
  // destroy the datatable
  // tableObject[button.value].clear().destroy();
  // tableObject[button.value].destroy();

  // empty the table body.
  const _tableEl = get_passedEl().querySelector('table');
  _tableEl.setAttribute(atr.load.table, '0');
  _tableEl.querySelector('tbody').remove();
  return true;
}

// Public methods
//

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
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

export const RES_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('RES_Requests', 'Request Type: ' + type);

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