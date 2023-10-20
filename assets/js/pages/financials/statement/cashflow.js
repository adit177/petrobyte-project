import {_tableLE} from "../../../base/elements.js";
import pb from "../../../base/structure.js";
import {atr} from "../../../base/attributes.js";
import {$R_table_obj, $R_common_obj} from "../../../base/render.js";

import {set_callEl, set_passedEl, get_callEl} from "../../../base/global.js";
import AjaxPB from "../../../base/ajax.js";
import extend from "../../../extend/extend.js";
import {CLS} from "../../../base/const.js";

// Class definition
var fun = function () {

  const host = {
    server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
    local : 'http://localhost:4540',
  };
  // Shared variables
  let StateData, formData, redData;
  let formEle, tableEle, filterEle, targetEle;
  var xResponse, xData;
  let tableObject = [];
  let chartObject = [], select;
  const pageData = {
    "months" : {},
    "days"   : {},
    "dayInfo": {},
  };


  let userState = [
    {
      zone   : "years",
      subZone: "table",
      id     : ""
    }
  ];
  let curStateIdx = 0;


  const upate_table_classes = (zone, id_prefix, event) => {
    console.log(event.data);
    const table = _tableLE[zone].querySelector("#" + id_prefix + "_" + event.data);
    if (table) {
      _tableLE[zone].querySelector(`#${zone}-table`).children.forEach((child) => {
        const id = id_prefix + "_" + event.data;
        if (child.id === id) {
          child.classList.remove("d-none");
        }
        else {
          child.classList.add("d-none");
        }
      })
      return true;
    }
    else {
      _tableLE[zone].querySelector(`#${zone}-table`).children.forEach((child) => {
        child.classList.add("d-none");
      })
      return false;
    }
  }


  const tableFormation = function (data, tableEle, profile) {
    const tbody = tableEle.querySelector('tbody');
    if (tbody) {
      tbody.remove();
    }

    console.log(tableEle);
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
      return true;
    }

    redData = $R_table_obj.$_simple(data, profile);

    console.log(redData);

    tableEle.appendChild(redData)

    tableEle.setAttribute(atr.load.table, '1');

    $R_common_obj.$_call(tableEle);

    return true;

  }

  // Private functions

  /**
   * preloaded data that will be same for this page
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
      _process_a(data.data);
      _process_b(data.data);
      return true;
    }

    const _process_a = (data) => {
      StateData = data.pageState;
      return true;
    }

    const _process_b = (data) => {
      tableFormation(StateData.table, _tableLE.sea.querySelector("table"), pb.rpt.accounts.lists.p.masters)
      _tableLE.sea.querySelector("table").querySelectorAll('[data-pb-catch]').forEach((el) => {
        el.setAttribute("value", "months");
        el.setAttribute(atr.event.origin, `years-table`);
      })
      return true;
      // what your want to process on page load.
    }

    return _process(data);
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
    if (!formData) return false;


    const _process = (data) => {
      _process_a(data)
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

      //      

      // shape = $R_table_obj.tableShapes;
      // option = $table.tableOptions;
      // method = $table.tableMethods;
      // profile = $table.tableParams;

      console.log(xData)
      tableFormation();


    }
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

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
      case pb.fin.statement.cashflow.p.report:
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

      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act    : button.value,
        line   : button.name,
        account: "target"
      });
      ajax.callREQUEST({}, urlID, false);
      const responseX = ajax.getRESPONSE();
      console.log(responseX);

      let key = place.getAttribute('data-pb-target');
      console.log(xData[key])
      console.log(place.innerHTML)
      place.innerHTML = extend.append.$_single_on_innerHTML(place, xData[key]);

    });
  }
  const renderNode = function (element, button) {

    element.querySelectorAll('[data-pb-template]').forEach((place, index) => {
      let targetKey = place.getAttribute('data-pb-template');
      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act    : button.value,
        line   : button.name,
        account: targetKey
      });
      ajax.callREQUEST({}, urlID, false);
      const responseX = ajax.getRESPONSE();
      console.log(responseX);

      //xResponse = dummy_ajax_accounts_rpt.statement([button.value, button.name], [param]);
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
        case pb.fin.statement.cashflow.p.search:
          // reset the form.
          formEle = tabEle.querySelector('form')
          extend.reset.$_simple_form(formEle);
          break;

        case pb.fin.statement.cashflow.p.report:
          // remove the already fetched table data.
          if (tableObject.length !== 0) {
            tableObject[tabEle.id].clear().destroy();
          }
          // update the tab status
          _reportLE.report.removeAttribute(atr.load.tab);
          break;

        case pb.fin.statement.cashflow.p.summary:
          // empty cards --not required
          _reportLE.summary.removeAttribute(atr.load.tab);
          break;

        case pb.fin.statement.cashflow.p.charts:
          // destroy charts --not required
          _reportLE.charts.removeAttribute(atr.load.tab);
          break;
      }
    })
    return true;
  }

  const navtab_stmt_report = function (element, button) {
    console.log('i am reports, navtab. not in use.');
  }

  const navtab_stmt_summary = function (element, button) {
    if (element.hasAttribute(atr.load.tab) === '1') return true;
    // formData
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : button.value,
      type: button.type
    });
    ajax.callREQUEST({thePathArr}, urlID, false);


    xResponse = dummy_ajax_accounts_rpt.statement([button.value, button.type]);
    // if no data found from server in the requested account.
    if (!xResponse.status) {
      toastr.error(xResponse.message, xResponse.title);
      return false;
    }
    xData = xResponse.data;

    console.log(xData)

    // TODO: call the ajax here @balram

    renderHeader(element, button);
    renderNode(element, button);
    //return action_stmt_c(element, button);
    $R_common_obj.$_call(element);

    // finished.
    element.setAttribute(atr.load.tab, '1');
    return true;
  }

  const navtab_stmt_charts = function (element, button) {

    if (element.hasAttribute(atr.load.tab) === '1') return true;

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : pb.fin.statement.cashflow.p.charts,
      type: ''
    });
    ajax.callREQUEST({thePathArr}, urlID, false);


    // TODO: call the ajax here @balram -  a single call.
    xResponse = dummy_ajax_accounts_rpt.statement([pb.fin.statement.cashflow.p.charts, ''], []);

    // if no data found from server in the requested account.
    if (!xResponse.status) {
      toastr.error(xResponse.message, xResponse.title);
      return false;
    }
    xData = xResponse.data;
    const debited = function (element, event) {
      targetEle = element.getAttribute('id') === pb.fin.statement.cashflow.c.chart.debited_account
        ? element.querySelector('[data-pb-child="chart"]>div')
        : element.querySelector('#' + pb.fin.statement.cashflow.c.chart.debited_account).querySelector('[data-pb-child="chart"]>div');
      redData = Option_charts.createDataset(xData[pb.fin.statement.cashflow.c.chart.debited_account]);


      if (!chartObject[pb.fin.statement.cashflow.c.chart.debited_account]) {
        // initialize of the chart
        redData = Option_charts.buildingOptions(redData, thePathArr, pb.fin.statement.cashflow.c.chart.debited_account);
        chartObject[pb.fin.statement.cashflow.c.chart.debited_account] = plg_apexChart.$_manual(targetEle, redData);
      }
      else {
        // data loading into chart
        plg_apexChart.$_update(chartObject[pb.fin.statement.cashflow.c.chart.debited_account], redData);
      }

    }

    const credited = function (element, event) {
      targetEle = element.getAttribute('id') === pb.fin.statement.cashflow.c.chart.credited_account
        ? element.querySelector('[data-pb-child="chart"]>div')
        : element.querySelector('#' + pb.fin.statement.cashflow.c.chart.credited_account).querySelector('[data-pb-child="chart"]>div');
      redData = Option_charts.createDataset(xData[pb.fin.statement.cashflow.c.chart.credited_account]);


      if (!chartObject[pb.fin.statement.cashflow.c.chart.credited_account]) {
        // initialize of the chart
        redData = Option_charts.buildingOptions(redData, thePathArr, pb.fin.statement.cashflow.c.chart.credited_account);
        chartObject[pb.fin.statement.cashflow.c.chart.credited_account] = plg_apexChart.$_manual(targetEle, redData);
      }
      else {
        // data loading into chart
        plg_apexChart.$_update(chartObject[pb.fin.statement.cashflow.c.chart.credited_account], redData);
      }
    }

    const balance = function (element, event) {
      targetEle = element.getAttribute('id') === pb.fin.statement.cashflow.c.chart.balance
        ? element.querySelector('[data-pb-child="chart"]>div')
        : element.querySelector('#' + pb.fin.statement.cashflow.c.chart.balance).querySelector('[data-pb-child="chart"]>div');
      redData = Option_charts.createDataset(xData[pb.fin.statement.cashflow.c.chart.balance]);


      if (!chartObject[pb.fin.statement.cashflow.c.chart.balance]) {
        // initialize of the chart
        redData = Option_charts.buildingOptions(redData, thePathArr, pb.fin.statement.cashflow.c.chart.balance);
        chartObject[pb.fin.statement.cashflow.c.chart.balance] = plg_apexChart.$_manual(targetEle, redData);
      }
      else {
        // data loading into chart
        plg_apexChart.$_update(chartObject[pb.fin.statement.cashflow.c.chart.balance], redData);
      }

      // data loading into the table
      // todo @somesh due: render into table
      // todo @somesh due: append into element
    }

    const transaction = function (element, event) {
      targetEle = element.getAttribute('id') === pb.fin.statement.cashflow.c.chart.transaction
        ? element.querySelector('[data-pb-child="chart"]>div')
        : element.querySelector('#' + pb.fin.statement.cashflow.c.chart.transaction).querySelector('[data-pb-child="chart"]>div');
      redData = Option_charts.createDataset(xData[pb.fin.statement.cashflow.c.chart.transaction]);


      if (!chartObject[pb.fin.statement.cashflow.c.chart.transaction]) {
        // initialize of the chart
        redData = Option_charts.buildingOptions(redData, thePathArr, pb.fin.statement.cashflow.c.chart.transaction);
        chartObject[pb.fin.statement.cashflow.c.chart.transaction] = plg_apexChart.$_manual(targetEle, redData);
      }
      else {
        // data loading into chart
        plg_apexChart.$_update(chartObject[pb.fin.statement.cashflow.c.chart.transaction], redData);
      }
    }
    /*
     // todo: use chartObject to store chart object, next time just update, do not need to init.
     get help from dashboard -> business. how to update next time at line 124.
     let promise = Plug_apexChart.Update_onCalling(chartObject[event.target], redData);

     i have store chart object here chartObject[event.target]
     */

    debited(element, button);
    credited(element, button);
    balance(element, button);
    transaction(element, button);

    /*
     @todo balram
     pass the title into charts. while creating the charts profile.
     1. debited-accounts
     2. credited-accounts
     3. balance flow
     4. transaction
     */

    // finished.
    element.setAttribute(atr.load.tab, '1');
    return true;
  }

  // switch function to route a right function for requested action.
  const navtabsTarget = function (element, button) {
    switch (button.value) {
      case pb.fin.statement.cashflow.p.search:
        return navtab_stmt_search(element, button);

      case pb.fin.statement.cashflow.p.report:
        return navtab_stmt_report(element, button);

      case pb.fin.statement.cashflow.p.summary:
        return navtab_stmt_summary(element, button);

      case pb.fin.statement.cashflow.p.charts:
        return navtab_stmt_charts(element, button);
    }
  }

  const loadsTarget = function (element, button) {
    switch (button.value) {
      case pb.fin.statement.cashflow.p.search:
        return load_stmt_search(element, button);

      case pb.fin.statement.cashflow.p.report:
        return load_stmt_report(element, button);

      case pb.fin.statement.cashflow.p.summary:
        return load_stmt_summary(element, button);

      case pb.fin.statement.cashflow.p.charts:
        return load_stmt_charts(element, button);
    }
  }

  const tablesTarget = (element, event) => {


    const monthsTable = () => {
      const _process = (data) => {
        let _return = true;

        _return &&= _process_aa(data.data);

        return _return;
      }

      const _process_aa = (data) => {
        pageData.months[event.data] = data;
        tableFormation(data.table, element.querySelector("table"),
          pb.fin.statement.cashflow.p.months);
        _tableLE.lake.querySelector("table").querySelectorAll('[data-pb-catch]').forEach((el) => {
          el.setAttribute("value", "days");
          el.setAttribute(atr.event.origin, `months-table`);
        })
        return true;
      }

      if (pageData.months[event.data]) {
        return _process_aa(pageData.months[event.data]);
      }

      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type,
        id  : event.data
      });
      ajax.callREQUEST({}, urlID, false, _process);
      return ajax;
    }

    const daysTable = () => {
      const _process = (data) => {
        let _return = true;

        _return &&= _process_aa(data.data);

        return _return;
      }

      const _process_aa = (data) => {
        pageData.days[event.data] = data;
        tableFormation(data.table, element.querySelector("table"),
          pb.fin.statement.cashflow.p.days);
        _tableLE.river.querySelector("table").querySelectorAll('[data-pb-catch]').forEach((el) => {
          console.log(el);
          el.setAttribute("value", "dayInfo");
          el.setAttribute(atr.event.origin, `days-table`);
        })
        return true;
      }

      if (pageData.days[event.data]) {
        return _process_aa(pageData.days[event.data]);
      }

      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type,
        id  : event.data
      });
      ajax.callREQUEST({}, urlID, false, _process);
      return ajax;

    }

    const dayInfoTable = () => {

      console.log("calling dayInfo")
      const _process = (data) => {
        let _return = true;

        console.log(data);


        _return &&= _process_aa(data.data);

        return _return;
      }

      const _process_aa = (data) => {
        pageData.dayInfo[event.data] = data;

        console.log(data);


        tableFormation(data.table, element.querySelector("table"),
          pb.fin.statement.cashflow.p.dayInfo);

        return true;
      }

      if (pageData.dayInfo[event.data]) {
        return _process_aa(pageData.dayInfo[event.data]);
      }

      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type,
        id  : event.data
      });
      ajax.callREQUEST({}, urlID, false, _process);
      return ajax;
    }

    function swap(json) {
      var ret = {};
      for (var key in json) {
        ret[json[key]] = key;
      }
      return ret;
    }

    const obj = swap(pb.fin.statement.cashflow.p);

    switch (event.value) {
      case obj.lake:
        return monthsTable();
      case obj.river:
        return daysTable();
      case obj.pond:
        return dayInfoTable();
      case obj.sea:
        return true;
    }
    return true;
  }


  const actionsTarget = function (element, event) {
    switch (event.value) {
      case pb.fin.statement.cashflow.p.search:
        return action_stmt_search(element, event);

      case pb.fin.statement.cashflow.p.report:
        return action_stmt_report(element, event);

      case pb.fin.statement.cashflow.p.summary:
        return action_stmt_summary(element, event);

      case pb.fin.statement.cashflow.p.charts:
        return action_stmt_charts(element, event);
    }
  }


  const backTarget = function (element, _event) {
    let placeZone = pb.fin.statement.cashflow.p[_event.place.split("-")[0]];
    let valueZone = pb.fin.statement.cashflow.p[_event.value];

    console.log(placeZone, valueZone);

    _tableLE[placeZone].querySelector("#" + _event.place).classList.add(CLS.display.none);
    _tableLE[valueZone].querySelector("#" + _event.value + "-table").classList.remove(CLS.display.none);
    console.log(_event);
    return true;

  }

  // Public methods
  return {

    // works on card event type hit
    FSC_cards: function (_event) {
      // note: single ajax calling for any event
      return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
    },

    // works on action event type hit
    FSC_actions: function (_event) {
      // note: multiple ajax calling for all events.
      return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
    },

    FSC_tables: function (_event) {
      return eleCheck() ? tablesTarget(get_callEl(), _event) : false;
    },

    FSC_back: function (_event) {
      return eleCheck() ? backTarget(get_callEl(), _event) : false;
    },

    // fetching all upcoming required details
    FSC_pageOpen: function (data) {
      return pageOpen(data);
    },

  };
};

const PB_FS_cashflow = fun();
export default PB_FS_cashflow;