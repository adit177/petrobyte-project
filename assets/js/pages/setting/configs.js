// Shared variables
import {eTypes}                 from "../../base/events.js";
import pb                       from "../../base/structure.js";
import * as PB_SC_accounting    from "./configs/accounting.js";
import * as PB_SC_basic         from "./configs/basic.js";
import * as PB_SC_communication from "./configs/communication.js";
import * as PB_SC_database      from "./configs/database.js";
import * as PB_SC_miscellaneous from "./configs/miscellaneous.js";
import * as PB_SC_reports       from "./configs/reports.js";

let redData;

// Private functions
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
        case pb.set.configs.accounting.n:
          return PB_SC_accounting.SCA_actions(event);

        case pb.set.configs.basic.n:
          return PB_SC_basic.SCB_actions(event);

        case pb.set.configs.communication.n:
          return PB_SC_communication.SCC_actions(event);

        case pb.set.configs.database.n:
          return PB_SC_database.SCD_actions(event);

        case pb.set.configs.miscellaneous.n:
          return PB_SC_miscellaneous.SCM_actions(event);

        case pb.set.configs.reports.n:
          return PB_SC_reports.SCR_actions(event);
      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.set.configs.accounting.n:
          return PB_SC_accounting.SCA_cards(event);

        case pb.set.configs.basic.n:
          return PB_SC_basic.SCB_cards(event);

        case pb.set.configs.communication.n:
          return PB_SC_communication.SCC_cards(event);

        case pb.set.configs.database.n:
          return PB_SC_database.SCD_cards(event);

        case pb.set.configs.miscellaneous.n:
          return PB_SC_miscellaneous.SCM_cards(event);

        case pb.set.configs.reports.n:
          return PB_SC_reports.SCR_cards(event);
      }
      break;

    case eTypes.navtab:
      switch (thePathArr[2]) {
        case pb.set.configs.accounting.n:
          return PB_SC_accounting.SCA_navtabs(event);

        case pb.set.configs.basic.n:
          return PB_SC_basic.SCB_navtabs(event);

        case pb.set.configs.communication.n:
          return PB_SC_communication.SCC_navtabs(event);

        case pb.set.configs.database.n:
          return PB_SC_database.SCD_navtabs(event);

        case pb.set.configs.miscellaneous.n:
          return PB_SC_miscellaneous.SCM_navtabs(event);

        case pb.set.configs.reports.n:
          return PB_SC_reports.SCR_navtabs(event);
      }
  }
}


const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.set.configs.accounting.n:
      return PB_SC_accounting.SCA_pageOpen();

    case pb.set.configs.basic.n:
      return PB_SC_basic.SCB_pageOpen();

    case pb.set.configs.communication.n:
      return PB_SC_communication.SCC_pageOpen();

    case pb.set.configs.database.n:
      return PB_SC_database.SCD_pageOpen();

    case pb.set.configs.miscellaneous.n:
      return PB_SC_miscellaneous.SCM_pageOpen();

    case pb.set.configs.reports.n:
      return PB_SC_reports.SCR_pageOpen();

  }
}

// Public methods

export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function () {
  return baseRoute();
};
