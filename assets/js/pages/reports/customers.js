// Shared variables
import * as PB_RC_sales from "./customers/sales.js";
import * as PB_RC_transactions from "./customers/transactions.js";
import * as PB_RC_bills from "./customers/bills.js";
import * as PB_RC_indents from "./customers/indents.js";
import * as PB_RC_summary from "./customers/summary.js";
import pb from "../../base/structure.js";
import {eTypes} from "../../base/events.js";
import {get_thePathArr} from "../../base/global.js";


const customersRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.rpt.customers.sales.n:
      return PB_RC_sales.RCS_Requests(data, type);

    case pb.rpt.customers.transactions.n:
      return PB_RC_transactions.RCT_pageOpen(data, type);

    case pb.rpt.customers.bills.n:
      return PB_RC_bills.RCB_pageOpen(data, type);

    case pb.rpt.customers.indents.n:
      return PB_RC_indents.RCI_pageOpen(data, type);

    case pb.rpt.customers.summary.n:
      return PB_RC_summary.RCY_pageOpen(data, type);

  }
}

export const customersRouting = function (data, type) {
  return customersRoute(data, type);
};
