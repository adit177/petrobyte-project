import Tables from "./tables.js";
import pb from "../base/structure.js";

class tablesReports extends Tables {

  // define properties
  #shape;
  #tableOptions;
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

  get getOptions() {
    return this.#tableOptions;
  }

  // after properties.


  // define methods.
  #customers_sales = (tag) => {
    const myTables = pb.rpt.customers.sales.p;

    let OPTION;
    switch (tag) {
      case myTables.direct:
        console.log("getting shape")
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("voucher"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["voucher"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("bill"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["bill"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("slip"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["slip"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vehicle_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["vehicle_id"],
            //            false,
            //            false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_unit,
            this.values.amount.amount_w_unit("rate", "unit_id"),
            this.params.amount.amount_w_unit(),
            this.styles.amount.amount_w_unit()
            //            ["rate", "unit_id"],
            //            false,
            //            false
          ),
          '7': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          "8": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          "9": this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("billing"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["billing"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.group:
        this.#shape = {
          "0" : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_id"], false, false
          ),
          '1' : this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '2' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("voucher"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["voucher"], false, false
          ),
          '3' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("bill"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["bill"], false, false
          ),
          '4' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("slip"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["slip"], false, false
          ),
          '5' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vehicle_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["vehicle_id"],
            //            false,
            //            false
          ),
          '6' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '7' : this.row(
            this.cell.amount,
            this.mode.amount.amount_w_unit,
            this.values.amount.amount_w_unit("rate", "unit_id"),
            this.params.amount.amount_w_unit(),
            this.styles.amount.amount_w_unit()
            //            ["rate", "unit_id"],
            //            false,
            //            false
          ),
          '8' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          "9" : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          "10": this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("billing"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["billing"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.vehicle:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_id"], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("voucher"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["voucher"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("bill"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["bill"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("slip"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["slip"], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_unit,
            this.values.amount.amount_w_unit("rate", "unit_id"),
            this.params.amount.amount_w_unit(),
            this.styles.amount.amount_w_unit()
            //            ["rate", "unit_id"], false, false
          ),
          '7': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          '8': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #customers_transactions = (tag) => {
    const myTables = pb.rpt.customers.transactions.p;
    console.log(myTables, tag);

    let OPTION;
    switch (tag) {
      case myTables.simple:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("way"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["way"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("particular_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["particular_id"], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("voucher_type_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["voucher_type_id"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("voucher_no"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["voucher_no"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("debited"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["debited"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("credited"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["credited"], false, false
          ),
          '7': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["closing"], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.detailed:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("way"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["way"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("particular_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["particular_id"], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("voucher_type_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["voucher_type_id"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("voucher_no"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["voucher_no"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("debited"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["debited"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("credited"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["credited"], false, false
          ),
          '7': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["closing"], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case `${myTables.detailed}_child`:
        console.log("detailed_child");
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_unit,
            this.values.amount.amount_w_unit("rate", "unit_id"),
            this.params.amount.amount_w_unit(),
            this.styles.amount.amount_w_unit()
            //            ["rate", "unit_id"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          "3": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vehicle_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["vehicle_id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.statement:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("way"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["way"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("particular_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["particular_id"], f/alse, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("voucher_type_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["voucher_type_id"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("transaction_id"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["transaction_id"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("debited"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["debited"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("credited"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["credited"], false, false
          ),
          '7': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["closing"], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
          )
          //            ["id"], false, false)
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #customers_bills = (tag) => {
    const myTables = pb.rpt.customers.bills.p;

    let OPTION;
    switch (tag) {
      case myTables.view:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("product_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["product_id"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("bill"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["bill"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("slip"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["slip"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vehicle_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["vehicle_id"], false, false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_unit,
            this.values.amount.amount_w_unit("rate", "unit_id"),
            this.params.amount.amount_w_unit(),
            this.styles.amount.amount_w_unit()
            //            ["rate", "unit_id"], false, false
          ),
          '7': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.statement:
        this.#shape = {
          '0' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("bill"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["bill"], false, false
          ),
          '1' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_id"], false, false
          ),
          '2' : this.row(
            this.cell.date,
            this.mode.date.date_w_range,
            this.values.date.date_w_range("period_start_id", "period_end_id"),
            this.params.date.date_w_range(),
            this.styles.date.date_w_range()
            //            ["date_id", "period_start_id", "period_end_id"], false, false
          ),
          '3' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("slips"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["slips"], false, false
          ),
          '4' : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("bill_value"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["bill_value"], false, false
          ),
          '5' : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("discount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["discount"], false, false
          ),
          '6' : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("TCS"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["TCS"], false, false
          ),
          '7' : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '8' : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("received"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["received"], false, false
          ),
          '9' : this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          ),
          '10': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.customer:
        this.#shape = {
          '0' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("bill"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["bill"], false, false
          ),
          '1' : this.row(
            this.cell.date,
            this.mode.date.range,
            this.values.date.range("period_start_id", "period_end_id"),
            this.params.date.range(),
            this.styles.date.range()
            //            ["period_start_id", "period_end_id"], false, false
          ),
          '2' : this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("bill_date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["bill_date_id"], false, false
          ),
          '3' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("slips"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["slips"], false, false
          ),
          '4' : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("bill_value"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["bill_value"], false, false
          ),
          '5' : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("discount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["discount"], false, false
          ),
          '6' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("TCS"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["TCS"], false, false
          ),
          '7' : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '8' : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("received"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["received"], false, false
          ),
          '9' : this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          ),
          '10': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #customers_indents = (tag) => {
    const myTables = pb.rpt.customers.indents.p;

    let OPTION;
    switch (tag) {
      case myTables.bucket:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("book_name"),
            this.params.text.default(),
            this.styles.text.default()
            ["book_name"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("from"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["from"], false, .false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("to"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["to"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("total"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["total"], false, false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("used"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["used"], false, false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("available"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["available"], false, false
          ),
          '7': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("valid_upto"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["valid_upto"], false, false)
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.period:
        this.#shape = {
          '0' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("order_id"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["order_id"], false, false
          ),
          '1' : this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '2' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vehicle_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["vehicle_id"], false, false
          ),
          '3' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '4' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("token"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["token"], false, false
          ),
          '5' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("value"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["value"], false, false
          ),
          '6' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["note"], false, false
          ),
          '7' : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("case"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["cash"], false, false
          ),
          '8' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("book"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["book"], false, false
          ),
          '9' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("bill"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["bill"], false, false
          ),
          '10': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false)
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.book:
        this.#shape = {
          '0': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("token"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["token"], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vehicle_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["vehicle_id"], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("bill_book"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["bill_book"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("order_value"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["order_value"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("case"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["cash"], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["note"], false, false
          ),
          '8': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          ),
          '9': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("fetched"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["fetched"], false, false))
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.customer:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("voucher"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["voucher"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("bill"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["bill"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("slip"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["slip"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vehicle_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["vehicle_id"], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_unit,
            this.values.amount.amount_w_unit("rate", "unit_id"),
            this.params.amount.amount_w_unit(),
            this.styles.amount.amount_w_unit()
            //            ["rate", "unit_id"], false, false
          ),
          '7': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          '8': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '9': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("billing"),
            this.params.text.default(),
            this.styles.text.default()
          )
          //            ["billing"], false, false)
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #customers_summary = (tag) => {
    const myTables = pb.rpt.customers.summary.p;

    let OPTION;
    switch (tag) {
      case myTables.accounts:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.row,
            this.values.text.row("firstName", "lastName"),
            this.params.text.row(),
            this.styles.text.row()
            //            ["firstName", "lastName"], false, false, {
            //              orderable: false
            //            }
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("isActive"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["isActive"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["balance"], false, false, {
            //              orderable : false,
            //              searchable: false,
            //            }
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("age"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["age"], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("eyeColor"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["eyeColor"], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("gender"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["gender"], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("company"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["company"], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("favoriteFruit"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["favoriteFruit"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {
          searching: true,
        }
        this.tableParams = {}
        break;

      case `${myTables.accounts}_child`:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("name"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["name"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("email"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["email"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.trade:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("opening"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["opening"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sold"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sold"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("subtotal"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["subtotal"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("receipts"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["receipts"], false, false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("other"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["other"], false, false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("close"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["close"], false, false
          ),
          '7': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("current"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["current"], false, false)
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.group:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("opening"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["opening"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sold"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sold"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("subtotal"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["subtotal"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("receipts"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["receipts"], false, false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("other"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["other"], false, false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("close"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["close"], false, false
          ),
          '7': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("current"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["current"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #employees_activity = (tag) => {
    const myTables = pb.rpt.employees.activity.p;

    let OPTION;
    switch (tag) {
      case myTables.absences:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("employee_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["employee_id"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount_deducted"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount_deducted"], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["note"], false, false
          ),
          '4': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status_id"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status_id"], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.overtime:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("employee_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["employee_id"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount_added"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount_added"], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["note"], false, false
          ),
          '4': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status_id"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status_id"], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.expenses:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("employee_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["employee_id"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount_taken"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount_taken"], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["note"], false, false
          ),
          '4': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status_id"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status_id"], false, false),
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.collection:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.row,
            this.values.text.row("shift_id", "slot_id"),
            this.params.text.row(),
            this.styles.text.row()
            //            ["shift_id", "slot_id"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("assigned_nozzles"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["assigned_nozzles"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("collectable_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["collectable_amount"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("collected_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["collected_amount"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("difference"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["difference"], false, false
          ),
          '6': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status_id"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status_id"], false, false
          ),

        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.commission:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("employee_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["employee_id"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("commission_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["commission_amount"], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["note"], false, false
          ),
          '4': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status_id"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status_id"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #employees_salary = (tag) => {
    const myTables = pb.rpt.employees.salary.p;

    let OPTION;
    switch (tag) {
      case myTables.payroll:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.month,
            [1], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [2], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [4], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [6], false, false
          ),
          '6': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [7], false, false),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.ledger:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            [2], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [6], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            [8], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            [9], false, false)
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.slip:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            [2], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [8], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [9], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            [6], false, false)
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #products_purchases = (tag) => {
    const myTables = pb.rpt.products.purchases.p;

    let OPTION;
    switch (tag) {
      case myTables.category:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [2], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [6], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            [8], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            [9], false, false)
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.item:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [2], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            [1], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [8], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            [6], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            [9], false, false
          ),
          '9': this.row(
            this.cell.text,
            this.mode.text.default,
            [10], false, false)
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.supplier:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [2], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            [1], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [6], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            [8], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            [9], false, false
          ),
          '9': this.row(
            this.cell.text,
            this.mode.text.default,
            [10], false, false)
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.invoice:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            [1], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [2], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [6], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            [8], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            [9], false, false
          ),
          '9': this.row(
            this.cell.text,
            this.mode.text.default,
            [10], false, false)
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #products_sales = (tag) => {
    const myTables = pb.rpt.products.sales.p;

    let OPTION;
    switch (tag) {
      case myTables.category:
        this.#shape = {
          '0' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_type"], false, false
          ),
          '1' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("outwards_type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["outwards_type"], false, false
          ),
          '2' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("pos_state"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["pos_state"], false, false
          ),
          '3' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '4' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_id"], false, false
          ),
          '5' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("date_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['date_id'], false, false
          ),
          '6' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("hsn"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["hsn"], false, false
          ),
          '7' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          '8' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("taxable_value"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["taxable_value"], false, false
          ),
          '9' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("tax_rate"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["tax_rate"], false, false
          ),
          '10': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("igst"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["igst"], false, false
          ),
          '11': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("cgst"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["cgst"], false, false
          ),
          '12': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sgst"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sgst"], false, false
          ),
          '13': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("total_value"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["total_value"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.item:
        this.#shape = {
          '0' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_type"], false, false
          ),
          '1' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("outwards_type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["outwards_type"], false, false
          ),
          '2' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("pos_state"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["pos_state"], false, false
          ),
          '3' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '4' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_id"], false, false
          ),
          '5' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("date_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['date_id'], false, false
          ),
          '6' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("hsn"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["hsn"], false, false
          ),
          '7' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          '8' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("taxable_value"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["taxable_value"], false, false
          ),
          '9' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("tax_rate"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["tax_rate"], false, false
          ),
          '10': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("igst"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["igst"], false, false
          ),
          '11': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("cgst"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["cgst"], false, false
          ),
          '12': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sgst"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sgst"], false, false
          ),
          '13': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("total_value"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["total_value"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.customer:
        this.#shape = {
          '0' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("customer_id"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["invoice"], false, false
          ),
          '1' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_id"], false, false
          ),
          '2' : this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '3' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          '4' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("taxable_value"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["taxable_value"], false, false
          ),
          '5' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("igst_value"),
            this.params.number.default(),
            this.styles.number.default()
            //            ['igst_value'], false, false
          ),
          '6' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("cgst_value"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["cgst_value"], false, false
          ),
          '7' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sgst_value"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sgst_value"], false, false
          ),
          '8' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("total_value"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["total_value"], false, false
          ),
          '9' : this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("outwards_type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["outwards_type"], false, false
          ),
          '10': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_type"], false, false
          ),
          '11': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("pos_state"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["pos_state"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.advance:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            [1], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [2], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [6], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            [8], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            [9], false, false
          ),
          '9': this.row(
            this.cell.text,
            this.mode.text.default,
            [10], false, false)
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }


  #products_stocks = (tag) => {
    const myTables = pb.rpt.products.stocks.p;
    console.log(tag);
    let OPTION;
    switch (tag) {
      case myTables.item:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("unit_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["unit_id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case `${myTables.item}_child`:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("store_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["store_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("stocks"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["stocks"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("unit_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["unit_id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.location:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            [2], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [6], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            [8], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            [9], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #petroleum_pistol = (tag) => {
    const myTables = pb.rpt.petroleum.pistol.p;
    switch (tag) {
      case myTables.item:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("purchases"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["purchases"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sales"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sales"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("testing"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["testing"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("variation"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["variation"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("loss"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["loss"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.combined:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("items@purchases"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["items@purchases"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("items@sales"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["items@sales"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("items@testing"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["items@testing"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #petroleum_rates = (tag) => {
    const myTables = pb.rpt.petroleum.rates.p;
    switch (tag) {
      case myTables.simple:
        console.log("getting simple profile");
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          "2": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("items@rate"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["items@rate"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.difference:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          "2": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("items@rate"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["items@rate"], false, false
          ),
          "3": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("items@diff"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["items@diff"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.advance:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("rate"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["rate"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("difference"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["difference"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("trade_variation"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["trade_variation"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("purchase_value"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["purchased_value"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("market_value"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["market_value"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.valuation:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          "2": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("items@rate"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["items@rate"], false, false
          ),
          "3": this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("items@trade_margin"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["items@trade_margin"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }


  #petroleum_summary = (tag) => {
    const myTables = pb.rpt.petroleum.summary.p;
    switch (tag) {
      case myTables.quick:
        this.#shape = {
          '0': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("shift_id"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["shift_id"], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("shift_date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["shift_date_id"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("shift_slot_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["shift_slot_id"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("revenue"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["revenue"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("created_by"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["created_by"], false, false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          ),
          "6": this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.standard:
        console.log("getting standard profile");
        this.#shape = {
          '0': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("shift_id"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["shift_id"], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("slot_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["slot_id"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("revenue"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["revenue"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("created_by"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["created_by"], false, false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case `${myTables.standard}_child`:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("rate"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["rate"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("gross_quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["gross_quantity"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("testing_quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["testing_quantity"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("net_sale"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["net_sale"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sale_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            ["sale_amount"], false, false
          ),
          '6': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.advance:
        console.log("getting standard profile");
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.row,
            this.values.text.row("shift_id", "slot_id"),
            this.params.text.row(),
            this.styles.text.row()
            //            ["shift_id", "slot_id"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("revenue"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["revenue"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("gross_profit"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["gross_profit"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("created_by"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["created_by"], false, false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case `${myTables.advance}_child`:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("rate"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["rate"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["quantity"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("testing_quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["testing_quantity"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("test"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["test"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("cash"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["cash"], false, false
          ),
          '7': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("credit"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["credit"], false, false
          ),
          '8': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("card"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["card"], false, false
          ),
          '9': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("short"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["short"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.collection:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.row,
            this.values.text.row("shift_id", "shift_slot_id"),
            this.params.text.row(),
            this.styles.text.row()
            //            ["shift_id", "shift_slot_id"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("employee_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["employee_id"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sales_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sales_amount"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("collected"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["collected"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("short"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["short"], false, false
          ),
          "6": this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("nozzles"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["nozzles"], false, false
          ),
          "7": this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("timings"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["timing"], false, false
          ),
          "8": this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case `${myTables.collection}_child`:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_id"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["note"], false, false
          ),
          '3': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("nature"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["nature"], false, false
          ),
          '4': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.advance:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            [2], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [6], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }


  #petroleum_flowsheet = (tag) => {
    const myTables = pb.rpt.petroleum.flowsheet.p;
    console.log(tag);
    switch (tag) {
      case myTables.years:
        console.log("getting year shape");
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("opening"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["opening"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("purchases"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["purchases"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sales"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sales"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("losses"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["losses"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["closing"], false, false
          ),
          '6': this.row(
            this.cell.button,
            this.mode.button.action,
            this.values.button.action("id"),
            this.params.button.action(),
            this.styles.button.action()
            //            ["id"], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          )
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.months:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("month"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["month"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("opening_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["opening_volume"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("opening_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["opening_amount"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("purchased_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["purchased_volume"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("purchased_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["purchased_amount"], false, false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sales_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sales_volume"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sales_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sales_amount"], false, false
          ),
          '7': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("loss_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["loss_volume"], false, false
          ),
          '8': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("loss_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["loss_amount"], false, false
          ),
          '9': this.row(
            this.cell.button,
            this.mode.button.action,
            this.values.button.action("id"),
            this.params.button.action(),
            this.styles.button.action()
            //            ["id"], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          )

        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;


      case myTables.days:
        console.log("days shape");
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("opening_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["opening_volume"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("opening_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["opening_amount"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("purchased_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["purchased_volume"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("purchased_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["purchased_amount"], false, false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sales_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sales_volume"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sales_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sales_amount"], false, false
          ),
          '7': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("loss_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["loss_volume"], false, false
          ),
          '8': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("loss_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["loss_amount"], false, false
          ),
          '9': this.row(
            this.cell.button,
            this.mode.button.action,
            this.values.button.action("id"),
            this.params.button.action(),
            this.styles.button.action()
            //            ["id"], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          )

        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.dayInfo:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("particular_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["particular_id"], false, false
          ),
          '2': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("nature"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["nature"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("inwards_quantity"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["inwards_quantity"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("outwards_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["outwards_quantity"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("value"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["value"], false, false
          ),

        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #petroleum_overview = (tag) => {
    const myTables = pb.rpt.petroleum.overview.p;
    switch (tag) {
      case myTables.basic_overview:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("cost"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["cost"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_unit,
            this.values.amount.amount_w_unit("rate", "unit_id"),
            this.params.amount.amount_w_unit(),
            this.styles.amount.amount_w_unit()
            //            ["rate", "unit_id"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("quantity", "unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["quantity", "unit_id"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.storage:
        console.log("getting standard profile");
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("store"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["store"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("category_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["category_id"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("description"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["description"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("type"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["type"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("maintainer"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["maintainer"], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("status"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["status"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case `${myTables.storage}_child`:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_description"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_description"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("stock_quantity", "stock_unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["stock_quantity", "stock_unit_id"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("bulk_quantity", "bulk_unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["bulk_quantity", "bulk_unit_id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.incoming:
        console.log("getting standard profile");
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("invoice"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["invoice"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("lorry"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["lorry"], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.row,
            this.values.text.row("shift_id", "slot_id"),
            this.params.text.row(),
            this.styles.text.row()
            //            ["shift_id", "slot_id"], false, false
          ),
          '4': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            ["id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case `${myTables.incoming}_child`:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("storage"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["storage"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("quantity", "unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["quantity", "unit_id"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("shortage", "unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["shortage", "unit_id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.shortage:
        console.log("getting standard profile");
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("store"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["store"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("quantity", "unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["quantity", "unit_id"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["type"], false, false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #accounts_group = (tag) => {
    console.log("accounts_group");
    const myTables = pb.rpt.accounts.group.p;
    switch (tag) {
      case myTables.sea:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [2], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.button,
            this.mode.button.action,
            [0], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          ),
          '4': this.row(
            this.cell.button,
            this.mode.button.action,
            [0], this.param_manuals.button.view_card, this.style_manuals.button.my_1
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.action,
            [0], this.param_manuals.button.view_wizard, this.style_manuals.button.my_1
          ),
        }
    }
  }

  #account_statement = (tag) => {
    const myTables = pb.rpt.accounts.statement.p;
    switch (tag) {
      case myTables.report:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [0], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [2], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            [6], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

    }

  }


  #account_register = (tag) => {
    const myTables = pb.rpt.accounts.register.p;
    switch (tag) {
      case myTables.transaction:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("date_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['date_id'], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['ledger_id'], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vou_type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['vou_type'], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("txn_type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['txn_type'], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vou_no"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['vou_no'], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("amount"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['amount'], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("nature"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['nature'], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("memo"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['memo'], false, false
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['id'], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;
    }
  }


  #account_variant = (tag) => {
    const myTables = pb.rpt.accounts.wave.p;
    switch (tag) {
      case myTables.wave:
        this.#shape = {
          '0' : this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ['date_id'], false, false
          ),
          "1" : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sales"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['sales'], false, false
          ),
          "2" : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("receipts"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['receipts'], false, false
          ),
          "3" : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("payments"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['payments'], false, false
          ),
          "4" : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("gross_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['gross_amount'], false, false
          ),
          "5" : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("opening"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['opening'], false, false
          ),
          "6" : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sub_total"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['sub_total'], false, false
          ),
          "7" : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("net_deposit"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['net_deposit'], false, false
          ),
          "8" : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['closing'], false, false
          ),
          "9" : this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing_2"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['closing_2'], false, false
          ),
          "10": this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("status"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['status'], false, false
          ),
          "11": this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['id'], false, false
          ),

        }

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.interest:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ['date_id'], false, false
          ),
          "1": this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("particular_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['particular_id'], false, false
          ),
          "2": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("debited"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['debited'], false/, false
          ),
          "3": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("credited"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['credited'], false, false
          ),
          "4": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['closing'], false, false
          ),
          "5": this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("days"),
            this.params.number.default(),
            this.styles.number.default()
            //            ['days'], false, false
          ),
          "6": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("interest"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['interest'], false, false
          )
        }

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;


      case myTables.summary:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("ledger_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ['ledger_id'], false, false
          ),
          "1": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['amount'], false, false
          ),
          "2": this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("debited"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ['debited'], false, false
          ),
          "3": this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("transaction_type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['transaction_type'], false, false
          ),
          "4": this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("memo"),
            this.params.text.default(),
            this.styles.text.default()
            //            ['memo'], false, false
          ),
        }

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;


    }

  }

  #account_lists = (tag) => {
    const myTables = pb.rpt.accounts.lists.p;
    switch (tag) {
      case myTables.masters:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("name"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["name"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("heads"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["heads"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("groups"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["groups"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("ledgers"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["ledgers"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("opening_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["opening_balance"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing_balance"),
            this.params.amount.default(),
            this.styles.amount.default()

            //            ["closing_balance"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("current_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["current_balance"], false, false
          ),
          '7': this.row(
            this.cell.button,
            this.mode.button.action,
            this.values.button.action("id"),
            this.params.button.action(),
            this.styles.button.action()
            //            ["id"], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.heads:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("name"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["name"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("groups"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["groups"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("ledgers"),
            this.params.number.default(),
            this.styles.number.default()

            //            ["ledgers"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("opening_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["opening_balance"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["closing_balance"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("current_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["current_balance"], false, false
          ),
          '6': this.row(
            this.cell.button,
            this.mode.button.action,
            this.values.button.action("id"),
            this.params.button.action(),
            this.styles.button.action()
            //            ["id"], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.groups:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("name"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["name"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("code"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["code"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("ledgers"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["ledgers"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("opening_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["opening_balance"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["closing_balance"], false, false
          ),

          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("nett_flow"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["nett_flow"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("current_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["current_balance"], false, false
          ),
          '7': this.row(
            this.cell.button,
            this.mode.button.action,
            this.values.button.action("id"),
            this.params.button.action(),
            this.styles.button.action()

            //            ["id"], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;


      case myTables.ledgers:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_account"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_account"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("alias"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["alias"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("opening_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["opening_balance"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["closing_balance"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("nett_flow"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["nett_flow"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("current_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["current_balance"], false, false
          ),
          '6': this.row(
            this.cell.button,
            this.mode.button.action,
            this.values.button.action("id"),
            this.params.button.action(),
            this.styles.button.action()
            //            ["id"], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.summary:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("month"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["month"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("opening_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["opening_balance"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("debited_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["debited_amount"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("credited_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["credited_amount"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing_balance"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["closing_balance"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("nett_flow"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["nett_flow"], false, false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;


    }
  }


  #employees_combined = (tag) => {
    const myTables = pb.rpt.employees.combined.p;
    switch (tag) {
      case myTables.activities:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("activity"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["activity"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["note"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("status_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["status_id"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.salary:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("voucher"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["voucher"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("paid_through"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["paid_through"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("description"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["description"], false, false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["note"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.commission:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()

            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("quantity", "unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["quantity", "unit_id"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_unit,
            this.values.amount.amount_w_unit("rate", "unit_id"),
            this.params.amount.amount_w_unit(),
            this.styles.amount.amount_w_unit()
            //            ["rate", "unit_id"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("commission_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["commission_amount"], false, false
          ),
          '4': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status_id"),
            this.params.badge.default(),
            this.styles.badge.default()
            //            ["status_id"], false, false
          ),
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.credits:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer_id"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vehicle_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["vehicle_id"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("quantity", "unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["quantity", "unit_id"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),

        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.collection:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("shift_id"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["shift_id"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("feed_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["feed_amount"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("cash"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["cash"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("online"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["online"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("credit"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["credit"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("difference"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["difference"], false, false
          )
        };

        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;
    }
  }


  #general_dsr = (tag) => {
    console.log(tag);
    const myTables = pb.rpt.general.dsr.p;
    switch (tag) {
      case myTables.petroleum:
        this.#shape = {
          '0' : this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
            //            ["date_id"], false, false
          ),
          '1' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("opening_stock"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["opening_stock"], false, false
          ),
          '2' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("stock_receipt"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["stock_receipt"], false, false
          ),
          '3' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("total_stock"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["total_stock"], false, false
          ),
          '4' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("total_stock"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["total_stock"], false, false
          ),
          '5' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("meter_readings@reading"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["meter_readings@reading"], false, false
          ),
          '6' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("meter_readings@sale"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["meter_readings@sale"], false, false
          ),
          '7' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sales_by_meter"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sales_by_meter"], false, false
          ),
          '8' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("nozzle_testing"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["nozzle_testing"], false, false
          ),
          '9' : this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("nett_sale"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["nett_sale"], false, false
          ),
          '10': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("cumulative_sale"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["cumulative_sale"], false, false
          ),
          '11': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("tank_readings@DIP"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["tank_readings@DIP"], false, false
          ),
          '12': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("tank_readings@IN"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["tank_readings@IN"], false, false
          ),
          "13": this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("tank_readings@SALE"),
            this.params.number.default(),
            this.styles.number.default()
            ["tank_readings@SALE"], false, false
          ),
          '14': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sales_by_tank"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sales_by_tank"], false, false
          ),
          '15': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("daily_variation"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["daily_variation"], false, false
          ),
          '16': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("marked_loss"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["marked_loss"], false, false
          ),
          '17': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("cumulative_variation"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["cummulative_variation"], false, false
          ),


        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;
    }
  }


  #general_rocket = (tag) => {
    const myTables = pb.rpt.general.rocket.p;
    switch (tag) {
      case myTables.nozzle_wise_summary:
        this.#shape = {
          '0': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("nozzle"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["nozzle"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("opening"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["opening"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("closing"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["closing"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("gross"),
            this.params.number.default(),
            this.styles.number.default()

            //            ["gross"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("testing"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["testing"], false, false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("nett_sale"),
            this.params.number.default(),
            this.styles.number.default()

            //            ["nett_sale"], false, false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("cumulative"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["cumulative"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.tank_wise_summary:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("tank"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["tank"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("opening"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["opening"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("receipts"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["receipts"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("closing"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["closing"], false, false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("dip_sale"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["dip_sale"], false, false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("variation"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["variation"], false, false
          ),
          '7': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("cum_sale"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["cum_sale"], false, false
          ),
          '8': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("cum_vary"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["cum_vary"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.petroleum_fuel_inventory:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("opening_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["opening_volume"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("purchased_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["purchased_volume"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("purchased_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["purchased_amount"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sold_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sold_volume"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sold_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sold_amount"], false, false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("loss_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["loss_volume"], false, false
          ),
          '7': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("loss_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["loss_amount"], false, false
          ),
          '8': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("closing_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["closing_volume"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.lubricant_inventory:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("lubricant_name"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["lubricant_name"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("opening_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["opening_volume"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("purchased_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["purchased_volume"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("purchased_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["purchased_amount"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sold_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sold_volume"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sold_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sold_amount"], false, false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("closing_volume"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["closing_volume"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.fuel_sale_collection:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["account"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.lube_collection:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["account"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("amount"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.nozzle_sales_summary:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("method"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["method"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("amount"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.cash_flow_accounts:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["account"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("open"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["open"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sale"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sale"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("receipt"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["receipt"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("payment"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["payment"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sub_total"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sub_total"], false, false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("debited"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["debited"], false, false
          ),
          '7': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("credited"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["credited"], false, false
          ),
          '8': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("closing"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["closing"], false, false
          ),
          '9': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.customers_summary:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer_category"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customers_category"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("opening"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["opening"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("sales"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["sales"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("receipts"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["receipts"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("payments"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["payments"], false, false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("others"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["others"], false, false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("closing"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["closing"], false, false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["id"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.credit_sales:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("customer"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["customer"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("times"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["times"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("rate"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["rate"], false, false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("quantity", "unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["quantity", "unit_id"], false, false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("amount"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["amount"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("received"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["received"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.debited_accounts:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_account"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_account"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("description"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["description"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.credited_accounts:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_account"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_account"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("description"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["description"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.contra:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["type"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("transfer_from"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["transfer_from"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("transfer_to"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["transfer_to"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("description"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["description"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.receipt_vouchers:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("received_from"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["received_from"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("received_into"),
            this.params.text.default(),
            this.styles.text.default()

            //            ["received_into"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.payment_vouchers:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("paid_to"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["paid_to"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("paid_from"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["paid_from"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #general_onepage = (tag) => {
    const myTable = pb.rpt.general.onepage.p;
    switch (tag) {

      case myTable.cash_flow_summary:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["type"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            ["open"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("sale"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["sale"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("receipt"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["receipt"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("payment"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["payment"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("contra"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["contra"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("closing"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["closing"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTable.item_wise_fuel_sale_detail:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("rate"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["rate"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("testing"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["testing"], false, false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("volume"),
            this.params.number.default(),
            this.styles.number.default()

            //            ["volume"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTable.fuel_sale_collection_detail:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["account"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTable.collection_summary:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("channel"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["channel"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTable.account_and_item_wise_credit:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("quantity", "unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["quantity", "unit_id"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()

            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTable.account_and_item_wise_lubricant:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_id"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("quantity", "unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["quantity", "unit_id"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTable.receipts_transactions:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_cr"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_cr"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_dr"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_dr"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTable.payment_transactions:
        console.log("getting shape");
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_cr"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_cr"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_dr"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_dr"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;

      case myTable.contra_transactions:


        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("type"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["type"], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_cr"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_cr"], false, false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_dr"),
            this.params.text.default(),
            this.styles.text.default()

            //            ["ledger_dr"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;


      case myTable.purchases:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_cr"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_cr"], false, /false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_dr"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["ledger_dr"], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("invoice_no"),
            this.params.number.default(),
            this.styles.number.default()
            //            ["invoice_no"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("total"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["total"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;


      case `${myTable.purchases}_child`:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("item_id"),
            this.params.text.default(),
            this.styles.text.default()
            //            ["item_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number("quantity", "unit_id"),
            this.params.number.dual_number(),
            this.styles.number.dual_number()
            //            ["quantity", "unit_id"], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("rate"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["rate"], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("value"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["value"], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("discount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["discount"], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("taxable"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["taxable"], false, false
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("gst"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["gst"], false, false
          ),
          '7': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
            //            ["amount"], false, false
          ),
        }
        this.tableMethods = {}
        this.#tableOptions = {}
        this.tableParams = {}
        break;


    }
  }


  profileGenerate = (path, tag) => {
    const propName = path[1] + '_' + path[2];
    console.log(propName);

    switch (propName) {
      case 'customers_sales':
        this.#customers_sales(tag);
        break;
      case 'customers_transactions':
        this.#customers_transactions(tag);
        break;
      case 'customers_bills':
        this.#customers_bills(tag);
        break;
      case 'customers_indents':
        this.#customers_indents(tag);
        break;
      case 'customers_summary':
        this.#customers_summary(tag);
        break;
      case 'employees_activity':
        this.#employees_activity(tag);
        break;
      case 'employees_salary':
        this.#employees_salary(tag);
        break;
      case "employees_combined":
        this.#employees_combined(tag);
        break;
      case 'products_purchases':
        this.#products_purchases(tag);
        break;
      case 'products_sales':
        this.#products_sales(tag);
        break;
      case 'products_stocks':
        this.#products_stocks(tag);
        break;
      case 'petroleum_pistol':
        this.#petroleum_pistol(tag);
        break;
      case 'petroleum_rates':
        this.#petroleum_rates(tag);
        break;
      case 'petroleum_summary':
        this.#petroleum_summary(tag);
        break;

      case "petroleum_flowsheet":
        this.#petroleum_flowsheet(tag);
        break;

      case "petroleum_overview":
        this.#petroleum_overview(tag);
        break;

      case "accounts_group":
        this.#accounts_group(tag);
        break;

      case "accounts_statement":
        this.#account_statement(tag);
        break;

      case "accounts_register":
        console.log("getting table");
        this.#account_register(tag);
        break;

      case "accounts_variant":
        this.#account_variant(tag);
        break;

      case "accounts_lists":
        this.#account_lists(tag);
        break;

      case "general_dsr":
        this.#general_dsr(tag);
        break;

      case "general_rocket":
        this.#general_rocket(tag);
        break;

      case "general_onepage":
        this.#general_onepage(tag);
        break;


    }
  }
}

export default tablesReports;