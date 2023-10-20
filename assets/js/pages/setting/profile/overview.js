import {get_callEl} from "../../../base/global.js";
import plugins from "../../../plugins/plugins.js";
import pb from "../../../base/structure.js";
import {$R_common_obj} from "../../../base/render.js";
import {_directLE} from "../../../base/elements.js";
import extend from "../../../extend/extend.js";
import {atr} from "../../../base/attributes.js";


// Shared variables
let StateData;

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4710',
};

// Private functions
const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    console.log(data);
    let _return = true;

    _return &&= _process_static_data(data);
    _return &&= _process_details(data);

    return _return;
  }

  const _process_static_data = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_details = (data) => {
    // render license details
    let element = _directLE.direct.querySelector(querySA(atr.core.control, 'license_detail'));
    element.innerHTML = extend.append.$_single_on_innerHTML(element, data.license_detail);
    $R_common_obj.$_call(element);

    // render profile details
    element = _directLE.direct.querySelector(querySA(atr.core.control, 'profile_detail'));
    element.innerHTML = extend.append.$_single_on_innerHTML(element, data.profile_detail);
    $R_common_obj.$_call(element);

    // render account details
    element = _directLE.direct.querySelector(querySA(atr.core.control, 'account_detail'));
    element.innerHTML = extend.append.$_single_on_innerHTML(element, data.account_detail);
    $R_common_obj.$_call(element);

    return true;
  }

  return _process(data.data)
}


const modalsTarget = function (element, button) {
  //here we handle all modals
}


// Public methods

export const SPO_modals = function (event) {
  return eleCheck() ? modalsTarget(get_callEl(), event) : false;
};
// fetching all upcoming required details
export const SPO_pageOpen = function (data) {
  return pageOpen(data);
};

