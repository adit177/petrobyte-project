/*
 ---------------------------------------------
 @@listening.js
 ------------c c
 Listing the HTML Layouts for event handling.
 *
 ---------------------------------------------
 */
import Initialize from "./initialize.js";
import Deploying from "./deploying.js";
import {CLS, exT, keys, kws} from "./const.js";
import {get_currentState, set_actionData, set_actionEl, set_currentState, set_LN} from "./global.js";
import {atr} from "./attributes.js";
import Handling from "./handling.js";
import {_pageLE} from "./elements.js";
import Routing from "./routing.js";

let fun = function () {

  const _listenWindows = () => {
    // Store data when the user is about to leave the page
    window.onbeforeunload = function () {
      alert('The page is about to be reloaded. Storing page data...');
      localStorage.setItem('pageData', JSON.stringify({
        // Store relevant page details here
      }));
    };

    // Retrieve data when the page is loaded
    window.onload = function () {
      alert('The page has been reloaded. Retrieving page data...');
      var pageData = localStorage.getItem('pageData');
      if (pageData) {
        // Parse and use the stored page details
        var parsedData = JSON.parse(pageData);
        // ...
        // Do something with the retrieved data
        // ...
        // Clear the stored data if needed
        localStorage.removeItem('pageData');
      }
    };

  }

  /**
   * this is defined a multiple type of listens
   * @private
   */
  const _listenPage = () => {

    // sidebar links
    _pageLE.sidebar.querySelectorAll('a[data-e-path]').forEach((navlink) => {
      navlink.addEventListener(kws.listen.click, () => {
        // active to the target
        navlink.classList.add(CLS.aside.active);

        // calling the HTML ajax
        const PageLoad = Initialize.Page(navlink.getAttribute(atr.event.path), keys.history.state.page);

        console.log(PageLoad);
        // layout init
        PageLoad.then(() => {
          Initialize.Layout({
            new: {},
            old: {}
          }, keys.history.state.fetch);
        })
      });
    });


    // toolbar links
    // _pageLE.toolbar.querySelectorAll('a[data-e-path]').forEach((navlink) => {
    //   navlink.addEventListener(kws.listen.click, () => {
    //     // calling the HTML ajax
    //     Initialize.Page(navlink.getAttribute(atr.event.path));
    //   });
    // });

    // header links
  };


  const deploy_selectEvent = (select, event, layout) => {
    // code.
    set_actionEl(select);
    set_actionData(event.params.data);

    toastr.info('select', 'event nature');

    // routing the action.
    const _event = {
      type : select.hasAttribute(atr.event.name) ? select.getAttribute(atr.event.name) : select.name,
      value: select.getAttribute(atr.event.value),
      place: select.getAttribute(atr.event.origin),
      data : select.value
    };
    // get event nature, by default: option.
    const eventNature = select.getAttribute(atr.event.nature) ?? keys.event.nature.option;
    Deploying.Layout(select, _event, kws.handler.select, layout, eventNature);
  }

  const deploy_inputEvent = (input, event, layout) => {
    // note: event nature for input is fixed as the option.
    // code.
    set_actionEl(input);
    set_actionData(event);

    toastr.info('option', 'event nature');

    // routing the action.
    const _event = {
      type : input.hasAttribute(atr.event.type)
        ? input.getAttribute(atr.event.type)
        : input.getAttribute(atr.event.name),
      value: input.getAttribute(atr.event.value),
      place: input.getAttribute(atr.event.origin),
      data : input.hasAttribute(atr.event.data)
        ? input.getAttribute(atr.event.data)
        : input.value
    };

    Deploying.Layout(input, _event, kws.handler.input, layout, keys.event.nature.option);
  }

  const deploy_elementEvent = (element, event, layout) => {
    // event to return true for any user action.
    set_actionEl(element);
    set_actionData(null);

    toastr.info('element', 'event nature');
    // event assignment as per user trigger.
    const _event = {
      type : element.getAttribute(atr.event.type),
      value: element.getAttribute(atr.event.value),
      place: element.getAttribute(atr.event.origin),
      data : element.getAttribute(atr.event.data),
    };

    Deploying.Layout(element, _event, kws.handler.element, layout);

  }

  const deploy_anchorEvent = (anchor, event, layout) => {
    // event to return true for any user action.
    set_actionEl(anchor);
    toastr.info('anchor', 'event nature');
    const eventNature = anchor.getAttribute(atr.event.nature) ?? keys.event.nature.get;
    console.log(eventNature);

    const __anchor_request = () => {
      // event assignment as per user trigger.

      const _event = {
        type : anchor.hasAttribute(atr.event.name)
          ? anchor.getAttribute(atr.event.name)
          : anchor.getAttribute(atr.event.type),
        value: anchor.getAttribute(atr.event.value),
        place: anchor.getAttribute(atr.event.origin),
        data : anchor.getAttribute(atr.event.data),
      };
      Deploying.Layout(anchor, _event, kws.handler.anchor, layout, eventNature);
    }

    const __anchor_ignore = () => {
      Deploying.Ignore(anchor, layout, kws.handler.anchor);
    }

    function __anchor_redirect() {
      Initialize.Redirect(anchor.getAttribute(atr.event.path), anchor.getAttribute(atr.event.params));
    }

    // targeting the event.
    switch (eventNature) {
      case keys.event.nature.ignore:
        __anchor_ignore();
        break;
      case keys.event.nature.back:
        alert('back hit by anchor, kindly add now');
        break;
      case keys.event.nature.forward:
        alert('forward hit by anchor, kindly add now');
        break;
      case keys.event.nature.get:
        __anchor_request();
        event.stopPropagation();
        break;
      case keys.event.nature.post:
        __anchor_request();
        event.stopPropagation();
        break;
      case keys.event.nature.option:
        __anchor_request();
        event.stopPropagation();
        break;
      case keys.event.nature.redirect:
        __anchor_redirect();
        break;
    }
  }

  const deploy_buttonEvent = (trigger, event, layout) => {

    const __button_request = (button, event, layout, nature) => {
      // event to return true for any user action.
      set_actionEl(button);

      // event assignment as per user trigger.
      const _event = {
        value : button.value,
        type  : button.hasAttribute(atr.event.name) ? button.getAttribute(atr.event.name) : button.name,
        place : button.getAttribute(atr.event.origin),
        data  : button.getAttribute(atr.event.data) ? button.getAttribute(atr.event.data) : button.getAttribute(atr.event.value),
        switch: button.getAttribute(atr.event.switch) ?? null,
      };

      // routing the action.
      Deploying.Layout(button, _event, kws.handler.button, layout, nature);
    }
    const __button_move = (trigger, event, nature) => {
      // calling the back routing.
      // get id.
      const iddd = trigger.closest('div.sub-zone') === null ? trigger.closest('div.zone') : trigger.closest('div.sub-zone');

      const _eventObject = {
        element: trigger,
        id     : iddd.id,
        event  : event,
        state  : get_currentState()
      }

      switch (nature) {
        case keys.event.nature.back:
          Routing.Back(_eventObject).then((response) => {
            Handling.History(kws.history.back);
          });
          break;
        case keys.event.nature.forward:
          Routing.Forward(_eventObject).then((response) => {
            Handling.History(kws.history.forward);
          });
      }
    }
    const __button_redirect = (trigger, event) => {
      Initialize.Redirect(trigger.getAttribute(atr.event.path), trigger.getAttribute(atr.event.params));
    }
    const __button_ignore = () => {
      Deploying.Ignore(trigger, layout, kws.handler.button);
    }

    const eventNature = trigger.getAttribute(atr.event.nature) ?? keys.event.nature.get;

    // targeting the event.
    switch (eventNature) {
      case keys.event.nature.ignore:
        __button_ignore();
        break;

      case keys.event.nature.back:
        toastr.info('back', 'event nature');
        __button_move(trigger, event, eventNature);
        break;

      case keys.event.nature.forward:
        toastr.info('forward', 'event nature');
        __button_move(trigger, event, eventNature);
        break;

      case keys.event.nature.get:
        toastr.info('get', 'event nature');
        __button_request(trigger, event, layout, eventNature);
        event.stopPropagation();
        break;

      case keys.event.nature.post:
      case keys.event.nature.hybrid:
        toastr.info('post', 'event nature');
        __button_request(trigger, event, layout, eventNature);
        event.stopPropagation();
        break;

      case keys.event.nature.redirect:
        toastr.info('redirect', 'event nature');
        __button_redirect(trigger, event);
        event.stopPropagation();
        break;

      default:
        toastr.info('default', 'event nature');
        __button_request(trigger, event, layout, eventNature);
        event.stopPropagation();
        break;
    }

  }


  const _listenLayout = (trigger, handler, layout) => {
    switch (handler) {
      case kws.handler.button:
        trigger.addEventListener(kws.listen.click, function (event) {
          deploy_buttonEvent(trigger, event, layout);
        });
        // {capture: true}
        break;


      case kws.handler.input:
        const listen = trigger.getAttribute(atr.event.listen) ?? kws.listen.change;
        trigger.addEventListener(listen, function (event) {
          deploy_inputEvent(trigger, event, layout);
          event.stopPropagation();
        });
        break;


      case kws.handler.element:
        trigger.addEventListener(kws.listen.click, function (event) {
          deploy_elementEvent(trigger, event, layout);
        });
        break;


      case kws.handler.select:
        $(trigger).on(kws.listen.select2, function (event) {
          deploy_selectEvent(trigger, event, layout);
          event.stopPropagation();
        });
        break;


      case kws.handler.anchor:
        trigger.addEventListener(kws.listen.click, function (event) {
          deploy_anchorEvent(trigger, event, layout);
        });
        break;
    }
  }

  const _listenHistory = () => {

    /// popstate
    window.addEventListener("popstate", function (event) {
      // The popstate event is fired each time when the current history entry changes.

      toastr.success('POP-State event listen', 'history API - POP');

      // this is the previous one, final will be changed on promise finally done.
      const newState = event.state;
      const oldState = get_currentState();


      // console.log(history.state);
      console.log('popstate: ', event.state);
      // console.log(`target location : ${document.location}, state: ${JSON.stringify(event.state)}`);
      // console.log('newState: ', newState);
      // console.log('oldState: ', oldState);

      // this call to handle the changes on history.
      Initialize.History(newState, oldState);
    });

    // pageShow
    window.addEventListener("pageshow", function (event) {
      console.log('pageshow: ', event);
    });
  }

  // public access functions.
  return {


    /**
     * listening to the windows
     * @constructor
     */
    Windows: function () {
      _listenWindows();
    },

    /**
     * main page listening
     * @constructor
     */
    Page: function () {
      _listenPage();
    },


    /**
     * newly loaded layout listening
     * @param trigger
     * @param handler
     * @param layout
     * @constructor
     */
    Layout: function (trigger, handler, layout) {
      _listenLayout(trigger, handler, layout);
    },


    /**
     * history listening
     * @constructor
     */
    History: function () {
      _listenHistory();
    }
  }
};

const Listening = fun();
export default Listening;
