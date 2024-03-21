// Shared variables
import {get_callEl} from "../../../base/global.js";
import {$R_form_obj} from "../../../base/render.js";
import pb from "../../../base/structure.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import {_sampleLE} from "../../../base/elements.js";
import {keys, kws} from "../../../base/const.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import {eTypes} from "../../../base/events.js";

let StateData;

const pageOpen = (data) => {

  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_StateData(data);
    _return &&= _process_b();
    return _return;
  }

  const _process_save_StateData = (data) => {
    StateData = data['page_common_info'];
    return true;
  }

  const _process_b = () => {
    exe_plugins_on_manualCall(_sampleLE.ground, {}, kws.plugins_on_call.datePicker);
    return true;
  }

  return _process(data.data);
}

const stacksTarget = (element, event) => {

  const _alert = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_alert(data);
      return _return;
    }

    const _process_alert = (data) => {

      switch (event.data) {
        case '1':
          plg_sweetAlert.$_alert(
            ['Heading', 'this is text', 'this is footer'],
            {
              confirm: [true, 'Welcome', 'btn btn-light-primary rounded'],
            },
            [2, 5],
          );
          break;
        case '2':
          plg_sweetAlert.$_alert(
            ['Invalid Account', 'Please check your account details'],
            {
              confirm: [true, 'Okay!', 'btn btn-light-warning rounded'],
            },
            [3, 5],
          );
          break;
        case '3':
          plg_sweetAlert.$_alert(
            ['Meter Reading Received', 'Rajesh updated reading for Nozzle-31'],
            {
              deny: [true, 'Close', 'btn btn-light-info rounded'],
            },
            [1, 9],
          );
          break;
        case '4':
          alert('aayega-4');
          break;
        case '5':
          alert('aayega-5');
          break;
      }

      return true;
    }


    return _process(StateData.alert);
  }

  const _minimal = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      // $R_form_obj.$form(data, element);
      return true;
    }

    _process(StateData.accounts);
  }

  const _autoclose = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      // $R_form_obj.$form(data, element);
      return true;
    }

    _process(StateData.person);
  }

  const _toast = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_render_into_form(data);

      return _return;
    }

    const _process_render_into_form = (data) => {
      // $R_form_obj.$form(data, element);
      return true;
    }

    _process(StateData.custom);
  }

  const _confirm = () => {
    const _process = (data) => {
      let _return = true;

      _return &&= _process_alert(data);

      return _return;
    }

    // defined this way to be able to call it from outside.
    let swal_cb_on_confirm;
    let something_on_cancel;

    something_on_cancel = () => {
      console.log('something on cancel');
    }

    swal_cb_on_confirm = () => {
      plg_sweetAlert.$_alert(
        ['Thank You'],
        {
          confirm: [true, 'Welcome', 'btn btn-light-primary rounded'],
        },
        [2],
      );
    }

    const _process_alert = (data) => {

      switch (event.data) {
        case '1':
          plg_sweetAlert.$_confirm(
            ['this is the customer title', 'text', 'footer'],
            {
              confirm: [true, 'Okay, PetroByte', 'btn btn-primary rounded'],
              cancel : [false, 'Cancel', 'btn btn-secondary rounded'],
            },
            [4, 5],
            {
              confirm: swal_cb_on_confirm,
              cancel : something_on_cancel,
            }
          );
          break;
        case '2':
          plg_sweetAlert.$_alert(
            ['Invalid Account', 'Please check your account details'],
            {
              confirm: [true, 'Okay!', 'btn btn-light-warning rounded'],
            },
            [3, 5],
          );
          break;
        case '3':
          plg_sweetAlert.$_confirm(
            ['New Order Received', 'DPS school has placed a new order'],
            {
              confirm: [true, 'View Order', 'btn btn-light-success rounded'],
              cancel : [true, 'Ignore', 'btn btn-light-warning rounded'],
            },
            [1, 3],
            {
              resolve,
              reject,
            }
          );
          break;
        case '4':
          alert('aayega-4');
          break;
        case '5':
          alert('aayega-5');
          break;
      }

      return true;
    }

    _process(StateData.custom);
  }

  switch (event.value) {
    case pb.sam.plugins.alert.p.alert:
      return _alert();
    case pb.sam.plugins.alert.p.minimal:
      return _minimal();
    case pb.sam.plugins.alert.p.autoclose:
      return _autoclose();
    case pb.sam.plugins.alert.p.toast:
      return _toast();
    case pb.sam.plugins.alert.p.confirm:
      return _confirm();
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

export const SPA_Requests = (data, type) => {
  toastr.success('SPA_Requests', 'Request Type: ' + type);
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