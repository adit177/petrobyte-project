import {get_callEl} from "../../base/global.js";
import pb           from "../../base/structure.js";


// Shared variables
let redData;

// Private functions

/**
 * This support all layouts routing.
 * @param _event
 */
const actionRoute = function (_event) {
  // fetching required page data
  switch (_event.type) {

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.com.whatsapp.single.n:
          return PB_CW_single.CWS_cards(_event);

        case pb.com.whatsapp.group.n:
          return PB_CW_group.CWG_cards(_event);

      }
      break;

    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.com.whatsapp.single.n:
          return PB_CW_single.CWS_actions(_event);

        case pb.com.whatsapp.group.n:
          return PB_CW_group.CWG_actions(_event);
      }
      break;

    default:
      console.log(_event);
      break;
  }
}

const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.com.whatsapp.single.n:
      return PB_CW_single.CWS_pageOpen();

    case pb.com.whatsapp.group.n:
      return PB_CW_group.CWG_pageOpen();
  }
}

// Public methods

export const actionRouting = function (page, element, button) {
  return actionRoute(page, element, button);
};
export const baseRouting = function () {
  return baseRoute();
};
