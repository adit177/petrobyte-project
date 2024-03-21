// Shared variables

// Private functions

import * as PB_OS_control from "./shifts/control.js";
import * as PB_OS_listing from "./shifts/listing.js";
import * as PB_OS_overview from "./shifts/overview.js";
import pb from "../../base/structure.js";
import {eTypes} from "../../base/events.js";
import * as PB_OS_process from "./shifts/process.js";

/**
 * This support all layouts routing.
 * @param event
 * @param data
 */
const actionRoute = function (event) {
  // fetching required page data

  switch (event.type) {
    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.opr.shifts.control.n:
          return PB_OS_control.OSC_actions(event);

        case pb.opr.shifts.listing.n:
          return PB_OS_listing.OSL_actions(event);

        case pb.opr.shifts.overview.n:
          return PB_OS_overview.OSO_actions(event);

        case pb.opr.shifts.process.n:
          return PB_OS_process.OSP_actions(event);

      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.opr.shifts.control.n:
          return PB_OS_control.OSC_cards(event);

        case pb.opr.shifts.listing.n:
          return PB_OS_listing.OSL_cards(event);

        case pb.opr.shifts.overview.n:
          return PB_OS_overview.OSO_cards(event);

        case pb.opr.shifts.process.n:
          return PB_OS_process.OSP_cards(event);


      }
      break;

    case eTypes.load:
      switch (thePathArr[2]) {
        case pb.opr.shifts.process.n:
          return PB_OS_process.OSP_loads(event);
      }
      break;

    case eTypes.switch:
      switch (thePathArr[2]) {
        case pb.opr.shifts.process.n:
          return PB_OS_process.OSP_switch(event);
      }
      break;

    case eTypes.feed:
      switch (thePathArr[2]) {
        case pb.opr.shifts.process.n:
          return PB_OS_process.OSP_feeds(event);
      }
      break;
  }
}


const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.opr.shifts.control.n:
      return PB_OS_control.OSC_pageOpen();

    case pb.opr.shifts.listing.n:
      return PB_OS_listing.OSL_pageOpen();

    case pb.opr.shifts.overview.n:
      return PB_OS_overview.OSO_pageOpen();

    case pb.opr.shifts.process.n:
      return PB_OS_process.OSP_pageOpen();


  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function () {
  return baseRoute();
};
