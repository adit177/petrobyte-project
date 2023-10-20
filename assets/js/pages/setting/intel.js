// Shared variables

// Private functions

import {eTypes} from "../../base/events.js";
import pb from "../../base/structure.js";
import * as PB_SI_health from "./intel/health.js";
import * as PB_SI_management from "./intel/management.js";
import * as PB_SI_onboard from "./intel/onboard.js";
import * as PB_SI_operations from "./intel/operations.js";
import * as PB_SI_taxation from "./intel/taxation.js";
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
        case pb.set.intel.health.n:
          return PB_SI_health.SIH_actions(event);

        case pb.set.intel.management.n:
          return PB_SI_management.SIM_actions(event);

        case pb.set.intel.onboard.n:
          return PB_SI_onboard.SIO_actions(event);

        case pb.set.intel.operations.n:
          return PB_SI_operations.SIO_actions(event);

        case pb.set.intel.taxation.n:
          return PB_SI_taxation.SIT_actions(event);


      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.set.intel.management.n:
          return PB_SI_management.SIM_cards(event);

        case pb.set.intel.onboard.n:
          return PB_SI_onboard.SIO_cards(event);

        case pb.set.intel.operations.n:
          return PB_SI_operations.SIO_cards(event);

        case pb.set.intel.taxation.n:
          return PB_SI_taxation.SIT_cards(event);

      }
      break;
    case eTypes.form:
      switch (thePathArr[2]) {
        case pb.set.intel.health.n:
          return PB_SI_health.SIH_forms(event);
      }
      break;
    case eTypes.table:
      switch (thePathArr[2]) {
        case pb.set.intel.health.n:
          return PB_SI_health.SIH_tables(event);
      }
      break;
  }
}


const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.set.intel.health.n:
      return PB_SI_health.SIH_pageOpen(data);

    case pb.set.intel.management.n:
      return PB_SI_management.SIM_pageOpen(data);

    case pb.set.intel.onboard.n:
      return PB_SI_onboard.SIO_pageOpen(data);

    case pb.set.intel.operations.n:
      return PB_SI_operations.SIO_pageOpen(data);

    case pb.set.intel.taxation.n:
      return PB_SI_taxation.SIT_pageOpen(data);
  }
}

// Public methods

export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function (data) {
  return baseRoute(data);
};
