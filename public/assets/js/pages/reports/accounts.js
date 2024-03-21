// Shared variables
import * as PB_RA_statement from "./accounts/statement.js";
import * as PB_RA_register from "./accounts/register.js";
import * as PB_RA_wave from "./accounts/variant.js";
import * as PB_RA_lists from "./accounts/lists.js";
import pb from "../../base/structure.js";
import {get_thePathArr} from "../../base/global.js";

const accountsRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.rpt.accounts.statement.n:
      return PB_RA_statement.RAS_pageOpen(data, type);

    case pb.rpt.accounts.register.n:
      return PB_RA_register.RAR_Requests(data, type);

    case pb.rpt.accounts.wave.n:
      return PB_RA_wave.RAW_pageOpen(data, type);

    case pb.rpt.accounts.lists.n:
      return PB_RA_lists.RAL_Requests(data, type);
  }
}

// Public methods
export const accountsRouting = function (data, type) {
  return accountsRoute(data, type);
};
