import extend from "../../../extend/extend.js";
import {_sampleLE} from "../../../base/elements.js";
import {exT, keys, kws} from "../../../base/const.js";
import {get_callEl} from "../../../base/global.js";
import {eTypes} from "../../../base/events.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import pb from "../../../base/structure.js";

// Shared variables
let StateData;


// Private functions
const pageOpen = (data) => {

  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_StateData(data);
    _return &&= _process_enabling();
    return _return;
  }

  const _process_save_StateData = (data) => {
    StateData = data['page_common_info'];
    return true;
  }

  const _process_enabling = () => {

    // enable all the inputs plugin
    exe_plugins_on_manualCall(_sampleLE.ground, {}, kws.plugin.combo);

    // enable repeater by default.
    exe_plugins_on_manualCall(_sampleLE.ground, {}, kws.plugins_on_call.formRepeater);

    // enable combo by default.
    exe_plugins_on_manualCall(_sampleLE.ground, {}, kws.plugins_on_call.formCombo);

    return true;
  }

  return _process(data.data);
}
const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Plugin');
  return Promise.resolve(true);
}
const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Plugin');
  return Promise.resolve(true);
}

const stacksTarget = (element, event) => {

  function displayJSON(data) {
    const jsonElement = _sampleLE.zone_a.querySelector('#response_data');
    jsonElement.textContent = JSON.stringify(data, null, 2);
  }

  const _page = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      return _return;
    }

    const _process_collect = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      const formData = extend.collect.$_form_simple(formElement);
      displayJSON(formData);
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _basic = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_form(data);
      _return &&= _process_state_change();
      return _return;
    }

    const _process_init_form = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      const formData = extend.collect.$_form_simple(formElement);
      displayJSON(formData);
      return true;
    }

    const _process_state_change = () => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      extend.collect.$_form_state(formElement, exT.collect.states.read);
      alert('state changed to read-only');
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _standard = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      return _return;
    }

    const _process_collect = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      const formData = extend.collect.$_form_simple(formElement);
      displayJSON(formData);
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _plugin = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      _return &&= _process_state_change();
      return _return;
    }

    const _process_collect = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      const formData = extend.collect.$_form_simple(formElement);
      displayJSON(formData);
      return true;
    }
    const _process_state_change = () => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      extend.collect.$_form_state(formElement, exT.collect.states.read);
      alert('state changed to read-only');
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _simple = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      return _return;
    }

    const _process_collect = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      const formData = extend.collect.$_form_repeater(formElement);
      displayJSON(formData);
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _nested = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      return _return;
    }

    const _process_collect = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      const formData = extend.collect.$_form_repeater(formElement);
      displayJSON(formData);
      return true;
    }

    return Promise.resolve(_process(StateData.nested));
  }

  const _advance = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      _return &&= _process_state_change();
      return _return;
    }

    const _process_collect = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      const formData = extend.collect.$_form_repeater(formElement);
      displayJSON(formData);
      return true;
    }
    const _process_state_change = () => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      extend.collect.$_form_state(formElement, exT.collect.states.read);
      alert('state changed to read-only');
      return true;
    }

    return Promise.resolve(_process(StateData.advance));
  }

  const _table = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_collect_table(data);
      return _return;
    }

    const _process_init_collect_table = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');
      // collect data and display.
      const formData = extend.collect.$_form_table(formElement);
      displayJSON(formData);
      return true;
    }

    return Promise.resolve(_process(StateData.advance));
  }

  // here all the function has been called as per the event value.
  switch (event.value) {
    case pb.sam.extends.collect.p.page:
      return _page();
    case pb.sam.extends.collect.p.basic:
      return _basic();
    case pb.sam.extends.collect.p.standard:
      return _standard();
    case pb.sam.extends.collect.p.plugin:
      return _plugin();
    case pb.sam.extends.collect.p.simple:
      return _simple();
    case pb.sam.extends.collect.p.nested:
      return _nested();
    case pb.sam.extends.collect.p.advance:
      return _advance();
    case pb.sam.extends.collect.p.table:
      return _table();
  }
}

const opensTarget = (element, event) => {
  // check the status.
  return Promise.resolve(true);
}

const actionsTarget = (element, event) => {

  const _save = () => {

    const _page = () => {
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

    const _basic = () => {
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

    const _standard = () => {
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

    const _plugin = () => {
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
      case pb.sam.extends.collect.p.page:
        return _page();
      case pb.sam.extends.collect.p.basic:
        return _basic();
      case pb.sam.extends.collect.p.standard:
        return _standard();
      case pb.sam.extends.collect.p.plugin:
        return _plugin();
      case pb.sam.extends.collect.p.simple:
        return _simple();
      case pb.sam.extends.collect.p.nested:
        return _nested();
      case pb.sam.extends.collect.p.advance:
        return _advance();
    }
  }

  const _reset = () => {

    const _page = () => {
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

    const _basic = () => {
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

    const _standard = () => {
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

    const _plugin = () => {
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

    const _table = () => {
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
      case pb.sam.extends.collect.p.page:
        return _page();
      case pb.sam.extends.collect.p.basic:
        return _basic();
      case pb.sam.extends.collect.p.standard:
        return _standard();
      case pb.sam.extends.collect.p.plugin:
        return _plugin();
      case pb.sam.extends.collect.p.simple:
        return _simple();
      case pb.sam.extends.collect.p.nested:
        return _nested();
      case pb.sam.extends.collect.p.advance:
        return _advance();
      case pb.sam.extends.collect.p.table:
        return _table();
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

export const SEC_Requests = (data, type) => {
  toastr.success('SEC_Requests', 'Request Type: ' + type);
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