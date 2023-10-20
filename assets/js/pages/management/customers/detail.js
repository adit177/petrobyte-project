import {get_action, get_callEl, get_thePathArr, set_actionEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, keys, rdR} from "../../../base/const.js";
import {_panelLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {$R_common_obj, $R_form_obj, $R_table_obj} from "../../../base/render.js";
import Option_charts from "../../../options/apexcharts.js";
import plg_apexChart from "../../../plugins/apexCharts.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {eTypes} from "../../../base/events.js";
import extend from "../../../extend/extend.js";
import plg_formValid from "../../../plugins/formValid.js";
import Arranging from "../../../base/arranges.js";
import PB_defined from "../../../base/defined.js";

// Shared variables
let StateData, targetEl, tableEle;
let chartObject = {};
let account_id = 0;

let redData;


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

    _return &&= _process_build_search(data);
    //    _return &&= _process_enable_search(data);

    return _return;
  }

  const _process_build_search = (data) => {
    console.log(data)
    StateData = data['pageState'];
    console.log(StateData);
    extend.foreign.$_remote(exT.foreign.individual, [data.customers_list, StateData['groups']], [['post_id', 1]])
    extend.foreign.$_remote(exT.foreign.individual, [data.recently_viewed, StateData['groups']], [['post_id', 1]])

    let results, temp;

    // append the data into search
    results = _panelLE.search.querySelector(querySA(atr.inbuild.search, "results") + '> div > div');
    temp = _panelLE.template.querySelector(querySA(atr.core.template, "search"));
    // append all customers list.
    results.innerHTML = extend.append.$_loop_on_innerHTML(temp.innerHTML, data['customers_list']);

    // append the data for recent user into list
    results = PBapp.querySelector(querySA(atr.inbuild.search, "suggestions") + '> div > div');
    temp = _panelLE.template.querySelector(querySA(atr.core.template, "recent"));
    // append recently viewed
    results.innerHTML = extend.append.$_loop_on_innerHTML(temp.innerHTML, data['recently_viewed']);

    // render common
    $R_common_obj.$_call(_panelLE.search);
    return true;
  }

  //  const _process_enable_search = (data) => {
  //
  //    const handler_key = _panelLE.search.getAttribute(atr.core.key);
  //    // enable search
  //    ext_other_search.$simple(handler_key);
  //
  //    return true;
  //  }

  return _process(data.data);
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Contacts');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Contacts');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

// create basic HTML table for accounts list.


const navtabsTarget = function (element, event, autoCall = false) {


  const navtab_overview = function (element, event) {
    if (element.getAttribute(atr.load.tab) === "1") {
      return true;
    }

    const _process = (data) => {

      data = data.data
      console.log(data)

      let _return = true;

      _return &&= _process_credit_balance(data);
      _return &&= _process_receipts_records(data);
      _return &&= _process_due_invoices(data);
      _return &&= _process_paid_invoices(data);

      element.setAttribute(atr.load.tab, '1');

      return _return;
    }

    const _process_credit_balance = (data) => {
      targetEl = element.querySelector(querySA(atr.core.control, "credit_balance"));

      targetEl.innerHTML = extend.append.$_single_on_innerHTML(targetEl, data.credit_balance);

      $R_common_obj.$_call(targetEl);

      return true;
    }
    const _process_receipts_records = (data) => {
      targetEl = element.querySelector(querySA(atr.core.control, "receipts_records"));

      tableEle = targetEl.querySelector('table');
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData);
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.combine, data, [['receipts_records', 'dates', 1, 0], ['receipts_records', 'ledgers', 2, 0]])
      PB_defined.$_append_table_simple(tableEle, data.receipts_records, pb.mng.customers.detail.t.receipts);
      // rendering data into table using above profile.
      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
    }

    const _process_due_invoices = (data) => {
      let place = element.querySelector(querySA(atr.core.control, "due_invoices"));
      let template = _panelLE.template.querySelector(querySA(atr.core.template, "due_invoices"));

      // match the foreign key matching
      extend.foreign.$_remote(exT.foreign.combine, data,
        [
          ['overdue_invoice', 'dates', 'create_date', 0],
          ['overdue_invoice', 'dates', 'from_date', 0],
          ['overdue_invoice', 'dates', 'to_date', 0],
        ]);

      place.innerHTML = extend.append.$_loop_on_innerHTML(template.innerHTML, data['overdue_invoice']);

      $R_common_obj.$_call(place);
      return true;
    }

    const _process_paid_invoices = (data) => {
      targetEl = element.querySelector("#pb_cust_invoices_1");

      tableEle = targetEl.querySelector('table');
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.individual, [data.paid_invoices["2021"], data.dates], [[2, 0], [3, 0]]);
      PB_defined.$_append_table_simple(tableEle, data.paid_invoices["2021"], pb.mng.customers.detail.t.invoices);


      return true;
    }

    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: event.data
    }, _process)
  }
  /**
   * it loads tab_profits data
   * @param element
   * @param event
   * @param htLen
   * @returns {boolean}
   */
  const navtab_profits = function (element, event) {

    if (element.getAttribute(atr.load.tab) === '1') {
      return true;
    }


    const _process = (data) => {
      data = data.data

      let _return = true;

      _return &&= _process_earnings(data);
      _return &&= _process_monthly_statement(data);

      element.setAttribute(atr.load.tab, '1');
      return _return;
    }

    const _process_earnings = (data) => {
      targetEl = element.querySelector(querySA(atr.core.control, "earnings"));

      tableEle.innerHTML = extend.append.$_single_on_innerHTML(targetEl, data.earnings);

      $R_common_obj.$_call(targetEl);

      return true;
    }

    const _process_monthly_statement = (data) => {
      tableEle = element.querySelector('table');
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.combine, data, [['monthly_statement', 'dates', 1, 0]])

      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(tableEle, data.monthly_statement, pb.mng.customers.detail.t.monthly_statement);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
    }
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: account_id
    }, _process)
  }
  /**
   * it loads tab_charts data
   * @param element
   * @param event
   * @returns {boolean}
   */
  const navtab_charts = function (element, event) {
    console.log(element, event);
    console.log(_panelLE.nav)
    //check the state if data is already loaded then no need to load the data again
    if (element.getAttribute(atr.load.tab) === '1') {
      return true;
    }

    const _process = (data) => {
      data = data.data

      let _return = true;

      _return &&= _process_chart_render(data)
      element.setAttribute(atr.load.tab, '1');

      return _return;
    }

    const _process_chart_render = (data) => {
      console.log(data)
      let targetEles = element.querySelectorAll('[data-pb-child="chart"] > div');

      //chart 1
      redData = Option_charts.createDataset(data[0]);
      let thePathArr = get_thePathArr()
      redData = Option_charts.buildingOptions(redData, thePathArr, pb.mng.customers.detail.g.year_sale_a);
      // initialize of the chart
      chartObject[event.value] = plg_apexChart.$_manual(targetEles[0], redData);

      //chart 2
      redData = Option_charts.createDataset(data[1]);

      redData = Option_charts.buildingOptions(redData, thePathArr, pb.mng.customers.detail.g.year_sale_b);
      // initialize of the chart
      chartObject[event.value] = plg_apexChart.$_manual(targetEles[1], redData);

      //chart 3
      redData = Option_charts.createDataset(data[2]);

      redData = Option_charts.buildingOptions(redData, thePathArr, pb.mng.customers.detail.g.year_sale_c);
      // initialize of the chart
      chartObject[event.value] = plg_apexChart.$_manual(targetEles[2], redData);

      return true;
    }

    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: account_id

    }, _process)
  }
  /**
   * it loads the tab_vehicles  data
   * @param element
   * @param event
   * @param htLen
   * @returns {boolean}
   */
  const navtab_vehicles = function (element, event) {
    // console.log(event);
    if (element.getAttribute(atr.load.tab) === "1") {
      return true;
    }
    const _process = (data) => {
      data = data.data

      let _return = true;
      _return &&= _process_tables(data);
      element.setAttribute(atr.load.tab, '1');

      return _return;
    }

    const _process_tables = (data) => {
      tableEle = element.querySelector('table');
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.combine, data, [['vehicles', 'dates', 5, 0]])

      console.log(data)
      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(tableEle, data.vehicles, pb.mng.customers.detail.t.vehicles);
      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
    }
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: account_id
    }, _process)
  }
  /**
   * it loads the tab_interest data
   * @param element
   * @param event
   * @param htLen
   * @returns {boolean}
   */
  const navtab_interest = function (element, event) {
    if (element.getAttribute(atr.load.tab) === "1") {
      return true;
    }
    const _process = (data) => {
      data = data.data

      let _return = true;
      //process_a(data)
      //_return &&= _process_a(data);
      _return &&= _process_basic_interest(data);
      _return &&= _process_custom_interest(data);

      element.setAttribute(atr.load.tab, '1');
      return _return;
    }
    const _process_basic_interest = (data) => {
      targetEl = element.querySelector(querySA(atr.core.control, 'basic_interest'));

      tableEle = targetEl.querySelector('table');
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.combine, data, [['basic_interest', 'dates', 1, 0]])

      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(tableEle, data.basic_interest, pb.mng.customers.detail.t.basic_interest);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
    }
    const _process_custom_interest = (data) => {
      targetEl = element.querySelector(querySA(atr.core.control, 'custom_interest'));

      tableEle = targetEl.querySelector('table');
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.combine, data, [['custom_interest', 'dates', 1, 0]])

      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(tableEle, data.custom_interest, pb.mng.customers.detail.t.custom_interest);
      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
    }
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: account_id
    }, _process)
  }

  // run arranges manually
  if (autoCall) {
    // create the trigger.
    console.log(_panelLE.nav)
    const trigger = _panelLE.nav.querySelector('button[value="' + event.value + '"]');
    console.log(trigger);
    set_actionEl(trigger)
    // run the arrangement.
    Arranging._panels(event, trigger);
  }


  switch (event.value) {
    case pb.mng.customers.detail.p.overview:
      return navtab_overview(element, event);

    case pb.mng.customers.detail.p.profits:
      return navtab_profits(element, event);

    case pb.mng.customers.detail.p.charts:
      return navtab_charts(element, event);

    case pb.mng.customers.detail.p.vehicles:
      return navtab_vehicles(element, event);

    case pb.mng.customers.detail.p.interest:
      return navtab_interest(element, event);

    default:
      return eventNotFound(event);
  }
}

const loadsTarget = function (element, event) {
  console.log(event)
  // set the customer_id for the page data loading .
  if (!event.data) {
    get_action().form.querySelectorAll('input[name="customer_id"]').forEach((input) => {
      if (input.checked) {
        account_id = input.value
        event.data = input.value;
      }
    });
  }
  else {
    account_id = event.data;
  }

  // get the tab.
  let _tab = 'none';
  get_action().form.querySelectorAll('input[name="tab"]').forEach((input) => {
    if (input.checked) {
      _tab = input.value
    }
  });
  _tab = _tab === 'none' ? pb.mng.customers.detail.p.overview : _tab;

  // load aside menu.
  const load_aside_manu = function () {

    const _process = (data) => {
      data = data.data;
      let _return = true;

      _return &&= _process_menu(data);

      return _return;
    }
    const _process_menu = (data) => {
      // general info
      console.log(data)
      let targetEle = _panelLE.aside.querySelector(querySA(atr.core.append, "customer_menu"));
      let template = _panelLE.template.querySelector(querySA(atr.core.template, "customer_menu"));

      targetEle.innerHTML = extend.append.$_single_on_innerHTML(template, data.customer_info);

      $R_common_obj.$_call(targetEle);

      // render account config.
      targetEle = _panelLE.aside.querySelector("#account_config");
      let form = targetEle.querySelector('form');

      extend.placement.$_form(data.account_config, form);
      return true;
    }

    // ajax calling
    return call_AJAX_GET({
      act    : 'menu',
      type   : event.type,
      account: account_id
    }, _process)
  }


  // load particular nav-tab.
  const load_tab = function (tab) {
    // create the event.
    const _event = {
      value: tab,
      type : eTypes.navtab,
      place: event.place,
      data : account_id
    }
    // select the element.
    const _element = _panelLE.nav.querySelector(`#${tab}`);

    switch (tab) {
      case pb.mng.customers.detail.p.overview:
        return navtabsTarget(_element, _event, true);

      case pb.mng.customers.detail.p.profits:
        return navtabsTarget(_element, _event, true);

      case pb.mng.customers.detail.p.charts:
        return navtabsTarget(_element, _event, true);

      case pb.mng.customers.detail.p.vehicles:
        return navtabsTarget(_element, _event, true);

      case pb.mng.customers.detail.p.interest:
        return navtabsTarget(_element, _event, true);
    }
  }

  // run the functions.
  let _return = true;
  _return &&= load_aside_manu();
  _return &&= load_tab(_tab);

  return Promise.resolve(_return);
  // return _return_1 && _return_2;
}

const modalsTarget = function (element, event) {
  const modal_update = function () {
    const _process = (data) => {
      data = data.data

      let _return = true;

      _return &&= _process_modal(data);

      return _return;
    }
    const _process_modal = (data) => {
      let formEle = element.querySelector('form');

      //        const fno = element.querySelector(`button[form="${formEle.id}"]`).getAttribute(atr.form.sno);
      //        if (!plg_formValid.$_get(fno)) {
      //          return true;
      //        }

      //enable select dropdown.
      $R_form_obj.$form(data, formEle);

      //put the data into form
      extend.placement.$_form(data.update_customer, formEle);

      $R_common_obj.$_call(formEle);
      return true;
    }

    // ajax calling
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: account_id
    }, _process)
  }
  const modal_alter = function () {
    const _process = (data) => {
      data = data.data

      let _return = true;

      _return &&= _process_modal(data);

      return _return;
    }
    const _process_modal = (data) => {

      let targetEle = element.querySelector(querySA(atr.core.control, "current_bal"));
      console.log(data)
      console.log(targetEle);
      targetEle.innerText = data.alter_customer.current_bal;
      return true;
    }
    // ajax calling
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: account_id
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }
  const modal_edit = () => {
    console.log(element);
    const _process = (data) => {
      data = data.data

      let _return = true;

      _return &&= _process_modal(data);

      return _return;
    }
    const _process_modal = (data) => {

      let formEle = element.querySelector('form');
      $R_form_obj.$global({...data}, formEle, rdR.form.method.advance)

      return true;
    }
    // ajax calling
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: account_id
    }, _process)
  }
  const modal_merge = () => {
    console.log(element);
    const _process = (data) => {
      data = data.data

      let _return = true;

      _return &&= _process_modal(data);

      return _return;
    }
    const _process_modal = (data) => {

      let formEle = element.querySelector('form');
      $R_form_obj.$global({...data}, formEle, rdR.form.method.advance)

      return true;
    }
    // ajax calling
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: account_id
    }, _process)

  }
  switch (event.value) {
    case pb.mng.customers.detail.c.update:
      return modal_update();
    case pb.mng.customers.detail.c.alter:
      return modal_alter();
    case pb.mng.customers.detail.c.edit:
      return modal_edit();
    case pb.mng.customers.detail.c.merge:
      return modal_merge();
  }
}

const actionsTarget = function (element, event) {
  console.log(element, event);
  console.log(get_action())
  // validate inputs
  const formEle = element.querySelector('form');
  const fno = formEle.getAttribute(atr.form.sno);
  console.log(formEle, fno);
  if (!plg_formValid.$_get_status(fno)) {
    return true;
  }

  // collect data.
  const formData = extend.collect.$_form_simple(formEle);

  const _process = (data) => {
    data = data.data

    _process_a(data)
  }
  const _process_a = (data) => {
    console.log(data);
    // getting the response
    if (!data.status) {
      toastr.success("Failed to create new contact", `Reason: ${data.message}`);
    }
    toastr.success('New Contact has been created', "Success");
    // return on save data call.
    extend.reset.$_simple_form(formEle);
    return true;
  }

  return call_AJAX_POST({
    act    : event.value,
    type   : event.type,
    account: account_id
  }, formData, _process)

}
const resetsTarget = function (element, event) {
  const formEle = element.querySelector('form');
  extend.reset.$_simple_form(formEle);
  return Promise.resolve(true);

}
// Public methods


const get = function (event) {
  switch (event.type) {
    case eTypes.load:
      return eleCheck() ? loadsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.modal:
      return eleCheck() ? modalsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.navtab:
      return eleCheck() ? navtabsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    // useMe
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      alert(`eventType: ${event.type}, not GET, change nature to POST`);
      return Promise.reject('Invalid Event Type');
  }
}
const post = function (event) {
  switch (event.type) {
    case eTypes.reset:
      return eleCheck() ? resetsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');

    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');

    default:
      return Promise.reject('Invalid Event Type');
  }
}
const option = function (event) {
  switch (event.type) {

    default:
      return Promise.reject('Invalid Event Type');
  }
}


export const MCD_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MCD_Requests', 'Request Type: ' + type);
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