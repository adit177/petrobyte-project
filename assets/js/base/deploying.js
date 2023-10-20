import Routing from "./routing.js";
import Listening from "./listening.js";
import {$R_menu_obj, $R_modal_obj, $R_table_obj} from "./render.js";
import {get_callEl, get_currentState, get_layoutName, get_LN, get_LZone, get_thePath, get_thePathArr, set_callEl, set_currentState, set_layoutIndex, set_layoutName, set_LN} from "./global.js";
import Holding from "./holding.js";
import {glob, keys, kws, Lyt} from "./const.js"
import Handling from "./handling.js";
import Arranging from "./arranges.js";
import {blankEvents, eStore, eTypes, wlEvent} from "./events.js";
import {components} from "./components.js";
import {atr} from "./attributes.js";
import {exe_plugin_on_layout, exe_plugin_on_pageLoad, init_plugin_on_pageLoad, render_on_pageLoad} from "./plugins.js";
import Generate from "./generate.js";

let fun = function () {

  let LayoutNode;
  // user events
  let $userEvent = {};
  let $heldEvent = {};
  let $newEvent = {};
  let corePromise;


  Object.assign($userEvent, eStore);
  Object.assign($heldEvent, eStore);
  Object.assign($newEvent, eStore);

  const isEventValid = (layoutName, eventType) => {
    console.log(`called eventCheck for layout: ${layoutName}`);
    if (Object.values(wlEvent[layoutName]).indexOf(eventType) === -1) {
      alert(`Event is not WhileListed for ${layoutName}. add into wlEvent of events.js page.`);
    }
  }
  const defineOrigin = (event, button, layoutName) => {

    console.log(event);
    const _callEl = get_callEl();

    // if the place is null.
    if (event.place === null) {

      if (event.type === eTypes.open) {
        // to fix open page first time load.
        event.place = _callEl === undefined
          ? 'none'
          : _callEl.id;
      }
      else {

        // this is not fix for all, this can be changed as per the layout.
        if (_callEl === undefined) {
          event.place = Holding.Target(layoutName, 'zones')[Holding.Target(layoutName)['layout'].getAttribute(atr.event.welcome)].substring(1)
        }
        else {
          event.place = _callEl.getAttribute(atr.event.origin) === 'parent'
            // we put data-e-origin="parent" into callEl if we want to pick parent place.
            ? _callEl.closest('div.zone').id
            : _callEl.id
        }
      }


      // set attribute into the button.
      button === ''
        ? justPass()
        : button.setAttribute(atr.event.origin, event.place);
    }
  }

  const collect_userEvents = (layoutEl, layoutName) => {

    // remove the template element for a while.
    let temp_ele, temp_clone, temp_key;
    // checking for template
    temp_key = 'templates__' + layoutName;
    if (layoutEl.querySelector('#' + temp_key)) {
      temp_ele = layoutEl.querySelector('#' + temp_key);
      temp_clone = temp_ele.cloneNode(true);
      console.log(temp_ele);
      temp_ele.remove();
    }

    $userEvent.element = layoutEl.querySelectorAll('div[type="button"]');
    $userEvent.input = layoutEl.querySelectorAll(`input[${atr.event.listen}]`);
    $userEvent.select = layoutEl.querySelectorAll(`select[${atr.event.listen}]`);
    $userEvent.button = layoutEl.querySelectorAll('button[type="button"]');
    $userEvent.anchor = layoutEl.querySelectorAll('a[type="button"]');

    // re-assign the template element.
    if (temp_ele) {
      layoutEl.appendChild(temp_clone);
    }

    return true;
  }

  const collect_heldEvents = () => {
    const _callEl = get_callEl();
    console.log(_callEl);
    $heldEvent.element = _callEl.querySelectorAll('div[type="button"]');
    $heldEvent.input = _callEl.querySelectorAll('input[' + atr.event.listen + ']');
    $heldEvent.select = _callEl.querySelectorAll('select[' + atr.event.listen + ']')
    $heldEvent.button = _callEl.querySelectorAll('button[type="button"]');
    $heldEvent.anchor = _callEl.querySelectorAll('a[type="button"]');

    Object.seal($heldEvent);
    return true;
  }

  const collect_newEvents = (_targetCallEl) => {
    $newEvent.element = _targetCallEl.querySelectorAll('div[type="button"]');
    $newEvent.input = _targetCallEl.querySelectorAll('input[' + atr.event.listen + ']');
    $newEvent.select = _targetCallEl.querySelectorAll('select[' + atr.event.listen + ']')
    $newEvent.button = _targetCallEl.querySelectorAll('button[type="button"]');
    $newEvent.anchor = _targetCallEl.querySelectorAll('a[type="button"]');
    return true;
  }

  const event_handler = (nodes, layout) => {

    // looping the route function events
    for (let handlerKey in kws.handler) {
      if (nodes.hasOwnProperty(kws.handler[handlerKey]) && nodes[handlerKey].length) {
        $userEvent[handlerKey] = nodes[handlerKey]
      }

      // listen to all the events, and trigger the function.
      if ($userEvent[handlerKey]) $userEvent[handlerKey].forEach((trigger) => {
        // check if the element is already listening.
        console.log(trigger.hasAttribute(atr.direct.listen));
        if (trigger.hasAttribute(atr.direct.listen)) return true;
        // listen to the events.
        Listening.Layout(trigger, handlerKey, layout);
        // set the attribute to the event element.
        trigger.setAttribute(atr.direct.listen, '1');
      });
    }
  }

  const _deployNewEvents = (layoutName, element = false) => {
    console.log(layoutName, element);
    const _targetEl = element === false ? get_callEl() : element;
    console.log('--------------- deploy new events. (dne) -----------------');

    console.log(_targetEl);
    /*
     // manage the status.
     if (_targetEl.hasAttribute(atr.load.button)) {
     // this has not initiated yet
     return true;
     }
     */
    // process -> new events holding.
    // remove the button init status.
    for (const handleKey of Object.getOwnPropertyNames($newEvent)) {
      delete $newEvent[handleKey];
    }
    // putting default events.
    Object.assign($newEvent, eStore);
    // collect the new events.
    collect_newEvents(_targetEl);

    const e_filter_method_set_has = (new_events, old_events, handle) => {
      /*
       console.log('new_events', new_events);
       console.log('old_events', old_events);
       console.log('handle', handle);
       */
      // create a set of new events.
      eventsSetObject[handle] = new Set(new_events);
      // remove the events which are already there.
      old_events.forEach((event) => {
        eventsSetObject[handle].has(event) ? eventsSetObject[handle].delete(event) : justPass();
      });
    }

    const e_filter_method_set_attribute = (new_events, old_events, handle) => {
      /*
       console.log('new_events', new_events);
       console.log('old_events', old_events);
       console.log('handle', handle);
       */
      // create a set of new events.
      eventsSetObject[handle] = new Set(new_events);
      // remove the events which are already there.
      old_events.forEach((event) => {
        event.hasAttribute(atr.direct.listen) ? eventsSetObject[handle].delete(event) : justPass();
      });
    }

    // used common vars
    let eventsSetObject = {};
    let filteredEvents = {};
    const filterEvent = function (handle) {
      glob.env === kws.env.dev
        ? console.log('held', handle, $heldEvent[handle])
        : false;
      const storedEvent = Array.from($heldEvent[handle]);

      glob.env === kws.env.dev
        ? console.log('new', handle, $newEvent[handle])
        : false;
      const newCollection = Array.from($newEvent[handle]);


      // calling the method for filter newly created events.
      e_filter_method_set_attribute(newCollection, storedEvent, handle);
      // filteredEvents[handle] =

      glob.env === kws.env.dev
        ? console.log(eventsSetObject)
        : false;
      // check if there is any event for this handle to listen.
      if (eventsSetObject[handle].size > 0) {
        filteredEvents[handle] = [];
        // add the events to the array. to know more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach
        eventsSetObject[handle].forEach((value) => {
          filteredEvents[handle].push(value);
        });
      }
      console.log('filtered buttons for event: ', filteredEvents[handle]);
    }

    Object.values(kws.handler).forEach(filterEvent);


    glob.env === kws.env.dev
      ? console.log(filteredEvents)
      : false;

    for (const handleKey of Object.getOwnPropertyNames($userEvent)) {
      delete $userEvent[handleKey];
    }
    Object.assign($userEvent, eStore);

    Object.values(Lyt).includes(layoutName)
      ? listen_layout(filteredEvents, layoutName, true)
      : justPass();

    // setting the button event init status.
    _targetEl.setAttribute(atr.load.button, '1');
  }

  const getBlankEvents = (layoutName, type) => {
    switch (layoutName) {
      case Lyt.calendar:
        return blankEvents.calendar[type];

      case Lyt.dashboard:
        return blankEvents.dashboard[type];

      case Lyt.buttons:
        return blankEvents.buttons[type];

      case Lyt.panels:
        return blankEvents.panels[type];

      case Lyt.reports:
        return blankEvents.reports[type];

      case Lyt.sheets:
        return blankEvents.sheets[type];

      case Lyt.tabs:
        return blankEvents.tabs[type];

      case Lyt.cards:
        return blankEvents.cards[type];

      case Lyt.direct:
        return blankEvents.direct[type];

      case Lyt.tables:
        return blankEvents.tables[type];

      case Lyt.listing:
        return blankEvents.listing[type];

      case Lyt.wizards:
        return blankEvents.wizards[type];

      case Lyt.chats:
        return blankEvents.chats[type];

      case Lyt.sample:
        return blankEvents.sample[type];

      case Lyt.config:
        return blankEvents.config[type];

      case Lyt.stepper:
        return blankEvents.stepper[type];
    }
  }

  const simulateEvent = () => {
    // Create a synthetic click MouseEvent
    let evt = new MouseEvent("click", {
      bubbles   : true,
      cancelable: true,
      view      : window,
    });
  }

  const layout_Switcher = (eventEle, layoutName) => {
    // destiny layout
    const layouts = {
      from: layoutName,
      to  : eventEle.getAttribute(atr.event.switch)
    }

    Handling.Layout(eventEle, layouts);
    // passed layout
    console.log(eventEle, layoutName);
  }

  const _deployArranges = (eventObj, eventEle, layoutName) => {
    switch (layoutName) {
      case Lyt.tabs:
        Arranging._tabs(eventObj, eventEle);
        break;
      case Lyt.cards:
        Arranging._cards(eventObj, eventEle);
        break;
      case Lyt.reports:
        Arranging._reports(eventObj, eventEle);
        break;
      case Lyt.tables:
        Arranging._tables(eventObj, eventEle);
        break;
      case Lyt.buttons:
        Arranging._buttons(eventObj, eventEle);
        break;
      case Lyt.direct:
        Arranging._directs(eventObj, eventEle);
        break;
      case  Lyt.panels:
        Arranging._panels(eventObj, eventEle);
        break;
      case Lyt.listing:
        Arranging._listing(eventObj, eventEle);
        break;
      case Lyt.dashboard:
        Arranging._dashboards(eventObj, eventEle);
        break;
      case Lyt.sheets:
        Arranging._sheets(eventObj, eventEle);
        break;
      case  Lyt.wizards:
        Arranging._wizards(eventObj, eventEle);
        break;
      case  Lyt.chats:
        Arranging._chats(eventObj, eventEle);
        break;
      case Lyt.sample:
        Arranging._sample(eventObj, eventEle);
        break;
      case Lyt.config:
        Arranging._config(eventObj, eventEle);
        break;
      case Lyt.stepper:
        Arranging._stepper(eventObj, eventEle);
        break;
      case Lyt.kanban:
        Arranging._kanban(eventObj, eventEle);
    }
  }

  const _deployLayout = function (eventEle, eventObj, actionType, layoutName, eventNature) {

    console.log(eventObj, eventEle, actionType, layoutName, eventNature);

    set_LN(layoutName);
    //    _LN = layoutName;

    let eBlank;
    // checking the allow-listed event.
    isEventValid(layoutName, eventObj.type);

    // putting value in data-e-origin, if not set for the button.
    defineOrigin(eventObj, eventEle, layoutName);

    // collect blank event that will not hit targeted page file.
    eBlank = getBlankEvents(layoutName, actionType);
    // return the promise if the event is blank.
    if (eBlank.indexOf(eventObj.type) !== -1) return false;
    // handling the event
    Handling.Event(layoutName, eventEle, 1, actionType);

    // getting the call element as per new event hit
    Holding.Element(layoutName, eventObj, eventEle);

    // check for new event creations and holding targeted.
    const isNewButton = eventEle.hasAttribute(atr.event.recall)
      ? collect_heldEvents()
      : false;

    const isLayoutSwitcher = eventEle.hasAttribute(atr.event.switch)
      ? layout_Switcher(eventEle, layoutName)
      : false;

    const making_for_deployHistory = (bypass = false) => {

      // exit in case of other than GET request.
      if (!bypass && eventNature !== keys.event.nature.get) {
        return false;
      }

      // continue if event is GET.
      console.log(eventObj);
      const params = {
        act : eventObj.value,
        type: eventObj.type,
      }

      // to check that eventObj value on value kry or not
      // to generate a params object for the state object.
      // eventObj.data !== undefined
      if (eventObj.data !== null) {
        params.id = eventObj.data; // ...{id  : eventObj.data}
      }
      _deployHistory(keys.history.state.request, {
        params: params,
        event : eventObj
      });
    }

    const _routeTheRequest = () => {
      switch (eventNature) {
        case keys.event.nature.get:
          return Routing.Get(eventObj);

        case keys.event.nature.post:
        case keys.event.nature.hybrid:
          return Routing.Post(eventObj);

        case keys.event.nature.option:
          return Routing.Option(eventObj);
      }
    }
    const routePromise = eBlank.indexOf(eventObj.type) !== -1
      ? Promise.resolve(true)
      : _routeTheRequest();

    if (routePromise === undefined) {
      console.log('RoutePromise:', routePromise);
      alert('RoutePromise is undefined, add promise return in target JS file');
    }
    // calling the promise.
    routePromise
      .then((_targetReturn) => {
        // adding into the history.
        making_for_deployHistory(eventNature === keys.event.nature.hybrid);
        // reinitialize the layout if new buttons are created.
        isNewButton ? _deployNewEvents(layoutName) : justPass();
        // do HTML elements arrangement as per StateChange.
        _deployArranges(eventObj, eventEle, layoutName);
        // plugin render for the layout.
        _deployPlugins(kws.stage.layout, layoutName);
      })
      .catch((a) => {
        // exit the event
        Handling.Event(layoutName, eventEle, 0, actionType);
        // show the error.
        console.log('promise return in catch:', a);
      })
      .finally(() => {
        // deploy theme
        _deployTheme(true);
        // update the history current state.
        set_currentState(history.state); // _deployLayout -> all events in a layout by user.

        // --log
        console.log('this is final end of promise.');
      });
  }


  const _deployIgnore = function (eventEle, layoutName, actionType) {

    set_LN(layoutName);
    //    _LN = layoutName;

    // handling the event
    Handling.Event(layoutName, eventEle, 1, actionType);

    // check for new event creations and holding targeted.
    const isNewButton = eventEle.hasAttribute(atr.event.recall)
      ? collect_heldEvents()
      : false;

    // switch layout
    const isLayoutSwitcher = eventEle.hasAttribute(atr.event.switch)
      ? layout_Switcher(eventEle, layoutName)
      : false;

    const routePromise = new Promise((resolve, reject) => {
      // this is just for ignore event.
      // note: do not remove this 50ms timeout.
      setTimeout(() => {
        resolve(true);
      }, 50);
    });

    // calling the promise.
    routePromise
      .then((_targetReturn) => {
        // reinitialize the layout if new buttons are created.
        isNewButton ? _deployNewEvents(layoutName) : justPass();
        // plugin render for the layout.
        _deployPlugins(kws.stage.layout, layoutName);
      })
      .catch((e) => {
        // show the error.
        console.log('promise return in catch:', e);
      })
      .finally(() => {
        // deploy theme
        _deployTheme(false);
        // exit the event
        Handling.Event(layoutName, eventEle, 0, actionType);

        console.log('this is final end of promise.');
      });
  }


  /**
   * partition will always send get request to the server.
   * @param eventObj
   * @param actionType
   * @param layoutName
   *
   * @param historyObj
   */
  const _deployPartition = (eventObj, actionType, layoutName, historyObj) => {

    console.log(eventObj, actionType, layoutName);

    //    alert(JSON.stringify(eventObj));

    // set layout name
    set_LN(layoutName);

    let eventEle = '';
    const YES = true;

    // getting eventEle
    const layoutEle = Holding.Target(layoutName, undefined);
    const buttonEle = layoutEle.layout.querySelector(`button[type="button"][name="${eventObj.type}"][value="${eventObj.value}"]`);
    if (buttonEle instanceof HTMLElement) {
      eventEle = buttonEle;
    }

    // checking the allow-listed event.
    isEventValid(layoutName, eventObj.type);

    // create event.place for the event before call element.
    defineOrigin(eventObj, eventEle, layoutName);
    const eBlank = getBlankEvents(layoutName, actionType);
    // return the promise if the event is blank.
    if (eBlank.indexOf(eventObj.type) !== -1) return Promise.resolve(false);

    // setting call element
    Holding.Element(layoutName, eventObj, eventEle);

    // check for new event creations and holding targeted.
    const isNewButton = YES
      ? collect_heldEvents()
      : false;
    console.log(eBlank.indexOf(eventObj.type))
    const routePromise = eBlank.indexOf(eventObj.type) !== -1 ?
      Promise.resolve(true) :
      Routing.Get(eventObj);

    // check the promise
    if (routePromise === undefined) {
      console.log('RoutePromise:', routePromise);
      alert('RoutePromise is undefined, add promise return in target JS file');
    }
    console.log(routePromise)
    // start the process on the promise.
    return routePromise
      .then((_targetReturn) => {
        // adding state into the history.
        _deployHistory(historyObj.action, historyObj.state);
        // reinitialize the layout if new buttons are created.
        isNewButton ? _deployNewEvents(layoutName) : justPass();
        // do HTML elements arrangement as per StateChange.
        _deployArranges(eventObj, eventEle, layoutName);
        // plugin render for the layout.
        _deployPlugins(kws.stage.layout, layoutName);
      })
      .catch((err) => {
        // exit the event
        Handling.Event(layoutName, eventEle, 0, actionType);
        // show the error.
        console.log('promise return in catch:', err);
      })
      .finally(() => {
        // deploy theme
        _deployTheme(true);
        // update the history current state.
        set_currentState(history.state); // _deployPartition, from history or location

        // --log
        console.log('this is final end of promise.');
      });
  }


  function _deployRunPage(promises, history) {

    // get things
    const thePathArr = get_thePathArr();
    const thePath = get_thePath();
    // create var to store things on call.
    let _layoutName;

    // another in-dependant function calling.
    $R_table_obj.setPath(thePathArr);

    // open page process
    const PageOpen = () => {
      return promises.pageOpen
        // data has received from the server for the open page process.
        .then((data) => {
          // update the aside navigation CSS classes.
          Handling.App(data.map);
          // run the target path pageOpen function.
          return Routing.Open(data);

        })
        // run another thing after open page rendered using server data.
        .then((_return) => {
          // _return will be true. if the pageOpen function is handled.
          // add event listener for the page.
          _deployListening();

          // enable plugins for the page.
          _deployPlugins(kws.stage.page);

          // deploy history
          _deployHistory(history);
          return true;
        })
        .catch((err) => {
          console.log('pageOpen function is handled but return false');
          console.log(err);
          return false;
        })
        .finally(() => {
          toastr.success('page open success', 'Page Open Executed.');
          console.log('pageOpen process is done.');
        });
    }

    // insert the content and process
    return corePromise.then(() => {
      return promises.pageContent
        // it appends the HTMl content into layout.
        .then(_deployContent)
        .then(generateContent)
        .then((deployed) => {
          console.log('deployed:', deployed);
          // things that might be required for open page.
          set_callEl(undefined, false);

          // remove the old holding
          _destroyHolding('layout', _layoutName);

          // holding the layout
          _deployHolding();

          // store the layout name
          _layoutName = get_layoutName();

          return true;
        })
        .then((isHolding) => {
          return isHolding ? PageOpen() : false;
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {
          // init the theme.
          _deployTheme(true);
          // save page browser info into local storage.
          localStorage.setItem('pageData', JSON.stringify({
            layout : _layoutName,
            path   : thePath,
            pathArr: thePathArr,
            params : {},
          }));
        });
    });
  }

  /*
   --------------------------------------------------------------
   Layout routing.
   --------------------------------------------------------------
   */


  const listen_layout = (nodes = {}, layout, reInit = false) => {

    if (reInit) {
      // reInit in case of new buttons append in the loaded page,
      if (Object.keys(nodes).length) {
        event_handler(nodes, layout);
      }
      return true;
    }

    // get the layout
    const targetEle = Holding.Target(layout, 'layout');

    // store User Events
    collect_userEvents(targetEle, layout);

    // show the user events
    glob.env === kws.env.dev
      ? console.log($userEvent)
      : false;

    // initialize the layout
    event_handler(nodes, layout);
    return true;
  }

  const generateHTMLElement = () => {
    // create modals.
    $R_modal_obj.generateBootstrapModal(PBapp)

    // create menu.
    $R_menu_obj.generateMenuValueElement(PBapp);
  }


  const generateContent = () => {
    // buttons
    const $generate = new Generate();

    // buttons if existed.
    $generate.card_buttons__L_buttons(PBapp);


  }


  const _deployContent = (data, content = 'string') => {
    const thePathArr = get_thePathArr();
    const Layout_zone = document.getElementById('layout_zone');

    if (content === 'string') {
      Layout_zone.innerHTML = data;
      Object.defineProperty(components[thePathArr[0]][thePathArr[1]], thePathArr[2], {
        value   : data,
        writable: false
      });
    }
    else {
      Layout_zone.innerHTML = '';
      if (components[thePathArr[0]][thePathArr[1]][thePathArr[2]] === undefined) {
        Object.defineProperty(components[thePathArr[0]][thePathArr[1]], thePathArr[2], {
          value   : data.querySelector('body > div'),
          writable: false
        });
        Layout_zone.append(data.querySelector('body > div'));
      }
      else {
        Layout_zone.append(data);
      }
    }
    // generate HTML elements as per page.
    generateHTMLElement();

    glob.env === kws.env.dev
      ? console.log('content deployed')
      : false;
    return true;
  }

  /*
   ----------------------------------------------------------------
   Layout Handing Element Routing.
   ----------------------------------------------------------------
   */
  const _deployHolding = function (reCollect = false) {
    const _LZone = get_LZone();
    // holding HTML page from layout zone to handle them.
    LayoutNode = document.querySelector(_LZone);
    if (!LayoutNode) {
      alert('Kindly add the layout zone in HTML page.');
      return false;
    }

    set_layoutIndex([]);
    set_layoutName([]);
    // if multiple layouts exist. then we will handle them.
    const _layoutName = [];
    const _layoutIndex = [];
    // hold all zones of layouts.
    LayoutNode.children.forEach((layoutElement, index) => {
      _layoutName[index] = layoutElement.getAttribute(atr.core.layout);
      _layoutIndex[_layoutName[index]] = index;

      // check from a layout collection.
      Object.values(Lyt).includes(_layoutName[index]) ? justPass() : alert('undefined layout has used.');

      // holding the layout.
      Holding.Layout(_layoutName[index], layoutElement, reCollect);
    });

    set_layoutIndex(_layoutIndex);
    set_layoutName(_layoutName);


    // destroy Layout Node.
    LayoutNode = null;
    return true;
  }

  const _destroyHolding = (holdingType, params) => {
    Holding.Destroy(holdingType, params);
  }

  const _deployPlugins = (stage, layout = '') => {
    console.log('plugin initiated for the page, ' + stage);
    switch (stage) {
      case kws.stage.dom:
        corePromise.then(() => {
          init_plugin_on_pageLoad();
        });
        break;

      case kws.stage.page:
        corePromise.then(() => {
          exe_plugin_on_pageLoad();
          render_on_pageLoad();
        });
        break;

      case kws.stage.layout:
        // in case we want to render things on layout changes.
        const callEl = get_callEl();
        console.log(callEl)

        // note: place zone and subzone class.
        const zone = callEl.classList.contains('zone') ? callEl.id : callEl.closest('.zone').id;
        console.log(zone)
        exe_plugin_on_layout(layout, zone, false)
        break;
    }
  }

  const _deployTheme = (plugin = true) => {
    switch (plugin) {
      case true:
        // init the theme.
        KTComponents.init();
        break;
      case 'menu':
        KTMenu.init();
        break;

    }
  }

  const _deployHistory = (history, stateObj = {params: {}}) => {

    const thePathArr = get_thePathArr();
    const thePath = get_thePath();

    glob.env === kws.env.dev
      ? console.log(history, ' state: ', thePathArr)
      : false;

    console.log('state: ', stateObj);
    // handling the history.

    // common variables:
    let state = {};
    let relativeURL = '';

    switch (history) {
      case keys.history.state.page: // push
        Handling.History(
          kws.history.push,
          {
            pathArr: thePathArr,
            path   : thePath,
            params : {},
            body   : {}
          },
          thePathArr[2].toUpperCase(),
          thePath
        );
        break;

      case keys.history.state.load: // replace.
        Handling.History(
          kws.history.replace,
          {
            pathArr: thePathArr,
            path   : thePath,
            params : {},
            body   : {}
          },
          thePathArr[2].toUpperCase(),
          thePath
        );
        break;

      case keys.history.state.fetch: // replace
        state = {
          pathArr: thePathArr,
          path   : thePath,
          params : stateObj.params,
          event  : stateObj.event ?? {},
          body   : {}
        }


        if (Object.keys(stateObj.params).length) {
          const queryString = new URLSearchParams(state.params).toString();
          relativeURL = thePath + "?" + queryString;
        }
        else {
          relativeURL = thePath;
        }

        Handling.History(
          kws.history.replace,
          state,
          thePathArr[2].toUpperCase(),
          relativeURL
        );
        break;

      case keys.history.state.nothing:
        // nothing to do with these.
        break;

      case keys.history.state.request: // push.
      case keys.history.state.swap: // push.
        state = {
          pathArr: thePathArr,
          path   : thePath,
          params : stateObj.params,
          event  : stateObj.event,
          body   : {}
        }

        if (Object.keys(stateObj.params).length) {
          const queryString = new URLSearchParams(state.params).toString();
          relativeURL = thePath + "?" + queryString;
        }
        else {
          relativeURL = thePath;
        }

        Handling.History(
          kws.history.push,
          state,
          thePathArr[2].toUpperCase(),
          relativeURL
        );
        break;

      default:
      // true, false, undefined
    }
  }

  const _deployListening = () => {
    // refresh UserEvents
    for (const handleKey of Object.getOwnPropertyNames($userEvent)) {
      delete $userEvent[handleKey];
    }
    Object.assign($userEvent, eStore);

    const _layoutName = get_layoutName();
    // listening Layout
    _layoutName.forEach((layout) => {
      // checking the layout existence.
      Object.values(Lyt).includes(layout)
        ? listen_layout({}, layout, false)
        : justPass();
    });
  }

  const _deployCoreData = (promise) => {
    corePromise = promise;
  }


  /*
   ----------------------------------------------------------------
   Public returns
   ----------------------------------------------------------------
   */
  return {

    /**
     * this is the first function that called when DOM loaded to init the layout functionality
     * @constructor
     */
    Holding: function () {
      _deployHolding();
    },

    /**
     * this is the first function that called when DOM loaded to init the layout functionality
     * @param promises
     * @param history
     * @constructor
     */
    RunPage: function (promises, history) {
      return _deployRunPage(promises, history);
    },

    /**
     *
     * @param triggerElement
     * @param eventObj
     * @param handlerKey
     * @param layoutName
     * @param eventNature
     * @constructor
     */
    Layout: function (triggerElement, eventObj, handlerKey, layoutName, eventNature) {
      return _deployLayout(triggerElement, eventObj, handlerKey, layoutName, eventNature);
    },

    /**
     *
     * @param eventElement
     * @param layoutName
     * @param actionType
     * @constructor
     */
    Ignore: function (eventElement, layoutName, actionType) {
      return _deployIgnore(eventElement, layoutName, actionType);
    },

    /**
     *
     * @constructor
     */
    Arranges: function (eventObj, eventEle, layoutName) {
      _deployArranges(eventObj, eventEle, layoutName)
    },

    /**
     * @param eventObj
     * @param actionType
     * @param layoutName
     * @param historyObj
     * @returns {*}
     * @constructor
     */
    Partition: function (eventObj, actionType, layoutName, historyObj) {
      return _deployPartition(eventObj, actionType, layoutName, historyObj);
    },

    /**
     *
     * @param stage
     * @constructor
     */
    Plugins: function (stage) {
      _deployPlugins(stage);
    },

    /**
     *
     * @param layoutName
     * @param Element
     * @constructor
     */
    NewEvents: function (layoutName, Element) {
      _deployNewEvents(layoutName, Element);
    },

    /**
     *
     * @param promise
     * @constructor
     */
    CoreData: function (promise) {
      _deployCoreData(promise);
    },

    /**
     *
     * @constructor
     */
    History: (method, stateObj) => {
      _deployHistory(method, stateObj);
    }
  };
};

const Deploying = fun();
export default Deploying;