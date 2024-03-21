import * as PB_ME_listing from "./employees/listing.js";
import * as PB_ME_add from "./employees/add.js";
import * as PB_ME_detail from "./employees/detail.js";
import {get_thePathArr} from "../../base/global.js";
import pb from "../../base/structure.js";
// Class definition


// Shared variables

// Private functions


const employeeRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.mng.employees.add.n:
      return PB_ME_add.MEA_Requests(data, type);

    case pb.mng.employees.listing.n:
      return PB_ME_listing.MEL_Requests(data, type);

    case pb.mng.employees.detail.n:
      return PB_ME_detail.MED_Requests(data, type);
    // and so on
  }
}

export const employeeRouting = function (data, type) {
  return employeeRoute(data, type);
};
