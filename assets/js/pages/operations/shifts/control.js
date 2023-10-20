import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR} from "../../../base/const.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4120',
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
    console.log(data)
    _process_a(data);
    return true;
  }

  const _process_a = (data) => {
    console.log(_kanbanLE)
    StateData = data['pageState'];
    const temps = ["initiatedShifts", "inProgress", "finalShifts"];
    const titles = ["initShiftCount", "inProgressCount", "finalShiftCount"];
    for (let i = 0; i < temps.length; i++) {
      _process_b(data, temps[i], titles[i]);
    }
  }

  const _process_b = (data, temp, title) => {
    // what your want to process on page load.
    let template = _kanbanLE.templates.querySelector(querySA(atr.core.template, temp));
    let previewEl = _kanbanLE.cards.querySelector('#' + temp);
    const key = previewEl.getAttribute(atr.core.key);
    for (let props in data[key]) {
      const xDD = template.cloneNode(true);
      xDD.innerHTML = extend.append.$_single_on_innerHTML(template, data[key][props]);
      previewEl.appendChild(xDD);
    }
    let newEle = _kanbanLE.cards.querySelector('#' + title);
    newEle.children[0].innerText = Object.keys(data[key]).length;
    $R_common_obj.$_call(previewEl);
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

      case pb.opr.shifts.control.a:
        return _process_a_inner_fun_a(element, event);

      case pb.opr.shifts.control.b:
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

    case pb.opr.shifts.control:
      return eType_eValue_function_1(element, _event);

    case pb.opr.shifts.control:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}

// Public methods


// works on card event type hit
export const OSC_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const OSC_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const OSC_pageOpen = function () {
  console.log("hi")
  return pageOpen();
};
