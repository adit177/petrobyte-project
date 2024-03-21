import pb from "../../base/structure.js";
import {get_thePathArr} from "../../base/global.js";
import * as PB_SP_alert from "./plugins/alert.js";
import * as PB_SP_charts from "./plugins/charts.js";
import * as PB_SP_datatables from "./plugins/datatables.js";
import * as PB_SP_date from "./plugins/dates.js";
import * as PB_SP_mask from "./plugins/mask.js";
import * as PB_SP_range from "./plugins/range.js";
import * as PB_SP_repeater from "./plugins/repeater.js";
import * as PB_SP_select from "./plugins/select.js";
import * as PB_SP_tagify from "./plugins/tagify.js";
import * as PB_SP_validation from "./plugins/validation.js";


const pluginsRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {

    case pb.sam.plugins.alert.n:
      return PB_SP_alert.SPA_Requests(data, type);

    case pb.sam.plugins.charts.n:
      return PB_SP_charts.SPC_Requests(data, type);

    case pb.sam.plugins.datatables.n:
      return PB_SP_datatables.SPDT_Requests(data, type);

    case pb.sam.plugins.dates.n:
      return PB_SP_date.SPD_Requests(data, type);

    case pb.sam.plugins.mask.n:
      return PB_SP_mask.SPM_Requests(data, type);

    case pb.sam.plugins.range.n:
      return PB_SP_range.SPR_Requests(data, type);

    case pb.sam.plugins.repeater.n:
      return PB_SP_repeater.SPRP_Requests(data, type);

    case pb.sam.plugins.select.n:
      return PB_SP_select.SPS_Requests(data, type);

    case pb.sam.plugins.tagify.n:
      return PB_SP_tagify.SPT_Requests(data, type);

    case pb.sam.plugins.validation.n:
      return PB_SP_validation.SPV_Requests(data, type);
  }
}

// Exports
export const pluginsRouting = function (data, type) {
  return pluginsRoute(data, type);
};
// PB__SAM_plugins