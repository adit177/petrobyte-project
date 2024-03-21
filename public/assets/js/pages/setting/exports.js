// Shared variables

// Private functions

import {eTypes} from "../../base/events.js";
import pb from "../../base/structure.js";
import * as PB_SE_excel from "./exports/excel.js";
import * as PB_SE_tally from "./exports/tally.js";
import {get_thePathArr} from "../../base/global.js";

/**
 * This support all layouts routing.
 * @param event
 * @param data
 */
const actionRoute = function (event) {
  // fetching required page data
  const thePathArr = get_thePathArr();
  switch (event.type) {
    case eTypes.load:
      switch (thePathArr[2]) {
        case pb.set.exports.excel.n:
          return PB_SE_excel.SEE_loads(event);

        case pb.set.exports.tally.n:
          return PB_SE_tally.SET_loads(event);
      }
      break;

    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.set.exports.excel.n:
          return PB_SE_excel.SEE_actions(event);

        case pb.set.exports.tally.n:
          return PB_SE_tally.SET_actions(event);
      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.set.exports.excel.n:
          return PB_SE_excel.SEE_cards(event);

        case pb.set.exports.tally.n:
          return PB_SE_tally.SET_cards(event);

      }
      break;


  }
}

const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.set.exports.excel.n:
      return PB_SE_excel.SEE_pageOpen(data);

    case pb.set.exports.tally.n:
      return PB_SE_tally.SET_pageOpen(data);


  }
}

// Public methods

export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function (data) {
  return baseRoute(data);
};
