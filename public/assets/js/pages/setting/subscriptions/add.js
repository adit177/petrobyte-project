import {get_callEl, get_passedEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {_directLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {exT, otR, Lyt, rdR, deF, plg, CLS, kws, sD, glob, STYLE} from "../../../base/const.js";
import {$R_table_obj, $R_common_obj, $R_form_obj, $R_menu_obj, $R_paging_obj} from "../../../base/render.js";
import extend from "../../../extend/extend.js";
import AjaxPB from "../../../base/ajax.js";
import plugins from "../../../plugins/plugins.js";

const host = {
  server: '',
  local : 'http://localhost:4750',
};
// Shared variables
let StateData, redData;
let tableEle;

let tableData = {}, total_sub_amount = 0;
const product_map = new Map();

/**
 * preloaded data that will be same for this page
 */
const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    let _return = true;

    _return &&= _process_a(data);
    _return &&= _process_cards(data);
    _return &&= _process_menu_body(data);

    return _return;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];
    return true;
  }

  const _process_cards = (data) => {
    let targetEle = _directLE.visits.querySelector(querySA(atr.core.append, 'payment_method'));
    let template = _directLE.template.querySelector(querySA(atr.core.template, 'payment_method'));

    targetEle.innerHTML = extend.append.$_loop_on_innerHTML(template.innerHTML, data.payment_method);
    $R_common_obj.$_call(targetEle);

    return true;
  }

  const _process_menu_body = (data) => {
    let targetEle = _directLE.visits.querySelector(querySA(atr.core.append, 'menu_body'));
    let template = _directLE.template.querySelector(querySA(atr.core.template, 'menu_body'));

    targetEle.innerHTML = extend.append.$_single_on_innerHTML(template, data.subscription_summary);

    $R_common_obj.$_call(targetEle);
    return true;
  }

  return _process(data.data);
}


// create basic HTML table for product list.
const tableFormation = function (lists, key) {
  // rendering data into table using above profile.
  redData = $R_table_obj.$_simple(lists, key);

  // have look into plain HTML table
  console.log(redData);

  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);

  // for enable dropdown in the table.
  KTMenu.init();
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
  const action_addon_form = function (element, event) {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_add_new_add_on(data);
      _return &&= _process_build_data_object(data);
      _return &&= _process_render_table(data);
      _return &&= _process_render_total_amount(data);
      return _return;
    }

    const _process_add_new_add_on = (data) => {
      let radio = get_passedEl().querySelector('input[type="radio"]:checked');
      if (radio && radio.checked) {
        let key = radio.getAttribute(atr.core.key);
        let cnt = radio.closest('label').querySelector('input[name="count"]').value;

        if (product_map.has(key)) {
          product_map.set(key, cnt * 1 + product_map.get(key));
        }
        else {
          product_map.set(key, cnt * 1);
        }
      }
      return true;
    };

    const _process_build_data_object = (data) => {
      total_sub_amount = 0;
      // create data set first
      product_map.forEach((value, key) => {
        // here implement object
        Object.keys(StateData.add_product).forEach((innerKey) => {
          let obj = StateData.add_product[innerKey];

          if (key === obj.id) {
            let arrObj = [];
            arrObj.push(obj.id);
            arrObj.push(obj.name);
            arrObj.push(value);
            arrObj.push(obj.price);
            arrObj.push(obj.price * value);
            tableData[innerKey] = arrObj;

            total_sub_amount += obj.price * value;
          }
        });
      });

      return true;
    }

    const _process_render_table = (data) => {
      tableEle = element.querySelector('table');

      if (!tableEle) {
        return false;
      }


      //remove the body of table.
      tableEle.removeChild(tableEle.querySelector('tbody'));

      // if no data found, then show no data found message.
      if (!tableData) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }
      console.log(tableData)

      // rendering data into table using above profile.
      tableFormation(tableData, pb.set.subscriptions.add.t.add_product);

      //dataTablesInit(event.value);
      //filterEvents(event.value);
      return true;

    }

    const _process_render_total_amount = (data) => {
      let right_menu = _directLE.visits.querySelector('#right_menu');
      let subs = right_menu.querySelector(querySA(atr.core.control, "subs_amount"));

      subs.innerHTML = total_sub_amount;
      $R_common_obj.$_update(subs, rdR.common.methods.currency);

      return true;
    }
    _process();
    return true;
  }

  const _action_create_subscription = function (element, event) {
    // all form submit data
    let formData = {};
    const _process_form_submit = () => {
      formData["total_sub_amount"] = total_sub_amount;

      product_map.forEach((value, key) => {
        formData[key] = value;
      });
      console.log(formData);
      return true;
    }
    _process_form_submit();
    const _process = (data) => {
      let _return = true;
      console.log(data);
      return _return;
    }

    // here we write the logic
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST(formData, urlID, true, _process);

    // other things, not connected to dynamic data.
    return ajax;
  }

  const _action_delete = function (element, event) {
    let swal_cb_on_confirm;
    const _swal = () => {
      const something_on_cancel = () => {
        console.log('something on cancel');
      }

      swal_cb_on_confirm = () => {
        // delete the row first
        Object.keys(tableData).forEach((key) => {
          if (tableData[key][0] === event.data) {
            total_sub_amount -= tableData[key][4];
            delete (tableData[key]);
          }
        });

        // render the table again
        const _process_render_table = () => {
          tableEle = element.querySelector('table');

          if (!tableEle) {
            return false;
          }


          //remove the body of table.
          tableEle.removeChild(tableEle.querySelector('tbody'));

          // if no data found, then show no data found message.
          if (!tableData) {
            redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
            tableEle.appendChild(redData);
            return true;
          }
          console.log(tableData)

          // rendering data into table using above profile.
          tableFormation(tableData, pb.set.subscriptions.add.t.add_product);

          //dataTablesInit(event.value);
          //filterEvents(event.value);
          return true;

        }
        // render the total amount again
        const _process_render_total_amount = () => {
          let right_menu = _directLE.visits.querySelector('#right_menu');
          let subs = right_menu.querySelector(querySA(atr.core.control, "subs_amount"));

          subs.innerHTML = total_sub_amount;
          $R_common_obj.$_update(subs, rdR.common.methods.currency);

          return true;
        }
        _process_render_table();
        _process_render_total_amount();

        plg_sweetAlert.$_alert(
          ['Thank You'],
          {
            confirm: [true, 'Welcome', 'btn btn-light-primary rounded'],
          },
          [2],
        );
      }

      plg_sweetAlert.$_confirm(
        ['do you want to delete this entry', 'text', 'footer'],
        {
          confirm: [true, 'Okay, Addon', 'btn btn-primary rounded'],
          cancel : [false, 'Cancel', 'btn btn-secondary rounded'],
        },
        [4, 5],
        {
          confirm: swal_cb_on_confirm,
          cancel : something_on_cancel,
        }
      );
      return true;
    }
    _swal();
    return true;
  }
  // request switching.
  // switching
  switch (_event.value) {
    case pb.set.subscriptions.add.c.addon:
      return action_addon_form(element, _event);
    case pb.set.subscriptions.add.c.create_subscription:
      return _action_create_subscription(element, _event);
    case pb.set.subscriptions.add.c.delete:
      return _action_delete(element, _event);
    default :
      return eventNotFound(_event);
  }
}
const modalsTarget = function (element, event) {
  const _modal_add_product = function (element, event) {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_plans(data);
      return _return;
    }
    const _process_plans = (data) => {
      let targetEle = element.querySelector(querySA(atr.core.append, "add_product"));
      let template = _directLE.template.querySelector(querySA(atr.core.template, "add_product"));

      targetEle.innerHTML = extend.append.$_loop_on_innerHTML(template.innerHTML, StateData.add_product);
      $R_common_obj.$_call(targetEle);

      return true;
    }

    _process();
    return true;
  }
  console.log(event.value)
  switch (event.value) {
    case pb.set.subscriptions.add.c.add_product:
      return _modal_add_product(element, event);
    default :
      return eventNotFound(event);
  }
}

// Public methods

export const SSA_modals = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? modalsTarget(get_callEl(), _event) : false;
};
// works on action event type hit
export const SSA_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const SSA_pageOpen = function (data) {
  return pageOpen(data);
};

