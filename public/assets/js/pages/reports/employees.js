// Shared variables
import * as PB_RE_salary from "./employees/salary.js";
import * as PB_RE_activity from "./employees/activity.js";
import * as PB_RE_combined from "./employees/combined.js";
import pb from "../../base/structure.js";
import {eTypes} from "../../base/events.js";
import {get_thePathArr} from "../../base/global.js";

const employeesRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.rpt.employees.salary.n:
      return PB_RE_salary.RES_Requests(data, type);

    case pb.rpt.employees.activity.n:
      return PB_RE_activity.REA_Requests(data, type);

    case pb.rpt.employees.combined.n:
      return PB_RE_combined.REC_Requests(data, type);
  }
}

export const employeesRouting = function (data, type) {
  return employeesRoute(data, type);
};
