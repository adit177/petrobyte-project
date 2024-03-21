import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4410',
};
// Shared variables
let StateData, formData, redData;
let tableEle, filterEle;
var ajaxResponse, data;
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
    _process_a(data);
    _process_b(data);
    return true;
  }

  const _process_a = (data) => {


  }
  const _process_b = (data) => {
    StateData = data['pageState'];
    console.log(StateData);
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : 'page',
    type: 'open'
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  // other things, not connected to dynamic data.
  return ajax;
}
/**
 * preloaded data that will not change for this page
 */


      // get list of all contacts
const report_purchase_detailed = function (element, event) {

        // form for parameters
        console.log(event);

        formData = extend.collect.$_step(
          _tabLE.action.querySelector('#form-' + event.value)
        );

        if (!formData) return false;
        // table for data loading
        tableEle = element.querySelector('table');
        filterEle = element.querySelector('[' + atr.core.target + '="' + kws.value.filters + '"]');

        // checking that table is loaded or not.
        if (tableEle.getAttribute(atr.load.table) === '1') return true;


        const _process = (data) => {
          _process_a(data)
        }
        const _process_a = (data) => {
          console.log(data);


          // template render.
          if (typeof data.detail.range === 'object') {
            let range = '';
            range += $R_common_obj.$_return(data.detail.range[0], rdR.common.methods.date, ['fo']);
            range += ' to ';
            range += $R_common_obj.$_return(data.detail.range[1], rdR.common.methods.date, ['to']);
            data.detail.range = range;
          }
          data.detail.closing = $R_common_obj.$_return(data.detail.closing, 'number', {
            sign: true
          });
          const header = element.querySelector('[' + atr.core.control + '="' + kws.value.header + '"]');
          header.innerHTML = extend.append.$_single_on_innerHTML(header, data.detail);


          // creating a profile for table.
          if (!data) {
            redData = PB_render_table.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
            return true;
          }


          // shape = $R_table_obj.tableShapes;
          // option = $table.tableOptions;
          // method = $table.tableMethods;
          // profile = $table.tableParams;

          tableFormation(data.data);

          dataTablesInit(event.value);

          filterEvents(event.value);
        }

        const ajax = new AjaxPB();
        const urlID = ajax.buildingURL([], {
          act : event.value,
          type: event.type
        }, 'local', 0);
        ajax.callREQUEST({}, urlID, false, _process);
        const responseX = ajax.getRESPONSE();
        console.log(responseX);
        return true;
      }

const report_purchase_invoice = function (element, event) {

  // form for parameters
  console.log(event);

  formData = extend.collect.$_step(
    _tabLE.action.querySelector('#form-' + event.value)
  );

  if (!formData) return false;
  // table for data loading
  tableEle = element.querySelector('table');
  filterEle = element.querySelector('[' + atr.core.target + '="' + kws.value.filters + '"]');

  // checking that table is loaded or not.
  if (tableEle.getAttribute(atr.load.table) === '1') return true;


  const _process = (data) => {
    _process_a(data)
  }
  const _process_a = (data) => {
    console.log(data);

    // template render.
    if (typeof data.detail.range === 'object') {
      let range = '';
      range += $R_common_obj.$_return(data.detail.range[0], rdR.common.methods.date, ['fo']);
      range += ' to ';
      range += $R_common_obj.$_return(data.detail.range[1], rdR.common.methods.date, ['to']);
      data.detail.range = range;
    }
    data.detail.closing = $R_common_obj.$_return(data.detail.closing, 'number', {
      sign: true
    });
    const header = element.querySelector('[' + atr.core.control + '="' + kws.value.header + '"]');
    header.innerHTML = extend.append.$_single_on_innerHTML(header, data.detail);


    // creating a profile for table.
    if (!data) {
      redData = PB_render_table.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
      return true;
    }


    // shape = $R_table_obj.tableShapes;
    // option = $table.tableOptions;
    // method = $table.tableMethods;
    // profile = $table.tableParams;

    tableFormation(data.data);

    dataTablesInit(event.value);

    filterEvents(event.value);
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : event.value,
    type: event.type
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  return true;
}

const report_purchase_item = function (element, event) {

  // form for parameters
  console.log(event);

  formData = extend.collect.$_step(
    _tabLE.action.querySelector('#form-' + event.value)
  );

  if (!formData) return false;
  // table for data loading
  tableEle = element.querySelector('table');
  filterEle = element.querySelector('[' + atr.core.target + '="' + kws.value.filters + '"]');

  // checking that table is loaded or not.
  if (tableEle.getAttribute(atr.load.table) === '1') return true;


  const _process = (data) => {
    _process_a(data)
  }
  const _process_a = (data) => {
    console.log(data);

    // template render.
    if (typeof data.detail.range === 'object') {
      let range = '';
      range += $R_common_obj.$_return(data.detail.range[0], rdR.common.methods.date, ['fo']);
      range += ' to ';
      range += $R_common_obj.$_return(data.detail.range[1], rdR.common.methods.date, ['to']);
      data.detail.range = range;
    }
    data.detail.closing = $R_common_obj.$_return(data.detail.closing, 'number', {
      sign: true
    });
    const header = element.querySelector('[' + atr.core.control + '="' + kws.value.header + '"]');
    header.innerHTML = extend.append.$_single_on_innerHTML(header, data.detail);


    // creating a profile for table.
    if (!data) {
      redData = PB_render_table.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
      return true;
    }


    // shape = $R_table_obj.tableShapes;
    // option = $table.tableOptions;
    // method = $table.tableMethods;
    // profile = $table.tableParams;

    tableFormation(data.data);

    dataTablesInit(event.value);

    filterEvents(event.value);
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : event.value,
    type: event.type
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  return true;
}

const report_purchase_party = function (element, event) {

  // form for parameters
  console.log(event);

  formData = extend.collect.$_step(
    _tabLE.action.querySelector('#form-' + event.value)
  );

  if (!formData) return false;
  // table for data loading
  tableEle = element.querySelector('table');
  filterEle = element.querySelector('[' + atr.core.target + '="' + kws.value.filters + '"]');

  // checking that table is loaded or not.
  if (tableEle.getAttribute(atr.load.table) === '1') return true;


  const _process = (data) => {
    _process_a(data)
  }
  const _process_a = (data) => {
    console.log(data);

    // template render.
    if (typeof data.detail.range === 'object') {
      let range = '';
      range += $R_common_obj.$_return(data.detail.range[0], rdR.common.methods.date, ['fo']);
      range += ' to ';
      range += $R_common_obj.$_return(data.detail.range[1], rdR.common.methods.date, ['to']);
      data.detail.range = range;
    }
    data.detail.closing = $R_common_obj.$_return(data.detail.closing, 'number', {
      sign: true
    });
    const header = element.querySelector('[' + atr.core.control + '="' + kws.value.header + '"]');
    header.innerHTML = extend.append.$_single_on_innerHTML(header, data.detail);


    // creating a profile for table.
    if (!data) {
      redData = PB_render_table.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
      return true;
    }


    // shape = $R_table_obj.tableShapes;
    // option = $table.tableOptions;
    // method = $table.tableMethods;
    // profile = $table.tableParams;

    tableFormation(data.data);

    dataTablesInit(event.value);

    filterEvents(event.value);
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : event.value,
    type: event.type
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  return true;
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

const tableFormation = function (data) {
  // rendering data into table using above profile.
  redData = PB_render_table.$_simple(data, $R_table_obj.tableShapes, 'array');

  // have look into plain HTML table
  //console.log(redData);

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


// tabsTarget functions
const tab_purchase_detailed = function (element, data) {

  $R_form_obj.$_run(rdR.form.method.selectOnly, data, element, atr.core.source);

  element.setAttribute(atr.load.select, '1');
  return true;
}

const tab_purchase_invoice = function (element, data, event) {

  $R_form_obj.$_run(rdR.form.method.selectOnly, data, element, atr.core.source);

  element.setAttribute(atr.load.select, '1');
  return true;
}

const tab_purchase_item = function (element, data, event) {

  $R_form_obj.$_run(rdR.form.method.selectOnly, data, element, atr.core.source);

  element.setAttribute(atr.load.select, '1');
  return true;
}

const tab_purchase_party = function (element, data, event) {

  $R_form_obj.$_run(rdR.form.method.selectOnly, data, element, atr.core.source);

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

  console.log(event);
  if (element.hasAttribute(atr.load.select)) return true;

  const _process = (data) => {
    _process_a(data)
  }

  const _process_a = (data) => {
    console.log(data);
    switch (event.value) {
      case pb.tax.gstreport.purchases.p.detailed:
        return tab_purchase_detailed(element, data, event);
      case pb.tax.gstreport.purchases.p.invoice:
        return tab_purchase_invoice(element, data, event);
      case pb.tax.gstreport.purchases.p.item:
        return tab_purchase_item(element, data, event);
      case pb.tax.gstreport.purchases.p.party:
        return tab_purchase_party(element, data, event);
    }
  }
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : event.value,
    type: event.type
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

}

const reportsTarget = function (element, event) {
  switch (event.value) {
    case pb.tax.gstreport.purchases.p.detailed:
      return report_purchase_detailed(element, event);
    case pb.tax.gstreport.purchases.p.invoice:
      return report_purchase_invoice(element, event);
    case pb.tax.gstreport.purchases.p.item:
      return report_purchase_item(element, event);
    case pb.tax.gstreport.purchases.p.party:
      return report_purchase_party(element, event);

  }
}
const tablesTarget = function (element, event) {
  return tabsTarget(element, event);
}
const backsTarget = function (element, button) {
  // destroy the datatable
  tableObject[button.value].clear().destroy();
  // tableObject[button.value].destroy();
  return true;
}

// Public methods


export const TGP_tabs = function (_event) {
  return eleCheck() ? tabsTarget(get_callEl(), _event) : false;
};
export const TGP_reports = function (_event) {
  return eleCheck() ? reportsTarget(get_callEl(), _event) : false;
};
export const TGP_tables = function (_event) {
  return eleCheck() ? tablesTarget(get_callEl(), _event) : false;
};
export const TGP_backs = function (_event) {
  return eleCheck() ? backsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const TGP_state = function () {
  return pageOpen();
};

