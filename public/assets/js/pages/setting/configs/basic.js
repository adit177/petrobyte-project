import {get_callEl} from "../../../base/global.js";
import pb           from "../../../base/structure.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4720',
};
// Shared variables
let StateData, redData;
let tableEle;

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
    _return &&= _process_b(data);

    return _return;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_b = (data) => {
    return true;
    // what your want to process on page load.
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

      case pb.set.configs.basic.a:
        return _process_a_inner_fun_a(element, event);

      case pb.set.configs.basic.b:
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

    case pb.set.configs.basic:
      return eType_eValue_function_1(element, _event);

    case pb.set.configs.basic:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}


const navtabsTarget = function (element, _event) {
  const navtab_basic = function (element, event) {
    const _process = (data) => {
      console.log('i am here - 204');
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.name
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    // other things, not connected to dynamic data.

    return ajax;
  }
  const navtab_accounting = function (element, event) {
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
  const navtab_report = function (element, event) {
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
  const navtab_notifications = function (element, event) {
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
  const navtab_sms = function (element, event) {
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
  const navtab_whatsapp = function (element, event) {
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
  const navtab_database = function (element, event) {
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
  const navtab_miscellaneous = function (element, event) {
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

  console.log(_event.value)
  switch (_event.value) {
    case pb.set.configs.basic.p.basic:
      return navtab_basic(element, _event);
    case pb.set.configs.basic.p.accounting:
      return navtab_accounting(element, _event);
    case pb.set.configs.basic.p.shifts:
      return navtab_shifts(element, _event);
    case pb.set.configs.basic.p.stock:
      return navtab_stock(element, _event);
    case pb.set.configs.basic.p.employees:
      return navtab_employees(element, _event);
    case pb.set.configs.basic.p.customers:
      return navtab_customers(element, _event);
    case pb.set.configs.basic.p.report:
      return navtab_report(element, _event);
    case pb.set.configs.basic.p.notifications:
      return navtab_notifications(element, _event);
    case pb.set.configs.basic.p.sms:
      return navtab_sms(element, _event);
    case pb.set.configs.basic.p.whatsapp:
      return navtab_whatsapp(element, _event);
    case pb.set.configs.basic.p.database:
      return navtab_database(element, _event);
    case pb.set.configs.basic.p.miscellaneous:
      return navtab_miscellaneous(element, _event);
    default:
      return eventNotFound(_event);
  }
}

// Public methods

// works on card event type hit
export const SCB_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const SCB_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};
export const SCB_navtabs = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const SCB_pageOpen = function () {
  return pageOpen();
};

