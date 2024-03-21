import * as PB_CC_email    from "./chats/email.js";
import * as PB_CC_message  from "./chats/message.js";
import * as PB_CC_whatsapp from "./chats/whatsapp.js";

import {eTypes}         from "../../base/events.js";
import {get_thePathArr} from "../../base/global.js";
import pb               from "../../base/structure.js";


// Shared variables
let redData;

// Private functions

/**
 * This support all layouts routing.
 * @param _event
 */
const actionRoute = function (_event) {

  const thePathArr = get_thePathArr();

  // fetching required page data
  switch (_event.type) {

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.com.chats.email.n:
          return PB_CC_email.CCE_cards(_event);

        case pb.com.chats.message.n:
          return PB_CC_message.CCM_cards(_event);

        case pb.com.chats.whatsapp.n:
          return PB_CC_whatsapp.CCW_cards(_event);
      }
      break;

    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.com.chats.email.n:
          return PB_CC_email.CCE_actions(_event);

        case pb.com.chats.message.n:
          return PB_CC_message.CCM_actions(_event);

        case pb.com.chats.whatsapp.n:
          return PB_CC_whatsapp.CCW_actions(_event);
      }
      break;

    default:
      console.log(_event);
      break;
  }
}

const baseRoute = function (data) {

  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.com.chats.email.n:
      return PB_CC_email.CCE_pageOpen(data);

    case pb.com.chats.message.n:
      return PB_CC_message.CCM_pageOpen(data);

    case pb.com.chats.whatsapp.n:
      return PB_CC_whatsapp.CCW_pageOpen(data);

  }
}

// Public methods

export const actionRouting = function (page, element, button) {
  return actionRoute(page, element, button);
};
export const baseRouting = function (data) {
  return baseRoute(data);
};
