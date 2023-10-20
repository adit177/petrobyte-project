import pb from "../../base/structure.js";
import {get_thePathArr} from "../../base/global.js";
import * as PB_SE_append from "./extends/append.js";
import * as PB_SE_collect from "./extends/collect.js";
import * as PB_SE_reset from "./extends/reset.js";
import * as PB_SE_foreign from "./extends/foreign.js";
import * as PB_SE_placement from "./extends/placement.js";
import * as PB_SE_filter from "./extends/filter.js";
import * as PB_SE_search from "./extends/search.js";
import * as PB_SE_stepper from "./extends/stepper.js";

const extendsRoute = function (data, type) {
  switch (get_thePathArr()[2]) {
    case pb.sam.extends.append.n:
      return PB_SE_append.SEA_Requests(data, type);

    case pb.sam.extends.collect.n:
      return PB_SE_collect.SEC_Requests(data, type);

    case pb.sam.extends.reset.n:
      return PB_SE_reset.SER_Requests(data, type);

    case pb.sam.extends.foreign.n:
      return PB_SE_foreign.SEF_Requests(data, type);

    case pb.sam.extends.placement.n:
      return PB_SE_placement.SEP_Requests(data, type);

    case pb.sam.extend.filter.n:
      return PB_SE_filter.SET_Requests(data, type);

    case pb.sam.extend.search.n:
      return PB_SE_search.SES_Requests(data, type);

    case pb.sam.extend.stepper.n:
      return PB_SE_stepper.SEP_Requests(data, type);
  }
}

// Public methods
export const extendsRouting = function (data, type) {
  return extendsRoute(data, type);
};