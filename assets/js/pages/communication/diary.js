import {eTypes}         from "../../base/events.js";
import {get_thePathArr} from "../../base/global.js";
import pb               from "../../base/structure.js";


import {Lyt, otR, plg, exT, rdR, kws, CLS, sD, deF, glob, STYLE} from "../../base/const.js";
import * as PB_CD_calendar                                       from "./diary/calendar.js";
import * as PB_CD_tasks                                          from "./diary/tasks.js";


// Shared variables
let redData;

// Private functions

/**
 * This support all layouts routing.
 * @param _event
 */
const actionRoute = function (_event) {
  // fetching required page data
  switch (_event.type) {

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.com.diary.calendar.n:
          return PB_CD_calendar.CDC_cards(_event);

        case pb.com.diary.tasks.n:
          return PB_CD_tasks.CDT_cards(_event);

      }
      break;

    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.com.diary.calendar.n:
          console.log("in calendar");
          return PB_CD_calendar.CDC_actions(_event);

        case pb.com.diary.tasks.n:
          return PB_CD_tasks.CDT_actions(_event);
      }
      break;

    case eTypes.modal:
      switch (thePathArr[2]) {
        case pb.com.diary.calendar.n:
          return PB_CD_calendar.CDC_modals(_event);
      }

    default:
      console.log(_event);
      break;
  }
}

const baseRoute = function (data) {
  switch (thePathArr[2]) {
    case pb.com.diary.calendar.n:
      return PB_CD_calendar.CDC_pageOpen(data);

    case pb.com.diary.tasks.n:
      return PB_CD_tasks.CDT_pageOpen(data);

  }
}

// Public methods

export const actionRouting = function (page, element, button) {
  return actionRoute(page, element, button);
};
export const baseRouting = function (data) {
  return baseRoute(data);
};
