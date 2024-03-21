import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {_stepperLE} from "../../../base/elements.js";
import {$R_common_obj, $R_form_obj} from "../../../base/render.js";
import extend from "../../../extend/extend.js";
import AjaxPB from "../../../base/ajax.js";


const host = {
  server: '',
  local : 'http://localhost:0000',
};
// Shared variables
let StateData, redData;
let tableEle;
let available_itc_details;
let reverse_itc_details;
let boot_other_modal;
let boot_reverse_modal;

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
    StateData = data['pageState'];
    console.log(StateData);
  }

  const _process_b = (data) => {
    available_itc_details = {...StateData.tax_return.itc_eligible_inward_supplies.available_itc_details};

    reverse_itc_details = {
      itc_reversal_others: {...StateData.tax_return.itc_eligible_inward_supplies.itc_reversal_others},
      itc_reversal_rule  : {...StateData.tax_return.itc_eligible_inward_supplies.itc_reversal_rule},
    }

    console.log(available_itc_details);

    _stepperLE.form.querySelector("#gstin_no").innerText = StateData.user.GSTIN;
    _stepperLE.form.querySelector("#gst_user_name").innerText = StateData.user.gst_username;

    const tax_return = StateData.tax_return;

    for (const key in tax_return) {
      const tbody = _stepperLE.form.querySelector("#" + key);

      if (tbody) {

        const data = tax_return[key];

        for (const key1 in data) {

          const tr = tbody.querySelector("." + key1);

          let selector = ".";
          if (key1 === "other_inward_supplies") {
            selector = ".actual_"
          }


          if (tr) {

            const values = data[key1];

            for (const key2 in values) {

              const td = tr.querySelector(selector + key2);

              if (td) {
                const val = values[key2];

                if (!td.classList.contains("gstr3b-null")) {

                  td.innerText = val;

                  td.classList.add("rc_currency");
                  td.setAttribute("data-cs-sign", "1");
                  td.setAttribute("data-cs-round", "2");
                }
              }

            }

          }


        }
        if (tbody) {
          $R_common_obj.$_call(tbody);
        }

      }
    }


    // what your want to process on page load.
  }

  return _process(data.data);
}

const cardsTarget = function (element, event) {

  /*
   ------------------
   internal functions
   ------------------
   */


  const _process_a = (data) => {


    const _process_a_inner_fun_a = function (element, data, event) {

      //
      return true;

    }
    // here we load receipts tab data
    const _process_a_inner_fun_b = function (element, data, event) {

      return true;
    }

    // switching
    switch (event.value) {

      case pb.tax.gstreturn.gstrthreeb.a:
        return _process_a_inner_fun_a(element, event);

      case pb.tax.gstreturn.gstrthreeb.b:
        return _process_a_inner_fun_b(element, event);

      default :
        eventNotFound(event);
        return false;
    }
  }

  const _process = (data) => {
    return _process_a(data);
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : event.value,
    type   : event.type,
    account: event.data
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  return ajax;
}


const actionsTarget = function (element, _event) {

  const update_available_itc = () => {
    const other_modal = _stepperLE.modal.querySelector("#other_modal");
    const form = other_modal.querySelector("form");

    console.log(form);

    const formData = extend.collect.$_form_step(form);

    const sendData = {"available_itc_details": {...formData}};
    console.log(formData);

    const _process = (data) => {
      let _return = true;

      _return &&= _process_aa(data.data);

      return _return;
    }

    const _process_aa = (data) => {
      console.log(data);

      available_itc_details = {...data.available_itc_details};
      const tbody = _stepperLE.form.querySelector("#itc_eligible_inward_supplies");
      const tr = tbody.querySelector(".available_itc_details");

      for (const key in available_itc_details) {

        const td = tr.querySelector("." + key);

        console.log(td);

        if (td) {
          td.innerText = available_itc_details[key];
          console.log(available_itc_details[key]);
        }
      }

      $R_common_obj.$_call(tbody);

      toastr.success("gstr 3b available itc details updated", "details updated");

      boot_other_modal.hide();


      return true;
    }

    // check if updated than call ajax otherwise just return


    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type
    });
    ajax.callREQUEST(sendData, urlID, true, _process);

    return ajax;
  }


  const update_reverse_itc = () => {
    const reverse_modal = _stepperLE.modal.querySelector("#reverse_modal")
    const form = reverse_modal.querySelector("form");
    const data = extend.collect.$_form_step(form);
    const prepareSendData = {
      itc_reversal_others: {},
      itc_reversal_rule  : {},
    };
    for (const key in data) {
      const prefix = key.split("_")[0];
      const suffix = key.split("_")[1] + "_" + key.split("_")[2];
      if (prefix === "others") {
        prepareSendData.itc_reversal_others[suffix] = data[key];
      }
      else {
        prepareSendData.itc_reversal_rule[suffix] = data[key];
      }
    }

    const _process = (data) => {
      let _return = true;

      _return &&= _process_aa(data.data);

      return _return;
    }

    const _process_aa = (data) => {
      reverse_itc_details.itc_reversal_rule = {...data.itc_reversal_rule};
      reverse_itc_details.itc_reversal_others = {...data.itc_reversal_others};
      const tbody = _stepperLE.form.querySelector("#itc_eligible_inward_supplies");

      for (let key in data) {
        const tr = tbody.querySelector("." + key);
        const subData = data[key];

        for (let key1 in subData) {
          const td = tr.querySelector("." + key1);
          td.innerText = subData[key1];
        }
      }

      $R_common_obj.$_call(tbody);

      toastr.success("reversal itc details has been updated", "details updated");

      boot_reverse_modal.hide();

      console.log(data);
      // update the data


      return true;
    }


    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : _event.value,
      type: _event.type
    },);
    ajax.callREQUEST(prepareSendData, urlID, true, _process);

    return ajax;
  }


  switch (_event.value) {
    case "update_available_itc":
      return update_available_itc();

    case "update_reverse_itc":
      return update_reverse_itc();
  }
}


const modalsTarget = function (element, _event) {
  console.log(element, _event);

  const other_modal = () => {

    if (!boot_other_modal) {
      boot_other_modal = new bootstrap.Modal(element);
    }
    const form = element.querySelector("form");
    console.log(available_itc_details, form);
    extend.placement.$_form(available_itc_details, form);
    boot_other_modal.show();
    return true;
  }


  const reverse_modal = () => {
    if (!boot_reverse_modal) {
      boot_reverse_modal = new bootstrap.Modal(element);
    }
    const preapreData = {};
    for (let key in reverse_itc_details) {
      console.log(key);
      console.log(key.split("_"));
      const prefix = key.split("_")[2];
      const data = reverse_itc_details[key];
      for (let key2 in data) {
        const amount = data[key2];
        preapreData[`${prefix}_${key2}`] = amount;
      }
    }

    const form = element.querySelector("form");
    extend.placement.$_form(preapreData, form);
    console.log(preapreData);
    // place form data
    boot_reverse_modal.show();
    return true;
  }


  switch (_event.value) {
    case 'other':
      return other_modal();

    case "reverse":
      return reverse_modal();
  }

  return true;
}

// Public methods

// works on card event type hit
export const TGT_cards = function (_event) {
  // note: single ajax calling for any event
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};

// works on action event type hit
export const TGT_actions = function (_event) {
  console.log(_event);
  // note: multiple ajax calling for all events.
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

export const TGT_modals = function (_event) {
  return eleCheck() ? modalsTarget(get_callEl(), _event) : false;
}

// fetching all upcoming required details
export const TGT_pageOpen = function (data) {
  return pageOpen(data);
};

