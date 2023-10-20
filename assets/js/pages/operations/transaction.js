import {get_thePathArr} from "../../base/global.js";
import pb from "../../base/structure.js";
import * as PB_OT_banking from "./transactions/banking.js";
import * as PB_OT_sales from "./transactions/sales.js";
import * as PB_OT_purchases from "./transactions/purchases.js";
import * as PB_OT_payments from "./transactions/payments.js";
import * as PB_OT_journals from "./transactions/journals.js";
import * as PB_OT_receipts from "./transactions/receipts.js";
// Class definition

const transactionRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  console.log("transactionRoute", thePathArr[2]);
  switch (thePathArr[2]) {
    case pb.opr.transactions.banking.n:
      return PB_OT_banking.OTB_Requests(data, type);

    case pb.opr.transactions.sales.n:
      return PB_OT_sales.OTS_Requests(data, type);

    case pb.opr.transactions.purchases.n:
      return PB_OT_purchases.OTP_Requests(data, type);

    case pb.opr.transactions.payments.n:
      return PB_OT_payments.OTY_Requests(data, type);

    case pb.opr.transactions.receipts.n:
      return PB_OT_receipts.OTR_Requests(data, type);

    case pb.opr.transactions.journals.n:
      return PB_OT_journals.OTJ_Requests(data, type);

    case pb.opr.transactions.miscellaneous.n:
      return PB_OT_miscellaneous.OTM_Requests(data, type);
    // and so on
  }
}

export const transactionRouting = function (data, type) {
  return transactionRoute(data, type);
};

