import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import {_sampleLE} from "../../../base/elements.js";
import {deF, keys, kws} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import formValid from "../../../plugins/formValid.js";
import PB_defined from "../../../base/defined.js";
import {atr} from "../../../base/attributes.js";
import defined from "../../../base/defined.js";
import {call_AJAX_GET} from "../../../base/ajax.js";

let StateData;

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

    // enable validation by default.
    exe_plugins_on_manualCall(_sampleLE.ground, {}, kws.plugins_on_call.formRepeater);

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

  const _page = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_validation(data);
      return _return;
    }

    const _process_init_validation = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');
      // calling the form validation plugin.
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _basic = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_validation(data);
      return _return;
    }

    const _process_init_validation = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');

      // calling the form validation plugin.
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _standard = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_validation(data);
      return _return;
    }

    const _process_init_validation = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');

      // calling the form validation plugin.
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _plugin = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_validation(data);
      return _return;
    }

    const _process_init_validation = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');

      // calling the form validation plugin.
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _simple = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_validation(data);
      return _return;
    }

    const _process_init_validation = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');

      // calling the form validation plugin.
      return true;
    }

    return Promise.resolve(_process(StateData.simple));
  }

  const _nested = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_validation(data);
      return _return;
    }

    const _process_init_validation = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');

      // calling the form validation plugin.
      return true;
    }

    return Promise.resolve(_process(StateData.nested));
  }

  const _advance = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_validation(data);
      return _return;
    }

    const _process_init_validation = (data) => {
      // get the form element.
      const formElement = element.querySelector('form');
      // calling the form validation plugin.
      return true;
    }

    return Promise.resolve(_process(StateData.advance));
  }

  // here all the function has been called as per the event value.
  switch (event.value) {
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
  }
}

const opensTarget = (element, event) => {
  // check the status.
  return Promise.resolve(true);
}

const actionsTarget = (element, event) => {

  const _save = () => {
    const common_validation_function = () => {
      const _process = (data) => {
        let _return = true;
        _return &&= _p_collect_form(data);
        return _return;
      }
      const _p_collect_form = (data) => {
        console.log(data);
        alert('form submitted');
        return true;
      }

      const _success = () => {
        return call_AJAX_GET({
          act : 'page',
          type: 'open'
        }, _process, false);
      }

      const _reject = () => {
        toastr.error('form failed in validation', 'Error');
        return Promise.reject("form failed in validation");
      }
      // Promise.resolve(_process(StateData.simple));
      const formEle = element.querySelector('form');

      return defined.$_form_validation(_success, _reject, {
        form_sno: formEle.getAttribute(atr.form.sno),
        method  : deF.form_promise.method.inbuild
      });
    }

    const _page = () => {

      // NOTE: this is not the actual process, this is just a sample.

      const _process = (data) => {
        let _return = true;
        _return &&= _p_collect_form(data);
        return _return;
      }

      const _p_collect_form = (data) => {
        const formEle = element.querySelector('form');

        const _success = () => {
          console.log('form success in validation');
          return true;
        }
        const _failed = () => {
          console.log('form failed in validation');
          return true;
        }

        PB_defined.$_form_validation(_success, _failed, {
          form_sno: formEle.getAttribute(atr.form.sno),
          method  : deF.form_promise.method.inbuild
        }).then((data) => {
          console.log(data);
        }).catch((data) => {
          console.log(data);
        });
        return true;
      }

      return Promise.resolve(_process(StateData.simple));
    }

    const _basic = () => {
      return common_validation_function();
    }

    const _standard = () => {
      return common_validation_function();
    }

    const _plugin = () => {
      return common_validation_function();


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
      return common_validation_function();

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
      return common_validation_function();

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
      return common_validation_function();

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

export const SPV_Requests = (data, type) => {
  toastr.success('SPV_Requests', 'Request Type: ' + type);
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