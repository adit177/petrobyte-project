import {get_action, get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR, kws, deF, plg, CLS, Lyt, otR, sD, glob, STYLE} from "../../../base/const.js";
import AjaxPB from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import extend from "../../../extend/extend.js";
import {$R_form_obj, $R_table_obj, $R_common_obj} from "../../../base/render.js";
import {_tabLE} from "../../../base/elements.js";
import {getStateData} from "../../../bucket/state.js"
import ajax from "../../../base/ajax.js";


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

  if (element.getAttribute(atr.load.form) == 1) return true;

  const tab_quick = function (data) {
    console.log(data);

    $R_form_obj.$global(data, element, rdR.form.method.simple);

    element.setAttribute(atr.load.form, '1');
    return true;
  }

  const tab_standard = function () {
    return true;
  }

  const tab_advance = function (data) {
    return true;
  }

  const tab_collection = function (data) {

    const _process = (ajaxData) => {
      $R_form_obj.$global({...data, ...ajaxData.data}, element, rdR.form.method.simple);

      element.setAttribute(atr.load.form, '1');
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    });
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }

  const _process = (data) => {
    let _return = true;

    _return &&= _process_tab(data.data);

    return _return;
  }

  const _process_tab = (data) => {
    switch (event.value) {
      case pb.rpt.petroleum.summary.p.quick:
        return tab_quick({
          slotting: {
            "1": [1, "Morning Shift"],
            "2": [2, "Day Shift"],
            "3": [3, "Evening Shift"]
          }
        });

      case pb.rpt.petroleum.summary.p.standard:
        return tab_standard();

      case pb.rpt.petroleum.summary.p.advance:
        return tab_advance({});

      case pb.rpt.petroleum.summary.p.collection:
        return tab_collection({employees: getStateData().employees});
    }
    return true;
  }

  return _process_tab();


  //  const ajax = new AjaxPB();
  //  const urlID = ajax.buildingURL([], {
  //    act : event.value,
  //    type: event.type,
  //  }, 'local', 0);
  //  ajax.callREQUEST({}, urlID, false, _process);
  //
  //  return ajax;
}

const reportsTarget = function (element, event) {

  const report_quick = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_summary_quick(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "dates", "shift_date_id", 0],
        ["table", "employees", "created_by", 1],
        ["table", "shift_slots", "shift_slot_id", 1],
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

    const _process_report_summary_quick = (data) => {

      // basic HTMl table rendering
      __tableFormation(data.table, event.value);


      $("#quick_summary_table").DataTable();

      /*
       // enable database plugins
       dataTablesInit(event.value);

       // enable filters for the table
       _table_filterEvents(event.value);
       */

      return true;
    }

    // get a target account id
    // get data into passable variable.
    let data = {};
    data = {...formData};

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST(data, urlID, true, _process);

    return ajax;
  }

  const report_standard = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_summary_standard(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data.table, ...getStateData()}, [
        ["parent", "shift_slots", "slot_id", 1],
        ["parent", "dates", "date_id", 0],
        ["parent", "employees", "created_by", 1],
        ["child", "items", "item_id", 1],
      ])
      console.log(data);
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

    const _process_report_summary_standard = (data) => {
      // creating a profile for table.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }
      //    console.log(data);
      redData = $R_table_obj.$_nested(data.table, pb.rpt.petroleum.summary.p.standard,
        ["Item", "Rate", "Gross Quantity", "Testing Quantity", "Net Sale", "Sale Amount", "Status"]);

      // have look into plain HTML table
      //    console.log(redData);

      tableEle.appendChild(redData)

      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);

      // dataTablesInit(event.value);

      //        _table_filterEvents(event.value);

      return true;
    }

    // get target account id [customer id]
    // get data into passable variable.
    let data = {};
    data = {...formData};

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST(data, urlID, true, _process);

    return ajax;
  }

  const report_advance = function (element, event) {
    const _process = (data) => {
      console.log(data);
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      //      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_summary_advance(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data.table, ...getStateData()}, [
        ["parent", "dates", "date_id", 0],
        ["parent", "employees", "created_by", 1],
        ["child", "items", "item_id", 1],
        ["parent", "shift_slots", "slot_id", 1],
      ])
      console.log(data);
      return true;
    }

    const _process_report_summary_advance = (data) => {
      // creating a profile for table.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }
      //    console.log(data);
      redData = $R_table_obj.$_nested(data.table, pb.rpt.petroleum.summary.p.advance,
        ["Item", "Rate", "Quantity", "Test", "Amount", "Cash", "Credit", "Card", "Sort"]);

      // have look into plain HTML table
      //    console.log(redData);

      tableEle.appendChild(redData)

      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);

      // dataTablesInit(event.value);

      //        _table_filterEvents(event.value);

      return true;
    }

    // get target account id [customer id]
    event.data = formData.advance_id;
    // get data into passable variable.
    let data = {};
    data = {...formData};

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST(data, urlID, true, _process);

    return ajax;
  }

  const report_collection = function (element, event) {
    const _process = (data) => {
      console.log(data);
      let _return = true;

      _return &&= _process_key_value_match(data.data);
      _return &&= _process_header_posting(data.data);
      _return &&= _process_report_summary_advance(data.data);

      return _return;
    }

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data.table, ...getStateData()}, [
        ["parent", "shift_slots", "shift_slot_id", 1],
        ["parent", "dates", "date_id", 0],
        ["child", "ledgers", "ledger_id", 1],
        ["parent", "employees", "employee_id", 1]
      ])
      console.log(data);
      return true;
    }
    const _process_header_posting = (data) => {
      let ac = data['account_detail'];
      // render date
      let range = ['from', 'to'];
      let i = 0;
      console.log(ac.date_range);
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

    const _process_report_summary_advance = (data) => {
      // creating a profile for table.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        return true;
      }
      //    console.log(data);
      redData = $R_table_obj.$_nested(data.table, pb.rpt.petroleum.summary.p.collection,
        ["Ledger", "Amount", "Note", "Nature", "Status"]);

      // have look into plain HTML table
      //    console.log(redData);

      tableEle.appendChild(redData)

      // update table status
      tableEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(tableEle);

      // dataTablesInit(event.value);

      //        _table_filterEvents(event.value);

      return true;
    }

    let data = {};
    data = {...formData};

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST(data, urlID, true, _process);

    return ajax;
  }

  // collect the form and send it to the server.
  const common_exe = function () {
    // form for parameters

    // formEle = _tabLE.action.querySelector('#form-' + event.value);
    formEle = get_action().form;

    console.log(formEle);

    // check validation and do
    formData = extend.collect.$_form_step(formEle);

    console.log(formData);

    if (!formData) return false;

    // table for data loading
    tableEle = element.querySelector('table');
    filterEle = element.querySelector(querySA(atr.input.filter));
    return true;
  }

  const exe = common_exe();
  if (!exe) return false;

  // checking that table is loaded or not.
  if (tableEle.getAttribute(atr.load.table) === '1') return true;

  switch (event.value) {
    case pb.rpt.petroleum.summary.p.quick:
      return report_quick(element, event);

    case pb.rpt.petroleum.summary.p.standard:
      return report_standard(element, event);

    case pb.rpt.petroleum.summary.p.advance:
      return report_advance(element, event);

    case pb.rpt.petroleum.summary.p.collection:
      return report_collection(element, event);

  }
}

/**
 * it just transfers the request to tabsTarget.
 * @param element
 * @param event
 * @returns {AjaxPB|boolean}
 */
const tablesTarget = function (element, event) {
  return tabsTarget(element, event);
}
const backsTarget = function (element, event) {
  /*
   // destroy the datatable
   tableObject[button.value].clear().destroy();
   tableObject[button.value].destroy();
   */

  // empty the table body.
  const _tableEl = get_passedEl().querySelector('table');
  // setting the status = 0 for the table
  _tableEl.setAttribute(atr.load.table, '0');
  // remove the previous account data from table.
  _tableEl.querySelector('tbody').remove();
  return true;
}


export const RPY_tabs = function (_event) {
  return eleCheck() ? tabsTarget(get_callEl(), _event) : false;
};
export const RPY_reports = function (_event) {
  return eleCheck() ? reportsTarget(get_callEl(), _event) : false;
};
export const RPY_tables = function (_event) {
  return eleCheck() ? tablesTarget(get_callEl(), _event) : false;
};
export const RPY_backs = function (_event) {
  return eleCheck() ? backsTarget(get_callEl(), _event) : false;
};

// fetching all basic required details


// fetching all upcoming required details
export const RPY_Requests = function (data) {
  return pageOpen(data);
};

