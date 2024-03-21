import {get_action, get_callEl, get_passedEl, get_thePathArr} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, Lyt, rdR} from "../../../base/const.js";
import {$R_common_obj, $R_form_obj, $R_menu_obj, $R_table_obj} from "../../../base/render.js";
import {_directLE, _stepperLE} from "../../../base/elements.js";
import extend from "../../../extend/extend.js";
import {atr} from "../../../base/attributes.js";
import AjaxPB from "../../../base/ajax.js";
import plg_datePicker from "../../../plugins/datePicker.js";

const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4250',
};
// Shared variables
let StateData, redData, formEl;
let tableEle;
let chartObject = [];
let formEditData;

// to store file path value.

// ajax
//  var ajax;


// Private functions

/**
 * preloaded data that will not change for this page
 */
const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
    // page required functions.

  const _process = (data) => {
      data = data.data;
      let _return = true;

      _return &&= _process_a(data);
      _return &&= _process_b(data);

      return _return;
    }

  const _process_a = (data) => {
    StateData = data['page_common_info'];
    return true;
  }

  const _process_b = (data) => {

    // calling extend function to extend data
    extend.foreign.$_remote(exT.foreign.individual, [data.menu_info.body, StateData.categories], [['name', 1]])
    // calling render to place data
    $R_menu_obj.$_left(
      data['menu_info'],
      rdR.menu.type.stack,
      {}
    );
    return true;
  }

  return _process(data);
}
const tableFormation = function (lists) {
  console.log(lists, pb.mng.accounts.contacts.t.list)
  // rendering data into table using above profile.
  redData = $R_table_obj.$_simple(lists, pb.mng.employees.add.t.list);

  // have look into plain HTML table
  console.log(redData);
  if (tableEle.querySelector('tbody')) {
    tableEle.removeChild(tableEle.querySelector('tbody'));
  }

  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);

  // for enable dropdown in the table.
  KTMenu.init();
}
const dataTablesInit = (eventType) => {
  console.log('to be initialized');
}
const filterEvents = (eventType) => {
  console.log('to be initialized');
}
// Public methods
const cardsTarget = function (element, _event) {
  const recently_added = (element, _event) => {
    console.log(element, _event)
    element.querySelector('h3').innerText = "Recently Added";
    tableEle = element.querySelector('table')

    if (!tableEle) {
      return false;
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return true;
    }
    const _process = (data) => {
      console.log(data);
      return _process_a(data.data)
    }
    const _process_a = (data) => {


      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.combine, data, [["list", "roles", 4, 1], ["list", "status", 7, 1]]);
      console.log(data)
      // rendering data into table using above profile.
      tableFormation(data.list);
      //
      dataTablesInit(_event.value);
      //
      filterEvents(_event.value);

      return true;
    }
    const thePathArr = get_thePathArr();
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type,
      data: _event.data
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }
  const recently_disabled = (element, _event) => {
    console.log(element, _event)
    element.querySelector('h3').innerText = "Recently Deleted";
    tableEle = element.querySelector('table')

    if (!tableEle) {
      return false;
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return true;
    }
    const _process = (data) => {
      console.log(data);
      return _process_a(data.data)
    }
    const _process_a = (data) => {


      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // render the response data (if required)
      extend.foreign.$_remote(exT.foreign.combine, data, [["list", "roles", 4, 1], ["list", "status", 7, 1]]);
      console.log(data)
      // rendering data into table using above profile.
      tableFormation(data.list);
      //
      dataTablesInit(_event.value);
      //
      filterEvents(_event.value);

      return true;
    }
    const thePathArr = get_thePathArr();
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type,
      data: _event.data
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }
  switch (_event.data) {
    case "add":
      return recently_added(element, _event);
    case "disable":
      return recently_disabled(element, _event);
  }


}
const stepperInit = (element) => {
  // init all the key of stepper.
  let stepperEl;
  if (element.id === 'type') {
    stepperEl = element.closest('#new-employee')
  }
  else {
    stepperEl = element.closest('#edit-employee')
  }
  _stepperLE.form.children.forEach((ele) => {
    // find the right stepper element.
    ele.classList.add('d-none');

  });
  // init the stepper.
  stepperEl.classList.remove('d-none');
  console.log('#' + stepperEl.id + '-stepper')
  stepperEl = stepperEl.querySelector('#' + stepperEl.id + '-stepper');
  extend.stepper.$_stepper(stepperEl);
}
const switchsTarget = (element, event) => {
  // todo: this is for call the first function of new layout.
  const stepperTarget = (element, event) => {
    const newEmployee = (element, event) => {
      const _process = () => {
        console.log(element);
        $R_form_obj.$form(StateData, element.closest('form'))
        return true;
      }


      // init all the key of stepper.
      stepperInit(element);
      return _process();
    }
    const editEmployee = (element, event) => {
      stepperInit(element);
      const _process = (data) => {
        console.log(data);
        formEditData = data.data.account;
        $R_form_obj.$form(StateData, element.closest('form'));
        return true;
      }
      const ajax = new AjaxPB();
      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type,
      }, 'local', 0);
      ajax.callREQUEST({}, urlID, false, _process);
      return ajax;
    }

    switch (event.value.split('@')[1]) {
      case "type":
        return newEmployee(element, event);
      case "employeeList":
        return editEmployee(element, event);
    }
  }
  switch (event.switch) {
    case Lyt.stepper:
      return stepperTarget(element, event);
    case Lyt.cards:
      return cardsTarget(element, event);
  }

  // use auto call inf required.

  return true;
}

const loadTarget = (element, _event) => {
  console.log("loadTarget", _event);
  const load_details = () => {
    // if action=back, just return.
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;
    // render the form as per the selection in the previous step.
    return true;
  }
  const load_payroll = () => {
    // if action=back, just return.
    console.log(element, _event);
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;
    const _process = (data) => {
      console.log(data);
      return _process_a(data.data)
    }
    const _process_a = (data) => {
      $R_form_obj.$form(data, element.closest('form'));
      return true;
    }
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type,
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;
  }
  const load_completed = () => {
    // if action=back, just return.
    if (get_action().getAttribute(atr.other.stepper.action) === 'previous') return true;
    // render the form as per the selection in the previous step.
    return true;
  }
  switch (_event.value) {
    case pb.mng.employees.add.p.details:
      return load_details();
    case pb.mng.employees.add.p.payroll:
      return load_payroll();
    case pb.mng.employees.add.p.completed:
      return load_completed();


    default :
      eventNotFound(_event);
      return false;
  }
  return true;
}
const actionTarget = (element, _event) => {
  let formData = extend.collect.$_form_simple(element);
  const _process = (data) => {
    extend.reset.$_simple_form(element);
    return true;
  }
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : _event.value,
    type: _event.type,

  }, 'local', 0);
  ajax.callREQUEST(formData, urlID, true, _process);
  return true;
}
// fetching all upcoming required details
export const MEA_cards = function (_event) {
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};
export const MEA_actions = function (_event) {
  return eleCheck() ? actionTarget(get_callEl(), _event) : false;
};
export const MEA_switchs = function (_event) {
  return eleCheck() ? switchsTarget(get_callEl(), _event) : false;
};
export const MEA_loads = function (_event) {
  return eleCheck() ? loadTarget(get_callEl(), _event) : false;
};

export const MEA_Requests = function (data) {
  return pageOpen(data);
};

