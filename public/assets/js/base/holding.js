/*
 ---------------------------------------------
 @@holding.js
 ------------
 Holding the all required html elements.
 *
 ---------------------------------------------
 */
import {exT, Lyt} from "./const.js";
import {get_action, get_callEl, set_callEl, set_passedEl, get_passedEl, get_thePathArr, set_triggerEl} from "./global.js";
import {eTypes, eValues} from "./events.js";
import {atr} from "./attributes.js";
import {_dashboardLE, _tabLE, _tableLE, _chatsLE, _pageLE, _cardLE, _stepperLE, _sampleLE, _kanbanLE, _calendarLE, _configLE, _panelLE, _sheetLE, _directLE, _reportLE, _wizardLE, _buttonLE, _listingLE} from "./elements.js";

import pb from "./structure.js";
import extend from "../extend/extend.js";

let fun = function () {
  // Shared variables
  let _callEl, _passedEl, _update;


  /**
   *
   * @private
   */
      // Private functions
  const _holdingPage = function () {
        // zone [all defined zone.]
        Object.keys(_pageLE.zones).forEach((zone) => {
          _pageLE[zone] = document.getElementById(_pageLE.zones[zone]);
        });

      };

  const _holdingLayout = function (layoutName, layoutElement, is_reCollect) {

    // all private functions that wil be called into switch
    const dashboards = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _dashboardLE[zone] = layoutElement.querySelector(_dashboardLE.zones[zone]);
      });
      _dashboardLE.layout = layoutElement;
      return true;
    }
    const buttons = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _buttonLE[zone] = layoutElement.querySelector(_buttonLE.zones[zone]);
      });
      _buttonLE.layout = layoutElement;
      return true;
    }

    const kanban = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _kanbanLE[zone] = layoutElement.querySelector(_kanbanLE.zones[zone]);
      });
      _kanbanLE.layout = layoutElement;
      return true;
    }
    const tabs = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _tabLE[zone] = layoutElement.querySelector(_tabLE.zones[zone]);
      });
      _tabLE.layout = layoutElement;
      return true;
    }
    const cards = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _cardLE[zone] = layoutElement.querySelector(_cardLE.zones[zone]);
      });
      _cardLE.layout = layoutElement;
      return true;
    }
    const tables = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _tableLE[zone] = layoutElement.querySelector(_tableLE.zones[zone]);
      });
      _tableLE.layout = layoutElement;
      return true;
    }
    const panels = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _panelLE[zone] = layoutElement.querySelector(_panelLE.zones[zone]);
      });
      _panelLE.layout = layoutElement;
      return true;
    }
    const listing = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _listingLE[zone] = layoutElement.querySelector(_listingLE.zones[zone]);
      });
      _listingLE.layout = layoutElement;
      return true;
    }
    const reports = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _reportLE[zone] = layoutElement.querySelector(_reportLE.zones[zone]);
      });
      _reportLE.layout = layoutElement;
      return true;
    }
    const sheets = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _sheetLE[zone] = layoutElement.querySelector(_sheetLE.zones[zone]);
      });
      _sheetLE.layout = layoutElement;
      return true;
    }
    const directs = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _directLE[zone] = layoutElement.querySelector(_directLE.zones[zone]);
      });
      _directLE.layout = layoutElement;
      return true;
    }
    const wizards = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _wizardLE[zone] = layoutElement.querySelector(_wizardLE.zones[zone]);
      });
      _wizardLE.layout = layoutElement;
      return true;
    }

    const chats = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _chatsLE[zone] = layoutElement.querySelector(_chatsLE.zones[zone]);
      });
      _chatsLE.layout = layoutElement;
      return true;
    }

    const sample = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _sampleLE[zone] = layoutElement.querySelector(_sampleLE.zones[zone]);
      });
      _sampleLE.layout = layoutElement;
      return true;
    }

    const config = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _configLE[zone] = layoutElement.querySelector(_configLE.zones[zone]);
      });
      _configLE.layout = layoutElement;
      return true;
    }

    const stepper = function (zones) {
      // hold elements into variable to control as per events.
      zones.forEach((zone) => {
        _stepperLE[zone] = layoutElement.querySelector(_stepperLE.zones[zone]);
      });
      _stepperLE.layout = layoutElement;
      return true;
    }

    const calendar = function (zones) {
      zones.forEach((zone) => {
        _calendarLE[zone] = layoutElement.querySelector(_calendarLE.zones[zone]);
      });
      _calendarLE.layout = layoutElement;
      return true;
    }
    // lets check zones
    let zones;

    switch (layoutName) {
      case Lyt.dashboard:
        zones = is_reCollect === true ? Object.keys(_dashboardLE.recollect) : Object.keys(_dashboardLE.zones);
        return dashboards(zones);

      case Lyt.calendar:
        zones = is_reCollect === true ? Object.keys(_calendarLE.recollect) : Object.keys(_calendarLE.zones);
        return calendar(zones);

      case Lyt.buttons:
        zones = is_reCollect === true ? Object.keys(_buttonLE.recollect) : Object.keys(_buttonLE.zones);
        return buttons(zones);

      case Lyt.kanban:
        zones = is_reCollect === true ? Object.keys(_kanbanLE.recollect) : Object.keys(_kanbanLE.zones);
        return kanban(zones);

      case Lyt.tabs:
        zones = is_reCollect === true ? Object.keys(_tabLE.recollect) : Object.keys(_tabLE.zones);
        return tabs(zones);

      case Lyt.cards:
        zones = is_reCollect === true ? Object.keys(_cardLE.recollect) : Object.keys(_cardLE.zones);
        return cards(zones);

      case Lyt.tables:
        zones = is_reCollect === true ? Object.keys(_tableLE.recollect) : Object.keys(_tableLE.zones);
        return tables(zones);

      case Lyt.panels:
        zones = is_reCollect === true ? Object.keys(_panelLE.recollect) : Object.keys(_panelLE.zones);
        return panels(zones);

      case Lyt.listing:
        zones = is_reCollect === true ? Object.keys(_listingLE.recollect) : Object.keys(_listingLE.zones);
        return listing(zones);

      case Lyt.reports:
        zones = is_reCollect === true ? Object.keys(_reportLE.recollect) : Object.keys(_reportLE.zones);
        return reports(zones);
      case Lyt.sheets:
        zones = is_reCollect === true ? Object.keys(_sheetLE.recollect) : Object.keys(_sheetLE.zones);
        return sheets(zones);

      case Lyt.direct:
        zones = is_reCollect === true ? Object.keys(_directLE.recollect) : Object.keys(_directLE.zones);
        return directs(zones);

      case Lyt.wizards:
        zones = is_reCollect === true ? Object.keys(_wizardLE.recollect) : Object.keys(_wizardLE.zones);
        return wizards(zones);

      case Lyt.chats:
        zones = is_reCollect === true ? Object.keys(_chatsLE.recollect) : Object.keys(_chatsLE.zones);
        return chats(zones);

      case Lyt.sample:
        zones = is_reCollect === true ? Object.keys(_sampleLE.recollect) : Object.keys(_sampleLE.zones);
        return sample(zones);

      case Lyt.config:
        zones = is_reCollect === true ? Object.keys(_configLE.recollect) : Object.keys(_configLE.zones);
        return config(zones);

      case Lyt.stepper:
        zones = is_reCollect === true ? Object.keys(_stepperLE.recollect) : Object.keys(_stepperLE.zones);
        return stepper(zones);
    }
  }

  /**
   *
   * @param layoutName
   * @param zoneName
   * @returns {*}
   */
  const _holdingTarget = function (layoutName, zoneName = undefined) {
    switch (layoutName) {
      case Lyt.calendar:
        return zoneName === undefined ? _calendarLE : (_calendarLE[zoneName] ?? _calendarLE);
      case Lyt.cards:
        return zoneName === undefined ? _cardLE : (_cardLE[zoneName] ?? _cardLE);
      case Lyt.stepper:
        return zoneName === undefined ? _stepperLE : (_stepperLE[zoneName] ?? _stepperLE);
      case Lyt.buttons:
        return zoneName === undefined ? _buttonLE : (_buttonLE[zoneName] ?? _buttonLE);
      case Lyt.listing:
        return zoneName === undefined ? _listingLE : (_listingLE[zoneName] ?? _listingLE);
      case Lyt.panels:
        return zoneName === undefined ? _panelLE : (_panelLE[zoneName] ?? _panelLE);
      case Lyt.chats:
        return zoneName === undefined ? _chatsLE : (_chatsLE[zoneName] ?? _chatsLE);
      case Lyt.config:
        return zoneName === undefined ? _configLE : (_configLE[zoneName] ?? _configLE);
      case Lyt.dashboard:
        return zoneName === undefined ? _dashboardLE : (_dashboardLE[zoneName] ?? _dashboardLE);
      case Lyt.direct:
        return zoneName === undefined ? _directLE : (_directLE[zoneName] ?? _directLE);
      case Lyt.reports:
        return zoneName === undefined ? _reportLE : (_reportLE[zoneName] ?? _reportLE);
      case Lyt.sample:
        return zoneName === undefined ? _sampleLE : (_sampleLE[zoneName] ?? _sampleLE);
      case Lyt.sheets:
        return zoneName === undefined ? _sheetLE : (_sheetLE[zoneName] ?? _sheetLE);
      case Lyt.tabs:
        return zoneName === undefined ? _tabLE : (_tabLE[zoneName] ?? _tabLE);
      case Lyt.tables:
        return zoneName === undefined ? _tableLE : (_tableLE[zoneName] ?? _tableLE);
      case Lyt.wizards:
        return zoneName === undefined ? _wizardLE : (_wizardLE[zoneName] ?? _wizardLE);
      case Lyt.kanban:
        return zoneName === undefined ? _kanbanLE : (_kanbanLE[zoneName] ?? _kanbanLE);
    }
  }

  /**
   * used to hold tageted element as call element..
   * @param layoutType
   * @param event
   * @param button
   * @returns {*|void}
   */
  const _holdingElement = (layoutType, event, button) => {
    console.log('holding: ', layoutType, event, button);
    const dashboards = function () {
      switch (event.type) {
        case eTypes.open:
          set_callEl(_dashboardLE.chart);
          set_passedEl(_dashboardLE.layout.querySelector('#' + event.place));
          break;

        case eTypes.chart:
          set_callEl(_dashboardLE.chart.querySelector('#' + event.value));
          break;

        case eTypes.mode:
          set_callEl(_dashboardLE.chart.querySelector('#' + event.data));
          break;

        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;
      }
    }
    const buttons = function () {
      // getting a call element

      switch (event.type) {
        case eTypes.open:
          _callEl = _buttonLE.controls;
          _passedEl = _buttonLE.layout.querySelector('#' + event.place);
          _update = true;
          break;

        case eTypes.form:
          _callEl = _buttonLE.forms.querySelector('#' + event.value + '-' + event.type);
          _passedEl = Object.keys(_buttonLE.zones).includes(event.place) ?
            _buttonLE[event.place] :
            _buttonLE.layout.querySelector('#' + event.place);
          _update = true;
          break;

        case eTypes.table:
          _callEl = _buttonLE.tables.querySelector('#' + event.value + '-' + event.type)
          _passedEl = Object.keys(_buttonLE.zones).includes(event.place) ?
            _buttonLE[event.place] :
            _buttonLE.layout.querySelector('#' + event.place);
          _update = true;
          break;

        case eTypes.card:
          _callEl = _buttonLE.cards.querySelector('#' + event.value + '-' + event.type);
          _passedEl = Object.keys(_buttonLE.zones).includes(event.place) ?
            _buttonLE[event.place] :
            _buttonLE.layout.querySelector('#' + event.place);
          _update = true;
          break;

        case eTypes.modal:
          /*
           // this does not required for temporary.
           _callEl = _buttonLE.modals.querySelector('#' + event.value + '-' + event.type);
           _passedEl = _buttonLE.layout.querySelector('#' + event.place);
           */
          _update = false;
          break;

        case eTypes.back:
          // no call element required. or not need to change.
          _callEl = Object.keys(_buttonLE.zones).includes(event.value) ?
            _buttonLE[event.value] :
            _buttonLE.layout.querySelector('#' + event.value);
          _passedEl = _buttonLE.layout.querySelector('#' + event.place);
          _update = true;
          break;

        case eTypes.element:
          set_callEl(_buttonLE.elements.querySelector('#' + event.value + '-' + event.type))
          _update = false;
          break;

        case eTypes.navtab:
          // todo: required changes.
          _update = false;
          break;

        case eTypes.load:
        case eTypes.change:
        case eTypes.alter:
        case eTypes.amend:
        case eTypes.calculate:
        case eTypes.action:
          // no changes are required.
          _update = false;
          break;


        case eTypes.switch:
          // destructed of event value
          // todo: required changes as per switch layout.
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;

        default:
          toastr.error('no case found to create call element', '_callEL error, ' + event.type);
      }
      // update the values.
      set_callEl(_callEl);
      set_passedEl(_passedEl);
      _update = false;
    }
    const tabs = function () {
      switch (event.type) {
        case eTypes.open:
          set_callEl(_tabLE.tabs);
          set_passedEl(_tabLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.report:
          set_callEl(_tabLE.result.querySelector('#' + event.type + '-' + event.value))
          set_passedEl(_tabLE.tabs.querySelector('#' + event.place));
          break;
        case eTypes.tab:
          set_triggerEl(button);
          set_callEl(_tabLE.tabs.querySelector('#' + event.type + '-' + event.value))
          set_passedEl(_tabLE.result.querySelector('#' + event.place));
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          set_passedEl(_passedEl);
          break;
      }
    }
    const cards = function () {
      console.log(event);
      // getting a call element
      switch (event.type) {
        case eTypes.open:
          set_callEl(_cardLE.home);
          set_passedEl(_cardLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.card:
          // const callEl = _cardLE.layout.querySelector('#' + _cardLE.zones[event.value]);
          set_callEl(_cardLE[event.value]);
          set_passedEl(_cardLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.back:
          alert('back hit, by get, remove');
          break;
        case eTypes.table:
          set_callEl(_cardLE.tables.querySelector('#' + event.value));
          set_passedEl(_cardLE.layout.querySelector('#' + event.place));
          console.log(get_callEl());
          console.log(get_passedEl());
          break;
        case eTypes.navtab:
          set_callEl(_cardLE.layout.querySelector('#' + event.value));
          set_passedEl(_cardLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.amend:
          //          set_callEl(_cardLE.layout.querySelector('#' + event.place));
          //          set_passedEl(_cardLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.action:
          // action => any form submission.
          set_callEl(Object.values(_cardLE.zones).includes(event.place)
            ? _cardLE[event.place.split('__')[0]]
            : _cardLE.layout.querySelector('#' + event.place));
          set_passedEl(_cardLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]));
          // set_passedEl(_cardLE.layout.querySelector('#' + event.place));
          break;
      }
    }
    const tables = function () {
      switch (event.type) {
        case eTypes.open:
          set_callEl(_tableLE.water);
          set_passedEl(_tableLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.modal:
          set_callEl(_tableLE.layout.querySelector('#' + event.value))
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;

        case eTypes.table:
          set_callEl(_tableLE.layout.querySelector('#' + event.value + "-" + event.type).closest('.zone'));
          console.log(_tableLE.layout.querySelector('#' + event.place));
          set_passedEl(_tableLE.layout.querySelector('#' + event.place));
          break;
      }
    }
    const panels = function () {
      switch (event.type) {
        case eTypes.navtab:
          set_callEl(_panelLE.nav.querySelector('#' + event.value))
          break;
        case eTypes.load:
          set_callEl(_panelLE.outcome)
          break;
        case eTypes.modal:
          set_callEl(_panelLE.modal.querySelector('#' + event.value))
          break;
        case eTypes.action:
          set_callEl(_panelLE.layout.querySelector('#' + event.value))
          break;
        case eTypes.reset:
          set_callEl(_panelLE.layout.querySelector('#' + event.value))
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;
        default:
          set_callEl(_panelLE.outcome)
          break;
      }
    }
    const listing = function () {
      // getting the call element and passed element.
      switch (event.type) {
        case eTypes.open:
          set_callEl(_listingLE.intro);
          set_passedEl(_listingLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.navtab:
          set_callEl(_listingLE[event.value]);
          set_passedEl(_listingLE.layout.querySelector('#' + event.place));
          set_triggerEl(button);
          break;
        case eTypes.load:
          // default passed.
          break;
        case eTypes.paging:
          // default passed.
          break;
        case eTypes.action:
          // default passed.
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;
      }
    }
    const reports = function () {

      // getting call element
      switch (event.type) {
        case eTypes.open:
          set_callEl(_reportLE.eagle);
          set_passedEl(_reportLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.load:
          set_callEl(_reportLE.navtab.querySelector('#' + event.value).closest('div.sub-zone'));
          set_passedEl(_reportLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.navtab:
          set_callEl(_reportLE.navtab.querySelector("#" + event.value).closest('div.sub-zone'));
          set_passedEl(_reportLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;
      }
    }
    const sheets = function () {
      // getting call element
      switch (event.type) {
        case eTypes.load:
          set_callEl(_sheetLE[event.value])
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;
        case eTypes.table:
          switch (event.value) {
            case  "transact":
              set_callEl(_sheetLE.transact)
              _passedEl = _sheetLE.sheet
              set_passedEl(_passedEl);
              break
          }
          break;
        case eTypes.modal:
          set_callEl(_sheetLE.modal)
      }
    }
    const directs = function () {
      // getting call element
      switch (event.type) {
        case eTypes.open:
          set_callEl(_directLE.direct);
          set_passedEl(_directLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.action:
          // select call & passed element
          switch (event.value) {
            case pb.set.subscriptions.add.addon:
              set_callEl(_directLE.direct.querySelector('#' + event.value))
              _passedEl = _directLE.modals.querySelector('#' + event.place);
              set_passedEl(_passedEl);
              break;
            case pb.set.subscriptions.add.delete:
              set_callEl(_directLE.visits.querySelector('#addon_form'))
              break;


            default:
              set_callEl(_directLE.direct.querySelector('#' + event.value))
              set_passedEl(_directLE.direct.querySelector('#' + event.place));
              break;
          }
          break;
        case eTypes.modal:
          set_callEl(_directLE.direct.querySelector('#' + event.value));
          break;
        case eTypes.navtab:
          set_callEl(_directLE.navtab);
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;
        case eTypes.load:
          set_callEl(_directLE.direct.querySelector('#' + event.value));
          console.log(get_callEl());
          set_passedEl(_directLE.direct.querySelector('#' + event.place));
          console.log(get_passedEl());
      }
    }
    const calendar = function () {
      switch (event.type) {
        case eTypes.action:
          switch (event.value) {
            case "delete":
              set_callEl(_calendarLE.modal)
          }
          break;
        case eTypes.modal:
          set_callEl(_calendarLE.modal)
      }
    }
    const wizards = function () {
      // getting a call element
      switch (event.type) {
        case eTypes.open:
          set_callEl(_wizardLE.vista);
          set_passedEl(_wizardLE.layout.querySelector('#' + event.place));
          break;

        case eTypes.action:
          set_callEl(_wizardLE.vista);
          set_passedEl(_wizardLE.layout.querySelector('#' + event.place));
          break;

        case eTypes.table:
          set_callEl(_wizardLE.table);
          set_passedEl(_wizardLE.layout.querySelector('#' + event.place));
          break;

        case eTypes.view:
          set_callEl(_wizardLE.present);
          set_passedEl(_wizardLE.layout.querySelector('#' + event.place));
          break;

        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;
      }
    }
    const chats = function () {
      switch (event.type) {
        case eTypes.chart:
          set_callEl(_chatsLE.chat)
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;

        case eTypes.load:
          console.log("getting call element");
          set_callEl(_chatsLE.panel.querySelector("." + event.value + "-" + event.type))
          break

        case eTypes.modal:
          set_callEl(_chatsLE.modals.querySelector("#" + event.value + "-" + event.type))
          _passedEl = '';
          set_passedEl(_passedEl);
          break

        case eTypes.action:
          switch (event.value) {
            case "insert":
              set_callEl(_chatsLE.chat.querySelector("#" + event.type + "-" + event.value))
              _passedEl = _chatsLE.modals.querySelector("#" + event.place);
              set_passedEl(_passedEl);
              break;
          }
          break;

        case eTypes.goto:
          set_callEl(_chatsLE.view)
          switch (event.value) {
            case "compose":
              set_callEl(_chatsLE.compose)
              break;

            case "inbox":
              set_callEl(_chatsLE.inbox)
              break;

            case "view":
              set_callEl(_chatsLE.view)
              break;
          }
          break;

      }
    }
    const sample = function () {
      switch (event.type) {
        case eTypes.open:
          set_callEl(_sampleLE.ground);
          set_passedEl(_sampleLE.layout.querySelector('#' + event.place));
          break;
        case eTypes.load:
          set_callEl(_sampleLE.ground.querySelector('#' + event.value));
          break;
        case eTypes.stack:
          set_callEl(_sampleLE.ground.querySelector('#' + event.value));
          break;
        case eTypes.view:
          set_callEl(_sampleLE.ground.querySelector('#' + event.value));
          break;
        case eTypes.change:
          set_callEl(_sampleLE.ground.querySelector('#' + event.value));
          break;
        case eTypes.action:
          set_callEl(_sampleLE.ground.querySelector('#' + event.data));
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;
        default:
          set_callEl(_sampleLE[event.value])
          break;
      }
    }
    const config = function () {
      switch (event.type) {
        case eTypes.navtab:
          set_callEl(_configLE.navtab.querySelector('#' + event.value))
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;
        default:
          set_callEl(_configLE[event.value])
          break;
      }
    }
    const stepper = function () {
      // common function running for all stepper events.
      const stepperID = event.place;
      const formEl = _stepperLE.form.querySelector(`#${stepperID}-form`);
      let index = 1;

      // switch
      switch (event.type) {
        case eTypes.load:
          // get target index
          const eNature = get_action().getAttribute(atr.other.stepper.action);
          const clickNature = exT.stepper.index[eNature];
          index = extend.stepper.$_getIndex(
            stepperID + '-stepper',
            clickNature
          );
          // get call and passed element
          set_callEl(formEl.querySelector(querySA(atr.core.index, index)))
          _passedEl = formEl.querySelector(querySA(atr.core.index, index - clickNature));
          set_passedEl(_passedEl);

          // update event
          event.data = index;
          break;

        case eTypes.modal:
          set_callEl(_stepperLE.modal.querySelector("#" + _event.value + "_" + _event.type));
          break;

        case eTypes.feed:
          // get target index
          break;
        case eTypes.back:
          // nothing to do.
          break;


        case eTypes.action:

          switch (event.value) {
            case eValues.action.stepper.previous:
              //
              break;
            case eValues.action.stepper.next:
              ///
              break;
            case eValues.action.stepper.finish:
              const formEl = get_action().closest('form');
              // get values.
              const for_previous = formEl.querySelector(querySA(atr.core.index, '1')).id;
              const for_next = formEl.querySelector(querySA(atr.core.index, '2')).id;

              // update values.
              formEl.querySelectorAll(querySA(atr.other.stepper.action))
                .forEach((button) => {
                  switch (button.getAttribute(atr.other.stepper.action)) {
                    case exT.stepper.action.previous:
                      button.value = for_previous;
                      break;
                    case exT.stepper.action.next:
                      button.value = for_next;
                      break;
                    case exT.stepper.action.finish:

                      break;
                  }
                });
              // create call element.
              set_callEl(formEl)

              break;

            case "update_available_itc":
              break;

            case "update_reverse_itc":
              break;
            default:
              set_callEl(_stepperLE.form.querySelector('#' + event.value))
              break;
          }
          break;
        case eTypes.switch:
          // destructed of event value
          const eVal = event.value.split('@');
          set_callEl(Holding.Target(event.switch)[eVal[0]].querySelector('#' + eVal[1]))
          break;

        default:
          set_callEl(_configLE[event.value])
          break;
      }
    }

    switch (layoutType) {
      case Lyt.calendar:
        return calendar();

      case Lyt.dashboard:
        return dashboards();

      case Lyt.buttons:
        return buttons();

      case Lyt.tabs:
        return tabs();

      case Lyt.cards:
        return cards();

      case Lyt.tables:
        return tables();

      case Lyt.panels:
        return panels()

      case Lyt.listing:
        return listing();

      case Lyt.reports:
        return reports();

      case Lyt.sheets:
        return sheets();

      case Lyt.direct:
        return directs();

      case Lyt.wizards:
        return wizards();

      case Lyt.chats:
        return chats();

      case Lyt.sample:
        return sample();

      case Lyt.config:
        return config();

      case Lyt.stepper:
        return stepper();
    }
  }

  const _holdingDestroy = (holdingType, params) => {

    const layout_destroy = (layouts) => {

      // if no layout has loaded then return true.
      if (layouts === undefined) return true;

      const destroy = (layout) => {
        const element = _holdingTarget(layout);
        // destroy element
        Object.keys(element.zones).forEach((key) => {
          element[key] = '';
        })
      }

      // if layouts is an array, then loop through it.
      layouts.forEach((layout) => {
        destroy(layout);
      });

    }

    const element_destroy = (element) => {
      return true;
    }

    switch (holdingType) {
      case 'layout':
        layout_destroy(params);
        break;

      case 'element':
        element_destroy(params);
        break;

      default:
        break;
    }
  };
  // Public methods
  return {
    /**
     *
     */
    Page: function () {
      _holdingPage();
    },

    /**
     *
     * @param layoutName defined name of the layout
     * @param layoutElement
     * @param reCollect
     */
    Layout: function (layoutName, layoutElement, reCollect = false) {
      _holdingLayout(layoutName, layoutElement, reCollect);
    },

    /**
     * to get element Holdings of the target layout.
     * @param layoutName
     * @param what
     * @returns HTMLElement
     */
    Target: function (layoutName, what = undefined) {
      return _holdingTarget(layoutName, what);
    },

    /**
     * to hold the call element and the passed element as per user event.
     * @param layoutName
     * @param Event
     * @param button
     */
    Element: function (layoutName, Event, button) {
      _holdingElement(layoutName, Event, button);
    },

    /**
     * it destroys the holding object of the layout.
     */
    Destroy(holdingType, params) {
      _holdingDestroy(holdingType, params);
    }
  };
};

const Holding = fun();
export default Holding;


