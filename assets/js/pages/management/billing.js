import * as PB_MB_generate from "./billing/generate.js";
import * as PB_MB_create from "./billing/create.js";
import * as PB_MB_bucket from "./billing/bucket.js";
import * as PB_MB_display from "./billing/display.js";
import {get_thePathArr} from "../../base/global.js";
import pb from "../../base/structure.js";


const billingRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.mng.billing.generate.n:
      return PB_MB_generate.MBG_Requests(data, type);

    case pb.mng.billing.bucket.n:
      return PB_MB_bucket.MBB_Requests(data, type);

    case pb.mng.billing.create.n:
      return PB_MB_create.MBC_Requests(data, type);

    case pb.mng.billing.display.n:
      return PB_MB_display.MBD_Requests(data, type);

  }
}

// Public methods

export const billingRouting = function (data, type) {
  return billingRoute(data, type);
};


