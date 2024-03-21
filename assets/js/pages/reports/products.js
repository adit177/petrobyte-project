// Shared variables
import * as PB_RP_sales from "./products/sales.js";
import * as PB_RP_purchases from "./products/purchases.js";
import * as PB_RP_stocks from "./products/stocks.js";
import pb from "../../base/structure.js";
import {eTypes} from "../../base/events.js";
import {get_thePathArr} from "../../base/global.js";


let redData;

// Private functions

/**
 * This support all layouts routing.
 * @param page
 * @param element
 * @param button
 */


const productsRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.rpt.products.sales.n:
      return PB_RP_sales.RPS_pageOpen(data, type);

    case pb.rpt.products.purchases.n:
      return PB_RP_purchases.RPP_pageOpen(data, type);

    case pb.rpt.products.stocks.n:
      return PB_RP_stocks.RPST_pageOpen(data, type);

  }
}

export const productsRouting = function (data, type) {
  return productsRoute(data, type);
}
// Public methods




