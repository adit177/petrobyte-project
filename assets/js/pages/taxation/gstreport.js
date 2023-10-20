// Shared variables
import {eTypes}             from "../../base/events.js";
import pb                   from "../../base/structure.js";
import * as PB_TG_sales     from "./gstreport/sales.js";
import * as PB_TG_purchases from "./gstreport/purchases.js";

let redData;

// Private functions

/**
 * This support all layouts routing.
 * @param page
 * @param element
 * @param button
 */
const actionRoute = function (_event) {
  // fetching required page data
  switch (_event.type) {

    case eTypes.report:
      switch (thePathArr[2]) {
        case pb.tax.gstreport.sales.n:
          return PB_TG_sales.TGS_reports(_event);
        case pb.tax.gstreport.purchases.n:
          return PB_TG_purchases.TGP_reports(_event);

      }
      break;

    case eTypes.tab:
      switch (thePathArr[2]) {
        case pb.tax.gstreport.sales.n:
          return PB_TG_sales.TGS_tabs(_event);
        case pb.tax.gstreport.purchases.n:
          return PB_TG_purchases.TGP_tabs(_event);

      }
      break;

    case eTypes.table:
      switch (thePathArr[2]) {
        case pb.tax.gstreport.sales.n:
          return PB_TG_sales.TGS_tables(_event);
        case pb.tax.gstreport.purchases.n:
          return PB_TG_purchases.TGP_tables(_event);
      }
      break;

    case eTypes.back:
      switch (thePathArr[2]) {
        case pb.tax.gstreport.sales.n:
          return PB_TG_sales.TGS_backs(_event);
        case pb.tax.gstreport.purchases.n:
          return PB_TG_purchases.TGP_backs(_event);
      }
      break;
  }
}


const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.tax.gstreport.sales.n:
      return PB_TG_sales.TGS_state();
    case pb.tax.gstreport.purchases.n:
      return PB_TG_purchases.TGP_state();
  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function () {
  return baseRoute();
};
