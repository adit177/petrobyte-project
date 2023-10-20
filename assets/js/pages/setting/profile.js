// Shared variables
import {eTypes} from "../../base/events.js";
import pb from "../../base/structure.js";
import * as PB_SP_account from "./profile/account.js";
import * as PB_SP_billing from "./profile/billing.js";
import * as PB_SP_invoice from "./profile/invoice.js";
import * as PB_SP_overview from "./profile/overview.js";
import * as PB_SP_wallet from "./profile/wallet.js";
import * as PB_SP_security from "./profile/security.js";
import * as PB_SP_referral from "./profile/referral.js";
import * as PB_SP_logs from "./profile/logs.js";
import {get_thePathArr} from "../../base/global.js";

let redData;

// Private functions

/**
 * This support all layouts routing.
 * @param page
 * @param element
 * @param button
 */
const actionRoute = function (event, data) {
  const thePathArr = get_thePathArr();
  // fetching required page data
  switch (event.type) {

    case eTypes.load:
      switch (thePathArr[2]) {
        case pb.set.profile.account.n:
          return PB_SP_account.SPA_loads(event);
      }

    case eTypes.table:
      switch (thePathArr[2]) {
        case pb.set.profile.account.n:
          return PB_SP_account.SPA_loads(event);
      }
      break;

    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.set.profile.overview.n:
          return PB_SP_overview.SPO_actions(event);
        case pb.set.profile.account.n:
          return PB_SP_account.SPA_actions(event);
        case pb.set.profile.billing.n:
          return PB_SP_billing.SPB_actions(event);
        case pb.set.profile.invoice.n:
          return PB_SP_invoice.SPI_actions(event);
        case pb.set.profile.logs.n:
          return PB_SP_logs.SPL_actions(event);
        case pb.set.profile.referral.n:
          return PB_SP_referral.SPR_actions(event);
        case pb.set.profile.security.n:
          return PB_SP_security.SPS_actions(event);
        case pb.set.profile.wallet.n:
          return PB_SP_wallet.SPW_actions(event);
      }
      break;
    case eTypes.modal:
      switch (thePathArr[2]) {
        case pb.set.profile.overview.n:
          return PB_SP_overview.SPO_modals(event);
        case pb.set.profile.account.n:
          return PB_SP_account.SPA_modals(event);
        case pb.set.profile.billing.n:
          return PB_SP_billing.SPB_modals(event);
        case pb.set.profile.invoice.n:
          return PB_SP_invoice.SPI_modals(event);
        case pb.set.profile.logs.n:
          return PB_SP_logs.SPL_modals(event);
        case pb.set.profile.referral.n:
          return PB_SP_referral.SPR_modals(event);
        case pb.set.profile.security.n:
          return PB_SP_security.SPS_modals(event);
        case pb.set.profile.wallet.n:
          return PB_SP_wallet.SPW_modals(event);
      }
    default:
      console.log(button);
      break;
  }
}

const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.set.profile.account.n:
      return PB_SP_account.SPA_pageOpen(data);

    case pb.set.profile.billing.n:
      return PB_SP_billing.SPB_pageOpen(data);

    case pb.set.profile.invoice.n:
      return PB_SP_invoice.SPI_pageOpen(data);

    case pb.set.profile.logs.n:
      return PB_SP_logs.SPL_pageOpen(data);

    case pb.set.profile.overview.n:
      return PB_SP_overview.SPO_pageOpen(data);

    case pb.set.profile.referral.n:
      return PB_SP_referral.SPR_pageOpen(data);

    case pb.set.profile.security.n:
      return PB_SP_security.SPS_pageOpen(data);

    case pb.set.profile.wallet.n:
      return PB_SP_wallet.SPW_pageOpen(data);
  }
}

// Public methods

export const actionRouting = function (_event, _data) {
  return actionRoute(_event, _data);
};

export const baseRouting = function (data) {
  return baseRoute(data);
};
