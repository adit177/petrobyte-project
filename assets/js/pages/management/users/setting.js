import {get_callEl} from "../../../base/global.js";
import pb           from "../../../base/structure.js";
import {exT, rdR}   from "../../../base/const.js";

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4260',
};
// Shared variables
let StateData, redData, formEl;
let tableEle;
let chartObject = [];

// to store file path value.

// ajax
//  var ajax;


// Private functions

/**
 * preloaded data that will not change for this page
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
    //PB_extend_foreign.$_remote('double', [data.menu, StateData.categories], [['cate_id', 1]])
    // calling render to place data
    //$R_menu_obj.$_left(data.menu, 'stack');
    return true;
  }

  return _process(data.data);
}

const elementsTarget = (element, event) => {
  const element_permissions = (element, event) => {

    const _process = (data) => {
      let _return = true;

      _return &&= _process_element(data);
      return _return;
    }

    const _process_element = (data) => {
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }

  const element_roles = (element, event) => {

    const _process = (data) => {
      let _return = true;

      _return &&= _process_element(data);
      return _return;
    }

    const _process_element = (data) => {
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }
  switch (event.value) {
    case pb.mng.users.setting.p.permissions:
      return element_permissions(element, event);
    case pb.mng.users.setting.p.roles:
      return element_roles(element, event);
  }
}


// fetching all basic required details
export const MUS_elements = function (event) {
  return eleCheck() ? elementsTarget(get_callEl(), event) : false;
};
// fetching all upcoming required details
export const MUS_pageOpen = function () {
  return pageOpen();
};
