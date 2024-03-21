import * as PB__MNG_accounts from "../pages/management/accounts.js";
import * as PB__MNG_employees from "../pages/management/employees.js";
import * as PB__MNG_loyalty from "../pages/management/loyalty.js";
import * as PB__MNG_indents from "../pages/management/indents.js";
import * as PB__MNG_customers from "../pages/management/customers.js";
import * as PB__MNG_billing from "../pages/management/billing.js";
import {get_thePathArr} from "../base/global.js";
import pb from "../base/structure.js";
import * as PB__MNG_products from "../pages/management/products.js";
import * as PB__MNG_users from "../pages/management/users.js";
import * as PB__MNG_drive from "../pages/management/drive.js";


// Shared variables


// Private functions
/*
 -------------------------------
 Function Route Management
 -------------------------------
 */

function managementRoute(data, type) {
  const thePathArr = get_thePathArr();
  switch (thePathArr[1]) {

    case pb.mng.products.n:
      return PB__MNG_products.productsRouting(data, type);

    case pb.mng.accounts.n:
      return PB__MNG_accounts.accountsRouting(data, type);

    case pb.mng.customers.n:
      return PB__MNG_customers.customerRouting(data, type);

    case pb.mng.employees.n:
      return PB__MNG_employees.employeeRouting(data, type);

    case pb.mng.billing.n:
      return PB__MNG_billing.billingRouting(data, type);

    case pb.mng.users.n:
      return PB__MNG_users.baseRouting(data);

    case pb.mng.drive.n:
      return PB__MNG_drive.baseRouting(data);

    case pb.mng.indents.n:
      return PB__MNG_indents.baseRouting(data);

    case pb.mng.loyalty.n:
      return PB__MNG_loyalty.baseRouting(data);
  }

}

export const managementRouting = function (data, type) {
  return managementRoute(data, type);
}
