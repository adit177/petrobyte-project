import {get_action, get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {_stepperLE} from "../../../base/elements.js";
import extend from "../../../extend/extend.js";
import {atr} from "../../../base/attributes.js";
import AjaxPB from "../../../base/ajax.js";
import {$R_form_obj} from "../../../base/render.js";
import {eValues} from "../../../base/events.js";
import handling from "../../../base/handling.js";
import {kws} from "../../../base/const.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4730',
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
  console.log(data);

  const stepperInit = () => {
    // init all the key of stepper.
    _stepperLE.form.children.forEach((ele) => {
      // find the right stepper element.
      const stepperEl = ele.querySelector('#' + ele.id + '-stepper');
      // init the stepper.
      console.log(stepperEl)
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

  const load_params = () => {

    // if action=back, just return.
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;

    // continue the process.
    console.log('load_params');
    console.log(element);
    return true;
  }

  const load_select = () => {
    // if action=back, just return.
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;

    const dataset = StateData['export_segment'];

    let input_buttons = get_passedEl().querySelectorAll('input[name="export_type"]');
    // render the form as per the selection in the previous step.
    input_buttons.forEach((btn) => {
      if (btn.checked) {
        $R_form_obj.$form(dataset[btn.value], element);
      }
    });

    return true;
  }

  const load_verify = () => {
    // if action=back, just return.
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;

    const _process = (data) => {
      let _return = true;
      _return &&= _process_otp_sending(data);
      _return &&= _process_otp_functionality(data);
      return _return;
    }

    const _process_otp_sending = (data) => {
      if (data.status) {
        toastr.success(data.message, data.title);
      }
      else {
        toastr.error(data.message, data.title);
      }
      return true;
    }
    const _process_otp_functionality = (data) => {
      var input1 = element.querySelector('input[name="code_1"]');
      var input2 = element.querySelector('input[name="code_2"]');
      var input3 = element.querySelector('input[name="code_3"]');
      var input4 = element.querySelector('input[name="code_4"]');

      input1.focus();

      input1.addEventListener(kws.listen.input, function () {
        if (this.value.length === 1) {
          input2.focus();
        }
      });

      input2.addEventListener(kws.listen.input, function () {
        if (this.value.length === 1) {
          input3.focus();
        }
      });

      input3.addEventListener(kws.listen.input, function () {
        if (this.value.length === 1) {
          input4.focus();
        }
      });

      input4.addEventListener(kws.listen.input, function () {
        if (this.value.length === 1) {
          input4.blur();
        }
      });
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

  const load_export = () => {
    // if action=back, just return.
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;
    let formData = {};

    // place the form data inside the formData object.
    const _collect_form_data = () => {
      var inputs = [].slice.call(get_passedEl().querySelectorAll('.otp_input'));

      let otp = '';
      inputs.forEach((input) => {
        otp += input.value;
      });

      formData["otp"] = otp;
    }
    _collect_form_data();
    const _process = (data) => {
      let _return = true;
      _return &&= _process_verify_otp(data.data);
      return _return;
    }
    const _process_verify_otp = (data) => {
      console.log(data);
      if (data.status === false) {
        toastr.error(data.message, "otp error");
        const btn = get_action();
        handling.Event("stepper", btn, 0,
          kws.handler.button);
        return false;
      }
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type
    }, 'local', 0);
    ajax.callREQUEST(formData, urlID, true, _process);
    return ajax;
  }

  switch (_event.value) {

    case pb.set.exports.tally.p.params:
      return load_params();
    case pb.set.exports.tally.p.select:
      return load_select();
    case pb.set.exports.tally.p.verify:
      return load_verify();
    case pb.set.exports.tally.p.export:
      return load_export();

    default :
      eventNotFound(_event);
      return false;
  }
}


const actionsTarget = function (element, _event) {
  console.log("in actions target");
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

    // place the form data inside the formData object.
    const _collect_form_data = () => {
      const formEl = element.closest('form');

      formData = extend.collect.$_form_simple(formEl);


      console.log(formData);
    }
    _collect_form_data();
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
      extend.reset.$_simple_form(formEl);

      // show the success message
      toastr.success('Data Generated successfully for export', "Files Exported");

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

  const action_resend = (element, event) => {
    const _process = (data) => {
      // process.
      let _return = true;
      return _return;
    }
    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }
  // request switching.
  // switching
  switch (_event.value) {

    case eValues.action.stepper.finish:
      return action_finish_submit_form(element, _event);
    case  eValues.action.stepper.resend:
      return action_resend(element, _event);
    default :
      eventNotFound(_event);
      return false;
  }
}

// Public methods

// works on card event type hit
export const SET_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const SET_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const SET_loads = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const SET_pageOpen = function (data) {
  return pageOpen(data);
};
