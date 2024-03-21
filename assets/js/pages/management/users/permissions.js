import {get_callEl} from "../../../base/global.js";
import pb           from "../../../base/structure.js";
import {exT, rdR}   from "../../../base/const.js";

// Shared variables
let StateData;
let ajaxResponse;

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:3000',
};

// Private functions
function listing_ajaxCalling(button, params = []) {
  let response;

  // [button.value, button.getAttribute('name')]
  const btnValue = button[0];
  const btnType = button[1];

  switch (btnValue) {
    case pb.fin.balance.tformat.n:
      // base data calling
      // var fetchData = JSON.parse(responseData["key"])
      switch (btnType) {
        case 'page':
          response = {
            'rows'  : {},
            'status': true
          }
          break;
        case 'state':
          response = {
            'data'  : {},
            'status': true
          }
          break;
      }
      break;

    case pb.fin.balance.tformat.p.sheet:
      // call the ajax
      // var fetchData = JSON.parse(responseData["key"])
      break;
    case pb.fin.balance.tformat.p.trans:
      // call the ajax
      // var fetchData = JSON.parse(responseData["key"])
      response = {
        'rows'  :
          [
            {}
          ],
        'status': true
      }
      break;
  }


  if (!response.status) {
    console.log(JSON.stringify(response.rows))
    return false
  }
  return response.rows;
}

const tablesTarget = function (element, button) {
  switch (button.value) {
    case pb.fin.balance.tformat.p.sheet:
      return true;
  }
}

const actionsTarget = function (element, button) {
  switch (button.value) {
    case pb.fin.balance.tformat.p.sheet:
      return true;
    default:
      return true;
  }
}

const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    _process_a(data);
    _process_b(data);
    return true
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
  }

  const _process_b = (data) => {
    extend.foreign.$_remote('double', [data.menu, StateData.categories], [['cate_id', 1]])
    // calling render to place data
    $R_menu_obj.$_left(data.menu, 'stack');
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : 'page',
    type: 'open'
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  // other things, not connected to dynamic data.


  return ajax;
}

// Public methods

export const MUP_tables = function (element, button) {
  return eleCheck() ? tablesTarget(element, button) : false;
};
export const MUP_actions = function (element, button) {
  return eleCheck() ? actionsTarget(element, button) : false;
};

// fetching all upcoming required details
export const MUP_state = function () {
  return pageOpen();
};