// Shared variables

// Private functions

import {eTypes} from "../../base/events.js";
import pb from "../../base/structure.js";
import * as PB_TG_fetch2b from "./gstreturn/fetch2b.js";
import * as PB_TG_gstrone from "./gstreturn/gstrone.js";
import * as PB_TG_gstrthreeb from "./gstreturn/gstrthreeb.js";
import {get_thePathArr} from "../../base/global.js";

/**
 * This support all layouts routing.
 * @param event
 * @param data
 */
const actionRoute = function (event) {
  console.log(event);
  const thePathArr = get_thePathArr();
  // fetching required page data

  switch (event.type) {
    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.tax.gstreturn.fetch2b.n:
          return PB_TG_fetch2b.TGF_actions(event);

        case pb.tax.gstreturn.gstrone.n:
          return PB_TG_gstrone.TGG_actions(event);

        case pb.tax.gstreturn.gstrthreeb.n:
          return PB_TG_gstrthreeb.TGT_actions(event);
      }
      break;

    case eTypes.modal:

      switch (thePathArr[2]) {
        case pb.tax.gstreturn.gstrthreeb.n:
          return PB_TG_gstrthreeb.TGT_modals(event);
      }

      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.tax.gstreturn.fetch2b.n:
          return PB_TG_fetch2b.TGF_cards(event);

        case pb.tax.gstreturn.gstrone.n:
          return PB_TG_gstrone.TGG_cards(event);

        case pb.tax.gstreturn.gstrthreeb.n:
          return PB_TG_gstrthreeb.TGT_cards(event);
      }
      break;
  }
}


const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.tax.gstreturn.fetch2b.n:
      return PB_TG_fetch2b.TGF_pageOpen(data);

    case pb.tax.gstreturn.gstrone.n:
      return PB_TG_gstrone.TGG_pageOpen(data);

    case pb.tax.gstreturn.gstrthreeb.n:
      return PB_TG_gstrthreeb.TGT_pageOpen(data);
  }
}

// Public methods

export const actionRouting = function (_event) {
  console.log(_event);
  return actionRoute(_event);
};

export const baseRouting = function (data) {
  return baseRoute(data);
};
