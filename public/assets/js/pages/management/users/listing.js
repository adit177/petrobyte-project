import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR} from "../../../base/const.js";

// Shared variables
let StateData;
let tableEle, filterEle, redData;
let ajaxResponse;
let cardsData;
let tableObject = [];

let cardProfile = {};


const host = {
  server: 'https://9d0f471e-1577-48ff-8802-95b4084dc031.mock.pstmn.io',
  local : 'http://localhost:4260',
};


const pageOpen = (data) => {
  console.log('this is open page')
  // static functions call.
  const _static_funs = () => {

    // handle advance search toggle.
    const advance_search_toggle = () => {
      let link = _listingLE.form.querySelector('#advance_search_toggle');

      link.addEventListener('click', function (e) {
        e.preventDefault();

        if (link.innerHTML === "Advanced Search") {
          link.innerHTML = "Hide Advanced Search";
        }
        else {
          link.innerHTML = "Advanced Search";
        }
      })
    }
    advance_search_toggle();
  }

  _static_funs();

  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    let _return = true;

    _return &&= _process_a(data);
    _return &&= _process_b(data);
    return _return;
  }

  const _process_a = (data) => {
    StateData = data['pageState'];

    // ------------ update common part ------------ //

    // update users number
    let tarEle = _listingLE.action.querySelector('h3>span');
    tarEle.innerHTML = StateData.active;

    return true;
  }

  const _process_b = (data) => {

    // define the table object


    // create pagination elements.


    // run the pagination.
    $R_paging_obj.$cards(_listingLE.cards, data);

    // get the profile as per pagination.
    cardProfile = $R_paging_obj.getProfile;

    return true;
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : 'page',
    type: 'open'
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  // other things, not connected to dynamic data.


  return ajax;
}

/**
 * it integrates the datatables with simple table
 * @param options
 * @param methods
 * @param profile
 * @param call
 */
const dataTableCalling = (options, methods, profile, call) => {
  let DT_options = {};
  //    console.log(methods);
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
/**
 * It does basic tables rendering for the table
 * @param tableProfile
 * @param type
 */
const basicTableCalling = (tableProfile, type = 'array') => {
  // rendering data into table using above profile.
  redData = PB_render_table.$_simple(ajaxResponse, tableProfile, type);

  // have look into plain HTML table
  //console.log(redData);

  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute('data-load-table', '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);
}
/**
 * it returns all tables property
 * @param call
 * @returns {{methods: {"0": string, "1": string, "2": string, "3": string, "4": string, "5": string}, profile: {"0": *[], "1": *[], "2": *[]}, options: {"0": boolean, "1": boolean, "2": boolean, "3": boolean, "4": boolean, "5": boolean}, table: {"0": {css: *[], method: string, param: number[], style: number, type, value: string}, "1": {css: *[], method: string, param: number[], style: number, type, value: string}, "2": {css: *[], method: string, param: number[], style: number, type, value: string}, "3": {css: *[], method: string, param: number[], style: number, type, value: string}, "4": {css: *[], method: string, param: number[], style: number, type, value: string}, "5": {css: (string|number)[], method: string, param: (number|string[])[], style: number, type, value: string}}}}
 */
const propertyDetails = (call) => {
  let tableProfile, profile, methods, options;
  switch (call) {
    case pb.mng.users.listing.p.table:
      let OPTION = [3, ['card', 'card', 'card'], ['view-list', 'edit-list', 'delete-list']];
      tableProfile = {
        '0': {
          type  : rdR.table.cell.text,
          method: 'd',
          value : '1,2',
          param : [2, 1],
          style : 0,
          css   : []
        },
        '1': {
          type  : rdR.table.cell.text,
          method: 'a',
          value : '3',
          param : [2, 1],
          style : 0,
          css   : []
        },
        '2': {
          type  : rdR.table.cell.text,
          method: 'd',
          value : '4,5',
          param : [2, 1],
          style : 0,
          css   : []
        },
        '3': {
          type  : rdR.table.cell.text,
          method: 'd',
          value : '6,7',
          param : [2, 1],
          style : 0,
          css   : []
        },
        '4': {
          type  : rdR.table.cell.text,
          method: 'd',
          value : '8,9',
          param : [2, 1],
          style : 0,
          css   : []
        },
        '5': {
          type  : rdR.table.cell.dropdown,
          method: 'b',
          value : '0',
          param : OPTION,
          style : 2,
          css   : ['', 'end', 150]
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
      break;
  }
  return {
    table  : tableProfile,
    options: options,
    methods: methods,
    profile: profile
  };
}
/**
 * it handles all filters of datatables
 * @param element
 * @param btnValue
 */
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
          const fp = plg_datePicker.$_get(kws.labels.instance, iid);
          fp.clear();
          $.fn.dataTable.ext.search.push(function () { return true});
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

/**
 * It changes the active state of paging
 * @param element
 * @param event
 */
const pagingTarget = function (element, event) {

  $R_paging_obj.$trigger(element, event);
  // It targets the particular card and handles all rendering of the data inside the card

  let targetEle = element.querySelector(querySA(atr.core.target, 'load'));
  let place = targetEle.querySelector(querySA(atr.core.paging, event.value));


  // update paging buttons
  $R_paging_obj._counting(element, event);

  // hide all cards
  targetEle.children.forEach((item) => {
    item.classList.add(CLS.display.none);
  });
  // show the card that is being loaded
  place.classList.remove(CLS.display.none);

  // if already loaded, return
  if (place.getAttribute(atr.load.card) === "1") {
    return true;
  }
  const _process = (data) => {
    let _return = true;
    _return &&= _process_key_match(data);
    _return &&= _process_load_cards(data.users);
    return _return;
  }

  const _process_key_match = (data) => {
    extend.foreign.$_remote(exT.foreign.combine, data,
      [
        ["users", "dates", "overdue", 0],
        ["users", "category", "category_id", 0]
      ]
    );
    return true;
  }
  const _process_load_cards = (data) => {
    let template = _listingLE.template.querySelector(querySA(atr.core.template, pb.mng.users.listing.p.cards));

    // vars
    let progress;
    // duplicate the template and add the data to it.
    Object.keys(data).forEach((key, index) => {
      let node = template.children[0].cloneNode(true);
      node.removeAttribute(atr.core.template);
      let nodeData = data[key];

      // hide and show the tags
      let tags = node.querySelector('[data-pb-target="tags"]');
      // hiding not available tags
      Object.keys(nodeData.tags).forEach((tag, index) => {
        if (!nodeData.tags[tag]) {
          tags.querySelector('span[name="' + tag + '"]').classList.add(CLS.display.none);
        }
      });

      // manage the balance tag

      //render the most common data
      progress = $R_common_obj.$_return(nodeData.limit, rdR.common.methods.percent, [nodeData.balance, 0]);
      nodeData.limit = progress[0];

      node.querySelector('[role="progressbar"]').classList.add('bg-' + CLS.colors.array[progress[1]]);

      node.innerHTML = extend.append.$_single_on_innerHTML(node, nodeData);

      // render the rest of the data
      $R_common_obj.$_call(node);
      // show the card
      node.classList.remove(CLS.display.none);
      // append cards one-by-one
      place.children[0].appendChild(node);

      place.setAttribute(atr.load.card, '1');
    });
    return true;
  }

  const ajax = new AjaxPB();
  const urlID = ajax.buildingURL([], {
    act : event.value,
    type: event.type,
    page: event.data,
  }, 'local', 0);
  ajax.callREQUEST({}, urlID, false, _process);

  return ajax;
}
/**
 * It loads the table  as well as integrates with datatables
 * @param element
 * @param button
 * @returns {boolean}
 */
const tableFormation = function (element, data) {
  tableEle = element.querySelector('table');
  //filterEle = element.querySelector('[' + atr.core.target + '="filter"]');

  if (tableEle.getAttribute(atr.load.table) === "1") {
    return true;
  }

  // if no data found, then show no data found message.
  if (!data) {
    redData = $R_table_obj.$_zero(tableEle.querySelectorAll('thead>tr>th').length, 'No Data Found');
    tableEle.appendChild(redData);
    return true;
  }
  // rendering data into table using above profile.
  redData = $R_table_obj.$_simple(data, pb.mng.users.listing.t.list);

  // have look into plain HTML table
  //console.log(redData);

  tableEle.appendChild(redData)

  // update table status
  tableEle.setAttribute(atr.load.table, '1');

  // apply common renders
  $R_common_obj.$_call(tableEle);

  // for enable dropdown in the table.
  KTMenu.init();
  tableEle.setAttribute(atr.load.table, '1');
  return true;
}
/**
 * It makes the routing for both tabs(cards, tables)
 * @param element
 * @param event
 */
const navtabsTarget = function (element, event) {
  const navtab_cards = function (element, event) {
    const left_page = 1;
    return pagingTarget(element, {
      value: left_page,
      type : eTypes.paging,
      data : cardProfile.pageset[left_page]
    });
  }
  /**
   * It renders the table
   * @param element
   * @param event
   * @returns {boolean}
   */
  const navtab_table = function (element, event) {
    const _process = (data) => {
      return _process_table(data);
    }

    const _process_table = (data) => {

      // render the response data (if required)
      extend.foreign.$_remote('single', data, [['list', 'roles', '4', '0'], ['list', 'dates', '5', '0']]);
      // rendering data into table using above profile.
      tableFormation(element, data.list);

      //dataTablesInit(event.value);
      //filterEvents(event.value);

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

  // check the event value and call the respective function
  switch (event.value) {
    case pb.mng.users.listing.p.cards:
      return navtab_cards(element, event);

    case pb.mng.users.listing.p.table:
      return navtab_table(element, event);

    default:
      return eventNotFound(event);
  }
}


// loading form
export const MUL_navtabs = function (_event) {
  return eleCheck() ? navtabsTarget(get_callEl(), _event) : false;
};
export const MUL_paging = function (_event) {
  return eleCheck() ? pagingTarget(get_callEl(), _event) : false;
};


// fetching all upcoming required details
export const MUL_pageOpen = function () {
  return pageOpen();
};
