import {get_action, get_callEl, get_LN, get_passedEl, get_thePathArr} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {CLS, deF, exT, keys, rdR} from "../../../base/const.js";
import {$R_common_obj, $R_form_obj, $R_menu_obj, $R_table_obj} from "../../../base/render.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {atr} from "../../../base/attributes.js";
import plg_datePicker from "../../../plugins/datePicker.js";
import Option_charts from "../../../options/apexcharts.js";
import plg_apexChart from "../../../plugins/apexCharts.js";
import {_buttonLE, _cardLE, _stepperLE} from "../../../base/elements.js";
import plg_formValid from "../../../plugins/formValid.js";
import extend from "../../../extend/extend.js";
import {eTypes, eValues} from "../../../base/events.js";
import PB_defined from "../../../base/defined.js";
import {getStateData} from "../../../bucket/state.js";
import state from "../../../base/state.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
// Shared variables
let StateData;
let index = false;
let tanks = 0;
let total_machine = {};

/**
 * this will be used for show page's base-0 data.
 */
const pageOpen = (data) => {
  console.log(data)
  const stepperInit = () => {
    // init all the key of stepper.
    _stepperLE.form.children.forEach((ele) => {
      // find the right stepper element.
      const stepperEl = ele.querySelector('#' + ele.id + '-stepper');
      // init the stepper.
      extend.stepper.$_stepper(stepperEl);
    });
  }

  // init all the key of stepper.
  stepperInit();
  const _process = (data) => {
    console.log(data);
    data = data.data
    console.log(data)
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_render_menu(data);
    return _return;
  }
  const _process_save_page_state = (data) => {
    StateData = data['page_common_info'];
    return true;
  }
  const _process_render_menu = (data) => {

    // update category names.
    extend.foreign.$_remote(exT.foreign.individual,
      [
        data.menu_info.body,
        StateData.categories
      ],
      [['name', 'name']]
    );

    // calling render to place data
    $R_menu_obj.$_left(
      data['menu_info'],
      rdR.menu.type.stack,
      {},
    );
    return true;
  }

  return _process(data);
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

const formsTarget = function (element, event) {
  const _process = (data) => {
    data = data.data;
    let stateData = getStateData(["categories", "units", "stores"]);
    console.log(stateData)
    console.log(data)
    const formEle = element.querySelector('form')
    const sts = $R_form_obj.$global({...data, ...stateData}, formEle, rdR.form.method.advance)
    return sts;
  }
  return call_AJAX_GET({
    act : event.value,
    type: event.type
  }, _process);
}
const switchTarget = function (element, event) {
  return true;
}

const loadsTarget = (element, _event) => {
  const assign_index = () => {
    let btns = get_passedEl().querySelectorAll(querySA("name", "export_type"));

    btns.forEach((btn) => {

      if (btn.checked) {
        index = btn.value;
      }
    });
  }
  if (!index) {
    assign_index();
  }
  const load_item = () => {

    // if action=back, just return.
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;
    // continue the process.
    return true;
  }

  const load_tank = () => {
    // if action=back, just return.
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;

    tanks = parseInt(get_passedEl().querySelector('input[name="tanks"]:checked').value);

    let targetEle = element.querySelector(querySA(atr.core.append, 'tank'));
    let template = _stepperLE.template.querySelector(querySA(atr.core.template, "tank"));

    targetEle.innerHTML = '';
    for (let i = 1; i <= tanks; i++) {
      let cloneTemplate = template.cloneNode(true);
      cloneTemplate.removeAttribute(atr.core.template);
      cloneTemplate.innerHTML = extend.append.$_single_on_innerHTML(cloneTemplate, {tid: i});
      cloneTemplate.classList.remove(CLS.display.none);

      targetEle.appendChild(cloneTemplate);
    }
    return true;
  }

  const load_mdp = () => {
    // if action=back, just return.
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;

    let targetEle = element.querySelector(querySA(atr.core.append, 'mdp'));
    let template = _stepperLE.template.querySelector(querySA(atr.core.template, "mdp"));

    targetEle.innerHTML = '';
    for (let i = 1; i <= tanks; i++) {

      total_machine[i] = parseInt(get_passedEl().querySelector('input[name="mdp[' + i + ']"]').value);
      let tank_name = get_passedEl().querySelector('input[name="tank[' + i + ']"]').value;

      for (let j = 1; j <= total_machine[i]; j++) {
        let cloneTemplate = template.cloneNode(true);
        cloneTemplate.removeAttribute(atr.core.template);
        cloneTemplate.innerHTML = extend.append.$_single_on_innerHTML(cloneTemplate, {
          tid: i,
          mid: j
        });

        // set the value of input fields.
        cloneTemplate.querySelector('input[name="pump_sno[' + i + '][' + j + ']"]').value = String(i) + String(j);
        cloneTemplate.querySelector('input[name="joined_tank[' + i + '][' + j + ']"]').value = tank_name;

        cloneTemplate.classList.remove(CLS.display.none);

        targetEle.appendChild(cloneTemplate);
      }

    }
    return true;
  }

  const load_nozzle = () => {
    // if action=back, just return.
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;

    let targetEle = element.querySelector(querySA(atr.core.append, 'gun'));
    let template = _stepperLE.template.querySelector(querySA(atr.core.template, "gun"));

    targetEle.innerHTML = '';
    for (let i in total_machine) {
      for (let j = 1; j <= total_machine[i]; j++) {
        // get the total nozzle.
        let total_nozzle = parseInt(get_passedEl().querySelector('input[name="nozzle[' + i + '][' + j + ']"]').value);
        let mdp_name = get_passedEl().querySelector('input[name="mdp_name[' + i + '][' + j + ']"]').value;

        for (let k = 1; k <= total_nozzle; k++) {
          let cloneTemplate = template.cloneNode(true);
          cloneTemplate.removeAttribute(atr.core.template);

          cloneTemplate.innerHTML = extend.append.$_single_on_innerHTML(cloneTemplate, {
            tid: i,
            mid: j,
            nid: k
          });

          // set the value of input fields.
          cloneTemplate.querySelector('input[name="machine_name[' + i + '][' + j + '][' + k + ']"]').value = mdp_name;

          cloneTemplate.classList.remove(CLS.display.none);
          targetEle.appendChild(cloneTemplate);
        }
      }
    }
    return true;
  }

  switch (_event.value) {

    case pb.mng.users.add.p.item:
      return load_item();
    case pb.mng.users.add.p.tank:
      return load_tank();
    case pb.mng.users.add.p.mdp:
      return load_mdp();
    case pb.mng.users.add.p.nozzle:
      return load_nozzle();
    default :
      eventNotFound(_event);
      return false;
  }
}

const actionsTarget = function (element, _event) {
  /*
   ------------
   internal functions
   ------------
   */
  /**
   * here we delete the contact
   * @param element
   * @param event
   * @returns {AjaxPB}
   */
  const action_finish_submit_form = (element, event) => {

    // collect the form data.
    let formData = [];

    // place the form data inside the formData object.
    const _collect_form_data = () => {
      const formEl = element.closest('form');

      formData = extend.collect.$_form_simple(formEl);
    }
    _collect_form_data();
    const _process = (data) => {
      data = data.data
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_load(data);
      _return &&= _process_download_calling(data);
      _return &&= _process_success_and_reset(data);
      return _return
    }
    const _process_load = (data) => {

      if (!data) {
        toastr.error('We are unable to delete this account', "Failed to delete");
        return false;
      }

      // return on save data call.
      return true;
    }
    const _process_download_calling = (data) => {
      // use the data for processing

      return true;
    }
    const _process_success_and_reset = (data) => {

      // reset the form
      const formEl = element.closest('form');
      extend.reset.$_simple_form(formEl);

      // show the success message
      toastr.success('Data Generated successfully for export', "Files Exported");

      return true;
    }

    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST(formData, urlID, true, _process);

    return ajax;
  }
  const action_cards_save = (element, event) => {
    let formEle = element.querySelector('form');
    const _process = (data) => {
      let _return = true;
      _return &&= _process_save_return(data);
      _return &&= _process_form_old_data_reset(data);
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

    const _process_form_old_data_reset = (data) => {
      console.log(formEle.id, formEle.getAttribute(atr.form.sno))

      extend.reset.$_repeater_form(formEle.id, formEle.getAttribute(atr.form.sno));
      return true;
    }

    const ___success = () => {

      // collect form data.


      let formData = extend.collect.$_repeater(formEle);


      return call_AJAX_POST({
        act : event.value,
        type: event.type,
        id  : event.data
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
  // request switching.
  // switching
  switch (_event.value) {
    case eValues.action.stepper.finish:
      return action_finish_submit_form(element, _event);
    case eValues.action.cards.save:
      return action_cards_save(element, _event);
    default :
      return eventNotFound(_event);
  }
}


const cardsTarget = function (element, _event) {
  console.log(element, _event);
  let categories = getStateData(["categories", "employees"]);
  //  $R_form_obj.$global({...StateData}, element.querySelector('#create_product_category_form'), rdR.form.method.repeater);

  const action_create_stores = (element, event) => {
    const formEle = element.querySelector('form')
    const _process = (data) => {
      data = data.data;
      let _return = true;
      _return &&= _process_load(data);
    }
    const _process_load = (data) => {
      console.log(data)
      $R_form_obj.$global({...data, ...categories}, formEle, rdR.form.method.repeater);
      return true;
    }
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }
  const action_create_nozzles = (element, event) => {
    let formEle = element.querySelector('form')
    const _process = (data) => {
      data = data.data;
      let _return = true;
      _return &&= _process_load(data);
    }
    const _process_load = (data) => {
      $R_form_obj.$global({...data}, formEle, rdR.form.method.repeater);
      return true;
    }
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }
  const action_create_product_category = (element, event) => {
    return Promise.resolve(true);
  }
  switch (_event.value) {
    case pb.mng.products.add.p.create_product_category:
      return action_create_product_category(element, _event);
    case pb.mng.products.add.p.create_stores:
      return action_create_stores(element, _event);
    case pb.mng.products.add.p.create_nozzles:
      return action_create_nozzles(element, _event);
    default:
      return eventNotFound(_event);
  }
}

const get = function (event) {
  console.log(event.type);
  switch (event.type) {
    case eTypes.form:
      return eleCheck() ? formsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.switch:
      return eleCheck() ? switchTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
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

    case eTypes.load:
      return eleCheck() ? loadsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');

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


export const MPA_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MPA_Requests', 'Request Type: ' + type);
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
