import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {_tableLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {$R_common_obj, $R_table_obj} from "../../../base/render.js";
import {call_AJAX_GET} from "../../../base/ajax.js";
import {CLS, keys} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";


// Shared variables
let redData;
const pageData = {
  "heads"  : {},
  "groups" : {},
  "ledgers": {},
  "summary": {},
};


// Private functions

/**
 * preloaded data that will be same for this page
 */

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

const pageOpen = (data) => {
  const _process = (data) => {
    _process_a(data.data);
    _process_b(data.data);
    return true;
  }

  const _process_a = (data) => {
    return true;
  }

  const _process_b = (data) => {
    return true;
  }

  return _process(data);
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

const tablesTarget = (element, event) => {

  const table_masters = () => {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_aa(data.data);
      return _return;
    }

    const _process_aa = (data) => {
      console.log(data);
      tableFormation(data.table, element.querySelector("table"), pb.rpt.accounts.lists.p.masters);
      element.querySelector("table").querySelectorAll('[data-e-catch]').forEach((el) => {
        el.setAttribute("value", "heads");
      });
      return true;
    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      id  : event.data,
    }, _process);
  }

  const table_heads = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_aa(data.data);
      return _return;
    }

    const _process_aa = (data) => {
      pageData.heads[event.data] = data;
      tableFormation(data.table, element.querySelector("table"),
        pb.rpt.accounts.lists.p.heads);
      _tableLE.lake.querySelector("table").querySelectorAll('[data-e-catch]').forEach((el) => {
        el.setAttribute("value", "groups");
      })
      return true;
    }

    if (pageData.heads.hasOwnProperty(event.data)) {
      _process_aa(pageData.heads[event.data]);
      return Promise.resolve(true);
    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      id  : event.data
    }, _process);
  }

  const table_groups = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_aa(data.data);
      return _return;
    }

    const _process_aa = (data) => {
      pageData.groups[event.data] = data;
      tableFormation(data.table, element.querySelector("table"),
        pb.rpt.accounts.lists.p.groups);
      _tableLE.river.querySelector("table").querySelectorAll('[data-e-catch]').forEach((el) => {
        el.setAttribute("value", "ledgers");
      })
      return true;
    }

    if (pageData.groups.hasOwnProperty(event.data)) {
      _process_aa(pageData.groups[event.data]);
      return Promise.resolve(true);
    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      id  : event.data
    }, _process);
  }

  const table_ledgers = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_aa(data.data);
      return _return;
    }

    const _process_aa = (data) => {
      pageData.ledgers[event.data] = data;
      tableFormation(data.table, element.querySelector("table"),
        pb.rpt.accounts.lists.p.ledgers);

      _tableLE.pond.querySelector("table").querySelectorAll('[data-e-catch]').forEach((el) => {
        el.setAttribute("value", "summary");
      })
      return true;
    }

    if (pageData.ledgers.hasOwnProperty(event.data)) {
      _process_aa(pageData.ledgers[event.data]);
      return Promise.resolve(true);
    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      id  : event.data
    }, _process);
  }

  const table_summary = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_aa(data.data);
      return _return;
    }

    const _process_aa = (data) => {
      pageData.summary[event.data] = data;
      tableFormation(data.table, element.querySelector("table"),
        pb.rpt.accounts.lists.p.summary);
      return true;
    }

    if (pageData.summary.hasOwnProperty(event.data)) {
      _process_aa(pageData.summary[event.data]);
      return Promise.resolve(true);
    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      id  : event.data
    }, _process);
  }

  switch (event.value) {
    case pb.rpt.accounts.lists.p.masters:
      return table_masters();

    case pb.rpt.accounts.lists.p.heads:
      return table_heads();

    case pb.rpt.accounts.lists.p.groups:
      return table_groups();

    case pb.rpt.accounts.lists.p.ledgers:
      return table_ledgers();

    case pb.rpt.accounts.lists.p.summary:
      return table_summary();
  }
  return true;
}


const get = function (event) {
  switch (event.type) {
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
      return eleCheck() ? actionsTarget(get_callEl(), event) : false;
    default:
      return Promise.reject('Invalid Event Type');
  }
}
const option = function (event) {
  switch (event.type) {
    default:
      return Promise.reject('Invalid Event Type');
  }
}


export const RAL_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('RAL_Requests', 'Request Type: ' + type);
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
