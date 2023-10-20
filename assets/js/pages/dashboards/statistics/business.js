import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {CLS, exT, keys, Lyt, rdR} from "../../../base/const.js";
import {_directLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {$R_common_obj} from "../../../base/render.js";
import Arranging from "../../../base/arranges.js";
import extend from "../../../extend/extend.js";
import {eTypes} from "../../../base/events.js";
import PB_defined from "../../../base/defined.js";
import {call_AJAX_GET} from "../../../base/ajax.js";
import Deploying from "../../../base/deploying.js";


// Shared variables
let StateData;
let xData;
let Direct;

/**
 * this will be used for show page's base-0 data.
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
    _return &&= _process_save_data(data);
    _return &&= _process_header(data);
    _return &&= _process_performance_summary(data);
    return _return;
  }

  const _process_save_data = (data) => {
    StateData = data['page_common_info'];
    return true;
  }

  const _process_header = (data) => {

    const key = 'header';

    // calculate percentage value
    let percent = $R_common_obj.$_return(StateData.header.amount, rdR.common.methods.percent, [StateData.header.target]);
    StateData.header['percent'] = percent[0];
    // calling template render
    PB_defined.$_append_templates(_directLE.visits.querySelector(querySA(atr.core.control, key)), data['page_common_info'][key]);
    return true;
  }

  const _process_performance_summary = (data) => {

    const data_1 = data['performance_summary'];

    // setting up the-nav bars.
    PB_defined.$_append_templates(_directLE.navbar, data_1, exT.append.method.loop);

    // setting the navtab body
    const place = _directLE.navtab.querySelector(querySA(atr.core.append));
    const keys = place.getAttribute(atr.core.append);

    // create event for navtab ajax call.
    const node = data_1['node'];
    let event = {
      type : eTypes.navtab,
      value: pb.dsb.statistics.business.p.summary,
      data : node
    };

    // let cloneNode = node.cloneNode(true);
    Object.keys(data_1.dates).forEach((key) => {
      let div = document.createElement('div');
      div.setAttribute(atr.core.value, data_1.dates[key].id);
      div.setAttribute(atr.core.append, keys);
      div.classList.add('d-none');
      // div.setAttribute('id', `${event.type}_${event.value}_${event.data}`);
      place.appendChild(div);
    });
    place.removeAttribute(atr.core.append);

    // calling new ajax to get navtab data.

    const trigger = _directLE.navbar.querySelector(`button[name="${eTypes.navtab}"][value="${pb.dsb.statistics.business.p.summary}"][data-e-value="${node}"]`);
    console.log(trigger);
    navtabsTarget(_directLE.navtab, event)
      .then((result) => {
        trigger.classList.add(CLS.display.active);
        Deploying.NewEvents(Lyt.direct, _directLE.navtab);
        Arranging._directs(event, trigger);
      });

    return true;
  }

  // AJAX Calling
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

const navtabsTarget = (element, event, onPageLoad = false) => {

  const summary_navtab = (_element, _event, _onPageLoad) => {

    const targetEle = _element.querySelector(querySA(atr.core.value, event.data));
    // return if already loaded.
    if (targetEle.getAttribute(atr.load.tab) === "1") return Promise.resolve(true);

    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data.data);
      return _return;
    }
    const _process_a = (data) => {
      // finding template
      PB_defined.$_append_templates(targetEle, data, exT.append.method.single);
      // update the tab status.
      targetEle.setAttribute(atr.load.tab, "1");
      return true;
    }

    if (_onPageLoad) {
      _process(xData);
      return true;
    }
    else {
      return call_AJAX_GET({
        act : _event.value,
        type: _event.type,
        id  : _event.data
      }, _process);
    }
  }

  switch (event.value) {
    case pb.dsb.statistics.business.p.summary:
      return summary_navtab(element, event, onPageLoad);
  }


}


// Public methods

const get = function (event) {
  switch (event.type) {
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.switch:
      return eleCheck() ? switchsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    // useMe
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
    case eTypes.navtab:
      return eleCheck() ? navtabsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}

export const DSB_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('DSB_Requests', 'Request Type: ' + type);
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


