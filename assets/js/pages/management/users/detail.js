import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR} from "../../../base/const.js";

// Shared variables
let StateData, targetEl, tableEle;
let account_id = 0;

let redData;

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4260',
};

const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
    // initialize the important objects


  const _process = (data) => {
      let _return = true;

      _return &&= _process_build_search(data);
      _return &&= _process_enable_search(data);

      return _return;
    }

  const _process_build_search = (data) => {
    StateData = data['pageState'];

    extend.foreign.$_remote(exT.foreign.individual, [data.users_list, StateData['posts']], [['post_id', 1]])
    extend.foreign.$_remote(exT.foreign.individual, [data.recently_viewed, StateData['posts']], [['post_id', 1]])

    let results, temp;

    // append the data into search
    results = _panelLE.search.querySelector(querySA(atr.inbuild.search, "results") + '> div > div');
    temp = _panelLE.template.querySelector(querySA(atr.core.template, "search"));
    // append all users list.
    results.innerHTML = extend.append.$_loop_on_innerHTML(temp.innerHTML, data['users_list']);

    // append the data for recent user into list
    results = PBapp.querySelector(querySA(atr.inbuild.search, "suggestions") + '> div > div');
    temp = _panelLE.template.querySelector(querySA(atr.core.template, "recent"));
    // append recently viewed
    results.innerHTML = extend.append.$_loop_on_innerHTML(temp.innerHTML, data['recently_viewed']);

    // render common
    $R_common_obj.$_call(_panelLE.search);
    return true;
  }

  const _process_enable_search = (data) => {

    const handler_key = _panelLE.search.getAttribute(atr.core.key);
    // enable search
    ext_other_search.$simple(handler_key);

    return true;
  }

  return _process(data.data);
}

// create basic HTML table for accounts list.
const tableFormation = function (lists, key) {

  // rendering data into table using above profile.
  redData = $R_table_obj.$_simple(lists, key);

  // have look into plain HTML table
  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);

  // for enable dropdown in the table.
  KTMenu.init();
}

const navtabsTarget = function (element, event, autoCall = false) {
  // inner functions
  const navtab_overview = function (element, event) {
    const _process = (data) => {
      let _return = true;
      return _return;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: account_id
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }
  const navtab_security = function (element, event) {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_email_notifications(data);
      return _return;
    }
    const _process_email_notifications = (data) => {
      let targetEle = element.querySelector("#email_notification");
      console.log(element)
      let form = targetEle.querySelector('form');

      extend.placement.$_form(data.email_notification, form);

      return true;
    }


    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: account_id
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }
  const navtab_events = function (element, event) {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_login_sessions(data);
      _return &&= _process_logs(data);

      return _return;
    }

    const _process_login_sessions = (data) => {
      targetEl = element.querySelector(querySA(atr.core.control, "login_sessions"));

      tableEle = targetEl.querySelector('table');

      // create basic HTML table for accounts list.
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // foreign matching
      extend.foreign.$_remote(exT.foreign.combine, data, [['login_sessions', 'dates', 4, 0]]);
      console.log(data)
      // rendering data into table using above profile.
      tableFormation(data.login_sessions, pb.mng.users.detail.t.login_sessions);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
    }

    const _process_logs = (data) => {
      targetEl = element.querySelector(querySA(atr.core.control, "logs"));
      tableEle = targetEl.querySelector('table');

      // create basic HTML table for accounts list.
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // foreign matching
      extend.foreign.$_remote(exT.foreign.combine, data, [['logs', 'dates', 3, 0]]);
      // rendering data into table using above profile.
      tableFormation(data.logs, pb.mng.users.detail.t.logs);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: account_id
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }

  // run arranges manually
  if (autoCall) {
    // create the trigger.
    const trigger = _panelLE.navbar.querySelector('button[value="' + event.value + '"]');
    _action = trigger;
    // run the arrangement.
    Arranging._panels(event, trigger);
  }

  switch (event.value) {
    case pb.mng.users.detail.p.overview:
      return navtab_overview(element, event);
    case pb.mng.users.detail.p.security:
      return navtab_security(element, event);
    case pb.mng.users.detail.p.events:
      return navtab_events(element, event);
    default:
      return eventNotFound(event);
  }
}

const loadsTarget = function (element, event) {

  // set the user_id for the page data loading .
  if (!event.data) {
    _action.form.querySelectorAll('input[name="user_id"]').forEach((input) => {
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
  console.log(_action.form.querySelectorAll('input[name="tab"]'));
  _action.form.querySelectorAll('input[name="tab"]').forEach((input) => {
    if (input.checked) {
      _tab = input.value
    }
  });
  _tab = _tab === 'none' ? pb.mng.users.detail.p.overview : _tab;
  // load aside menu.
  const load_aside_manu = function () {

    // if already loaded, then return true
    const _process = (data) => {
      let _return = true;

      _return &&= _process_menu(data);

      return _return;
    }

    const _process_menu = (data) => {
      // process general detail data.
      let targetEle = _panelLE.aside.querySelector(querySA(atr.core.append, "user_detail"));
      const template = _panelLE.template.querySelector(querySA(atr.core.template, "user_detail"));

      targetEle.innerHTML = extend.append.$_single_on_innerHTML(template, data.user_detail);
      $R_common_obj.$_call(targetEle);

      // process connected accounts detail data.
      targetEle = _panelLE.aside.querySelector('#connect_accounts');
      extend.placement.$_form(data.connect_accounts, targetEle);

      return true;
    }


    // ajax calling
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : "menu",
      type   : event.type,
      account: account_id
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
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
    const _element = _panelLE.navtab.querySelector(`#${tab}`);

    switch (tab) {
      case pb.mng.users.detail.p.overview:
        return navtabsTarget(_element, _event, true);

      case pb.mng.users.detail.p.security:
        return navtabsTarget(_element, _event, true);

      case pb.mng.users.detail.p.events:
        return navtabsTarget(_element, _event, true);

    }
  }

  // run the functions.
  const _return_1 = load_aside_manu();
  const _return_2 = load_tab(_tab);

  return _return_2;
  // return _return_1 && _return_2;
}

const modalsTarget = function (element, event) {
  const modal_update_user = function (element, event) {
    const _process = (data) => {
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
      extend.placement.$_form(data.update_user, formEle);

      $R_common_obj.$_call(formEle);
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
  const modal_update_email = function (element, event) {
    const _process = (data) => {
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

      //put the data into form
      extend.placement.$_form(data.update_email, formEle);

      $R_common_obj.$_call(formEle);
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
  const modal_update_password = function (element, event) {
    const _process = (data) => {
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

      //put the data into form
      extend.placement.$_form(data.update_password, formEle);

      $R_common_obj.$_call(formEle);
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
  const modal_update_role = function (element, event) {
    const _process = (data) => {
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
      console.log(data)
      console.log(formEle)
      //put the data into form
      extend.placement.$_form(data.update_role, formEle);

      $R_common_obj.$_call(formEle);
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
  const modal_add_otp = function (element, event) {
    const _process = (data) => {
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

      //put the data into form
      extend.placement.$_form(data.add_otp, formEle);

      $R_common_obj.$_call(formEle);
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

  switch (event.value) {
    case pb.mng.users.detail.c.update_user:
      return modal_update_user(element, event);
    case pb.mng.users.detail.c.update_email:
      return modal_update_email(element, event);
    case pb.mng.users.detail.c.update_password:
      return modal_update_password(element, event);
    case pb.mng.users.detail.c.update_role:
      return modal_update_role(element, event);
    case pb.mng.users.detail.c.add_otp:
      return modal_add_otp(element, event);
  }
}

const actionsTarget = function (element, event) {

  // validate inputs
  const formEle = element.querySelector('form');
  const fno = element.querySelector(`button[form="${formEle.id}"]`).getAttribute(atr.form.sno);
  if (!plg_formValid.$_get_status(fno)) {
    return true;
  }
  // collect data.
  const formData = extend.collect.$_form(formEle);

  const _process = (data) => {
    let _return = true;
    _return &&= _process_form(data);
    return _return;
  }
  const _process_form = (data) => {
    // getting the response
    if (!data.status) {
      toastr.success("Failed to create new contact", `Reason: ${data.message}`);
    }
    toastr.success('New Contact has been created', "Success");
    // return on save data call.
    return true;
  }
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : event.value,
    type   : event.type,
    account: account_id
  }, 'local', 0);
  ajax.callREQUEST({formData}, urlID, true, _process);

  return ajax;
}


export const MUD_modals = function (_event) {
  return eleCheck() ? modalsTarget(get_callEl(), _event) : false;
};
export const MUD_actions = function (_event) {
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};
export const MUD_navtabs = function (_event) {
  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;
};
export const MUD_loads = function (_event) {
  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
};

export const MUD_pageOpen = function () {
  return pageOpen();
};
