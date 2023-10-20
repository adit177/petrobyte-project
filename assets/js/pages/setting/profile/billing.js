import {get_callEl} from "../../../base/global.js";
import plugins from "../../../plugins/plugins.js";
import pb from "../../../base/structure.js";
import {$R_common_obj, $R_table_obj} from "../../../base/render.js";
import {_directLE} from "../../../base/elements.js";
import extend from "../../../extend/extend.js";
import {atr} from "../../../base/attributes.js";
import {CLS, exT} from "../../../base/const.js";


// Shared variables
let StateData;
let redData;
let tableEle, targetEle;


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
    _return &&= _process_valid_card(data);
    _return &&= _process_payment_method(data);
    _return &&= _process_billing_success(data);
    _return &&= _process_billing_failed(data);
    _return &&= _process_subscription_cards(data);

    return _return;
  }

  const _process_state_data = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_valid_card = function (data) {
    let element = _directLE.direct.querySelector('#validity-card');

    //todo: show the percent in bar  (data.validity.activation/365);

    if (data.validity.notice1 !== '1') {
      element.querySelector(querySA(atr.core.control, 'notice1')).classList.add(CLS.display.none);
    }
    if (data.validity.notice2 !== '1') {
      element.querySelector(querySA(atr.core.control, 'notice2')).classList.add(CLS.display.none);
    }

    let target = element.querySelector(querySA(atr.core.control, 'card'));

    target.innerHTML = extend.append.$_single_on_innerHTML(target, data.validity);

    $R_common_obj.$_call(element);
    return true;
  }

  const _process_payment_method = function (data) {
    let element = _directLE.direct.querySelector('#payment-method');
    element.innerHTML = extend.append.$_single_on_innerHTML(element, data.payment);

    $R_common_obj.$_call(element);
    return true;
  }

  const _process_billing_success = function (data) {
    targetEle = _directLE.direct.querySelector('#success_tab');
    tableEle = targetEle.querySelector('table');

    if (tableEle.getAttribute(atr.load.table) === '1') return true;

    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }

    // foreign matching of the data
    extend.foreign.$_remote(exT.foreign.combine, data, [['billing_success', 'dates', 1, 0]]);

    // rendering data into table using above profile.
    tableFormation(data.billing_success, pb.set.profile.billing.t.success);

    //dataTablesInit(event.value);
    //filterEvents(event.value);

    return true;
  }
  const _process_billing_failed = function (data) {
    targetEle = _directLE.direct.querySelector('#failed_tab');
    tableEle = targetEle.querySelector('table');

    if (tableEle.getAttribute(atr.load.table) === '1') return true;

    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }

    // foreign matching of the data
    extend.foreign.$_remote(exT.foreign.combine, data, [['billing_failed', 'dates', 1, 0]]);

    // rendering data into table using above profile.
    tableFormation(data.billing_failed, pb.set.profile.billing.t.failed);

    //dataTablesInit(event.value);
    //filterEvents(event.value);

    return true;
  }

  const _process_subscription_cards = function (data) {
    let element = _directLE.direct.querySelector('#subscription-card');

    if (!data) return false;

    let place = element.querySelector(querySA(atr.core.append, 'card'));
    let template = _directLE.template.querySelector(querySA(atr.core.template, 'card'));

    place.innerHTML = extend.append.$_loop_on_innerHTML(template.innerHTML, data.subscription);

    $R_common_obj.$_call(element);
    return true;
  }

  return _process(data.data)
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


export const SPB_actions = function (event) {
  return eleCheck() ? actionsTarget(get_callEl(), event) : false;
};
export const SPB_modals = function (event) {
  return eleCheck() ? modalsTarget(get_callEl(), event) : false;
};
// fetching all upcoming required details
export const SPB_pageOpen = function (data) {
  return pageOpen(data);
};

