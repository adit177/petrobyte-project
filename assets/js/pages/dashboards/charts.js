import pb from "../../base/structure.js";
import * as PB_DC_business from "./charts/business.js";
import * as PB_DC_profit from "./charts/profit.js";
import {get_thePathArr} from "../../base/global.js";
import * as PB_DC_stocks from "./charts/stock.js";
import * as PB_DC_customers from "./charts/customers.js";

const chartsRoute = function (data, type) {
  switch (get_thePathArr()[2]) {
    case pb.dsb.charts.business.n:
      return PB_DC_business.DCB_Requests(data, type);
    case pb.dsb.charts.stock.n:
      return PB_DC_stocks.DCS_pageOpen(data, type);
    case pb.dsb.charts.profit.n:
      return PB_DC_profit.DCP_pageOpen(data, type);
    case pb.dsb.charts.customer.n:
      return PB_DC_customers.DCC_pageOpen(data, type);
  }
}

// Public methods
export const chartsRouting = function (data, type) {
  return chartsRoute(data, type);
};
