import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {CLS, exT, keys, rdR} from "../../../base/const.js";
import {_listingLE} from "../../../base/elements.js";
import {$R_common_obj, $R_form_obj, $R_paging_obj, $R_table_obj} from "../../../base/render.js";
import {atr} from "../../../base/attributes.js";
import AjaxPB, {call_AJAX_GET, call_AJAX_POST} from "../../../base/ajax.js";
import {eTypes} from "../../../base/events.js";
import extend from "../../../extend/extend.js";
import PB_defined from "../../../base/defined.js";
import {getStateData} from "../../../bucket/state.js";
// Shared variables
let StateData;
let tableEle, redData;
let pageButtonProfile = {};


const pageOpen = (data) => {

  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    let _return = true;

    _return &&= _process_load_static_info(data);
    _return &&= _process_load_paging();
    _return &&= _process_toggle();
    _return &&= _process_render_into_form(getStateData(['employees'])['employees']);

    console.log(_return);
    return _return;
  }

  const _process_toggle = () => {
    PB_defined.$_toggle_advance_search(_listingLE.cards, "Advance")
    return true;
  }
  const _process_render_into_form = (data) => {
    let newArray = [];
    for (const dataKey in data) {
      newArray.push(data[dataKey][1]);

    }
    return $R_form_obj.$global({employees: newArray}, _listingLE.cards, rdR.form.method.tagifyOnly);
  }
  const _process_load_static_info = (data) => {
    StateData = data['pageState'];

    // render form
    const formEle = _listingLE.cards.querySelector('form');
    $R_form_obj.$global(getStateData([keys.stateData.posts]), formEle, rdR.form.method.simple);

    // update employees number
    let tarEle = _listingLE.action.querySelector('h3>span');
    tarEle.innerHTML = StateData.active;

    return true;
  }

  const _process_load_paging = () => {
    // run the pagination.
    $R_paging_obj.$cards(
      _listingLE.cards.querySelector(querySA(atr.core.control, 'cards')),
      StateData
    );

    // get the profile as per pagination.
    pageButtonProfile = $R_paging_obj.getProfile;
    console.log(pageButtonProfile);

    return true;
  }

  return _process(data.data);
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Listing');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Listing');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}


/**
 * It changes the active state of paging
 * @param element
 * @param event
 */
const pagingTarget = function (element, event) {
  console.log(event)

  $R_paging_obj.$trigger(element, event);

  // It targets the particular card and handles all rendering of the data inside the card

  // target ele for all the operations
  let targetEle = element.querySelector(querySA(atr.core.target, 'load'));
  // get target div as per pageNo
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
    return Promise.resolve(true);
  }
  const _process = (data) => {
    data = data.data;
    let _return = true;
    _return &&= _process_key_match(data);
    _return &&= _process_load_cards(data.employees);
    return _return;
  }

  const _process_key_match = (data) => {
    extend.foreign.$_remote(
      exT.foreign.combine,
      {...data, ...getStateData([keys.stateData.posts])},
      [
        ["employees", "posts", "post_id", 1]
      ]
    );
    return true;
  }
  const _process_load_cards = (data) => {
    let template = _listingLE.template.querySelector(querySA(atr.core.template, pb.mng.employees.listing.p.cards));

    // vars
    let progress;
    // duplicate the template and add the data to it.
    Object.keys(data).forEach((key, index) => {
      let node = template.children[0].cloneNode(true);
      node.removeAttribute(atr.core.template);
      let nodeData = data[key];

      //      // hide and show the tags
      //      let tags = node.querySelector('[data-pb-target="tags"]');
      //      // hiding not available tags
      //      Object.keys(nodeData.tags).forEach((tag, index) => {
      //        if (!nodeData.tags[tag]) {
      //          tags.querySelector('span[name="' + tag + '"]').classList.add(CLS.display.none);
      //        }
      //      });

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

  return call_AJAX_GET({
    act : event.value,
    type: event.type,
    page: event.data,
  }, _process);
}
/**
 * It loads the table  as well as integrates with datatables
 * @param element
 * @param button
 * @returns {boolean}
 */
const tableFormation = function (element, data) {
  tableEle = element.querySelector('table');

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
  redData = $R_table_obj.$_simple(data, pb.mng.employees.listing.t.list);

  // have look into plain HTML table
  tableEle.appendChild(redData)

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
    if (!element.classList.contains('active')) {
      element.classList.add('show');
      element.classList.add('active');
    }

    const playing_with_footer = () => {
      // show card footer in case of search
      const footer = _listingLE.cards.querySelector(querySA(atr.core.target, 'footer'));

      footer.classList.remove(CLS.display.none);

      const cards_per_page = footer.querySelector('[data-pb-control="size"]');

      // load the page size
      $R_form_obj.$global(StateData, cards_per_page.querySelector('select'), rdR.form.method.single);
    }
    playing_with_footer();

    const left_page = 1;
    console.log(pageButtonProfile.pageset);
    return pagingTarget(element, {
      value: left_page,
      type : eTypes.paging,
      data : pageButtonProfile.pageset[left_page]
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
      return _process_table(data.data);
    }

    const _process_table = (data) => {

      // render the response data (if required)
      //      extend.foreign.$_remote(
      //        exT.foreign.combine,
      //        {...data, ...getStateData([keys.stateData.posts])},
      //        [['lists', 'posts', '3', '1']]
      //      );

      // rendering data into table using above profile.
      PB_defined.$_append_table_simple(
        element.querySelector('table'),
        data.lists,
        pb.mng.employees.listing.t.list
      );

      return true;
    }

    return call_AJAX_GET({
      act : event.value,
      type: event.type
    }, _process);
  }

  // check the event value and call the respective function
  switch (event.value) {
    case pb.mng.employees.listing.p.cards:
      return navtab_cards(element, event);

    case pb.mng.employees.listing.p.table:
      return navtab_table(element, event);

    default:
      return eventNotFound(event);
  }
}

const alterTarget = function (element, event) {
  console.log(element, event);

  element.querySelector(querySA(atr.core.control, "cards")).setAttribute(atr.core.size, event.data);

  // empty the target element
  const cardList = element.querySelector(querySA(atr.core.target, "load"));
  cardList.replaceChildren();

  // reinit the pagination
  $R_paging_obj.$cards(
    _listingLE.cards.querySelector(querySA(atr.core.control, 'cards')),
    StateData
  );

  // get the profile as per pagination.
  pageButtonProfile = $R_paging_obj.getProfile;

  const left_page = 1;
  return pagingTarget(element, {
    value: left_page,
    type : eTypes.paging,
    data : pageButtonProfile.pageset[left_page]
  });
}

const actionTarget = function (element, event) {
  console.log(element, event);

  const action_search = function () {

    action_close('search');

    const _process = (data) => {
      data = data.data;
      let _return = true;
      _return && _process_foreign(data);
      _return && _process_search(data);
      return _return;
    }

    const _process_foreign = (data) => {
      extend.foreign.$_remote(
        exT.foreign.combine,
        {...data, ...getStateData([keys.stateData.posts])},
        [
          ["employees", "posts", "post_id", 1]
        ]
      );
      return true;
    }

    const _process_search = (data) => {

      // get the card template
      let cardTemplate = _listingLE.template.querySelector(querySA(atr.core.template, "cards", 'div'));

      // create a grid
      let childNode = document.createElement('div');
      childNode.classList.add("row", "g-6");

      // create blocks
      for (let i = 0; i < data.employees.length; i++) {
        let node = cardTemplate.cloneNode(true);
        node.innerHTML = extend.append.$_single_on_innerHTML(node, data.employees[i]);
        $R_common_obj.$_call(node);
        childNode.append(node);
      }

      // append search results
      element.querySelector(querySA(atr.core.target, "search")).append(childNode);

      return true;
    }

    // collect form data.
    const formData = {
      search_keyword: element.querySelector(querySA(atr.core.catch, "search_value")).value
    };
    return call_AJAX_POST({
      act : event.value,
      type: event.type
    }, formData, _process, false);
  }

  const action_close = function (toggle = 'load') {
    if (toggle === 'load') {
      // hide search part
      element.querySelector(querySA(atr.core.target, "search")).classList.add(CLS.display.none);
      element.querySelector(querySA(atr.core.catch, "close")).classList.add(CLS.display.none);

      // show load part
      element.querySelector(querySA(atr.core.target, "load")).classList.remove(CLS.display.none);
      element.querySelector(querySA(atr.core.target, "footer")).classList.remove(CLS.display.none);
      return Promise.resolve(true);
    }
    else {
      // hide load part
      element.querySelector(querySA(atr.core.target, "load")).classList.add(CLS.display.none);
      element.querySelector(querySA(atr.core.target, "footer")).classList.add(CLS.display.none);

      // show search part
      element.querySelector(querySA(atr.core.target, "search")).classList.remove(CLS.display.none);
      element.querySelector(querySA(atr.core.catch, "close")).classList.remove(CLS.display.none);
      // empty
      element.querySelector(querySA(atr.core.target, "search")).replaceChildren();
    }
  }

  const action_advance = function () {

    action_close('search');

    //hide the form.
    const advanceBtn = _listingLE.cards.querySelector(querySA(atr.core.catch, "advance"))
    advanceBtn.classList.add('collapsed');
    const id = advanceBtn.getAttribute('href');
    _listingLE.cards.querySelector(`div${id}`).classList.remove('show');

    const _process = (data) => {
      data = data.data;
      let _return = true;

      _return && _process_foreign(data);
      _return && _process_advance_search(data);

      return _return;
    }
    const _process_foreign = (data) => {
      extend.foreign.$_remote(
        exT.foreign.combine,
        {...data, ...getStateData([keys.stateData.posts])},
        [
          ["employees", "posts", "post_id", 1]
        ]
      );
      return true;
    }
    const _process_advance_search = (data) => {

      let cardTemplate = _listingLE.template.querySelector(querySA(atr.core.template, "cards", 'div'));

      let childNode = document.createElement('div');
      childNode.classList.add("row", "g-6");
      for (let i = 0; i < data.employees.length; i++) {
        let node = cardTemplate.cloneNode(true);
        node.innerHTML = extend.append.$_single_on_innerHTML(node, data.employees[i]);
        $R_common_obj.$_call(node);
        childNode.append(node);
      }
      element.querySelector(querySA(atr.core.target, "search")).append(childNode);

      return true;

    }

    const formElement = element.querySelector('form');
    const formData = extend.collect.$_form_simple(formElement);

    return call_AJAX_POST({
      act : event.value,
      type: event.type,
    }, formData, _process, false);
  }

  switch (event.value) {
    case pb.mng.employees.listing.c.cards.search:
      return action_search();

    case pb.mng.employees.listing.c.cards.close:
      return action_close('load');

    case pb.mng.employees.listing.c.cards.advance:
      return action_advance();
  }
}


const get = function (event) {
  switch (event.type) {
    case eTypes.navtab:
      return eleCheck() ? navtabsTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      alert(`eventType: ${event.type}, not GET, change nature to POST`);
      return Promise.reject('Invalid Event Type');
  }
}
const post = function (event) {
  switch (event.type) {

    case eTypes.action:
      return eleCheck() ? actionTarget(get_callEl(), event) : Promise.reject('Invalid call Element');


    default:
      return Promise.reject('Invalid Event Type');
  }
}
const option = function (event) {
  switch (event.type) {
    case eTypes.alter:
      return eleCheck() ? alterTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    case eTypes.paging:
      return eleCheck() ? pagingTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}


export const MEL_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('MEL_Requests', 'Request Type: ' + type);
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
