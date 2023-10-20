import {get_callEl} from "../../../base/global.js";
import plugins from "../../../plugins/plugins.js";
import pb from "../../../base/structure.js";
import {$R_common_obj, $R_table_obj} from "../../../base/render.js";
import {_directLE} from "../../../base/elements.js";
import extend from "../../../extend/extend.js";
import {atr} from "../../../base/attributes.js";


// Shared variables
let StateData;
let redData, tableEle;

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
    let _return = true;

    _return &&= _process_a(data);
    _return &&= _process_header(data);
    _return &&= _process_admin_security_tables(data);
    _return &&= _process_user_security_tables(data);
    _return &&= _process_device_use(data);

    return _return;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_header = (data) => {
    let targetEle = _directLE.direct.querySelector('#security-options');
    targetEle.innerHTML = extend.append.$_single_on_innerHTML(targetEle, data.security_option);
    $R_common_obj.$_call(targetEle);

    return true;
  }

  const _process_admin_security_tables = (data) => {
    // for admin enable table
    let targetEle = _directLE.direct.querySelector('#admin-enable');
    tableEle = targetEle.querySelector('table');

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }
    // rendering data into table using above profile.
    tableFormation(data.admin_enable, pb.set.profile.security.t.admin_enable);

    //dataTablesInit(event.value);
    //filterEvents(event.value);


    // for admin disable table
    targetEle = _directLE.direct.querySelector('#admin-disable');
    tableEle = targetEle.querySelector('table');

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }
    // rendering data into table using above profile.
    tableFormation(data.admin_disable, pb.set.profile.security.t.admin_disable);

    //dataTablesInit(event.value);
    //filterEvents(event.value);
    return true;
  }

  const _process_user_security_tables = (data) => {
    // for user enable table
    let targetEle = _directLE.direct.querySelector('#user-enable');
    tableEle = targetEle.querySelector('table');

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }
    // rendering data into table using above profile.
    tableFormation(data.user_enable, pb.set.profile.security.t.user_enable);

    //dataTablesInit(event.value);
    //filterEvents(event.value);

    // for user disable table
    targetEle = _directLE.direct.querySelector('#user-disable');
    tableEle = targetEle.querySelector('table');

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }
    // rendering data into table using above profile.
    tableFormation(data.user_disable, pb.set.profile.security.t.user_disable);

    //dataTablesInit(event.value);
    //filterEvents(event.value);
    return true;
  }

  const _process_device_use = (data) => {
    let targetEle = _directLE.direct.querySelector('#device-use');
    tableEle = targetEle.querySelector('table');

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }
    // rendering data into table using above profile.
    tableFormation(data.device_use, pb.set.profile.security.t.use);

    //dataTablesInit(event.value);
    //filterEvents(event.value);
    return true;
  }

  return _process(data.data);
}

// create basic HTML table for security list.
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

export const SPS_modals = function (event) {
  return eleCheck() ? modalsTarget(get_callEl(), event) : false;
};

// fetching all upcoming required details
export const SPS_pageOpen = function (data) {
  return pageOpen(data);
};

