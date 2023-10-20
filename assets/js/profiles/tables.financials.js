import Tables from "./tables.js";
import pb from "../base/structure.js";

class tablesFinancials extends Tables {

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

  #balance_tformat = (tag) => {
    const myTables = pb.fin.balance.tformat.t;
    let OPTION;
    switch (tag) {
      case myTables.transact:
        this.#shape =
          {
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
              this.cell.amount,
              this.mode.amount.default,
              [6],
              this.param_manuals.amount.currDec0,
              false
            ),
            '6': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [7],
              this.param_manuals.amount.currDec0,
              false
            )
          };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #balance_standard = (tag) => {
    const myTables = pb.fin.balance.standard.t;
    let OPTION;
    switch (tag) {
      case myTables.transact:
        this.#shape =
          {
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
              this.cell.amount,
              this.mode.amount.default,
              [6],
              this.param_manuals.amount.currDec0,
              false
            ),
            '6': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [7],
              this.param_manuals.amount.currDec0,
              false
            )
          };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #balance_summary = (tag) => {
    const myTables = pb.fin.balance.summary.t;
    let OPTION;
    switch (tag) {
      case myTables.transact:
        this.#shape =
          {
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
              this.cell.amount,
              this.mode.amount.default,
              [6],
              this.param_manuals.amount.currDec0,
              false
            ),
            '6': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [7],
              this.param_manuals.amount.currDec0,
              false
            )
          };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #balance_comparison = (tag) => {
    const myTables = pb.fin.balance.comparison.t;
    let OPTION;
    switch (tag) {
      case myTables.transact:
        this.#shape =
          {
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
              this.cell.amount,
              this.mode.amount.default,
              [6],
              this.param_manuals.amount.currDec0,
              false
            ),
            '6': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [7],
              this.param_manuals.amount.currDec0,
              false
            )
          };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #statement_cashflow = (tag) => {
    const myTables = pb.fin.statement.cashflow.p;
    let OPTION;
    switch (tag) {
      case myTables.years:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [2], false, this.style_manuals.amount.center
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [4], false, false
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.action,
            [0], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.months:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [2], false, this.style_manuals.amount.center
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [4], false, false
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.action,
            [0], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.days:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [2], false, this.style_manuals.amount.center
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3], false, false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [4], false, false
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.action,
            [0], this.param_manuals.button.view_table, this.style_manuals.button.my_1
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.dayInfo:
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
            this.cell.amount,
            this.mode.amount.default,
            [5], false, false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [6], false, false
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
      case 'balance_tformat':
        this.#balance_tformat(tag);
        break;
      case 'balance_standard':
        this.#balance_standard(tag);
        break;
      case 'balance_summary':
        this.#balance_summary(tag);
        break;
      case 'balance_comparison':
        this.#balance_comparison(tag);
        break;
      case "statement_cashflow":
        this.#statement_cashflow(tag);
        break;

    }
  }
}

export default tablesFinancials;