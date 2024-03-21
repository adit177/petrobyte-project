import pb from "../base/structure.js";
import * as PB__TAX_gstreport from "../pages/taxation/gstreport.js";
import * as PB__TAX_gstreturn from "../pages/taxation/gstreturn.js";
import * as PB__TAX_standard from "../pages/taxation/standard.js";
import * as PB__TAX_vatreport from "../pages/taxation/vatreport.js";
import * as PB__TAX_vatreturn from "../pages/taxation/vatreturn.js";
import {get_thePathArr} from "../base/global.js";

function baseRouting(data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[1]) {

    case pb.tax.gstreport.n:
      return PB__TAX_gstreport.baseRouting(data)

    case pb.tax.gstreturn.n:
      return PB__TAX_gstreturn.baseRouting(data)

    case pb.tax.standard.n:
      return PB__TAX_standard.baseRouting(data)

    case pb.tax.vatreport.n:
      return PB__TAX_vatreport.baseRouting(data)

    case pb.tax.vatreturn.n:
      return PB__TAX_vatreturn.baseRouting(data)
  }

}

function actionRouting(_event, _return) {
  if (_return.indexOf(_event.type) !== -1) return true;

  const thePathArr = get_thePathArr();

  switch (thePathArr[1]) {
    case pb.tax.gstreport.n:
      return PB__TAX_gstreport.actionRouting(_event);

    case pb.tax.gstreturn.n:
      return PB__TAX_gstreturn.actionRouting(_event)

    case pb.tax.standard.n:
      return PB__TAX_standard.actionRouting(_event)

    case pb.tax.vatreport.n:
      return PB__TAX_vatreport.actionRouting(_event)

    case pb.tax.vatreturn.n:
      return PB__TAX_vatreturn.actionRouting(_event)
  }
}

// Public methods

export const pageStateRouting = function (data) {
  return baseRouting(data);
};
export const userActionRouting = function (_event, _return) {
  return actionRouting(_event, _return);
};
