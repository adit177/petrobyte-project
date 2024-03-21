import {get_action, get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR, kws, deF, plg, CLS, Lyt, otR, sD, glob, STYLE} from "../../../base/const.js";
import AjaxPB from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import extend from "../../../extend/extend.js";
import {$R_form_obj, $R_table_obj, $R_common_obj} from "../../../base/render.js";
import {_tabLE, _tableLE} from "../../../base/elements.js";
import {getStateData} from "../../../bucket/state.js"
import ajax from "../../../base/ajax.js";

const host = {
  server: '',
  local : 'http://localhost:0000',
};
// Shared variables
let StateData, redData;
let tableEle;

// Private functions

const pageData = {
  "months" : {},
  "days"   : {},
  "dayInfo": {},
};


const tableFormation = function (data, tableEle, profile) {
  const tbody = tableEle.querySelector('tbody');
  if (tbody) {
    tbody.remove();
  }

  console.log(tableEle);
  if (!data) {
    redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
    return true;
  }

  redData = $R_table_obj.$_simple(data, profile);

  console.log(redData);

  tableEle.appendChild(redData)

  tableEle.setAttribute(atr.load.table, '1');

  $R_common_obj.$_call(tableEle);

  return true;

}


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
    console.log(data);
    _process_a(data.data);
    _process_b(data.data);
    return true;
  }

  const _process_a = (data) => {
    extend.foreign.$_table({...data, ...getStateData()},
      [["table", "items", "item_id", 1]]);
    return true;
  }

  const _process_b = (data) => {
    tableFormation(data.table, _tableLE.sea.querySelector("table"), pb.rpt.petroleum.flowsheet.p.years)
    _tableLE.sea.querySelector("table").querySelectorAll('[data-pb-catch]').forEach((el) => {
      el.setAttribute("value", "months");
      el.setAttribute(atr.event.origin, `years-table`);
    })
    return true;
    // what your want to process on page load.
  }

  return _process(data);
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

      case pb.rpt.petroleum.flowsheet.a:
        return _process_a_inner_fun_a(element, event);

      case pb.rpt.petroleum.flowsheet.b:
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

    case pb.rpt.petroleum.flowsheet:
      return eType_eValue_function_1(element, _event);

    case pb.rpt.petroleum.flowsheet:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}

const tablesTarget = (element, event) => {
  const tableMonths = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_aa(data.data);

      return _return;
    }

    const _process_aa = (data) => {
      pageData.months[event.data] = data;
      tableFormation(data.table, element.querySelector("table"),
        pb.rpt.petroleum.flowsheet.p.months);
      _tableLE.lake.querySelector("table").querySelectorAll('[data-pb-catch]').forEach((el) => {
        el.setAttribute("value", "days");
        el.setAttribute(atr.event.origin, `months-table`);
      })
      return true;
    }

    if (pageData.months[event.data]) {
      return _process_aa(pageData.months[event.data]);
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      item_id: event.data
    });
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }

  const tableDays = () => {
    const _process = (data) => {
      let _return = true;

      console.log(data);

      extend.foreign.$_table({...data.data, ...getStateData()},
        [["table", "dates", "date_id", 0]]);


      _return &&= _process_aa(data.data);

      return _return;
    }

    const _process_aa = (data) => {
      pageData.days[event.data] = data;

      console.log(data.table);
      tableFormation(data.table, element.querySelector("table"),
        pb.rpt.petroleum.flowsheet.p.days);


      _tableLE.river.querySelector("table").querySelectorAll('[data-pb-catch]').forEach((el) => {
        el.setAttribute("value", "dayInfo");
        el.setAttribute(atr.event.origin, `days-table`);
      })

      return true;
    }

    if (pageData.days[event.data]) {
      return _process_aa(pageData.days[event.data]);
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act     : event.value,
      type    : event.type,
      month_id: event.data
    });
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }

  const tableDayInfo = () => {
    alert("event is hit");
    console.log("calling dayInfo")
    const _process = (data) => {
      let _return = true;

      console.log(data);

      extend.foreign.$_table({...data.data, ...getStateData()},
        [
          ["table", "dates", "date_id", 0],
          ["table", "particulars", "particular_id", 0]
        ]);


      _return &&= _process_aa(data.data);

      return _return;
    }

    const _process_aa = (data) => {
      pageData.dayInfo[event.data] = data;

      console.log(data);


      tableFormation(data.table, element.querySelector("table"),
        pb.rpt.petroleum.flowsheet.p.dayInfo);

      return true;
    }

    if (pageData.dayInfo[event.data]) {
      return _process_aa(pageData.dayInfo[event.data]);
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act   : event.value,
      type  : event.type,
      day_id: event.data
    });
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }

  function swap(json) {
    var ret = {};
    for (var key in json) {
      ret[json[key]] = key;
    }
    return ret;
  }

  const obj = swap(pb.rpt.petroleum.flowsheet.p);


  switch (event.value) {
    case obj.lake:
      return tableMonths();

    case obj.sea:
      return true;

    case obj.river:
      return tableDays();

    case obj.pond:
      return tableDayInfo();

  }


  console.log(element, event);
  return true;
}

const backTarget = (element, _event) => {
  let placeZone = pb.rpt.petroleum.flowsheet.p[_event.place.split("-")[0]];
  let valueZone = pb.rpt.petroleum.flowsheet.p[_event.value];

  _tableLE[placeZone].querySelector("#" + _event.place).classList.add(CLS.display.none);
  _tableLE[valueZone].querySelector("#" + _event.value + "-table").classList.remove(CLS.display.none);
  console.log(_event);
  return true;
}

// Public methods


// works on card event type hit
export const RPF_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const RPF_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

export const RPF_tables = function (_event) {
  return eleCheck() ? tablesTarget(get_callEl(), _event) : false;
};


// fetching all upcoming required details
export const RPF_Requests = function (data) {
  return pageOpen(data);
};

export const RPF_backs = function (_event) {
  return backTarget(get_callEl(), _event);
}



