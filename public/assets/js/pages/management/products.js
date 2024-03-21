// Shared variables
import * as PB_MP_listing from "./products/listing.js";
import pb from "../../base/structure.js";
import {eTypes} from "../../base/events.js";
import {get_thePathArr} from "../../base/global.js";
import * as PB_MP_detail from "./products/detail.js";
import * as PB_MP_setting from "./products/setting.js";
import * as PB_MP_add from "./products/add.js";

let redData;

// Private functions


const productsRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.mng.products.listing.n:
      return PB_MP_listing.MPL_Requests(data, type);

    case pb.mng.products.add.n:
      return PB_MP_add.MPA_Requests(data, type);

    case pb.mng.products.detail.n:
      return PB_MP_detail.MPD_Requests(data, type);

    case pb.mng.products.setting.n:
      return PB_MP_setting.MPS_Requests(data, type);
  }
}


// Public methods


export const productsRouting = function (data, type) {
  return productsRoute(data, type);
};
