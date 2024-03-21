import {get_thePathArr}       from "../../base/global.js";
import PB_FS_cashflow         from "./statement/cashflow.js";
import pb                     from "../../base/structure.js";
import {eTypes}               from "../../base/events.js";
import * as PB_FS_negative    from "./statement/negative.js";
import * as PB_FS_receipts    from "./statement/receipts.js";
import * as PB_FS_transaction from "./statement/transaction.js";
import * as PB_FS_trial       from "./statement/trial.js";

// Class definition


// Shared variables

// Private functions

/**
 * This support all layouts routing.
 * @param event
 * @param data
 */
const actionRoute = function (event) {
  // fetching required page data
  const thePathArr = get_thePathArr();
  switch (event.type) {
    case eTypes.action:
      switch (thePathArr[2]) {
        case pb.fin.statement.cashflow.n:
          return PB_FS_cashflow.FSC_actions(event)
        case pb.fin.statement.negative.n:
          return PB_FS_negative.FSN_actions(event);
        case pb.fin.statement.receipts.n:
          return PB_FS_receipts.FSR_actions(event);
        case pb.fin.statement.transaction.n:
          return PB_FS_transaction.FST_actions(event);
        case pb.fin.statement.trial.n:
          return PB_FS_trial.FST_actions(event);
      }
      break;

    case eTypes.table:
      switch (thePathArr[2]) {
        case pb.fin.statement.cashflow.n:
          console.log("last route action")
          return PB_FS_cashflow.FSC_tables(event)
      }
      break;

    case eTypes.card:
      switch (thePathArr[2]) {
        case pb.fin.statement.cashflow.n:
          return PB_FS_cashflow.FSC_cards(event);
        case pb.fin.statement.negative.n:
          return PB_FS_negative.FSN_cards(event);
        case pb.fin.statement.receipts.n:
          return PB_FS_receipts.FSR_cards(event);
        case pb.fin.statement.transaction.n:
          return PB_FS_transaction.FST_cards(event);
        case pb.fin.statement.trial.n:
          return PB_FS_trial.FST_cards(event);
      }
      break;

    case eTypes.back:
      console.log("last route action");
      switch (thePathArr[2]) {
        case pb.fin.statement.cashflow.n:
          return PB_FS_cashflow.FSC_back(event);
      }
  }
}


const baseRoute = function (data) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.fin.statement.cashflow.n:
      return PB_FS_cashflow.FSC_pageOpen(data);
    case pb.fin.statement.negative.n:
      return PB_FS_negative.FSN_pageOpen(data);
    case pb.fin.statement.receipts.n:
      return PB_FS_receipts.FSR_pageOpen(data);
    case pb.fin.statement.transaction.n:
      return PB_FS_transaction.FST_pageOpen(data);
    case pb.fin.statement.trial.n:
      return PB_FS_trial.FST_pageOpen(data);
  }
}

// Public methods


export const actionRouting = function (_event) {
  return actionRoute(_event);
};

export const baseRouting = function (data) {
  return baseRoute(data);
};
