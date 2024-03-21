// Shared variables
import * as PB_MU_detail from "./users/detail.js";
import * as PB_MU_add from "./users/add.js";
import * as PB_MU_roles from "./users/roles.js";
import * as PB_MU_permissions from "./users/permissions.js";
import pb from "../../base/structure.js";
import {eTypes} from "../../base/events.js";

let redData;

// Private functions

/**
 * This support all layouts routing.
 * @param page
 * @param element
 * @param button
 */
const actionRoute = function (event, data) {
  // fetching required page data
  switch (event.type) {

    case eTypes.table:
      switch (thePathArr[2]) {
        case pb.mng.users.listing:
          return PB_MU_listing.MUL_tables(event);
      }
      break;

    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.mng.users.listing.n:
          return PB_MU_listing.MUL_actions(event);
        case pb.mng.users.detail.n:
          return PB_MU_detail.MUD_actions(event);
        case pb.mng.users.add.n:
          return PB_MU_add.MUA_actions(event);
        case pb.mng.users.roles.n:
          return PB_MU_roles.MUR_actions(event);
        case pb.mng.users.permissions.n:
          return PB_MU_permissions.MUP_actions(event);
      }
      break;

    case eTypes.navtab:
      switch (thePathArr[2]) {
        case pb.mng.users.listing.n:
          return PB_MU_listing.MUL_navtabs(event);
        case pb.mng.users.detail.n:
          return PB_MU_detail.MUD_navtabs(event);
      }

    case eTypes.paging:
      switch (thePathArr[2]) {
        case pb.mng.users.listing.n:
          return PB_MU_listing.MUL_paging(event);
      }

    case eTypes.element:
      switch (thePathArr[2]) {
        case pb.mng.users.setting.n:
          return PB_MU_setting.MUS_elements(event);
      }
    case eTypes.load:
      switch (thePathArr[2]) {
        case pb.mng.users.detail.n:
          return PB_MU_detail.MUD_loads(event);
        case pb.mng.users.add.n:
          return PB_MU_add.MUA_loads(event);
      }
    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.mng.users.add.n:
          return PB_MU_add.MUA_cards(event);
      }
    case eTypes.modal:
      switch (thePathArr[2]) {
        case pb.mng.users.detail.n:
          return PB_MU_detail.MUD_modals(event);
      }

    default:
      console.log(button);
      break;
  }
}

const baseRoute = function () {
  switch (thePathArr[2]) {
    case pb.mng.users.listing.n:
      return PB_MU_listing.MUL_pageOpen();

    case pb.mng.users.detail.n:
      return PB_MU_detail.MUD_pageOpen();

    case pb.mng.users.setting.n:
      return PB_MU_setting.MUS_pageOpen();

    case pb.mng.users.add.n:
      return PB_MU_add.MUA_pageOpen();

    default:
      alert('No route found for ' + thePathArr[2]);
  }
}

// Public methods

export const actionRouting = function (_event) {
  return actionRoute(_event);
};
export const baseRouting = function () {
  return baseRoute();
};