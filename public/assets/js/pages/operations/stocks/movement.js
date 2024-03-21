import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR} from "../../../base/const.js";

// Shared variables
const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4140',
};
let StateData;
let tableEle, formEle, success, filterEle;
let tableObject = [];

// Private functions

/**
 * this will be used for show page's base-0 data.
 */

const pageOpen = (data) => {


  const _process = (data) => {
    _process_a(data);
    _process_b(data);
    return true;
  }
  const _process_a = (data) => {
    StateData = data['pageState'];
  }
  const _process_b = (data) => {
    // calling render to place data into menu.
    $R_menu_obj.$_left(data.menu, 'value');
  }

  return _process(data.data);
}

/**
 * this will be used into forms
 * preloaded data that will not change for this page
 */
const cardsTarget = function (element, event) {


  const _process = (data) => {
    switch (value) {
      case eValues.cards.buttons.modal:
        return _process_modal(data);

      case eValues.card.buttons.delete:
        return _process_delete(data);

      case eValues.card.buttons.edit:
        return _process_edit(data);

      case eValues.card.buttons.view:
        return _process_view(data);

      default:
        alert('No action found for this button');
    }
  }
  const _process_modal = (data) => {
    let modal = new bootstrap.Modal(element);
    modal.show();
  }

  const _process_edit = (data) => {
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


  // collect form data.
  const formData = extend.collect.$_form(element);

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : event.value,
    type: event.type,
    data: event.data,
  }, 'local', 0);
  ajax.callREQUEST({formData}, urlID, false, _process);

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

    // other things, not connected to dynamic data.

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

function createsTarget(element, event) {

  // fetching new values or static values for form initial
  const load_fuel_form = (element, event) => {
    return form_target_common(element, event);
  }
  const load_lube_form = (element, event) => {
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
    case pb.opr.stocks.movement.p.fuel:
      return load_fuel_form(element, event);

    case pb.opr.stocks.movement.p.lube:
      return load_lube_form(element, event);

    default :
      return form_target_common(element, event);
  }
}

function loadsTarget(element, button) {

  const getLoad = function (form, button, values) {

    var fetchEntries;
    const _process = (data) => {
      return _process_a(data);
    }
    const _process_a = (data) => {
      button.querySelector('[data-pb-label="text"]').innerText = 'Loading...';
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
          param : ['b'],
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
          type  : rdR.table.cell.text,
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
          param : [],
          style : 0,
          css   : []
        },
        5: {
          type  : rdR.table.cell.amount,
          method: 'a',
          value : '5',
          param : [],
          style : 0,
          css   : []
        },
        6: {
          type  : rdR.table.cell.input,
          method: 'c',
          value : '6',
          param : ['text', 'amount', 'w-125px inr_mask_62 py-1', true, 'To be Settled Amount', '6'],
          style : 1,
          css   : []
        },
      }
      fetchEntries = PB_render_table.$_simple(data, tableProfile);

      button.querySelector('[data-pb-label="text"]').innerText = 'Loaded.';
      if (fetchEntries === false) {
        return false;
      }


      tableEle = form.querySelector('[data-pb-table="' + button.getAttribute('data-pb-calling') + '"]');
      tableEle.classList.remove('d-none');
      tableEle.appendChild(fetchEntries);

      // calling custom
      $R_common_obj.$_call(tableEle);
      plg_formKeen.$_manual(tableEle, [3])
      return true;
    }
    // button.getAttribute('data-pb-calling');

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : button.value,
      type   : button.name,
      account: values
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);
    return ajax;


    // render into table.

  }
  const load_fund_clearance = (a, event) => {
    var values = [];
    var target = event.getAttribute('data-pb-calling');
    if (event.getAttribute('data-pb-called') !== 'true') {

      // collect pre-filled required inputs.
      let form = element.querySelector('form'); // button.closest('form');
      form.querySelectorAll('[data-pb-prefill="' + target + '"]').forEach((item) => {
        item.name.search('amount') ? values.push(amt_mask_filter(item.value)) : values.push(item.name);
      });

      success = getLoad(form, event, values);

      if (success) {
        // todo: this attribute will be changed in case pre-filled data has changed by the user.
        event.setAttribute('data-pb-called', 'true');
      }
    }
    else {
      plg_sweetAlert.$call(plg.sweetAlert.type.simple, [0, 'ho gya to load', 'Aur kya chahata hai??', 'Nahi, kuch nahi chihiye :)'])
    }
  }

  //    element.querySelector('[data-pb-control="general-header"]').children.forEach((child) => {
  //      const key = child.getAttribute(atr.core.key);
  //      child.innerHTML = extend.append.collectAppend(child.innerHTML, data[key]);
  //      PB_render_common.initOnCall(child);
  //    });

  element.querySelector('[data-pb-control="delete-entry"]').children.forEach((child) => {
    const key = child.getAttribute(atr.core.key);
    child.innerHTML = extend.append.$_single_on_innerHTML(child, data[key]);
    $R_common_obj.$_call(child);
  });

}

function tablesTarget(element, event) {
  const formEle = element.querySelector('form');
  console.log(formEle)
  if (formEle.getAttribute(atr.load.form) === '1') {
    return true;
  }
  const load_fuel_table = (element, event) => {
    const _process = (data) => {
      return _process_a(data);
    }

    const _process_a = (data) => {
      const sts = $R_form_obj.$global({...StateData, ...data}, formEle, rdR.form.method.repeater);
      if (!sts) return false;
      // update form's core element status.
      formEle.setAttribute(atr.load.form, '1');
      return true;
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type
    }, 'local', 0);
    ajax.callREQUEST({}, urlID, false, _process);

    return ajax;

  }
  const load_lube_table = (element, event) => {
    return true;
  }


  switch (event.value) {
    case pb.opr.stocks.movement.p.fuel:
      return load_fuel_table(element, event);
    case pb.opr.stocks.movement.p.lube:
      return load_lube_table(element, event);
  }
  return true;

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


export const OSM_forms = function (_event) {
  return eleCheck() ? createsTarget(get_callEl(), _event) : false;
};
export const OSM_loads = function (_event) {
  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
};
export const OSM_tables = function (_event) {
  return eleCheck() ? tablesTarget(get_callEl(), _event) : false;
};
export const OSM_cards = function (_event) {
  return eleCheck() ? cardsTarget(get_callEl(), _event) : false;
};
export const OSM_actions = function (_event) {
  return eleCheck() ? actionsTarget(get_callEl(), _event) : false;
};

// fetching all basic required details

export const OSM_pageOpen = function () {
  return pageOpen();
};

