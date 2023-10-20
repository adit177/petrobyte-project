import {get_callEl, get_thePathArr} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {rdR, kws} from "../../../base/const.js";
import extend from "../../../extend/extend.js";
import {$R_common_obj, $R_form_obj, $R_table_obj} from "../../../base/render.js";
import plugins from "../../../plugins/plugins.js";
import {_chatsLE, _reportLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import AjaxPB from "../../../base/ajax.js";
import Option_charts from "../../../options/apexcharts.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4340',
};
// Shared variables
let StateData, formData, redData;
let formEle, tableEle, filterEle, targetEle;
var xResponse, xData;
let tableObject = [];
let chartObject = [], select;


// Private functions

/**
 * loading list of account and render into form.
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
    _process_a(data);
    _process_b(data);

    return true
  }

  const _process_b = (data) => {
    redData = extend.foreign.$_remote('single', StateData, [['accounts', 'groups', 4, 1]]);
    let element = _reportLE.search.querySelector('form');
    const dataMerged = {...redData, ...StateData};
    //    $R_form_obj.$_run(rdR.form.method.selectOnly, dataMerged, element)
    $R_form_obj.$global(
      dataMerged,
      element,
      rdR.form.method.simple
    );
  }
  const _process_a = (data) => {
    StateData = data.pageState;
    console.log(StateData);
  }
  return _process(data.data);
}

const tableFormation = function (data) {
  const tBody = tableEle.querySelector("tbody");
  if (tBody) {
    tBody.remove();
  }


  console.log(data);
  // rendering data into table using above profile.
  //  redData = PB_render_table.$_simple(data, $R_table_obj.tableShapes, 'array');

  redData = $R_table_obj.$_simple(data, pb.rpt.accounts.statement.p.report);

  console.log(redData);

  // have look into plain HTML table
  //console.log(redData);

  tableEle.appendChild(redData)


  $R_common_obj.$_call(tableEle);

  KTMenu.init();

  // update table status
  //  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  //  $R_common_obj.$_call(tableEle);
  return true;
}

const load_stmt_search = function (element, event) {
  /*
   formEle = element.querySelector('form');
   extend.reset.formReset(formEle, 'load');
   */
  return true;
}
const load_stmt_report = function (element, event) {

  if (element.getAttribute(atr.load.tab) === '1') {

  }
  // run the process.
  formEle = _reportLE[event.place].querySelector('form');
  tableEle = element.querySelector('table');
  filterEle = element.querySelector('[' + atr.core.target + '="' + kws.value.filters + '"]');

  // collect form data
  formData = extend.collect.$_form_step(formEle);
  console.log(formData);
  if (formData.account_id === "") return false;


  const _process = (data) => {
    console.log(data);
    return _process_a(data)
  }
  const _process_a = (data) => {
    if (!data.status) {
      toastr.error(data.message, data.title);
      return false;
    }
    xData = data.data;

    // foreign id matching
    redData = extend.foreign.$_remote('single', xData,
      [
        ['statement', 'dates', 0, 0],
        ['statement', 'ledgers', 1, 0]
      ])

    console.log(redData);
    // shape = $R_table_obj.tableShapes;
    // option = $table.tableOptions;
    // method = $table.tableMethods;
    // profile = $table.tableParams;

    console.log(xData)
    tableFormation(redData.statement);

    return true;


  }
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : event.value,
    type   : event.type,
    account: formData.account_id,
  }, 'local', 0);
  ajax.callREQUEST(formData, urlID, true, _process);

  return ajax;

}
const load_stmt_summary = function (element, button) {
  navtab_stmt_summary(element, button);
}


const load_stmt_charts = function (element, button) {
  return navtab_stmt_charts(element, button);
}


const dataTablesInit = (eventValue) => {
  let DT_options = {};
  // create options
  const end = PB_option_datatables.optionKeys();
  end.forEach((i) => {
    if ($R_table_obj.tableOptions[i]) {
      DT_options[i] = PB_option_datatables.building(i, $R_table_obj.tableMethods[i], $R_table_obj.tableParams[i]);
    }
  })

  console.log(DT_options);

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


const filterEvents = (element, btnValue) => {
  element.querySelectorAll('select, input').forEach((value, key, parent) => {

    //let col = value.getAttribute('data-dt-column');

    switch (value.name) {
      case 'search':
        const regex = value.getAttribute('data-dt-regex') === '1';
        value.addEventListener('keyup', function (evt) {
          tableObject[btnValue].search(evt.target.value, regex).draw();
        })
        break;

      case 'select':
        value.addEventListener('change', function (evt) {
          var val = evt.target.value;
          if (val === 'all') val = '';
          tableObject[btnValue].column(evt.target.getAttribute('data-dt-column')).search(val).draw();
        })
        break;

      case 'clear':
        value.addEventListener('click', function (evt) {
          const iid = evt.target.getAttribute('data-pb-instance');
          console.log(iid);
          const fp = plg_datePicker.$_get(kws.labels.instance, iid)
          fp.clear();
          $.fn.dataTable.ext.search.push(function () { return true});
          tableObject[btnValue].draw();
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
          tableObject[btnValue].draw();
        })
        break;
    }
  })
}
const propertyDetails = (call) => {
  let tableProfile, profile, methods, options;
  switch (call) {
    case pb.rpt.accounts.statement.p.report:
      tableProfile = {


        // '8': {type: rdR.table.cell.act, method: 'c', value: '0', param: [], style: 100, css: ['pe-0 text-end', 100]},
      };
      methods = {
        0: 'minimal',
        1: 'minimal',
        2: 'basic',
        3: 'minimal',
        4: 'minimal',
        5: 'minimal',
      };
      options = {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
      };
      profile = {
        0: [],
        1: [],
        2: []
      };
      break;

  }
  return {
    table  : tableProfile,
    options: options,
    methods: methods,
    profile: profile
  };
}
const foreignMatch = function (param) {
  switch (param) {
    case 'high-transaction':
    case 'transaction-history':
      extend.foreign.$_remote('single', xResponse, [
        ['transaction', 'dates', 3, 0],
        ['transaction', 'type', 4, 0],
      ])
      break;
    default:
      break;
  }
  return true;
}
//here we render the data in cards
const renderHeader = function (element, button) {
  let headerEle = element.querySelectorAll('[data-pb-target]');

  headerEle.forEach((place) => {

    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act    : button.value,
    //      line   : button.name,
    //      account: "target"
    //    });
    //    ajax.callREQUEST({}, urlID, false);
    //    const responseX = ajax.getRESPONSE();
    //    console.log(responseX);

    let key = place.getAttribute('data-pb-target');
    console.log(xData[key])
    console.log(place.innerHTML)
    place.innerHTML = extend.append.$_single_on_innerHTML(place, xData[key]);

  });
}
const renderNode = function (element, button) {
  console.log("in render node");
  console.log(xData);
  element.querySelectorAll('[data-pb-template]').forEach((place, index) => {
    let targetKey = place.getAttribute('data-pb-template');
    console.log(targetKey);

    let rowData = xData[targetKey]
    console.log(rowData)
    let target = place.querySelector('div');

    if (!rowData) {
      return false;
    }
    foreignMatch(targetKey);

    for (let key in rowData.transaction) {
      let cloneNode = target.cloneNode(true);

      cloneNode.classList.remove('d-none');
      cloneNode.querySelectorAll('[data-pb-control]').forEach((ele, index) => {
        ele.removeAttribute(atr.status.formatted);
        ele.innerText = rowData.transaction[key][index + 1];

      })

      place.appendChild(cloneNode);
    }

    console.log(button)
  });
  console.log(element);
}
// navtabsTarget functions
const navtab_stmt_search = function (element, button) {

  // remove tabs attribute and content
  _reportLE.navtab.querySelectorAll('[role="tabpanel"]').forEach((tabEle) => {
    // -r attribute
    tabEle.removeAttribute(atr.load.tab);

    // -r content
    switch (tabEle.id) {
      case pb.rpt.accounts.statement.p.search:
        // reset the form.
        formEle = tabEle.querySelector('form')
        extend.reset.$_simple_form(formEle);
        break;

      case pb.rpt.accounts.statement.p.report:
        // remove the already fetched table data.
        if (tableObject.length !== 0) {
          tableObject[tabEle.id].clear().destroy();
        }
        // update the tab status
        _reportLE.report.removeAttribute(atr.load.tab);
        break;

      case pb.rpt.accounts.statement.p.summary:
        // empty cards --not required
        _reportLE.summary.removeAttribute(atr.load.tab);
        break;

      case pb.rpt.accounts.statement.p.charts:
        // destroy charts --not required
        _reportLE.charts.removeAttribute(atr.load.tab);
        break;
    }
  })
  return true;
}

const navtab_stmt_report = function (element, button) {
  console.log('i am reports, navtab. not in use.');
  return true;
}

const navtab_stmt_summary = function (element, button) {
  console.log(element);

  if (element.getAttribute(atr.load.tab) === '1') return true;


  const _process = (data) => {
    console.log(data);
    xResponse = data;
    let _return = true;

    _return &&= _process_aa(data.data);

    return _return;
  }

  const _process_aa = (data) => {
    xData = data;
    console.log(xData);

    renderHeader(element, button);
    renderNode(element, button);


    $R_common_obj.$_call(element);
    // finished.
    element.setAttribute(atr.load.tab, '1');
    return true;
  }


  const formEle = _reportLE.search.querySelector("form");
  formData = extend.collect.$_form_step(formEle);
  console.log(formData);
  console.log(formEle);

  // formData
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : button.value,
    type   : button.type,
    account: formData.account_id,
  });
  ajax.callREQUEST({formData}, urlID, true, _process);

  return ajax;

  //  xResponse = dummy_ajax_accounts_rpt.statement([button.value, button.type]);
  //  // if no data found from server in the requested account.
  //  if (!xResponse.status) {
  //    toastr.error(xResponse.message, xResponse.title);
  //    return false;
  //  }
  //  xData = xResponse.data;
  //
  //  console.log(xData)
  //
  //  // TODO: call the ajax here @balram
  //
  //  renderHeader(element, button);
  //  renderNode(element, button);
  //  //return action_stmt_c(element, button);
  //  $R_common_obj.$_call(element);
  //
  //  // finished.
  //  element.setAttribute(atr.load.tab, '1');
  //  return true;
}

const navtab_stmt_charts = function (element, button) {

  if (element.getAttribute(atr.load.tab) === '1') return true;

  // TODO: call the ajax here @balram -  a single call.
  //  xResponse = dummy_ajax_accounts_rpt.statement([pb.rpt.accounts.statement.p.charts, ''], []);
  //
  //  // if no data found from server in the requested account.
  //  if (!xResponse.status) {
  //    toastr.error(xResponse.message, xResponse.title);
  //    return false;
  //  }
  //  xData = xResponse.data;
  const debited = function (element, event) {
    const thePathArr = get_thePathArr();
    targetEle = element.getAttribute('id') === pb.rpt.accounts.statement.c.chart.debited_account
      ? element.querySelector('[data-pb-child="chart"]>div')
      : element.querySelector('#' + pb.rpt.accounts.statement.c.chart.debited_account).querySelector('[data-pb-child="chart"]>div');
    console.log(xData[pb.rpt.accounts.statement.c.chart.debited_account]);
    redData = Option_charts.createDataset(xData[pb.rpt.accounts.statement.c.chart.debited_account]);


    if (!chartObject[pb.rpt.accounts.statement.c.chart.debited_account]) {
      // initialize of the chart
      redData = Option_charts.buildingOptions(redData, thePathArr, pb.rpt.accounts.statement.c.chart.debited_account);
      chartObject[pb.rpt.accounts.statement.c.chart.debited_account] = plugins.apexChart.$_manual(targetEle, redData);
    }
    else {
      // data loading into chart
      plugins.apexChart.$_update(chartObject[pb.rpt.accounts.statement.c.chart.debited_account], redData);
    }

  }

  const credited = function (element, event) {
    const thePathArr = get_thePathArr();
    targetEle = element.getAttribute('id') === pb.rpt.accounts.statement.c.chart.credited_account
      ? element.querySelector('[data-pb-child="chart"]>div')
      : element.querySelector('#' + pb.rpt.accounts.statement.c.chart.credited_account).querySelector('[data-pb-child="chart"]>div');
    redData = Option_charts.createDataset(xData[pb.rpt.accounts.statement.c.chart.credited_account]);


    if (!chartObject[pb.rpt.accounts.statement.c.chart.credited_account]) {
      // initialize of the chart
      redData = Option_charts.buildingOptions(redData, thePathArr, pb.rpt.accounts.statement.c.chart.credited_account);
      chartObject[pb.rpt.accounts.statement.c.chart.credited_account] = plugins.apexChart.$_manual(targetEle, redData);
    }
    else {
      // data loading into chart
      plugins.apexChart.$_update(chartObject[pb.rpt.accounts.statement.c.chart.credited_account], redData);
    }
  }

  const balance = function (element, event) {
    const thePathArr = get_thePathArr();
    targetEle = element.getAttribute('id') === pb.rpt.accounts.statement.c.chart.balance
      ? element.querySelector('[data-pb-child="chart"]>div')
      : element.querySelector('#' + pb.rpt.accounts.statement.c.chart.balance).querySelector('[data-pb-child="chart"]>div');
    redData = Option_charts.createDataset(xData[pb.rpt.accounts.statement.c.chart.balance]);


    if (!chartObject[pb.rpt.accounts.statement.c.chart.balance]) {
      // initialize of the chart
      redData = Option_charts.buildingOptions(redData, thePathArr, pb.rpt.accounts.statement.c.chart.balance);
      chartObject[pb.rpt.accounts.statement.c.chart.balance] = plugins.apexChart.$_manual(targetEle, redData);
    }
    else {
      // data loading into chart
      plugins.apexChart.$_update(chartObject[pb.rpt.accounts.statement.c.chart.balance], redData);
    }

    // data loading into the table
    // todo @somesh due: render into table
    // todo @somesh due: append into element
  }

  const transaction = function (element, event) {
    const thePathArr = get_thePathArr();
    targetEle = element.getAttribute('id') === pb.rpt.accounts.statement.c.chart.transaction
      ? element.querySelector('[data-pb-child="chart"]>div')
      : element.querySelector('#' + pb.rpt.accounts.statement.c.chart.transaction).querySelector('[data-pb-child="chart"]>div');
    redData = Option_charts.createDataset(xData[pb.rpt.accounts.statement.c.chart.transaction]);


    if (!chartObject[pb.rpt.accounts.statement.c.chart.transaction]) {
      // initialize of the chart
      redData = Option_charts.buildingOptions(redData, thePathArr, pb.rpt.accounts.statement.c.chart.transaction);
      chartObject[pb.rpt.accounts.statement.c.chart.transaction] = plugins.apexChart.$_manual(targetEle, redData);
    }
    else {
      // data loading into chart
      plugins.apexChart.$_update(chartObject[pb.rpt.accounts.statement.c.chart.transaction], redData);
    }
  }
  /*
   // todo: use chartObject to store chart object, next time just update, do not need to init.
   get help from dashboard -> business. how to update next time at line 124.

   i have store chart object here chartObject[event.target]
   */
  //  let promise = plugins.plg_apexChart.Update_onCalling(chartObject[event.target], redData);

  //  debited(element, button);
  //  credited(element, button);
  //  balance(element, button);
  //  transaction(element, button);

  /*
   @todo balram
   pass the title into charts. while creating the charts profile.
   1. debited-accounts
   2. credited-accounts
   3. balance flow
   4. transaction
   */

  // finished.

  const _process = (data) => {
    console.log(data);
    let _return = true;
    xResponse = data;

    _return &&= _process_aa(data.data);

    return _return;
  }

  const _process_aa = (data) => {
    xData = data;

    debited(element, button);
    credited(element, button);
    balance(element, button);
    transaction(element, button);

    element.setAttribute(atr.load.tab, '1');
    return true;
  }


  const formEle = _reportLE.search.querySelector("form");
  formData = extend.collect.$_form_step(formEle);
  console.log(formData);
  console.log(formEle);

  // formData
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : button.value,
    type   : button.type,
    account: formData.account_id,
  });
  ajax.callREQUEST({formData}, urlID, true, _process);

  return ajax;
}

// switch function to route a right function for requested action.
const navtabsTarget = function (element, button) {
  switch (button.value) {
    case pb.rpt.accounts.statement.p.search:
      return navtab_stmt_search(element, button);

    case pb.rpt.accounts.statement.p.report:
      return navtab_stmt_report(element, button);

    case pb.rpt.accounts.statement.p.summary:
      return navtab_stmt_summary(element, button);

    case pb.rpt.accounts.statement.p.charts:
      return navtab_stmt_charts(element, button);
  }
}

const loadsTarget = function (element, button) {
  console.log(element, button);

  switch (button.value) {
    case pb.rpt.accounts.statement.p.search:
      return load_stmt_search(element, button);

    case pb.rpt.accounts.statement.p.report:
      return load_stmt_report(element, button);

    case pb.rpt.accounts.statement.p.summary:
      return load_stmt_summary(element, button);

    case pb.rpt.accounts.statement.p.charts:
      return load_stmt_charts(element, button);
  }
}

// Public methods


export const RAS_navtabs = function (_event) {
  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;
};
export const RAS_loads = function (_event) {
  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const RAS_pageOpen = function (data) {
  return pageOpen(data);
};

