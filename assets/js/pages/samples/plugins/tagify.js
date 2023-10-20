import {get_callEl} from "../../../base/global.js";
import {$R_form_obj} from "../../../base/render.js";
import pb from "../../../base/structure.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import {_sampleLE} from "../../../base/elements.js";
import {keys, kws, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import tagifyInput from "../../../plugins/tagifyInput.js";

let StatePage;

const pageOpen = (data) => {

  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_PageData(data);
    _return &&= _process_b();
    return _return;
  }

  const _process_save_PageData = (data) => {
    StatePage = data['page_common_info'];
    return true;
  }

  const _process_b = () => {
    // exe_plugins_on_manualCall(_sampleLE.ground, {}, kws.plugins.tagifyInput);
    return true;
  }

  return _process(data.data);
}

const stacksTarget = (element, event) => {

  const _tag = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_render_into_form(data);
      return _return;
    }

    const _process_render_into_form = (data) => {
      $R_form_obj.$global(data, element, rdR.form.method.tagifyOnly);
      return true;
    }

    return Promise.resolve(_process(StatePage.tag));
  }

  const _select = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      return $R_form_obj.$global(data, element, rdR.form.method.tagifyOnly);
    }

    return Promise.resolve(_process(StatePage.select));
  }

  const _inout = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      // $R_form_obj.$form(data, element);
      return true;
    }

    return Promise.resolve(_process(StatePage.person));
  }

  const _outin = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      // $R_form_obj.$form(data, element);
      return true;
    }

    return Promise.resolve(_process(StatePage.custom));
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

    return Promise.resolve(_process(StatePage.custom));
  }

  switch (event.value) {
    case pb.sam.plugins.tagify.p.tag:
      return _tag();
    case pb.sam.plugins.tagify.p.select:
      return _select();
    case pb.sam.plugins.tagify.p.inout:
      return _inout();
    case pb.sam.plugins.tagify.p.outin:
      return _outin();
    case pb.sam.plugins.tagify.p.advance:
      return _advance();
  }

  // use auto call inf required.

  return true;
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

export const SPT_Requests = (data, type) => {
  toastr.success('SPT_Requests', 'Request Type: ' + type);
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