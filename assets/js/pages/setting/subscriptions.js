// Shared variables

// Private functions

import {eTypes} from "../../base/events.js";
import pb from "../../base/structure.js";
import * as PB_SS_add from "./subscriptions/add.js";
import * as PB_SS_detail from "./subscriptions/detail.js";
import * as PB_SS_listing from "./subscriptions/listing.js";
import {get_thePathArr} from "../../base/global.js";

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
        case pb.set.subscriptions.add.n:
          return PB_SS_add.SSA_actions(event);

        case pb.set.subscriptions.detail.n:
          return PB_SS_detail.SSD_actions(event);

        case pb.set.subscriptions.listing.n:
          return PB_SS_listing.SSL_actions(event);

      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.set.subscriptions.add.n:
          return PB_SS_add.SSA_cards(event);

        case pb.set.subscriptions.detail.n:
          return PB_SS_detail.SSD_cards(event);

        case pb.set.subscriptions.listing.n:
          return PB_SS_listing.SSL_cards(event);


      }
      break;
    case eTypes.modal:
      switch (thePathArr[2]) {
        case pb.set.subscriptions.add.n:
          return PB_SS_add.SSA_modals(event);
      }
  }
}


const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.set.subscriptions.add.n:
      return PB_SS_add.SSA_pageOpen(data);

    case pb.set.subscriptions.detail.n:
      return PB_SS_detail.SSD_pageOpen(data);

    case pb.set.subscriptions.listing.n:
      return PB_SS_listing.SSL_pageOpen(data);

  }
}

// Public methods

export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function (data) {
  return baseRoute(data);
};
