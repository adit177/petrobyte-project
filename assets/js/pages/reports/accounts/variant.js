import {get_action, get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {rdR, kws} from "../../../base/const.js";
import extend from "../../../extend/extend.js";
import {$R_common_obj, $R_form_obj, $R_table_obj} from "../../../base/render.js";
import {atr} from "../../../base/attributes.js";
import AjaxPB, {call_AJAX_POST} from "../../../base/ajax.js";
import {_reportLE, _tabLE} from "../../../base/elements.js";
import {getStateData} from "../../../bucket/state.js";
import {_k} from "../../../base/keys.js";

// Shared variables
let StateData, redData, tableEle;
let wave_table_ledger_id;
let summary_modal;

// Private functions
/**
 * connect with server to get response.
 * @param button array [value, name]
 * @param params
 * @returns {*|boolean}
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
    _process_a(data);
    _process_b(data);
    return true
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
  }

  const _process_b = (data) => {
    return true;
  }

  return _process(data.data);
}

const backsTarget = function (element, event) {
  /*
   // destroy the datatable
   tableObject[button.value].clear().destroy();
   tableObject[button.value].destroy();
   */

  // empty the table body.
  const _tableEl = get_passedEl().querySelector('table');
  // setting the status = 0 for the table
  _tableEl.setAttribute(atr.load.table, '0');
  // remove the previous account data from table.
  //  const tbody = _tableEl.querySelector('tbody');
  //  if (tbody) tbody.remove();
  return true;
}


const tabsTarget = (element, event) => {

  if (element.getAttribute(atr.load.tab)) return true;

  const waveTab = (element, event, data) => {
    console.log(element);
    const formEl = element.querySelector('form');
    $R_form_obj.$global({ledgers: data.ledgers}, formEl, rdR.form.method.simple);
    return true;
  }

  const interestTab = (element, event, data) => {
    const formEl = element.querySelector('form');
    $R_form_obj.$global({
      months : data.months,
      ledgers: getStateData().ledgers
    }, formEl, rdR.form.method.simple);
    return true;
  }

  const _process = (data) => {
    let _return = true;

    _return &&= _process_aa(data.data);

    return _return;
  }

  const _process_aa = (data) => {


    switch (event.value) {
      case 'wave':
        return waveTab(element, event, data);
      case "interest":
        return interestTab(element, event, data);
    }

    element.setAttribute(atr.load.tab, '1');

    return true;
  }


  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : event.value,
    type: event.type
  });
  ajax.callREQUEST({}, urlID, false, _process);

  return ajax;
}

const reportsTarget = (element, event) => {

  const form = get_action().form;
  console.log(form, element, event);
  const formData = extend.collect.$_form_step(form);
  if (!formData) return false;


  const waveReport = (element, event, data) => {

    wave_table_ledger_id = formData.ledger_id;

    console.log(data);

    extend.foreign.$_table({...data, ...getStateData()}, [
      ["table", "dates", "date_id", 0],
      ["table", "statuses", "status", 1]
    ])

    console.log(data);

    const statusEl = element.querySelector("#wave-table-status-select");

    for (let key in data.statuses) {
      data.statuses[key][0] = data.statuses[key][1];
    }


    console.log(data.statuses);

    $R_form_obj.$global({statuses: data.statuses}, statusEl, rdR.form.method.singleElement);


    console.log(data);
    tableEle = element.querySelector('table');

    if (!data.table) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
      return true;
    }


    let tbody = tableEle.querySelector('tbody');
    if (!tbody) {
      tbody = document.createElement("tbody");
      tableEle.appendChild(tbody);
    }

    function acount_on_row_clicked(e) {
      const cell = dt.cell(this);
      console.log(cell.index());
      const row = dt.row(this);
      const idx = cell.index().column;
      const header = dt.column(idx).header();
      if (header.hasAttribute("data-voucher-type")) {

        const voucher_type = header.getAttribute("data-voucher-type");
        const date = row.data().date_id;

        console.log(voucher_type, date, wave_table_ledger_id);

        const send_data = {
          voucher_type: voucher_type,
          date        : date,
          ledger_id   : wave_table_ledger_id
        }

        const _process = (data) => {
          data = data.data;
          let modal = _tabLE.result.querySelector('#summary-modal');

          if (!summary_modal) {
            summary_modal = new bootstrap.Modal(modal);
          }

          const table = modal.querySelector('table');
          const tbody = table.querySelector('tbody');
          if (tbody) tbody.remove();

          if (!data.table) {
            redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
            return true;
          }

          redData = $R_table_obj.$_simple(data.table, pb.rpt.accounts.wave.p.summary);

          table.appendChild(redData);

          summary_modal.show();

          console.log(data);

          return true;
        }


        return call_AJAX_POST(
          {
            act : "summary",
            type: "modal",
            id  : wave_table_ledger_id,
          }, send_data, _process, false
        )
      }


    }

    let dt = $R_table_obj.$simple_dt(data.table, "variant-wave-table", element,
      pb.rpt.accounts.wave.p.wave, acount_on_row_clicked);


    return true;
  }

  const interestReport = (element, event, data) => {

    extend.foreign.$_table({...data, ...getStateData()}, [
      [_k.table, _k.s.dates, _k.id.date, 0],
      [_k.table, _k.s.particulars, _k.id.particular, 0],
    ]);

    tableEle = element.querySelector('table');

    if (!data.table) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
      return true;
    }

    redData = $R_table_obj.$_simple(data.table, pb.rpt.accounts.wave.p.interest);

    const tbody = tableEle.querySelector('tbody');
    if (tbody) tbody.remove();

    tableEle.appendChild(redData);

    return true;

  }

  const _process = (data) => {
    let _return = true;

    _return &&= _process_aa(data.data);

    return _return;
  }

  const _process_aa = (data) => {

    console.log(data);

    switch (event.value) {
      case pb.rpt.accounts.wave.p.wave:
        return waveReport(element, event, data);
      case pb.rpt.accounts.wave.p.interest:
        return interestReport(element, event, data);

    }

    // aa
    return true;
  }


  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : event.value,
    type: event.type
  },);
  ajax.callREQUEST(formData, urlID, true, _process);

  return ajax;
}

export const RAW_reports = function (_event) {
  return eleCheck() ? reportsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details

export const RAW_tabs = function (_event) {
  return eleCheck() ? tabsTarget(get_callEl(), _event) : false;
};

export const RAW_backs = function (_event) {
  return eleCheck() ? backsTarget(get_callEl(), _event) : false;
};

export const RAW_pageOpen = function (data) {
  return pageOpen(data);
};
