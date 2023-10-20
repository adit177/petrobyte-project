import {get_callEl, get_thePath, get_thePathArr} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {deF, exT, keys, Lyt, rdR} from "../../../base/const.js";
import {$R_common_obj, $R_form_obj, $R_menu_obj, $R_table_obj} from "../../../base/render.js";
import extend from "../../../extend/extend.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import plg_datePicker from "../../../plugins/datePicker.js";
import Option_charts from "../../../options/apexcharts.js";
import plg_apexChart from "../../../plugins/apexCharts.js";
import plg_formValid from "../../../plugins/formValid.js";
import {_cardLE} from "../../../base/elements.js";
import {eTypes, eValues} from "../../../base/events.js";
import PB_defined from "../../../base/defined.js";
import state from "../../../base/state.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import Initialize from "../../../base/initialize.js";


// Shared variables
let StateData, redData, formEl;
let tableEle;
let chartObject = [];

/**
 * this will be used for show page's base-0 data.
 */
const pageOpen = (data) => {

  const _process = (data) => {
    console.log(data);
    data = data.data
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_render_menu(data);
    return _return;
  }
  const _process_save_page_state = (data) => {
    StateData = data['page_common_info'];
    return true;
  }
  const _process_render_menu = (data) => {
    // console.log(data.menu[3].cate_id);sales
    extend.foreign.$_remote(exT.foreign.individual, [data.menu_info.body, StateData.categories], [['name', 1]])
    // calling render to place data
    $R_menu_obj.$_left(
      data['menu_info'],
      rdR.menu.type.stack,
      {},
    );
    return true
  }


  return _process(data);
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Banking');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Banking');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

const cardsTarget = function (element, event) {

  /*
   ----------------------
   internal functions
   ----------------------
   */

  /**
   * it appends html table of expense list in target from DB.
   * @returns {Promise<unknown>}
   */
  const card_list_expense = function () {
    console.log(event);
    tableEle = element.querySelector('table')

    if (!tableEle) {
      return Promise.reject('Table Element is not found');
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return Promise.resolve(true);
    }
    const _process = (data) => {
      data = data.data
      return _process_a(data)
    }


    const _process_a = (data) => {
      console.log(data);
      console.log("processss_a data", data);



      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData)
        return true;
      }
      console.log(data.list)
      console.log(StateData.categories)
      // render the response data (if required)
      extend.foreign.$_remote('double', [data.list, StateData.categories], [[4, 1]])

      //

      // shape = $R_table_obj.tableShapes;
      // option = $table.tableOptions;
      // method = $table.tableMethods;
      // profile = $table.tableParams;

      PB_defined.$_append_table_simple(tableEle, data.list, pb.mng.accounts.expenses.t.list);

      return true;
    }

    const params = {
      act : event.value,
      type: event.type
    }
    return call_AJAX_GET(params, _process, false);
  }

  /**
   * here we put the data into edit form for editing the data
   * @returns {Promise<unknown>}
   */
  const card_edit_expense = function () {
    let account_id = event.data;

    if (!account_id) {
      toastr.error('Please provide a valid expense', 'Failed to Load')
      return Promise.reject('Please provide a valid ledger id');
    }

    // init the form
    const formEl = element.querySelector('form');
    const sts = $R_form_obj.$form(StateData, formEl);

    if (!sts) {
      toastr.error('Form initialized has failed', 'Failed to Load');
      return Promise.reject('Form initialized has failed');
    }

    const _process = (data) => {
      data = data.data
      return _process_a(data)
    }
    const _process_a = (data) => {
      console.log(data);

      if (!data) {
        toastr.error('Unable to get data from the Server', 'Failed to Load');
        return false;
      }

      // set account id into submit button.
      const form_id = formEl.getAttribute('id');
      element.querySelector('button[form="' + form_id + '"]').setAttribute(atr.event.value, account_id);

      // save into global variable
      StateData['edit'] = data;
      console.log(StateData);
      console.log(data)
      // append the data into element.
      extend.placement.$_form(data.account, formEl);
      plg_datePicker.$_manual(formEl);


      return true;
    }
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: event.data
    }, _process);
  }
  /**
   * here we load the view expense page and load the header data as well as also call all three tabs data(general, receipts, payments)
   * @returns {Promise<unknown>}
   */
  const card_view_expense = function () {
    let expense_id = event.data;

    if (element.getAttribute(atr.load.card) === '1') {
      if (element.getAttribute(atr.core.id) === expense_id) {
        toastr.info('Data Already Loaded', 'action repeating');
        return Promise.resolve(true);
      }

    }

    const _process = (data) => {
      console.log(data);
      data = data.data
      let _return = true;
      _process_functional_part();
      _return &&= _process_head(data);
      _return &&= _process_body(data);
      _return &&= _process_foot(data);
      return _return;
    }

    const _process_head = (data) => {

      // take the header.
      const header_hero = element.querySelector(querySA(atr.core.control, 'header'));

      const account_info = data.account;
      // append all account details
      header_hero.querySelector('img').src = avatarPath_1 + account_info.avatar;
      // update basic info
      header_hero.querySelector('h3').innerText = account_info.name;
      let a = header_hero.querySelectorAll('a');
      a[0].setAttribute('href', 'mailto:' + account_info.email);
      a[1].setAttribute('href', 'tel:' + account_info.mobile);
      a[0].innerText = account_info.email;
      a[1].innerText = account_info.mobile;

      // set value into button attributes
      // update id into all seeking buttons
      PB_defined.$_update_catch(element, 'id', account_info);
      PB_defined.$_update_catch(_cardLE.tables, 'id', account_info);

      // set attribute about loading status
      element.setAttribute(atr.load.state, '1');
      element.setAttribute(atr.core.id, account_info.id)


      PB_defined.$_append_templates(element.querySelector(querySA(atr.core.control, 'header')), data);

      return true;
    }
    const _process_body = (data) => {
      PB_defined.$_create_charts(
        element.querySelector(querySA(atr.core.control, 'body')),
        data.charts
      );
      return true;
    }
    const _process_foot = (data) => {
      // footer of general tab
      PB_defined.$_append_templates(element.querySelector(querySA(atr.core.control, 'footer')), data);
      return true;
    }

    const _process_functional_part = () => {
      // clear the tabs id.
      state.clean(Lyt.cards, [_cardLE.state.table]);
      // load append
      PB_defined.$_append_direct(element);
    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      id  : event.data
    }, _process);
  }
  /**
   * here we load add expense page for user
   * @returns {Promise<unknown>}
   */
  const card_add_expense = function () {

    // add options in select,
    let formEl = element.querySelector('form');
    const sts = $R_form_obj.$form(StateData, formEl);

    console.log(sts);

    // TODO: Plug_formValid.onCalling(formEl, 10);

    return Promise.resolve(sts);
  }

  /**
   * here we load add category page for user
   * @returns {Promise<unknown>}
   */
  const card_add_category = function (element, button) {
    // add options in select,
    let thePathArr = get_thePathArr()
    const sts = extend.placement.$_block(element, StateData, thePathArr[0] + '_' + thePathArr[1]);
    return Promise.resolve(sts);
  }


  // switching
  console.log('switching to', event.value);

  switch (event.value) {
    //    console.log('switching to', event.value);
    case pb.mng.accounts.expenses.p.start:
      return true;

    case pb.mng.accounts.expenses.p.new:
      return card_add_expense();

    case pb.mng.accounts.expenses.p.edit:
      return card_edit_expense();

    case pb.mng.accounts.expenses.p.list:
      return card_list_expense();

    case pb.mng.accounts.expenses.p.view:
      return card_view_expense();

    case pb.mng.accounts.expenses.p.cate:
      return card_add_category();
  }
}

const tablesTarget = function (_element, _event) {
  if (_element.getAttribute(atr.load.tab) === '1') {
    return true;
  }
  /*
   ------------------
   internal functions
   ------------------
   */
  // here we load general tab data

  // here we load receipts tab data
  const table_datewise_view = function (data) {

    // here we render the table for transactions.


    // data foreign matching
    redData = extend.foreign.$_remote(exT.foreign.combine, data, [['data', 'dates', 1, 0]]);

    Object.keys(redData.data).forEach((key, index) => {
      let item = redData.data[key];
      // todo: fix this.
      item.push($R_common_obj.$_return(item[3], rdR.common.methods.percent, [item[2]]));
    });

    // access table profile

    PB_defined.$_append_table_simple(_element, redData.data, pb.mng.accounts.expenses.t.datewise);
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;

  }
  // here we load payments tab data
  const table_monthwise_view = function (data) {

    // here we render the table for transactions.

    // data foreign matching
    redData = extend.foreign.$_remote(exT.foreign.combine, data, [['data', 'dates', 1, 0]]);
    // access table profile

    Object.keys(redData.data).forEach((key, index) => {
      let item = redData.data[key];
      // fix this.
      item.push($R_common_obj.$_return(item[3], rdR.common.methods.percent, [item[2]]));

      let days = $R_common_obj.$_return(item[1], rdR.common.methods.date, ['dc']);
      item.push($R_common_obj.$_return(item[3], rdR.common.methods.percent, [days]))
    })
    //
    PB_defined.$_append_table_simple(_element, redData.data, pb.mng.accounts.expenses.t.monthwise);
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;
  }

  const table_details_view = function (data) {

    // here we render the table for transactions.

    // data foreign matching
    redData = extend.foreign.$_remote(exT.foreign.combine, data, [['data', 'dates', 1, 0], ['data', 'accounts', 2, 0]]);

    // access table profile

    PB_defined.$_append_table_simple(_element, redData.data, pb.mng.accounts.expenses.t.details);
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;
  }
  const _process_a = (data) => {
    //      const element = _element.querySelector('#' + _event.value);
    // sending to the targeted function.
    switch (_event.value) {


      case pb.mng.accounts.expenses.c.tab.datewise:
        return table_datewise_view(data);

      case pb.mng.accounts.expenses.c.tab.monthwise:
        return table_monthwise_view(data);

      case pb.mng.accounts.expenses.c.tab.details:
        return table_details_view(data);

    }
  }
  const _process = (data) => {
    data = data.data
    return _process_a(data);
  }

  //console.log(_event);
  return call_AJAX_GET({
    act : _event.value,
    type: _event.type,
    id  : _event.data
  }, _process);
}

const actionsTarget = function (element, event) {
  /*
   ------------
   internal functions
   ------------
   */
  /**
   * here we save the add form data into database
   * @param element
   * @param event
   * @returns {boolean}
   */
  const action_save_expense = function () {

    console.log(event);
    // validate inputs
    const formEle = element.querySelector('form');
    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_save_return(data);
      _return &&= _process_form_old_data_reset(data);
      return _return;
    }
    const _process_save_return = (data) => {

      plg_sweetAlert.$_alert(['Saved', 'Data has been saved successfully.'],
        {
          confirm: [false, '', 'btn btn-light-primary rounded'],
        },
        [2, 5, 1500],)
      return true;
    }

    const _process_form_old_data_reset = (data) => {
      console.log(formEle.id, formEle.getAttribute(atr.form.sno));
      extend.reset.$_simple_form(formEle)

      return true;
    }

    const ___success = () => {

      // collect form data.

      let formData = extend.collect.$_form_simple(formEle)
      console.log(formData)
      return call_AJAX_POST({
        act : event.value,
        type: event.type
      }, formData, _process)

    }

    const __reject = () => {
      return false;
    }

    const param = {
      form_sno: formEle.getAttribute(atr.form.sno),
      method  : deF.form_promise.method.inbuild,
    };
    console.log(param)
    return PB_defined.$_form_validation(___success, __reject, param, deF.methods.promise.form);
  }
  const action_add_category = (element, button) => {
    console.log('i am here to add category in expenses');
  }

  /**
   * here we collect the state for the edit form and save the edit form data into database
   * @param element
   * @param event
   * @returns {boolean}
   */
  const action_edit_expense = function (element, event) {
    // collect modified data.
    let formEle = element.querySelector('form');
    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_save_return(data);
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      return _return;
    }
    const _process_save_return = (data) => {

      plg_sweetAlert.$_alert(['Saved', 'Data has been saved successfully.'],
        {
          confirm: [false, '', 'btn btn-light-primary rounded'],
        },
        [2, 5, 1500],)
      return true;
    }
    const _process_b = (data) => {
      // clean the state for view contacts
      state.manage(Lyt.cards, [_cardLE.state.view_card]);
      // redirect to view card page.
      Initialize.Redirect(get_thePath(), `?act=view&type=card&id=${event.data}`);

      return true;
    }
    const _process_a = (data) => {
      _cardLE.view.removeAttribute(atr.load.card);
      return true;
    }


    const ___success = () => {

      // collect form data.

      let formData = extend.collect.$_form_simple(formEle)
      console.log(formData)
      return call_AJAX_POST({
        act    : event.value,
        type   : event.type,
        account: event.data
      }, formData, _process)

    }

    const __reject = () => {
      return false;
    }

    const param = {
      form_sno: formEle.getAttribute(atr.form.sno),
      method  : deF.form_promise.method.inbuild,
    };
    console.log(param)
    return PB_defined.$_form_validation(___success, __reject, param, deF.methods.promise.form);
  }
  /**
   * here we delete the expense
   * @param element
   * @param event
   * @returns {boolean}
   */
  const action_delete_expense = function (element, event) {

    // collect form data.
    const formData = [{account: event.data}, {security: '123456'}];

    // TODO: balram -> this will be replaced by SWAL promise
    if (!confirm('Are your sure for Delete this expense ??')) {
      //      console.log('delete cancelled');
      return false;
    }

    const _process = (data) => {
      data = data.data
      let _return = true;

      _return &&= _process_a(data);

      return _return;
    }
    const _process_a = (data) => {
      console.log(data);
      if (!data) {
        toastr.success('We are unable to delete this account', "Failed to delete");
        return false;
      }

      switch (element.id) {
        // TODO: remove row using id, pass id in tr using table render.
        case pb.mng.accounts.expenses.p.list:
          // 1. remove the row from the list
          break;
        case pb.mng.accounts.expenses.p.view:
          // 1. remove the status of card and value.
          // 2. remove the row from list card.
          break;
      }
      toastr.success('Account has bend deleted', "Success");

      // return on save data call.
      return true;
    }
    return call_AJAX_POST({
      act    : event.value,
      type   : event.type,
      account: event.data
    }, formData, _process);
  }

  const action_disable_expense = (element, button) => {
    toastr.error('Account can not disabled', "Failed to disable expense");
    return false;
  };

  const action_reset_form = () => {

    console.log(element);
    const formElement = element.querySelector('form');

    // reset the target form
    switch (event.data) {
      case 'save':
        extend.reset.$_simple_form(formElement);
        break;

      case 'update':
        extend.placement.$_form(flashData.edit, formElement);
        break;

    }

    return Promise.resolve(true);
  }

  // request switching.
  switch (event.value) {
    case pb.mng.accounts.expenses.c.form.delete:
      return action_delete_expense(element, button);

    case pb.mng.accounts.expenses.c.form.disable:
      return action_disable_expense(element, button);

    case pb.mng.accounts.expenses.c.form.save:
      return action_save_expense();

    case eValues.action.cards.reset://done
      return action_reset_form();

    case pb.mng.accounts.expenses.c.form.update:
      return action_edit_expense(element, button);

    case pb.mng.accounts.expenses.c.form.class:
      return action_add_category(element, button);
  }
}


// loading form
const get = function (event) {
  switch (event.type) {
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      alert(`eventType: ${event.type}, not GET, change nature to POST`);
      return Promise.reject('Invalid Event Type');
  }
}
const post = function (event) {
  switch (event.type) {

    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : false;

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

export const MAE_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MAC_Requests', 'Request Type: ' + type);
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

