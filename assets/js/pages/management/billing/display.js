import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, keys, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {$R_common_obj, $R_form_obj, $R_table_obj} from "../../../base/render.js";
import {_wizardLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import PB_defined from "../../../base/defined.js";
import {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import extend from "../../../extend/extend.js";
import {getStateData} from "../../../bucket/state.js";
import {getTagData} from "../../../bucket/tags.js";


// Shared variables
let PageData, redData, formEl;
let tableEle;

let Template;

const pageOpen = (data) => {

  const _process = (data) => {
    let _return = true;

    _return &&= _process_save_pageState(data);
    _return &&= _process_render_search(data);
    _return &&= _process_template(data);
    _return &&= _process_table(data);

    return _return;
  }

  const _process_save_pageState = (data) => {
    PageData = data['page_common_info'];
    return true;
  }

  const _process_render_search = (data) => {
    console.log({...PageData, ...getStateData(['dates'])});
    extend.foreign.$_remote(
      exT.foreign.combine,
      {...PageData, ...getStateData(['dates'])},
      [
        ['invoices', 'dates', 2, 0]
      ]
    )

    $R_form_obj.$global(PageData, _wizardLE.search, rdR.form.method.selectOnly);
    return true;
  }

  const _process_template = (data) => {
    Template = _wizardLE.template;
    return true;
  }

  // process the table
  const _process_table = (data) => {
    tableEle = _wizardLE.result.querySelector('table');

    // if no data found, then show no data found message.
    if (!data) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.append(redData);
      return true;
    }

    extend.foreign.$_remote(
      exT.foreign.combine,
      {...data, ...getStateData(['dates', 'customers']), ...getTagData(['credit_bill_status'])},
      [
        ['latest_bills', 'dates', 'bill_date', '0'],
        ['latest_bills', 'dates', 'start_date', '0'],
        ['latest_bills', 'dates', 'end_date', '0'],
        ['latest_bills', 'customers', 'customer_id', '1'],
        ['latest_bills', 'credit_bill_status', 'status', '0'],
      ]
    );
    // rendering data into table using above profile.
    PB_defined.$_append_table_simple(tableEle, data.latest_bills, pb.mng.billing.display.t.list);

    return true;
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

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

const actionsTarget = function (element, event) {
  console.log(element, event);

  const action_result_table = (element, event) => {

    const _process = (data) => {
      console.log(data)
      let _return = true;
      _return &&= _process_table(data.data);
      return _return;
    }

    const _process_table = (data) => {
      // getting the table
      let tableEle = _wizardLE.result.querySelector('table');
      // remove the table body
      tableEle.querySelector('tbody') !== null ? element.querySelector('tbody').remove() : justPass();

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.append(redData);
        return true;
      }

      //foreign match of the data
      // render the response data (if required)
      extend.foreign.$_remote(
        exT.foreign.combine,
        {...data, ...getStateData(['dates', 'customers']), ...getTagData(['credit_bill_status'])},
        [
          ['filtered_bills', 'dates', 'bill_date', '0'],
          ['filtered_bills', 'dates', 'start_date', '0'],
          ['filtered_bills', 'dates', 'end_date', '0'],
          ['filtered_bills', 'customers', 'customer_id', '1'],
          ['filtered_bills', 'credit_bill_status', 'status', '0'],
        ]
      );
      // rendering data into table using above profile.
      console.log(data);

      PB_defined.$_append_table_simple(tableEle, data['filtered_bills'], pb.mng.billing.display.t.list);
      return true;
    }

    // collect form data
    let formEle = _wizardLE.search.querySelector('form');
    let formData = extend.collect.$_form_simple(formEle);
    // call ajax
    return call_AJAX_POST({
      act : event.value,
      type: event.type,
    }, formData, _process);
  }


  switch (event.value) {
    case pb.mng.billing.display.p.result:
      return action_result_table(element, event);

    default:
      return eventNotFound(event);
  }
}

const viewsTarget = function (element, event) {
  const bill_views = () => {
    return Promise.resolve(true);
    const _process = (data) => {
      data = data.data;
      let _return = true;

      _return &&= _process_header(data);
      _return &&= _process_customer(data);
      _return &&= _process_invoice(data);
      _return &&= _process_detail_invoice(data);
      _return &&= _process_summary(data);
      _return &&= _process_final(data);

      return _return;
    }

    const _process_header = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "header"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "header"));

      // load the data into the header.
      template.innerHTML = extend.append.$_single_on_innerHTML(template, data.header);
      $R_common_obj.$_call(template);
      targetEle.append(template);


      return true;
    }
    const _process_customer = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "customer"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "customer"));
      template.innerHTML = extend.append.$_single_on_innerHTML(template, data.customer);
      $R_common_obj.$_call(template);
      targetEle.append(template);
      return true;
    }
    const _process_invoice = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "invoice"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "invoice"));
      template.innerHTML = extend.append.$_single_on_innerHTML(template, data.invoice);
      $R_common_obj.$_call(template);
      targetEle.append(template);
      return true;
    }
    const _process_detail_invoice = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "detail_invoice"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "detail_invoice"));
      tableEle = template.querySelector('table');

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      //foreign match of the data
      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.individual, [data.detail_invoice.body, data.dates], [[1, 0]]);
      extend.foreign.$_remote(exT.foreign.individual, [data.detail_invoice.body, data.products], [[2, 0]]);
      PB_defined.$_append_table_simple(tableEle, data.detail_invoice.body, pb.mng.billing.display.t.detail_invoice);
      // rendering data into table using above profile.
      //dataTablesInit(event.value);
      $R_common_obj.$_call(template);
      //filterEvents(event.value);
      targetEle.append(template);

      return true;
    }
    const _process_summary = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "summary"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "summary"));
      tableEle = template.querySelector('table');

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      //foreign match of the data
      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.combine, data, [['summary', 'products', 1, 0]]);
      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(tableEle, data.summary, pb.mng.billing.display.t.summary);


      targetEle.append(template);
      $R_common_obj.$_call(targetEle);

      return true;
    }

    const _process_final = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "final"));
      let template = _wizardLE.template.querySelector(querySA(atr.core.template, "final"));
      template.innerHTML = extend.append.$_single_on_innerHTML(template, data.final);

      targetEle.append(template);
      $R_common_obj.$_call(targetEle);
      return true;
    }


    // other things, not connected to dynamic data.

    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      id  : event.data
    }, _process)
  }

  const customer_view = () => {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_aa(data.data);
      _return &&= _process_bb(data.data);
      return _return;
    }
    const _process_aa = (data) => {
      // aa
      return true;
    }
    const _process_bb = (data) => {
      // bb
      return true;
    }


    return call_AJAX_GET({
      act : event.value,
      type: event.type,
      id  : event.data
    }, _process);
  }

  switch (event.value) {

    case pb.mng.billing.display.p.customer:
      return customer_view(element, event);

    case pb.mng.billing.display.p.bill:
      return bill_views(element, event);

    default:
      return eventNotFound(event);
  }
}

function tablesTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

// Public methods


// loading form

const get = function (event) {
  switch (event.type) {
    case eTypes.view:
      return eleCheck() ? viewsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
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
      return eleCheck() ? actionsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');

    default:
      return Promise.reject('Invalid Event Type');
  }
}

const option = function (event) {
  switch (event.type) {
    case eTypes.alter:
      return eleCheck() ? alterTarget(get_callEl(), event) : false;

    default:
      return Promise.reject('Invalid Event Type');
  }
}

export const MBD_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MBD_Requests', 'Request Type: ' + type);
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
