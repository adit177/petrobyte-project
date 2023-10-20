import {get_callEl} from "../../../base/global.js";
import plugins from "../../../plugins/plugins.js";
import pb from "../../../base/structure.js";
import {$R_common_obj, $R_table_obj} from "../../../base/render.js";
import {_directLE} from "../../../base/elements.js";
import extend from "../../../extend/extend.js";
import {atr} from "../../../base/attributes.js";
import {exT} from "../../../base/const.js";


// Shared variables
let StateData;
let tableEle, targetEle, redData;

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4710',
};

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
    _return &&= _process_login_sessions(data);

    return _return;
  }

  const _process_static_data = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_login_sessions = (data) => {
    targetEle = _directLE.direct.querySelector('#login-sessions');
    tableEle = targetEle.querySelector('table');

    if (tableEle.getAttribute(atr.load.table) == '1') return true;
    // load the login sessions table
    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }

    // foreign matching for table
    extend.foreign.$_remote(exT.foreign.combine, data, [['login_sessions', 'dates', 4, 0]]);

    // rendering data into table using above profile.
    tableFormation(data.login_sessions, pb.set.profile.logs.t.sessions);

    //dataTablesInit(event.value);
    //filterEvents(event.value);

    return true;
  }

  return _process(data.data);
}

// create basic HTML table for accounts list.
const tableFormation = function (lists, key) {

  // rendering data into table using above profile.
  redData = $R_table_obj.$_simple(lists, key);

  // have look into plain HTML table
  //console.log(redData);

  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);

  // for enable dropdown in the table.
  KTMenu.init();
}


const modalsTarget = function (element, button) {
  //here we handle all modals
}


// Public methods

export const SPL_modals = function (event) {
  return eleCheck() ? modalsTarget(get_callEl(), event) : false;
};
// fetching all upcoming required details
export const SPL_pageOpen = function (data) {
  return pageOpen(data);
};
