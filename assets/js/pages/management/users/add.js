import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR} from "../../../base/const.js";

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4260',
};
// Shared variables
let StateData, redData;
let tableEle;
let stepperObj = [];

// Private functions

/**
 * preloaded data that will be same for this page
 */
const pageOpen = (data) => {

  const stepperInit = () => {
    // init all the key of stepper.
    _stepperLE.form.children.forEach((ele) => {
      // find the right stepper element.
      const stepperEl = ele.querySelector('#' + ele.id + '-stepper');
      // init the stepper.
      extend.stepper.$_stepper(stepperEl);
    });
  }

  // init all the key of stepper.
  stepperInit();

  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    let _return = true;

    _return &&= _process_save_common_info(data);
    _return &&= _process_stepper_setup(data);
    _return &&= _process_account_rendering(data);

    return _return;
  }

  const _process_save_common_info = (data) => {
    StateData = data['page_common_info'];
    return true;
  }

  const _process_stepper_setup = (data) => {

    // what your want to process on the page load.

    return true;
  }

  const _process_account_rendering = (data) => {
    // what your want to process on the page load.
    let targetEle = _stepperLE.form.querySelector('#account');

    $R_form_obj.$global(data, targetEle, rdR.form.method.selectOnly);
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
      return true;
    }
    // here we load receipts tab data
    const _process_a_inner_fun_b = function (element, data, event) {
      return true;
    }

    // switching
    switch (event.value) {

      case pb.set.exports.tally.p.export:
        return _process_a_inner_fun_a(element, event);

      case pb.set.exports.tally.p.verify:
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

const loadsTarget = (element, _event) => {

  const load_account = () => {

    // if action=back, just return.
    if (_action.getAttribute(atr.other.stepper.action) === 'previous') return true;

    // continue the process.
    console.log('load_account');
    return true;
  }

  const load_role = () => {
    // if action=back, just return.
    if (_action.getAttribute(atr.other.stepper.action) === 'previous') return true;

    const _process = (data) => {
      // enable select drop down.
      $R_form_obj.$global(data, element, rdR.form.method.selectOnly);
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }

  const load_login = () => {
    // if action=back, just return.
    if (_action.getAttribute(atr.other.stepper.action) === 'previous') return true;

    console.log('load_login');
    const _process = (data) => {
      let _return = true;
      return _return;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }

  const load_status = () => {
    // if action=back, just return.
    if (_action.getAttribute(atr.other.stepper.action) === 'previous') return true;
    console.log('load_status');

    const _process = (data) => {
      let _return = true;
      return _return;
    }

    const formData = [];

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);
    return ajax;
  }

  switch (_event.value) {

    case pb.mng.users.add.p.account:
      return load_account();
    case pb.mng.users.add.p.role:
      return load_role();
    case pb.mng.users.add.p.login:
      return load_login();
    case pb.mng.users.add.p.status:
      return load_status();

    default :
      return eventNotFound(_event);
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
  const action_finish_submit_form = (element, event) => {

    // collect the form data.
    let formData = [];

    const _process_form_data = () => {
      let form = element.closest('form');
      formData = extend.collect.$_form(form);
      return true;
    }
    _process_form_data();

    const _process = (data) => {
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_load(data);
      _return &&= _process_download_calling(data);
      _return &&= _process_success_and_reset(data);
      return _return
    }
    const _process_load = (data) => {

      if (!data) {
        toastr.error('We are unable to delete this account', "Failed to delete");
        return false;
      }

      // return on save data call.
      return true;
    }
    const _process_download_calling = (data) => {
      // use the data for processing

      return true;
    }
    const _process_success_and_reset = (data) => {

      // reset the form
      const formEl = element.closest('form');
      extend.reset.$_form(formEl);

      // show the success message
      toastr.success('Form Submit Successfully', "Form Submitted");

      return true;
    }

    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST(formData, urlID, true, _process);

    return ajax;
  }

  const action_role = (element, event) => {
    const _process = (data) => {
      console.log(data)
      let targetEle = element.querySelector(querySA(atr.core.append, "permission"));

      let template = _stepperLE.template.querySelector(querySA(atr.core.template, "permission"));
      console.log(template)
      targetEle.innerHTML = extend.append.$_loop_on_innerHTML(template.innerHTML, data.role);
      return true;
    }

    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: event.data
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }


  console.log(_event)
  // request switching.
  // switching
  switch (_event.value) {

    case eValues.action.stepper.finish:
      return action_finish_submit_form(element, _event);

    case pb.mng.users.add.p.role:
      return action_role(element, _event);

    default :
      return eventNotFound(_event);
  }
}

// Public methods

// works on card event type hit
export const MUA_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const MUA_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const MUA_loads = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const MUA_pageOpen = function () {
  return pageOpen();
};




