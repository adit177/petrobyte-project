/*
 ---------------------------------------------
 @@arranges.js
 ------------
 this class used to manage the html element of the layout
 manage elements as per the response getting from the target JS file using event handler.
 elements that are used in elements.js will be arranged here according the event passed by the user.
 ---------------------------------------------
 */
import {Lyt, exT, kws, CLS} from "./const.js";
import Handling from "./handling.js";
import {get_callEl, get_chartEl, get_passedEl, get_tableEl, get_triggerEl} from "./global.js";
import {atr} from "./attributes.js";
import {eTypes, eValues} from "./events.js";
import {_sheetLE, _cardLE, _buttonLE, _panelLE, _tabLE, _reportLE, _listingLE, _wizardLE, _directLE, _chatsLE, _configLE, _dashboardLE, _tableLE, _calendarLE, _kanbanLE, _sampleLE, _stepperLE, _pageLE} from "./elements.js";
import PB_extend_stepper from "../extend/stepper.js";
import pb from "./structure.js";

let fun = function () {

  // few common variables functions.
  const didntFind = (event) => {
    Object.values(kws.handleTag).includes(event.type)
      ? justPass()
      : toastr.error('kindly add case into the switch statement', 'Arrange is not setup for ' + event.type);
  }
  const showEventPresence = (e) => {
    toastr.warning('Arranges Called', e);
  }

  const _complex_changes = (type, element, _event, _trigger) => {
    switch (type) {
      case eTypes.navtab:

        const navbar = element.querySelector('#navbar');
        const navtab = element.querySelector('#navtab');
        // navbar
        navbar.querySelectorAll('li').forEach((li) => {
          // remove 'active' class from the nav buttons if the value is not same as the event value.
          if (li.children[0].value !== _event.value) {
            // remove active class from the button.
            li.children[0].classList.remove(CLS.visible.navs.bar.active);
            // hide the tab.
            navtab.querySelector('#' + li.children[0].value).classList.remove(...CLS.visible.navs.tab.active);
            navtab.querySelector('#' + li.children[0].value).classList.add(CLS.display.none);
          }
          else {
            // add active class into the button.
            li.children[0].classList.add(CLS.visible.navs.bar.active);
            // display the tab.
            navtab.querySelector('#' + _event.value).classList.add(...CLS.visible.navs.tab.active);
            navtab.querySelector('#' + _event.value).classList.remove(CLS.display.none);
          }
        });
        break;

      case 'statistics':
        // remove active class from the nav buttons.
        // const lists = _directLE.navtab.querySelector('[' + atr.core.append + '="' + trigger.name + '"]');
        const lists = element.querySelector('#' + _event.value)
          .querySelector('[' + atr.core.append + '="' + _trigger.name + '"]');
        lists.children.forEach((li) => {
          if (li.getAttribute(atr.core.value) !== _event.data) {
            li.children[0].classList.remove(CLS.visible.navs.bar.active);
          }
        });
        // add active class into the button.
        _trigger.classList.add(CLS.visible.navs.bar.active);

        // ---------------------------------------------

        // remove class from the tab.
        const tabs = element.querySelector('#' + _event.value + '-' + _event.type).children[0].children;

        tabs.forEach((tab) => {
          if (tab.getAttribute(atr.core.value) === _event.data) {
            tab.classList.remove(CLS.display.none);
            console.log(tab);
          }
          else {
            tab.classList.add(CLS.display.none);
          }
        });
        break;
    }
  }

  /**
   * this is sample for create arrange function for new layout.
   * @param _event
   * @param trigger
   */
  const sample = (_event, trigger) => {
    // adding the event to acknowledge the event.
    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.sample, trigger, 0, handler);

    // manage the layout elements as per the event type.
    switch (_event.type) {
      case eTypes.open:
        // open the element.
        return;
      case eTypes.load:
        // load the element.
        return;
      case eTypes.action:
        // action the element.
        return;
      case eTypes.stack:
        // not required.
        return;
      case eTypes.view:
        // not required.
        return;
      case eTypes.change:
        // not required.
        return;
      default:
        // if the event is not found.
        return didntFind(_event);
    }
  }

  const config = (_event, trigger) => {

    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.config, trigger, 0, handler);

    switch (_event.type) {
      case eTypes.navtab:
        _complex_changes(eTypes.navtab, _configLE.nav, _event, trigger);
        return;
      default:
        return didntFind(_event);
    }
  }

  const stepper = (_event, trigger) => {

    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.stepper, trigger, 0, handler);

    let $stepperLE;
    let $step;
    const $stepper = PB_extend_stepper.$_getObject(_event.place + '-stepper');
    if ($stepper !== undefined) {
      $stepperLE = $stepper.getElement();
      $step = $stepperLE.getAttribute(atr.core.step);
    }

    switch (_event.type) {
      case eTypes.load:
        $stepperLE.querySelectorAll(querySA(atr.other.stepper.action)).forEach((button) => {
          switch (button.getAttribute(atr.other.stepper.action)) {
            case exT.stepper.action.previous:
              // value update
              button.value = _event.value;
              // display update
              _event.data !== 1
                ? button.classList.remove(CLS.display.none)
                : button.classList.add(CLS.display.none);
              break;

            case exT.stepper.action.next:
              console.log(_event.data, $step * 1);
              if (_event.data === $step * 1) {
                // show submit and hide continue.
                button.classList.add(CLS.display.none);
              }
              else {
                button.value = $stepperLE.querySelector(querySA(atr.core.index, _event.data + 1)).id;
                button.classList.contains(CLS.display.none) ? button.classList.remove(CLS.display.none) : null;
              }
              break;

            case exT.stepper.action.finish:
              if (_event.data === $step * 1) {
                // show submit and hide continue.
                button.classList.remove(CLS.display.none);
              }
              else {
                button.classList.add(CLS.display.none);
              }
              break;
            case exT.stepper.action.reset:
              //
              break;
          }
        });
        // move
        switch (trigger.getAttribute(atr.other.stepper.action)) {
          case exT.stepper.action.previous:
            $stepper.goPrevious();
            break;
          case exT.stepper.action.next:
            $stepper.goNext();
            break;
          case exT.stepper.action.index:
            $stepper.goTo();
            break;
          case exT.stepper.action.finish:
            $stepper.goFirst();
            break;
        }
        break;

      case eTypes.feed:
        break;
      case eTypes.action:

        switch (_event.value) {

          case "update_available_itc":
            break;
          case "update_reverse_itc":
            break;

          default:
            $stepperLE.querySelectorAll(querySA(atr.other.stepper.action)).forEach((button) => {
              switch (button.getAttribute(atr.other.stepper.action)) {
                case exT.stepper.action.previous:
                  button.classList.add(CLS.display.none);
                  break;

                case exT.stepper.action.next:
                  button.classList.remove(CLS.display.none);
                  break;

                case exT.stepper.action.finish:
                  button.classList.add(CLS.display.none);
                  break;
              }
            });
        }

        // take the customer on the first step.
        switch (_event.value) {
          case exT.stepper.action.resend:
            //
            break;
          case exT.stepper.action.finish:
            $stepper.goFirst();
            break;

        }
        break;

      case eTypes.back:
        break;

      case eTypes.modal:
        break;

      default:
        return didntFind(_event);
    }
  }

  // there are functions to manage elements of the layout.
  const sheets = (_event, trigger) => {

    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.sheets, trigger, 0, handler);

    // manage the element as oer event type.
    switch (_event.type) {

      case eTypes.modal:
        return;

      case eTypes.load:
        // current element hide.
        _sheetLE[_event.place].classList.add(CLS.display.none);
        // targeted element show.
        _sheetLE[_event.value].classList.remove(CLS.display.none);
        return;

      case eTypes.action:
        // print, export, resize
        return;

      case eTypes.table:
        switch (_event.value) {
          case "transact":
            get_callEl().classList.remove(CLS.display.none);
            get_passedEl().classList.add(CLS.display.none);
        }
        return;


      case eTypes.back:
        console.log(_event);
        // hide the current sheet.
        _sheetLE[_event.place].classList.add(CLS.display.none);
        // show the targeted (previous) sheet.
        _sheetLE[_event.value].classList.remove(CLS.display.none);

        // reset the sheet data or table data.
        // targeted(origin) element for reset is data-pb-space="master"
        _sheetLE[_event.place].querySelectorAll('[' + atr.core.space + '="master"]').forEach((ele) => {
          // empty the loaded sheet.
          ele.innerHTML = ''
        });
        // remove the loaded attribute from the targeted(origin) element.
        _sheetLE[_event.place].removeAttribute(atr.status.loaded);

        return;
      default:
        return didntFind(_event);
    }
  }

  const reports = (_event, trigger) => {

    console.log(_event)
    console.log(get_callEl());
    console.log(get_passedEl());

    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.reports, trigger, 0, handler);

    /**
     * this function is used to handle the tab.
     * as per the event value, it will update the class of the nav and tab.
     */
    const nav_handling = () => {
      // display navlink if hide.
      _reportLE.navbar.classList.contains(CLS.display.none)
        ? _reportLE.navbar.classList.remove(CLS.display.none)
        : false;
      // target buttons active, else inactive.
      _reportLE.navbar.querySelectorAll('button').forEach((links) => {
        links.value === _event.value ? links.classList.add(CLS.visible.navs.bar.active) : links.classList.remove(CLS.visible.navs.bar.active);
      });
      // active the targeted tab, others are hidden.
      _reportLE.navtab.querySelectorAll('div.tab-pane[role="tabpanel"]').forEach((element) => {
        element.id === _event.value
          ? element.classList.add(...CLS.visible.navs.tab.active)
          : element.classList.remove(...CLS.visible.navs.tab.active);
      });
    }
    switch (_event.type) {

      case eTypes.open:
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        break;

      case eTypes.navtab:
        // special case of search.
        _event.value === 'search'
          // hide NavLink in case of search click for the new report.
          ? _reportLE.navbar.classList.add(CLS.display.none)
          : (
            _reportLE.navbar.classList.contains(CLS.display.none)
              // visible the navlink in case of the other tab click.
              ? _reportLE.navbar.classList.remove(CLS.display.none)
              : justPass()
          );
        // normal handling.
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl().classList.add(CLS.display.none);
        // nav handling.
        // nav_handling(_event.value);
        return;

      case eTypes.load:
        // normal handling.
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl().classList.add(CLS.display.none);
        console.log(_event);

        // tab handling.
        nav_handling();
        return;

      default:
        return didntFind(_event);
    }
  }

  const listing = (_event, trigger) => {
    console.log(_event)
    console.log(get_callEl());
    console.log(get_passedEl());
    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.listing, trigger, 0, handler);

    switch (_event.type) {
      case eTypes.open:
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        break;

      case eTypes.navtab:
        // hide the intro part, if contains the d-none class.
        _listingLE.intro.classList.contains(CLS.display.none) ? justPass() : _listingLE.intro.classList.add(CLS.display.none);
        // show the call element.
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        return;

      case eTypes.paging:
        return;
      case eTypes.action:
        break;
      case eTypes.alter:
        break;

      default:
        return didntFind(_event);
    }
  }

  const panels = (_event, trigger) => {

    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.panels, trigger, 0, handler);

    switch (_event.type) {
      case eTypes.load:
      case eTypes.goto:
        // hide search form and show outcome.
        _panelLE.search.classList.add(CLS.display.none);
        _panelLE.outcome.classList.remove(CLS.display.none);
        break;


      case eTypes.navtab:
        _complex_changes(eTypes.navtab, _panelLE.nav, _event, trigger);
        //getCallEl().classList.remove(CLS.display.none);
        break;

      case eTypes.tab:
        alert('event tab');
        return;

      case eTypes.back:
        // hide outcome and show search form.
        _panelLE.outcome.classList.add(CLS.display.none);
        _panelLE.search.classList.remove(CLS.display.none);
        // remove the active class from tab.
        _panelLE.outcome.querySelectorAll(_panelLE.zone.tab + ' > div').forEach((node) => {
          node.classList.remove(...CLS.visible.navs.tab.active);
        });
        // remove the active class from nav.
        _panelLE.outcome.querySelector(_panelLE.zone.nav).querySelectorAll('button').forEach((node) => {
          node.classList.remove(CLS.visible.navs.bar.active);
        });
        return;

      case eTypes.modal:
        // show the target
        get_callEl().classList.remove(CLS.display.none);
        // show modal
        let modal = new bootstrap.Modal(get_callEl());
        modal.show(); // modal.hide();modal.toggle();
        break;
      default:
        didntFind(_event);
        return;
    }
  }

  const tables = (_event, trigger) => {

    console.log(_event)
    console.log(get_callEl());
    console.log(get_passedEl());
    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.tables, trigger, 0, handler);

    switch (_event.type) {

      case eTypes.open:
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        break;

      case eTypes.table:
        get_callEl().classList.remove(CLS.display.none);
        console.log(get_passedEl());
        get_passedEl().classList.add(CLS.display.none);
        return;

      default:
        didntFind(_event);
        return;
    }
  }

  const cards = (_event, trigger) => {
    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.cards, trigger, 0, handler);

    console.log(_event)
    console.log(get_callEl());
    console.log(get_passedEl());
    // fix:
    _cardLE.tables.classList.add(CLS.display.none);

    switch (_event.type) {
      case eTypes.open:
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        break;

      case eTypes.card:
        // show the call element
        get_callEl().classList.remove(CLS.display.none);
        // hide the passed event element
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        break;

      case eTypes.action:
        break;

      case eTypes.navtab:
        alert('navtab has been deprecated');
        break;
      case eTypes.table:
        _cardLE.tables.classList.remove(CLS.display.none);
        // hide remaining tables.
        _cardLE.tables.querySelectorAll('table').forEach((node) => {
          if (node.getAttribute(atr.core.leave) !== _event.value) {
            node.classList.add(CLS.display.none);
          }
        });
        // data-e-value="payments"
        // manage the tab button of table.
        _cardLE.tables.querySelectorAll('a.menu-link[type="button"]').forEach((node) => {
          if (node.getAttribute(atr.event.value) === _event.value) {
            node.classList.add(CLS.display.active);
          }
          else {
            node.classList.remove(CLS.display.active);
          }
        });


        // show the call element
        get_callEl().classList.remove(CLS.display.none);
        // hide the passed event element
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        break;

      case eTypes.back:
        _cardLE[_event.value].classList.remove(CLS.display.none);
        _cardLE[_event.place].classList.add(CLS.display.none);
        // remove full screen mode.
        if (_event.value === _cardLE.menu.getAttribute(atr.core.leave)) {
          _cardLE.menu.classList.remove(CLS.display.none);
          _cardLE.boards.classList.remove(...CLS.screen.full.all);
        }
        break;
      case eTypes.change:
        // just pass.
        break;

      default:
        didntFind(_event);
        return;
    }
  }

  const buttons = (_event, trigger) => {

    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.buttons, trigger, 0, handler);

    const manageState = (eventType) => {
      switch (eventType) {
        case eTypes.open:
          get_callEl().classList.remove(CLS.display.none);
          get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
          break;

        case eTypes.form:
          get_callEl().classList.remove(CLS.display.none);
          get_passedEl().classList.add(CLS.display.none);
          break;

        case eTypes.table:
          get_callEl().classList.remove(CLS.display.none);
          get_passedEl().classList.add(CLS.display.none);
          break;

        case eTypes.modal:
          // show modal
          const modalEle = _buttonLE.modals.querySelector('#transaction-modal > div');

          let modal = new bootstrap.Modal(modalEle);
          modal.show(); // modal.hide();modal.toggle();

          /// hide others body and show own body.
          const modal_body = modalEle.getElementsByClassName('modal-body')[0];
          modal_body.children.forEach((child) => {
            child.id === _event.value + '-' + _event.type
              ? child.classList.remove(CLS.display.none)
              : child.classList.add(CLS.display.none);
          });
          break;

        case eTypes.card:
          // show the target card.
          get_callEl().classList.remove(CLS.display.none);
          get_passedEl().classList.add(CLS.display.none);
          break;

        case eTypes.action:
          get_callEl().classList.remove(CLS.display.none);
          break;

        case eTypes.load:
          // no changes in load event, yet.
          break;

        //      case eTypes.card:
        //        _xLE. _buttonLE.cards.querySelector('#' + trigger.getAttribute(atr.core.target)).classList.add(CLS.display.none);
        //       getCallEl().classList.remove(CLS.display.none);
        //        break;

        case eTypes.element:
          console.log(_buttonLE.zones)
          _buttonLE.elements.classList.remove(CLS.display.none);
          _buttonLE.buttons.classList.add(CLS.display.none);
          _buttonLE.menu.classList.add(CLS.display.none);
          get_callEl().classList.remove(CLS.display.none);
          break;

        case eTypes.back:
          get_callEl().classList.remove(CLS.display.none);
          get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
          break;

        case eTypes.navtab:
          get_callEl().classList.remove(CLS.display.none);
          let target = _buttonLE.forms.querySelector('#' + _event.place)
          target.querySelectorAll('li').forEach((item) => {
            item.children[0].classList.remove(CLS.visible.navs.bar.active);
            console.log('#' + item.children[0].value + "-" + item.children[0].name)
            // console.log(_xLE. _buttonLE.forms.querySelector('#' + item.children[0].value + "-" + item.children[0].name))
            target.querySelector('#' + item.children[0].value + "-" + item.children[0].name).classList.add(CLS.display.none)
          })
          target.querySelectorAll('li').forEach((item) => {
            if (item.children[0].value === _event.value) {
              item.children[0].classList.add('active');
              target.querySelector('#' + _event.value + "-" + _event.type).classList.remove(CLS.display.none)
            }
          })
          break;

        default:
          didntFind(_event);
          return;
      }
    }
    // calling the stateChange things.
    manageState(_event.type);
  }

  const tabs = (_event, trigger) => {
    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.tabs, trigger, 0, handler);

    console.log(_event)
    console.log(get_callEl());
    console.log(get_passedEl());

    switch (_event.type) {
      case eTypes.open:
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        // add intro class
        _tabLE.action.querySelector('#intro').classList.remove(CLS.display.none);
        break;

      case eTypes.report:
        // action and changes are required.
        get_callEl().classList.remove(CLS.display.none);
        // get_passedEl().classList.add(CLS.display.none);
        //[tab] hide the form.
        _tabLE.tabs.classList.add(CLS.display.none);
        return;

      case eTypes.tab:
        // [tab] show the form
        _tabLE.tabs.classList.remove(CLS.display.none);
        // remove intro card
        _tabLE.action.querySelector('#intro').classList.add(CLS.display.none);
        // show targeted tab.
        get_callEl().classList.add(...CLS.visible.navs.tab.active);
        // active clicked button.
        get_triggerEl().classList.add(CLS.visible.navs.bar.active);
        // hide passed element.
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        return;

      case eTypes.back:
        // hide targeted element and result zone.
        get_passedEl().classList.add(CLS.display.none);
        get_callEl().classList.remove(CLS.display.none);
        // main element arrangement.
        _tabLE.result.classList.add(CLS.display.none);
        _tabLE.tabs.classList.remove(CLS.display.none);
        return;

      default:
        didntFind(_event);
        return;
    }
  }

  const dashboards = (_event, trigger) => {
    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.dashboard, trigger, 0, handler);
    switch (_event.type) {
      case eTypes.open:
        // nothing changes are required.
        break;


      case eTypes.chart:
        // nothing changes are required.
        break;

      case eTypes.mode:
        get_callEl().querySelectorAll(querySA(atr.core.child)).forEach((item) => {
          console.log(item);
          item.getAttribute(atr.core.child) === _event.value
            ? item.classList.remove(CLS.display.none)
            : item.classList.add(CLS.display.none)
        });
        return;

      default:
        didntFind(_event);
        return;
    }

  }

  const directs = (_event, trigger) => {
    console.log(_event)
    console.log(get_callEl());
    console.log(get_passedEl());
    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.direct, trigger, 0, handler);

    switch (_event.type) {

      case eTypes.open:
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        return;

      case eTypes.navtab:
        // const targetId = `#${_event.type}_${_event.value}_${_event.data}`;
        _directLE.navtab.querySelectorAll(querySA(atr.core.value)).forEach((item) => {
          item.getAttribute(atr.core.value) === _event.data
            ? item.classList.remove(CLS.display.none)
            : item.classList.add(CLS.display.none);
        });
        return;

      case eTypes.load:
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl().classList.add(CLS.display.none);
        return;

      case eTypes.action:
        switch (_event.value) {
          case "profile":
            return;
          default:
            console.log("running arranges");
            get_callEl().classList.remove(CLS.display.none);
            get_passedEl().classList.add(CLS.display.none);
            return;
        }
        return;

      case eTypes.goto:
        //
        return;
      default:
        didntFind(_event);
        return;
    }
  }

  const wizards = (_event, trigger) => {
    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.wizards, trigger, 0, handler);

    const step_loop = (eValue, flow) => {
      Object.keys(_wizardLE.zones).forEach(function (key) {
        if (flow === 1) {
          key === eValue
            ? _wizardLE[key].classList.remove(CLS.display.none)
            : _wizardLE[key].classList.add(CLS.display.none);
        }
        else {
          key === eValue
            ? _wizardLE[key].classList.add(CLS.display.none)
            : _wizardLE[key].classList.remove(CLS.display.none);
        }
      })
    }
    switch (_event.type) {

      case eTypes.open:
        get_callEl().classList.remove(CLS.display.none);
        get_passedEl() === null ? justPass() : get_passedEl().classList.add(CLS.display.none);
        break;

      case eTypes.redirect:
      case eTypes.load:
        get_callEl().classList.remove(CLS.display.none);
        _wizardLE.vista.classList.add(CLS.display.none);
        break;

      case eTypes.back:
        step_loop(_event.place, 0)
        break;

      case eTypes.card:
        step_loop(_event.value, 1)
        break;

      default:
        didntFind(_event);
        return;
    }
  }

  const chats = (_event, trigger) => {
    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.chats, trigger, 0, handler);

    switch (_event.type) {

      case eTypes.redirect:
      case eTypes.load:
        // show the box of target customer.
        get_callEl().querySelectorAll(querySA(atr.core.target)).forEach(function (el) {
          console.log(el)
          if (el.dataset.pbTarget === _event.data) {
            el.classList.remove(CLS.display.none);
          }
          else {
            el.classList.add(CLS.display.none);
          }
        });
        break;

      case eTypes.back:
        console.log('back event arranges');
        break;

      case eTypes.card:
        console.log('card event arranges');
        break;

      case eTypes.action:
        console.log(get_passedEl());
        let bootModal = new bootstrap.Modal(get_passedEl());
        bootModal.hide(); // modal.hide();modal.toggle();
        break;

      case eTypes.modal:
        let modal = new bootstrap.Modal(get_callEl());
        modal.show(); // modal.hide();modal.toggle();
        break;

      case eTypes.goto:
        _chatsLE.inbox.classList.add(CLS.display.none);
        _chatsLE.compose.classList.add(CLS.display.none);
        _chatsLE.view.classList.add(CLS.display.none);

        get_callEl().classList.remove(CLS.display.none);
        break;


      default:
        didntFind(_event);
        return;
    }
  }

  const kanban = (_event, trigger) => {
    // check the handler of the event.
    const handler = kws.handleTag[trigger.tagName];

    showEventPresence(_event);

    Handling.Event(Lyt.kanban, trigger, 0, handler);
  }

  const __noChanges = (status) => {
    console.log('return from routing is false.');
    console.log(status);
    return false;
  }

  // Public methods
  return {
    _sheets    : function (event, trigger) {
      sheets(event, trigger);
    },
    _reports   : function (event, trigger) {
      reports(event, trigger);
    },
    _listing   : function (event, trigger) {
      listing(event, trigger);
    },
    _panels    : function (event, trigger) {
      panels(event, trigger);
    },
    _tables    : function (event, trigger) {
      tables(event, trigger);
    },
    _cards     : function (event, trigger) {
      cards(event, trigger);
    },
    _tabs      : function (event, trigger) {
      tabs(event, trigger);
    },
    _buttons   : function (event, trigger) {
      buttons(event, trigger);
    },
    _kanban    : function (event, trigger) {
      kanban(event, trigger);
    },
    _dashboards: function (event, trigger) {
      dashboards(event, trigger);
    },
    _directs   : function (event, trigger) {
      directs(event, trigger);
    },
    _wizards   : function (event, trigger) {
      wizards(event, trigger);
    },
    _chats     : function (event, trigger) {
      chats(event, trigger);
    },
    _sample    : function (event, trigger) {
      sample(event, trigger);
    },
    _config    : function (event, trigger) {
      config(event, trigger);
    },
    _stepper   : function (event, trigger) {
      stepper(event, trigger);
    }
  };
};

const Arranging = fun();
export default Arranging;
