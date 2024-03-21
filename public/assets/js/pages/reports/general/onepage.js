import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR} from "../../../base/const.js";
import {_directLE} from "../../../base/elements.js";
import {$R_common_obj, $R_table_obj} from "../../../base/render.js";
import {getStateData} from "../../../bucket/state.js";
import extend from "../../../extend/extend.js";
import {_k} from "../../../base/keys.js";

// Shared variables
let StateData, redData;

// Private functions

/**
 * preloaded data that will be same for this page
 */
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
    return true;
  }

  const _process_a = (data) => {
    // prepare data
    return true;

  }

  const _process_b = (data) => {
    console.log(data);

    for (const key in data) {

      extend.foreign.$_branch({...data[key], ...getStateData()}, [
        [_k.table, _k.s.ledgers, _k.id.ledger, 1],
        [_k.table, _k.s.ledgers, _k.ledger_cr, 1],
        [_k.table, _k.s.ledgers, _k.ledger_dr, 1],
        [_k.table, _k.s.items, _k.id.ledger, 1],
        [_k.table, _k.s.units, _k.id.unit, 0]
      ])


      const tableData = data[key].table;

      const tableEl = _directLE.visits.querySelector(`#${key}_table`);

      if (!tableEl) continue;

      if (!tableData) {
        $R_table_obj.$_zero(tableEl.querySelectorAll('thead>tr>th').length);
      }
      else {
        const tbody = $R_table_obj.$_simple(tableData, pb.rpt.general.onepage.p[key]);
        tbody.className = "text-gray-600 fw-semibold fs-5";
        tableEl.appendChild(tbody);
      }
      if (data[key].footer) {

        const footer = data[key].footer;
        const tfoot = tableEl.querySelector("tfoot");
        for (let key2 in footer) {
          const td = tfoot.querySelector(`.${key2}`);
          td.innerText = footer[key2];
        }

        // prepare footer
      }
      $R_common_obj.$_call(tableEl);
    }

    console.log("hi");

    const purchaseTable = _directLE.visits.querySelector(`#purchases_nested_table`);

    const purchaseData = data.purchases;

    extend.foreign.$_table({...purchaseData, ...getStateData()}, [
      ["parent", "ledgers", "ledger_cr", 1],
      ["parent", "ledgers", "ledger_dr", 1],
      ["child", "items", "item_id", 1],
      ["child", "units", "unit_id", 0],
    ])

    redData = $R_table_obj.$_nested(purchaseData, pb.rpt.general.onepage.p.purchases,
      ["Item", "Quantity", "Rate", "Value", "Discount", "Taxable", "GST", "Amount"]);

    purchaseTable.appendChild(redData);

    $R_common_obj.$_call(purchaseTable);

    // what your want to process on page load.
  }

  return _process(data.data);
}

const cardsTarget = function (element, event) {

  /*
   ------------------
   internal functions
   ------------------
   */


  const _process_a = (data) => {


    const _process_a_inner_fun_a = function (element, data, event) {

      //
      return true;

    }
    // here we load receipts tab data
    const _process_a_inner_fun_b = function (element, data, event) {

      return true;
    }

    // switching
    switch (event.value) {

      case pb.rpt.general.onepage.a:
        return _process_a_inner_fun_a(element, event);

      case pb.rpt.general.onepage.b:
        return _process_a_inner_fun_b(element, event);

      default :
        eventNotFound(event);
        return false;
    }
  }

  const _process = (data) => {
    return _process_a(data);
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : event.value,
    type   : event.type,
    account: event.data
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  return ajax;
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

    case pb.rpt.general.onepage:
      return eType_eValue_function_1(element, _event);

    case pb.rpt.general.onepage:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}


// works on card event type hit
export const RGO_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const RGO_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const RGO_pageOpen = function (data) {
  return pageOpen(data);
};

