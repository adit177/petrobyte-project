import Tables from "./tables.js";
import pb from "../base/structure.js";
import {exT, plg, otR, CLS, sD, rdR, kws, deF, Lyt, glob, STYLE, keys} from "../../js/base/const.js";

class tablesManagement extends Tables {

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

  #accounts_contacts = (tag) => {
    const myTables = pb.mng.accounts.contacts.t;
    let OPTION;
    switch (tag) {
      case myTables.list:
        this.#shape = {
          '0': this.row(
            this.cell.account,
            this.mode.account.image_dual_text,
            this.values.account.image_dual_text("avatar", "name", "alias"),
            this.params.account.image_dual_text(),
            this.styles.account.image_dual_text()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("group_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("balance"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("last_entry_date"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("notify_method"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.get_event,
            this.values.button.get_event("ledger_id"),
            this.params.button.get_event("card", "view", "View"),
            this.styles.button.get_event(),
          )
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
            this.values.date.simple("date_id")
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_id")
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default(),
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("number"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, {
              0: {
                icon : 'view',
                name : 'card',
                value: 'view',
                text : 'View',
              },
              1: {
                icon : 'edit',
                name : 'card',
                value: 'edit',
                text : 'Edit',
              },
              2: {
                icon : 'delete',
                name : 'card',
                value: 'delete',
                text : 'Delete',
              }
            }),
            this.styles.dropdown.multiple()
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
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default(),
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("number"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, {
              0: {
                icon : 'view',
                name : 'card',
                value: 'view',
                text : 'View',
              },
              1: {
                icon : 'edit',
                name : 'card',
                value: 'edit',
                text : 'Edit',
              },
              2: {
                icon : 'delete',
                name : 'card',
                value: 'delete',
                text : 'Delete',
              }
            }),
            this.styles.dropdown.multiple()
          )
        }

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #accounts_vendors = (tag) => {
    const myTables = pb.mng.accounts.vendors.t;
    let OPTION;
    switch (tag) {
      case myTables.list:
        this.#shape = {
          '0': this.row(
            this.cell.account,
            this.mode.account.image_dual_text,
            this.values.account.image_dual_text("avatar", "name", "alias"),
            this.params.account.image_dual_text(),
            this.styles.account.image_dual_text()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("vendor_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("due_balance"),
            this.params.amount.default(0, 1),
            this.styles.amount.default(),
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("last_purchased"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '4': this.row(
            this.cell.icon,
            this.mode.icon.bootstrap,
            this.values.icon.bootstrap("notify_mode"),
            this.params.icon.bootstrap(),
            this.styles.icon.bootstrap(),
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.get_event,
            this.values.button.get_event("ledger_id"),
            this.params.button.get_event("card", "view", 'view'),
            this.styles.button.get_event()
          )
        };

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.bills:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("purd_account"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("description"),
            this.params.text.default(),
            this.styles.text.default()
          ),

          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, undefined),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.payment:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
          ),

        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.dues:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("due_date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("purd_account"),
            this.params.text.default(),
            this.styles.text.default()
          ),

          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("due_amount"),
            this.params.amount.default(0, 1),
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )


        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #accounts_suppliers = (tag) => {
    const myTables = pb.mng.accounts.suppliers.t;
    let OPTION;
    switch (tag) {
      case myTables.list:
        this.#shape = {
          '0': this.row(
            this.cell.account,
            this.mode.account.image_dual_text,
            this.values.account.image_dual_text("avatar", "name", "ledger_id"),
            this.params.account.image_dual_text(),
            this.styles.account.image_dual_text()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("due_balance"),
            this.params.amount.default(0, 1),
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("last_purchased"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '4': this.row(
            this.cell.icon,
            this.mode.icon.bootstrap,
            this.values.icon.bootstrap(""),
            this.params.icon.bootstrap(),
            this.styles.icon.bootstrap()
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.get_event,
            this.values.button.get_event("supplier_id"),
            this.params.button.get_event("card", "view", 'view'),
            this.styles.button.get_event()
          )

        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.purchases:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("purd_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("invoice_amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("taxable_amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("status"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '5': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("voucher_no"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.payments:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("transfer_from"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("memo"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("payment_id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.deducations:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("voucher_no"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '5': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("journal_id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.incentives:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("type"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '5': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("journal_id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )

        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #accounts_banks = (tag) => {
    const myTables = pb.mng.accounts.banks.t;
    let OPTION;
    switch (tag) {
      case myTables.list:
        this.#shape = {
          '0': this.row(
            this.cell.account,
            this.mode.account.image_dual_text,
            this.values.account.image_dual_text(["avatar", "account_name", "category_id"]),
            this.params.account.image_dual_text(),
            this.styles.account.image_dual_text()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account_num"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),

          '4': this.row(
            this.cell.button,
            this.mode.button.post_event,
            this.values.button.post_event("id"),
            this.params.button.post_event("card", "view", 'view'),
            this.styles.button.post_event()
          )


        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.receipts:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("transaction_type"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '5': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      //      case myRoot.c.tab.payments:
      //        OPTION = [3, ['redirect', 'redirect', 'redirect'], ['view', 'edit', 'delete']];
      case myTables.payments:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("transaction_type"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '5': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.expenses:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myTables.deposits:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("deposit_by"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '5': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  // todo: @shivam this is not finished.
  #accounts_expenses = (tag) => {
    const myTables = pb.mng.accounts.expenses.t;
    let OPTION;
    switch (tag) {
      case myTables.list:
        this.#shape = {
          '0': this.row(
            this.cell.rich,
            this.mode.account.image_dual_text,
            [1, 2, 3], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5],
            this.param_manuals.amount.currDec0,
            false
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.simple,
            [6],
            false,
            false
          ),
          '4': this.row(
            this.cell.icon,
            this.mode.icon.bootstrap,
            [7], false, false
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.get_event,
            [0],
            this.param_manuals.button.view_account,
            this.style_manuals.button.my_1),

        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.datewise:
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
            this.cell.amount,
            this.mode.amount.default,
            [4],
            this.param_manuals.amount.currDec0,
            false
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            [0],
            false,
            false
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.monthwise:
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
            this.cell.amount,
            this.mode.amount.default,
            [4],
            this.param_manuals.amount.currDec0,
            false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5],
            this.param_manuals.amount.currDec0,
            false
          ),
          '5': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            [0],
            false,
            false
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.details:
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
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #accounts_ledgers = (tag) => {
    const myTables = pb.mng.accounts.ledgers.t;
    let OPTION;
    switch (tag) {
      case myTables.list:
        this.#shape = {
          '0': this.row(
            this.cell.account,
            this.mode.account.image_dual_text,
            this.values.account.image_dual_text("avatar", "account_name", "alias"),
            this.params.account.image_dual_text(),
            this.styles.account.image_dual_text()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("current_balance"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("last_entry_date"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '4': this.row(
            this.cell.icon,
            this.mode.icon.bootstrap,
            this.values.icon.bootstrap("notify_mode"),
            this.params.icon.bootstrap(),
            this.styles.icon.bootstrap()
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.get_event,
            this.values.button.get_event("group_id"),
            this.params.button.get_event("card", "view", 'view'),
            this.styles.button.get_event()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.receipts:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.payments:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("ledger_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("note"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #accounts_gateways = (tag) => {
    const myTables = pb.mng.accounts.gateways.t;
    let OPTION;
    switch (tag) {
      case myTables.list:
        this.#shape = {
          '0': this.row(
            this.cell.rich,
            this.mode.account.image_dual_text,
            this.values.account.image_dual_text("avatar", "account_name", "ledger_id"),
            this.params.account.image_dual_text(),
            this.styles.account.image_dual_text()
          ),

          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("unsettled_amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("cycle_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("last_settlement"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '4': this.row(
            this.cell.button,
            this.mode.button.post_event,
            this.values.button.post_event("ledger_id"),
            this.params.button.post_event("card", "view", 'view'),
            this.styles.button.post_event()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.settlements:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("batch_detail"),
            this.params.text.default(),
            this.styles.text.default()
          ),

          '3': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("debit_lid"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '4': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )

        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myTables.sales:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date_id"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("voucher_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),

          '3': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
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
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("voucher_id"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("amount"),
            this.params.amount.default(0, 1),
            this.styles.amount.default()
          ),

          '3': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #accounts_loans = (tag) => {
    const myTables = pb.mng.accounts.loans.t;
    let OPTION;
    switch (tag) {
      case myTables.list:
        this.#shape = {
          '0': this.row(
            this.cell.account,
            this.mode.account.image_dual_text,
            [1, 2, 3], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5],
            this.param_manuals.amount.currDec0,
            false
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.simple,
            [6],
            false,
            false
          ),
          '4': this.row(
            this.cell.icon,
            this.mode.icon.bootstrap,
            [7], false, false
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.get_event,
            [0],
            this.param_manuals.button.view_account,
            this.style_manuals.button.my_1),

        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;


      case myTables.repayments:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("date"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("account"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default("emi_count"),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.month,
            this.values.date.month("date"),
            this.params.date.month(),
            this.styles.date.month()
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("principle_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("interest_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '6': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          ),

        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myTables.installments:
        this.#shape = {
          '0': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("emi_count"),
            this.params.number.default(),
            this.styles.number.default()
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.month,
            this.values.date.month("due_date"),
            this.params.date.month(),
            this.styles.date.month()
          ),
          '2': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("due_date"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("principle_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("interest_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default("status"),
            this.params.badge.default(),
            this.styles.badge.default()
          ),
          '6': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )

        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myTables.upcomingEmi:
        this.#shape = {
          '0': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default("emi_count"),
            this.params.number.default(),
            this.styles.number.default()
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.month,
            this.values.date.month("due_date"),
            this.params.date.month(),
            this.styles.date.month()
          ),
          '2': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple("due_date"),
            this.params.date.simple(),
            this.styles.date.simple()
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("principle_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default("interest_amount"),
            this.params.amount.default(),
            this.styles.amount.default()
          ),

          '5': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple("id"),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          )

        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #customers_add = (tag) => {
    const myRoot = pb.mng.customers.add;

    let OPTION;
    switch (tag) {
      case myRoot.c.table:
        const OPTION = [4, ['view', 'edit', 'delete'], ['view-add', 'edit-add', 'delete-add']];
        this.#shape = {
          '0': this.row(rdR.table.cell.checkbox, 'a', [0], [], 0, []),
          '1': this.row(rdR.table.cell.date, 'a', [1], [], 0, []),
          '2': this.row(rdR.table.cell.account, 'a', [2], [], 0, []),
          '3': this.row(rdR.table.cell.account, 'a', [3], [], 0, []),
          '4': this.row(rdR.table.cell.amount, 'a', [4], [2, 1], 0, [true, 'end', 125]),
          '5': this.row(rdR.table.cell.note, 'a', [5], [], 0, []),
          '6': this.row(rdR.table.cell.dropdown, 'b', [0], [], 100, ['pe-0 text-end', 100]),
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #customers_listing = (tag) => {
    const myRoot = pb.mng.customers.listing;

    let OPTION;

    switch (tag) {
      case myRoot.t.list:
        this.#shape =
          {
            '0': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default("name"),
              this.params.text.default(),
              this.styles.text.default()
            ),
            '1': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default("types"),
              this.params.text.default(),
              this.styles.text.default()
              //              ["types"], false, false
            ),
            '2': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default("contact_detail"),
              this.params.text.default(),
              this.styles.text.default()
              //              ["contact_detail"], false, false
            ),
            '3': this.row(
              this.cell.number,
              this.mode.number.percent,
              this.values.number.percent("credit_uses", "amount"),
              this.params.number.percent(),
              this.styles.number.percent()
              //              ["credit_uses", "amount"], false, false
            ),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              this.values.amount.default("amount"),
              this.params.amount.default(0, 1),
              this.styles.amount.default()
              //              ["amount"],
              //              this.param_manuals.amount.dec0,
              //              false
            ),
            '5': this.row(
              this.cell.date,
              this.mode.date.simple,
              this.values.date.simple("date"),
              this.params.date.simple(),
              this.styles.date.simple()
              //              ["date"],
              //              false,
              //              false
            ),
            '6': this.row(
              this.cell.dropdown,
              this.mode.dropdown.multiple,
              this.values.dropdown.multiple("id"),
              this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line),
              this.styles.dropdown.multiple()
              //              ["id"],
              //              false,
              //              false
            )
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #customers_detail = (tag) => {
    const myRoot = pb.mng.customers.detail;

    let OPTION;

    switch (tag) {
      case myRoot.t.receipts:

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
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [4],
            this.param_manuals.amount.currDec2,
            false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5],
            this.param_manuals.amount.currDec2,
            false
          ),
          '5': this.row(
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

      case myRoot.t.invoices:

        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.range,
            [2, 3],
            false,
            false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [4],
            this.param_manuals.amount.currDec0,
            false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5],
            this.param_manuals.amount.currDec0,
            false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [6], false, false),
          '6': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            [0],
            this.param_manuals.drop.text_btn,
            false
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.t.monthly_statement:

        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.month,
            [1],
            false,
            false
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [2],
            this.param_manuals.amount.currDec0,
            false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3],
            this.param_manuals.amount.currDec0,
            false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [4],
            this.param_manuals.amount.currDec0,
            false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5],
            this.param_manuals.amount.currDec0,
            false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [6],
            this.param_manuals.amount.currDec0,
            false
          ),
          '6': this.row(
            this.cell.button,
            this.mode.button.get_event,
            [0],
            this.param_manuals.button.view_account,
            this.style_manuals.button.my_1),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.t.vehicles:
        this.#shape =
          {
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
              this.cell.badge,
              this.mode.badge.default,
              [4], false, false),
            '5': this.row(
              this.cell.date,
              this.mode.date.date_w_gap,
              [5],
              false,
              false
            ),
            '6': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [6],
              this.param_manuals.amount.currDec0,
              false
            ),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.t.basic_interest:

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
              this.cell.amount,
              this.mode.amount.default,
              [2],
              this.param_manuals.amount.dec0,
              false
            )
            ,
            '2': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [3],
              this.param_manuals.amount.dec0,
              false
            ),
            '3': this.row(
              this.cell.date,
              this.mode.date.date_w_gap,
              [1],
              false,
              false
            ),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [4],
              this.param_manuals.amount.dec2,
              false
            ),
            '5': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [5],
              this.param_manuals.amount.dec2,
              false
            ),
            '6': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [6],
              this.param_manuals.amount.dec0,
              false
            ),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.t.custom_interest:

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
              this.cell.date,
              this.mode.date.date_w_gap,
              [1],
              false,
              false
            ),
            '2': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [2],
              this.param_manuals.amount.dec0,
              false
            )
            ,
            '3': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [3],
              this.param_manuals.amount.dec2,
              false
            ),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [4],
              this.param_manuals.amount.dec0,
              false
            ),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #billing_bucket = (tag) => {
    //    const myRoot = pb.mng.billing.bucket;
    //
    //    let OPTION;
    //    switch (tag) {
    //      case myRoot.c.table:
    const myTables = pb.mng.billing.bucket.t;
    let OPTION;
    switch (tag) {
      case myTables.customers_list:
        //        OPTION = ['card', 'customer', 'customer-section', 'View'];
        this.#shape =
          {
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
              this.cell.amount,
              this.mode.amount.default,
              [3],
              this.param_manuals.amount.currDec0,
              false
            ),
            '3': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [4],
              this.param_manuals.amount.currDec0,
              false
            ),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [5],
              this.param_manuals.amount.currDec0,
              false
            ),
            '5': this.row(
              this.cell.button,
              this.mode.button.get_event,
              [0],
              this.param_manuals.button.view_account,
              this.style_manuals.button.my_1
            )
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      //      case myRoot.p.customer:
      //        OPTION = [3, ['redirect', 'redirect', 'redirect'], ['view', 'edit', 'delete']];
      case myTables.customers_bills:
        this.#shape =
          {
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
              this.cell.date,
              this.mode.date.simple,
              [3],
              false,
              false
            ),
            '3': this.row(
              this.cell.text,
              this.mode.text.default,
              [4], false, false
            ),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [5],
              this.param_manuals.amount.currDec0,
              false
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
            ),
            '7': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [8],
              this.param_manuals.amount.currDec0,
              false
            ),
            '8': this.row(
              this.cell.text,
              this.mode.text.default,
              [9], false, false
            ),
            '9': this.row(
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
      //      case myRoot.p.month:
      //        OPTION = [3, ['redirect', 'redirect', 'redirect'], ['view', 'edit', 'delete']];
      case myTables.months_bills:
        this.#shape =
          {
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
              this.cell.date,
              this.mode.date.simple,
              [3],
              false,
              false
            ),
            '3': this.row(
              this.cell.text,
              this.mode.text.default,
              [4], false, false
            ),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [5],
              this.param_manuals.amount.currDec0,
              false
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
            ),
            '7': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [8],
              this.param_manuals.amount.currDec0,
              false
            ),
            '8': this.row(
              this.cell.text,
              this.mode.text.default,
              [9], false, false
            ),
            '9': this.row(
              this.cell.dropdown,
              this.mode.dropdown.multiple,
              [0],
              false,
              false
            )


            //            '0': this.row(rdR.table.cell.txt, 'a', [1], [], 0, []),
            //            '1': this.row(rdR.table.cell.txt, 'a', [2], [], 0, []),
            //            '2': this.row(rdR.table.cell.dt, 'a', [3], ['b'], 0, [true]),
            //            '3': this.row(rdR.table.cell.txt, 'a', [4], [], 0, []),
            //            '4': this.row(rdR.table.cell.amt, 'c', [5], [2, 0], 0, [true, 'end', 125]),
            //            '5': this.row(rdR.table.cell.amt, 'c', [6], [2, 0], 0, [true, 'end', 125]),
            //            '6': this.row(rdR.table.cell.amt, 'c', [7], [2, 0], 0, [true, 'end', 125]),
            //            '7': this.row(rdR.table.cell.amt, 'c', [8], [2, 0], 0, [true, 'end', 125]),
            //            '8': this.row(rdR.table.cell.txt, 'a', [9], [], 0, []),
            //            '9': this.row(rdR.table.cell.act, 'b', [0], OPTION, 1, [false, 'end']),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #billing_generate = (tag) => {
    //    const myRoot = pb.mng.billing.generate;
    //    let OPTION;
    //    switch (tag) {
    //      case myRoot.c.table:
    //        OPTION = [3, ['redirect', 'redirect', 'redirect'], ['view', 'edit', 'delete']];
    const myTables = pb.mng.billing.generate.t;
    let OPTION;
    switch (tag) {
      case myTables.customer_list:
        this.#shape = {
          '0': this.row(
            this.cell.rich,
            this.mode.account.img_dual_txt,
            [1, 2, 3], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            [4],
            false,
            false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5],
            this.param_manuals.amount.currDec0,
            false
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [6],
            this.param_manuals.amount.currDec0,
            false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          ),
          '6': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            [0],
            false,
            false
          )
          //          '0': this.row(rdR.table.cell.rich, 'b', [1, 2, 3], ['../../assets/media/'], 0, [true]),
          //          '1': this.row(rdR.table.cell.dt, 'a', [4], ['b'], 0, [true]),
          //          '2': this.row(rdR.table.cell.amt, 'c', [5], [2, 0], 0, [true, 'end', 125]),
          //          '3': this.row(rdR.table.cell.amt, 'c', [6], [2, 1], 0, [true, 'end', 125]),
          //          '4': this.row(rdR.table.cell.txt, 'a', [7], [], 0, [true]),
          //          '5': this.row(rdR.table.cell.act, 'b', [0], OPTION, 1, [false, 'end']),
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #users_detail = (tag) => {

    const myTables = pb.mng.users.detail.t;
    let OPTION;
    switch (tag) {
      case myTables.login_sessions:
        this.#shape =
          {
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
              this.cell.date,
              this.mode.date.gap,
              [4], false, false
            ),
            '4': this.row(
              this.cell.text,
              this.mode.text.default,
              [5], false, false
            ),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myTables.logs:
        this.#shape =
          {
            '0': this.row(
              this.cell.badge,
              this.mode.badge.default,
              [1], false, false
            ),
            '1': this.row(
              this.cell.text,
              this.mode.text.default,
              [2], false, false
            ),
            '2': this.row(
              this.cell.date,
              this.mode.date.simple,
              [3],
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

  #users_listing = (tag) => {
    const myRoot = pb.mng.users.listing;

    let OPTION;

    switch (tag) {
      case myRoot.t.list:
        this.#shape =
          {
            '0': this.row(
              this.cell.checkbox,
              this.mode.checkbox.default,
              [0],
              false, false),
            '1': this.row(
              this.cell.rich,
              this.mode.account.image_text,
              [1, 2, 3], false, false),
            '2': this.row(
              this.cell.text,
              this.mode.text.default,
              [4], false, false
            ),
            '3': this.row(
              this.cell.date,
              this.mode.date.gap,
              [5], false, false
            ),
            '4': this.row(
              this.cell.badge,
              this.mode.badge.default,
              [6], false, false
            ),
            '5': this.row(
              this.cell.date,
              this.mode.date.simple,
              [7],
              false,
              false
            ),
            '6': this.row(
              this.cell.dropdown,
              this.mode.dropdown.multiple,
              [0],
              this.param_manuals.drop.text_btn,
              false)
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #employees_detail = (tag) => {
    //    const myRoot = pb.mng.employees.detail;
    //    let OPTION;
    //    switch (tag) {
    //      case myRoot.c.table.transaction_history:
    const myTables = pb.mng.employees.detail.t;
    let OPTION;
    switch (tag) {
      case myTables.history:
        this.#shape =
          {
            '0': this.row(
              this.cell.text,
              this.mode.text.default,
              [0], false, false
            ),
            '1': this.row(
              this.cell.date,
              this.mode.date.simple,
              [1],
              false,
              false
            ),
            '2': this.row(
              this.cell.text,
              this.mode.text.default,
              [2], false, false
            ),
            '3': this.row(
              this.cell.badge,
              this.mode.badge.default,
              [3], false, false),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [4],
              this.param_manuals.amount.dec2,
              false
            ),
            '5': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [5],
              this.param_manuals.amount.dec2,
              false
            ),
            '6': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [6],
              this.param_manuals.amount.currDec2,
              false
            ),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      //      case myRoot.c.table.activities:
      //        OPTION = [3, ['card', 'card', 'action'], ['view', 'edit', 'delete']];
      case myTables.activities:
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
              this.cell.amount,
              this.mode.amount.default,
              [4],
              this.param_manuals.amount.currDec2,
              false
            ),
            '4': this.row(
              this.cell.badge,
              this.mode.badge.default,
              [5], this.param_manuals.badge.s_payroll_status, false),
            '5': this.row(
              this.cell.dropdown,
              this.mode.dropdown.multiple,
              [0],
              false,
              false
            )

            //            '0': this.row(rdR.table.cell.dt, 'a', [1], ['b'], 0, [true]),
            //            '1': this.row(rdR.table.cell.txt, 'a', [2], [], 0, []),
            //            '2': this.row(rdR.table.cell.txt, 'a', [3], [], 0, []),
            //            '3': this.row(rdR.table.cell.amt, 'c', [4], [2, 1], 0, [true, 'end', 125]),
            //            '4': this.row(rdR.table.cell.txt, 'a', [5], [], 0, []),
            //            '5': this.row(rdR.table.cell.act, 'b', [0], OPTION, 1, [false, 'end']),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      //      case myRoot.c.table.payroll:
      //        OPTION = [3, ['card', 'card', 'action'], ['view', 'edit', 'delete']];
      case myTables.payroll:
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
              this.cell.amount,
              this.mode.amount.default,
              [2],
              this.param_manuals.amount.currDec0,
              false
            ),
            '2': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [3],
              this.param_manuals.amount.currDec0,
              false
            ),
            '3': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [4],
              this.param_manuals.amount.currDec0,
              false
            ),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [5],
              this.param_manuals.amount.currDec0,
              false
            ),
            '5': this.row(
              this.cell.badge,
              this.mode.badge.default,
              [6], this.param_manuals.badge.s_payroll_status, false
            ),
            '6': this.row(
              this.cell.dropdown,
              this.mode.dropdown.multiple,
              [0],
              this.param_manuals.drop.text_btn,
              false)
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #employees_add = (tag) => {
    const myRoot = pb.mng.employees.add;
    switch (tag) {
      case myRoot.t.list:
        this.#shape = {
          '0': this.row(
            this.cell.rich,
            this.mode.account.img_dual_txt,
            [1, 2, 3], false, false
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.default,
            [4], false, false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            [5],
            false,
            false
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [6],
            false,
            false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [7], false, false
          )
        };

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #employees_listing = (tag) => {
    const myRoot = pb.mng.employees.listing;

    let OPTION;

    switch (tag) {
      case myRoot.t.list:
        this.#shape =
          {
            '0': this.row(
              this.cell.checkbox,
              this.mode.checkbox.default,
              this.values.checkbox.default("id"),
              this.params.checkbox.default(),
              this.styles.checkbox.default()
            ),
            //              ['id'],
            //              false, false),
            '1': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default("id"),
              this.params.text.default(),
              this.styles.text.default()
              //              ['id'], false, false
            ),
            '2': this.row(
              this.cell.rich,
              this.mode.account.image_text,
              this.values.account.image_text("img", "emp_name"),
              this.params.account.image_text(),
              this.styles.account.image_text()
              //              ['img', 'emp_name'], false, false
            ),
            '3': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default("role"),
              this.params.text.default(),
              this.styles.text.default()
              //              ['role'], false, false
            ),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              this.values.amount.default("amount"),
              this.params.amount.default(0, 1),
              this.styles.amount.default()
              //              ['amount'],
              //              this.param_manuals.amount.dec0,
              //              false
            ),
            '5': this.row(
              this.cell.date,
              this.mode.date.simple,
              this.values.date.simple("date"),
              this.params.date.simple(),
              this.styles.date.simple()
              //              ['date'],
              //              false,
              //              false
            ),
            '6': this.row(
              this.cell.amount,
              this.mode.amount.default,
              this.values.amount.default("activities"),
              this.params.amount.default(1, 1),
              this.styles.amount.default()
              //              ['activities'],
              //              this.param_manuals.amount.dec2,
              //              false
            ),
            '7': this.row(
              this.cell.dropdown,
              this.mode.dropdown.multiple,
              this.values.dropdown.multiple("id"),
              this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
              this.styles.dropdown.multiple()
              //              ['id'],
              //              this.param_manuals.drop.text_btn,
              //              false)
            )
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #billing_display = (tag) => {
    const myRoot = pb.mng.billing.display;

    let OPTION;

    switch (tag) {
      case myRoot.t.list:
        this.#shape =
          {
            '0': this.row(
              this.cell.date,
              this.mode.date.simple,
              this.values.date.simple("bill_date"),
              this.params.date.simple(),
              this.styles.date.simple()
              //              ['bill_date'],
              //              false,
              //              false
            ),
            '1': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default("invoice_number"),
              this.params.text.default(),
              this.styles.text.default()
              //              ['invoice_number'], false, false
            ),
            '2': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default("customer_id"),
              this.params.text.default(),
              this.styles.text.default()
              //              ['customer_id'], false, false
            ),
            '3': this.row(
              this.cell.amount,
              this.mode.amount.default,
              this.values.amount.default("bill_amount"),
              this.params.amount.default(0, 1),
              this.styles.amount.default()
              //              ['bill_amount'],
              //              this.param_manuals.amount.currDec0,
              //              false
            ),
            '4': this.row(
              this.cell.badge,
              this.mode.badge.default,
              this.values.badge.default("status"),
              this.params.badge.default(),
              this.styles.badge.default()
              //              ['status'], false, false
            ),
            //            todo:put the type according to event either get_event post_event
            '5': this.row(
              this.cell.button,
              this.mode.button.button,
              this.values.button.button("id"),
              this.params.button.button("View Bill"),
              this.styles.button.button()
              //              ['id'],
              //              this.param_manuals.button.view_bill,
              //              this.style_manuals.button.my_1),
            ),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myRoot.t.detail_invoice:
        this.#shape =
          {
            '0': this.row(
              this.cell.text,
              this.mode.text.default,
              [0], false, false
            ),
            '1': this.row(
              this.cell.date,
              this.mode.date.simple,
              [1],
              false,
              false
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
            ),
            '8': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [8],
              this.param_manuals.amount.currDec0,
              false
            ),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myRoot.t.summary:
        this.#shape =
          {
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
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #billing_create = (tag) => {
    const myRoot = pb.mng.billing.create;

    let OPTION;

    switch (tag) {
      case myRoot.t.list:
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
              this.cell.amount,
              this.mode.amount.default,
              [4],
              this.param_manuals.amount.currDec0,
              false
            ),
            '4': this.row(
              this.cell.badge,
              this.mode.badge.default,
              [5], false, false),
            '5': this.row(
              this.cell.button,
              this.mode.button.get_event,
              [0],
              this.param_manuals.button.create_slip,
              this.style_manuals.button.my_1),
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #products_listing = (tag) => {
    const myRoot = pb.mng.products.listing;

    let OPTION;

    switch (tag) {
      case myRoot.t.list:
        this.#shape =
          {
            '0': this.row(
              this.cell.checkbox,
              this.mode.checkbox.default,
              [0],
              false, false),
            '1': this.row(
              this.cell.text,
              this.mode.text.default,
              [0], false, false
            ),
            '2': this.row(
              this.cell.rich,
              this.mode.account.image_text,
              [1, 2], false, false),
            '3': this.row(
              this.cell.badge,
              this.mode.badge.default,
              [3], false, false),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [4],
              this.param_manuals.amount.dec0,
              false
            ),
            '5': this.row(
              this.cell.date,
              this.mode.date.simple,
              [5],
              false,
              false
            ),
            '6': this.row(
              this.cell.amount,
              this.mode.amount.default,
              [6],
              this.param_manuals.amount.dec2,
              false
            ),
            '7': this.row(
              this.cell.dropdown,
              this.mode.dropdown.multiple,
              [0],
              this.param_manuals.drop.text_btn,
              false)
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }
  #products_details = (tag) => {
    const myRoot = pb.mng.products.detail;

    let OPTION;

    switch (tag) {
      case myRoot.t.sales:
        this.#shape =
          {
            '0': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default('item'),
              this.params.text.default(),
              this.styles.text.default()
              //              ['item'],
              //              false, false),
            ),
            '1': this.row(
              this.cell.date,
              this.mode.date.month,
              this.values.date.month('month'),
              this.params.date.month(),
              this.styles.date.month()

              //              ['month'], false, false
            ),
            '2': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default('sale_volume'),
              this.params.text.default(),
              this.styles.text.default()
              //              ["sale_volume"], false, false),
            ),
            '3': this.row(
              this.cell.amount,
              this.mode.amount.default,
              this.values.amount.default("sale_amount"),
              this.params.amount.default(),
              this.styles.amount.default()
              //              ["sale_amount"], false, false
            ),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              this.values.amount.default("gross_profit"),
              this.params.amount.default(0, 1),
              this.styles.amount.default()
              //              ['gross_profit'],
              //              this.param_manuals.amount.dec0,
              //              false
            ),
            '5': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default("trade"),
              this.params.text.default(),
              this.styles.text.default()
              //              ["trade"],
              //              false,
              //              false
            )
          }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myRoot.t.purchases:
        this.#shape =
          {
            '0': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default('item'),
              this.params.text.default(),
              this.styles.text.default()
              //              ['item'],
              //              false, false),
            ),
            '1': this.row(
              this.cell.date,
              this.mode.date.month,
              this.values.date.month('month'),
              this.params.date.month(),
              this.styles.date.month()
              //              ['month'], false, false
            ),
            '2': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default('purd_volume'),
              this.params.text.default(),
              this.styles.text.default()
              //              ["purd_volume"], false, false
            ),
            '3': this.row(
              this.cell.amount,
              this.mode.amount.default,
              this.values.amount.default("purd_amount"),
              this.params.amount.default(),
              this.styles.amount.default()
              //              ["purd_amount"], false, false
            ),
            '4': this.row(
              this.cell.amount,
              this.mode.amount.default,
              this.values.amount.default("vat_paid"),
              this.params.amount.default(0, 1),
              this.styles.amount.default()
              //              ['vat_paid'],
              //              this.param_manuals.amount.dec0,
              //              false
            ),
            '5': this.row(
              this.cell.text,
              this.mode.text.default,
              this.values.text.default("shortage"),
              this.params.text.default(),
              this.styles.text.default()
              //              ["shortage"],
              //              false,
              //              false
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
      case 'accounts_contacts':
        this.#accounts_contacts(tag);
        break;
      case 'accounts_banks':
        this.#accounts_banks(tag);
        break;
      case 'accounts_vendors':
        this.#accounts_vendors(tag);
        break;
      case 'accounts_suppliers':
        this.#accounts_suppliers(tag);
        break;
      case 'accounts_expenses':
        this.#accounts_expenses(tag);
        break;
      case 'accounts_ledgers':
        this.#accounts_ledgers(tag);
        break;
      case 'accounts_gateways':
        this.#accounts_gateways(tag);
        break;
      case 'accounts_loans':
        this.#accounts_loans(tag);
        break;
      case 'billing_bucket':
        this.#billing_bucket(tag);
        break;
      case 'billing_generate':
        this.#billing_generate(tag);
        break;
      case 'billing_create':
        this.#billing_create(tag);
        break;
      case 'users_listing':
        this.#users_listing(tag);
        break;
      case 'employees_detail':
        this.#employees_detail(tag);
        break;
      case 'employees_add':
        this.#employees_add(tag);
        break;
      case 'employees_listing':
        this.#employees_listing(tag);
        break;

      case 'customers_listing':
        this.#customers_listing(tag);
        break;

      case 'customers_add':
        this.#customers_add(tag);
        break;

      case 'customers_detail':
        this.#customers_detail(tag);
        break;

      case 'billing_display':
        this.#billing_display(tag);
        break;

      case 'products_listing':
        this.#products_listing(tag);
        break;
      case 'products_detail':
        this.#products_details(tag);
        break;
      case 'users_detail':
        this.#users_detail(tag);
        break;
    }
  }
}

export default tablesManagement;