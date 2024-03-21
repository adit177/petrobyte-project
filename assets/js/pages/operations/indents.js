import * as PB_OI_orders from "./indents/orders.js";
import * as PB_OI_tokens from "./indents/tokens.js";
import {eTypes} from "../../base/events.js";
import pb from "../../base/structure.js";


// Shared variables

// Private functions

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
        case pb.opr.indents.orders.n:
          return PB_OI_orders.OIO_actions(event);

        case pb.opr.indents.tokens.n:
          return PB_OI_tokens.OIT_actions(event);


      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.opr.indents.orders.n:
          return PB_OI_orders.OIO_cards(event);

        case pb.opr.indents.tokens.n:
          return PB_OI_tokens.OIT_cards(event);

      }
      break;


  }
}


const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.opr.indents.orders.n:
      return PB_OI_orders.OIO_pageOpen();

    case pb.opr.indents.tokens.n:
      return PB_OI_tokens.OIT_pageOpen();

  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function (data) {
  return baseRoute();
};

