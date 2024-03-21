import * as PB_RG_balance from "./general/board.js";
import * as PB_RG_board from "./general/board.js";
import * as PB_RG_dsr from "./general/dsr.js";
import * as PB_RG_onepage from "./general/onepage.js";
import * as PB_RG_rocket from "./general/rocket.js";
import * as PB_RG_transacts from "./general/transacts.js";
import pb from "../../base/structure.js";
import {get_thePathArr} from "../../base/global.js";

const generalRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.rpt.general.balance.n:
      return PB_RG_balance.RGB_pageOpen(data);

    case pb.rpt.general.board.n:
      return PB_RG_board.RGS_pageOpen(data);

    case pb.rpt.general.dsr.n:
      return PB_RG_dsr.RGD_pageOpen(data, type);

    case pb.rpt.general.onepage.n:
      return PB_RG_onepage.RGO_pageOpen(data);

    case pb.rpt.general.rocket.n:
      return PB_RG_rocket.RGR_pageOpen(data);

    case pb.rpt.general.transacts.n:
      return PB_RG_transacts.RGT_pageOpen(data);
  }
}

export const generalRouting = function (data, type) {
  return generalRoute(data, type);
}