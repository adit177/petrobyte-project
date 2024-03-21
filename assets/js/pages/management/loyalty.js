import {get_thePathArr} from "../../base/global.js";
import pb from "../../base/structure.js";
import {eTypes} from "../../base/events.js"
import * as PB_ML_rewards from "./loyalty/rewards.js";
import * as PB_ML_renders from "./loyalty/renders.js";

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
        case pb.mng.loyalty.renders.n:
          return PB_ML_renders.MLR_actions(event);

        case pb.mng.loyalty.rewards.n:
          return PB_ML_rewards.MLW_actions(event);

      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.mng.loyalty.renders.n:
          return PB_ML_renders.MLR_cards(event);

        case pb.mng.loyalty.rewards.n:
          return PB_ML_rewards.MLW_cards(event);
      }
      break;
  }
}


const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.mng.loyalty.renders.n:
      return PB_ML_renders.MLR_pageOpen(data);

    case pb.mng.loyalty.rewards.n:
      return PB_ML_rewards.MLW_pageOpen(data);
  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function () {
  return baseRoute(data);
};
