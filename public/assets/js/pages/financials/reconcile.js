// Shared variables

// Private functions

import {eTypes} from "../../base/events.js";
import pb from "../../base/structure.js";
import * as PB_FR_summary from "./reconcile/summary.js";
import * as PB_FR_initiate from "./reconcile/initiate.js";
import {get_thePathArr} from "../../base/global.js";

/**
 * This support all layouts routing.
 * @param event
 * @param data
 */
const actionRoute = function (event) {
  const thePathArr = get_thePathArr();
  // fetching required page data

  switch (event.type) {
    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.fin.reconcile.summary.n:
          return PB_FR_summary.FRS_actions(event);
        case pb.fin.reconcile.initiate.n:
          return PB_FR_initiate.FRI_actions();
      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.fin.reconcile.summary.n:
          return PB_FR_summary.FRS_cards(event);
        case pb.fin.reconcile.initiate.n:
          return PB_FR_initiate.FRI_cards();
      }
      break;
  }
}


const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.fin.reconcile.summary.n:
      return PB_FR_summary.FRS_pageOpen(data);
    case pb.fin.reconcile.initiate.n:
      return PB_FR_initiate.FRI_pageOpen(data);
  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function (data) {
  return baseRoute(data);
};
