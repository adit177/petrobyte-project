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

    case eTypes.load:
      console.log("message load")
      switch (thePathArr[2]) {
        case pb.com.message.single.n:
          return PB_CM_single.CMS_loads(_event);
        case pb.com.message.group.n:
          return PB_CM_group.CMG_loads(_event);
      }
      break;

    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.com.message.single.n:
          return PB_CM_single.CMS_actions(_event);

        case pb.com.message.group.n:
          return PB_CM_group.CMG_actions(_event);
      }
      break;

    case eTypes.modal:
      switch (thePathArr[2]) {
        case pb.com.message.single.n:
          return PB_CM_single.CMS_modals(_event);

        case pb.com.message.group.n:
          return PB_CM_group.CMG_modals(_event);
      }
      break;


    default:
      console.log(_event);
      break;
  }
}

const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.com.message.single.n:
      return PB_CM_single.CMS_pageOpen();

    case pb.com.message.group.n:
      console.log("in group");
      return PB_CM_group.CMG_pageOpen();
  }
}

// Public methods

export const actionRouting = function (page, element, button) {
  return actionRoute(page, element, button);
};
export const baseRouting = function () {
  return baseRoute();
};
