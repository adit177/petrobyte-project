import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, keys, plg, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {$R_form_obj, $R_menu_obj} from "../../../base/render.js";
import {atr} from "../../../base/attributes.js";
import plg_formKeen from "../../../plugins/formKeen.js";
import {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
// Shared variables
let StateData;
var data;
let tableEl, formEl, success;
let redData;
let tableEle;

// todo: customer click hone par ajax call hoave and exising cycle check kare,
//  if cycle exist then show the cycle and ask for confirmation.

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
    // calling render to place data
    $R_menu_obj.$_left(data.menu, rdR.menu.type.value, ['number', 0, 1]);
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

/**
 * here we target the modals
 * @param button
 * @returns {boolean}
 */
const modalsTarget = function (button) {

  // calling ajax with passing type.
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : 'auto',
    line: pb.mng.billing.generate.n
  });
  ajax.callREQUEST({}, urlID, false);


  // async await sleep(3000);

  return true;
}

/**
 *
 * @param targetTableEle
 * @param ajaxResponse
 * @returns {boolean}
 */
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

/**
 * here we fetch the entries
 * @param form
 * @param button
 * @param values
 * @returns {boolean}
 * @private
 */
const _getLoad = function (form, button, values) {

  var fetchEntries;

  // button.getAttribute('data-pb-calling');
  button.querySelector('[data-pb-label="text"]').innerText = 'Loading...';

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : button.value,
    line   : button.name,
    account: values
  });
  ajax.callREQUEST({}, urlID, false);


  data = generate_ajaxCalling([button.value, button.getAttribute('name')], values)

  // render into table.
  let tableProfile = {
    0: {
      type  : rdR.table.cell.checkbox,
      method: 'a',
      value : '0',
      param : [],
      style : 0,
      css   : []
    },
    1: {
      type  : rdR.table.cell.date,
      method: 'a',
      value : '1',
      param : ['b'],
      style : 0,
      css   : []
    },
    2: {
      type  : rdR.table.cell.account,
      method: 'a',
      value : '2',
      param : [],
      style : 0,
      css   : []
    },
    3: {
      type  : rdR.table.cell.text,
      method: 'a',
      value : '3',
      param : [],
      style : 0,
      css   : []
    },
    4: {
      type  : rdR.table.cell.amount,
      method: 'a',
      value : '4',
      param : [],
      style : 0,
      css   : []
    },
    5: {
      type  : rdR.table.cell.amount,
      method: 'a',
      value : '5',
      param : [],
      style : 0,
      css   : []
    },
    6: {
      type  : rdR.table.cell.input,
      method: 'c',
      value : '6',
      param : ['text', 'amount', 'w-125px inr_mask_62 py-1', true, 'To be Settled Amount', '6'],
      style : 1,
      css   : []
    },
  }
  fetchEntries = PB_render_table.$_simple(data, tableProfile);

  button.querySelector('[data-pb-label="text"]').innerText = 'Loaded.';
  if (fetchEntries === false) {
    return false;
  }


  tableEl = form.querySelector('[data-pb-table="' + button.getAttribute('data-pb-calling') + '"]');
  tableEl.classList.remove('d-none');
  tableEl.appendChild(fetchEntries);

  // calling custom
  $R_common_obj.$_call(tableEl);
  plg_formKeen.$_manual(tableEl, [3])
  return true;
}


/**
 * here we load the form when user hit the button
 * @param element
 * @param button
 * @returns {boolean}
 */
function formsTarget(element, button) {
  // fetching new values or static values for form initial
  console.log(element, button);
  formEl = element.querySelector('form');
  if (formEl.getAttribute(atr.load.form) === "1") return true;

  // add page blockUIElement until all things load for the page.
  // Plug_formKeen.loadIndeed(element, [plg.keen.method.block], ['Loading Functions', 'primary']);

  // ajaxResponse = generate_ajaxCalling([button.value, button.getAttribute('name')], [])
  const _process = (data) => {
    data = data.data;
    return _process_a(data);
  }
  const _process_a = (data) => {

    const ajaxResponseNew = {...StateData, ...data};

    const sts = $R_form_obj.$form(ajaxResponseNew, formEl);

    if (!sts) return false;

    element.setAttribute(atr.status.loaded, "1");
    plg_formKeen.$_manual(element, [plg.formKeen.method.block],) // or pass params as ['', '', '', false]
    formEl.setAttribute(atr.load.form, "1");

    return true;
  }

  return call_AJAX_GET({
    act : button.value,
    type: button.type,
  }, _process);

}

/**
 * here we fill the required input onto form
 * @param element
 * @param button
 */
function loadsTarget(element, button) {
  var values = [];
  var target = button.getAttribute('data-pb-calling');
  if (button.getAttribute('data-pb-called') !== 'true') {

    // collect pre-filled required inputs.
    let form = element.querySelector('form'); // button.closest('form');
    form.querySelectorAll('[data-pb-prefill="' + target + '"]').forEach((item) => {
      item.name.search('amount') ? values.push(amt_mask_filter(item.value)) : values.push(item.name);
    });

    success = _getLoad(form, button, values);

    if (success) {
      // todo: this attribute will be changed in case pre-filled data has changed by the user.
      button.setAttribute('data-pb-called', 'true');
    }
  }
  else {
    plg_sweetAlert.$call(plg.sweetAlert.type.simple, [0, 'ho gya to load', 'Aur kya chahata hai??', 'Nahi, kuch nahi chihiye :)'])
  }
}

/**
 * here we load the target table
 * @param element
 * @param event
 */
function tablesTarget(element, event) {


  const _process = (data) => {
    let _return = true;
    _return &&= _process_a(data);
    return _return;
  }

  const _process_a = (data) => {
    // design table
    tableEle = element.querySelector('table');

    if (tableEle.getAttribute(atr.load.table) === "1") return true;

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }
    // foreign mapping of data
    extend.foreign.$_remote('single', data, [['customer_list', 'dates', '4', '0']]);
    // rendering data into table using above profile.
    tableFormation(data.customer_list, pb.mng.billing.generate.t.customer_list);

    //dataTablesInit(event.value);

    //filterEvents(event.value);

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


//export const MBG_forms = function (_event) {
//  return eleCheck() ? formsTarget(get_callEl(), _event) : false;
//};
//export const MBG_loads = function (_event) {
//  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
//};
//export const MBG_tables = function (_event) {
//  return eleCheck() ? tablesTarget(get_callEl(), _event) : false;
//};
//// quick transaction for modal
//export const MBG_modals = function () {
//  modalsTarget(type);
//};

//export const MBG_pageOpen = function () {
//  return pageOpen();
//};

const get = function (event) {
  switch (event.type) {
    case eTypes.form:
      return eleCheck() ? formsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    // useMe
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      alert(`eventType: ${event.type}, not GET, change nature to POST`);
      return Promise.reject('Invalid Event Type');
  }
}
const post = function (event) {
  switch (event.type) {
    case eTypes.load:
      return eleCheck() ? loadsTarget(get_callEl(), event) : false;

    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : false;

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


// Public methods

export const MBG_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MBG_Requests', 'Request Type: ' + type);
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

