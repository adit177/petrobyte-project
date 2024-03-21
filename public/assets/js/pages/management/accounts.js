// Class definition
//import MA_contacts from "./accounts/contacts";
import * as PB_MA_contacts from "./accounts/contacts.js";
import * as PB_MA_banks from "./accounts/banks.js";
import * as PB_MA_setting from "./accounts/setting.js";
import * as PB_MA_suppliers from "./accounts/suppliers.js";
import * as PB_MA_vendors from "./accounts/vendors.js";
import * as PB_MA_ledgers from "./accounts/ledgers.js";
import * as PB_MA_gateways from "./accounts/gateways.js";
import * as PB_MA_expenses from "./accounts/expenses.js";
import * as PB_MA_loans from "./accounts/loans.js";
import {get_thePathArr} from "../../base/global.js";
import pb from "../../base/structure.js";


const accountsRoute = function (data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[2]) {
    case pb.mng.accounts.contacts.n:
      return PB_MA_contacts.MAC_Requests(data, type);

    case pb.mng.accounts.gateways.n:
      return PB_MA_gateways.MAG_Requests(data, type);

    case pb.mng.accounts.loans.n:
      return PB_MA_loans.MAL_Requests(data, type);

    case pb.mng.accounts.banks.n:
      return PB_MA_banks.MAB_Requests(data, type);

    case pb.mng.accounts.ledgers.n:
      return PB_MA_ledgers.MAL_Requests(data, type);

    case pb.mng.accounts.suppliers.n:
      return PB_MA_suppliers.MAS_Requests(data, type);

    case pb.mng.accounts.vendors.n:
      return PB_MA_vendors.MAV_Requests(data, type);

    case pb.mng.accounts.expenses.n:
      return PB_MA_expenses.MAE_Requests(data, type);

    case pb.mng.accounts.setting.n:
      return PB_MA_setting.MAS_Requests(data, type);
  }
}

export const accountsRouting = function (data, type) {
  return accountsRoute(data, type);
};