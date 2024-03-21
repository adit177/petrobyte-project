import {get_thePathArr} from "../../base/global.js";
import pb from "../../base/structure.js";
import {eTypes} from "../../base/events.js"
import * as PB_MI_orders from "./indents/orders.js";
import * as PB_MI_tokens from "./indents/tokens.js";

// Class definition


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
        case pb.mng.indents.orders.n:
          return PB_MI_orders.MIO_actions(event);

        case pb.mng.indents.tokens.n:
          return PB_MI_tokens.MIT_actions(event);

      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.mng.indents.orders.n:
          return PB_MI_orders.MIO_cards(event);

        case pb.mng.indents.tokens.n:
          return PB_MI_tokens.MIT_cards(event);

      }
      break;
  }
}


const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.mng.indents.orders.n:
      return PB_MI_orders.MIO_pageOpen(data);

    case pb.mng.indents.tokens.n:
      return PB_MI_tokens.MIT_pageOpen(data);
  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function () {
  return baseRoute(data);
};
