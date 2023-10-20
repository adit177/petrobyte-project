// Shared variables
import {get_callEl} from "../../../base/global.js";
import {$R_form_obj} from "../../../base/render.js";
import pb from "../../../base/structure.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import {_sampleLE} from "../../../base/elements.js";
import {keys, kws} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";

let StateData;

const pageOpen = (data) => {

  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_StateData(data);
    _return &&= _process_enable_repeater();
    return _return;
  }

  const _process_save_StateData = (data) => {
    StateData = data['page_common_info'];
    return true;
  }

  const _process_enable_repeater = () => {
    // exe_plugins_on_manualCall(_sampleLE.ground, {}, kws.plugins.formRepeater);
    return true;
  }

  return _process(data.data);
}

const stacksTarget = (element, event) => {

  const _simple = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_repeater(data);
      return _return;
    }

    const _process_init_repeater = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');

      // calling the form repeater plugin.
      exe_plugins_on_manualCall(formElement, {}, kws.plugins_on_call.formRepeater);
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _nested = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_repeater(data);
      return _return;
    }

    const _process_init_repeater = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');

      // calling the form repeater plugin.
      exe_plugins_on_manualCall(formElement, {}, kws.plugins_on_call.formRepeater);
      return true;
    }

    return Promise.resolve(_process(StateData.nested));
  }

  const _advance = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_repeater(data);
      return _return;
    }

    const _process_init_repeater = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');

      // calling the form repeater plugin.
      exe_plugins_on_manualCall(formElement, {}, kws.plugins_on_call.formRepeater);
      return true;
    }

    return Promise.resolve(_process(StateData.advance));
  }

  // here all the function has been called as per the event value.
  switch (event.value) {
    case pb.sam.plugins.repeater.p.simple:
      return _simple();
    case pb.sam.plugins.repeater.p.nested:
      return _nested();
    case pb.sam.plugins.repeater.p.advance:
      return _advance();
  }
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

// actions
const actionsTarget = (element, event) => {

  const _save = () => {
    const _simple = () => {
      const _process = (data) => {
        let _return = true;
        _return &&= _p_collect_form(data);
        return _return;
      }

      const _p_collect_form = (data) => {
        // $R_form_obj.$form(data, element);
        return true;
      }

      return Promise.resolve(_process(StateData.simple));
    }

    const _nested = () => {
      const _process = (data) => {
        let _return = true;

        _return &&= _process_collect_form(data);

        return _return;
      }

      const _process_collect_form = (data) => {
        // $R_form_obj.$form(data, element);
        return true;
      }


      return Promise.resolve(_process(StateData.nested));
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

      return Promise.resolve(_process(StateData.advance));
    }

    switch (event.data) {
      case pb.sam.plugins.repeater.p.simple:
        return _simple();
      case pb.sam.plugins.repeater.p.nested:
        return _nested();
      case pb.sam.plugins.repeater.p.advance:
        return _advance();
    }
  }

  const _reset = () => {
    const _simple = () => {
      const _process = (data) => {
        let _return = true;
        _return &&= _p_collect_form(data);
        return _return;
      }

      const _p_collect_form = (data) => {
        // $R_form_obj.$form(data, element);
        return true;
      }

      return Promise.resolve(_process(StateData.simple));
    }

    const _nested = () => {
      const _process = (data) => {
        let _return = true;

        _return &&= _process_collect_form(data);

        return _return;
      }

      const _process_collect_form = (data) => {
        // $R_form_obj.$form(data, element);
        return true;
      }


      return Promise.resolve(_process(StateData.nested));
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

      return Promise.resolve(_process(StateData.advance));
    }

    switch (event.data) {
      case pb.sam.plugins.repeater.p.simple:
        return _simple();
      case pb.sam.plugins.repeater.p.nested:
        return _nested();
      case pb.sam.plugins.repeater.p.advance:
        return _advance();
    }
  }

  switch (event.value) {
    case 'save':
      return _save();

    case 'reset':
      return _reset();
  }
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

export const SPRP_Requests = (data, type) => {
  toastr.success('SPRP_Requests', 'Request Type: ' + type);
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