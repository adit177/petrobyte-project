import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR} from "../../../base/const.js";

// Shared variables
const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4110',
};
let StateData;
let tableEle, formEle, success, filterEle;
let tableObject = [];


// Private functions

/**
 * this will be used for show page's base-0 data.
 */

const pageOpen = (data) => {
  // init the required classes.


  // process.
  const _process = (data) => {
    console.log(data);
    let _return = true;
    _return &&= _process_save_page_state(data);
    _return &&= _process_menu_render(data);
    _return &&= _process_date_update(data);
    return _return;
  }
  const _process_save_page_state = (data) => {
    StateData = data['pageState'];
    return true;
  }
  const _process_menu_render = (data) => {
    // calling render to place data into menu.
    console.log(data.menu);
    return $R_menu_obj.$_left(data.menu, 'value');
  }

  const _process_date_update = (data) => {

    // get form element.
    const formEle = _buttonLE.menu.querySelector('form');

    // calling render to place data into menu inputs.
    extend.placement.$_form(data.session, formEle);

    return true;
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : 'page',
    type: 'open'
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);
  // calling ajax to get data
  return ajax;
}

/**
 * this will be used into forms
 * preloaded data that will not change for this page
 */
const cardsTarget = function (element, event) {

  const _process = (data) => {

    switch (event.value) {
      case eValues.card.buttons.modal:
        return _process_modal(data);

      case eValues.card.buttons.delete:
        return _process_delete(data);

      case eValues.card.buttons.edit:
        return _process_edit(data);

      case eValues.card.buttons.view:
        return _process_view(data);

      case eValues.card.buttons.search:
        return _process_search(data);

      default:
        alert('No action found for this button');
    }
  }
  const _process_modal = (data) => {
    // get the modal element.
    const modal = _callEl.getElementsByClassName('modal-title')[0];
    // update the modal title.
    modal.innerHTML = data.modal.title;

    const event_string = event.value + '-' + event.data;

    // find the target body element.
    const body = _callEl.querySelector('#' + event_string);

    // append the table.

    console.log(body);


    return true;
  }
  const _process_search = (data) => {
    // log
    console.log(data.filters);

    const formEle = _callEl.querySelector('#' + 'transaction-search');
    // render form.
    $R_form_obj.$form(data.filters, formEle);

    return true;
  }
  const _process_delete = (data) => {
    var table = _buttonLE.cards.getElementById("table1"); //similar to document.getElementById("table1")
    const key = table.getAttribute("data-pb-key");
    console.log(key);
    for (var i = 0, row; row = table.rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        console.log(col);
        console.log(data[table1]);
        col.innerHTML = extend.append.$_single_on_innerHTML(col, data[key]);
        $R_common_obj.$_call(col);
      }
    }
    return true;


    // have a look.
    //      const asd = a.getAttribute(atr.core.key);
    //      console.log(a);
    //      element.querySelector('[data-pb-control="delete-entry"]').children.forEach((child) => {
    //        console.log(child);
    //        const key = child.getAttribute(atr.core.key);
    //        child.innerHTML = extend.append.$_single(child.innerHTML, data[key]);
    //        PB_render_common.$_call(child);
    //      });
  }
  const _process_view = (data) => {
    return true;
  }
  const _process_edit = (data) => {
    return true;
  }


  let params;
  // apply switch for params
  switch (event.value) {
    case eValues.card.buttons.modal:
      params = {
        act  : event.value,
        type : event.type,
        about: event.data,
      };
      break;
    case eValues.card.buttons.delete:
    case eValues.card.buttons.edit:
    case eValues.card.buttons.view:
      params = {
        act   : event.value,
        type  : event.type,
        vou_no: event.data,
      };
      break;
    case eValues.card.buttons.search:
      params = {
        act : event.value,
        type: event.type,
      }
      break;

  }

  // send POST ajax
  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], params, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);
  return ajax;
}
const actionsTarget = function (element, event) {

  // event print
  console.log(event);

  /*
   -------------------------------
   private functions of actions
   -------------------------------
   */
  const action_save = (element, event) => {
    // init the required classes.

    /**
     * this data save into variables.
     * it will be called when create form initiated.
     * @param data
     * @private
     */
    const _process = (data) => {
      return _process_save_return(data);
      return _process_form_old_data_reset(data);
    }

    const _process_save_return = (data) => {

      sleep(100).then(() => {
        formEle = element.querySelector('#' + event.place + '-' + event.data);
        const f_sno = formEle.getAttribute(atr.form.sno);
        if (!plg_formValid.$_get_status(f_sno)) {
          toastr.error('Kindly fill all required steps', 'Incomplete Form');
          return false;
        }
      });
      return true;
    }
    const _process_form_old_data_reset = (data) => {
      extend.reset.$_form(formEle, kws.attr.pb);
      return true;
    }

    // collect form data.
    const formData = extend.collect.$_form(formEle);

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);
    // calling ajax to get data
    return ajax;

  }

  const action_reset = (element, event) => {

    const _process = (data) => {
      return _process_form_reset(data);
    }
    const _process_form_reset = (data) => {
      const method = true;
      if (method) {
        formEle = element.querySelector('form');
        extend.reset.$_form(formEle, kws.attr.pb);
      }
      else {
        formEle = element.querySelector(event.type + '-' + event.value);
        extend.reset.$_form(formEle, kws.attr.pb);
      }
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

  const action_delete = (element, event) => {
    const _process = (data) => {
      return _process_a(data);
      return _process_b(data);
    }
    const _process_a = (data) => {
      return true;
    }
    const _process_b = (data) => {
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

  const action_edit = (element, event) => {
    const _process = (data) => {
      _process_a(data);
      _process_b(data);
      return true;
    }
    const _process_a = (data) => {

    }
    const _process_b = (data) => {

    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;
  }

  const action_view = (element, event) => {
    return true;
  }

  const action_change = (element, event) => {

    // form submit after getting data.
    const _process = (data) => {
      let _return = true;
      _return &&= _process_menu_value_update(data);
      _return &&= _process_date_changed_alert(data);
      return _return;
    }

    const _process_date_changed_alert = (data) => {
      if (data.status) {
        alert('date changed');
      }
      return true;
    }

    const _process_menu_value_update = (data) => {
      // update menu value.
      return $R_menu_obj.$_left(data['menu_info'], rdR.menu.type.value, [], rdR.menu.role.update, rdR.menu.tags.menu);
    }

    // collect form data.
    const formData = extend.collect.$_form(element);

    // ajax calling
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);
    return ajax;


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

    case eValues.action.buttons.view:
      return action_view(element, event);

    case eValues.action.buttons.change:
      return action_change(element, event);

    default :
      eventNotFound(event);
      return false;
  }


  console.log('actions event hit');

  return true;
}

function createsTarget(element, event) {

  const load_entry_form = (element, event) => {
    return form_target_common(element, event);
  }

  const form_target_common = (element, event) => {

    formEle = element.querySelector('form');

    if (formEle.getAttribute(atr.load.form) === '1') {
      return true;
    }
    const _process = (data) => {
      return _process_form(data);

    }
    const _process_form = (data) => {

      const sts = $R_form_obj.$global({...StateData, ...data}, formEle, rdR.form.method.repeater);

      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }
    // fetching new values or static values for form initial


    // initiated page blockUIElement until all things load for the page.

    // fetching, rendering and loading values into forms
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;

  }
  switch (event.value) {
    case pb.opr.transactions.journals.p.entry:
      return load_entry_form(element, event);

    default :
      return form_target_common(element, event);
  }
}

// Public methods
export const OTJ_forms = function (_event) {
  return eleCheck() ? createsTarget(get_callEl(), _event) : false;
};
export const OTJ_cards = function (_event) {
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};
export const OTJ_actions = function (_event) {

  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all basic required details

export const OTJ_pageOpen = function () {
  return pageOpen();
};

