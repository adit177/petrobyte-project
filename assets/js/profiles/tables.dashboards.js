import Tables from "./tables.js";
import pb from "../base/structure.js";

class tablesDashboards extends Tables {

  // define properties
  #shape;
  tableOptions;
  tableMethods;
  tableParams;
  #tableTypes = {};
  #path;

  //#methods = TBL_ct;

  constructor(path) {
    super();
    this.#path = path;
  }

  set setPath(value) {
    this.#path = value;
  }

  get tableTypes() {
    return this.#tableTypes;
  }

  get getShape() {
    return this.#shape;
  }

  // after properties.


  // define methods.

  #statistics_customers = (tag) => {
    const myTables = pb.dsb.statistics.customers.t;
    let OPTION;
    switch (tag) {
      case myTables.customer_list:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [2],
            this.param_manuals.amount.currDec0,
            false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.percent,
            [2, 3],
            false,
            false
          ),
        };

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.receipt_list:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.date_w_invoice,
            [1, 2],
            false,
            false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.column_aligned,
            [3, 4],
            false,
            false
          ),
          '2': this.row(
            this.cell.date,
            this.mode.date.range_w_text,
            [5, 6],
            this.param_manuals.date.range_full,
            false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.dual_amount_w_percent,
            [7, 8],
            false,
            false
          ),
          '4': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [9],
            false,
            false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [10],
            false,
            false
          ),
          '6': this.row(
            this.cell.button,
            this.mode.button.post_event,
            [0],
            this.param_manuals.button.view_bill,
            false
          ),
        };

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.receipt:

        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            [1],
            false,
            false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [2], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3],
            this.param_manuals.amount.currDec0,
            false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            [0],
            false,
            false
          )
        }

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.payment:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            [1],
            false,
            false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [2], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3],
            this.param_manuals.amount.currDec0,
            false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            [0],
            false,
            false
          )
        }

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  profileGenerate = (path, tag) => {
    const propName = path[1] + '_' + path[2];

    switch (propName) {
      case 'statistics_customers':
        this.#statistics_customers(tag);
        break;
    }
  }
}

export default tablesDashboards;