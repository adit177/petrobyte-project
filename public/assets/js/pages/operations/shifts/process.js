import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR} from "../../../base/const.js";

// Shared variables
let StateData;
let index = false;
let nozzle_map = new Map();
let table_map = new Map();
let item_info = {};
let redData, tableEle;

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4120',
};
/**
 * this will be used for show page's base-0 data.
 */
const pageOpen = (data) => {
  const stepperInit = () => {
    // init all the key of stepper.
    _stepperLE.form.children.forEach((ele) => {
      console.log(ele);
      console.log(ele.id)
      // find the right stepper element.
      const stepperEl = ele.querySelector('#' + ele.id + '-stepper');
      // init the stepper.
      extend.stepper.$_stepper(stepperEl);
    });
  }
  const handleProductSelect = () => {
    // Define variables
    const checkboxes = table.querySelectorAll('[type="checkbox"]');
    const target = document.getElementById('kt_ecommerce_edit_order_selected_products');
    const totalPrice = document.getElementById('kt_ecommerce_edit_order_total_price');

    // Loop through all checked products
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', e => {
        // Select parent row element
        const parent = checkbox.closest('tr');

        // Clone parent element as variable
        const product = parent.querySelector('[data-kt-ecommerce-edit-order-filter="product"]').cloneNode(true);

        // Create inner wrapper
        const innerWrapper = document.createElement('div');

        // Store inner content
        const innerContent = product.innerHTML;

        // Add & remove classes on parent wrapper
        const wrapperClassesAdd = ['col', 'my-2'];
        const wrapperClassesRemove = ['d-flex', 'align-items-center'];

        // Define additional classes
        const additionalClasses = ['border', 'border-dashed', 'rounded', 'p-3', 'bg-body'];

        // Update parent wrapper classes
        product.classList.remove(...wrapperClassesRemove);
        product.classList.add(...wrapperClassesAdd);

        // Remove parent default content
        product.innerHTML = '';

        // Update inner wrapper classes
        innerWrapper.classList.add(...wrapperClassesRemove);
        innerWrapper.classList.add(...additionalClasses);

        // Apply stored inner content into new inner wrapper
        innerWrapper.innerHTML = innerContent;

        // Append new inner wrapper to parent wrapper
        product.appendChild(innerWrapper);

        // Get product id
        const productId = product.getAttribute('data-kt-ecommerce-edit-order-id');

        if (e.target.checked) {
          // Add product to selected product wrapper
          target.appendChild(product);
        }
        else {
          // Remove product from selected product wrapper
          const selectedProduct = target.querySelector('[data-kt-ecommerce-edit-order-id="' + productId + '"]');
          if (selectedProduct) {
            target.removeChild(selectedProduct);
          }
        }

        // Trigger empty message logic
        detectEmpty();
      });
    });

    // Handle empty list message
    const detectEmpty = () => {
      // Select elements
      const message = target.querySelector('span');
      const products = target.querySelectorAll('[data-kt-ecommerce-edit-order-filter="product"]');

      // Detect if element is empty
      if (products.length < 1) {
        // Show message
        message.classList.remove('d-none');

        // Reset price
        totalPrice.innerText = '0.00';
      }
      else {
        // Hide message
        message.classList.add('d-none');

        // Calculate price
        calculateTotal(products);
      }
    }

    // Calculate total cost
    const calculateTotal = (products) => {
      let countPrice = 0;

      // Loop through all selected prodcucts
      products.forEach(product => {
        // Get product price
        const price = parseFloat(product.querySelector('[data-kt-ecommerce-edit-order-filter="price"]').innerText);

        // Add to total
        countPrice = parseFloat(countPrice + price);
      });

      // Update total price
      totalPrice.innerText = countPrice.toFixed(2);
    }
  }

  // init all the key of stepper.
  stepperInit();
  const _process = (data) => {
    let _return = true;
    _return &&= _process_save_page_state(data);
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

  return _process(data.data);
}

const formsTarget = function (element, event) {
  alert('form target');
  return true;
}
const switchTarget = function (element, event) {
  const switch_shiftDetails = () => {

    console.log(event, element)
    const xdd = _stepperLE.template.querySelector(querySA(atr.core.template, "details"));
    xdd.classList.remove('d-none');
    element.appendChild(xdd);
    const formEle = element.querySelector('form')

    const _process = (data) => {
      console.log(data)
      return _process_form(data);
    }
    const _process_form = (data) => {

      const sts = $R_form_obj.$global({...data}, formEle, rdR.form.method.advance);

      if (!sts) return false;
      // update form's core element status.
      //        formEle.setAttribute(atr.load.form, '1');
      return true;
    }
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value.split('@')[1],
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }
  const switch_nozzle = () => {

    const _process = (data) => {
      let _return = true;
      _return &&= _process_mdp(data);
      return _return;
    }
    const _process_mdp = (data) => {
      let machine_targetEle = element.querySelector(querySA(atr.core.append, "machine"));
      let machine_template = _stepperLE.template.querySelector(querySA(atr.core.template, "machine"));
      let nozzle_template = _stepperLE.template.querySelector(querySA(atr.core.template, "nozzle"));
      let machine_nodes = "";

      Object.keys(data.mdp_info).forEach((machine_key) => {
        let machine_data = data.mdp_info[machine_key];

        // first clone the machine template
        let clone_machine_template = machine_template.cloneNode(true);
        let nozzle_targetEle = clone_machine_template.querySelector(querySA(atr.core.append, "nozzle"));

        let x = 1;
        let tr = document.createElement('tr');


        Object.keys(machine_data.nozzles).forEach((nozzle_key) => {
          let nozzle_data = machine_data.nozzles[nozzle_key];
          // store most common info into map
          let map_value = {};
          map_value['mid'] = machine_data.id;
          map_value['machine_name'] = machine_data.name;
          map_value['nozzle_name'] = nozzle_data.name;
          map_value['item_id'] = nozzle_data.item_id;
          nozzle_map.set(nozzle_data.id, map_value);

          let temp_object = {};
          temp_object["mid"] = machine_data.id;
          temp_object["nid"] = nozzle_data.id;
          temp_object["nozzle_name"] = nozzle_data.name;
          temp_object["item_id"] = nozzle_data.item_id;

          // render the all nozzle into template
          let clone_nozzle_template = nozzle_template.cloneNode(true);
          let td = document.createElement('td');

          td.innerHTML = extend.append.$_single_on_innerHTML(clone_nozzle_template, temp_object);
          tr.appendChild(td);

          x %= machine_data.grid[1];
          // apply grid system
          if (!x) {
            nozzle_targetEle.appendChild(tr);
            tr = document.createElement('tr');
          }
          x++;
        });
        machine_nodes += extend.append.$_single_on_innerHTML(clone_machine_template, machine_data);
      });

      machine_targetEle.innerHTML = machine_nodes;

      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value.split('@')[1],
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }

  switch (event.value.split('@')[1]) {
    case pb.opr.shifts.process.p.nozzle:
      return switch_nozzle();
    case pb.opr.shifts.process.p.shiftDetails:
      return switch_shiftDetails();
    default:
      return eventNotFound(event);
  }
  return true;
}

// create basic HTML table for item list.
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
const loadsTarget = (element, _event) => {
  const assign_index = () => {
    let btns = _passedEl.querySelectorAll(querySA("name", "export_type"));

    btns.forEach((btn) => {

      if (btn.checked) {
        index = btn.value;
      }
    });
  }
  if (!index) {
    assign_index();
  }
  const load_nozzle = () => {

    // if action=back, just return.
    if (_action.getAttribute(atr.other.stepper.action) === 'previous') return true;
    // continue the process.
    return true;
  }

  const load_reading = () => {
    // if action=back, just return.
    if (_action.getAttribute(atr.other.stepper.action) === 'previous') return true;

    let formData = {};

    const _process_form_data = () => {
      console.log(_passedEl)
      // formData = extend.collect.$_form(_passedEl);
    }
    _process_form_data();
    const _process = (data) => {
      let _return = true;

      _return &&= _process_readings(data);
      return _return;
    }
    const _process_readings = (data) => {
      // save the item info into global attribute
      item_info = data.item_info;

      let targetEle = element.querySelector(querySA(atr.core.append, "reading"));
      let template = _stepperLE.template.querySelector(querySA(atr.core.template, "reading"));

      let nozzle_nodes = "";

      Object.keys(data.reading).forEach((nid) => {

        let nozzle_data = nozzle_map.get(parseInt(nid));

        let clone_template = template.cloneNode(true);
        // first call the append function
        let append_data = {};
        append_data['nid'] = nid;
        append_data['mid'] = nozzle_data.mid;
        append_data['machine_name'] = nozzle_data.machine_name;
        append_data['nozzle_name'] = nozzle_data.nozzle_name;

        clone_template.innerHTML = extend.append.$_single_on_innerHTML(clone_template, append_data);

        let opening_input = clone_template.querySelector('input[name="opening[' + nozzle_data.mid + '][' + nid + ']"]');
        if (data.reading[nid][0]) {
          opening_input.setAttribute('value', data.reading[nid][0]);
          opening_input.dataset.balRam = data.reading[nid][0];
          opening_input.readOnly = true;
        }
        else {
          opening_input.readOnly = false;
        }

        let closing_input = clone_template.querySelector('input[name="closing[' + nozzle_data.mid + '][' + nid + ']"]');
        if (data.reading[nid][1]) {
          closing_input.value = data.reading[nid][1];
          closing_input.readOnly = true;
        }
        else {
          closing_input.readOnly = false;
        }

        nozzle_nodes += clone_template.innerHTML;
      });
      targetEle.innerHTML = nozzle_nodes;

      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type
    }, 'local', 0);
    ajax.callREQUEST(formData, urlID, true, _process);

    return ajax;
  }

  const load_table = () => {
    // if action=back, just return.
    if (_action.getAttribute(atr.other.stepper.action) === 'previous') return true;

    const _process_data_set = () => {
      _passedEl.querySelectorAll(querySA(atr.core.key)).forEach((nozzle_element) => {

        let mid = nozzle_element.getAttribute(atr.core.key).split('@')[0];
        let nid = nozzle_element.getAttribute(atr.core.key).split('@')[1];
        // nozzle table map
        let opening = nozzle_element.querySelector('input[name="opening[' + mid + '][' + nid + ']"]');
        let testing = nozzle_element.querySelector('input[name="testing[' + mid + '][' + nid + ']"]');
        let closing = nozzle_element.querySelector('input[name="closing[' + mid + '][' + nid + ']"]');
        let quantity = nozzle_element.querySelector('input[name="quantity[' + mid + '][' + nid + ']"]');
        let amount = nozzle_element.querySelector('input[name="amount[' + mid + '][' + nid + ']"]');

        let item_id = nozzle_map.get(parseInt(nid)).item_id;

        let item_name = "";

        Object.keys(item_info).forEach((item_key) => {
          if (item_info[item_key].id === item_id) {
            item_name = item_info[item_key].name;
          }
        });

        if (table_map.has(item_id)) {
          let get_item_value = table_map.get(item_id);

          get_item_value[2] += parseInt(closing.value) - parseInt(opening.value);
          get_item_value[3] += parseInt(testing.value);
          get_item_value[4] += parseInt(quantity.value);
          get_item_value[5] += parseInt(amount.value);
        }
        else {
          let temp_obj = [];
          temp_obj.push(item_id);
          temp_obj.push(item_name);
          temp_obj.push(parseInt(closing.value) - parseInt(opening.value));
          temp_obj.push(parseInt(testing.value));
          temp_obj.push(parseInt(quantity.value));
          temp_obj.push(parseInt(amount.value));

          table_map.set(item_id, temp_obj);
        }

      });
    }

    const _process_table = () => {
      let tableData = [];

      tableEle = element.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }
      const _process = (data) => {
        return _process_a(data)
      }
      const _process_a = (data) => {


        // if no data found, then show no data found message.
        if (!data) {
          redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
          tableEle.appendChild(redData);
          return true;
        }

        // rendering data into table using above profile.
        tableFormation(data, pb.opr.shifts.process.t.list);
        return true;
      }


      table_map.forEach((value, key) => {
        tableData.push(value);
      });
      _process(tableData);

      return true;
    }
    _process_data_set();
    _process_table();
    return true;
  }
  const load_selectNozzles = () => {
    //      console.log(_passedEl);
    //      _passedEl.querySelector('form')
    const _process = (data) => {
      return _process_a(data)
    }
    const _process_a = (data) => {
      const temp = _stepperLE.template.querySelector(querySA(atr.core.template, "select_nozzles"));

      const formEle = temp.querySelector('table');

      console.log(formEle);
      // if no data found, then show no data found message.
      if (!data.nozzles) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }
      // render the response data (if required)


      // render the table.
      redData = $R_table_obj.$_simple(data.nozzles, pb.opr.shifts.process.t.nozzles);

      formEle.appendChild(redData)
      console.log(redData);

      // update table status
      formEle.setAttribute(atr.load.table, '1');

      // apply common renders
      $R_common_obj.$_call(formEle);
      console.log(temp);
      const clone_template = temp.cloneNode(true);
      element.appendChild(clone_template);
      return true;
    }
    let formData = extend.collect.$_form(_passedEl.querySelector('form'));
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type
    }, 'local', 0);
    console.log(_event)
    ajax.callREQUEST(formData, urlID, true, _process);

    return ajax;

  }
  switch (_event.value) {

    case pb.opr.shifts.process.p.nozzle:
      return load_nozzle();
    case pb.opr.shifts.process.p.reading:
      return load_reading();
    case pb.opr.shifts.process.p.table:
      return load_table();
    case pb.opr.shifts.process.p.selectNozzles:
      return load_selectNozzles();
    default :
      return eventNotFound(_event);
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

      formData = extend.collect.$_form(formEl);
    }
    _collect_form_data();
    const _process = (data) => {
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
      extend.reset.$_form(formEl);

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

  const action_nozzle = (element, event) => {

    let targetEle = element.querySelector(querySA(atr.core.key, event.data));

    targetEle.querySelectorAll('input').forEach((ele) => ele.checked = true);
    return true;
  }
  // request switching.
  // switching
  switch (_event.value) {
    case eValues.action.stepper.finish:
      return action_finish_submit_form(element, _event);
    case pb.opr.shifts.process.p.nozzle:
      return action_nozzle(element, _event);
    default :
      return eventNotFound(_event);
  }
}

const feedsTarget = (element, event) => {

  let feed = _action.closest('div>.feed');

  let opening = feed.querySelector(querySA(atr.core.name, "opening"));
  let testing = feed.querySelector(querySA(atr.core.name, "testing"));
  let closing = feed.querySelector(querySA(atr.core.name, "closing"));
  let quantity = feed.querySelector(querySA(atr.core.name, "quantity"));
  let amount = feed.querySelector(querySA(atr.core.name, "amount"));

  console.log(testing.value);
  let netQuantity = parseInt(closing.value)
    - (
      parseInt(testing.value ? testing.value : 0) +
      parseInt(opening.value ? opening.value : 0)
    );

  quantity.setAttribute('value', netQuantity);

  let nozzle_id = amount.name.split('[')[2].substring(0, amount.name.split('[')[2].length - 1);

  let nozzle_info = nozzle_map.get(parseInt(nozzle_id));

  // search id into item object
  let item_object = "";
  Object.keys(item_info).forEach((key) => {
    if (item_info[key].id === nozzle_info.item_id) {
      item_object = item_info[key];
    }
  });

  amount.setAttribute('value', parseInt(item_object.rate) * netQuantity);
  return true;
}
// Public methods

export const OSP_feeds = function (event) {
  return eleCheck() ? feedsTarget(get_callEl(), event) : false;
};
export const OSP_actions = function (event) {
  return eleCheck() ? actionsTarget(get_callEl(), event) : false;
};
export const OSP_switch = function (event) {
  return eleCheck() ? switchTarget(get_callEl(), event) : false;
};
export const OSP_forms = function (event) {
  return eleCheck() ? formsTarget(get_callEl(), event) : false;
};
export const OSP_loads = function (event) {
  return eleCheck() ? loadsTarget(get_callEl(), event) : false;
};
// fetching all basic required details
export const OSP_pageOpen = function () {
  return pageOpen();
};
