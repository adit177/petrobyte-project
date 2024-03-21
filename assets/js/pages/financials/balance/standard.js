import {get_action, get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR, kws, deF, plg, CLS, Lyt, otR, sD, glob, STYLE} from "../../../base/const.js";
import AjaxPB from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import extend from "../../../extend/extend.js";
import {$R_form_obj, $R_table_obj, $R_common_obj} from "../../../base/render.js";
import {_sheetLE} from "../../../base/elements.js";
import {_tabLE} from "../../../base/elements.js";
import {getStateData} from "../../../bucket/state.js"

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4510',
};

// Shared variables
let StateData, redData;
let tableEle;
let $return
// Private functions

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
        ledgerNode.querySelector('[' + atr.core.put + '="alias"]').innerText = row[2];
        ledgerNode.querySelector('[' + atr.core.put + '="balance"]').innerText = row[3];

        // button
        // data-pb-value
        ledgerNode.querySelectorAll('button').forEach((btn) => {
          btn.setAttribute(atr.event.value, row[0]);
        })

        Target[groupKey].append(ledgerNode);
      });
    }
  }
  $ledger();
}
const tableFormation = function (element, data) {
  tableEle = element.querySelector('table');
  //filterEle = element.querySelector('[' + atr.core.target + '="filter"]');

  if (tableEle.getAttribute(atr.load.table) === "1") {
    return true;
  }

  // if no data found, then show no data found message.
  if (!data) {
    redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
    tableEle.appendChild(redData);
    return true;
  }
  // rendering data into table using above profile.
  redData = $R_table_obj.$_simple(data, pb.fin.balance.standard.t.transact);

  // have look into plain HTML table
  //console.log(redData);

  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);

  // for enable dropdown in the table.
  KTMenu.init();
  tableEle.setAttribute(atr.load.table, '1');
  return true;
}
/**
 * It makes the routing for both tabs(cards, tables)
 * @param element
 * @param event
 */
const loadsTarget = function (element, event) {


  const _load_sheet = (element, event) => {
    console.log(event);
    const _process = (data) => {
      return _process_a(data.data)
    }
    const _process_a = (data) => {
      console.log(data);
      //      _sheetLE.sheet.querySelector(".resize_btn").setAttribute(atr.event.value, "hide");

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


  const _load_table = (element, event) => {


    const _process = (data) => {
      return _process_a(data.data);
    }
    const _process_a = (data) => {
      console.log(data);

      for (let key in data.transact) {
        data.transact[key][1] = data.dates[data.transact[key][1]][0];
        data.transact[key][2] = data.ledgers[data.transact[key][2]][0];
        data.transact[key][3] = data.Txn_type[data.transact[key][3]][0];
      }


      // render the response data (if required)
      //        extend.foreign.$_remote(exT.foreign.whole, data, [['transact', 'dates', '1', '0'], ['transact', "ledgers", '2', '0'], ['transact', 'Txn_type', '3', '0']]);
      // rendering data into table using above profile.
      tableFormation(element, data.transact);

      //dataTablesInit(event.value);
      //filterEvents(event.value);

      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }
  switch (event.value) {
    case pb.fin.balance.standard.p.sheet:
      return _load_sheet(element, event);

    case pb.fin.balance.standard.p.trans:
      return _load_table(element, event);
  }

}

const actionsTarget = function (element, button) {
  const resize = () => {

    _sheetLE.sheet.querySelectorAll('.accordion-content').forEach((ele) => {
      if (button.data === "hide") {
        ele.classList.remove("show");
      }
      else {
        ele.classList.add("show");
      }
    });
    const btn = _sheetLE.sheet.querySelector(".resize_btn");
    if (button.data === "hide") {
      btn.setAttribute(atr.event.value, "show");
    }
    else {
      btn.setAttribute(atr.event.value, "hide");
    }
    return true;

  }


  switch (button.value) {
    case pb.fin.balance.standard.p.sheet:
      return true;
    case pb.fin.balance.standard.p.trans:
      return true;
    case "resize":
      return resize();
    default:
      return true;
  }
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
    const sheet_head = _sheetLE.sheet.querySelector(querySA(atr.core.control, 'business')).querySelector(querySA(atr.core.control, kws.attrVal.append));

    console.log(sheet_head);

    // update business details.
    sheet_head.innerHTML = extend.append.$_single_on_innerHTML(sheet_head, StateData['business_info']);
    return true;
  }
  const _process_update_range = (data) => {
    // update range details.
    return true;
  }


  return _process(data.data);
}

const modalsTarget = (element, event) => {

  const summaryModal = () => {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      console.log(data);
      console.log(element);
      console.log("in summery modal");
      const summaryModal = element.querySelector("#summary_modal");
      const modal = new bootstrap.Modal(summaryModal);
      console.log(modal);
      modal.show();
      return true;
    }


    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : 'summary',
      type: 'modal'
    }, 'local', 0);
    ajax.callREQUEST({id: event.data}, urlID, true, _process);

    return ajax;
  }

  switch (event.value) {
    case "summary":
      return summaryModal();
  }

  console.log(event, element);
  return true;
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


export const FBS_loads = function (_event) {
  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
};

export const FBS_actions = function (_event) {
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

export const FBS_modals = function (_event) {
  return eleCheck() ? modalsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const FBS_pageOpen = function (data) {
  return pageOpen(data);
};

