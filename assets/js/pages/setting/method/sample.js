export const PB_SM_sample = function () {

  const host = {
    server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
    local : 'http://localhost:4760',
  };
  // Shared variables
  let StateData, redData;
  let tableEle;
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

      _return &&= _process_a(data);
      _return &&= _process_date(data);
      _return &&= _process_amount(data);
      _return &&= _process_number(data);
      _return &&= _process_text(data);
      _return &&= _process_checkbox(data);
      _return &&= _process_note(data);
      _return &&= _process_account(data);
      //      _return &&= _process_badge(data);
      _return &&= _process_image(data);
      //      _return &&= _process_icon(data);
      //      _return &&= _process_rich(data);
      _return &&= _process_status(data);
      //      _return &&= _process_button(data);
      //      _return &&= _process_dropdown(data);
      _return &&= _process_option(data);
      _return &&= _process_input(data);
      return _return;
    }

    const _process_a = (data) => {
      StateData = data['pageState'];
      return true;
    }

    const _process_date = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'date'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.date, pb.set.method.sample.t.date);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_amount = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'amount'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.amount, pb.set.method.sample.t.amount);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_number = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'number'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.number, pb.set.method.sample.t.number);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_badge = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'badge'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.badge, pb.set.method.sample.t.badge);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_account = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'account'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.account, pb.set.method.sample.t.account);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_text = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'text'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.text, pb.set.method.sample.t.text);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_checkbox = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'checkbox'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.checkbox, pb.set.method.sample.t.checkbox);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_note = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'note'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.note, pb.set.method.sample.t.note);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_image = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'image'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.image, pb.set.method.sample.t.image);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_icon = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'icon'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.icon, pb.set.method.sample.t.icon);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_rich = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'rich'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.rich, pb.set.method.sample.t.rich);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_status = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'status'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.status, pb.set.method.sample.t.status);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_button = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'button'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.button, pb.set.method.sample.t.button);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_dropdown = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'dropdown'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.dropdown, pb.set.method.sample.t.dropdown);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_option = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'option'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.option, pb.set.method.sample.t.option);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    const _process_input = (data) => {
      let targetEle = _sampleLE.tables.querySelector(querySA(atr.core.control, 'input'));

      tableEle = targetEle.querySelector('table')

      if (!tableEle) {
        return false;
      }

      if (tableEle.getAttribute(atr.load.table) === '1') {
        return true;
      }

      // if no data found, then show no data found message.
      if (!data) {
        redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
        tableEle.appendChild(redData);
        return true;
      }

      // rendering data into table using above profile.
      tableFormation(data.input, pb.set.method.sample.t.input);

      //dataTablesInit(event.value);

      //filterEvents(event.value);

      return true;
      // what your want
    }

    return _process(data.data);
  }

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

  const actionsTarget = (element, event) => {
    const action_top = (element, event) => {
      alert('top zone hit in target page');
      return true;
    }

    switch (event.value) {
      case pb.set.method.sample.p.top:
        return action_top(element, event);

      default:
        return eventNotFound(element, event);
    }
  }

  const formsTarget = (element, event) => {
    const action_bottom = (element, event) => {
      alert('bottom zone hit in target page');
      return true;
    }

    switch (event.value) {
      case pb.set.method.sample.p.bottom:
        return action_bottom(element, event);

      default:
        return eventNotFound(element, event);
    }

  }

  const tablesTarget = (element, event) => {
    const action_left = (element, event) => {
      alert('left zone hit in target page');
      return true;
    }

    switch (event.value) {
      case pb.set.method.sample.p.left:
        return action_left(element, event);

      default:
        return eventNotFound(element, event);
    }

  }

  const loadsTarget = (element, event) => {
    const load_right = (element, event) => {
      alert('right zone hit in target page');
      return true;
    }

    switch (event.value) {
      case pb.set.method.sample.p.right:
        return load_right(element, event);

      default:
        return eventNotFound(element, event);
    }

  }

  // Public methods
  return {
    SMS_loads  : function (_event) {
      return eleCheck() ? loadsTarget(_callEl, _event) : false;
    },
    SMS_tables : function (_event) {
      return eleCheck() ? tablesTarget(_callEl, _event) : false;
    },
    SMS_forms  : function (_event) {
      return eleCheck() ? formsTarget(_callEl, _event) : false;
    },
    SMS_actions: function (_event) {
      return eleCheck() ? actionsTarget(_callEl, _event) : false;
    },

    // fetching all upcoming required details
    SMS_pageOpen: function () {
      return pageOpen();
    },

  };
}
();