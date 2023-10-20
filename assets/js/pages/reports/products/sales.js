import {get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, keys, kws, rdR} from "../../../base/const.js";
import {atr} from "../../../base/attributes.js";
import {$R_common_obj, $R_form_obj, $R_table_obj} from "../../../base/render.js";
import {_tabLE} from "../../../base/elements.js";
import extend from "../../../extend/extend.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {getStateData} from "../../../bucket/state.js";
import {eTypes} from "../../../base/events.js";

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4330',
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
    _return &&= _process_save_page_state(data);

    return _return;

  }

  const _process_save_page_state = (data) => {
    StateData = data['pageState'];
    return true;
  }

  return _process(data.data);
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

const _tableFormation = function (data, event) {

  console.log(data);
  redData = $R_table_obj.$_simple(data, event);

  // have look into plain HTML table
  console.log(redData);

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


// tabsTarget functions
const tab_category = function (element, data) {

  Object.assign(combineData, data, StateData);

  $R_form_obj.$global(combineData, element, rdR.form.method.selectOnly);

  element.setAttribute(atr.load.select, '1');
  return true;
}

const tab_item = function (element, data, event) {

  Object.assign(combineData, data, StateData);

  $R_form_obj.$global(combineData, element, rdR.form.method.selectOnly);

  element.setAttribute(atr.load.select, '1');
  return true;
}

const tab_customer = function (element, data, event) {

  Object.assign(combineData, data, StateData);

  $R_form_obj.$global(combineData, element, rdR.form.method.selectOnly);

  element.setAttribute(atr.load.select, '1');
  return true;
}

const tab_advance = function (element, data, event) {

  Object.assign(combineData, data, StateData);

  $R_form_obj.$global(combineData, element, rdR.form.method.selectOnly);

  element.setAttribute(atr.load.select, '1');
  return true;
}


/**
 * load and append selects when user click on tab nav button.
 * @param element
 * @param event
 * @returns {boolean}
 */
const tabsTarget = function (element, event) {

  if (element.hasAttribute(atr.load.select)) return Promise.resolve(true);

  const _process = (data) => {
    let _return = true;

    _return &&= _process_tab(data);

    return _return;
  }

  const _process_tab = (data) => {
    switch (event.value) {
      case pb.rpt.products.sales.p.category:
        return tab_category(element, data.data, event);

      case pb.rpt.products.sales.p.item:
        return tab_item(element, data.data, event);

      case pb.rpt.products.sales.p.customer:
        return tab_customer(element, data.data, event);

      case pb.rpt.products.sales.p.advance:
        return tab_advance(element, data.data, event);
    }
    return true;
  }
  return call_AJAX_GET({
    act : event.value,
    type: event.type,
  }, _process, false);
  //

}

const reportsTarget = function (element, event, hybrid = false) {

  const report_category = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_sale_category(data.data);

      return _return;
    }

    const _process_header_posting = (data) => {

      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "ledgers", "customer_id", 1],
        ["table", "dates", "date_id", 0],
        ["table", "items", "item_id", 1]
      ])

      //

      // render date
      let range = ['from', 'to'];
      let i = 0;
      console.log(data.account_detail.date_range);
      for (const dateRangeKey in data.account_detail.date_range) {
        const value = $R_common_obj.$_return(
          data.account_detail.date_range[dateRangeKey],
          rdR.common.methods.date,
          [rdR.common.params.date[dateRangeKey]]
        );
        range.splice(i, 1, value);
        i++;
      }
      data.account_detail.date_range = range.join(' to ');
      data.account_detail.closing_balance = $R_common_obj.$_return(
        data.account_detail.closing_balance,
        rdR.common.methods.currency,
        {
          sign: true
        }
      );
      const header = element.querySelector(querySA(atr.core.control, kws.value.header));
      console.log(header.innerHTML);
      header.innerHTML = extend.append.$_single_on_innerHTML(header, data.account_detail);


      return true;
    }

    const _process_report_sale_category = (data) => {

      // creating a profile for table.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }

      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      _table_filterEvents(event.value);

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

  const report_item = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_sale_item(data.data);

      return _return;
    }

    const _process_header_posting = (data) => {

      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "ledgers", "customer_id", 1],
        ["table", "dates", "date_id", 0],
        ["table", "items", "item_id", 1]
      ])

      console.log(data);

      //

      // render date
      let range = ['from', 'to'];
      let i = 0;
      console.log(data.account_detail.date_range);
      for (const dateRangeKey in data.account_detail.date_range) {
        const value = $R_common_obj.$_return(
          data.account_detail.date_range[dateRangeKey],
          rdR.common.methods.date,
          [rdR.common.params.date[dateRangeKey]]
        );
        range.splice(i, 1, value);
        i++;
      }
      data.account_detail.date_range = range.join(' to ');
      data.account_detail.closing_balance = $R_common_obj.$_return(
        data.account_detail.closing_balance,
        rdR.common.methods.currency,
        {
          sign: true
        }
      );
      const header = element.querySelector(querySA(atr.core.control, kws.value.header));
      console.log(header.innerHTML);
      header.innerHTML = extend.append.$_single_on_innerHTML(header, data.account_detail);


      return true;
    }

    const _process_report_sale_item = (data) => {

      // creating a profile for table.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }

      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      _table_filterEvents(event.value);

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


  const report_customer = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_sale_customer(data.data);

      return _return;
    }

    const _process_header_posting = (data) => {

      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "ledgers", "customer_id", 1],
        ["table", "dates", "date_id", 0],
      ])

      //

      // render date
      let range = ['from', 'to'];
      let i = 0;
      console.log(data.account_detail.date_range);
      for (const dateRangeKey in data.account_detail.date_range) {
        const value = $R_common_obj.$_return(
          data.account_detail.date_range[dateRangeKey],
          rdR.common.methods.date,
          [rdR.common.params.date[dateRangeKey]]
        );
        range.splice(i, 1, value);
        i++;
      }
      data.account_detail.date_range = range.join(' to ');
      data.account_detail.closing_balance = $R_common_obj.$_return(
        data.account_detail.closing_balance,
        rdR.common.methods.currency,
        {
          sign: true
        }
      );
      const header = element.querySelector(querySA(atr.core.control, kws.value.header));
      console.log(header.innerHTML);
      header.innerHTML = extend.append.$_single_on_innerHTML(header, data.account_detail);


      return true;
    }

    const _process_report_sale_customer = (data) => {

      // creating a profile for table.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }

      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      _table_filterEvents(event.value);

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


  const report_advance = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_sale_advance(data.data);

      return _return;
    }

    const _process_header_posting = (data) => {

      extend.foreign.$_remote(
        kws.value.single,
        {...data, ...StateData},
        [
          ['data', 'dates', 1, 0],
          ['data', 'items', 6, 1]
        ]
      );

      //

      // render date
      let range = ['from', 'to'];
      let i = 0;
      console.log(data.account_detail.date_range);
      for (const dateRangeKey in data.account_detail.date_range) {
        const value = $R_common_obj.$_return(
          data.account_detail.date_range[dateRangeKey],
          rdR.common.methods.date,
          [rdR.common.params.date[dateRangeKey]]
        );
        range.splice(i, 1, value);
        i++;
      }
      data.account_detail.date_range = range.join(' to ');
      data.account_detail.closing_balance = $R_common_obj.$_return(
        data.account_detail.closing_balance,
        rdR.common.methods.currency,
        {
          sign: true
        }
      );
      const header = element.querySelector(querySA(atr.core.control, kws.value.header));
      console.log(header.innerHTML);
      header.innerHTML = extend.append.$_single_on_innerHTML(header, data.account_detail);


      return true;
    }

    const _process_report_sale_advance = (data) => {

      // creating a profile for table.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }

      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      _table_filterEvents(event.value);

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
  // collect the form and send it to the server.

  const common_exe = function () {
    // form for parameters

    // formEle = _action.form;
    formEle = _tabLE.action.querySelector('#form-' + event.value)
    formData = extend.collect.$_form_step(formEle);

    if (!formData) return false;

    // table for data loading
    tableEle = element.querySelector('table');
    filterEle = element.querySelector('[' + atr.core.target + '="' + kws.value.filters + '"]');
    return true;
    // checking that table is loaded or not.
    //    if (tableEle.getAttribute(atr.load.table) === '1') return true;
  }

  //  common_exe();
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
  filterEle = element.querySelector(querySA(atr.input.filter));

  //  common_exe();
  if (tableEle.getAttribute(atr.load.table) === '1') return Promise.resolve(true);
  switch (event.value) {
    case pb.rpt.products.sales.p.category:
      return report_category(element, event);

    case pb.rpt.products.sales.p.item:
      return report_item(element, event);

    case pb.rpt.products.sales.p.customer:
      return report_customer(element, event);

    case pb.rpt.products.sales.p.advance:
      return report_advance(element, event);

  }
}
const tablesTarget = function (element, event) {
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

// Public methods

export const RPS_pageOpen = (data, type) => {
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


