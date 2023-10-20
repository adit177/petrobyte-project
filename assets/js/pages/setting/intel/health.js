import {get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {atr} from "../../../base/attributes.js";
import {$R_table_obj, $R_common_obj, $R_form_obj, $R_paging_obj, $R_menu_obj} from "../../../base/render.js";
import AjaxPB from "../../../base/ajax.js";
import {rdR, exT, Lyt, otR, deF, plg, CLS, sD, kws, glob, STYLE} from "../../../base/const.js";
import extend from "../../../extend/extend.js";
import {getStateData} from "../../../bucket/state.js";

const host = {
  server: '',
  local : 'http://localhost:4740',
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
    let _return = true;

    _return &&= _process_a(data);
    _return &&= _process_b(data);

    return true;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_b = (data) => {
    // what your want to process on page load.
    return true;
  }

  return _process(data.data);
}

// create basic HTML table for list.
const tableFormation = function (lists, key) {
  const prBody = tableEle.querySelector("tbody");
  if (prBody) {
    prBody.remove();
  }

  console.log(lists);
  // rendering data into table using above profile.
  redData = $R_table_obj.$_simple(lists, key);

  // have look into plain HTML table
  console.log(redData);

  tableEle.appendChild(redData)

  // apply common renders
  $R_common_obj.$_call(tableEle);

  // for enable dropdown in the table.
  KTMenu.init();
}


const createHeader = function (tableEl, headers) {
  const prHead = tableEl.querySelector("thead");
  if (prHead) {
    prHead.remove();
  }
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  tableEl.appendChild(thead);
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
  // request switching.
  // switching
  switch (_event.value) {

  }
}
const formsTarget = function (element, event) {
  const _form_accounting = () => {
    const _process = (data) => {
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_render_form(data.data);
      return _return
    }
    const _process_render_form = (data) => {
      let form = element.querySelector('form');
      //enable select
      $R_form_obj.$global(data, form, rdR.form.method.selectOnly);
      return true;
    }

    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }

  const _form_inventory = () => {
    const _process = (data) => {
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_render_form(data.data);
      return _return
    }
    const _process_render_form = (data) => {
      let form = element.querySelector('form');
      //enable select
      $R_form_obj.$global(data, form, rdR.form.method.selectOnly);
      return true;
    }

    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }

  const _form_petroleum = () => {
    const _process = (data) => {
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_render_form(data.data);
      return _return
    }
    const _process_render_form = (data) => {
      let form = element.querySelector('form');
      //enable select
      $R_form_obj.$global(data, form, rdR.form.method.selectOnly);
      return true;
    }

    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }

  switch (event.value) {
    case pb.set.intel.health.p.accounting:
      return _form_accounting();
    case pb.set.intel.health.p.inventory:
      return _form_inventory();
    case pb.set.intel.health.p.petroleum:
      return _form_petroleum();
    default:
      return eventNotFound(event);
  }
}
const tablesTarget = function (element, event) {
  const _table_accounting = () => {
    let formData;
    let id;
    // collect form data first
    const _process_form_data = () => {

      let form = get_passedEl().querySelector('form');
      formData = extend.collect.$_form_step(form);
      if (!formData) {
        return false;
      }
      id = formData.form_type_id;
      return true;
    }
    if (!_process_form_data()) {
      return false;
    }

    // check if table is already loaded.
    tableEle = element.querySelector('table')

    if (!tableEle) {
      return false;
    }

    const _process = (data) => {
      console.log(data);
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_render_table(data.data);
      return _return
    }
    const _process_render_table = (data) => {
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "dates", "date_id", 0],
      ])

      console.log(data.table);

      createHeader(tableEle, data.headers);

      console.log(data.table);


      tableFormation(data.table, pb.set.intel.health.t[data.type]);
      return true;
    }

    console.log(id);

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
      id  : id,
    }, 'local', 0);
    ajax.callREQUEST(formData, urlID, true, _process);

    // other things, not connected to dynamic data.
    return ajax;
  }

  const _table_inventory = () => {
    let formData = [];
    let id;
    // collect form data first
    const _process_form_data = () => {

      let form = get_passedEl().querySelector('form');
      formData = extend.collect.$_form_step(form);
      if (!formData) {
        return false;
      }
      id = formData.form_type_id;
      return true;
    }
    if (!_process_form_data()) {
      return false;
    }

    // check if table is already loaded.
    tableEle = element.querySelector('table')

    if (!tableEle) {
      return false;
    }
    const _process = (data) => {
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_render_table(data.data);
      return _return
    }
    const _process_render_table = (data) => {
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // render the response data (if required)
      if (data.type === "items") {
        extend.foreign.$_table({...data, ...getStateData()}, [
          ["table", "items", "item_id", 1],
          ["table", "units", "unit_id", 0],
        ])
      }
      else if (data.type === "inputs") {
        extend.foreign.$_table({...data, ...getStateData()}, [
          ["table", "dates", "date_id", 0],
          ["table", "dates", "delivery_date_id", 0],
          ["table", "items", "item_id", 1],
          ["table", "units", "unit_id", 0],
        ])
      }

      console.log(data.table);

      createHeader(tableEle, data.headers);

      console.log(data.table);


      tableFormation(data.table, pb.set.intel.health.t[data.type]);
      return true;

    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
      id  : id,
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);

    // other things, not connected to dynamic data.
    return ajax;
  }

  const _table_petroleum = () => {
    let formData = [];
    let id;
    // collect form data first
    const _process_form_data = () => {

      let form = get_passedEl().querySelector('form');
      formData = extend.collect.$_form_step(form);
      if (!formData) {
        return false;
      }
      id = formData.form_type_id;
      return true;
    }
    if (!_process_form_data()) {
      return false;
    }

    // check if table is already loaded.
    tableEle = element.querySelector('table')

    if (!tableEle) {
      return false;
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return true;
    }
    const _process = (data) => {
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_render_table(data.data);
      return _return
    }
    const _process_render_table = (data) => {
      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      extend.foreign.$_table({...data, ...getStateData()}, [
        ["table", "dates", "date_id", 0],
      ])

      console.log(data.table);

      createHeader(tableEle, data.headers);

      console.log(data.table);


      tableFormation(data.table, pb.set.intel.health.t[data.type]);
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
      id  : id,
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);

    // other things, not connected to dynamic data.
    return ajax;
  }

  switch (event.value) {
    case pb.set.intel.health.p.accounting:
      return _table_accounting();
    case pb.set.intel.health.p.inventory:
      return _table_inventory();
    case pb.set.intel.health.p.petroleum:
      return _table_petroleum();
    default:
      return eventNotFound(event)
  }
}


export const SIH_forms = function (_event) {
  return eleCheck() ? formsTarget(get_callEl(), _event) : false;
};
export const SIH_tables = function (_event) {
  return eleCheck() ? tablesTarget(get_callEl(), _event) : false;
};
// works on action event type hit
export const SIH_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const SIH_pageOpen = function (data) {
  return pageOpen(data);
};
