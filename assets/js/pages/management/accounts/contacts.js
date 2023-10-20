import extend from "../../../extend/extend.js";
import {$R_form_obj, $R_menu_obj, $R_table_obj} from "../../../base/render.js";
import plg_selectPicker from "../../../plugins/selectPicker.js";
import plg_datePicker from "../../../plugins/datePicker.js";
import {get_callEl, get_thePath, get_thePathArr} from "../../../base/global.js";
import {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {deF, exT, keys, kws, Lyt, rdR} from "../../../base/const.js";
import {atr} from "../../../base/attributes.js";
import pb from "../../../base/structure.js";
import {_cardLE} from "../../../base/elements.js";
import {eTypes, eValues} from "../../../base/events.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import PB_defined from "../../../base/defined.js";
import state from "../../../base/state.js";
import {getStateData} from "../../../bucket/state.js";
import Initialize from "../../../base/initialize.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";


// Shared variables
let StateData, redData, formEl;
let tableEle;
let chartObject = [];
let flashData = {
  edit: undefined
}

// Private functions

/**
 * preloaded data that will not change for this page
 */
const pageOpen = (poData) => {
  console.log(poData);

  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_render_menu(data);
    _return &&= _process_enable_form(data);
    return _return;
  }


  const _process_save_page_state = (data) => {
    StateData = data['page_common_info'];
    return true;
  }
  const _process_enable_form = (data) => {
    exe_plugins_on_manualCall(_cardLE.boards, {}, kws.plugins_on_call.formCombo);
    return true;
  }

  const _process_render_menu = (data) => {

    // update category names.
    extend.foreign.$_remote(exT.foreign.individual,
      [
        data.menu_info.body,
        StateData.categories
      ],
      [['name', 1]]
    );

    // calling render to place data
    $R_menu_obj.$_left(
      data['menu_info'],
      rdR.menu.type.stack,
      {},
    );
    return true;
  }

  return _process(poData.data);
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

const cardsTarget = function (element, event) {

  /*
   ----------------------
   internal functions
   ----------------------
   */

  /**
   * it appends html table of a contact list in target from DB.
   * @returns {Promise<unknown>}
   */
  const card_list_contact = function () {

    tableEle = element.querySelector('table')

    if (!tableEle) {
      return Promise.reject('Table Element is not found');
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return Promise.resolve(true);
    }
    const _process = (data) => {
      return _process_a(data.data)
    }
    const _process_a = (data) => {
      // if no data found, then show no data found message.
      if (data.lists.length === 0) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData);
        return true;
      }

      // render the response data (if required)

      console.log(StateData);
      //      console.log(StateData.categories)

      extend.foreign.$_remote(
        exT.foreign.individual,
        [data.lists, StateData.categories],
        [['group_id', 1]]
      );

      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(tableEle, data.lists, pb.mng.accounts.contacts.t.list);

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
   * @returns {{AjaxPB}, {boolean}}
   */
  const card_edit_contact = function () {
    let account_id = event.data;

    if (!account_id) {
      toastr.error('Please provide a valid Contact', 'Failed to Load')
      return false;
    }

    // init the form
    const formEl = element.querySelector('form');
    const sts = $R_form_obj.$form(StateData, formEl);
    // enable select-picker for the selects into the form.
    plg_selectPicker.$_manual(formEl, kws.attr.pb);

    if (!sts) {
      toastr.error('Form initialized has failed', 'Failed to Load');
      return false;
    }

    const _process = (data) => {
      return _process_a(data.data)
    }
    const _process_a = (data) => {
      //        console.log(data);

      if (!data) {
        toastr.error('Unable to get data from the Server', 'Failed to Load');
        return false;
      }

      // set account id into submitting button.
      const form_id = formEl.getAttribute('id');
      element.querySelector('button[form="' + form_id + '"]').setAttribute(atr.event.value, account_id);

      // save flash data;
      flashData.edit = data.account;
      // append the data into element.
      extend.placement.$_form(data.account, formEl);
      plg_datePicker.$_manual(formEl);

      return true;
    }
    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: event.data
    }, _process)
  }
  /**
   * here we load the view contact page and load the header data as well as also call all three tabs data(general, receipts, payments)
   * @returns {Promise<unknown>}
   */
  const card_view_contact = function () {

    if (element.getAttribute(atr.load.state) === '1') {
      if (element.getAttribute(atr.core.id) === event.data) {
        toastr.info('Data Already Loaded', 'action repeating');
        return Promise.resolve(true);
      }
    }

    const _process = (data) => {

      // if no data found, then show no data found message.
      if (!data.status) {
        toastr.error('Could not Fetch Account Details', 'Failed to Fetch');
        return false;
      }

      // save into flash
      flashData.view = data.data;

      // process the data
      let _return = true;
      _process_functional_part();
      _return &&= _process_head(data.data);
      _return &&= _process_body(data.data);
      _return &&= _process_foot(data.data);
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
   * here we load add contact page for user
   * @returns {Promise<unknown>}
   */
  const card_add_contact = function () {

    // add options in select,
    let formEl = element.querySelector('form');

    const sts = $R_form_obj.$form(StateData, formEl);

    return Promise.resolve(sts);
  }

  /**
   * here we load add category page for user
   * @returns {Promise<unknown>}
   */
  const card_add_category = function () {
    const thePathArr = get_thePathArr();
    // add options in select,
    const sts = extend.placement.$_block(element, StateData, thePathArr[0] + '_' + thePathArr[1]);
    return Promise.resolve(true);
  }


  // switching
  switch (event.value) {
    case pb.mng.accounts.contacts.p.start:
      return true;

    case pb.mng.accounts.contacts.p.new:
      return card_add_contact();

    case pb.mng.accounts.contacts.p.edit:
      return card_edit_contact();

    case pb.mng.accounts.contacts.p.list:
      return card_list_contact();

    case pb.mng.accounts.contacts.p.view:
      return card_view_contact();

    case pb.mng.accounts.contacts.p.cate:
      return card_add_category();
  }
}

const tablesTarget = function (element, _event) {

  if (element.getAttribute(atr.load.state) === '1') {
    return Promise.resolve(true);
  }

  /*
   ------------------
   internal functions
   ------------------
   */
  // load receipts tab data
  const table_receipts_view = function (data) {
    // data foreign matching
    Object.assign(data, getStateData(['dates', 'ledgers']));
    redData = extend.foreign.$_remote(
      exT.foreign.combine,
      data,
      [
        ['transactions', 'dates', 'date_id', 0],
        ['transactions', 'ledgers', 'ledger_id', 1]
      ]
    );
    console.log(redData)
    // render the table for transactions.
    PB_defined.$_append_table_simple(element, redData.transactions, pb.mng.accounts.contacts.t.receipt);

    // change account name
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;
  }
  // here we load payments tab data
  const table_payments_view = function (data) {
    Object.assign(data, getStateData(['dates', 'ledgers']));
    // data foreign matching
    redData = extend.foreign.$_remote(
      exT.foreign.combine,
      data,
      [
        ['transactions', 'dates', 'date_id', 0],
        ['transactions', 'ledgers', 'ledger_id', 1]
      ]
    );
    // render the table for transactions.
    PB_defined.$_append_table_simple(element, redData.transactions, pb.mng.accounts.contacts.t.payment);

    // change account name
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;
  }


  const _process_a = (data) => {
    // update ids.
    PB_defined.$_update_catch(_cardLE.tables, 'id', {id: _event.data});

    // sending to the targeted function.
    switch (_event.value) {

      case pb.mng.accounts.contacts.c.tab.receipts:
        return table_receipts_view(data);

      case pb.mng.accounts.contacts.c.tab.payments:
        return table_payments_view(data);

    }
  }

  const _process = (data) => {
    return _process_a(data.data);
  }
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
  const action_save_contact = () => {
    const formEle = element.querySelector('form');

    const _process = (data) => {
      data = data.data;
      let _return = true;
      _return &&= _process_save_return(data);
      _return &&= _process_old_formData_reset(data);
      return _return;
    }

    const _process_save_return = (data) => {
      console.log(data);
      const data_1 = data[event.value];
      if (data_1.status === true) {
        plg_sweetAlert.$_alert(['Contact Created', `${data_1.message}`],
          {
            confirm: [false, '', 'btn btn-light-primary rounded'],
          },
          [2, 5, 1500],)
      }
      else {
        plg_sweetAlert.$_alert(['Failed to Create', `${data_1.message}`],
          {
            confirm: [true, 'Okay, Let me Try Again!!', 'btn btn-light-danger rounded'],
          },
          [4, 5],);
      }


      return true;
    }

    const _process_old_formData_reset = (data) => {
      const data_use = data[event.value];
      data_use.status === true ? extend.reset.$_simple_form(formEle) : false;
      return true;
    }

    const ___success = () => {
      // collect form data.
      let formData = extend.collect.$_form_simple(formEle)
      // call the ajax
      return call_AJAX_POST({
        act : event.value,
        type: event.type,
      }, formData, _process)
    }

    const __reject = () => {
      return Promise.reject('Form Validation Failed');
    }

    const param = {
      form_sno: formEle.getAttribute(atr.form.sno),
      method  : deF.form_promise.method.inbuild,
    };
    return PB_defined.$_form_validation(___success, __reject, param);
  }

  const action_add_category = () => {
    console.log('i am here to add category in contacts');
  }

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

  const action_edit_contact = () => {
    console.log(event);
    // collect modified data.
    formEl = element.querySelector('form');
    const formData = extend.collect.$_form_simple(formEl);
    // value change checking

    const _process = (data) => {

      const ajaxData = data.data;
      let _return = true;

      _return &&= _process_form_submit(ajaxData);
      _return &&= _process_maintain_the_states(ajaxData);
      _return &&= _process_redirect_to_view(ajaxData);

      _cleanUP();

      return _return;
    }
    const _cleanUP = () => {
      flashData.edit = undefined;
    }
    const _process_redirect_to_view = (data) => {
      // clean the state for view contacts
      state.manage(Lyt.cards, [_cardLE.state.view_card]);
      // redirect to view card page.
      Initialize.Redirect(get_thePath(), `?act=view&type=card&id=${event.data}`);

      return true;
    }
    const _process_maintain_the_states = (data) => {
      _cardLE.view.removeAttribute(atr.load.card);
      return true;
    }


    const _process_form_submit = (data) => {
      console.log(data);
      // change form state to readonly. (non editable)
      extend.collect.$_form_state(formEl, 'read');

      toastr.success('Changes has Saved.', "Successfully Edited.");

      // return on save data call.
      return true;
    }

    return call_AJAX_POST({
      act : event.value,  //update
      type: event.type,  //action
      id  : event.data //id
    }, formData, _process);

  }

  const action_delete_contact = () => {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_final(data.data)
      _return &&= _process_cleanup();
      _return &&= _process_redirect_to_list();
      return _return;
    }

    const _process_final = (data) => {

      const data_use = data[event.value];
      console.log(data_use);
      //
      if (data_use.status) {
        // 1. remove the status of the card and value.
        // 2. remove the row from the list card.
        toastr.success('Account has bend deleted', "Success");
        return true;
      }
      else {
        toastr.success('We are unable to delete this account', "Failed to delete");
        return false;
      }
    }

    const _process_cleanup = () => {
      flashData.view = undefined;
      return true;
    }

    const _process_redirect_to_list = () => {
      // redirect to view card page.
      Initialize.Redirect(get_thePath(), `?act=list&type=card`);
      return true;
    }

    const __confirm = () => {
      // collect form data.
      const formData = [
        {account: event.data},
        {ledger_id: flashData.view.account.ledger_id ?? event.data},
        {security: '123456'}
      ];
      console.log('called the confirm');
      return call_AJAX_POST({
        act : event.value,
        type: event.type,
        id  : event.data
      }, formData, _process);
    }

    const __cancel = () => {
      return Promise.reject('User Not Allowed to delete');
    }

    const name = flashData.view.account.name;

    return plg_sweetAlert.$_confirm(
      ['Delete Contact ', `Are you sure to delete ${name}`, 'If any transactions created, it will be disabled.'],
      {
        confirm: [true, 'Sure, Delete', 'btn btn-primary rounded'],
        cancel : [true, 'Cancel', 'btn btn-secondary rounded'],
      },
      [5, 5],
      {
        confirm: __confirm,
        cancel : __cancel,
      }
    );
  }

  const action_disable_contact = () => {
    toastr.error('Account can not disabled', "Failed to disable contact");
    return Promise.resolve(true);
  };

  // request switching.
  switch (event.value) {

    case eValues.action.cards.save://done
      return action_save_contact();

    case eValues.action.cards.update://done
      return action_edit_contact();

    case eValues.action.cards.reset://done
      return action_reset_form();

    case eValues.action.cards.delete:
      return action_delete_contact();

    case eValues.action.cards.disable:
      return action_disable_contact();

    case eValues.action.cards.add:
      return action_add_category();

  }
}

const changesTarget = (element, event) => {

  const change_list_status = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_insert_table(data.data);
      return _return;
    }
    const _process_insert_table = (data) => {
      // get the table element
      tableEle = element.querySelector('table')


      if (data.lists.length === 0) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData);
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_remote(
        exT.foreign.combine,
        {...data.lists, ...StateData.categories},
        [["group_id", 1]]
      );

      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(tableEle, data.lists, pb.mng.accounts.contacts.t.list);
      return true;
    }
    return call_AJAX_GET({
      act : event.value,
      type: event.type,
    }, _process);
  }

  switch (event.value) {
    case pb.mng.accounts.contacts.p.list:
      return change_list_status();
  }

  // use auto call inf required.

  return Promise.resolve(true);
}

const switchsTarget = (element, event) => {
  // todo: this is for call the first function of new layout.
  switch (event.switch) {
    case Lyt.stepper:
      // todo: init function of the layout.
      break;
  }

  // use auto call inf required.

  return true;
}

const get = function (event) {
  switch (event.type) {
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.switch:
      return eleCheck() ? switchsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
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
    case eTypes.change:
      return eleCheck() ? changesTarget(get_callEl(), event) : false;
    default:
      return Promise.reject('Invalid Event Type');
  }
}


export const MAC_Requests = (data, type) => {
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
