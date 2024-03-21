import {get_action, get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {CLS, deF, keys, kws, rdR} from "../../../base/const.js";
import {_buttonLE} from "../../../base/elements.js";
import {$R_common_obj, $R_form_obj, $R_menu_obj} from "../../../base/render.js";
import plg_sweetAlert from "../../../plugins/sweetAlert.js";
import {atr} from "../../../base/attributes.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {eTypes, eValues} from "../../../base/events.js";
import PB_option_datatables from "../../../options/datatables.js";
import plg_datePicker from "../../../plugins/datePicker.js";
import extend from "../../../extend/extend.js";
import plg_dataTables from "../../../plugins/dataTables.js";
import PB_defined from "../../../base/defined.js";
import {_k} from "../../../base/keys.js";
import {exe_plugins_on_manualCall} from "../../../base/plugins.js";
import datePicker from "../../../plugins/datePicker.js";

// Shared variables
const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4140',
};
let StateData = {};
let tableEle, formEle, success, filterEle, tankId;
let tableObject = [];


// Private functions
/**
 * this will be used for show page's base-0 data.
 */

const pageOpen = (data) => {

  const _process = (data) => {
    data = data.data
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_menu_render(data);
    _return &&= _process_date_update(data);
    return _return;
  }
  const _process_save_page_state = (data) => {
    StateData.form = data[_k.page_common_info];
    return true;
  }
  const _process_menu_render = (data) => {
    // calling render to place data into menu.
    return $R_menu_obj.$_left(data.menu, rdR.menu.type.value);
  }

  const _process_date_update = (data) => {

    // get form element.
    exe_plugins_on_manualCall(_buttonLE.menu, {}, kws.plugin.combo);
    const formEle = _buttonLE.menu.querySelector('form');

    // calling render to place data into menu inputs.
    extend.placement.$_form(data.session, formEle);
    const dateInstanceID = formEle.querySelector(`input[${atr.core.control}="date"]`).getAttribute(atr.plugins.id);

    const Instance = datePicker.$_get(dateInstanceID);

    // call the target event.
    const __update_the_work_date = () => {
      actionsTarget(_buttonLE.menu, {
        type : eTypes.action,
        value: eValues.action.buttons.change
      })
    }

    Instance.config.onChange.push(function (date) {
      __update_the_work_date();
    });


    return true;
  }

  return _process(data);

}

/**
 * this will be used into forms
 * preloaded data that will not change for this page
 */
const cardsTarget = function (element, event) {

  const _process = (data, value) => {
    switch (value) {
      case eValues.card.buttons.modal:
        return _process_modal(data);

      case eValues.card.buttons.edit:
        return _process_edit(data);

      case eValues.card.buttons.delete:
        return _process_delete(data);

      case eValues.card.buttons.view:
        return _process_view(data);

      default:
        alert('No action found for this button');

    }

  }
  const _process_modal = (data) => {
    let modal = new bootstrap.Modal(element);
    modal.show();
    return true;
  }
  const _process_edit = (data) => {
    return true
  }
  const _process_delete = (data) => {
    return true;
  }

  const _process_view = (data) => {
    return true;

  }
  //  const ajax = new AjaxPB();
  //  const urlID = ajax.buildingURL([], {
  //    act : event.value,
  //    type: event.type
  //  }, 'local', 0);
  //  ajax.callREQUEST({}, urlID, false, _process);
  //
  //
  //  return true;
  return call_AJAX_GET({
    act : event.value,
    type: event.type
  }, _process)
}

const actionsTarget = function (element, event) {

  /*
   -------------------------------
   private functions of actions
   -------------------------------
   */
  //    const action_save = (element, event) => {
  //
  //
  //      const _process = (data) => {
  //  data = data.data
  //        return _process_save_return(data);
  //        return _process_form_old_data_reset(data);
  //      }
  //      const _process_save_return = (data) => {
  //        sleep(100).then(() => {
  //          formEle = element.querySelector('#' + event.place + '-' + event.data);
  //          const f_sno = formEle.getAttribute(atr.form.sno);
  //          if (!plg_formValid.$_get(f_sno)) {
  //            toastr.error('Kindly fill all required steps', 'Incomplete Form');
  //            return false;
  //          }
  //        })
  //        return true;
  //      }
  //      const _process_form_old_data_reset = (data) => {
  //        // calling render to place data into menu.
  //        extend.reset.$_form(formEle, 'call');
  //        return true;
  //      }
  //      const formData = extend.collect.$_form(formEle);
  //      const ajax = new AjaxPB();
  //      const urlID = ajax.buildingURL([], {
  //        act : event.value,
  //        type: event.type
  //      }, 'local', 0);
  //      ajax.callREQUEST({formData}, urlID, false, _process);
  //      return ajax;
  //
  //
  //    }
  const action_save = (element, event) => {
    /**
     * this data save into variables.
     * it will be called when create form initiated.
     * @param data
     * @private
     */

    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_save_return(data);
      _return &&= _process_form_old_data_reset(data);
      return _return;
    }

    const _process_save_return = (data) => {
      PB_defined.$_form_submit_response(data[event.value])
      //      plg_sweetAlert.$_alert(['Saved', 'Data has been saved successfully.'],
      //        {
      //          confirm: [false, '', 'btn btn-light-primary rounded'],
      //        },
      //        [2, 5, 1500],)
      return true;
    }

    const _process_form_old_data_reset = (data) => {
      console.log(formEle.id, formEle.getAttribute(atr.form.sno))
      extend.reset.$_repeater_form(formEle.id, formEle.getAttribute(atr.form.sno));
      //@todo: @lokesh need to reset form.
      return true;
    }

    const ___success = () => {
      //      const ajax = new AjaxPB();
      // collect form data.
      console.log(formEle)
      let formData = extend.collect.$_form_repeater(formEle);

      console.log(formData)

      return call_AJAX_POST({
        act : event.value,
        type: event.type,
        id  : event.data
      }, formData, _process, false);
    }

    const __reject = () => {
      return false;
    }

    const param = {
      form_sno: formEle.getAttribute(atr.form.sno),
      method  : deF.form_promise.method.inbuild,
    };
    console.log(param)

    return PB_defined.$_form_validation(___success, __reject, param, deF.methods.promise.form);
  }
  const action_reset = (element, event) => {
    const _process = (data) => {
      return _process_form_reset(data);
    }
    const _process_form_reset = (data) => {

      formEle = element.querySelector('form');

      console.log(formEle.id, formEle.getAttribute(atr.form.sno))
      extend.reset.$_repeater_form(formEle.id, formEle.getAttribute(atr.form.sno));

      return true;
    }


    return _process();
  }
  const action_delete = (element, event) => {
    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      return _return;
    }
    const _process_a = (data) => {
      return true;
    }
    const _process_b = (data) => {
      return true;


    }

    //
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)



  }

  const action_edit = (element, event) => {
    const _process = (data) => {
      data = data.data
      let _return = true;
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      return _return;
    }
    const _process_a = (data) => {

    }
    const _process_b = (data) => {

    }
    //
    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act : event.value,
    //      type: event.type,
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //
    //    return ajax;
    call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process)
  }

  switch (event.value) {
    case eValues.action.buttons.save:
      return action_save(element, event);

    case eValues.action.buttons.reset:
      return action_reset(element, event);

    case eValues.action.buttons.delete:
      return action_delete(element, event);

    case eValues.action.buttons.edit:
      return action_edit(element, event);

    default :
      eventNotFound(event);
      return false;
  }
}
const calculateTarget = function (element, event) {
  console.log(element, event);
  const calcNozzleSale = () => {
    let targetId = `tank_${tankId}_nozzles`;
    console.log(targetId);
    const targetElement = _buttonLE.modals.querySelector('#advance-modal').querySelector(`#${targetId}`);
    if (!targetElement) {
      toastr.error('First Input Nozzle Sales', 'Input Nozzle Sale');
    }
    else {
      console.log(targetElement);
      let soldQuantity = 0;
      targetElement.querySelectorAll('[data-pb-catch="soldQuantity"]').forEach((item) => {
        console.log(item.value);
        if (item.value === '') {
          soldQuantity += 0;
        }
        else {
          soldQuantity += Number(item.value);
        }
      })
      //    soldQuantity = Number(soldQuantity)
      const sale = element.closest('div > #nozzleSale ');
      sale.querySelector('input').value = soldQuantity;
      console.log(soldQuantity);
    }
    return true;
  }
  const calcTotalReceived = () => {
    console.log(element, event);
    console.log(element.closest('div > .fv-row'))
    const closestEle = element.closest('div > .fv-row');
    let inputQty = closestEle.querySelector(querySA(atr.core.catch, "inputQuantity")).value;
    inputQty = (inputQty === '') ? 0 : parseFloat(volume_mask_filter(inputQty));
    console.log(inputQty)
    let openingDip = closestEle.querySelector(querySA(atr.core.catch, "opening_dip")).value;
    openingDip = (openingDip === '') ? 0 : parseFloat(volume_mask_filter(openingDip));
    console.log(openingDip)
    let closingDip = closestEle.querySelector(querySA(atr.core.catch, "closing_dip")).value;
    closingDip = (closingDip === '') ? 0 : parseFloat(volume_mask_filter(closingDip));
    console.log(closingDip)
    let NozzleSale = closestEle.querySelector(querySA(atr.core.catch, "nozzle_sale")).value;
    NozzleSale = (NozzleSale === '') ? 0 : parseFloat(volume_mask_filter(NozzleSale));
    console.log(NozzleSale)
    let totalReceived = NozzleSale + (closingDip - openingDip);
    let shortage = inputQty - totalReceived;
    console.log(totalReceived, shortage);

    closestEle.querySelector(querySA(atr.core.catch, "vacantQty")).value = totalReceived;
    closestEle.querySelector(querySA(atr.core.catch, "shortage")).value = shortage
    console.log(inputQty);
    return true;
  }

  switch (event.value) {
    case pb.opr.stocks.incoming.c.calcNozzleSale:
      return calcNozzleSale();
    case pb.opr.stocks.incoming.c.totalReceivedCalc:
      return calcTotalReceived();
  }
  return true;
}
const amendTarget = function (element, event) {
  console.log(element, event);
  const input_row_element = get_action().closest('div > .fv-row');
  console.log(input_row_element);
  const opening = input_row_element.querySelector('[data-pb-catch="opening"]');
  const closing = input_row_element.querySelector('[data-pb-catch="closing"]');
  const soldQuantity = input_row_element.querySelector('[data-pb-catch="soldQuantity"]');
  soldQuantity.value = (Number(closing.value) - Number(opening.value)) > 0 ? (Number(closing.value) - Number(opening.value)) : 0;
  return true;
}

const changeTarget = function (element, event) {
  console.log(element, event);
  const input_row_element = get_action().closest('div > .fv-row');
  console.log(input_row_element);
  const input_row = input_row_element.querySelector('[data-pb-catch="tanks_list"]');
  input_row.setAttribute('data-pb-source', event.data);

  let tankListData = StateData.tanks_list;
  const sts = $R_form_obj.$global(
    tankListData,
    input_row,
    rdR.ele.method.simple
  );

  if (!sts) return false;
  // update form's core element status.
  formEle.setAttribute(atr.load.form, '1');

  return true;
}
const modalsTarget = function (element, event) {
  const modal_advance = () => {

    const _show_tab = () => {
      const href = `tank_${event.data}_nozzles`;
      console.log(href);
      element.querySelectorAll('li').forEach((item) => {
        if (item.children[0].getAttribute('href') === '#' + href) {
          item.children[0].classList.add(CLS.visible.navs.bar.active);
          element.querySelector('#' + href).classList.add(...CLS.visible.navs.tab.active)
        }
        else {
          item.children[0].classList.remove(CLS.visible.navs.bar.active);
          element.querySelector('#' + href).classList.remove(...CLS.visible.navs.tab.active)
        }
      })
    }
    // check the modal status.
    if (element.getAttribute(atr.load.modal) === '1') {
      _show_tab();
      return promise.resolve(true);
    }

    const temp_keys = [
      'advance-modal-bar',
      'advance-modal-tab',
      'advance-modal-body'
    ]
    // get all the templates.
    const bar_template = _buttonLE.templates
      .querySelector(querySA(atr.core.template, temp_keys[0]));
    const tab_template = _buttonLE.templates
      .querySelector(querySA(atr.core.template, temp_keys[1]));
    const body_template = _buttonLE.templates
      .querySelector(querySA(atr.core.template, temp_keys[2]));


    // start playing with templates.
    let modal_bar_append = element.querySelector(querySA(atr.core.append, temp_keys[0]));
    const bar_key = modal_bar_append.getAttribute(atr.core.key);

    // insert new bar values
    modal_bar_append.innerHTML = extend.append.$_loop_on_innerHTML(bar_template.innerHTML, StateData.form[bar_key]);

    // move to body.

    let modal_tab_append = element.querySelector(querySA(atr.core.append, temp_keys[1]));
    const tab_key = modal_tab_append.getAttribute(atr.core.key);

    for (const props in StateData.form[bar_key]) {

      const new_tabs = tab_template.cloneNode(true);
      new_tabs.removeAttribute(atr.core.template);
      new_tabs.setAttribute(atr.core.action, 'delete');
      new_tabs.innerHTML = extend.append.$_single_on_innerHTML(tab_template, StateData.form[bar_key][props]);

      let body_append_element;

      for (const key in StateData.modal[tab_key]) {
        if (key === props) {
          const tank_body = body_template.cloneNode(true);
          tank_body.innerHTML = extend.append.$_loop_on_innerHTML(body_template.innerHTML, StateData.modal[tab_key][key]["nozzles"]);
          body_append_element = new_tabs.querySelector(querySA(atr.core.append, temp_keys[2]));
          body_append_element.append(tank_body);
        }
      }
      modal_tab_append.append(body_append_element);
    }
    // update the status
    element.setAttribute(atr.load.modal, '1');

    // show tab.
    _show_tab();
    return true;
  }

  switch (event.value) {
    case pb.opr.stocks.incoming.p.advance:
      return modal_advance();
    case pb.opr.stocks.incoming.p.simple:
      return modal_simple();
    default:
      eventNotFound(event);
      return false;
  }
}

function formsTarget(element, event) {

  formEle = element.querySelector('form');

  if (formEle.getAttribute(atr.load.form) === '1') {
    return Promise.resolve(true);
  }
  const form_simple = () => {
    // fetching new values or static values for form initial
    //    formEle = element.querySelector('form');
    //    todo:don't know why the template is coming null and there is a div exist in the html whose id is simple-form
    const targetID = `${event.value}-${event.type}`;
    //    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID,'div'));
    const template = _buttonLE.templates.querySelector(querySA(atr.core.template, targetID, 'div'));
    console.log(template, targetID);
    formEle.appendChild(template.cloneNode(true));



    const _process = (data) => {
      data = data.data
      StateData.tanks_list = data["tanks_data"];
      return _process_form(data);
    }
    const _process_form = (data) => {

      const sts = $R_form_obj.$global(
        {...StateData.form, ...data},
        formEle,
        rdR.form.method.repeater
      );

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }

    // initiated page blockUIElement until all things load for the page.

    // fetching, rendering and loading values into forms
    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process, false);
  }

  const form_advance = () => {

    const _process = (data) => {
      data = data.data

      let _return = true;
      _return &&= _process_save_data(data);
      _return &&= _process_form_init(data);

      return _return;
    }

    const _process_save_data = (data) => {
      // save data for modal rendering
      StateData.modal = data;
      return true;
    }
    const _process_form_init = (data) => {

      //      formEle = element.querySelector('form');
      //      // check the form status
      //      if (formEle.getAttribute(atr.load.form) === '1') {
      //        return true;
      //      }

      // form initial
      const sts = $R_form_obj.$global(
        StateData.form,
        formEle,
        rdR.form.method.repeater
      );

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process, false);
  }


  switch (event.value) {

    case pb.opr.stocks.incoming.p.simple:
      return form_simple();

    case pb.opr.stocks.incoming.p.advance:
      return form_advance();

  }
}

function loadsTarget(element, event) {
  console.log(event)
  const load_tank_change = () => {

    // get the nozzle button.
    const input_row_element = get_action().closest('div > .fv-row');
    console.log(input_row_element);
    const nozzle_button = input_row_element.querySelector(querySA(atr.core.catch, event.value));
    const closingDip_button = input_row_element.querySelector(querySA(atr.core.catch, "closingDip"));
    const openingDip_button = input_row_element.querySelector(querySA(atr.core.catch, "openingDip"));
    const fetchNozzleSale_button = input_row_element.querySelector(querySA(atr.core.catch, "calcNozzleSale"));
    const calcTotalReceived_button = input_row_element.querySelector(querySA(atr.core.catch, "calctotalReceived"));
    // enable the button.
    nozzle_button.disabled = false;
    closingDip_button.disabled = false;
    openingDip_button.disabled = false;
    fetchNozzleSale_button.disabled = false;
    calcTotalReceived_button.disabled = false;
    // set the value of the button.
    tankId = event.data;
    nozzle_button.setAttribute(atr.event.value, event.data);
    closingDip_button.setAttribute(atr.event.value, event.data);
    openingDip_button.setAttribute(atr.event.value, event.data);

    return true;
  }

  const load_tank_dip = () => {
    // code to get the tank dip.
    const input_row_element = get_action().closest('div');
    console.log(input_row_element);
    let input_element = input_row_element.querySelector('input');

    let dimensions = StateData.modal["tanks"][tankId]["dimensions"];

    let inputValue = Number(volume_mask_filter(input_element.value));
    console.log(inputValue)
    let length = parseFloat(dimensions["length"]);
    console.log(length)
    let diameter = parseFloat(dimensions["diameter"]);
    console.log(diameter);
    if (inputValue > diameter) {
      toastr('Wrong Input', 'Please Re-check the input')
      return true;
    }
    let radius = parseFloat(diameter / 2);
    console.log(radius)
    let height = parseFloat(diameter - inputValue);
    console.log(height)
    let radius_square = parseFloat(radius * radius);
    console.log(radius_square)
    let acos_value = parseFloat(Math.acos((radius - height) / radius))
    console.log(acos_value)
    let trg_value = parseFloat(Math.sqrt((2 * height * radius) - (height * height)));
    console.log(trg_value)
    let area = parseFloat((((3.14159) * radius_square) - (radius_square * acos_value) + (radius - height) * trg_value));
    console.log(area)
    // set the value of the button.

    input_element.value = parseFloat(Math.round((area * length) / 1000));

    return true;
  }

  switch (event.value) {
    case pb.opr.stocks.incoming.c.tank:
      return load_tank_change();

    case pb.opr.stocks.incoming.c.dip:
      return load_tank_dip();

    default :
      eventNotFound(event);
      return false;
  }
}

function tablesTarget(element, button) {
  const getTable = (button, params, htLen) => {

    var renderedData
    let profile, methods, options;
    const _process = (data) => {
      data = data.data
      return _process_a(data);
    }
    const _process_a = (data) => {
      if (data !== false) {
        const OPTION = [4, ['view', 'edit', 'delete'], ['view-incoming', 'edit-incoming', 'delete-incoming']];
        let tableProfile = {
          0: {
            type  : rdR.table.cell.checkbox,
            method: 'a',
            value : '0',
            param : [],
            style : 0,
            css   : []
          },
          1: {
            type  : rdR.table.cell.date,
            method: 'a',
            value : '1',
            param : [],
            style : 0,
            css   : []
          },
          2: {
            type  : rdR.table.cell.account,
            method: 'a',
            value : '2',
            param : [],
            style : 0,
            css   : []
          },
          3: {
            type  : rdR.table.cell.account,
            method: 'a',
            value : '3',
            param : [],
            style : 0,
            css   : []
          },
          4: {
            type  : rdR.table.cell.amount,
            method: 'a',
            value : '4',
            param : [2, 1],
            style : 0,
            css   : []
          },
          5: {
            type  : rdR.table.cell.note,
            method: 'a',
            value : '5',
            param : [],
            style : 0,
            css   : []
          },
          6: {
            type  : rdR.table.cell.dropdown,
            method: 'b',
            value : '0',
            param : [],
            style : 100,
            css   : ['pe-0 text-end', 100]
          },
        };
        methods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal',
        };
        options = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
        };
        profile = {
          0: [],
          1: [],
          2: []
        };
        // render the received data from server.
        renderedData = PB_render_table.$_simple(data, tableProfile);
      }
      else {
        console.log('status has failed, table data :' + JSON.stringify(data));
        renderedData = PB_render_table.$_zero(htLen);
      }

      return {
        redData: renderedData,
        methods: methods,
        options: options,
        profile: profile
      };
    }

    //    const ajax = new AjaxPB();
    //    const urlID = ajax.buildingURL([], {
    //      act    : button.value,
    //      type   : button.name,
    //      account: params
    //    }, 'local', 0);
    //    ajax.callREQUEST({}, urlID, false, _process);
    //    return ajax;
    return call_AJAX_GET({
      act: button.value,
      type   : button.name,
    }, _process)

  }
  // fetching new values from server and updating into table
  tableEle = element.querySelector('table');
  filterEle = element.querySelector('[data-pb-target="filter"]');

  if (!tableEle) {
    console.log('add table element');
    return;
  }
  if (tableEle.getAttribute('data-load-table') !== 'true') {

    var newValforTable = getTable(button, [], tableEle.querySelectorAll('thead>tr>th').length);

    // appending fetched values
    tableEle.appendChild(newValforTable.redData);
    // update table status
    tableEle.setAttribute('data-load-table', 'true');
    // todo: if new entry created then add 'false'

    // dataTables Plugin Calling.
    dataTableCalling(newValforTable.options, newValforTable.methods, newValforTable.profile, button.value);
    filterEvents(filterEle, button.value);


    // calling other basic plugin functions
    $R_common_obj.$_call(tableEle);

    // for enable dropdown in the table.
    KTMenu.init();
  }
}

const dataTableCalling = (options, methods, profile, call) => {
  let DT_options = {};
  console.log(methods);
  // create options
  const end = PB_option_datatables.optionKeys();
  end.forEach((i) => {
    if (options[i]) {
      DT_options[i] = PB_option_datatables.building(i, methods[i], profile[i]);
    }
  })

  console.log(DT_options);

  let optionsObj = {};
  Object.entries(DT_options).forEach(([key, value]) => {
    optionsObj = {...optionsObj, ...value}
  })

  // console.log(optionsObj);

  // Init datatable --- more info on datatables: https://datatables.net/manual/
  tableObject[call] = plg_dataTables.$_manual(tableEle, optionsObj, 'new');

  // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
  /*
   tableObject[_RG_SAMP_A].on('draw', function () {
   console.log('i am call at the time of re-inti.')
   });
   */
}

const filterEvents = (element, btnValue) => {
  element.querySelectorAll('select, input').forEach((value, key, parent) => {

    //let col = value.getAttribute('data-dt-column');

    switch (value.name) {
      case 'search':
        const regex = value.getAttribute('data-dt-regex') === '1';
        value.addEventListener('keyup', function (evt) {
          tableObject[btnValue].search(evt.target.value, regex).draw();
        })
        break;

      case 'select':
        value.addEventListener('change', function (evt) {
          var val = evt.target.value;
          if (val === 'all') val = '';
          tableObject[btnValue].column(evt.target.getAttribute('data-dt-column')).search(val).draw();
        })
        break;

      case 'clear':
        value.addEventListener('click', function (evt) {
          const iid = evt.target.getAttribute('data-pb-instance');
          console.log(iid);
          const fp = plg_datePicker.$_get(kws.labels.instance, iid)
          fp.clear();
          $.fn.dataTable.ext.search.push(function () {
            return true
          });
          tableObject[btnValue].draw();
        })
        break;

      case 'date':
        value.addEventListener('change', function (evt) {
          let dates;
          var val = evt.target.value;
          if (!val.includes(' to ')) {
            return;
          }
          else {
            //dates = val.split(' to ');
          }
          dates = plg_datePicker.$_get(kws.labels.value)[0];
          let min = moment(dates[0]).format('YYYY-MM-DD');
          let max = moment(dates[1]).format('YYYY-MM-DD');
          $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
              let date = moment(data[evt.target.getAttribute('data-dt-column')]).format('YYYY-MM-DD');
              //console.log(date);
              //console.log(min, max);
              return (min === null && max === null) ||
                (min === null && date <= max) ||
                (min <= date && max === null) ||
                (min <= date && date <= max);
            }
          );
          tableObject[btnValue].draw();
        })
        break;
    }
  })
}
const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Banking');
  return Promise.resolve(true);
}
const opensTarget = (element, event) => {
  return PB_defined.$_open_menu(element, event);
}
const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Banking');
  return Promise.resolve(true);
}
const option = function (event) {

  switch (event.type) {
    case eTypes.alter:
      return eleCheck() ? alterTarget(get_callEl(), event) : Promise.reject('Call Element not found.');

    case eTypes.modal:
      return eleCheck() ? modalsTarget(get_callEl(), event) : Promise.reject('Call Element not found.');

    default:
      return Promise.reject('Invalid Event Type');
  }
}
const get = function (event) {
  console.log("event tt", event)
  switch (event.type) {
    case eTypes.form:
      return eleCheck() ? formsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : false;
    default:
      alert(`eventType: ${event.type}, not GET, change nature to POST`);
      return Promise.reject('Invalid Event Type');
  }
}
const post = function (event) {
  switch (event.type) {
    case eTypes.load:
      return eleCheck() ? loadsTarget(get_callEl(), event) : false;

    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : false;

    default:
      return Promise.reject('Invalid Event Type');
  }
}
// Public methods

export const OSI_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('OTB_Requests', 'Request Type: ' + type);
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
//export const OSI_forms = function (_event) {
//  return eleCheck() ? formsTarget(get_callEl(), _event) : false;
//};
//export const OSI_loads = function (_event) {
//  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
//};
//export const OSI_tables = function (_event) {
//  return eleCheck() ? tablesTarget(get_callEl(), _event) : false;
//};
//export const OSI_cards = function (_event) {
//  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
//};
//export const OSI_actions = function (_event) {
//  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
//};
//export const OSI_modals = function (_event) {
//  return eleCheck() ? modalsTarget(get_callEl(), _event) : false;
//};
//export const OSI_change = function (_event) {
//  return eleCheck() ? changeTarget(get_callEl(), _event) : false;
//};
//export const OSI_amend = function (_event) {
//  return eleCheck() ? amendTarget(get_callEl(), _event) : false;
//};
//export const OSI_calculate = function (_event) {
//  return eleCheck() ? calculateTarget(get_callEl(), _event) : false;
//};
//
//// fetching all basic required details
//
//export const OSI_pageOpen = function (data) {
//  return pageOpen(data);
//};
