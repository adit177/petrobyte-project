import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, keys, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {$R_common_obj, $R_table_obj} from "../../../base/render.js";
import {atr} from "../../../base/attributes.js";
import extend from "../../../extend/extend.js";
import PB_defined from "../../../base/defined.js";


// Shared variables
let stateData, redData;
let tableEle;

// Private functions

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
    _process_a(data);
    _process_b(data);
    return true;
  }

  const _process_a = (data) => {

    tableEle = document.querySelector('table');
    console.log(tableEle);
    if (!tableEle) {
      return false;
    }

    if (tableEle.getAttribute(atr.load.table) === '1') {
      return true;
    }

    // if no data found, then show no data found message.
    if (!data.payroll) {
      redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
      tableEle.appendChild(redData);
      return true;
    }
    // render the response data (if required)
    stateData = data.payroll;
    extend.foreign.$_remote(
      exT.foreign.combine, data,
      [
        ['payroll', 'employee', 6, 0]
        //          ['payroll', 'status', 7, 0]
      ]);

    // render the table.
    PB_defined.$_append_table_simple(tableEle, data.payroll, pb.opr.employees.payroll.n);

    return true;

  }
  //    ----------------------------------------------------------------
  //    const _process_search = (data) => {
  //
  ////      const formEle = _callEl.querySelector('form');
  //
  //      // render form.
  ////      $R_form_obj.$form(data.filters, formEle);
  //
  //      // render table.
  //
  //    }
  //      -------------------------------------------------------------------
  const _process_b = (data) => {
    // what your want to process on page load.
  }

  return _process(data.data);
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Banking');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Banking');
  return Promise.resolve(true);
}


const cardsTarget = function (element, event) {

  /*
   ------------------
   internal functions
   ------------------
   */


  const _process_a_inner_fun_a = function (element, data, event) {

    //
    return true;

  }
  // here we load receipts tab data
  const _process_a_inner_fun_b = function (element, data, event) {

    return true;
  }

  const card_create = (element, event) => {
    console.log(stateData);
    console.log(element);
    console.log(event);
    const something_on_cancel = () => {
      console.log('something on cancel');
      return false;
    }
    const swal_cb_on_confirm = () => {
      const __process = (data) => {
        extend.foreign.$_remote(
          exT.foreign.combine, data,
          [
            ['payroll', 'employee', 6, 0]
            //          ['payroll', 'status', 7, 0]
          ]);
        console.log(data);
        const xDD = Object.keys(data.payroll);
        const newIndex = xDD[0];
        const newData = data.payroll[newIndex];
        console.log(stateData[newIndex])

        stateData[newIndex] = newData;
        console.log(stateData)
        tableEle.removeChild(tableEle.querySelector('tbody'));

        // render the table.
        redData = $R_table_obj.$_simple(stateData, pb.opr.employees.payroll.n);

        tableEle.appendChild(redData)
        console.log(tableEle);
        // update table status
        tableEle.setAttribute(atr.load.table, '1');

        // apply common renders
        $R_common_obj.$_call(tableEle);

        // for enable dropdown in the table.
        KTMenu.init();

        // dataTablesInit(event.value);

        // filterEvents(event.value);


        toastr.success('Record has been deleted', 'Success');
        return true;
      }
      //        console.log(event);
      const ajax = new AjaxPB();

      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type,
        data: event.data,
      }, 'local', 0);
      ajax.callREQUEST({}, urlID, false, __process);
      return ajax;
    }
    plg_sweetAlert.$_confirm(['Are You Sure'],
      {
        confirm: [true, 'Sure', 'btn btn-primary rounded'],
        cancel : [true, 'Cancel', 'btn btn-secondary rounded'],
      },
      [5, 5],
      {
        confirm: swal_cb_on_confirm,
        cancel : something_on_cancel,
      }
    ).then((result) => {
      console.log(result);
      return result;
    });
  }

  //todo @manvendra also delete from stateData
  const card_delete = (element, event) => {
    const something_on_cancel = () => {
      console.log('something on cancel');
    }

    const swal_cb_on_confirm = () => {
      const __process = (data) => {
        _action.closest('tr').remove();
        toastr.success('Record has been deleted', 'Success');
        return true;
      }
      //        console.log(event);
      const ajax = new AjaxPB();

      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type,
        data: event.data,
      }, 'local', 0);
      ajax.callREQUEST({}, urlID, false, __process);
      return true;

    }
    console.log('delete action hit');
    console.log(event, element);
    plg_sweetAlert.$_confirm(['Are You Sure'],
      {
        confirm: [true, 'Sure', 'btn btn-primary rounded'],
        cancel : [true, 'Cancel', 'btn btn-secondary rounded'],
      },
      [5, 5],
      {
        confirm: swal_cb_on_confirm,
        cancel : something_on_cancel,
      }
    )
    return true;
  }
  // switching
  switch (event.value) {

    case pb.opr.employees.payroll.a:
      return _process_a_inner_fun_a(element, event);

    case pb.opr.employees.payroll.b:
      return _process_a_inner_fun_b(element, event);

    case eValues.card.buttons.delete:
      console.log('delete action hit');
      return card_delete(element, event);

    case eValues.card.buttons.create:
      return card_create(element, event);

    default :
      eventNotFound(event);
      return false;
  }
}

//    const _process = (data) => {
//      return _process_a(data);
//    }
//
//    const ajax = new AjaxPB();
//    const urlID = ajax.buildingURL([], {
//      act    : event.value,
//      type   : event.type,
//      data: event.data
//    }, 'local', 0);
//    ajax.callREQUEST({}, urlID, false, _process);
//
//    return ajax;


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
  const eType_eValue_function_1 = (element, event) => {
    // :page-event-value-fn to get complete function.

    // code here for the event_value_function_1 function

    const _process = (data) => {
      console.log(data);
      // process.
      let _return = true;
      // data is returned object from backend.
      _return &&= _process_a(data);
      _return &&= _process_b(data);
      _return &&= _process_c(data);
      return _return
    }
    const _process_a = (data) => {

      if (!data) {
        toastr.error('We are unable to delete this account', "Failed to delete");
        return false;
      }

      // return on save data call.
      return true;
    }
    const _process_b = (data) => {
      // use the data for processing

      return true;
    }
    const _process_c = (data) => {
      // use the data for processing

      return true;
    }

    // calling ajax function for connect
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: event.data
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);

    return ajax;
  }

  const eType_eValue_function_2 = (element, event) => {

    // code here for the event_value_function_2 function

    // add process
    // :page-process-function

    // call ajax
    // :page-ajax-calling
  };
  const action_delete = (element, event) => {
    const something_on_cancel = () => {
      console.log('something on cancel');
    }

    const swal_cb_on_confirm = () => {
      const __process = (data) => {
        _action.closest('tr').remove();
        toastr.success('Record has been deleted', 'Success');
        return true;
      }
      //        console.log(event);
      const ajax = new AjaxPB();

      const urlID = ajax.buildingURL([], {
        act : event.value,
        type: event.type,
        data: event.data,
      }, 'local', 0);
      ajax.callREQUEST({}, urlID, false, __process);
      return true;

    }
    console.log('delete action hit');
    console.log(event, element);
    plg_sweetAlert.$_confirm(['Are You Sure'],
      {
        confirm: [true, 'Sure', 'btn btn-primary rounded'],
        cancel : [true, 'Cancel', 'btn btn-secondary rounded'],
      },
      [5, 5],
      {
        confirm: swal_cb_on_confirm,
        cancel : something_on_cancel,
      }
    )
    return true;
  }

  // request switching.
  // switching
  console.log(_event);
  console.log(element);
  switch (_event.value) {

    case eValues.action.buttons.delete:
      return action_delete(element, _event);

    case pb.opr.employees.payroll:
      return eType_eValue_function_2(element, _event);

    default :
      eventNotFound(_event);
      return false;
  }
}


// works on card event type hit
export const OEP_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const OEP_actions = function (_event) {
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const OEP_pageOpen = function () {
  return pageOpen();
};


const get = function (event) {
  switch (event.type) {
    case eTypes.form:
      return eleCheck() ? formsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.table:
      return eleCheck() ? tablesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.card:
      return eleCheck() ? cardsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
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
      return eleCheck() ? loadsTarget(get_callEl(), event) : false;

    case eTypes.action:
      return eleCheck() ? actionsTarget(get_callEl(), event) : false;

    default:
      return Promise.reject('Invalid Event Type');
  }
}

const option = function (event) {
  switch (event.type) {
    case eTypes.alter:
      return eleCheck() ? alterTarget(get_callEl(), event) : false;

    default:
      return Promise.reject('Invalid Event Type');
  }
}


// Public methods

export const OEP_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('OEP_Requests', 'Request Type: ' + type);
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
