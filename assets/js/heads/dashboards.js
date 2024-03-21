import * as PB__DSB_statistics from "../pages/dashboards/statistics.js";
import * as PB__DSB_charts from "../pages/dashboards/charts.js";
import pb from "../base/structure.js";
import {get_thePathArr} from "../base/global.js";

// Private functions

function dashboardRoute(data, type) {
  switch (get_thePathArr()[1]) {
    case pb.dsb.charts.n:
      return PB__DSB_charts.chartsRouting(data, type);
    case pb.dsb.statistics.n:
      return PB__DSB_statistics.statisticsRouting(data, type);
  }
}

// Public methods
export const dashboardRouting = function (data, type) {
  return dashboardRoute(data, type);
}
