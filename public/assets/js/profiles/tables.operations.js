import Tables from "./tables.js";
import pb from "../base/structure.js";
import {CLS, rdR} from "../base/const.js";
import {_k} from "../base/keys.js";

class tablesOperations extends Tables {

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

  #stocks_transfer = (tag) => {
    const myTransactions = pb.opr.stocks.transfer
    console.log(tag);
    switch (tag) {
      case myTransactions.n:
        this.#shape = {
          '0': this.row(
            this.cell.dt,
            this.mode.date.minimal,
            [1],
            false,
            false),
          '1': this.row(
            this.cell.txt,
            this.mode.text.column_aligned,
            [3, 4],
            false,
            this.style_manuals.text.center),
          '2': this.row(
            this.cell.txt,
            this.mode.text.column_aligned,
            [5, 6],
            false,
            this.style_manuals.text.center),
          '3': this.row(
            this.cell.txt,
            this.mode.text.default,
            [7],
            false,
            false),
          '4': this.row(
            this.cell.btn,
            this.mode.button.three_row_column,
            [0],
            this.param_manuals.button.view_transaction,
            this.style_manuals.button.my_1,
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #transactions_banking = (tag) => {
    console.log(tag)
    const myTransactions = pb.opr.transactions.banking
    switch (tag) {
      case myTransactions.t.transactions:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.date_w_gap,
            this.values.date.date_w_gap('date_id', 'date_id'),
            this.params.date.date_w_gap(),
            this.styles.date.date_w_gap()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.stack_col,
            this.values.text.stack_col('vou_type', 'txn_type', 'number'),
            this.params.text.stack_col(),
            this.styles.text.stack_col()
          ),
          '3': this.row(
            this.cell.account,
            this.mode.account.account_w_alias,
            this.values.account.account_w_alias(_k.lid.dr, _k.lid.dr_alias),
            this.params.account.account_w_alias(),
            this.styles.account.account_w_alias()
          ),
          '4': this.row(
            this.cell.account,
            this.mode.account.account_w_alias,
            this.values.account.account_w_alias(_k.lid.cr, _k.lid.cr_alias),
            this.params.account.account_w_alias(),
            this.styles.account.account_w_alias()
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default('amount'),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '6': this.row(
            this.cell.button,
            this.mode.button.three_inline_w_icon,
            this.values.button.three_inline_w_icon('txn_id'),
            this.params.button.three_inline_w_icon(),
            this.styles.button.three_inline_w_icon()
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTransactions.t.modal:
        this.#shape = {
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple('date_id')),
          '2': this.row(
            this.cell.account,
            this.mode.account.default,
            this.values.account.default('ledger_dr')),
          '3': this.row(
            this.cell.account,
            this.mode.account.default,
            this.values.account.default('ledger_cr')),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default('txn_type')),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default('number')),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default('amount'),
            this.params.amount.default(2, 1), false,
            this.outline.amount.default(undefined, undefined, 'r')),
          '7': this.row(
            this.cell.button,
            this.mode.button.three_inline_w_icon,
            this.values.button.three_inline_w_icon('id'),
            this.params.button.three_inline_w_icon(
              {
                left  : undefined,
                center: undefined,
                right : undefined,
              }, {
                left  : undefined,
                center: undefined,
                right : undefined,
              }, {
                left  : 'view',
                center: 'edit',
                right : 'delete',
              }, {
                left  : '',
                center: '',
                right : '',
              }
            ), false, this.outline.button.three_inline_w_icon('py-1', undefined, 'c')),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myTransactions.t.modal_child:
        this.#shape = {
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default('contra_id'),
            false,
            false,
            this.outline.text.default('py-1')),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default('charge'),
            false,
            false,
            this.outline.amount.default('py-1')),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default('value'),
            false,
            false,
            this.outline.amount.default('py-1')),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default('memo'),
            false,
            false,
            this.outline.text.default('py-1')),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTransactions.t.clearance:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple('date_id'),
            this.params.date.simple(rdR.common.params.date.fd_sms),
          ),
          '1': this.row(
            this.cell.account,
            this.mode.account.default,
            this.values.account.default('account_lid'),
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default('txn_type'),
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default('total_amount'),
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default('settled_amount'),
          ),
          '5': this.row(
            this.cell.input,
            this.mode.input.switch,
            this.values.input.switch('unsettled_amount'),
            this.params.input.switch('click', 'alter', 'move', 'status', 'Mark')
          ),
          '6': this.row(
            this.cell.input,
            this.mode.input.event,
            this.values.input.event('ready_for_settled', undefined, undefined, 'unsettled_amount', undefined),
            this.params.input.event('to_be_settled', undefined, undefined, 'Amount', 'add amount for settled', 'input', 'alter', 'add', 'unsettled', 'number'),
          ),

        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #transactions_purchases = (tag) => {
    const myTransactions = pb.opr.transactions.purchases
    console.log(tag);
    switch (tag) {
      case myTransactions.t.transactions:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.date_w_gap,
            [1],
            false,
            false),
          '1': this.row(
            this.cell.text,
            this.mode.text.column_aligned,
            [2, 3],
            false,
            this.style_manuals.text.center),
          '2': this.row(
            this.cell.text,
            this.mode.text.column_w_prefix,
            [4, 5],
            false,
            false),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [6],
            false,
            this.style_manuals.amount.right),
          '4': this.row(
            this.cell.button,
            this.mode.button.three_row_column,
            [0],
            this.param_manuals.button.view_transaction,
            this.style_manuals.button.my_1,
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #transactions_sales = (tag) => {
    const myTransactions = pb.opr.transactions.sales
    console.log(tag);
    switch (tag) {
      case myTransactions.t.transactions:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.date_w_gap,
            [1],
            false,
            false),
          '1': this.row(
            this.cell.text,
            this.mode.text.column_aligned,
            [2, 3],
            false,
            this.style_manuals.text.center),
          '2': this.row(
            this.cell.text,
            this.mode.text.column_w_prefix,
            [4, 5],
            false,
            false),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [6],
            false,
            this.style_manuals.amount.right),
          '4': this.row(
            this.cell.button,
            this.mode.button.three_row_column,
            [0],
            this.param_manuals.button.view_transaction,
            this.style_manuals.button.my_1,
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #transactions_receipts = (tag) => {
    const myTransactions = pb.opr.transactions.receipts
    console.log(tag);
    switch (tag) {

      case myTransactions.t.transactions:
        this.#shape = {

          '0': this.row(

            this.cell.date,
            this.mode.date.date_w_gap,
            this.values.date.date_w_gap('date_id', 'date_id'),
              this.params.date.date_w_gap(),
              this.styles.date.date_w_gap()
              // [1],
            // false,
            // false),
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.column_aligned,
            this.values.text.column_aligned('vou_type', 'txn_type'),
            [2, 3],
            false,
            this.style_manuals.text.center
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.column_w_prefix,
            [4, 5],
            false,
            false),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [6],
            false,
            this.style_manuals.amount.right),
          '4': this.row(
            this.cell.button,
            this.mode.button.three_row_column,
            [0],
            this.param_manuals.button.view_transaction,
            this.style_manuals.button.my_1,
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case  myTransactions.t.unpaidEntries:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.date_w_gap,
            ['date'],
            false,
            false),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            ['slip_no'],
            false,
            false),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            ['product'],
            false,
            false),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            ['vehicleNumber'],
            false,
            false),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            ['amount'],
            false,
            false),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_checkbox,
            ['received', 'id'],
            false,
            false),
          '6': this.row(
            this.cell.input,
            this.mode.input.event,
            ['', 'id'],
            false,
            false),
          '7': this.row(
            this.cell.input,
            this.mode.input.default,
            ['', 'id'],
            false,
            false),

        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTransactions.t.unpaidBills:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.column_aligned,
            ['bill_no', 'bill_id'],
            false,
            false),
          '1': this.row(
            this.cell.date,
            this.mode.date.range,
            ['start_date', 'end_date'],
            false,
            false),
          '2': this.row(
            this.cell.date,
            this.mode.date.simple,
            ['bill_date'],
            false,
            false),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            ['bill_amount'],
            false,
            false),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_checkbox,
            ['received', 'id'],
            false,
            false),
          '5': this.row(
            this.cell.input,
            this.mode.input.event,
            ['', 'id'],
            false,
            false),
          '6': this.row(
            this.cell.input,
            this.mode.input.default,
            ['', 'id'],
            false,
            false),

        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTransactions.t.interest:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.column_aligned,
            ['bill_no', 'bill_id'],
            false,
            false),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_percent,
            ['bill_amount', "amount_received"],
            false,
            false),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            ['due_amount'],
            false,
            false),
          '3': this.row(
            this.cell.date,
            this.mode.date.simple,
            ['bill_date'],
            false,
            false),
          '4': this.row(
            this.cell.date,
            this.mode.date.date_w_gap,
            ['end_date', 'bill_date'],
            false,
            false),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_button_a_percent,
            ["interest_amount", "rate", "id"],
            false,
            false),
          '6': this.row(
            this.cell.input,
            this.mode.input.event,
            ['', 'id'],
            false,
            false),

        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }

  }
  #transactions_payments = (tag) => {
    const myTransactions = pb.opr.transactions.payments
    console.log(tag);
    switch (tag) {
      case myTransactions.t.transactions:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.date_w_gap,
            [1],
            false,
            false),
          '1': this.row(
            this.cell.text,
            this.mode.text.column_aligned,
            [2, 3],
            false,
            this.style_manuals.text.center),
          '2': this.row(
            this.cell.text,
            this.mode.text.column_w_prefix,
            [4, 5],
            false,
            false),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [6],
            false,
            this.style_manuals.amount.right),
          '4': this.row(
            this.cell.button,
            this.mode.button.three_row_column,
            [0],
            this.param_manuals.button.view_transaction,
            this.style_manuals.button.my_1,
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      // due invoices in the form by load button.
      case myTransactions.t.vendor:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.date_w_gap,
            this.values.date.date_w_gap('date_id', 'date_id'),
            this.params.date.date_w_gap(),
            this.styles.date.date_w_gap()),
          '1': this.row(
            this.cell.date,
            this.mode.date.date_w_gap,
            this.values.date.date_w_gap(_k.id.due_date, _k.id.due_date),
            this.params.date.date_w_gap(),
            this.styles.date.date_w_gap()),
          '2': this.row(
            this.cell.account,
            this.mode.account.account_w_alias,
            this.values.account.account_w_alias(_k.lid.expense, _k.gid.expense),
            this.params.account.account_w_alias(),
            this.styles.account.account_w_alias()),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default('description'),
            this.params.text.default(),
            this.styles.text.default()),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.dual_amount_w_percent,
            this.values.amount.dual_amount_w_percent(_k.amt.amount, _k.amt.paid_amount),
            this.params.amount.dual_amount_w_percent(undefined, undefined, undefined, 'Paid'),
            this.styles.amount.dual_amount_w_percent('fw-semibold', undefined, 'text-success')),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default(_k.amt.due_amount),
            this.params.amount.default(2, true),
            this.styles.amount.default()),
          '6': this.row(
            this.cell.input,
            this.mode.input.switch,
            this.values.input.switch(_k.amt.due_amount),
            this.params.input.switch('click', 'alter', 'move', 'status', 'Paid'),
            this.styles.input.switch()),
          '7': this.row(
            this.cell.input,
            this.mode.input.event,
            this.values.input.event('ready_for_settled', undefined, undefined, _k.amt.due_amount, undefined),
            this.params.input.event('to_be_paid', undefined, undefined, 'Amount', 'add amount as Paid', 'input', 'alter', 'add', 'unpaid_bills', 'number'),
            this.styles.input.event(150, CLS.cluster.input.trans_sm)),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTransactions.t.emi: {
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            ['mandate_date'],
            false,
            false),
          '1': this.row(
            this.cell.date,
            this.mode.date.month,
            ['emi_month'],
            false,
            false),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            ['emi_amount'],
            false,
            false),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.amount_breakup,
            ['amount', 'interest'],
            false,
            false),
          '4': this.row(
            this.cell.checkbox,
            this.mode.checkbox.eventble,
            ['id'],
            false,
            false),
          '5': this.row(
            this.cell.input,
            this.mode.input.plugin,
            // todo, add plugin proprs as the date method => human.
            ['id'],
            false,
            false),

        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      }
    }

  }
  #employees_activities = (tag) => {
    const myActivities = pb.opr.employees.activities
    console.log(tag);
    switch (tag) {
      case myActivities.n:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            [1],
            false,
            false),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [2],
            false,
            this.style_manuals.text.center),
          '2': this.row(
            this.cell.text,
            this.mode.text.modify,
            [3],
            false,
            false),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [4],
            false,
            this.style_manuals.amount.right),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [5],
            false,
            this.style_manuals.text.center),
          '5': this.row(
            this.cell.button,
            // todo: modify this button as event with delte action,.
            this.mode.button.event,
            [0],
            this.param_manuals.button.delete_entry,
            this.style_manuals.button.my_1,
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #employees_payroll = (tag) => {
    const myActivities = pb.opr.employees.payroll
    console.log(tag);
    switch (tag) {
      case myActivities.n:
        this.#shape = {
          '0': this.row(
            this.cell.checkbox,
            this.mode.checkbox.default,
            [0],
            false,
            false),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [6],
            false,
            false),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [1],
            false,
            false),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [2],
            false,
            false),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_button,
            [3, 0],
            false,
            false),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [4],
            false,
            false),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5],
            false,
            false),
          '7': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [7],
            false,
            false),
          '8': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            [0],
            this.param_manuals.drop.text_btn2,
            false,
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #employees_salary = (tag) => {
    const myRoot = pb.opr.employees.salary;

    console.log(tag);

    let OPTION;

    switch (tag) {

      case myRoot.t.list:
        this.#shape =
          {
            '0': this.row(
              this.cell.rich,
              this.mode.account.img_dual_txt,
              ["employee_img", "employee_name", "employee_alias"], false, false
            ),
            '1': this.row(
              this.cell.date,
              this.mode.date.simple,
              ["payment_date"],
              false,
              false
            ),
            '2': this.row(
              this.cell.badge,
              this.mode.badge.default,
              ["payroll_status"], this.param_manuals.badge.s_payroll_status, false),
            '3': this.row(
              this.cell.badge,
              this.mode.badge.default,
              ["status"], this.param_manuals.badge.s_amount_status, false),
            '4': this.row(
              this.cell.button,
              this.mode.button.post_event,
              ["id"],
              this.param_manuals.button.view_slip,
              this.style_manuals.button.my_1),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myRoot.t.salary_breakup:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            ["description"], false, false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            ["debit"],
            this.param_manuals.amount.currDec0,
            false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            ["credit"],
            this.param_manuals.amount.currDec0,
            false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            ["closing"],
            this.param_manuals.amount.currDec0,
            false
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #shifts_process = (tag) => {
    const myRoot = pb.opr.shifts.process;

    let OPTION;

    switch (tag) {

      case myRoot.t.list:
        this.#shape =
          {
            '0': this.row(
              this.cell.text,
              this.mode.text.default,
              [1],
              false,
              this.style_manuals.text.center),
            '1': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [2],
              false,
              this.style_manuals.amount.right),
            '2': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [3],
              false,
              this.style_manuals.amount.right),
            '3': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [4],
              false,
              this.style_manuals.amount.right),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [5],
              false,
              this.style_manuals.amount.right),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;


      case myRoot.t.nozzles:
        this.#shape = {
          '0': this.row(
            this.cell.checkbox,
            this.mode.checkbox.default,
            ['id'],
            false,
            false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.row_col,
            ['name', 'type', 'quantity'],
            false,
            false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            ['quantity'],
            false,
            false
          ),

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

      case 'stocks_transfer':
        this.#stocks_transfer(tag);
        break;
      case 'employees_salary':
        this.#employees_salary(tag);
        break;
      case 'employees_activities':
        this.#employees_activities(tag);
        break;
      case 'employees_payroll':
        this.#employees_payroll(tag);
        break;
      case 'transactions_banking':
        this.#transactions_banking(tag);
        break;
      case 'transactions_purchases':
        this.#transactions_purchases(tag);
        break;
      case 'transactions_sales':
        this.#transactions_sales(tag);
        break;
      case 'transactions_receipts':
        this.#transactions_receipts(tag);
        break;
      case 'transactions_payments':
        this.#transactions_payments(tag);
        break;
      case 'shifts_process':
        this.#shifts_process(tag);
        break;
    }
  }
}

export default tablesOperations;