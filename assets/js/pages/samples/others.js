import pb from "../../base/structure.js";
import {get_thePathArr} from "../../base/global.js";
import * as PB_SO_events from "./others/events.js";
import * as PB_SO_stepper from "./others/stepper.js";

const othersRoute = function (data, type) {
  switch (get_thePathArr()[2]) {
    case pb.sam.others.events.n:
      return PB_SO_events.SOE_Requests(data, type);

    case pb.sam.others.stepper.n:
      return PB_SO_stepper.SOS_Requests(data, type);

  }
}

// Public methods
export const othersRouting = function (data, type) {
  return othersRoute(data, type);
};