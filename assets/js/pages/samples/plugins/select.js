// Shared variables
import {get_callEl} from "../../../base/global.js";
import {exT, keys, kws, Lyt} from "../../../base/const.js";
import pb from "../../../base/structure.js";
import {$R_form_obj} from "../../../base/render.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import {_sampleLE} from "../../../base/elements.js";
import {eTypes} from "../../../base/events.js";
import PB_extends from "../../../extend/extend.js";
import {getTagData} from "../../../bucket/tags.js";
import {getStateData} from "../../../bucket/state.js";

let PageData;

const pageOpen = (data) => {
  console.log(data);

  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_stateData(data);
    _return &&= _process_b();
    return _return;
  }

  const _process_save_stateData = (data) => {
    PageData = data['page_common_info'];
    return true;
  }

  const _process_b = () => {
    //     exe_plugins_on_manualCall(_sampleLE.ground, {}, kws.plugins_on_call.formCombo);
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
      $R_form_obj.$form(data, element);
      exe_plugins_on_manualCall(element, {}, kws.plugins_on_call.selectPicker);
      return true;
    }
    return Promise.resolve(_process(PageData.simple));
  }

  const _accounts = () => {
    const _process = (data) => {

      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      // key matching.
      const newData = PB_extends.foreign.$_remote(
        exT.foreign.combine,
        {...data, ...getStateData([keys.stateData.groups])},
        [['group', 'groups', 4, 1]]
      );
      $R_form_obj.$form(newData, element);
      exe_plugins_on_manualCall(element, {}, kws.plugins_on_call.selectPicker);
      return true;
    }

    return Promise.resolve(_process(PageData.accounts));
  }

  const _person = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      $R_form_obj.$form(data, element);
      exe_plugins_on_manualCall(element, {}, kws.plugins_on_call.selectPicker);
      return true;
    }

    return Promise.resolve(_process(PageData.person));
  }

  const _custom = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      $R_form_obj.$form(data, element);
      exe_plugins_on_manualCall(element, {}, kws.plugins_on_call.selectPicker);
      return true;
    }

    return Promise.resolve(_process(PageData.custom));
  }

  const _text = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      $R_form_obj.$form(data, element);
      exe_plugins_on_manualCall(element, {}, kws.plugins_on_call.selectPicker);
      return true;
    }

    return Promise.resolve(_process(PageData.text));
  }
  const _tag = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_render_into_form(data);
      return _return;
    }

    const _process_render_into_form = (data) => {
      $R_form_obj.$form(data, element);
      exe_plugins_on_manualCall(element, {}, kws.plugins_on_call.selectPicker);
      return true;
    }

    return Promise.resolve(_process(PageData.tag));
  }

  switch (event.value) {
    case pb.sam.plugins.select.p.simple:
      return _simple();
    case pb.sam.plugins.select.p.accounts:
      return _accounts();
    case pb.sam.plugins.select.p.person:
      return _person();
    case pb.sam.plugins.select.p.custom:
      return _custom();
    case pb.sam.plugins.select.p.text:
      return _text();
    case pb.sam.plugins.select.p.tag:
      return _tag();
  }

  // use auto call inf required.

  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

const actionsTarget = (element, event) => {
  return Promise.resolve(true);
}
const loadsTarget = (element, event) => {
  return Promise.resolve(true);
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Select plugin');
  return Promise.resolve(true);
}


const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Select plugin');
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

export const SPS_Requests = (data, type) => {
  toastr.success('SPS_Requests', 'Request Type: ' + type);
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