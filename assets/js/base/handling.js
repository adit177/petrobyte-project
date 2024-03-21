/*
 ---------------------------------------------
 @@handling.js
 ------------
 Handing the events action of the elements for the element.
 *
 ---------------------------------------------
 */
import {CLS, kws} from "./const.js";
import Holding from "./holding.js";
import {influenceEvents} from "./events.js";
import {atr} from "./attributes.js";
import {_pageLE} from "./elements.js";
import {get_thePath, get_thePathArr} from "./global.js";
// Class definition
let fun = function () {


  const _handleDOM = () => {
    // none.
    const page_loader = (text = '', overlay = false) => {
      const loadingEl = document.createElement("div");
      document.body.prepend(loadingEl);
      loadingEl.classList.add("page-loader");
      loadingEl.classList.add("flex-column");
      if (overlay === true) {
        loadingEl.classList.add("bg-dark");
        loadingEl.classList.add("bg-opacity-25");
      }

      loadingEl.innerHTML = `
        <span class="spinner-border text-primary" role="status"></span>
        <span class="text-muted fs-6 fw-semibold mt-5">Loading...</span>
        <span>${text}</span>
    `;
    }
  }

  const _handleApp = (data) => {
    const path = get_thePath();
    const pathArr = get_thePathArr();
    console.log(path);
    // update the page path.
    _pageLE.breadcrumb.querySelectorAll('[data-pb-update="path"]')
      .forEach((ele, index) => {
        ele.innerHTML = data.path[index];
      });
    // update page name
    _pageLE.breadcrumb.querySelector('[data-pb-update="name"]').innerText = data.name;

    // update the page title.
    document.title = data.title;

    const menuItem = (ele, blind) => {
      if (blind) {
        ele.querySelectorAll('div.pb_group.hiding').forEach((subEle) => {
          subEle.classList.remove(...CLS.aside.left);
        });
      }
      else {
        ele.querySelectorAll('div.pb_group').forEach((subEle) => {
          subEle.getAttribute(atr.core.label) === pathArr[1]
            ? subEle.classList.add(...CLS.aside.open)
            : subEle.classList.remove(...CLS.aside.open);
        });
      }
    }

    const coreMenu = (ele) => {
      // open and close the head
      if (ele.getAttribute(atr.core.label) === pathArr[0]) {
        ele.classList.add(...CLS.aside.open)
        // open and close the sub menu.
        menuItem(ele, false);
      }
      else {
        ele.classList.remove(...CLS.aside.open);
        menuItem(ele, true);
      }
    }

    const menuLink = (ele) => {
      // deactivate the menu-link if it is active and not matched with the page.
      ele.classList.remove(CLS.aside.active);
      // active the menu-link, if matched with the page.
      ele.getAttribute(atr.event.path) === path ? ele.classList.add(CLS.aside.active) : null;
    }

    // activate menu item.
    _pageLE.sidebar.querySelectorAll('div.pb_head').forEach(coreMenu);

    // link behavior management
    _pageLE.sidebar.querySelectorAll('a.menu-link.active').forEach(menuLink);
  }

  /**
   * @description This function is used to manage the event handling.
   * to control and event element to be disabled or enabled.
   * with the ability to change the text of the element.
   * and also to show or hide the element.
   * @param LayoutName
   * @param event
   * @param flow
   * @param Type
   */
  const _handleEvent = (LayoutName, event, flow = 1, Type) => {
    // it checks if the event is in the list of events to be handled.
    if (influenceEvents[LayoutName].indexOf(event.name) === -1) {
      return;
    }

    const handle_button_event = () => {
      console.log('button event is running.')

      // inner text
      let textBeforeHit = 'Click to Continue';
      // does the event has inner text element.
      const innerTextEle = event.querySelector('.btnText') !== null;
      // indicator attribute status
      const indicate = event.hasAttribute(atr.inbuild.indicator);

      // switch case to handle the event.
      switch (flow) {
        case 0: // OUT: exiting from the event operation.

          // display manage [show]
          if (event.classList.contains(CLS.display.s_me)) {
            event.classList.add(CLS.display.none);
            event.classList.replace(CLS.display.s_me, CLS.display.h_me);
          }

          // manage status
          event.disabled = false;

          // manage text
          if (innerTextEle) {
            event.querySelector('.btnText').innerText = textBeforeHit;
          }

          // manage indicator
          indicate ? event.setAttribute(atr.inbuild.indicator, 'off') : false;

          // manage background lock.
          KTApp.hidePageLoading();

          break;

        case 1: // IN: entering into the event operation.

          // display manage [hide]
          if (event.classList.contains(CLS.display.h_me)) {
            event.classList.add(CLS.display.none);
            event.classList.replace(CLS.display.h_me, CLS.display.s_me);
          }

          // manage status
          event.disabled = true;

          // manage text
          if (innerTextEle) {
            textBeforeHit = event.querySelector('.btnText').innerText;
            event.querySelector('.btnText').innerText = 'Please Wait...'
          }

          // manager indicator
          indicate ? event.setAttribute(atr.inbuild.indicator, 'on') : false;

          // manage background lock.
          KTApp.showPageLoading();

          // remove event listen
          // event.removeEventListener('click');


          break;
      }
    }


    // check an event type and route the target.
    switch (Type) {
      case kws.handler.anchor:
        //
        break;
      case kws.handler.button:
        handle_button_event();
        break;
      case kws.handler.dropdown:
        //
        break;
      case kws.handler.select:
        //
        break;
      case kws.handler.input:
        //
        break;
      case kws.handler.element:
        //
        break;
    }
  }

  const _handleLayout = (eventEle, layouts) => {

    //@todo--required. this function is not completed yet.
    const layoutPositionReset = () => {
      // reset the position of the layout.
      // if eventEle ha attribute of `data-e-memory`, then it will be used.
      console.log('layout position reset is running.');

      const memory = eventEle.hasAttribute(atr.event.memory)
        ? eventEle.getAttribute(atr.event.memory)
        : kws.attrVal.lost;

      switch (memory) {
        case kws.attrVal.lost:
          // do nothing.
          break;
        case kws.attrVal.retain:
          // do nothing.
          break;
      }

    }

    // enable ghost mode for `from`
    const ghostMode = (layout) => {
      Holding.Target(layout).layout.classList.add(CLS.display.none);
    }

    // enable human mode for `to`
    const humanMode = (layout) => {
      Holding.Target(layout).layout.classList.remove(CLS.display.none);
    }

    // execute.
    layoutPositionReset();
    ghostMode(layouts.from);
    humanMode(layouts.to);
  }

  /**
   * @description This function is used to handle the history of the browser.
   *      history.pushState({ page: 1 }, "title 1", "?page=1");
   *      history.pushState({ page: 2 }, "title 2", "?page=2");
   *      history.replaceState({ page: 3 }, "title 3", "?page=3");
   *      history.back(); // Logs "location: http://example.com/example.html?page=1, state: {"page":1}"
   *      history.back(); // Logs "location: http://example.com/example.html, state: null"
   *      history.go(2); // Logs "location: http://example.com/example.html?page=3, state: {"page":3}"
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API
   * @param what
   * @param stateObj
   * @param title
   * @param URL
   * @private
   */
  function _handleHistory(what, stateObj, title, URL) {

    // number of pages in the history stack
    const numberOfEntries = history.length;

    // might require when a user restarts or reloads the page.
    const currentState = history.state;

    /**
     * Suppose now that the user navigates to https://google.com, then clicks the Back button. At this point, the URL bar will display https://mozilla.org/bar.html and history.state will contain the stateObj. The popstate event won't be fired because the page has been reloaded. The page itself will look like bar.html.
     * @private
     */
    const __back = () => history.back()
    const __forward = () => history.forward();
    const __go = (x) => history.go(x);

    /**
     * history.replaceState() operates exactly like history.pushState(), except that replaceState() modifies the current history entry instead of creating a new one. Note that this doesn't prevent the creation of a new entry in the global browser history.
     * @private
     */
    const __replace = () => {
      history.replaceState(stateObj, title, URL);
    }

    const __push = () => {
      history.pushState(stateObj, title, URL);
    }

    switch (what) {
      case kws.history.back:
        __back();
        break;
      case kws.history.forward:
        __forward();
        break;
      case kws.history.go:
        __go(stateObj.index);
        break;
      case kws.history.replace:
        __replace();
        break;
      case kws.history.push:
        __push();
        break;
    }
  }

  // Public methods
  return {
    /**
     * @description This function is used to manage the DOM handling.
     * @constructor
     */
    DOM: function () {
      _handleDOM();
    },

    /**
     * @description This function is used to manage the app.
     * @param data
     * @constructor
     */
    App: function (data) {
      _handleApp(data);
    },

    /**
     * @description This function is used to manage the history of the browser.
     * @param what
     * @param stateObj
     * @param title
     * @param URL
     * @constructor
     */
    History: function (what, stateObj = {}, title = "", URL = '/') {
      _handleHistory(what, stateObj, title, URL);
    },
    /**
     * @description This function is used to manage the event handling.
     * @param Layout
     * @param Event
     * @param Flow
     * @param Type
     * @constructor
     */
    Event: function (Layout, Event, Flow, Type) {
      _handleEvent(Layout, Event, Flow, Type);
    },
    /**
     * @description This function is used to manage the layout switching.
     * @constructor
     */
    Layout: function (eventEle, layouts) {
      _handleLayout(eventEle, layouts);
    }
  };
};

const Handling = fun();
export default Handling;
