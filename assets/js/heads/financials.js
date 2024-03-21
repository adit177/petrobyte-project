import {get_thePathArr}       from "../base/global.js";
import pb                     from "../base/structure.js";
import * as PB__FIN_statement from "../pages/financials/statement.js";
import * as PB__FIN_balance   from "../pages/financials/balance.js";
import * as PB__FIN_profit    from "../pages/financials/profit.js";
import * as PB__FIN_reconcile from "../pages/financials/reconcile.js";

// Class definition
// Shared variables


// Private functions
/*
 -------------------------------
 Function Route Management
 -------------------------------
 */

function basePageRouting() {
  const thePathArr = get_thePathArr();
  switch (thePathArr[1]) {
    case pb.fin.balance.n:
      PB__FIN_balance.basePageRouting()
      break;
  }
}

function baseRouting(data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[1]) {
    case pb.fin.balance.n:
      return PB__FIN_balance.baseRouting(data);
    case pb.fin.profit.n:
      return PB__FIN_profit.baseRouting(data);
    case pb.fin.reconcile.n:
      return PB__FIN_reconcile.baseRouting(data);
    case pb.fin.statement.n:
      return PB__FIN_statement.baseRouting(data);
  }

}

function buttonActionRouting(_event, _return) {
  const thePathArr = get_thePathArr();
  console.log(_return, _event);

  if (_return.indexOf(_event.type) !== -1) return true;

  switch (thePathArr[1]) {
    case pb.fin.balance.n:
      return PB__FIN_balance.actionRouting(_event);
    case pb.fin.profit.n:
      return PB__FIN_profit.actionRouting(_event);
    case pb.fin.reconcile.n:
      return PB__FIN_reconcile.actionRouting(_event);
    case pb.fin.statement.n:
      return PB__FIN_statement.actionRouting(_event);
  }
}

// Public methods
export const pageStateRouting = function (data) {
  return baseRouting(data);
};
export const userActionRouting = function (_event, _return) {
  return buttonActionRouting(_event, _return);
};