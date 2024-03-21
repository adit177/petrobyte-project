import {get_action, get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR, kws, deF, plg, CLS, Lyt, otR, sD, glob, STYLE} from "../../../base/const.js";
import AjaxPB from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import extend from "../../../extend/extend.js";
import {$R_form_obj, $R_table_obj, $R_common_obj} from "../../../base/render.js";
import {_tabLE} from "../../../base/elements.js";
import {getStateData} from "../../../bucket/state.js"
import {_sheetLE} from "../../../base/elements.js";

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4520',
};
// Shared variables
let StateData, redData;
let tableEle;

// Private functions

/**
 * preloaded data that will be same for this page
 */
const generateSheet = (element, data) => {
  // basic update
  element.querySelectorAll('[' + atr.core.update + ']').forEach((ele) => {
    ele.innerText = data.basic[ele.getAttribute(atr.core.update)];
  });

  const templates = _sheetLE.templates.querySelectorAll('[' + atr.core.template + ']');
  let temps = {};
  templates.forEach((template) => {
    //      template.removeAttribute(atr.core.template);
    temps[template.getAttribute(atr.core.template)] = template;
  });


  /**
   * master
   * HTML space elements.
   */
  const $master = () => {
    // element fir append.
    let Target = {};
    _sheetLE.sheet.querySelectorAll('[' + atr.core.space + '="master"]').forEach((ele) => {
      Target[ele.getAttribute(atr.core.value)] = ele;
    });

    let masterNode;
    for (const accountKey in data.master) {
      Object.keys(data.master[accountKey]).forEach((masterKey) => {
        const row = data.master[accountKey][masterKey];
        masterNode = temps.master.cloneNode(true);
        masterNode.querySelector('[' + atr.core.child + ']').innerText = row[1];
        masterNode.querySelector('[' + atr.core.space + '="head"]').setAttribute(atr.core.value, row[0]);
        Target[accountKey].append(masterNode);
      });
    }
  }
  $master();

  // head
  const $head = () => {
    // element fir append.
    let Target = {};
    _sheetLE.sheet.querySelectorAll('[' + atr.core.space + '="head"]').forEach((ele) => {
      Target[ele.getAttribute(atr.core.value)] = ele;
    });

    let headNode;
    for (const masterKey in data.head) {
      Object.keys(data.head[masterKey]).forEach((headKey) => {
        const row = data.head[masterKey][headKey];
        headNode = temps.head.cloneNode(true);
        headNode.querySelector('[' + atr.core.child + ']').innerText = row[1];
        headNode.querySelector('[' + atr.core.space + '="group"]').setAttribute(atr.core.value, row[0]);
        Target[masterKey].append(headNode);
      });
    }
  }
  $head();

  // group
  const $group = () => {
    // element fir append.
    let Target = {};
    _sheetLE.sheet.querySelectorAll('[' + atr.core.space + '="group"]').forEach((ele) => {
      Target[ele.getAttribute(atr.core.value)] = ele;
    });

    let groupNode;
    for (const headKey in data.group) {
      Object.keys(data.group[headKey]).forEach((groupKey) => {
        const row = data.group[headKey][groupKey];
        groupNode = temps.group.cloneNode(true);
        groupNode.querySelector('[' + atr.core.put + '="group"]').innerText = row[1];
        groupNode.querySelector('[' + atr.core.put + '="balance"]').innerText = row[2];
        groupNode.querySelector('[' + atr.core.space + '="ledger"]').setAttribute(atr.core.value, row[0]);
        // accordion id update
        const id_a = 'accord_' + row[0];
        const id_b = 'accord_' + row[0] + '_item';
        groupNode.querySelector('#accord_gid').setAttribute('id', id_a);
        groupNode.querySelector('.accordion-header').setAttribute('data-bs-target', '#' + id_b);
        const accord_body = groupNode.querySelector('.accordion-content')
        accord_body.setAttribute('id', id_b);
        accord_body.setAttribute('data-bs-parent', '#' + id_a);
        Target[headKey].append(groupNode);
      });
    }
  }
  $group();

  // ledger
  const $ledger = () => {
    // element fir append.
    let Target = {};
    _sheetLE.sheet.querySelectorAll('[' + atr.core.space + '="ledger"]').forEach((ele) => {
      Target[ele.getAttribute(atr.core.value)] = ele;
    });

    let ledgerNode;
    for (const groupKey in data.ledger) {
      Object.keys(data.ledger[groupKey]).forEach((ledgerKey) => {
        const row = data.ledger[groupKey][ledgerKey];
        ledgerNode = temps.ledger.cloneNode(true);
        // <td>
        ledgerNode.querySelector('[' + atr.core.put + '="name"]').innerText = row[1];
        ledgerNode.querySelector('[' + atr.core.put + '="balance"]').innerText = row[2];
        // button
        // data-pb-value
        ledgerNode.querySelectorAll('button').forEach((btn) => {
          btn.setAttribute(atr.core.value, row[0]);
        })

        Target[groupKey].append(ledgerNode);
      });
    }
  }
  $ledger();
}
const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    let _return = true;
    _return &&= _process_page_state_data(data);
    _return &&= _process_update_business_info(data);
    _return &&= _process_update_range(data);
    return _return;
  }
  const _process_page_state_data = (data) => {
    StateData = data['pageState'];

    return true;
  }

  const _process_update_business_info = (data) => {
    // holding element for business inform allocation.
    const sheet_head = _sheetLE.sheet.querySelector(querySA(atr.core.control, 'business')).querySelector(querySA(atr.core.control, kws.attrVal.append));
    // update business details.
    sheet_head.innerHTML = extend.append.$_single_on_innerHTML(sheet_head, StateData['business_info']);

    return true;
  }

  const _process_update_range = (data) => {
    // update range details.
    return true;
  }


  // run the AJAX

  return _process(data.data);
}

const loadsTarget = function (element, event) {
  const _load_sheet = (element, event) => {
    console.log(event);
    const _process = (data) => {
      return _process_a(data.data)
    }
    const _process_a = (data) => {
      console.log(data);

      const sheetData = extend.foreign.$_remote(exT.foreign.combine, data, [["data"]])
      generateSheet(element, sheetData);

      element.setAttribute(atr.status.loaded, '1');

      $R_common_obj.$_call(element);
      return true;
    }

    // collect form.
    const formEle = _sheetLE.starter.querySelector('form');

    console.log(formEle);

    const sdf = extend.collect.$_form_simple(formEle);
    console.log(sdf);

    // ajax call
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }

  // switching
  switch (event.value) {

    case pb.fin.profit.comparison.p.sheet:
      return _load_sheet(element, event);

    case pb.fin.profit.clients.b:
      return _process_a_inner_fun_b(element, event);

    default :
      eventNotFound(event);
      return false;
  }
}


const actionsTarget = function (element, _event) {
  /*
   ------------
   internal functions
   ------------
   */

  /**
   * here we delete the contact
   * @param element
   * @param event
   * @returns {AjaxPB}
   */
  const eType_eValue_function_1 = (element, event) => {
    // :page-event-value-fn to get complete function.

    // code here for the event_value_function_1 function

    const _process = (data) => {
      console.log(data);
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      _return &&= _process_c(data);
      return _return
    }
    const _process_a = (data) => {

      if (!data) {
        toastr.error('We are unable to delete this account', "Failed to delete");
        return false;
      }

      // return on save data call.
      return true;
    }
    const _process_b = (data) => {
      // use the data for processing

      return true;
    }
    const _process_c = (data) => {
      // use the data for processing

      return true;
    }

    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: event.data
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);

    return ajax;
  }

  const eType_eValue_function_2 = (element, event) => {

    // code here for the event_value_function_2 function

    // add process
    // :page-process-function

    // call ajax
    // :page-ajax-calling
  };


  // request switching.
  // switching
  switch (_event.value) {

    case pb.fin.profit.comparison:
      return eType_eValue_function_1(element, _event);

    case pb.fin.profit.comparison:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}


const eleCheck = () => {
  if (get_callEl() === null || get_callEl() === undefined) {
    alert('call element is not defined');
    return false;
  }
  else {
    return true;
  }
}

// Public methods

// works on card event type hit
export const FPCM_loads = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const FPC_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const FPC_pageOpen = function (data) {
  return pageOpen(data);
};

