// Shared variables


// Private functions
/*
 -------------------------------
 Function Route Management
 -------------------------------
 */


import pb from "../base/structure.js";
import * as PB__SETT_profile from "../pages/setting/profile.js";
import * as PB__SETT_configs from "../pages/setting/configs.js";
import * as PB__SETT_method from "../pages/setting/method.js";
import * as PB__SETT_exports from "../pages/setting/exports.js";
import * as PB__SETT_intel from "../pages/setting/intel.js";
import * as PB__SETT_subscriptions from "../pages/setting/subscriptions.js";
import {get_thePathArr} from "../base/global.js";

function baseRouting(data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[1]) {

    case pb.set.profile.n:
      return PB__SETT_profile.baseRouting(data);

    case pb.set.configs.n:
      return PB__SETT_configs.baseRouting(data);

    case pb.set.method.n:
      return PB__SETT_method.baseRouting(data);

    case pb.set.exports.n:
      return PB__SETT_exports.baseRouting(data);

    case pb.set.intel.n:
      return PB__SETT_intel.baseRouting(data);

    case pb.set.subscriptions.n:
      return PB__SETT_subscriptions.baseRouting(data);
  }

}

function actionRouting(_event, _return, _data) {
  if (_return.indexOf(_event.type) !== -1) return true;

  const thePathArr = get_thePathArr();
  switch (thePathArr[1]) {

    // todo: @dinesh, only send the _event.

    case pb.set.method.n:
      return PB__SETT_method.actionRouting(_event);

    case pb.set.profile.n:
      return PB__SETT_profile.actionRouting(_event, _data);

    case pb.set.configs.n:
      return PB__SETT_configs.actionRouting(_event, _data);

    case pb.set.exports.n:
      return PB__SETT_exports.actionRouting(_event, _data);

    case pb.set.intel.n:
      return PB__SETT_intel.actionRouting(_event, _data);

    case pb.set.subscriptions.n:
      return PB__SETT_subscriptions.actionRouting(_event, _data);
  }
}

// Public methods

export const pageStateRouting = function (data) {
  return baseRouting(data);
};
// todo: @dinesh, only send the _event and _return.
export const userActionRouting = function (_event, _return, _data) {
  return actionRouting(_event, _return, _data);
};
