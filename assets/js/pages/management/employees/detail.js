import {get_action, get_callEl, set_actionEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, keys, rdR} from "../../../base/const.js";
import {_panelLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {$R_common_obj, $R_form_obj, $R_table_obj} from "../../../base/render.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import Arranging from "../../../base/arranges.js";
import extend from "../../../extend/extend.js";
import {eTypes} from "../../../base/events.js";
import PB_defined from "../../../base/defined.js";
// Shared variables
let StateData, targetEl, tableEle;
let account_id = 0;

let redData;


const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
    // initialize the important objects


  const _process = (data) => {
      data = data.data
      let _return = true;

      _return &&= _process_build_search(data);
      //      _return &&= _process_enable_search(data);

      return _return;
    }

  const _process_build_search = (data) => {
    StateData = data['pageState'];

    extend.foreign.$_remote(exT.foreign.individual, [data.employees_list, StateData['posts']], [['post_id', 1]])
    extend.foreign.$_remote(exT.foreign.individual, [data.recently_viewed, StateData['posts']], [['post_id', 1]])

    let results, temp;

    // append the data into search
    results = _panelLE.search.querySelector(querySA(atr.inbuild.search, "results") + '> div > div');
    temp = _panelLE.template.querySelector(querySA(atr.core.template, "search"));
    // append all employees list.
    results.innerHTML = extend.append.$_loop_on_innerHTML(temp.innerHTML, data['employees_list']);

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
  //    //    ext_other_search.$simple(handler_key);
  //
  //    return true;
  //  }

  return _process(data);
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
//const tableFormation = function (lists, key) {
//
//  // rendering data into table using above profile.
//  redData = $R_table_obj.$_simple(lists, key);
//
//  // have look into plain HTML table
//  tableEle.appendChild(redData)
//
//  // update table status
//  tableEle.setAttribute(atr.load.table, '1');
//
//  // apply common renders
//  $R_common_obj.$_call(tableEle);
//
//  // for enable dropdown in the table.
//  KTMenu.init();
//}

const navtabsTarget = function (element, event, autoCall = false) {
  // inner functions
  const navtab_overview = function (element, event) {
    alert('overview');
    console.log(element, event);
    // if tab already loaded, then return true.
    if (element.getAttribute(atr.load.tab) === "1") {
      return true;
    }

    const _process = (data) => {
      data = data.data
      let _return = true;

      _return &&= _process_general(data);
      _return &&= _process_history_table(data);

      element.setAttribute(atr.load.tab, "1");
      return _return;
    }

    const _process_general = (data) => {
      // get header element
      let salary = element.querySelector(querySA(atr.core.control, "salary"));

      // render the data into header
      salary.innerHTML = extend.append.$_single_on_innerHTML(salary, data.salary);

      // apply common renders for amount and date
      $R_common_obj.$_call(salary);

      let activities = element.querySelector(querySA(atr.core.control, "activities"));

      activities.innerHTML = extend.append.$_single_on_innerHTML(activities, data.activities);
      // apply common renders for amount and date
      $R_common_obj.$_call(activities);

      return true;
    }
    const _process_history_table = (data) => {
      // get table element
      tableEle = element.querySelector('table');

      // if table already loaded, then return true.
      if (tableEle.getAttribute(atr.load.table) === '1') return true;
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // match the foreign key matching
      extend.foreign.$_remote(exT.foreign.combine, data, [['transaction_history', 'dates', 1, 0]]);

      // rendering data into table using above profile.

      PB_defined.$_append_table_simple(tableEle, data.transaction_history, pb.mng.employees.detail.t.history);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
    }


    // get ajax object
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: event.data
    }, _process)
  }

  const navtab_activities = function (element, event) {

    //check the state if data is already loaded then no need to load the data again
    if (element.getAttribute(atr.load.tab) === "1") {
      return true;
    }

    const _process = (data) => {
      data = data.data;
      let _return = true;

      _return &&= _process_activities_table(data);

      element.setAttribute(atr.load.tab, "1");
      return _return;
    }
    const _process_activities_table = (data) => {
      // get table element
      tableEle = element.querySelector('table');

      if (tableEle.getAttribute(atr.load.table) === '1') return true;
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData);
        return true;
      }

      // match the foreign key matching
      extend.foreign.$_remote('single', data, [['activities', 'dates', 1, 0], ['activities', 'types', 2, 0]]);

      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(tableEle, data.activities, pb.mng.employees.detail.t.activities);


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

  const navtab_payroll = function (element, event) {
    // if tab already loaded, then return true.
    if (element.getAttribute(atr.load.tab) === '1') {
      return true;
    }

    const _process = (data) => {
      data = data.data;
      let _return = true;

      _return &&= _process_payroll_table(data);

      element.setAttribute(atr.load.tab, '1');
      return _return;
    }
    const _process_payroll_table = (data) => {
      // get table element
      tableEle = element.querySelector('table');

      if (tableEle.getAttribute(atr.load.table) === '1') return true;

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData);
        return true;
      }

      // foreign key matching
      extend.foreign.$_remote('single', data, [['payroll', 'dates', 1, 0],]);

      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(tableEle, data.payroll, pb.mng.employees.detail.t.payroll);

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

  const navtab_account = function (element, event) {
    if (element.getAttribute(atr.load.tab) === '1') {
      return true;
    }
    const _process = (data) => {
      data = data.data;
      let _return = true;

      _return &&= _process_load_form(data);

      element.setAttribute(atr.load.tab, '1');
      return _return;
    }
    const _process_load_form = (data) => {
      if (element.getAttribute(atr.load.tab) === "1") {
        return true;
      }


      if (!data) {
        toastr.error('Unable to get data from the Server', 'Failed to Load');
        return false;
      }

      let formEls = element.querySelectorAll('form');

      console.log(formEls);
      $R_form_obj.$form(StateData, formEls[0]);
      $R_form_obj.$form({...StateData, ...data.form_predefined_data}, formEls[1]);

      extend.placement.$_form(data.account_info, formEls[0]);
      extend.placement.$_form(data.salary_info, formEls[1]);

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
    const trigger = _panelLE.navbar.querySelector('button[value="' + event.value + '"]');
    set_actionEl(trigger);
    // run the arrangement.
    Arranging._panels(event, trigger);
  }

  switch (event.value) {
    case pb.mng.employees.detail.p.overview:
      return navtab_overview(element, event);

    case pb.mng.employees.detail.p.activities:
      return navtab_activities(element, event);

    case pb.mng.employees.detail.p.payroll:
      return navtab_payroll(element, event);

    case pb.mng.employees.detail.p.account:
      return navtab_account(element, event);

    default:
      return eventNotFound(event);
  }
}

const loadsTarget = function (element, event) {

  // set the employee_id for the page data loading .
  if (!event.data) {
    get_action().form.querySelectorAll('input[name="employee_id"]').forEach((input) => {
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
  _tab = _tab === 'none' ? pb.mng.employees.detail.p.overview : _tab;

  // load aside menu.
  const load_aside_manu = function () {

    // if already loaded, then return true
    const _process = (data) => {
      data = data.data;
      let _return = true;

      _return &&= _process_menu(data);

      return _return;
    }

    const _process_menu = (data) => {
      let targetEle = _panelLE.aside.querySelector(querySA(atr.core.append, "employee_detail"));
      let template = _panelLE.template.querySelector(querySA(atr.core.template, "employee_detail"));

      targetEle.innerHTML = extend.append.$_single_on_innerHTML(template, data.employee_detail);

      $R_common_obj.$_call(targetEle);

      return true;
    }

    // ajax calling
    return call_AJAX_GET({
      act    : "menu",
      type   : event.type,
      account: account_id
    }, _process);
  }


  // load particular nav-tab.
  const load_tab = function (tab) {
    // create the event.
    console.log(tab);
    alert(`xdd`);
    const _event = {
      value: tab,
      type : eTypes.navtab,
      place: event.place,
      data : account_id
    }
    // select the element.
    const _element = _panelLE.nav.querySelector(`#${tab}`);

    switch (tab) {
      case pb.mng.employees.detail.p.overview:
        return navtabsTarget(_element, _event, false);

      case pb.mng.employees.detail.p.activities:
        return navtabsTarget(_element, _event, false);

      case pb.mng.employees.detail.p.payroll:
        return navtabsTarget(_element, _event, false);

      case pb.mng.employees.detail.p.account:
        return navtabsTarget(_element, _event, false);
    }
  }

  // run the functions.

  let _return = true;
  _return &&= load_aside_manu();
  _return &&= load_tab(_tab);

  return _return;
  // return _return_1 && _return_2;
}


//export const MED_actions = function (_event) {
//  return true;
//};
//export const MED_navtabs = function (_event) {
//  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;
//};
//export const MED_loads = function (_event) {
//  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
//};
//
//export const MED_pageOpen = function (data) {
//  return pageOpen(data);
//};

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


export const MED_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MED_Requests', 'Request Type: ' + type);
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
