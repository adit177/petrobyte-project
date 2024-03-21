import {get_thePathArr} from "../base/global.js";
import pb from "../base/structure.js";
import * as PB__OPR_transactions from "../pages/operations/transaction.js";
import * as PB__OPR_stocks from "../pages/operations/stocks.js";
import * as PB__OPR_employees from "../pages/operations/employees.js";
import * as PB__OPR_indents from "../pages/operations/indents.js";
import * as PB__OPR_loyalty from "../pages/operations/loyalty.js";
import * as PB__OPR_shifts from "../pages/operations/shifts.js";

// Class definition

// Shared variables

// Private functions
/*
 -------------------------------
 Function Route Management
 -------------------------------
 */

function operationRoute(data, type) {
  const thePathArr = get_thePathArr();
  console.log("operationRoute", thePathArr[1]);
  switch (thePathArr[1]) {

    case pb.opr.transactions.n:
      return PB__OPR_transactions.transactionRouting(data, type);

    case pb.opr.stocks.n:
      return PB__OPR_stocks.stockRouting(data, type);

    case pb.opr.employees.n:
      return PB__OPR_employees.employeesRouting(data, type);

    case pb.opr.indents.n:
      return PB__OPR_indents.baseRouting(data);

    case pb.opr.loyalty.n:
      return PB__OPR_loyalty.baseRouting(data);

    case pb.opr.shifts.n:
      return PB__OPR_shifts.baseRouting(data);

  }
}

export const operationsRouting = function (data, type) {
  console.log("operationRouting", data, type);
  return operationRoute(data, type);
};

