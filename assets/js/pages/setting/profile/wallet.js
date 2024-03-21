import {get_callEl} from "../../../base/global.js";
import plugins from "../../../plugins/plugins.js";
import pb from "../../../base/structure.js";
import {$R_common_obj} from "../../../base/render.js";
import {_directLE} from "../../../base/elements.js";
import extend from "../../../extend/extend.js";
import {atr} from "../../../base/attributes.js";
import {$R_table_obj} from "../../../base/render.js";
import {exT} from "../../../base/const.js";


// Shared variables
let StateData;
let redData;
let tableEle;

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
    _return &&= _process_this_year_table(data);
    _return &&= _process_last_year_table(data);

    return _return;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_header = (data) => {
    let targetEle = _directLE.direct.querySelector(querySA(atr.core.control, 'header'));
    targetEle.innerHTML = extend.append.$_single_on_innerHTML(targetEle, data.header);
    $R_common_obj.$_call(targetEle);

    return true;
  }

  const _process_this_year_table = (data) => {
    let targetEle = _directLE.direct.querySelector('#referrals-this');
    tableEle = targetEle.querySelector('table');

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }

    // render the response data (if required)
    extend.foreign.$_remote(exT.foreign.combine, data, [['referrals_this_year', 'dates', '1', '0']]);

    // rendering data into table using above profile.
    tableFormation(data.referrals_this_year, pb.set.profile.wallet.t.this_year);

    //dataTablesInit(event.value);
    //filterEvents(event.value);

    return true;
  }

  const _process_last_year_table = (data) => {
    let targetEle = _directLE.direct.querySelector('#referrals-last');
    tableEle = targetEle.querySelector('table');

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }

    // render the response data (if required)
    extend.foreign.$_remote(exT.foreign.combine, data, [['referrals_last_year', 'dates', '1', '0']]);

    // rendering data into table using above profile.
    tableFormation(data.referrals_last_year, pb.set.profile.wallet.t.last_year);

    //dataTablesInit(event.value);
    //filterEvents(event.value);

    return true;
  }

  return _process(data.data)
}


// create basic HTML table for wallet list.
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

export const SPW_modals = function (event) {
  return eleCheck() ? modalsTarget(get_callEl(), event) : false;
};
// fetching all upcoming required details
export const SPW_pageOpen = function (data) {
  return pageOpen(data);
};

