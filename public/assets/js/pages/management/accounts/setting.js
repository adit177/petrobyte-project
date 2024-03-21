import PB_defined from "../../../base/defined.js";
import {$R_form_obj} from "../../../base/render.js";
import {deF, keys, rdR} from "../../../base/const.js";
import {eTypes, eValues} from "../../../base/events.js";
import {get_action, get_callEl, get_LN} from "../../../base/global.js";
import {atr} from "../../../base/attributes.js";
import pb from "../../../base/structure.js";
import {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {_buttonLE} from "../../../base/elements.js";
import state from "../../../base/state.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import extend from "../../../extend/extend.js";


/**
 * this will be used for show page's base-0 data.
 */
let StateData;
let formEle;
const pageOpen = (poData) => {

  // process.
  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_page_state(data);
    //    _return &&= _process_menu_render(data);

    return _return ? Promise.resolve(true) : Promise.reject('process failed.');
  }
  const _process_save_page_state = (data) => {
    StateData = data['page_common_info'];
    return true;
  }
  //  const _process_menu_render = (data) => {
  //    // calling render to place data into menu.
  //    return $R_menu_obj.$_left(data.menu, rdR.menu.type.value);
  //  }


  return _process(poData.data);
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Banking');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Banking');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return PB_defined.$_open_menu(element, event);
}

//const form
function formsTarget(element, event) {
  console.log(element);
  formEle = element.querySelector('form');
  console.log(formEle);

  const load_default_form = () => {
    console.log(event, element);
    const _process = (data) => {
      data = data.data;
      console.log(data)
      let _return = true;
      _return &&= _process_a(data);
      return _return;

    }
    const _process_placement = (data) => {
      data = data.data;
      console.log(data)
      extend.placement.$_form(data, formEle);
      return true;
    }
    const _process_a = (data) => {
      console.log(formEle);
      $R_form_obj.$global({...data}, formEle, rdR.form.method.advance);
      return call_AJAX_GET({
        act : pb.mng.accounts.setting.n,
        type: event.type
      }, _process_placement)

    }
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)
  }
  const load_balance_form = () => {
    console.log(element, event);
    console.log(StateData);
    $R_form_obj.$form(StateData, formEle)

    return Promise.resolve('true');
  }
  const load_update_form = () => {
    console.log(element, event);
    const _process = (data) => {
      data = data.data;
      console.log(data)
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }
    const _process_a = (data) => {
      let multipleForms = element.querySelectorAll('form');
      multipleForms.forEach((form) => {
        $R_form_obj.$global({...data}, form, rdR.form.method.advance);
      })
      return true;
    }
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }
  switch (event.value) {
    case pb.mng.accounts.setting.p.default:
      return load_default_form();
    case pb.mng.accounts.setting.p.balance:
      return load_balance_form();
    case pb.mng.accounts.setting.p.update:
      return load_update_form();
  }
}

function actionsTarget(element, event) {
  const action_save = () => {
    console.log(element, event);
    if (event.place === 'updateInfo-form') {
      formEle = get_action().closest('.update').querySelector('form');
    }
    else {
      formEle = element.querySelector('form');
    }
    const _process = (data) => {
      let _return = true;
      _return &&= _process_save_return(data);
      //      _return &&= _process_form_old_data_reset(data);

      // useMe
      return _return;
    }

    const _process_save_return = (data) => {

      plg_sweetAlert.$_alert(['Saved', 'Data has been saved successfully.'],
        {
          confirm: [false, '', 'btn btn-light-primary rounded'],
        },
        [2, 5, 1500],)
      return true;
    }

    //    const _process_form_old_data_reset = (data) => {
    //      console.log(formEle.id, formEle.getAttribute(atr.form.sno))
    //      extend.reset.$_form(formEle)
    //      return true;
    //    }


    const ___success = () => {
      let formData = extend.collect.$_form(formEle)
      return call_AJAX_POST({
        act : event.data,
        type: event.type
      }, formData, _process)
    }

    const __reject = () => {
      return false;
    }

    const param = {
      form_sno: formEle.getAttribute(atr.form.sno),
      method  : deF.form_promise.method.inbuild,
    };
    return PB_defined.$_form_validation(___success, __reject, param, deF.methods.promise.form);
  }
  const action_reset = () => {
    formEle = element.querySelector('form');
    console.log(formEle)
    console.log(formEle.id, formEle.getAttribute(atr.form.sno))
    extend.reset.$_simple_form(formEle)
    return Promise.resolve(true);
  }
  switch (event.value) {
    case eValues.action.buttons.save:
      return action_save();
    case eValues.action.buttons.reset:
      return action_reset();
    default:
      eventNotFound(event);
      return false;
  }


}

function changesTarget(element, event) {
  console.log(element, event);
  const customer_info = () => {
    const _process = (data) => {
      data = data.data;
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }
    const _process_a = (data) => {
      console.log(data)
      $R_form_obj.$global({...data}, element, rdR.form.method.advance);
      return true;
    }
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)
  }
  const update_prev_balance = () => {
    const _process = (data) => {
      data = data.data;
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }
    const _process_a = (data) => {
      console.log(data)
      let prev_balance = get_action().closest('.fv-row').querySelector('#previous_balance')
      prev_balance.value = data.previous_balance;
      return true;
    }
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)
  }

  switch (event.value) {
    case "customer_selected":
      return update_prev_balance();
    case "head_selected":
      return customer_info();
  }
}

const get = function (event) {
  console.log(event.type);
  switch (event.type) {
    case eTypes.form:
      return eleCheck() ? formsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
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
    case eTypes.change:
      return eleCheck() ? changesTarget(get_callEl(), event) : false;
    default:
      return Promise.reject('Invalid Event Type');
  }
}


export const MAS_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MAC_Requests', 'Request Type: ' + type);
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
