import {get_callEl, get_thePath, get_thePathArr} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {deF, exT, keys, kws, Lyt, rdR} from "../../../base/const.js";
import {$R_common_obj, $R_form_obj, $R_menu_obj, $R_table_obj} from "../../../base/render.js";
import {atr} from "../../../base/attributes.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import plg_datePicker from "../../../plugins/datePicker.js";
import Option_charts from "../../../options/apexcharts.js";
import plg_apexChart from "../../../plugins/apexCharts.js";
import {_cardLE} from "../../../base/elements.js";
import plg_formValid from "../../../plugins/formValid.js";
import extend from "../../../extend/extend.js";
import {eTypes, eValues} from "../../../base/events.js";
import PB_defined from "../../../base/defined.js";
import plg_selectPicker from "../../../plugins/selectPicker.js";
import state from "../../../base/state.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import Initialize from "../../../base/initialize.js";
import {getStateData} from "../../../bucket/state.js";

// Shared variables
let StateData, redData, formEl;
let tableEle;
let chartObject = [];
const thePathArr = get_thePathArr();
let flashData = {
  edit: undefined
}
/**
 * this will be used for show page's base-0 data.
 */
const pageOpen = (data) => {

  const _process = (data) => {
    data = data.data
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
    console.log("Process render menu", data['menu_info'])

    extend.foreign.$_remote(exT.foreign.individual, [data.menu_info.body, StateData.categories], [['name', 1]])
    // calling render to place data
    console.log("Process render menu after", data['menu_info'])


    $R_menu_obj.$_left(
      data['menu_info'],
      rdR.menu.type.stack,
      {},
    );
    return true;
  }

  return _process(data);
}
/**
 * preloaded data that will not change for this page
 */
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
   * it appends html table of vendor
   * list in target from DB.
   * @returns {Promise<unknown>}
   */



  const card_list_vendor = function () {
    tableEle = element.querySelector('table')
    console.log("TABLE ELEL")
    console.log(tableEle)

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
      console.log("processss_a data", data);


      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData)
        return true;
      }

      // render the response data (if required)
      console.log("data before", data)

      //      extend.foreign.$_remote('double', [data.lists, StateData.categories], [[4, 1]])
      extend.foreign.$_remote(
        exT.foreign.combine,
        {...data.lists, ...StateData.categories},
        [["vendor_id", 1]]
      );
      console.log("TABLE ELEL")
      console.log(tableEle, "data", data)
      PB_defined.$_append_table_simple(tableEle, data.lists, pb.mng.accounts.vendors.t.list);
      //

      // shape = $R_table_obj.tableShapes;
      // option = $table.tableOptions;
      // method = $table.tableMethods;
      // profile = $table.tableParams;


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

  const card_edit_vendor = function () {

    console.log("card edit vendor")
    console.log(event)
    let account_id = event.data;

    if (!account_id) {
      toastr.error('Please provide a valid Contact', 'Failed to Load')
      return Promise.reject('Please provide a valid Contact');
    }

    // init the form
    const formEl = element.querySelector('form');
    const sts = $R_form_obj.$form(StateData, formEl);
    plg_selectPicker.$_manual(formEl, kws.attr.pb);
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
      console.log("form Id", form_id, account_id)

      element.querySelector('button[form="' + form_id + '"]').setAttribute(atr.event.value, account_id);

      // save into global variable
      console.log("dataa", element.querySelector('button[form="' + form_id + '"]'));
      flashData.edit = data.vendor_info;
      // append the data into element.
      console.log("data accout", data.vendor_info, formEl)
      extend.placement.$_form(data.vendor_info, formEl);
      plg_datePicker.$_manual(formEl);
      //      StateData['edit'] = data;
      //      console.log(StateData);
      //      console.log(data)
      //      // append the data into element.
      //      extend.placement.$_form(data.account, formEl);
      //      plg_datePicker.$_manual(formEl);

      return true;
    }

    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: event.data
    }, _process)
  }
  /**
   * here we load the view vendor page and load the header data as well as also call all three tabs data(general, receipts, payments)
   * @returns {Promise<unknown>}
   */
  const card_view_vendor = function () {
    let vendor_id = event.data;

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
      console.log("card view render data", data.data)
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
      console.log("account info", account_info)
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
    }, _process)
  }
  /**
   * here we load add vendor page for user
   * @returns {Promise<unknown>}
   */
  const card_add_vendor = function () {

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
  const card_add_category = function () {
    // add options in select,
    let thePathArr = get_thePathArr()
    const sts = extend.placement.$_block(element, StateData, thePathArr[0] + '_' + thePathArr[1]);
    return Promise.resolve(sts);
  }


  // switching
  switch (event.value) {
    case pb.mng.accounts.vendors.p.start:
      return true;

    case pb.mng.accounts.vendors.p.new:
      return card_add_vendor();

    case pb.mng.accounts.vendors.p.edit:
      return card_edit_vendor();

    case pb.mng.accounts.vendors.p.list:
      return card_list_vendor();

    case pb.mng.accounts.vendors.p.view:
      return card_view_vendor();

    case pb.mng.accounts.vendors.p.cate:
      return card_add_category();
  }
}

const tablesTarget = function (_element, _event) {
  if (_element.getAttribute(atr.load.tab) === '1') {
    return Promise.resolve(true);
  }
  /*
   ------------------
   internal functions
   ------------------
   */

  // here we load receipts tab data
  const table_bills_view = function (data) {
    console.log('bills tabs')
    // here we render the table for transactions.
    Object.assign(data, getStateData(['dates', 'ledgers']));

    console.log(data);

    redData = extend.foreign.$_remote(exT.foreign.combine, data, [['bills', 'dates', "date_id", 0], ['bills', 'ledgers', 3, 0]]);
    // access table profile
    console.log("red  DARTa", redData)
    PB_defined.$_append_table_simple(_element, redData.bills, pb.mng.accounts.vendors.t.bills);
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;
  }
  // here we load payments tab data
  const table_payments_view = function (data) {

    // here we render the table for transactions.
    Object.assign(data, getStateData(['dates', 'ledgers']));

    console.log(data);
    redData = extend.foreign.$_remote(exT.foreign.combine, data, [['payments', 'dates', 'date_id', 0], ['payments', 'ledgers', "ledger_id", 0]]);
    console.log("red  DARTa", redData)

    PB_defined.$_append_table_simple(_element, redData.payments, pb.mng.accounts.vendors.t.payment);

    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;
  }

  const table_dues_view = function (data) {

    // here we render the table for transactions.

    // data foreign matching
    Object.assign(data, getStateData(['dates', 'ledgers']));

    console.log(data);
    redData = extend.foreign.$_remote(exT.foreign.combine, data, [['dues', 'dates', "due_date_id", 0], ['dues', 'dates', "invoice_date_id", 0], ['dues', 'ledgers', "purd_account", 0]]);

    console.log("red  DARTa", redData)
    PB_defined.$_append_table_simple(_element, redData.dues, pb.mng.accounts.vendors.t.dues)
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;
  }
  const _process_a = (data) => {
    //      const element = _element.querySelector('#' + _event.value);
    PB_defined.$_update_catch(_cardLE.tables, 'id', {id: _event.data});
    // sending to the targeted function.
    switch (_event.value) {


      case pb.mng.accounts.vendors.c.tab.bills:
        return table_bills_view(data);

      case pb.mng.accounts.vendors.c.tab.payments:
        return table_payments_view(data);

      case pb.mng.accounts.vendors.c.tab.dues:
        return table_dues_view(data);

    }
  }
  const _process = (data) => {
    data = data.data
    return _process_a(data);
  }
  return call_AJAX_GET({
    act : _event.value,
    type: _event.type,
    id  : _event.data
  }, _process)

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
  const action_save_vendor = function () {

    console.log(event, element);
    // validate inputs
    const formEle = element.querySelector('form');


    const _process = (data) => {
      data = data.data;
      let _return = true;
      _return &&= _process_save_return(data);
      _return &&= _process_form_old_data_reset(data);
      return _return;
    }

    const _process_save_return = (data) => {
      const data_1 = data[event.value];

      if (data_1.status === true) {
        console.log("hellot")
        plg_sweetAlert.$_alert(['Ledger Created', `${data_1.message}`],
          {
            confirm: [false, '', 'btn btn-light-primary rounded'],
          },
          [2, 5, 1500],)
        console.log("hellot")

      }
      else {
        console.log("hellof")

        plg_sweetAlert.$_alert(['Failedd to Create', `${data_1.message}`],
          {
            confirm: [true, 'Okay, Let me Try Again!!', 'btn btn-light-danger rounded'],
          },
          [4, 5],);
      }


      return true;
      //      plg_sweetAlert.$_alert(['Saved', 'Data has been saved successfully.'],
      //        {
      //          confirm: [false, '', 'btn btn-light-primary rounded'],
      //        },
      //        [2, 5, 1500],)
      //      return true;
    }

    const _process_form_old_data_reset = (data) => {

      const data_use = data[event.value];
      data_use.status === true ? extend.reset.$_simple_form(formEle) : false;
      return true;
      //      console.log(formEle.id, formEle.getAttribute(atr.form.sno));
      //      extend.reset.$_simple_form(formEle)
      //
      //      return true;
    }


    const ___success = () => {

      // collect form data.

      let formData = extend.collect.$_form_simple(formEle)
      console.log(formData)
      return call_AJAX_POST({
        act : event.value,
        type: event.type,
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
    console.log('i am here to add category in vendors');
  }

  /**
   * here we collect the state for the edit form and save the edit form data into database
   * @param element
   * @param event
   * @returns {boolean}
   */
  const action_edit_vendor = function () {
    console.log("action edit vendor", event);
    // collect modified data.
    let formEl = element.querySelector('form');
    const formData = extend.collect.$_form_simple(formEl);
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

    // value change checking
    //    const _process = (data) => {
    //
    //      const ajaxData = data.data;
    //      let _return = true;
    //
    //      _return &&= _process_form_sbmit(ajaxData);
    //      _return &&= _process_a(ajaxData);
    //      _return &&= _process_b(ajaxData);
    //      //        _return &&= _process_c(data);
    //
    //      return _return;
    //    }
    //    const _process_b = (data) => {
    //      // clean the state for view contacts
    //      state.manage(Lyt.cards, [_cardLE.state.view_card]);
    //      // redirect to view card page.
    //      Initialize.Redirect(get_thePath(), `?act=view&type=card&id=${event.data}`);
    //
    //      return true;
    //    }
    //    const _process_a = (data) => {
    //      _cardLE.view.removeAttribute(atr.load.card);
    //      return true;
    //    }
    //    //    const _process_c = (data) => {
    //    //
    //    //    }
    //
    //
    //    const _process_form_sbmit = (data) => {
    //      console.log(data);
    //      // change form state to readonly. (non editable)
    //      extend.collect.$_form_state(formEl, 'read');
    //
    //      toastr.success('Changes has Saved.', "Successfully Edited.");
    //
    //      // return on save data call.
    //      return true;
    //    }
    //    const ___success = () => {
    //
    //      // collect form data.
    //
    //      let formData = extend.collect.$_form_simple(formEle)
    //      console.log(formData)
    //      return call_AJAX_POST({
    //        act    : event.value,
    //        type   : event.type,
    //        account: event.data
    //      }, formData, _process)
    //
    //    }
    //
    //    const __reject = () => {
    //      return false;
    //    }
    //
    //    const param = {
    //      form_sno: formEle.getAttribute(atr.form.sno),
    //      method  : deF.form_promise.method.inbuild,
    //    };
    //    console.log(param)
    //    return PB_defined.$_form_validation(___success, __reject, param, deF.methods.promise.form);

  }
  /**
   * here we delete the vendor
   * @param element
   * @param event
   * @returns {boolean}
   */
        //  const action_delete_vendor = function (element, event) {
        //
        //    // collect form data.
        //    const formData = [
        //      {account: event.data},
        //      {security: '123456'}
        //    ];
        //
        //
        //    // TODO: balram -> this will be replaced by SWAL promise
        //    //    if (!confirm('Are your sure for Delete this vendor ??')) {
        //    //      //      console.log('delete cancelled');
        //    //      return true;
        //    //    }
        //
        //
        //    const _process = (data) => {
        //      data = data.data
        //      let _return = true;
        //
        //      _return &&= _process_a(data);
        //
        //      return _return;
        //
        //    }
        //    const _process_a = (data) => {
        //      console.log(data);
        //      if (!data) {
        //        toastr.success('We are unable to delete this account', "Failed to delete");
        //        return false;
        //      }
        //
        //      switch (element.id) {
        //        // TODO: remove row using id, pass id in tr using table render.
        //        case pb.mng.accounts.vendors.p.list:
        //          // 1. remove the row from the list
        //          break;
        //        case pb.mng.accounts.vendors.p.view:
        //          // 1. remove the status of card and value.
        //          // 2. remove the row from list card.
        //          break;
        //      }
        //      toastr.success('Account has bend deleted', "Success");
        //
        //      // return on save data call.
        //      return true;
        //    }
        //    return call_AJAX_POST({
        //      act : event.value,
        //      type: event.type,
        //      id  : event.data
        //    }, formData, _process)
        //  }
  const action_delete_vendor = () => {

          const _process = (data) => {
            let _return = true;
            _return &&= _process_final(data.data)
            _return &&= _process_cleanup();
            _return &&= _process_redirect_to_list();
            return _return;
          }

          const _process_final = (data) => {

            const data_use = data[event.value];
            console.log(data, event.value);
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
          console.log("flashdata", flashData)
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
  const action_disable_vendor = (element, button) => {
    toastr.error('Account can not disabled', "Failed to disable vendor");
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
    case pb.mng.accounts.vendors.c.form.delete:
      return action_delete_vendor();

    case pb.mng.accounts.vendors.c.form.disable:
      return action_disable_vendor();

    case eValues.action.cards.reset://done
      return action_reset_form();

    case pb.mng.accounts.vendors.c.form.save:
      return action_save_vendor();

    case pb.mng.accounts.vendors.c.form.update:
      return action_edit_vendor();

    case pb.mng.accounts.vendors.c.form.class:
      return action_add_category();
  }
}

// Public methods


// loading form
export const MAV_cards = function (_event) {
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};
export const MAV_navtabs = function (_event) {
  return eleCheck() ? tablesTarget(get_callEl(), _event) : false;
};
export const MAV_actions = function (_event) {
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all basic required details


// fetching all upcoming required details
export const MAV_state = function (data) {
  return pageOpen(data);
};

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


export const MAV_Requests = (data, type) => {
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
