import * as PB_OT_activities from "./employees/activities.js";
import * as PB_OE_salary from "./employees/salary.js";
import pb from "../../base/structure.js";
import {get_thePathArr} from "../../base/global.js";
import * as PB_OE_payroll from "./employees/payroll.js";


// Shared variables

// Private functions

/**
 * This support all layouts routing.
 * @param data
 * @param type
 */



const employeeRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.opr.employees.activities.n:
      return PB_OT_activities.OEA_Requests(data, type);

    case pb.opr.employees.salary.n:
      return PB_OE_salary.OES_Requests(data, type);

    case pb.opr.employees.payroll.n:
      return PB_OE_payroll.OEP_Requests(data, type);
    // and so on
  }
}

// Public methods


export const employeesRouting = function (data, type) {
  return employeeRoute(data, type);
};


