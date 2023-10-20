import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4630',
};
// Shared variables
let StateData, redData;
let tableEle;


// Private functions

/**
 * preloaded data that will be same for this page
 */
const pageOpen = (data) => {

  console.log("in page open");

  console.log("here");
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {

    console.log(data);
    let _return = true;

    _return &&= _process_a(data);
    _return &&= _process_b(data);
    _return &&= _process_c(data);
    return _return;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_b = (data) => {

    console.log(data);

    const tableEle = _chatsLE.inbox.querySelector(".email_list");

    const tbody = tableEle.querySelector("tbody");
    tbody.remove();


    const redData = $R_table_obj.$_simple(StateData.emails, pb.com.email.mail.t.list);

    tableEle.appendChild(redData);

    tableEle.setAttribute(atr.load.table, '1');

    $R_common_obj.$_call(tableEle);

    console.log(redData);
    return true;

    // what your want to process on page load.
  }

  const _process_c = (data) => {

    // todo: initiate tagify

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

      case pb.com.email.inbox.a:
        return _process_a_inner_fun_a(element, event);

      case pb.com.email.inbox.b:
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

    case pb.com.email.inbox:
      return eType_eValue_function_1(element, _event);

    case pb.com.email.inbox:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}

const gotoTarget = function (element, _event) {

  console.log(_event);
  if (_event.value === "view" || _event.value === "view_prv" || _event.value === "view_next") {

    const _process = (data) => {
      console.log(data);
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_a(data);
      return _return
    }

    const _process_a = (data) => {
      data = data.data;

      const emailTemplate = _chatsLE.template.querySelector(querySA(atr.core.template, "email"));
      const message = emailTemplate.querySelector(querySA(atr.core.append, "email_template"));

      const prvBtn = _chatsLE.view.querySelector(".previous_button");
      const nxtBtn = _chatsLE.view.querySelector(".next_button");

      prvBtn.setAttribute("data-e-data", _event.data);
      nxtBtn.setAttribute("data-e-data", _event.data);


      if (data.type === "template") {
        console.log(data.info, templates[data.templateId]);
        // todo: error may comes
        message.innerHTML = extend.append.$_single_on_innerHTML(templates[data.templateId], data.info);
      }
      else {
        message.innerHTML = `<p>${data.message}</p>`;
      }

      const emailAppend = _chatsLE.view.querySelector(querySA(atr.core.append, "email"));

      const {
              info,
              ...emailData
            } = data;
      emailAppend.innerHTML = extend.append.$_single_on_innerHTML(emailTemplate, emailData);

      console.log(message);


      return true;
    }


    let get = "current";
    if (_event.value === "view_prv") {
      get = "previous";
    }
    else if (_event.value === "view_next") {
      get = "next";
    }

    console.log(get, _event.data);
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : 'view',
      type: 'mail'
    }, 'local', 0);
    ajax.callREQUEST({
      id : _event.data,
      get: get
    }, urlID, true, _process);

    return ajax;


  }


  return true;
}


// Public methods


// works on card event type hit
export const CEI_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const CEI_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

export const CEI_goto = function (_event) {
  console.log("in goto")
  return eleCheck() ? gotoTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const CEM_pageOpen = function () {
  return pageOpen();
};

