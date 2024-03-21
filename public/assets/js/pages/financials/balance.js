import {get_thePathArr} from "../../base/global.js";

import {eTypes} from "../../base/events.js";
import pb from "../../base/structure.js";
import * as PB_FB_tformat from "./balance/tformat.js";
import * as PB_FB_standard from "./balance/standard.js";
import * as PB_FB_comparison from "./balance/comparison.js";
import * as PB_FB_summary from "./balance/summary.js";


let redData;
// Private functions

/**
 * This support all layouts routing.
 * @param _event
 */
const actionRoute = function (_event) {
  const thePathArr = get_thePathArr();
  // fetching required page data
  switch (_event.type) {

    case eTypes.load:
      switch (thePathArr[2]) {
        case pb.fin.balance.tformat.n:
          return PB_FB_tformat.FBT_loads(_event);
        case pb.fin.balance.standard.n:
          return PB_FB_standard.FBS_loads(_event);
        case pb.fin.balance.comparison.n:
          return PB_FB_comparison.FBC_loads(_event);
        case pb.fin.balance.summary.n:
          console.log("in balance summary");
          return PB_FB_summary.FBSY_loads(_event);

      }

      break;

    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.fin.balance.tformat.n:
          return PB_FB_tformat.FBT_actions(_event);
        case pb.fin.balance.standard.n:
          return PB_FB_standard.FBS_actions(_event);
        case pb.fin.balance.comparison.n:
          return PB_FB_comparison.FBC_actions(_event);
        case pb.fin.balance.summary.n:
          return PB_FB_summary.FBSY_actions(_event);
        case pb.fin.balance.detailed.n:
          return PB_FB_detailed.FBD_actions(_event);
        case pb.fin.balance.schedule.n:
          return PB_FB_schedule.FBS_actions(_event);
      }

      break;
    case eTypes.table:
      switch (thePathArr[2]) {
        case pb.fin.balance.tformat.n:
          return PB_FB_tformat.FBT_loads(_event);

        case pb.fin.balance.summary.n:
          return PB_FB_summary.FBSY_loads(_event);

        case pb.fin.balance.standard.n:
          return PB_FB_standard.FBS_loads(_event);

        case pb.fin.balance.comparison.n:
          return PB_FB_comparison.FBC_loads(_event);
      }


    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.fin.balance.detailed.n:
          return PB_FB_detailed.FBD_cards(_event);
        case pb.fin.balance.schedule.n:
          return PB_FB_schedule.FBS_cards(_event);

      }

    case eTypes.modal:
      switch (thePathArr[2]) {
        case pb.fin.balance.tformat.n:
          return PB_FB_tformat.FBT_modals(_event);
        case pb.fin.balance.summary.n:
          return PB_FB_summary.FBSY_modals(_event);
        case pb.fin.balance.standard.n:
          return PB_FB_standard.FBS_modals(_event);
        case pb.fin.balance.comparison.n:
          return PB_FB_comparison.FBC_modals(_event);
      }

    default:
      alert('No Routing function added into Group file. for ' + _event.type);
      break;
  }
}


const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.fin.balance.tformat.n:
      return PB_FB_tformat.FBT_pageOpen(data);

    case pb.fin.balance.standard.n:
      return PB_FB_standard.FBS_pageOpen(data);

    case pb.fin.balance.comparison.n:
      return PB_FB_comparison.FBC_pageOpen(data);

    case pb.fin.balance.summary.n:
      return PB_FB_summary.FBSY_pageOpen(data);
    case pb.fin.balance.detailed.n:
      return PB_FB_detailed.FBD_pageOpen(data);
    case pb.fin.balance.schedule.n:
      return PB_FB_schedule.FBS_pageOpen(data);
  }
}

// Public methods

export const actionRouting = function (_event) {
  return actionRoute(_event);
};
export const baseRouting = function (data) {
  return baseRoute(data);
};
