import * as PB_DS_business from "./statistics/business.js";
import * as PB_DS_customers from "./statistics/customers.js";
import * as PB_DS_products from "./statistics/products.js";
import * as PB_DS_finance from "./statistics/finance.js";
import {get_thePathArr} from "../../base/global.js";
import pb from "../../base/structure.js";

const statisticsRoute = function (data, type) {

  switch (get_thePathArr()[2]) {

    case pb.dsb.statistics.business.n:
      return PB_DS_business.DSB_Requests(data, type);

    case pb.dsb.statistics.customers.n:
      return PB_DS_customers.DSC_Requests(data, type);

    case pb.dsb.statistics.products.n:
      return PB_DS_products.DSP_Requests(data, type);

    case pb.dsb.statistics.finance.n:
      return PB_DS_finance.DSF_Requests(data, type);
  }
}
export const statisticsRouting = function (data, type) {
  return statisticsRoute(data, type);
}