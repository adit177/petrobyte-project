import {get_callEl}        from "../../base/global.js";
import pb                  from "../../base/structure.js";
import {eTypes}            from "../../base/events.js";
import * as PB_CE_compose  from "./email/compose.js";
import * as PB_CE_inbox    from "./email/mail.js";
import * as PB_CE_template from "./email/template.js";


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
        case pb.com.email.compose.n:
          return PB_CE_compose.CEC_cards(_event);

        case pb.com.email.inbox.n:
          return PB_CE_inbox.CEI_cards(_event);

        case pb.com.email.template.n:
          return PB_CE_template.CET_cards(_event);
      }
      break;

    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.com.email.compose.n:
          return PB_CE_compose.CEC_actions(_event);

        case pb.com.email.inbox.n:
          return PB_CE_inbox.CEI_actions(_event);

        case pb.com.email.template.n:
          return PB_CE_template.CET_actions(_event);
      }
      break;

    case eTypes.goto:
      switch (thePathArr[2]) {
        case pb.com.email.mail.n:
          return PB_CE_mail.CEI_goto(_event);
      }

    default:
      console.log(_event);
      break;
  }
}

const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.com.email.compose.n:
      return PB_CE_compose.CEC_pageOpen();

    case pb.com.email.mail.n:
      console.log("in mail route")
      return PB_CE_mail.CEM_pageOpen();

    case pb.com.email.template.n:
      return PB_CE_template.CET_pageOpen();

  }
}

// Public methods

export const actionRouting = function (page, element, button) {
  return actionRoute(page, element, button);
};
export const baseRouting = function () {
  console.log("in email base routing");
  return baseRoute();
};
