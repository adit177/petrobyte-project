import {get_action, get_callEl, get_thePathArr} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {rdR, kws, keys, exT, Lyt} from "../../../base/const.js";
import extend from "../../../extend/extend.js";
import {$R_common_obj, $R_form_obj, $R_table_obj} from "../../../base/render.js";
import plugins from "../../../plugins/plugins.js";
import {_chatsLE, _reportLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import AjaxPB, {call_AJAX_POST} from "../../../base/ajax.js";
import Option_charts from "../../../options/apexcharts.js";
import {eTypes} from "../../../base/events.js";
import {getStateData} from "../../../bucket/state.js";
import {getTagData} from "../../../bucket/tags.js";
import PB_defined from "../../../base/defined.js";
import state from "../../../base/state.js";

// Shared variables
let PageData, formData, redData;
let formEle, tableEle, filterEle, targetEle;
var xResponse, xData;
let tableObject = [];
let chartObject = [], select;


// Private functions

/**
 * loading list of account and render into form.
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
    PageData = data['page_common_info'];
  }
  const _process_b = (data) => {

    // foreign group matching
    extend.foreign.$_remote(
      exT.foreign.combine,
      {...PageData, ...getStateData(['groups'])},
      [['accounts', 'groups', 4, 1]]
    );
    // render form
    $R_form_obj.$global(
      PageData,
      _reportLE.eagle.querySelector("form"),
      rdR.form.method.simple
    );
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

const opensTarget = (element, event) => {
  // check the status.
  return Promise.resolve(true);
}

const foreignMatch = function (param) {
  switch (param) {
    case 'high-transaction':
    case 'transaction-history':
      extend.foreign.$_remote('single', xResponse, [
        ['transaction', 'dates', 3, 0],
        ['transaction', 'type', 4, 0],
      ])
      break;
    default:
      break;
  }
  return true;
}
//here we render the data in cards

// switch function to route a right function for requested action.
const navtabsTarget = function (element, button) {

  const navtab_register_search = function () {

    // reset the form.
    extend.reset.$_simple_form(formEle);

    // clean the state of element.
    state.clean(Lyt.reports, [_reportLE.zones.navtab]);

    // todo: remove tabs attribute and content of datatable.

    return Promise.resolve(true);
  }

  const navtab_register_report = function () {
    return Promise.resolve(true);
  }

  const navtab_register_summary = function (element, button) {

    if (element.getAttribute(atr.load.state) === '1') return Promise.resolve(true);

    const _process = (data) => {

      if (!data.status) return toastr.error('error in fetching data', 'navtab_register_summary');

      let _return = true;
      _return &&= _process_head(data.data);
      _return &&= _process_node(data.data);
      _return &&= _process_render(data.data);
      return _return;
    }

    const _process_head = () => {

      let headerEle = element.querySelectorAll('[data-pb-target]');

      headerEle.forEach((place) => {
        let key = place.getAttribute('data-pb-target');
        console.log(xData[key])
        console.log(place.innerHTML)
        place.innerHTML = extend.append.$_single_on_innerHTML(place, xData[key]);
      });
      return true;
    }
    const _process_node = () => {

      element.querySelectorAll('[data-pb-template]').forEach((place, index) => {
        let targetKey = place.getAttribute('data-pb-template');
        let rowData = xData[targetKey]
        let target = place.querySelector('div');
        if (!rowData) {
          return false;
        }
        foreignMatch(targetKey);
        for (let key in rowData.transaction) {
          let cloneNode = target.cloneNode(true);
          cloneNode.classList.remove('d-none');
          cloneNode.querySelectorAll('[data-pb-control]').forEach((ele, index) => {
            ele.removeAttribute(atr.status.formatted);
            ele.innerText = rowData.transaction[key][index + 1];
          })
          place.appendChild(cloneNode);
        }
      });
      return true;
    }
    const _process_render = (data) => {

      $R_common_obj.$_call(element);

      // finished.
      element.setAttribute(atr.load.state, '1');
      return true;
    }

    return call_AJAX_POST({
      act    : button.value,
      type   : button.type,
      account: formData.account_id,
    }, formData, _process);
  }

  const navtab_register_charts = function (element, button) {

    if (element.getAttribute(atr.load.tab) === '1') return Promise.resolve(true);

    const _process = (data) => {
      let _return = true;
      _return &&= _process_charts(data.data);
      _return &&= _process_end();

      return _return;
    }
    const _process_charts = (data) => {
      PB_defined.$_create_charts(element, data);
      return true;
    }

    const _process_end = () => {
      element.setAttribute(atr.load.tab, '1');
      return true;
    }

    // formData
    return call_AJAX_POST({
      act : button.value,
      type: button.type,
      id  : formData.account_id,
    }, formData, _process);
  }

  switch (button.value) {
    case pb.rpt.accounts.register.p.search:
      return navtab_register_search(element, button);

    case pb.rpt.accounts.register.p.transaction:
      return navtab_register_report(element, button);

    case pb.rpt.accounts.register.p.summary:
      return navtab_register_summary(element, button);

    case pb.rpt.accounts.register.p.charts:
      return navtab_register_charts(element, button);
  }
}

const loadsTarget = function (element, button) {

  const load_register_search = function (element, event) {
    /*
     formEle = element.querySelector('form');
     extend.reset.formReset(formEle, 'load');
     */
    return true;
  }

  const load_register_report = function (element, event) {

    if (element.querySelector('.tab-pane').getAttribute(atr.load.tab) === '1') {
      return Promise.resolve(true);
    }

    // run the process.
    formEle = _reportLE.eagle.querySelector('form');
    tableEle = element.querySelector('table');
    // todo: fix this.
    filterEle = element.querySelector('[' + atr.core.target + '="' + kws.value.filters + '"]');

    // collect form data
    formData = extend.collect.$_form_step(formEle);
    if (formData.account_id === "") return Promise.reject('Account is required.');

    const _process = (data) => {
      if (!data.status) {
        toastr.error(data.message, data.title);
        return false;
      }
      return _process_create_table(data.data);
    }
    const _process_create_table = (data) => {

      // foreign id matching
      redData = extend.foreign.$_remote(
        exT.foreign.combine,
        {
          ...data,
          ...getStateData(['dates', 'ledgers']),
          ...getTagData(['voucher_types', 'txn_types', 'nature'])
        },
        [
          ['transactions', 'dates', 'date_id', 0],
          ['transactions', 'ledgers', 'ledger_id', 1],
          ['transactions', 'voucher_types', 'vou_type', 0],
          ['transactions', 'txn_types', 'txn_type', 0],
          ['transactions', 'nature', 'nature', 0],
        ]);

      // create the table.
      PB_defined.$_append_table_simple(tableEle, data.transactions, pb.rpt.accounts.register.p.transaction);
      return true;
    }
    return call_AJAX_POST({
      act : event.value,
      type: event.type,
      id  : formData.account_id
    }, formData, _process);

  }

  const load_register_summary = function (element, button) {
    return navtabsTarget(element, button);
  }

  const load_register_charts = function (element, button) {
    return navtabsTarget(element, button);
  }

  switch (button.value) {
    case pb.rpt.accounts.register.p.search:
      return load_register_search(element, button);

    case pb.rpt.accounts.register.p.transaction:
      return load_register_report(element, button);

    case pb.rpt.accounts.register.p.summary:
      return load_register_summary(element, button);

    case pb.rpt.accounts.register.p.charts:
      return load_register_charts(element, button);
  }
}

const get = function (event) {
  switch (event.type) {
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      alert(`eventType: ${event.type}, not GET, change nature to POST`);
      return Promise.reject('Invalid Event Type');
  }
}
const post = function (event) {
  switch (event.type) {
    case eTypes.navtab:
      return eleCheck() ? navtabsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.load:
      return eleCheck() ? loadsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');

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

export const RAR_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('RAR_Requests', 'Request Type: ' + type);
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
