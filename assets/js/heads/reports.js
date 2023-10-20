import * as PB__RPT_customers from "../pages/reports/customers.js";
import * as PB__RPT_general from "../pages/reports/general.js";
import * as PB__RPT_accounts from "../pages/reports/accounts.js";
import * as PB__RPT_employees from "../pages/reports/employees.js";
import * as PB__RPT_products from "../pages/reports/products.js";
import * as PB__RPT_petroleum from "../pages/reports/petroleum.js";
import pb from "../base/structure.js";
import {get_thePathArr} from "../base/global.js";
import {productsRouting} from "../pages/reports/products.js";

function reportsRoute(data, type) {
  const thePathArr = get_thePathArr();

  switch (thePathArr[1]) {

    case pb.rpt.customers.n:
      return PB__RPT_customers.customersRouting(data, type)

    case pb.rpt.general.n:
      return PB__RPT_general.generalRouting(data, type)

    case pb.rpt.accounts.n:
      return PB__RPT_accounts.accountsRouting(data, type);

    case pb.rpt.employees.n:
      return PB__RPT_employees.employeesRouting(data, type);

    case pb.rpt.products.n:
      return PB__RPT_products.productsRouting(data, type);

    case pb.rpt.petroleum.n:
      return PB__RPT_petroleum.petroleumRouting(data, type);
  }

}

// Public methods

export const reportsRouting = function (data, type) {
  return reportsRoute(data, type);
};