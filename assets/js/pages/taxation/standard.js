// Shared variables

// Private functions

import {eTypes}             from "../../base/events.js";
import pb                   from "../../base/structure.js";
import * as PB_TS_gst       from "./standard/gst.js";
import * as PB_TS_incometax from "./standard/incometax.js";
import * as PB_TS_tcs       from "./standard/tcs.js";
import * as PB_TS_tds       from "./standard/tds.js";
import * as PB_TS_vat       from "./standard/vat.js";

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
        case pb.tax.standard.gst.n:
          return PB_TS_gst.TSG_actions(event);

        case pb.tax.standard.incometax.n:
          return PB_TS_incometax.TSI_actions(event);

        case pb.tax.standard.tcs.n:
          return PB_TS_tcs.TST_actions(event);

        case pb.tax.standard.tds.n:
          return PB_TS_tds.TSD_actions(event);

        case pb.tax.standard.vat.n:
          return PB_TS_vat.TSV_actions(event);
      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.tax.standard.gst.n:
          return PB_TS_gst.TSG_cards(event);

        case pb.tax.standard.incometax.n:
          return PB_TS_incometax.TSI_cards(event);

        case pb.tax.standard.tcs.n:
          return PB_TS_tcs.TST_cards(event);

        case pb.tax.standard.tds.n:
          return PB_TS_tds.TSD_cards(event);

        case pb.tax.standard.vat.n:
          return PB_TS_vat.TSV_cards(event);
      }
      break;
  }
}


const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.tax.standard.gst.n:
      return PB_TS_gst.TSG_pageOpen();

    case pb.tax.standard.incometax.n:
      return PB_TS_incometax.TSI_pageOpen();

    case pb.tax.standard.tcs.n:
      return PB_TS_tcs.TST_pageOpen();

    case pb.tax.standard.tds.n:
      return PB_TS_tds.TSD_pageOpen();

    case pb.tax.standard.vat.n:
      return PB_TS_vat.TSV_pageOpen();
  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function () {
  return baseRoute();
};
