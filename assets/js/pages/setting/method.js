// Private functions

import {eTypes}       from "../../base/events.js";
import pb             from "../../base/structure.js";
import {PB_SM_sample} from "./method/sample.js";

/**
 * This support all layouts routing.
 * @param page
 * @param element
 * @param button
 */
const actionRoute = function (_event) {
  // fetching required page data
  switch (_event.type) {
    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.set.method.sample.n:
          return PB_SM_sample.SMS_actions(_event);
      }
      break;

    case eTypes.form:
      switch (thePathArr[2]) {
        case pb.set.method.sample.n:
          return PB_SM_sample.SMS_forms(_event);
      }

    case eTypes.table:
      switch (thePathArr[2]) {
        case pb.set.method.sample.n:
          return PB_SM_sample.SMS_tables(_event);
      }
    case eTypes.load:
      switch (thePathArr[2]) {
        case pb.set.method.sample.n:
          return PB_SM_sample.SMS_loads(_event);
      }

    default:
      alert('No action found for this button. in method.js');
      break;
  }
}

const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.set.method.sample.n:
      return PB_SM_sample.SMS_pageOpen();
  }
}

// Public methods

export const actionRouting = function (_event) {
  return actionRoute(_event);
};
export const baseRouting = function () {
  return baseRoute();
};
