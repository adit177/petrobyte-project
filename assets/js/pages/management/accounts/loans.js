import {get_callEl, get_thePathArr, set_callEl, set_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, keys, kws, rdR} from "../../../base/const.js";
import {$R_common_obj, $R_form_obj, $R_menu_obj, $R_table_obj} from "../../../base/render.js";
import AjaxPB, {call_AJAX_GET} from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import plg_datePicker from "../../../plugins/datePicker.js";
import Option_charts from "../../../options/apexcharts.js";
import plg_apexChart from "../../../plugins/apexCharts.js";
import {_cardLE} from "../../../base/elements.js";
import plg_formValid from "../../../plugins/formValid.js";
import extend from "../../../extend/extend.js";
import plg_inputMask from "../../../plugins/inputMask.js";
import plg_selectPicker from "../../../plugins/selectPicker.js";
import Arranging from "../../../base/arranges.js";
import {eTypes} from "../../../base/events.js";
import PB_defined from "../../../base/defined.js";
import append from "../../../extend/append.js";


// Shared variables
let StateData, redData, formEl;
let tableEle;
let chartObject = [];
let formEle;
let loanType;
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
    console.log(data)
    // console.log(data.menu[3].cate_id);sales
    extend.foreign.$_remote(exT.foreign.individual, [data.menu_info.body, StateData.categories], [['name', '1']])
    // calling render to place data
    $R_menu_obj.$_left(
      data['menu_info'],
      rdR.menu.type.stack,
      {},
    );
    return true;
  }


  // other things, not connected to dynamic data.
  return _process(data.data)

}
/**
 * preloaded data that will not change for this page
 */

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
const tableFormation = function (lists) {

  // rendering data into table using above profile.
  redData = $R_table_obj.$_simple(lists, pb.mng.accounts.loans.t.list);

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
  console.log(element, event)
  /*
   ----------------------
   internal functions
   ----------------------
   */

  /**
   * it appends html table of loan list in target from DB.
   * @returns {Promise<unknown>}
   */
  const card_list_loan = function (element, event) {
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

      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
        tableEle.append(redData)
        return true;
      }
      console.log(StateData.category);
      // render the response data (if required)
      extend.foreign.$_remote('double', [data.list, StateData.categories], [[4, 1]])
      PB_defined.$_append_table_simple(tableEle, data.list, pb.mng.accounts.loans.t.list)
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
    }, _process, false);
  }
  /**
   * here we put the data into edit form for editing the data
   * @param element
   * @param event
   * @returns {{AjaxPB}, {boolean}
   */
  const card_edit_loan = function (element, event) {
    let account_id = event.data;

    if (!account_id) {
      toastr.error('Please provide a valid loan', 'Failed to Load')
      return false;
    }

    // init the form
    const formEl = element.querySelectorAll('form');
    console.log(StateData)
    formEl.forEach((form) => {
      const sts = $R_form_obj.$form(StateData, form);

      if (!sts) {
        toastr.error('Form initialized has failed', 'Failed to Load');
        return false;
      }
    })


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

      // save into global variable
      StateData['edit'] = data;
      console.log(StateData);


      formEl.forEach((form) => {
        // set account id into submit button.
        const form_id = form.getAttribute('id');
        element.querySelector('button[form="' + form_id + '"]').setAttribute(atr.event.value, account_id);

        // append the data into element.
        extend.placement.$_form(data[form_id.split('-')[1]], form);
        plg_inputMask.$_manual(form);
        plg_datePicker.$_manual(form);
        plg_selectPicker.$_manual(form);
      })

      return true;
    }

    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: event.data
    }, _process);
  }
  /**
   * here we load the view loan page and load the header data as well as also call all three tabs data(general, receipts, payments)
   * @param element
   * @param event
   * @returns {AjaxPB}
   */
  const card_view_loan = function (element, event) {
    let loan_id = event.data;

    if (element.getAttribute(atr.load.card) === '1') {
      if (element.getAttribute(atr.core.id) === loan_id) {
        toastr.info('Data Already Loaded', 'action repeating');
        return true
      }
      element.querySelectorAll('[' + atr.load.tab + ']').forEach((tab) => {
        tab.removeAttribute(atr.load.tab);
      });
    }

    const _process = (data) => {
      data = data.data
      return _process_a(data)
    }
    const _process_a = (data) => {
      console.log(data);
      if (!data) {
        toastr.error('Could not Fetch Account Details', 'Failed to Load');
        return false;
      }

      let childNode;

      // append all account details
      childNode = element.querySelector('[data-pb-control="header"]');
      childNode.querySelector('img').src = '../../assets/media/avatars/' + data.account.avatar;
      childNode.querySelector('h3').innerText = data.account["loan_acc_name"];
      let a = childNode.querySelectorAll('a');
      a[0].innerText = data.account["loan_acc_number"]
      a[1].innerText = data.account["finance_company"];
      // set value into button attributes
      element.querySelector('[data-kt-menu="true"]').querySelectorAll('button').forEach((button) => {
        button.setAttribute(atr.event.value, data.account.id);
      });
      element.querySelectorAll('[' + atr.core.catch + '="id"]').forEach((button) => {
        button.setAttribute(atr.event.value, data.account.id);
      });

      // render data into general tab
      //        const navtab = pb.mng.accounts.loans.c.tab.general;
      //        navtabsTarget(element, {
      //          value: navtab,
      //          data : loan_id
      //        });

      // set attribute about loading status
      element.setAttribute(atr.load.card, '1');
      element.setAttribute(atr.core.id, loan_id)
      // reset all inner tabs buttons.
      element.querySelectorAll('[name="navtab"]').forEach((btn) => {
        element.querySelector('#' + btn.value).removeAttribute(atr.load.tab);
      })

      return true;
    }

    return call_AJAX_GET({
      act    : event.value,
      type   : event.type,
      account: loan_id
    }, _process);

  }
  /**
   * here we load add loan page for user
   * @param element
   * @param event
   * @returns {AjaxPB}
   */
  const card_add_loan = function (element, event) {
    console.log(element, event);

    formEle = element.querySelector('form');

    if (formEle.getAttribute(atr.load.form) === '1') {
      return true;
    }

    const _process = (data) => {
      data = data.data;
      console.log(data);

      return _process_form(data);

    }
    const _process_form = (data) => {

      StateData.loan = data;
      console.log(StateData)
      const sts = $R_form_obj.$global({...StateData.loan}, formEle, rdR.form.method.advance);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');

      const newEvent = {
        type : "navtab",
        value: "new_loan",
        place: "loan__cards"
      }
      const newEle = element.querySelector('#' + newEvent.value);
      console.log(newEle);
      console.log(data, event, element);
      return true;
    }

    // initiated page blockUIElement until all things load for the page.

    // fetching, rendering and loading values into forms


    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }

  /**
   * here we load add category page for user
   * @param element
   * @param button
   * @returns {boolean}
   */
  const card_add_category = function (element, button) {
    // add options in select,
    let thePathArr = get_thePathArr()
    const sts = extend.placement.$_block(element, StateData, thePathArr[0] + '_' + thePathArr[1]);
    return true;
  }


  // switching
  switch (event.value) {
    case pb.mng.accounts.loans.p.start:
      return true;

    case pb.mng.accounts.loans.p.new:
      console.log(element, event);
      return card_add_loan(element, event);

    case pb.mng.accounts.loans.p.edit:
      return card_edit_loan(element, event);

    case pb.mng.accounts.loans.p.list:
      return card_list_loan(element, event);

    case pb.mng.accounts.loans.p.view:
      return card_view_loan(element, event);

    case pb.mng.accounts.loans.p.cate:
      return card_add_category(element, event);
  }
}

const navtabsTarget = function (_element, _event) {
  console.log(_element);
  if (_element.getAttribute(atr.load.tab) === '1') {
    return true;
  }
  /*
   ------------------
   internal functions
   ------------------
   */
  // here we load general tab data
  const navtab_general_view = function (element, data, event) {

    //    let childNode;
    //
    //    const chartFormation = (data) => {
    //
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
    //
    //    // header of general tab
    //    element.querySelector(querySA(atr.core.control, 'general-header')).children.forEach((child) => {
    //      const key = child.getAttribute(atr.core.append);
    //      let template = _cardLE.template.querySelector(querySA(atr.core.template, key))
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
    return true;
  }
  // here we load receipts tab data
  const navtab_receipts_view = function (element, data, event) {

    // here we render the table for transactions.
    //    tableEle = element.querySelector('table');
    //    if (!tableEle) return false;
    //
    //    // data foreign matching
    //    redData = extend.foreign.$_remote(exT.foreign.combine, data, [['data', 'dates', 1, 0], ['data', 'ledgers', 2, 0]]);
    //    // access table profile
    //
    //
    //    let renderedData = $R_table_obj.$_simple(redData.data, pb.mng.accounts.loans.t.receipts);
    //
    //    if (!renderedData) return false;
    //    // remove old data or blank table
    //    tableEle.querySelector('tbody').remove();
    //    // append tbody into page table
    //    tableEle.appendChild(renderedData);
    //    // common render
    //    $R_common_obj.$_call(tableEle);
    //    // for enable dropdown in the table.
    //    KTMenu.init();
    //    // update navtab status
    //    element.setAttribute(atr.load.tab, '1');
    //    return true;
    //  }
    //  // here we load payments tab data
    //  const navtab_payments_view = function (element, data, event) {
    //
    //    // here we render the table for transactions.
    //    tableEle = element.querySelector('table');
    //    if (!tableEle) return false;
    //
    //    // data foreign matching
    //    redData = extend.foreign.$_remote(exT.foreign.combine, data, [['data', 'dates', 1, 0], ['data', 'ledgers', 2, 0]]);
    //    // access table profile
    //    //
    //
    //    let renderedData = $R_table_obj.$_simple(redData.data, pb.mng.accounts.loans.t.payments);
    //
    //    if (!renderedData) return false;
    //    // remove old data or blank table
    //    tableEle.querySelector('tbody').remove();
    //    // append tbody into page table
    //    tableEle.appendChild(renderedData);
    //    // common render
    //    $R_common_obj.$_call(tableEle);
    //    // for enable dropdown in the table.
    //    KTMenu.init();
    //    // update navtab status
    //    element.setAttribute(atr.load.tab, '1');
    return true;
  }
  const navtab_upcomingEmi_view = function (element, data, event) {
    console.log(element, data, event);
    tableEle = element.querySelector('table');
    if (!tableEle) return false;

    // data foreign matching
    //        redData = extend.foreign.$_remote(exT.foreign.combine, data, [['data', 'dates', 1, 0], ['data', 'ledgers', 2, 0]]);
    // access table profile


    let renderedData = $R_table_obj.$_simple(data.upcomingEmi, pb.mng.accounts.loans.t.upcomingEmi);

    if (!renderedData) return false;
    // remove old data or blank table
    tableEle.querySelector('tbody').remove();
    // append tbody into page table
    tableEle.appendChild(renderedData);
    // common render
    $R_common_obj.$_call(tableEle);
    // for enable dropdown in the table.
    KTMenu.init();
    // update navtab status
    element.setAttribute(atr.load.tab, '1');
    return true;

  }
  const navtab_installments_view = function (element, data, event) {
    console.log(element, data, event);
    //     here we render the table for repayments.
    tableEle = element.querySelector('table');
    if (!tableEle) return false;

    // data foreign matching
    //        redData = extend.foreign.$_remote(exT.foreign.combine, data, [['data', 'dates', 1, 0], ['data', 'ledgers', 2, 0]]);
    // access table profile


    let renderedData = $R_table_obj.$_simple(data.installments, pb.mng.accounts.loans.t.installments);

    if (!renderedData) return false;
    // remove old data or blank table
    tableEle.querySelector('tbody').remove();
    // append tbody into page table
    tableEle.appendChild(renderedData);
    // common render
    $R_common_obj.$_call(tableEle);
    // for enable dropdown in the table.
    KTMenu.init();
    // update navtab status
    element.setAttribute(atr.load.tab, '1');
    return true;
  }
  const navtab_repayments_view = function (element, data, event) {
    console.log(element, data, event);
    //     here we render the table for repayments.
    tableEle = element.querySelector('table');
    if (!tableEle) return false;

    // data foreign matching
    //        redData = extend.foreign.$_remote(exT.foreign.combine, data, [['data', 'dates', 1, 0], ['data', 'ledgers', 2, 0]]);
    // access table profile


    let renderedData = $R_table_obj.$_simple(data.repayments, pb.mng.accounts.loans.t.repayments);

    if (!renderedData) return false;
    // remove old data or blank table
    tableEle.querySelector('tbody').remove();
    // append tbody into page table
    tableEle.appendChild(renderedData);
    // common render
    $R_common_obj.$_call(tableEle);
    // for enable dropdown in the table.
    KTMenu.init();
    // update navtab status
    element.setAttribute(atr.load.tab, '1');
    return true;
  }
  const navtab_oldloan_view = function (element, data, event) {
    formEle = element.querySelector('form')
    console.log(formEle);
    const newFormEle = element.querySelector(`#${event.value}-${event.type}`);
    console.log(formEle);

    if (!newFormEle) {
      return true;
    }

    formEle = newFormEle.querySelector('form');
    //    console.log({...StateData['customer_form'], ...data})
    const sts = $R_form_obj.$global({}, formEle, rdR.form.method.advance);
    if (!sts) return false;
    // update form's core element status.
    formEle.setAttribute(atr.load.form, '1');
    set_passedEl(formEle)

    return true;
  }
  const navtab_newloan_view = function (element, data, event) {
    formEle = element.querySelector('form')
    console.log(formEle);
    const newFormEle = element.querySelector(`#${event.value}-${event.type}`);
    console.log(formEle);

    if (!newFormEle) {
      return true;
    }

    formEle = newFormEle.querySelector('form');
    //    console.log({...StateData['customer_form'], ...data})
    const sts = $R_form_obj.$global({}, formEle, rdR.form.method.advance);
    if (!sts) return false;
    // update form's core element status.
    formEle.setAttribute(atr.load.form, '1');

    return true;
  }
  const _process_a = (data) => {
    //      const element = _element.querySelector('#' + _event.value);
    // sending to the targeted function.
    switch (_event.value) {
      case pb.mng.accounts.loans.c.tab.general:
        return navtab_general_view(_element, data, _event);

      case pb.mng.accounts.loans.c.tab.upcomingEmi:
        return navtab_upcomingEmi_view(_element, data, _event);

      case pb.mng.accounts.loans.c.tab.repayments:
        return navtab_repayments_view(_element, data, _event);
      case pb.mng.accounts.loans.c.tab.installments:
        return navtab_installments_view(_element, data, _event);

      case pb.mng.accounts.loans.c.tab.newLoan:
        return navtab_newloan_view(_element, data, _event);

      case pb.mng.accounts.loans.c.tab.oldLoan:
        alert('old loan')
        return navtab_oldloan_view(_element, data, _event);
    }
  }

  const _process = (data) => {
    data = data.data
    return _process_a(data);
  }

  //console.log(_event);
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : _event.value,
    type   : _event.type,
    account: _event.data
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);
  return ajax;
}

const actionsTarget = function (element, button) {
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
  const action_save_loan = function (element, event) {

    console.log(event);
    // validate inputs
    const formEle = element.querySelector('form');
    const form_sno = formEle.hasAttribute(atr.form.sno)
      ? formEle.getAttribute(atr.form.sno)
      : element.querySelector(`button[form="${formEle.id}"][${atr.form.submit}]`).getAttribute(atr.form.sno)
    if (!plg_formValid.$_get_status(form_sno)) {
      //        return true;
    }

    // collect data.
    const formData = extend.collect.$_form_simple(formEle);

    // getting the response
    const _process = (data) => {
      data = data.data
      let _return = true;

      _return &&= _process_a(data);

      return _return;
    }
    const _process_a = (data) => {
      console.log(data);
      if (!data.status) {
        toastr.success("Failed to create new loan", `Reason: ${data.message}`);
      }
      toastr.success('New loan has been created', "Success");

      // it will reset the status if table is loaded and new loan has added.
      _cardLE.list.querySelector('table').setAttribute(atr.load.table, '0');

      // return on save data call.
      return true;
    }
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);
    return ajax;
  }
  const action_add_category = (element, button) => {
    console.log('i am here to add category in loans');
  }

  /**
   * here we collect the state for the edit form and save the edit form data into database
   * @param element
   * @param event
   * @returns {boolean}
   */
  const action_edit_loan = function (element, event) {
    console.log(event);
    // collect modified data.
    formEl = element.querySelector('form');
    const formData = extend.collect.$_form_simple(formEl);
    // value change checking

    const _process = (data) => {
      data = data.data
      let _return = true;

      _return &&= _process_a(data);

      return _return;
    }
    const _process_a = (data) => {
      console.log(data);
      // change form state to readonly. (non editable)
      extend.collect.$_form_state(formEl, 'read');

      toastr.success('Changes has Saved.', "Successfully Edited.");

      // return on save data call.
      return true;
    }
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: event.data
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);
    return ajax;
  }
  /**
   * here we delete the loan
   * @param element
   * @param event
   * @returns {boolean}
   */
  const action_delete_loan = function (element, event) {

    // collect form data.
    const formData = [
      {account: event.data},
      {security: '123456'}
    ];


    // TODO: balram -> this will be replaced by SWAL promise
    if (!confirm('Are your sure for Delete this loan ??')) {
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
        case pb.mng.accounts.loans.p.list:
          // 1. remove the row from the list
          break;
        case pb.mng.accounts.loans.p.view:
          // 1. remove the status of card and value.
          // 2. remove the row from list card.
          break;
      }
      toastr.success('Account has bend deleted', "Success");

      // return on save data call.
      return true;
    }
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: event.data
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);
    return ajax;
  }
  const action_disable_loan = (element, button) => {
    toastr.error('Account can not disabled', "Failed to disable loan");
    return false;
  };


  // request switching.
  switch (button.value) {
    case pb.mng.accounts.loans.c.form.delete:
      return action_delete_loan(element, button);

    case pb.mng.accounts.loans.c.form.disable:
      return action_disable_loan(element, button);

    case pb.mng.accounts.loans.c.form.save:
      return action_save_loan(element, button);

    case pb.mng.accounts.loans.c.form.update:
      return action_edit_loan(element, button);

    case pb.mng.accounts.loans.c.form.class:
      return action_add_category(element, button);
  }
}

const changeTarget = (element, event) => {
  console.log(element, event);
  const calculate_emi = (element, event) => {
    console.log(element.closest('#newloan'))
    return true;
  }
  switch (event.value) {
    case pb.mng.accounts.loans.c.eValues.rate:
      return calculate_emi(element, event);
  }
  return true;
}

const clickTarget = (element, event) => {
  const append_emi = () => {
    loanType = "emi";
    let targetElement = element.querySelector(querySA(atr.core.append, "new-loan"));
    targetElement.innerHTML = '';
    let template = _cardLE.template.querySelector(querySA(atr.core.template, "emi-based-new-loan"));
    let clone = template.cloneNode(true);
    clone.classList.remove('d-none')
    targetElement.append(clone);
    //    let singleElement = targetElement.querySelector(querySA(atr.core.source, "received_bank"));
    //    $R_form_obj.$global({...StateData.loan}, singleElement, rdR.form.method.single)
    const sts = $R_form_obj.$global({...StateData.loan}, formEle, rdR.form.method.advance);
    return true;
  }
  const append_oll = () => {
    loanType = "oll";
    let targetElement = element.querySelector(querySA(atr.core.append, "new-loan"));
    targetElement.innerHTML = '';
    let template = _cardLE.template.querySelector(querySA(atr.core.template, "oll-based-new-loan"));
    let clone = template.cloneNode(true);
    clone.classList.remove('d-none')
    targetElement.append(clone);
    const sts = $R_form_obj.$global({...StateData.loan}, formEle, rdR.form.method.advance);
    return true;
  }
  switch (event.value) {
    case 'emi':
      return append_emi();
    case 'oll':
      return append_oll();
    default:
      return Promise.reject(false);
  }

  return Promise.resolve(true);
}

const amendTarget = (element, event) => {
  const calculate_new_emi = () => {
    const sanctionedAmount = element.querySelector(querySA("name", "sanctioned_amount"));
    const principalAmount = Number(amt_mask_filter(sanctionedAmount.value));

    const rateOfInterest = Number(element.querySelector(querySA("name", "rate_of_interest")).value);
    const tenure = element.querySelector(querySA("name", "tenure")).value;
    console.log(sanctionedAmount, rateOfInterest, tenure);
    const currentDate = new Date();
    const month = Number(currentDate.getMonth() + 1);
    const year = Number(currentDate.getFullYear());
    const tenureMY = tenure.split(".");
    const tenureMonth = Number(tenureMY[0]);
    const tenureYear = Number(tenureMY[1]);
    console.log(tenureYear, year, tenureMonth, month)
    const numberOfInstallments = (tenureYear + 2000 - year) * 12 + (tenureMonth - month) + 1;
    console.log(numberOfInstallments);
    const monthlyRate = rateOfInterest / (12 * 100);

    // Calculate total number of installments
    //    const numberOfInstallments = lastMonth - currentMonth + 1;

    // Calculate EMI
    const emi =
            (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfInstallments)) /
            (Math.pow(1 + monthlyRate, numberOfInstallments) - 1);

    const emiInput = element.querySelector(querySA("name", "emi"));
    emiInput.value = emi.toFixed(2);
    console.log(emiInput.value)
    console.log(emi.toFixed(2))
    console.log(emiInput)
    // Return the EMI rounded to 2 decimal pl
    return true;
  }
  const calculate_new_oll = () => {
    return true;
  }
  console.log(element, event);
  switch (loanType) {
    case 'emi':
      return calculate_new_emi();
    case 'oll':
      return calculate_new_oll();
  }
}


// Public methods


// loading form
export const MAL_cards = function (_event) {
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};
export const MAL_navtabs = function (_event) {
  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;
};
export const MAL_actions = function (_event) {
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};
export const MAL_change = function (_event) {
  return eleCheck() ? changeTarget(get_callEl(), _event) : false;
};
export const MAL_click = function (_event) {
  return eleCheck() ? clickTarget(get_callEl(), _event) : false;
};

// fetching all basic required details


const get = function (event) {
  switch (event.type) {
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.navtab:
      return eleCheck() ? navtabsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
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
      return eleCheck() ? amendTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.radio:
      return eleCheck() ? clickTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}


export const MAL_Requests = (data, type) => {
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