import {get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, kws, rdR} from "../../../base/const.js";
import {atr} from "../../../base/attributes.js";
import {$R_common_obj, $R_form_obj, $R_table_obj} from "../../../base/render.js";
import {_reportLE, _stepperLE, _tabLE} from "../../../base/elements.js";
import extend from "../../../extend/extend.js";
import AjaxPB, {call_AJAX_POST} from "../../../base/ajax.js";
import {getStateData} from "../../../bucket/state.js";


const host = {
  server: '',
  local : 'http://localhost:0000',
};
// Shared variables
let StateData, redData, formData;
let formEle, tableEle, filterEle;

// Private functions


const _tableFormation = function (data, event, tableEle) {


  // creating a profile for table.
  if (!data) {
    redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
    return true;
  }

  //    console.log(data);
  redData = $R_table_obj.$_simple(data, event);

  // have look into plain HTML table
  //    console.log(redData);

  tableEle.appendChild(redData)

  // apply common renders
  $R_common_obj.$_call(tableEle);
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
    _process_a(data.data);
    return true;
  }

  const _process_a = (data) => {
    const searchNavtab = _reportLE.navtab.querySelector("#search-navtab")
    const form = searchNavtab.querySelector("form");
    $R_form_obj.$global({employees: getStateData().employees}, form, rdR.form.method.simple);


    StateData = data['pageState'];
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

      case pb.rpt.employees.combined.a:
        return _process_a_inner_fun_a(element, event);

      case pb.rpt.employees.combined.b:
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

    case pb.rpt.employees.combined:
      return eType_eValue_function_1(element, _event);

    case pb.rpt.employees.combined:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}


const backsTarget = function (element, event) {
  // destroy the datatable
  // tableObject[button.value].clear().destroy();
  // tableObject[button.value].destroy();

  // empty the table body.
  const _tableEl = get_passedEl().querySelector('table');
  _tableEl.setAttribute(atr.load.table, '0');
  _tableEl.querySelector('tbody').remove();
  return true;
}

const reportsTarget = function (element, event) {

  const report_activities = function (element, event, data) {
    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "dates", "date_id", 0],
      ])
      console.log(data);
      return true;
    }
    const _process_header_posting = (data) => {

      let ac = data['account_detail'];
      // render date
      let range = ['from', 'to'];
      let i = 0;

      for (const dateRangeKey in ac.date_range) {
        const value = $R_common_obj.$_return(
          ac.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      ac.date_range = range.join(' to ');
      ac.closing_balance = $R_common_obj.$_return(
        ac.closing_balance,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );
      const headKey = `table-header-${event.value}`;
      // get template
      const headerTemplate = _tabLE.template.querySelector(querySA(atr.core.template, headKey));

      const header = element.querySelector(`#${headKey}`);
      header.innerHTML = extend.append.$_single_on_innerHTML(headerTemplate, ac);

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = ac.name;

      return true;
    }

    const _process_report_activity_absents = (data) => {


      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      // _table_filterEvents(event.value);

      return true;
    }

    let _return = true;

    _return &&= _process_key_value_match(data.data);
    _return &&= _process_header_posting(data.data);
    _return &&= _process_report_activity_absents(data.data);

    return _return;

  }


  const report_salary = function (element, event, data) {

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "dates", "date_id", 0],
      ])
      console.log(data);
      return true;
    }
    const _process_header_posting = (data) => {

      let ac = data['account_detail'];
      // render date
      let range = ['from', 'to'];
      let i = 0;

      for (const dateRangeKey in ac.date_range) {
        const value = $R_common_obj.$_return(
          ac.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      ac.date_range = range.join(' to ');
      ac.closing_balance = $R_common_obj.$_return(
        ac.closing_balance,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );
      const headKey = `table-header-${event.value}`;
      // get template
      const headerTemplate = _tabLE.template.querySelector(querySA(atr.core.template, headKey));

      const header = element.querySelector(`#${headKey}`);
      header.innerHTML = extend.append.$_single_on_innerHTML(headerTemplate, ac);

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = ac.name;

      return true;
    }

    const _process_report_activity_absents = (data) => {


      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      // _table_filterEvents(event.value);

      return true;
    }

    let _return = true;

    _return &&= _process_key_value_match(data.data);
    _return &&= _process_header_posting(data.data);
    _return &&= _process_report_activity_absents(data.data);

    return _return;
  }


  const report_commission = function (element, event, data) {

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "units", "unit_id", 0],
        ["table", "items", "item_id", 1],
      ])
      console.log(data);
      return true;
    }
    const _process_header_posting = (data) => {

      let ac = data['account_detail'];
      // render date
      let range = ['from', 'to'];
      let i = 0;

      for (const dateRangeKey in ac.date_range) {
        const value = $R_common_obj.$_return(
          ac.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      ac.date_range = range.join(' to ');
      ac.closing_balance = $R_common_obj.$_return(
        ac.closing_balance,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );
      const headKey = `table-header-${event.value}`;
      // get template
      const headerTemplate = _tabLE.template.querySelector(querySA(atr.core.template, headKey));

      const header = element.querySelector(`#${headKey}`);
      header.innerHTML = extend.append.$_single_on_innerHTML(headerTemplate, ac);

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = ac.name;

      return true;
    }

    const _process_report_activity_absents = (data) => {


      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      // _table_filterEvents(event.value);

      return true;
    }

    let _return = true;

    _return &&= _process_key_value_match(data.data);
    _return &&= _process_header_posting(data.data);
    _return &&= _process_report_activity_absents(data.data);

    return _return;
  }

  const report_credit_sale = function (element, event, data) {

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "customers", "customer_id", 0],
        ["table", "items", "item_id", 1],
        ["table", "vehicles", "vehicle_id", 0],
        ["table", "units", "unit_id", 0],
        ["table", "dates", "date_id", 0],
      ])
      console.log(data);
      return true;
    }
    const _process_header_posting = (data) => {

      let ac = data['account_detail'];
      // render date
      let range = ['from', 'to'];
      let i = 0;

      for (const dateRangeKey in ac.date_range) {
        const value = $R_common_obj.$_return(
          ac.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      ac.date_range = range.join(' to ');
      ac.closing_balance = $R_common_obj.$_return(
        ac.closing_balance,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );
      const headKey = `table-header-${event.value}`;
      // get template
      const headerTemplate = _tabLE.template.querySelector(querySA(atr.core.template, headKey));

      const header = element.querySelector(`#${headKey}`);
      header.innerHTML = extend.append.$_single_on_innerHTML(headerTemplate, ac);

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = ac.name;

      return true;
    }

    const _process_report_activity_absents = (data) => {


      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      // _table_filterEvents(event.value);

      return true;
    }


    let _return = true;

    _return &&= _process_key_value_match(data.data);
    _return &&= _process_header_posting(data.data);
    _return &&= _process_report_activity_absents(data.data);

    return _return;
  }

  const report_shift_collection = function (element, event, data) {

    const _process_key_value_match = (data) => {
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "dates", "date_id", 0],
      ])
      console.log(data);
      return true;
    }
    const _process_header_posting = (data) => {

      let ac = data['account_detail'];
      // render date
      let range = ['from', 'to'];
      let i = 0;

      for (const dateRangeKey in ac.date_range) {
        const value = $R_common_obj.$_return(
          ac.date_range[dateRangeKey],
          rdR.common.methods.date,
          {}
        );
        range.splice(i, 1, value);
        i++;
      }
      ac.date_range = range.join(' to ');
      ac.closing_balance = $R_common_obj.$_return(
        ac.closing_balance,
        rdR.common.methods.currency,
        {
          sign: 1
        }
      );
      const headKey = `table-header-${event.value}`;
      // get template
      const headerTemplate = _tabLE.template.querySelector(querySA(atr.core.template, headKey));

      const header = element.querySelector(`#${headKey}`);
      header.innerHTML = extend.append.$_single_on_innerHTML(headerTemplate, ac);

      // update the name in heading
      element.querySelector(querySA(atr.core.update, kws.attrVal.name))
        .innerText = ac.name;

      return true;
    }

    const _process_report_activity_absents = (data) => {


      _tableFormation(data.table, event.value);

      // dataTablesInit(event.value);

      // _table_filterEvents(event.value);

      return true;
    }

    let _return = true;

    _return &&= _process_key_value_match(data.data);
    _return &&= _process_header_posting(data.data);
    _return &&= _process_report_activity_absents(data.data);

    return _return;
  }


  const common_exe = function () {
    // form for parameters

    formEle = _tabLE.action.querySelector('#form-' + event.value);
    console.log(formEle);
    //      formEle = _tabLE.action.querySelector('#form-' + event.value)
    formData = extend.collect.$_form_step(formEle);

    console.log(formData);
    if (!formData) return false;
    // table for data loading
    tableEle = element.querySelector('table');
    filterEle = element.querySelector('[' + atr.core.target + '="' + kws.value.filters + '"]');

    // checking that table is loaded or not.

    return true;
  }

  const exe = common_exe();
  if (!exe) return false;

  // checking that table is loaded or not.
  if (tableEle.getAttribute(atr.load.table) === '1') return true;

  const _process = (data) => {
    switch (event.value) {
      case pb.rpt.employees.combined.p.activities:
        return report_activities(element, event, data);

      case pb.rpt.employees.combined.p.salary:
        return report_salary(element, event, data);

      case pb.rpt.employees.combined.p.commission:
        return report_commission(element, event, data);

      case pb.rpt.employees.combined.p.credits:
        return report_credit_sale(element, event, data);

      case pb.rpt.employees.combined.p.collection:
        return report_shift_collection(element, event, data);

    }
  }

  return call_AJAX_POST({
    act        : event.value,
    type       : event.type,
    employee_id: formData.employee_id,
  }, formData, _process);

}

const navtabsTarget = (element, event) => {
  if (event.value === "search") {
    _reportLE.navtab.querySelectorAll('[role="tabpanel"]').forEach((element) => {
      element.removeAttribute(atr.load.tab);
      const tbody = element.querySelector("tbody");
      if (tbody) {
        tbody.remove();
      }
    })
    formData = null;
    const searchEl = _reportLE.navtab.querySelector("#search-navtab");
    const form = searchEl.querySelector("form");
    extend.reset.$_simple_form(form);
    return true;
  }

  if (element.getAttribute(atr.load.tab)) return true;

  if (!formData) {
    console.log("getting form data");
    const searchEl = _reportLE.navtab.querySelector("#search-navtab");
    const form = searchEl.querySelector("form");
    formData = extend.collect.$_form_step(form);
  }
  if (!formData) return false;


  const _process = (data) => {
    let _return = true;

    _return &&= _process_aa(data.data);

    return _return;
  }

  const readyData = (data) => {
    switch (event.value) {
      case pb.rpt.employees.combined.p.activities:
      case pb.rpt.employees.combined.p.salary:
      case pb.rpt.employees.combined.p.collection:
        extend.foreign.$_table({...data, ...getStateData()}, [
          ["table", "dates", "date_id", 0],
        ])
        break;
      case pb.rpt.employees.combined.p.credits:
        extend.foreign.$_table({...data, ...getStateData()}, [
          ["table", "customers", "customer_id", 0],
          ["table", "items", "item_id", 1],
          ["table", "vehicles", "vehicle_id", 0],
          ["table", "units", "unit_id", 0],
          ["table", "dates", "date_id", 0],
        ])
        break;
      case pb.rpt.employees.combined.p.commission:
        extend.foreign.$_table({...data, ...getStateData()}, [
          ["table", "units", "unit_id", 0],
          ["table", "items", "item_id", 1],
        ])
        break;
    }
  }

  const _process_aa = (data) => {
    readyData(data);


    _tableFormation(data.table, pb.rpt.employees.combined.p[event.value],
      element.querySelector("table"));

    element.setAttribute(atr.load.tab, 1);
    return true;
  }


  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : event.value,
    type: event.type,
    id  : formData.employee_id
  });
  ajax.callREQUEST(formData, urlID, true, _process);


  return true;
}

// Public methods


// works on card event type hit
export const REC_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const REC_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const REC_Requests = function (data) {
  return pageOpen(data);
};


export const REC_reports = function (_event) {
  return eleCheck() ? reportsTarget(get_callEl(), _event) : false;
};

export const REC_backs = function (_event) {
  return eleCheck() ? backsTarget(get_callEl(), _event) : false;
};

export const REC_navtabs = function (_event) {
  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;

}

