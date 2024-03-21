import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, keys, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {$R_common_obj, $R_form_obj, $R_table_obj} from "../../../base/render.js";
import {_wizardLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import PB_defined from "../../../base/defined.js";
import {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import extend from "../../../extend/extend.js";
import {getStateData} from "../../../bucket/state.js";
import {getTagData} from "../../../bucket/tags.js";


// Shared variables
let StateData, redData, formEl;
let PageData;
let tableEle;
let chartObject = [];

let Template;

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
    // page rewquired functions.

    // render the table object.

  const _process = (data) => {
      let _return = true;

      _return &&= _process_save_pageState(data);
      _return &&= _process_render_search(data);
      _return &&= _process_template(data);
      _return &&= _process_table(data);

      return _return;
    }

  const _process_save_pageState = (data) => {
    PageData = data['page_common_info'];
    return true;
  }
  const _process_render_search = (data) => {
    console.log({...PageData, ...getStateData(['employees'])})


    $R_form_obj.$global({...getStateData(['employees'])}, _wizardLE.search, rdR.form.method.selectOnly);
    return true;
  }
  const _process_template = (data) => {
    Template = _wizardLE.template;
    return true;
  }

  // process the table
  const _process_table = (data) => {
    tableEle = _wizardLE.result.querySelector('table');

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.append(redData);
      return true;
    }

    extend.foreign.$_remote(exT.foreign.combine, {...data, ...getStateData(['dates']), ...getTagData(['ledger_balance_tag', 'payroll_status'])}, [
      ['list', 'dates', 'payment_date', '0'],
      ['list', 'ledger_balance_tag', 'status', '0'],
      ['list', 'payroll_status', 'payroll_status', '0'],
    ]);
    // rendering data into table using above profile.
    PB_defined.$_append_table_simple(tableEle, data.list, pb.opr.employees.salary.t.list);

    //dataTablesInit(event.value);

    //filterEvents(event.value);

    return true;
  }

  return _process(data.data);
}


const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Contacts');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Contacts');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}


const actionsTarget = function (element, event) {
  console.log(event)
  const action_result_table = (element, event) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_form(event);
      _return &&= _process_table(data);

      return _return;
    }

    // collect the all form data.
    const _process_form = (event) => {
      let form = _wizardLE[event.place].querySelector('form');
      let data = extend.collect.$_form(form);

      return true;
    }
    const _process_table = (data) => {
      tableEle = element.querySelector('table');

      //remove the body of table.
      tableEle.removeChild(tableEle.querySelector('tbody'));
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      extend.foreign.$_remote(exT.foreign.combine, data, [['list', 'dates', '4', '0']]);
      PB_defined.$_append_table_simple(tableEle, data.list, pb.opr.employees.salary.t.list);
      // rendering data into table using above profile.


      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }
  switch (event.value) {
    case pb.mng.billing.display.p.result:
      return action_result_table(element, event);

    default:
      return eventNotFound(event);
  }
}

const loadsTarget = function (element, event) {
  const load_present = (element, event) => {
    const _process = (data) => {
      data = data.data
      let _return = true;

      _return &&= _process_table(data);
      _return &&= _process_small_tables(data);
      _return &&= _process_general_details(data);

      return _return;
    }
    const _process_table = (data) => {
      console.log(event)
      tableEle = _wizardLE.present.querySelector('table');


      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData);
        return true;
      }
      PB_defined.$_append_table_simple(tableEle, data.salary_breakup, pb.opr.employees.salary.t.salary_breakup);
      // rendering data into table using above profile.
      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
    }

    const _process_small_tables = (data) => {
      console.log(element)
      // rendering the absent details table.
      let node = _wizardLE.template.querySelector(querySA(atr.core.template, 'absent_details'));
      let targetEle = _wizardLE.present.querySelector('#absent_details');

      let place = targetEle.querySelector(querySA(atr.core.append, 'absent_details'));

      //foreign mapping of the data
      extend.foreign.$_remote(exT.foreign.combine, {...data, ...getStateData(['dates'])}, [['absent_details', 'dates', 'date', '0']]);
      console.log(data.absent_details)
      // rendering the table
      node.innerHTML = extend.append.$_loop_on_innerHTML(node.innerHTML, data.absent_details);
      node.classList.remove('d-none')
      place.append(node);
      $R_common_obj.$_call(targetEle);


      // rendering the self expense table.
      node = _wizardLE.template.querySelector(querySA(atr.core.template, 'self_expenses'));
      targetEle = _wizardLE.present.querySelector('#self_expenses');
      //      targetEle.querySelector('[' + atr.core.control + '="total"]').innerHTML = data.self_expenses.total;

      place = targetEle.querySelector(querySA(atr.core.append, 'self_expenses'));

      // rendering the table
      node.innerHTML = extend.append.$_loop_on_innerHTML(node.innerHTML, data.self_expenses.expense_table);
      node.classList.remove('d-none')
      place.append(node);
      $R_common_obj.$_call(targetEle);
      return true;
    }
    const _process_general_details = (data) => {
      let node = _wizardLE.template.querySelector(querySA(atr.core.template, 'general_details'));
      //      let targetEle = element.querySelector('#general_details');
      //      targetEle.querySelector('[' + atr.core.control + '="total"]').innerHTML = data.self_expenses.total;

      let place = _wizardLE.present.querySelector(querySA(atr.core.append, 'general_details'));
      console.log(node);
      let newNode = node.cloneNode(true);
      newNode.innerHTML = extend.append.$_single_on_innerHTML(newNode, data.general);
      newNode.classList.remove('d-none')
      place.append(newNode);


      $R_common_obj.$_call(place);
      console.log(element)
      _wizardLE.present.classList.remove('d-none');
      return true;
    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)

    // other things, not connected to dynamic data.

  }

  switch (event.value) {
    case pb.mng.billing.display.p.present:
      return load_present(element, event);
    default:
      return eventNotFound(event);
  }
}
// Public methods


// loading form
export const OES_cards = function (_event) {
  return eleCheck() ? moonTarget(get_callEl(), _event) : false;
};
export const OES_loads = function (_event) {
  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
};
export const OES_actions = function (_event) {
  console.log('kldfjlkdsjflsdjfououwrw')
  return eleCheck() ? acionsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const OES_pageOpen = function () {
  return pageOpen();
};
const get = function (event) {
  switch (event.type) {
    case eTypes.view:
      return eleCheck() ? viewsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      alert(`eventType: ${event.type}, not GET, change nature to POST`);
      return Promise.reject('Invalid Event Type');
  }
}
const post = function (event) {
  switch (event.type) {

    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.load:
      return eleCheck() ? loadsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}

const option = function (event) {
  switch (event.type) {
    case eTypes.alter:
      return eleCheck() ? alterTarget(get_callEl(), event) : false;

    default:
      return Promise.reject('Invalid Event Type');
  }
}

export const OES_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('OES_Requests', 'Request Type: ' + type);
  switch (type) {

    case keys.event.nature.back:
      return pageBack(data);

    case keys.event.nature.open:
      return pageOpen(data);

    case keys.event.nature.clear:
      return pageClear(data);

    case keys.event.nature.get:
      return get(data);

    case keys.event.nature.post:
      return post(data);

    case keys.event.nature.option:
      return option(data);

    default:
      return false;
  }
}


