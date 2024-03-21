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
let xData;

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

    _return &&= _process_static_data(data);
    _return &&= _process_general_detail(data);
    _return &&= _process_navtab(data);

    return _return;
  }

  const _process_static_data = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_general_detail = (data) => {
    // what your want to process on page load.
    targetEle = _configLE.nav.querySelector(querySA(atr.core.control, 'general'));

    // set src of image
    targetEle.querySelector('img').src = $R_common_obj.$_return(data.general.icon, rdR.common.methods.image, {method: rdR.common.params.img.media});

    // general data
    Object.keys(data.general).forEach((key) => {
      let ele = targetEle.querySelector(querySA(atr.core.name, key));
      if (ele) ele.innerText = data.general[key];
    });

    $R_common_obj.$_call(targetEle);

    return true;
  }

  const _process_navtab = (data) => {
    // Store the Important data for future use.
    xData = data;

    targetEle = _configLE.navtab.querySelector('#notifications');
    // call the first tab manually.
    navtabsTarget(targetEle, {
      type : 'navtab',
      value: 'notifications',
      place: 'nav'
    }, true);

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

      case pb.set.configs.communication.a:
        return _process_a_inner_fun_a(element, event);

      case pb.set.configs.communication.b:
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

    case pb.set.configs.communication:
      return eType_eValue_function_1(element, _event);

    case pb.set.configs.communication:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}
const navtabsTarget = function (element, _event, autoCall = false) {


  const navtab_notifications = function (element, event, autoCall) {
    const _process = (data) => {

      tableEle = element.querySelector('table');

      tableEle.querySelectorAll('tr').forEach((ele) => {
        if (ele.hasAttribute(atr.core.name)) {
          //now we check the check boxes
          let input = ele.querySelectorAll('input');
          if (data.notifications[ele.getAttribute(atr.core.name)].email) {
            input[0].setAttribute('checked', 'true');
          }
          if (data.notifications[ele.getAttribute(atr.core.name)].phone) {
            input[1].setAttribute('checked', 'true');
          }
          if (data.notifications[ele.getAttribute(atr.core.name)].whatsapp) {
            input[2].setAttribute('checked', 'true');
          }
        }
      });
      return true;
    }

    if (autoCall) {
      _process(xData);
      return xData;
    }
    else {
      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type
      }, 'local', 0);
      ajax.callREQUEST({}, urlID, false, _process);

      // other things, not connected to dynamic data.

      return ajax;
    }
  }
  const navtab_sms = function (element, event, autoCall) {
    const _process = (data) => {
      return true;
    }

    if (autoCall) {
      _process(xData);
      return xData;
    }
    else {
      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type
      }, 'local', 0);
      ajax.callREQUEST({}, urlID, false, _process);

      // other things, not connected to dynamic data.

      return ajax;
    }
  }
  const navtab_whatsapp = function (element, event, autoCall) {
    const _process = (data) => {
      return true;
    }

    if (autoCall) {
      _process(xData);
      return xData;
    }
    else {
      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type
      }, 'local', 0);
      ajax.callREQUEST({}, urlID, false, _process);

      // other things, not connected to dynamic data.

      return ajax;
    }
  }
  const navtab_email = function (element, event, autoCall) {
    const _process = (data) => {
      return true;
    }

    if (autoCall) {
      _process(xData);
      return xData;
    }
    else {
      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type
      }, 'local', 0);
      ajax.callREQUEST({}, urlID, false, _process);

      // other things, not connected to dynamic data.

      return ajax;
    }
  }

  // run arranges manually
  if (autoCall) {
    // create the trigger.
    const trigger = _configLE.navbar.querySelector('li').children[0];
    // run the arrangement.
    Arranging._config(_event, trigger);
  }
  switch (_event.value) {
    case pb.set.configs.communication.p.notifications:
      return navtab_notifications(element, _event, autoCall);
    case pb.set.configs.communication.p.sms:
      return navtab_sms(element, _event, autoCall);
    case pb.set.configs.communication.p.whatsapp:
      return navtab_whatsapp(element, _event, autoCall);
    case pb.set.configs.communication.p.email:
      return navtab_email(element, _event, autoCall);
    default :
      return eventNotFound(_event);
  }
}

// Public methods

// works on card event type hit
export const SCC_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const SCC_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};
export const SCC_navtabs = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;
};
// fetching all upcoming required details
export const SCC_pageOpen = function () {
  return pageOpen();
};

