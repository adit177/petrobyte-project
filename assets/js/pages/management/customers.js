import * as PB_MC_listing from "./customers/listing.js";
import * as PB_MC_detail from "./customers/detail.js";
import * as PB_MC_add from "./customers/add.js";
import {get_thePathArr} from "../../base/global.js";
import pb from "../../base/structure.js";
import {eTypes} from "../../base/events.js"


// Shared variables

// Private functions


const customerRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.mng.employees.add.n:
      return PB_MC_add.MCA_Requests(data, type);

    case pb.mng.employees.listing.n:
      return PB_MC_listing.MCL_Requests(data, type);

    case pb.mng.employees.detail.n:
      return PB_MC_detail.MCD_Requests(data, type);
    // and so on
  }
}

export const customerRouting = function (data, type) {
  return customerRoute(data, type);
};


