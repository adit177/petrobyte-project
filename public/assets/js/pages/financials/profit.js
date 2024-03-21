import {eTypes} from "../../base/events.js";
import pb from "../../base/structure.js";
import * as PB_FP_comparison from "./profit/comparison.js";
import * as PB_FP_clients from "./profit/clients.js";
import * as PB_FP_days from "./profit/days.js";
import * as PB_FP_detailed from "./profit/detailed.js";
import * as PB_FP_months from "./profit/months.js";
import * as PB_FP_rates from "./profit/rates.js";
import * as PB_FP_schedule from "./profit/schedule.js";
import * as PB_FP_standard from "./profit/standard.js";
import {get_thePathArr} from "../../base/global.js";


// Shared variables

// Private functions

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
        case pb.fin.profit.comparison.n:
          return PB_FP_comparison.FPC_actions();
        case pb.fin.profit.clients.n:
          return PB_FP_clients.FPC_actions();
        case pb.fin.profit.days.n:
          return PB_FP_days.FPD_actions();
        case pb.fin.profit.detailed.n:
          return PB_FP_detailed.FPD_actions();
        case pb.fin.profit.months.n:
          return PB_FP_months.FPM_actions();
        case pb.fin.profit.rates.n:
          return PB_FP_rates.FPR_actions();
        case pb.fin.profit.schedule.n:
          return PB_FP_schedule.FPS_actions();
        case pb.fin.profit.standard.n:
          return PB_FP_standard.FPS_actions();
      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.fin.profit.comparison.n:
          return PB_FP_comparison.FPC_cards();
        case pb.fin.profit.clients.n:
          return PB_FP_clients.FPC_cards();
        case pb.fin.profit.days.n:
          return PB_FP_days.FPD_cards();
        case pb.fin.profit.detailed.n:
          return PB_FP_detailed.FPD_cards();
        case pb.fin.profit.months.n:
          return PB_FP_months.FPM_cards();
        case pb.fin.profit.rates.n:
          return PB_FP_rates.FPR_cards();
        case pb.fin.profit.schedule.n:
          return PB_FP_schedule.FPS_cards();
        case pb.fin.profit.standard.n:
          return PB_FP_standard.FPS_cards();
      }
      break;
    case eTypes.load:
      switch (thePathArr[2]) {
        case pb.fin.profit.clients.n:
          return PB_FP_clients.FPC_loads(event);
        case pb.fin.profit.comparison.n:
          return PB_FP_comparison.FPCM_loads(event);
        case pb.fin.profit.days.n:
          return PB_FP_days.FPD_loads(event);
        case pb.fin.profit.detailed.n:
          return PB_FP_detailed.FPDT_loads(event);
        case pb.fin.profit.months.n:
          return PB_FP_months.FPM_loads(event);
        case pb.fin.profit.rates.n:
          return PB_FP_rates.FPR_loads(event);
        case pb.fin.profit.standard.n:
          return PB_FP_standard.FPS_loads(event);

      }
  }
}


const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.fin.profit.comparison.n:
      return PB_FP_comparison.FPC_pageOpen(data);
    case pb.fin.profit.clients.n:
      return PB_FP_clients.FPC_pageOpen(data);
    case pb.fin.profit.days.n:
      return PB_FP_days.FPD_pageOpen(data);
    case pb.fin.profit.detailed.n:
      return PB_FP_detailed.FPD_pageOpen(data);
    case pb.fin.profit.months.n:
      return PB_FP_months.FPM_pageOpen(data)
    case pb.fin.profit.rates.n:
      return PB_FP_rates.FPR_pageOpen(data);
    case pb.fin.profit.schedule.n:
      return PB_FP_schedule.FPS_pageOpen(data);
    case pb.fin.profit.standard.n:
      return PB_FP_standard.FPS_pageOpen(data);
  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function (data) {
  return baseRoute(data);
};
