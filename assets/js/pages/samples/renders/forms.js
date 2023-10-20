import extend from "../../../extend/extend.js";
import {exT, keys, kws, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {_sampleLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {_k} from "../../../base/keys.js";
import {$R_form_obj} from "../../../base/render.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";

// Shared variables
let PageData;

// Private functions

/**
 * preloaded data that will be same for this page
 */
const pageOpen = (data) => {

  const _process = (data) => {
    // calling all process functions.
    data = data.data;
    let _return = true;
    _return &&= _process_save_page_state(data);
    return _return;
  }
  const _process_save_page_state = (data) => {
    // saving page state data.
    PageData = data[_k.page_common_info];

    /*
     const asdf = _sampleLE.ground.querySelector('#select');
     exe_plugins_on_manualCall(asdf, {}, kws.plugins_on_call.formCombo);
     */

    return true;
  }

  return _process(data);
}

const stacksTarget = (element, event) => {

  const _select = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      const formEle = element.querySelector('form');
      $R_form_obj.$global(data, formEle, rdR.form.method.selectOnly);
      return true;
    }

    return Promise.resolve(_process(PageData.select));
  }
  const _tagify = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {

      console.log('data', data);
      // get template element.
      const formEle = element.querySelector('form');
      $R_form_obj.$global(data, formEle, rdR.form.method.tagifyOnly);
      return true;
    }

    return Promise.resolve(_process(PageData.tagify));
  }
  const _range = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      const key = 'single_string';
      const template = _sampleLE.templates.querySelector(querySA(atr.core.template, key));
      element.querySelector(querySA(atr.core.append, key)).innerHTML = extend.append.$_single_on_innerHTML(template, data);
      return true;
    }

    return Promise.resolve(_process(PageData.single_string));
  }

  // here all the function has been called as per the event value.
  switch (event.value) {
    case pb.sam.renders.forms.p.select:
      return _select();
    case pb.sam.renders.forms.p.tagify:
      return _tagify();
    case pb.sam.renders.forms.p.range:
      return _range();
  }
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Forms');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Forms');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
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

    default:
      return Promise.reject('Invalid Event Type');
  }
}

const option = function (event) {
  switch (event.type) {
    case eTypes.stack:
      return eleCheck() ? stacksTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}

export const SRF_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('SRF_Requests', 'Request Type: ' + type);
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

