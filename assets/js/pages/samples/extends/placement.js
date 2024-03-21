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
    StateData = data;
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
      // _return &&= _process_state_change();
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
    case pb.sam.extends.placement.p.page:
      return _page();
    case pb.sam.extends.placement.p.basic:
      return _basic();
    case pb.sam.extends.placement.p.standard:
      return _standard();
    case pb.sam.extends.placement.p.plugin:
      return _plugin();
    case pb.sam.extends.placement.p.simple:
      return _simple();
    case pb.sam.extends.placement.p.nested:
      return _nested();
    case pb.sam.extends.placement.p.advance:
      return _advance();
    case pb.sam.extends.placement.p.table:
      return _table();
  }
}

const viewsTarget = (element, event) => {

  function displayJSON(data) {
    const jsonElement = _sampleLE.zone_a.querySelector('#response_data');
    jsonElement.textContent = JSON.stringify(data, null, 2);
  }

  const _page = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_placement(data);
      return _return;
    }

    const _process_placement = (data) => {
      // get the form element.
      const formEle = element.querySelector('form');
      extend.placement.$_form(data, formEle);
      return true;
    }

    return Promise.resolve(_process(StateData.page));
  }

  const _basic = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_placement(data);
      return _return;
    }

    const _process_placement = (data) => {
      const formEle = element.querySelector('form');
      extend.placement.$_form(data, formEle);
      return true;
    }

    return Promise.resolve(_process(StateData.basic));
  }

  const _standard = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_placement(data);
      return _return;
    }

    const _process_placement = (data) => {
      const formEle = element.querySelector('form');
      extend.placement.$_form(data, formEle);
      return true;
    }

    return Promise.resolve(_process(StateData.standard));
  }

  const _plugin = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_placement(data);
      return _return;
    }

    const _process_placement = (data) => {
      const formEle = element.querySelector('form');
      extend.placement.$_form(data, formEle);
      return true;
    }

    return Promise.resolve(_process(StateData.plugin));
  }

  const _simple = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_placement(data);
      return _return;
    }

    const _process_placement = (data) => {
      const formEle = element.querySelector('form');

      extend.placement.$_repeater(data, formEle);


      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _nested = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_placement(data);
      return _return;
    }

    const _process_placement = (data) => {
      const formEle = element.querySelector('form');
      extend.placement.$_form(data, formEle);
      return true;
    }

    return Promise.resolve(_process(StateData.nested));
  }

  const _advance = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_placement(data);
      return _return;
    }

    const _process_placement = (data) => {
      const formEle = element.querySelector('form');
      extend.placement.$_form(data, formEle);
      return true;
    }

    return Promise.resolve(_process(StateData.advance));
  }

  const _table = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_placement(data);
      return _return;
    }

    const _process_placement = (data) => {
      const formEle = element.querySelector('form');
      extend.placement.$_form(data, formEle);
      return true;
    }

    return Promise.resolve(_process(StateData.advance));
  }

  // here all the function has been called as per the event value.
  switch (event.value) {
    case pb.sam.extends.placement.p.page:
      return _page();
    case pb.sam.extends.placement.p.basic:
      return _basic();
    case pb.sam.extends.placement.p.standard:
      return _standard();
    case pb.sam.extends.placement.p.plugin:
      return _plugin();
    case pb.sam.extends.placement.p.simple:
      return _simple();
    case pb.sam.extends.placement.p.nested:
      return _nested();
    case pb.sam.extends.placement.p.advance:
      return _advance();
    case pb.sam.extends.placement.p.table:
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
      case pb.sam.extends.placement.p.page:
        return _page();
      case pb.sam.extends.placement.p.basic:
        return _basic();
      case pb.sam.extends.placement.p.standard:
        return _standard();
      case pb.sam.extends.placement.p.plugin:
        return _plugin();
      case pb.sam.extends.placement.p.simple:
        return _simple();
      case pb.sam.extends.placement.p.nested:
        return _nested();
      case pb.sam.extends.placement.p.advance:
        return _advance();
      case pb.sam.extends.placement.p.table:
        return _table();
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
        const formEle = element.querySelector('form');
        extend.reset.$_simple_form(formEle);
        return true;
      }

      return Promise.resolve(_process({data: []}));
    }

    const _basic = () => {
      const _process = (data) => {
        let _return = true;
        _return &&= _p_collect_form(data);
        return _return;
      }

      const _p_collect_form = (data) => {
        const formEle = element.querySelector('form');
        extend.reset.$_simple_form(formEle);
        return true;
      }

      return Promise.resolve(_process({data: []}));
    }

    const _standard = () => {
      const _process = (data) => {
        let _return = true;
        _return &&= _p_collect_form(data);
        return _return;
      }

      const _p_collect_form = (data) => {
        const formEle = element.querySelector('form');
        extend.reset.$_simple_form(formEle);
        return true;
      }

      return Promise.resolve(_process({data: []}));
    }

    const _plugin = () => {
      const _process = (data) => {
        let _return = true;
        _return &&= _p_collect_form(data);
        return _return;
      }

      const _p_collect_form = (data) => {

        const formEle = element.querySelector('form');
        extend.reset.$_simple_form(formEle);

        return true;
      }

      return Promise.resolve(_process({data: []}));
    }

    const _simple = () => {
      const _process = (data) => {
        let _return = true;
        _return &&= _p_collect_form(data);
        return _return;
      }

      const _p_collect_form = (data) => {

        const formEle = element.querySelector('form');
        // reest repeater
        extend.reset.$_repeater_form(formEle.id, formEle.dataset.formSno);
        // reset remaining part
        extend.reset.$_external_form(formEle);

        return true;
      }

      return Promise.resolve(_process({data: []}));
    }

    const _nested = () => {
      const _process = (data) => {
        let _return = true;
        _return &&= _process_collect_form(data);
        return _return;
      }

      const _process_collect_form = (data) => {

        const formEle = element.querySelector('form');
        // reest repeater
        extend.reset.$_repeater_form(formEle.id, formEle.dataset.formSno);
        // reset remaining part
        extend.reset.$_external_form(formEle);

        return true;
      }

      return Promise.resolve(_process({date: []}));
    }

    const _advance = () => {
      const _process = (data) => {
        let _return = true;
        _return &&= _process_render_into_form(data);
        return _return;
      }

      const _process_render_into_form = (data) => {

        const formEle = element.querySelector('form');
        // reest repeater
        extend.reset.$_repeater_form(formEle.id, formEle.dataset.formSno);
        // reset remaining part
        extend.reset.$_external_form(formEle);

        return true;
      }

      return Promise.resolve(_process({date: []}));
    }

    const _table = () => {
      const _process = (data) => {
        let _return = true;
        _return &&= _process_render_into_form(data);
        return _return;
      }

      const _process_render_into_form = (data) => {
        const formEle = element.querySelector('form');
        extend.reset.$_simple_form(formEle);
        return true;
      }

      return Promise.resolve(_process({date: []}));
    }

    switch (event.data) {
      case pb.sam.plugins.validation.p.page:
        return _page();
      case pb.sam.plugins.validation.p.basic:
        return _basic();
      case pb.sam.plugins.validation.p.standard:
        return _standard();
      case pb.sam.plugins.validation.p.plugin:
        return _plugin();
      case pb.sam.plugins.validation.p.simple:
        return _simple();
      case pb.sam.plugins.validation.p.nested:
        return _nested();
      case pb.sam.plugins.validation.p.advance:
        return _advance();
      case pb.sam.plugins.validation.p.table:
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
    case eTypes.view:
      return eleCheck() ? viewsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}

export const SEP_Requests = (data, type) => {
  toastr.success('SEP_Requests', 'Request Type: ' + type);
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