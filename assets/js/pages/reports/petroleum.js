// Shared variables
import * as PB_RP_pistol from "./petroleum/pistol.js";
import * as PB_RP_summary from "./petroleum/summary.js";
import * as PB_RP_flowsheet from "./petroleum/flowsheet.js";
import * as PB_RP_overview from "./petroleum/overview.js";
import * as PB_RP_report from "./petroleum/report.js"
import {eTypes} from "../../base/events.js";
import pb from "../../base/structure.js";
import * as PB_RP_rates from "./petroleum/rates.js";
import {get_thePathArr} from "../../base/global.js";

const petroleumRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.rpt.petroleum.rates.n:
      return PB_RP_rates.RPR_Requests(data, type);

    case pb.rpt.petroleum.pistol.n:
      return PB_RP_pistol.RPP_Requests(data, type);

    case pb.rpt.petroleum.summary.n:
      return PB_RP_summary.RPY_Requests(data, type);

    case pb.rpt.petroleum.flowsheet.n:
      return PB_RP_flowsheet.RPF_Requests(data, type);

    case pb.rpt.petroleum.overview.n:
      return PB_RP_overview.RPO_Requests(data, type);

    case pb.rpt.petroleum.report.n:
      return PB_RP_report.RPT_Requests(data, type);

    case pb.rpt.petroleum.stock.n:
      return PB_RP_stock.RPS_Requests(data, type);
  }
}

// Public methods


//export const actionRouting = function (_event) {
//  return actionRoute(_event);
//};

export const petroleumRouting = function (data, type) {
  return petroleumRoute(data, type);
};
