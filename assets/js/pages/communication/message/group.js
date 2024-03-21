import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4640',
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

    _return &&= _process_hold_common_info(data);
    _return &&= _process_menu_render(data);

    return _return;
  }

  const _process_hold_common_info = (data) => {
    StateData = data['page_common_info'];
    return true;
  }

  const _process_menu_render = (data) => {
    console.log(data['group_info']);
    //             render the menu
    $R_menu_obj.$_left(
      data.group_info,
      rdR.menu.type.button,
      [],
      rdR.menu.role.new,
      rdR.menu.tags.button,
    );
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

      case pb.com.message.group.a:
        return _process_a_inner_fun_a(element, event);

      case pb.com.message.group.b:
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


const loadsTarget = function (element, event) {

  const panel_function = (element, event) => {

    // todo: update id into the send button.

    console.log(event.data);
    // get the checking elements
    const as = element.querySelector(querySA(atr.core.target, event.data));
    if (as !== null && as.getAttribute(atr.load.box) === '1') {
      return true;
    }

    const _process = (data) => {
      console.log(data);
      let _return = true;

      _return &&= _process_load_chats(data);
      _return &&= _process_load_account(data);

      return _return;
    }

    const _process_load_account = (data) => {

      console.log(_chatsLE.toolbar);

      _chatsLE.toolbar.querySelector(".group_name").innerText = data.group_info.name;

      return true;


      // load all the basic data [name, ids]
      // todo: @kunal.
    }

    const _process_load_chats = (data) => {


      const send_box_template = _chatsLE.template.querySelector(querySA(atr.core.template, "sent"));
      const receive_box_template = _chatsLE.template.querySelector(querySA(atr.core.template, "received"));
      const message_box_template = _chatsLE.template.querySelector(querySA(atr.core.template, "messages"));

      const message_box = message_box_template.cloneNode(true);

      // update the id for the custoemr
      message_box.removeAttribute(atr.core.template);
      message_box.setAttribute(atr.core.target, event.data); // data.customer_info.id
      message_box.classList.remove(CLS.display.none);
      // data ready for append
      data.send_messages.forEach((item) => {

        const messageTempObj = MessageTemplate[item.temp_id];
        // todo: error may comes
        // create the real message
        const message = extend.append.$_single_on_innerHTML(messageTempObj.template, item.data);

        // update things into the send box
        if (item.type) {
          const sent_box = send_box_template.cloneNode(true);
          sent_box.querySelector(querySA(atr.core.update, 'title')).innerText = messageTempObj.title;
          sent_box.querySelector(querySA(atr.core.update, 'message')).innerText = message;

          // append the message into the message box
          message_box.appendChild(sent_box);
        }
        else {
          const receive_box = receive_box_template.cloneNode(true);
          receive_box.querySelector(querySA(atr.core.update, 'title')).innerText = messageTempObj.title;
          receive_box.querySelector(querySA(atr.core.update, 'message')).innerText = message;

          // append the message into the message box
          message_box.appendChild(receive_box);
        }

        // update the message box
      });
      element.querySelector(querySA(atr.core.append, 'messages')).append(message_box);
      message_box.setAttribute(atr.load.box, '1');

      return true;


    }

    console.log(event);
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({id: event.data}, urlID, true, _process);

    return ajax;
  }


  switch (event.value) {
    case pb.com.message.single.p.panel:
      return panel_function(element, event);
  }
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

    case pb.com.message.group:
      return eType_eValue_function_1(element, _event);

    case pb.com.message.group:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}

// Public methods

// works on card event type hit
export const CMG_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const CMG_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

export const CMG_loads = function (_event) {
  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const CMG_pageOpen = function () {
  return pageOpen();
};

