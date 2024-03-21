import {get_callEl, get_passedEl} from "../../../base/global.js";
import plugins from "../../../plugins/plugins.js";
import pb from "../../../base/structure.js";
import {$R_common_obj} from "../../../base/render.js";
import {_directLE} from "../../../base/elements.js";
import extend from "../../../extend/extend.js";
import {$R_form_obj} from "../../../base/render.js";
import {rdR} from "../../../base/const.js";
import AjaxPB from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import ajax from "../../../base/ajax.js";


// Shared variables
let StateData;
let formEl;

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4710',
};

/**
 * this will be used for show page's base-0 data.
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

    _return &&= _process_state_data(data);
    _return &&= _process_porcess_form(data);
    return _return;
  }

  const _process_state_data = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_porcess_form = (data) => {

    $R_form_obj.$global(StateData, _directLE.direct, rdR.form.method.selectOnly);

    //load_form(Direct, data);
    let profile = _directLE.direct.querySelector('#profile-details');
    formEl = profile.querySelector('form');

    if (!formEl) {
      toastr.error('Element Not Loaded', 'Failed to Load')
      return true;
    }

    if (!data) {
      toastr.error('', 'Failed to Load')
      return false;
    }
    extend.placement.$_form(data.profile, formEl);
    plugins.formKeen.$_manual(formEl, [3]);
    plugins.datePicker.$_manual(formEl);
    plugins.selectPicker.$_manual(formEl);

    return true;
  }

  return _process(data.data);
}


const formTarget = function (element, button) {
  formEl = element.querySelector('form');

  let collectEle = extend.collect.$_form_simple(formEl);
  console.log(collectEle);
  return true;
}

const modalsTarget = function (element, button) {
  //here we handle all modals
}

const loadTarget = function (element, button) {
  console.log(element, button);
  return true;
}

const actionsTarget = function (element, event) {

  const change_email_action = function () {
    console.log(event);

    const _process = (data) => {
      if (!data.data.status) {
        toastr.error(data.data.message, "otp error");
        return false;
      }
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    });
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }


  const update_email_action = function () {
    const form = get_passedEl().querySelector("form");
    let formData = extend.collect.$_form_simple(form);
    console.log(formData);

    const _process = (data) => {
      if (!data.data.status) {
        toastr.error(data.data.message, "otp error");
        return false;
      }
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    });
    ajax.callREQUEST(formData, urlID, true, _process);
    return ajax;
  }

  const previous_email_action = function () {
    const form = get_passedEl().querySelector("form");
    let formData = extend.collect.$_form_simple(form);
    const sendData = {new_email_otp: formData[0].new_email_otp};

    const _process = (data) => {
      if (!data.data.status) {
        toastr.error(data.data.message, "otp error");
        return false;
      }

      toastr.success(data.data.message, "email update");

      element.querySelector("#previous_email_value").innerText = data.data.new_email;

      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : 'verify_email',
      type: event.type
    });
    ajax.callREQUEST(sendData, urlID, true, _process);

    return true;
  }


  const change_password_action = function () {

    const _process = (data) => {
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    });
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }

  const previous_password_action = function () {
    const form = get_passedEl().querySelector("form");
    let formData = extend.collect.$_form_simple(form);
    console.log(formData);

    const _process = (data) => {
      console.log(data);
      if (!data.data.status) {
        toastr.error(data.data.message, "otp error");
        return false;
      }
      toastr.success(data.data.message, "password update");
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : "update_password",
      type: event.type
    });
    ajax.callREQUEST(formData, urlID, true, _process);
    return ajax;
  }

  const profile_action = function () {
    return true;
  }

  const deactivate_otp_action = function () {

    const _process = (data) => {
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    });
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }

  const deactivate_action = function () {
    const form = get_passedEl().querySelector("form");
    let formData = extend.collect.$_form_simple(form);
    console.log(formData);

    const _process = (data) => {
      if (!data.data.status) {
        toastr.error(data.data.message, "otp error");
        return false;
      }
      toastr.success(data.data.message, "deactivate");
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    });
    ajax.callREQUEST(formData, urlID, true, _process);
    return ajax;
  }

  switch (event.value) {
    case "change_email":
      return change_email_action();

    case "update_email":
      return update_email_action();

    case "previous_email":
      return previous_email_action();

    case "change_password":
      return change_password_action();

    case "previous_password":
      return previous_password_action();

    case "profile":
      return profile_action();

    case "deactivate_otp":
      return deactivate_otp_action();

    case "deactivate":
      return deactivate_action();
  }
  return true;
}
// Public methods

export const SPA_forms = function (event) {
  return eleCheck() ? formTarget(get_callEl(), event) : false;
};

export const SPA_loads = function (event) {
  return eleCheck() ? loadTarget(get_callEl(), event) : false;
};
export const SPA_actions = function (event) {
  return eleCheck() ? actionsTarget(get_callEl(), event) : false;
};
export const SPA_modals = function (event) {
  return eleCheck() ? modalsTarget(get_callEl(), event) : false;
};

// fetching all upcoming required details
export const SPA_pageOpen = function (data) {
  return pageOpen(data);
};
