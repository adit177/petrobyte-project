// Shared variables
import {get_callEl} from "../../../base/global.js";
import {$R_form_obj} from "../../../base/render.js";
import pb from "../../../base/structure.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import {_sampleLE} from "../../../base/elements.js";
import {keys, kws} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";

let PageData;

const pageOpen = (data) => {
  console.log(data);

  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_StateData(data);
    _return &&= _process_b();
    return _return;
  }

  const _process_save_StateData = (data) => {
    PageData = data['page_common_info'];
    return true;
  }

  const _process_b = () => {
    // exe_plugins_on_manualCall(_sampleLE.ground, {}, kws.plugins_on_call.datePicker);
    return true;
  }

  return _process(data.data);
}

const stacksTarget = (element, event) => {

  const _simple = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_render_into_form(data);
      return _return;
    }

    const _process_render_into_form = (data) => {
      exe_plugins_on_manualCall(element, {}, kws.plugins_on_call.datePicker);
      return true;
    }

    return Promise.resolve(_process(PageData.simple));
  }

  const _advance = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      // $R_form_obj.$form(data, element);
      return true;
    }

    return Promise.resolve(_process(PageData.accounts));
  }

  const _enable = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      exe_plugins_on_manualCall(element, {}, kws.plugins_on_call.formCombo);
      return true;
    }

    return Promise.resolve(_process(PageData.person));
  }

  const _disable = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      // $R_form_obj.$form(data, element);
      return true;
    }

    return Promise.resolve(_process(PageData.custom));
  }

  switch (event.value) {
    case pb.sam.plugins.dates.p.simple:
      return _simple();
    case pb.sam.plugins.dates.p.advance:
      return _advance();
    case pb.sam.plugins.dates.p.enable:
      return _enable();
    case pb.sam.plugins.dates.p.disable:
      return _disable();
  }

  // use auto call inf required.

  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}


// fetching all upcoming required details
const actionsTarget = (element, event) => {
  return Promise.resolve(true);
}
const loadsTarget = (element, event) => {
  return Promise.resolve(true);
}
const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Plugin');
  return Promise.resolve(true);
}


const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Plugin');
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

    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : false;

    case eTypes.load:
      return eleCheck() ? loadsTarget(get_callEl(), event) : false;

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

export const SPD_Requests = (data, type) => {
  toastr.success('SPD_Requests', 'Request Type: ' + type);
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