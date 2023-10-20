import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR} from "../../../base/const.js";
import extend from "../../../extend/extend.js ";
import {getStateData} from "../../../bucket/state.js";
import {$R_common_obj, $R_table_obj} from "../../../base/render.js";
import {_directLE} from "../../../base/elements.js";


const host = {
  server: '',
  local : 'http://localhost:0000',
};
// Shared variables
let StateData, redData;
let tableEle;

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
    console.log(data.data);
    _process_a(data);
    return true;
  }

  const _process_a = (data) => {
    console.log(data);

    extend.foreign.$_table({...data.nozzle_wise_summary, ...getStateData()}, [
      ["table", "items", "item_id", 1],
    ])
    extend.foreign.$_table({...data.tank_wise_summary, ...getStateData()}, [
      ["table", "items", "item_id", 1],
    ])
    extend.foreign.$_table({...data.petroleum_fuel_inventory, ...getStateData()}, [
      ["table", "items", "item_id", 1],
    ])
    extend.foreign.$_table({...data.credit_sales, ...getStateData()}, [
      ["table", "items", "item_id", 1],
      ["table", "units", "unit_id", 0],
    ])


    const groupData = (data, body, key) => {
      let prvVal = "";
      const newTds = [];
      body.children.forEach((el, idx) => {
        const val = data[idx][key];
        newTds.push(el);
        if (val !== prvVal) {
          const td = document.createElement("td");
          td.innerText = val;
          const latestTd = newTds[newTds.length - 1];
          newTds.pop();
          newTds.push(td);
          newTds.push(latestTd);
          prvVal = val;
        }
      })
      body.innerHTML = "";
      body.append(...newTds);
    }

    for (const key in data) {
      const tableData = data[key].table;
      const tableEl = _directLE.visits.querySelector(`#${key}_table`);
      if (!tableData) {
        $R_table_obj.$_zero(tableEl.querySelectorAll('thead>tr>th').length);
      }
      else {
        const tbody = $R_table_obj.$_simple(tableData, pb.rpt.general.rocket.p[key]);
        console.log(tbody);
        if (key === "nozzle_wise_summary") {
          groupData(tableData, tbody, "item_id");
        }
        else if (key === "receipt_vouchers" || key === "payment_vouchers") {
          groupData(tableData, tbody, "group");
        }
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
      }
      $R_common_obj.$_call(tableEl);
    }

    return true;
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

      case pb.rpt.general.rocket.a:
        return _process_a_inner_fun_a(element, event);

      case pb.rpt.general.rocket.b:
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

    case pb.rpt.general.rocket:
      return eType_eValue_function_1(element, _event);

    case pb.rpt.general.rocket:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}

// Public methods


// works on card event type hit
export const RGR_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const RGR_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const RGR_pageOpen = function (data) {
  return pageOpen(data);
};

