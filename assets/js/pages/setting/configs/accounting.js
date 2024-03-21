import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4720',
};
// Shared variables
let StateData, redData;
let tableEle;
let targetEle;

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
    let _return = true;

    _return &&= _process_a(data);
    _return &&= _process_general_details(data);

    return _return;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_general_details = (data) => {
    // what your want to process on page load.
    targetEle = _configLE.nav.querySelector(querySA(atr.core.control, 'general'));

    // set src of image
    targetEle.querySelector('img').src = $R_common_obj.$_return(data.general.icon, rdR.common.methods.image, {method: rdR.common.params.img.media});

    // general data
    Object.keys(data.general).forEach((key) => {
      let ele = targetEle.querySelector(querySA(atr.core.name, key));
      if (ele) ele.innerText = data.general[key];
    });

    let obj = new RenderCommon();
    obj.$_call(targetEle);
    //$R_common_obj.$call(targetEle);

    return true;
  }

  return _process(data.data);
}

const cardsTarget = function (element, event) {

  /*
   ------------------
   internal functions
   ------------------
   */


  const _process_a = (data) => {


    const _process_a_inner_fun_a = function (element, data, event) {

      //
      return true;

    }
    // here we load receipts tab data
    const _process_a_inner_fun_b = function (element, data, event) {

      return true;
    }

    // switching
    switch (event.value) {

      case pb.set.configs.accounting.a:
        return _process_a_inner_fun_a(element, event);

      case pb.set.configs.accounting.b:
        return _process_a_inner_fun_b(element, event);

      default :
        eventNotFound(event);
        return false;
    }
  }

  const _process = (data) => {
    return _process_a(data);
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : event.value,
    type   : event.type,
    account: event.data
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  return ajax;
}


const actionsTarget = function (element, _event) {
  /*
   ------------
   internal functions
   ------------
   */

  /**
   * here we delete the contact
   * @param element
   * @param event
   * @returns {AjaxPB}
   */
  const eType_eValue_function_1 = (element, event) => {
    // :page-event-value-fn to get complete function.

    // code here for the event_value_function_1 function

    const _process = (data) => {
      console.log(data);
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      _return &&= _process_c(data);
      return _return
    }
    const _process_a = (data) => {

      if (!data) {
        toastr.error('We are unable to delete this account', "Failed to delete");
        return false;
      }

      // return on save data call.
      return true;
    }
    const _process_b = (data) => {
      // use the data for processing

      return true;
    }
    const _process_c = (data) => {
      // use the data for processing

      return true;
    }

    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: event.data
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);

    return ajax;
  }

  const eType_eValue_function_2 = (element, event) => {

    // code here for the event_value_function_2 function

    // add process
    // :page-process-function

    // call ajax
    // :page-ajax-calling
  };


  // request switching.
  // switching
  switch (_event.value) {

    case pb.set.configs.accounting:
      return eType_eValue_function_1(element, _event);

    case pb.set.configs.accounting:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}

const navtabsTarget = function (element, _event) {

  const navtab_accounting = function (element, event) {

    const _process = (data) => {
      console.log(data)
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    // other things, not connected to dynamic data.

    return ajax;
  }
  const navtab_shifts = function (element, event) {

    const _process = (data) => {
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    // other things, not connected to dynamic data.

    return ajax;
  }
  const navtab_stock = function (element, event) {

    const _process = (data) => {
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    // other things, not connected to dynamic data.

    return ajax;
  }
  const navtab_employees = function (element, event) {

    const _process = (data) => {
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    // other things, not connected to dynamic data.

    return ajax;
  }
  const navtab_customers = function (element, event) {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_form(data);
      return _return;
    }

    /**
     * render the  form data and set the status bar
     * @param data
     * @returns {boolean}
     * @private
     */
    const _process_form = (data) => {
      let form = element.querySelector('form');
      //now collect the form data
      extend.placement.$_form(data.customer_accounting, form);

      // now we set the remaining budget status
      data.customer_accounting.remaining_budget = data.customer_accounting.allotted_budget - data.customer_accounting.used_budget;

      // now append the data into template
      let budget_status = form.querySelector(querySA(atr.core.control, 'budget_status'));
      budget_status.innerHTML = extend.append.$_single_on_innerHTML(budget_status, data.customer_accounting);

      // now set the bar percentage for budget status bar
      let budget_status_bar = budget_status.querySelector(querySA(atr.core.name, 'budget_status_bar'));
      budget_status_bar.setAttribute(atr.custom.style, $R_common_obj.$_return(data.customer_accounting.used_budget, rdR.common.methods.percent, {mark: `${data.customer_accounting.allotted_budget}`}));

      // render the format of amount, percentage and date etc
      $R_common_obj.$_call(form);
      return true;
    }


    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    // other things, not connected to dynamic data.

    return ajax;
  }

  switch (_event.value) {
    case pb.set.configs.accounting.p.accounting:
      return navtab_accounting(element, _event);
    case pb.set.configs.accounting.p.shifts:
      return navtab_shifts(element, _event);
    case pb.set.configs.accounting.p.stock:
      return navtab_stock(element, _event);
    case pb.set.configs.accounting.p.employees:
      return navtab_employees(element, _event);
    case pb.set.configs.accounting.p.customers:
      return navtab_customers(element, _event);
  }
}

// Public methods

// works on card event type hit
export const SCA_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const SCA_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};
export const SCA_navtabs = function (_event) {
  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;
};
// fetching all upcoming required details
export const SCA_pageOpen = function () {
  return pageOpen();
};

