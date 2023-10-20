import {get_callEl, get_thePath, get_thePathArr} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {deF, exT, keys, kws, Lyt, rdR} from "../../../base/const.js";
import {$R_common_obj, $R_form_obj, $R_menu_obj, $R_table_obj} from "../../../base/render.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import plg_datePicker from "../../../plugins/datePicker.js";
import Option_charts from "../../../options/apexcharts.js";
import plg_apexChart from "../../../plugins/apexCharts.js";
import {_cardLE} from "../../../base/elements.js";
import plg_formValid from "../../../plugins/formValid.js";
import extend from "../../../extend/extend.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import PB_defined from "../../../base/defined.js";
import {eTypes, eValues} from "../../../base/events.js";
import plg_selectPicker from "../../../plugins/selectPicker.js";
import {getStateData} from "../../../bucket/state.js";
import state from "../../../base/state.js";
import Initialize from "../../../base/initialize.js";
// Shared variables
let StateData, redData, formEl;
let tableEle;
let chartObject = [];

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
    return _return;
  }

  const _process_save_page_state = (data) => {
    StateData = data['page_common_info'];
    return true;
  }
  const _process_render_menu = (data) => {
    extend.foreign.$_remote(exT.foreign.individual, [data.menu_info.body, StateData.categories], [['name', 1]])
    // calling render to place data
    $R_menu_obj.$_left(
      data['menu_info'],
      rdR.menu.type.stack,
      {},
    );
    return true;
  }
  return call_AJAX_GET({
    act : 'page',
    type: 'open'
  }, _process)
}


const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Banking');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Banks');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

/**
 * preloaded data that will not change for this page
 */

      // create basic HTML table for accounts list.
const tableFormation = function (lists) {

        // rendering data into table using above profile.
        redData = $R_table_obj.$_simple(lists, pb.mng.accounts.banks.t.list);

        // have look into plain HTML table
        //console.log(redData);

        tableEle.appendChild(redData)

        // update table status
        tableEle.setAttribute(atr.load.table, '1');

        // apply common renders
        $R_common_obj.$_call(tableEle);

        // for enable dropdown in the table.
        KTMenu.init();
      }

const dataTablesInit = (eventType) => {
  console.log('to be initialized');
}
const filterEvents = (eventType) => {
  console.log('to be initialized');
}

const cardsTarget = function (element, event) {

  /*
   ----------------------
   internal functions
   ----------------------
   */

  /**
   * it appends html table of bank list in target from DB.
   *
   * @returns {Promise<unknown>}
   */
  const card_list_bank = function () {

    tableEle = element.querySelector('table')

    if (!tableEle) {
      return Promise.reject('Table Element is not found');
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return Promise.resolve(true);
    }

    const _process = (data) => {
      data = data.data
      return _process_a(data);
    }


    const _process_a = (data) => {
      console.log(data);

      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData)
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_remote('double', [data.lists, StateData.categories], [["category_id", 1]])
      console.log("data lists", data.lists)
      PB_defined.$_append_table_simple(tableEle, data.lists, pb.mng.accounts.banks.t.list);
      //

      // shape = $R_table_obj.tableShapes;
      // option = $table.tableOptions;
      // method = $table.tableMethods;
      // profile = $table.tableParams;

      return true;
    }
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)

  }

  /**
   * here we put the data into edit form for editing the data
   * @param element
   * @param event
   * @returns {Promise<unknown>}
   */
  const card_edit_bank = function () {
    let account_id = event.data;
    console.log(event);
    console.log(element)

    if (!account_id) {
      toastr.error('Please provide a valid Bank', 'Failed to Load')
      return Promise.reject('Please provide a valid Bank');

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
      element.querySelector('button[form="' + form_id + '"]').setAttribute(atr.event.value, account_id);

      // save into global variable
      StateData['edit'] = data;
      let selectedInput = StateData.categories[parseInt(data.account.category_id)][1];
      if (selectedInput === "Current Account" || selectedInput === "Saving Account") {

        formEl.querySelector(querySA(atr.core.append, "od_acc")).replaceChildren();
        formEl.querySelector(querySA(atr.core.append, "credit_card")).replaceChildren();
      }
      else if (selectedInput === "OD Account" || selectedInput === "OCC Account") {


        formEl.querySelector(querySA(atr.core.append, "credit_card")).replaceChildren();
        if (formEl.querySelector(querySA(atr.core.append, "od_acc")).children.length === 1) {
          return true;
        }
        let newInput = _cardLE.templates.querySelector(querySA(atr.core.template, "od_acc"));
        newInput.classList.remove('d-none');
        formEl.querySelector(querySA(atr.core.append, "od_acc")).appendChild(newInput.cloneNode(true));
        const sts = $R_form_obj.$global({...StateData}, formEl, rdR.form.method.advance);

      }
      else {


        formEl.querySelector(querySA(atr.core.append, "od_acc")).replaceChildren();
        if (formEl.querySelector(querySA(atr.core.append, "credit_card")).children.length === 1) {
          return true;
        }
        let newInput = _cardLE.templates.querySelector(querySA(atr.core.template, "credit_card"));
        newInput.classList.remove('d-none');
        formEl.querySelector(querySA(atr.core.append, "credit_card")).appendChild(newInput.cloneNode(true));
        let ele = formEl.querySelector(querySA(atr.core.append, "credit_card"))
        const sts = $R_form_obj.$global({...StateData}, formEl, rdR.form.method.advance);
      }

      flashData.edit = data.account;
      // append the data into element.
      extend.placement.$_form(data.account, formEl);
      plg_datePicker.$_manual(formEl);
      //      @todo placement does not work for date plugins
      return true;
    }

    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: event.data
    }, _process);
  }
  /**
   * here we load the view bank page and load the header data as well as also call all three tabs data(general, receipts, payments)
   *
   * @returns {Promise<unknown>}
   */
  const card_view_bank = function () {
    console.log("inside card view bank")

    if (element.getAttribute(atr.load.card) === '1') {
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

      // process the data
      console.log("dataa", data)
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
      console.log("account info", account_info)
      // append all account details
      header_hero.querySelector('img').src = avatarPath_1 + account_info.icon;
      // update basic info
      header_hero.querySelector('h3').innerText = account_info.name;
      let a = header_hero.querySelectorAll('a');
      a[0].innerText = account_info.account_number;
      a[1].innerText = account_info.cate_id;

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
      //      PB_defined.$_create_charts(
      //        element.querySelector(querySA(atr.core.control, 'body')),
      //        data.charts
      //      );
      PB_defined.$_create_charts(
        element.querySelector(querySA(atr.core.control, 'body')),
        data.charts
      );
      //      return true;
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
    //    const _process_a = (data) => {
    //      console.log(data);
    //      if (!data) {
    //        toastr.error('Could not Fetch Account Details', 'Failed to Load');
    //        return false;
    //      }
    //
    //      let childNode;
    //
    //      // append all account details
    //      childNode = element.querySelector('[data-pb-control="header"]');
    //      console.log(data)
    //      childNode.querySelector('img').src = '../../assets/media/avatars/' + data.account.icon;
    //      childNode.querySelector('h3').innerText = data.account.name;
    //      let a = childNode.querySelectorAll('a');
    //      a[0].setAttribute('href', 'mailto:' + data.account.cate_id);
    //      // a[1].setAttribute('href', 'tel:' + ajaxResponse.account.mobile);
    //      a[0].innerText = data.account.name;
    //      //a[1].innerText = ajaxResponse.account.mobile;
    //
    //      // set value into button attributes
    //      element.querySelector('[data-kt-menu="true"]').querySelectorAll('button').forEach((button) => {
    //        button.setAttribute(atr.event.value, data.account.id);
    //      });
    //      element.querySelectorAll('[' + atr.core.catch + '="id"]').forEach((button) => {
    //        button.setAttribute(atr.event.value, data.account.id);
    //      });
    //
    //      // render data into general tab
    //      /*
    //       const navtab = pb.mng.accounts.banks.c.tab.general;
    //       navtabsTarget(element, {
    //       value: navtab,
    //       data : bank_id
    //       });
    //       */
    //      // set attribute about loading status
    //      element.setAttribute(atr.load.card, '1');
    //      element.setAttribute(atr.core.id, bank_id)
    //
    //      // reset all inner tabs buttons.
    //      element.querySelectorAll('[name="navtab"]').forEach((btn) => {
    //        element.querySelector('#' + btn.value).removeAttribute(atr.load.tab);
    //      })
    //
    //      return true;
    //    }


  }
  /**
   * here we load add bank page for user
   * @returns {Promise<unknown>}
   */
  const card_add_bank = function () {

    // add options in select,
    console.log(StateData);
    let formEl = element.querySelector('form');
    const sts = $R_form_obj.$global({...StateData}, formEl, rdR.form.method.advance)

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
    //    let thePathArr = get_thePathArr();
    //
    //    const sts = extend.placement.$_block(element, StateData, thePathArr[0] + '_' + thePathArr[1]);
    return Promise.resolve(true);

  }


  // switching
  switch (event.value) {
    case pb.mng.accounts.banks.p.start:
      return true;

    case pb.mng.accounts.banks.p.new:
      return card_add_bank();

    case pb.mng.accounts.banks.p.edit:
      return card_edit_bank();

    case pb.mng.accounts.banks.p.list:
      return card_list_bank();

    case pb.mng.accounts.banks.p.view:
      return card_view_bank();

    case pb.mng.accounts.banks.p.cate:
      return card_add_category();
  }
}

const tablesTarget = function (element, event) {
  console.log(event);
  if (element.getAttribute(atr.load.tab) === '1') {
    return Promise.resolve(true);
  }
  /*
   ------------------
   internal functions
   ------------------
   */
  // here we load general tab data
  //  const navtab_general_view = function (element, data, event) {
  //    console.log(event)
  //    let childNode;
  //
  //    const chartFormation = (data) => {
  //      let key;
  //      // getting the final HTML element
  //      childNode.querySelectorAll('[data-pb-child="chart"]>div').forEach((chart) => {
  //        key = chart.getAttribute(atr.core.key);
  //        // balance chart
  //        redData = Option_charts.createDataset(data[key]);
  //        if (!chartObject[key]) {
  //          // initialize of the chart
  //          let thePathArr = get_thePathArr()
  //          redData = Option_charts.buildingOptions(redData, thePathArr, key);
  //          chartObject[key] = plg_apexChart.$_manual(chart, redData);
  //        }
  //        else {
  //          // data loading into chart
  //          plg_apexChart.$_update(chartObject[key], redData);
  //        }
  //      });
  //    }
  //
  //    // here we put the general details of account
  //    console.log(data);
  //    // header of general tab
  //    element.querySelector(querySA(atr.core.control, 'general-header')).children.forEach((child) => {
  //      const key = child.getAttribute(atr.core.append);
  //
  //      let template = _cardLE.template.querySelector(querySA(atr.core.template, key));
  //
  //      child.innerHTML = extend.append.$_single(template.innerHTML, data[key]);
  //      $R_common_obj.$_call(child);
  //    });
  //
  //    // body of general tab
  //    childNode = element.querySelector('[data-pb-control="general-body"]');
  //    chartFormation(data.charts);
  //
  //    // footer of general tab
  //    childNode = element.querySelector('[data-pb-control="general-footer"]');
  //    data.other.notification = $R_common_obj.$_return(data.other.notify_mode, rdR.common.methods.string, {});
  //    console.log(data.other.notification);
  //    childNode.innerHTML = extend.append.$_single(childNode.innerHTML, data.other);
  //
  //    // update navtab status
  //    element.setAttribute(atr.load.tab, '1');
  //    return true;
  //  }
  // here we load receipts tab data

  const table_deposits_view = function (data) {

    // render the table for transactions.
    PB_defined.$_append_table_simple(element, data.deposits, pb.mng.accounts.banks.t.deposits);

    // change account name
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;
  }
  const table_expenses_view = function (data) {
    // render the table for transactions.
    PB_defined.$_append_table_simple(element, data.expenses, pb.mng.accounts.banks.t.expenses);

    // change account name
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;

  }
  const table_payments_view = function (data) {
    // render the table for transactions.
    PB_defined.$_append_table_simple(element, data.payments, pb.mng.accounts.banks.t.payments);

    // change account name
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;
  }
  const table_receipts_view = function (data) {
    // here we render the table for transactions.
    console.log(element, data.receipts, data);
    PB_defined.$_append_table_simple(element, data.receipts, pb.mng.accounts.banks.t.receipts);
    _cardLE.tables.querySelector('h3 > span').innerText = data.account_info.name;
    return true;
  }
  // here we load payments tab data
  const _process_a = (data) => {
    //      const element = _element.querySelector('#' + _event.value);
    // sending to the targeted function.
    PB_defined.$_update_catch(_cardLE.tables, 'id', {id: event.data});
    switch (event.value) {
      //      case pb.mng.accounts.banks.c.tab.general:
      //        return navtab_general_view(_element, data, _event);

      case pb.mng.accounts.banks.c.tab.receipts:
        return table_receipts_view(data);

      case pb.mng.accounts.banks.c.tab.payments:
        return table_payments_view(data);

      case pb.mng.accounts.banks.c.tab.expenses:
        return table_expenses_view(data);

      case pb.mng.accounts.banks.c.tab.deposits:
        return table_deposits_view(data);

    }
  }
  const _process = (data) => {
    data = data.data
    return _process_a(data);
  }
  return call_AJAX_GET({
    act : event.value,
    type: event.type,
    id  : event.data
  }, _process)
  //console.log(_event);

}

const actionsTarget = function (element, event) {
  console.log(element)
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
  const action_save_bank = function () {

    console.log(event);
    // validate inputs
    console.log(element);
    const formEle = element.querySelector('form');
    console.log(formEle)
    //    const form_sno = formEle.hasAttribute(atr.form.sno)
    //      ? formEle.getAttribute(atr.form.sno)
    //      : element.querySelector(`button[form="${formEle.id}"][${atr.form.submit}]`).getAttribute(atr.form.sno)
    //    if (!plg_formValid.$_get(form_sno)) {
    //      //        return true;
    //    }
    //
    //    // collect data.
    //    const formData = extend.collect.$_form(formEle);

    const _process = (data) => {
      data = data.data;
      let _return = true;
      _return &&= _process_save_return(data);
      _return &&= _process_form_old_data_reset(data);
      return _return;
    }

    const _process_save_return = (data) => {

      //      plg_sweetAlert.$_alert(['Saved', 'Data has been saved successfully.'],
      //        {
      //          confirm: [false, '', 'btn btn-light-primary rounded'],
      //        },
      //        [2, 5, 1500],)
      //      return true;
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

    const _process_form_old_data_reset = (data) => {
      //      console.log(formEle.id, formEle.getAttribute(atr.form.sno));
      //      extend.reset.$_simple_form(formEle)
      //
      //      return true;
      const data_use = data[event.value];
      data_use.status === true ? extend.reset.$_simple_form(formEle) : false;
      return true;
    }

    const ___success = () => {
      //      const ajax = new AjaxPB();
      // collect form data.

      let formData = extend.collect.$_form_simple(formEle)
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
    console.log('i am here to add category in banks');
  }

  /**
   * here we collect the state for the edit form and save the edit form data into database
   * @param element
   * @param event
   * @returns {boolean}
   */
  const action_edit_bank = function (element, event) {
    //    console.log(event);
    //    // collect modified data.
    //    formEl = element.querySelector('form');
    //    const formData = extend.collect.$_form(formEl);
    //    // value change checking
    //
    //
    //    const _process = (data) => {
    //      data = data.data
    //      let _return = true;
    //
    //      _return &&= _process_a(data);
    //
    //      return _return;
    //    }
    //    const _process_a = (data) => {
    //      console.log(data);
    //      // change form state to readonly. (non editable)
    //      extend.collect.$_state(formEl, 'read');
    //
    //      toastr.success('Changes has Saved.', "Successfully Edited.");
    //
    //      // return on save data call.
    //      return true;
    //    }
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act    : event.value,
    //      type   : event.type,
    //      account: event.data
    //    }, 'local', 0);
    //    ajax.callREQUEST({formData}, urlID, true, _process);
    console.log(event);
    // validate inputs
    console.log(element);
    const formEle = element.querySelector('form');
    console.log(formEle)
    //    const form_sno = formEle.hasAttribute(atr.form.sno)
    //      ? formEle.getAttribute(atr.form.sno)
    //      : element.querySelector(`button[form="${formEle.id}"][${atr.form.submit}]`).getAttribute(atr.form.sno)
    //    if (!plg_formValid.$_get(form_sno)) {
    //      //        return true;
    //    }
    //
    //    // collect data.
    //    const formData = extend.collect.$_form(formEle);

    const _process = (data) => {
      data = data.data;
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
      const ajax = new AjaxPB();
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

  /**
   * here we delete the bank
   * @param element
   * @param event
   * @returns {boolean}
   */
  const action_delete_bank = function (element, event) {

    // collect form data.
    const formData = [
      {account: event.data},
      {security: '123456'}
    ];


    // TODO: balram -> this will be replaced by SWAL promise
    if (!confirm('Are your sure for Delete this Bank ??')) {
      //      console.log('delete cancelled');
      return false;
    }

    //      ajaxResponse = dummy_ajax_accounts_mng.banks([event.value, event.type], formData);
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
        case pb.mng.accounts.banks.p.list:
          // 1. remove the row from the list
          break;
        case pb.mng.accounts.banks.p.view:
          // 1. remove the status of card and value.
          // 2. remove the row from list card.
          break;
      }
      toastr.success('Account has bend deleted', "Success");

      // return on save data call.
      return true;
    }
    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : event.data
    }, formData, _process)
  }
  const action_disable_bank = (element, button) => {
    toastr.error('Account can not disabled', "Failed to disable bank");
    return false;
  };
  const action_reset_form = () => {
    console.log("reset form", flashData.edit)
    console.log(element, event);
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
    case pb.mng.accounts.banks.c.form.delete:
      return action_delete_bank(element, event);

    case pb.mng.accounts.banks.c.form.disable:
      return action_disable_bank(element, event);

    case pb.mng.accounts.banks.c.form.save:
      return action_save_bank();

    case pb.mng.accounts.banks.c.form.update:
      return action_edit_bank(element, event);

    case eValues.action.cards.reset://done
      return action_reset_form();

    case pb.mng.accounts.banks.c.form.class:
      return action_add_category(element, event);
  }
}

const changeTarget = function (element, event) {

  console.log(element, event);
  let selectedInput = StateData.categories[event.data];
  console.log(selectedInput[1]);
  if (selectedInput[1] === "Current Account" || selectedInput[1] === "Saving Account") {
    const formEle = element.closest('form');
    formEle.querySelector(querySA(atr.core.append, "od_acc")).replaceChildren();
    formEle.querySelector(querySA(atr.core.append, "credit_card")).replaceChildren();
  }
  else if (selectedInput[1] === "OD Account" || selectedInput[1] === "OCC Account") {
    const formEle = element.querySelector('form');
    console.log(formEle);
    formEle.querySelector(querySA(atr.core.append, "credit_card")).replaceChildren();
    if (formEle.querySelector(querySA(atr.core.append, "od_acc")).children.length === 1) {
      return Promise.resolve(true);
    }
    let newInput = _cardLE.templates.querySelector(querySA(atr.core.template, "od_acc"));
    newInput.classList.remove('d-none');
    formEle.querySelector(querySA(atr.core.append, "od_acc")).appendChild(newInput.cloneNode(true));
    const sts = $R_form_obj.$global({...StateData}, formEle, rdR.form.method.advance);

  }
  else {
    const formEle = element.querySelector('form');
    formEle.querySelector(querySA(atr.core.append, "od_acc")).replaceChildren();
    if (formEle.querySelector(querySA(atr.core.append, "credit_card")).children.length === 1) {
      return Promise.resolve(true);
    }
    let newInput = _cardLE.templates.querySelector(querySA(atr.core.template, "credit_card"));
    newInput.classList.remove('d-none');
    formEle.querySelector(querySA(atr.core.append, "credit_card")).appendChild(newInput.cloneNode(true));
    let ele = formEle.querySelector(querySA(atr.core.append, "credit_card"))
    const sts = $R_form_obj.$global({...StateData}, formEle, rdR.form.method.advance);
  }

  return Promise.resolve(true);
}

// Public methods
const get = function (event) {
  console.log(event);
  switch (event.type) {
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
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

    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : false;

    default:
      return Promise.reject('Invalid Event Type');
  }
}
const option = function (event) {
  switch (event.type) {
    case eTypes.amend:
      return eleCheck() ? changeTarget(get_callEl(), event) : false;
    default:
      return Promise.reject('Invalid Event Type');
  }
}
// loading form
//export const MAB_cards = function (_event) {
//  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
//};
//export const MAB_navtabs = function (_event) {
//  return eleCheck() ? tablesTarget(get_callEl(), _event) : false;
//};
//export const MAB_actions = function (_event) {
//  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
//};
//export const MAB_change = function (_event) {
//  return eleCheck() ? changeTarget(get_callEl(), _event) : false;
//};

// fetching all upcoming required details
export const MAB_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MAB_Requests', 'Request Type: ' + type);
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