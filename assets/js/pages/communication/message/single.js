import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4640',
};
// Shared variables
let StateData, redData, formEl;
let tableEle;
let chartObject = [];


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
  const _process = (data) => {
    let _return = true;

    _return &&= _process_hold_common_info(data);
    _return &&= _process_menu_render(data);

    return _return;

  }

  const _process_hold_common_info = (data) => {
    StateData = data['page_common_info'];
    return true;
  }

  const _process_menu_render = (data) => {
    console.log(data);
    //             render the menu
    $R_menu_obj.$_left(
      data['customer_lists'],
      rdR.menu.type.button,
      [],
      rdR.menu.role.new,
      rdR.menu.tags.button,
    );
    return true;
  }

  return _process(data.data);
}

const loadsTarget = function (element, event) {

  const panel_function = (element, event) => {

    // todo: update id into the send button.

    console.log(event.data);
    // get the checking elements
    const as = element.querySelector(querySA(atr.core.target, event.data));
    if (as !== null && as.getAttribute(atr.load.box) === '1') {
      return true;
    }

    const _process = (data) => {
      let _return = true;

      _return &&= _process_load_chats(data);
      _return &&= _process_load_account(data);

      return _return;
    }

    const _process_load_account = (data) => {

      _chatsLE.toolbar.querySelector(".customer_name").innerText = data.customer_info.name;
      _chatsLE.toolbar.querySelector(".account_status").innerText = data.customer_info.status;


      return true;


      // load all the basic data [name, ids]
      // todo: @kunal.
    }

    const _process_load_chats = (data) => {
      console.log(data)
      // get all the required templates.
      const send_box_template = _chatsLE.template.querySelector(querySA(atr.core.template, "sent"));
      const receive_box_template = _chatsLE.template.querySelector(querySA(atr.core.template, "received"));
      const message_box_template = _chatsLE.template.querySelector(querySA(atr.core.template, "messages"));

      const message_box = message_box_template.cloneNode(true);

      // update the id for the custoemr
      message_box.removeAttribute(atr.core.template);
      message_box.setAttribute(atr.core.target, event.data); // data.customer_info.id
      message_box.classList.remove(CLS.display.none);
      // data ready for append
      data.send_messages.forEach((item) => {

        const messageTempObj = MessageTemplate[item.temp_id];
        // todo error may comes.
        // create the real message
        const message = extend.append.$_single_on_innerHTML(messageTempObj.template, item.data);

        // update things into the send box
        if (item.type) {
          const sent_box = send_box_template.cloneNode(true);
          sent_box.querySelector(querySA(atr.core.update, 'title')).innerText = messageTempObj.title;
          sent_box.querySelector(querySA(atr.core.update, 'message')).innerText = message;

          // append the message into the message box
          message_box.appendChild(sent_box);
        }
        else {
          const receive_box = receive_box_template.cloneNode(true);
          receive_box.querySelector(querySA(atr.core.update, 'title')).innerText = messageTempObj.title;
          receive_box.querySelector(querySA(atr.core.update, 'message')).innerText = message;

          // append the message into the message box
          message_box.appendChild(receive_box);
        }

        // update the message box
      });
      element.querySelector(querySA(atr.core.append, 'messages')).append(message_box);
      message_box.setAttribute(atr.load.box, '1');

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


  // switching
  switch (event.value) {
    case pb.com.message.single.p.panel:
      return panel_function(element, event);

    //      case 'function_a':
    //        return function_a(element, event);

  }
}

const sunTarget = function (_element, _event) {

  if (_element.getAttribute(atr.load.tab) === '1') {
    return true;
  }

  /*
   ------------------
   internal functions
   ------------------
   */
  // here we load general tab data
  const inner_fun_a = function (element, data, event) {

    let childNode;

    const chartFormation = (data) => {

      let key;
      // getting the final HTML element
      childNode.querySelectorAll('[data-pb-child="chart"]>div').forEach((chart) => {
        key = chart.getAttribute(atr.core.key);
        // balance chart
        redData = Option_charts.createDataset(data[key]);
        if (!chartObject[key]) {
          // initialize of the chart
          redData = Option_charts.buildingOptions(redData, thePathArr, key);
          chartObject[key] = Plug_apexChart.$_manual(chart, redData);
        }
        else {
          // data loading into chart
          Plug_apexChart.$_update(chartObject[key], redData);
        }
      });
    }

    // here we put the general details of account

    // header of general tab
    element.querySelector('[data-pb-control="general-header"]').children.forEach((child) => {
      const key = child.getAttribute(atr.core.key);
      child.innerHTML = extend.append.$_single_on_innerHTML(child, data[key]);
      $R_common_obj.$_call(child);
    });

    // body of general tab
    childNode = element.querySelector('[data-pb-control="general-body"]');
    chartFormation(data.charts);

    // footer of general tab
    childNode = element.querySelector('[data-pb-control="general-footer"]');
    data.other.notification = $R_common_obj.$_return(data.other.notify_mode, rdR.common.methods.string, {});
    console.log(data.other.notification);
    childNode.innerHTML = extend.append.$_single_on_innerHTML(childNode, data.other);

    // update navtab status
    element.setAttribute(atr.load.tab, '1');
    return true;
  }
  // here we load receipts tab data
  const inner_fun_b = function (element, data, event) {

    // here we render the table for transactions.
    tableEle = element.querySelector('table');
    if (!tableEle) return false;

    // data foreign matching
    console.log(data);
    redData = extend.foreign.$_remote(exT.foreign.combine, data, [['data', 'date', 1, 0], ['data', 'ledger', 2, 0]]);
    // access table profile


    let renderedData = PB_render_table.$_simple(redData.data, $R_table_obj.tableShapes, 'array');

    if (!renderedData) return false;
    // remove old data or blank table
    tableEle.querySelector('tbody').remove();
    // append tbody into page table
    tableEle.appendChild(renderedData);
    // common render
    $R_common_obj.$_call(tableEle);
    // for enable dropdown in the table.
    KTMenu.init();
    // update navtab status
    element.setAttribute(atr.load.tab, '1');
    return true;
  }
  // here we load payments tab data
  const inner_fun_c = function (element, data, event) {
    // here we render the table for transactions.
    tableEle = element.querySelector('table');
    if (!tableEle) return false;

    // data foreign matching
    redData = extend.foreign.$_remote('single', data, [['data', 'date', 1, 0], ['data', 'ledger', 2, 0]]);
    // access table profile


    let renderedData = PB_render_table.$_simple(redData.data, $R_table_obj.tableShapes, 'array');

    if (!renderedData) return false;
    // remove old data or blank table
    tableEle.querySelector('tbody').remove();
    // append tbody into page table
    tableEle.appendChild(renderedData);
    // common render
    $R_common_obj.$_call(tableEle);
    // for enable dropdown in the table.
    KTMenu.init();
    // update navtab status
    element.setAttribute(atr.load.tab, '1');
    return true;
  }


  const _process_a = (data) => {
    // const element = _element.querySelector('#' + _event.value);
    // sending to the targeted function.
    switch (_event.value) {
      case pb.com.message.single.c.tab.general:
        return inner_fun_a(_element, data, _event);

      case pb.com.message.single.c.tab.receipts:
        return inner_fun_b(_element, data, _event);

      case pb.com.message.single.c.tab.payments:
        return inner_fun_c(_element, data, _event);

    }
  }

  const _process = (data) => {
    return _process_a(data);
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act    : _event.value,
    type   : _event.type,
    account: _event.data
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);
  return ajax;
}


const earthTarget = function (element, button) {
  /*
   ------------
   internal functions
   ------------
   */

  /**
   * here we delete the contact
   * @param element
   * @param event
   * @returns {boolean}
   */
  const action_a = function (element, event) {

    // collect form data.
    const formData = [
      {account: event.data},
      {security: '123456'}
    ];

    if (!confirm('Are your sure for Delete this Contact ??')) {
      //      console.log('delete cancelled');
      return false;
    }

    class _process_a extends Component {
      render() {
        console.log(this.props);

        if (!this.props) {
          toastr.success('We are unable to delete this account', "Failed to delete");
          return false;
        }

        switch (element.id) {
          // TODO: remove row using id, pass id in tr using table render.
          case 'customer_data':
            // 1. remove the row from the list
            break;
          case 'customer_info':
            // 1. remove the status of card and value.
            // 2. remove the row from list card.
            break;
        }
        toastr.success('Account has bend deleted', "Success");

        // return on save data call.
        return true;
      }
    }

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : event.value,
      type   : event.type,
      account: event.data
    }, 'local', 0);
    ajax.callREQUEST({formData}, urlID, true, _process);


  }

  const action_b = (element, button) => {
    toastr.error('Account can not disabled', "Failed to disable contact");
    return false;
  };


  // request switching.
  switch (button.value) {
    case pb.com.message.single.c.form.delete:
      return action_a(element, button);

    case pb.com.message.single.c.form.disable:
      return action_b(element, button);
  }
}

const actionTarget = function (element, event) {

  const insertAction = function () {

    const modal = _chatsLE.modals.querySelector("#" + event.place);
    const btn = modal.querySelector("[value = 'insert']");
    const form = btn.form;
    let selectedTempId, selectedCategory;
    console.log(form);
    form.querySelectorAll('input').forEach((input) => {
      if (input.checked) {
        selectedTempId = input.value;
        selectedCategory = input.getAttribute("name");
      }
    })

    if (!selectedTempId || !selectedCategory) {
      // todo: add sweet alert
      alert("no template selected");
    }

    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      const textArea = element.querySelector("textarea");
      textArea.value = data.template;
      textArea.readOnly = true;
      return true;
    }


    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : event.value,
      type: event.type,
    }, 'local', 0);
    ajax.callREQUEST({
      category: selectedCategory,
      tempId  : selectedTempId
    }, urlID, true, _process);
    return ajax;

  }

  switch (event.value) {
    case "insert":
      return insertAction();
  }
}

const modalTarget = function (element, event) {
  // get status of the tempaltes load or not.
  if (element.querySelector('.modal-body').getAttribute(atr.load.tab) === '1') {
    return true;
  }

  const _process = (data) => {
    console.log("in process");
    let _return = true;
    _return &&= _process_load_template_into_tabs(data);
    _return &&= _process_bb(data);
    return _return;
  }
  const _process_load_template_into_tabs = (data) => {
    const modalBody = element.querySelector(".modal-body");

    const modalCategoryTemp = _chatsLE.template.querySelector(querySA(atr.core.template, "modal-categories"));
    const modalTabTemp = _chatsLE.template.querySelector(querySA(atr.core.template, "modal-tab-template"));
    const modalMessageTemp = _chatsLE.template.querySelector(querySA(atr.core.template, "modal-message-template"));

    const modalBodyTab = modalBody.querySelector(querySA(atr.core.append, "modal-category-tab"));

    const categories = data.allow_templates.map((item) => {
      return {category: item.name};
    })
    modalBody.querySelector(querySA(atr.core.append, "modal-categories")).innerHTML =
      extend.append.$_loop_on_innerHTML(modalCategoryTemp.innerHTML, categories);

    modalBodyTab.innerHTML = extend.append.$_loop_on_innerHTML(modalTabTemp.innerHTML, categories);

    modalBodyTab.querySelectorAll(querySA(atr.core.append, "modal-message-templates")).forEach((child, idx) => {
      console.log(child);
      const category = data.allow_templates[idx].name;
      const redData = data.allow_templates[idx].templates.map((item) => {
        return {
          ...item,
          category: category
        };
      })
      child.innerHTML = extend.append.$_loop_on_innerHTML(modalMessageTemp.innerHTML, redData);
    })

    modalBody.setAttribute(atr.load.tab, "1");
    return true;
  }
  const _process_bb = (data) => {
    // bb
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

// Public methods

// loading form
export const CMS_loads = function (_event) {
  console.log(_event, _callEl);
  return eleCheck() ? loadsTarget(get_callEl(), _event) : false;
};
export const CMS_navtabs = function (_event) {
  return eleCheck() ? sunTarget(get_callEl(), _event) : false;
};
export const CMS_actions = function (_event) {
  console.log("cms actions");
  //      return eleCheck() ? earthTarget(get_callEl, _event) : false;
  return eleCheck() ? actionTarget(get_callEl(), _event) : false;
};

export const CMS_modals = function (_event) {
  console.log("cms modals", _event);
  return eleCheck() ? modalTarget(get_callEl(), _event) : false;
};

// fetching all upcoming required details
export const CMS_pageOpen = function () {
  return pageOpen();
};

