// Shared variables

// Private functions

import {eTypes}             from "../../base/events.js";
import pb                   from "../../base/structure.js";
import * as PB_TV_combined  from "./vatreport/combined.js";
import * as PB_TV_overview  from "./vatreport/overview.js";
import * as PB_TV_purchases from "./vatreport/purchases.js";
import * as PB_TV_sales     from "./vatreport/sales.js";

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
        case pb.tax.vatreport.combined.n:
          return PB_TV_combined.TVC_actions(event);

        case pb.tax.vatreport.overview.n:
          return PB_TV_overview.TVO_actions(event);

        case pb.tax.vatreport.purchases.n:
          return PB_TV_purchases.TVP_actions(event);

        case pb.tax.vatreport.sales.n:
          return PB_TV_sales.TVS_actions(event);
      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.tax.vatreport.combined.n:
          return PB_TV_combined.TVC_cards(event);

        case pb.tax.vatreport.overview.n:
          return PB_TV_overview.TVO_cards(event);

        case pb.tax.vatreport.purchases.n:
          return PB_TV_purchases.TVP_cards(event);

        case pb.tax.vatreport.sales.n:
          return PB_TV_sales.TVS_cards(event);
      }
      break;
  }
}


const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.tax.vatreport.combined.n:
      return PB_TV_combined.TVC_pageOpen();

    case pb.tax.vatreport.overview.n:
      return PB_TV_overview.TVO_pageOpen();

    case pb.tax.vatreport.purchases.n:
      return PB_TV_purchases.TVP_pageOpen();

    case pb.tax.vatreport.sales.n:
      return PB_TV_sales.TVS_pageOpen();
  }
}


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function () {
  return baseRoute();
};
