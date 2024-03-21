import Tables from "./tables.js";
import pb from "../base/structure.js";

class tablesSettings extends Tables {

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

  #profile_billing = (tag) => {
    const myRoot = pb.set.profile.billing.t;

    switch (tag) {
      case myRoot.success:
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
            this.cell.badge,
            this.mode.badge.default,
            [4],
            false,
            false
          ),
          '4': this.row(
            this.cell.button,
            this.mode.button.post_event,
            [0],
            this.param_manuals.button.get_email,
            this.style_manuals.button.my_1),
          '5': this.row(
            this.cell.button,
            this.mode.button.post_event,
            [0],
            this.param_manuals.button.view_invoice,
            this.style_manuals.button.my_1),
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myRoot.failed:
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
            this.cell.badge,
            this.mode.badge.default,
            [4],
            false,
            false
          ),
          '4': this.row(
            this.cell.button,
            this.mode.button.post_event,
            [0],
            this.param_manuals.button.get_email,
            this.style_manuals.button.my_1),
          '5': this.row(
            this.cell.button,
            this.mode.button.post_event,
            [0],
            this.param_manuals.button.view_invoice,
            this.style_manuals.button.my_1),
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #profile_logs = (tag) => {
    const myRoot = pb.set.profile.logs.t;
    switch (tag) {
      case myRoot.sessions:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [2],
            false,
            false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            [3], false, false
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.gap,
            [4],
            false,
            false
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
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #profile_referral = (tag) => {
    const myRoot = pb.set.profile.referral.t;
    switch (tag) {
      case myRoot.year:
        this.#shape = {
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
            this.cell.badge,
            this.mode.badge.default,
            [4],
            false,
            false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5],
            this.param_manuals.amount.currDec0,
            false)
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myRoot.time:
        this.#shape = {
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
            this.cell.badge,
            this.mode.badge.default,
            [4],
            false,
            false
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [5],
            this.param_manuals.amount.currDec0,
            false)
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #profile_security = (tag) => {
    const myRoot = pb.set.profile.security.t;
    switch (tag) {
      case myRoot.admin_enable:
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
            this.cell.badge,
            this.mode.badge.default,
            [5],
            false,
            false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [6],
            false,
            false
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myRoot.admin_disable:
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
            this.cell.badge,
            this.mode.badge.default,
            [5],
            false,
            false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [6],
            false,
            false
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.user_enable:
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
            this.cell.badge,
            this.mode.badge.default,
            [5],
            false,
            false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [6],
            false,
            false
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.user_disable:
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
            this.cell.badge,
            this.mode.badge.default,
            [5],
            false,
            false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [6],
            false,
            false
          )
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myRoot.use:
        this.#shape = {
          '0': this.row(
            this.cell.badge,
            this.mode.badge.default,
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
            this.cell.date,
            this.mode.date.gap,
            [4],
            false,
            false
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.default,
            [5], false, false
          ),
          '5': this.row(
            this.cell.icon,
            this.mode.icon.bootstrap,
            [6], false, false
          ),
        };
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #profile_wallet = (tag) => {
    const myRoot = pb.set.profile.wallet.t;
    switch (tag) {
      case myRoot.this_year:
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
            this.param_manuals.amount.currDec0,
            false),
          '4': this.row(
            this.cell.button,
            this.mode.button.post_event,
            [0],
            this.param_manuals.button.view_invoice,
            this.style_manuals.button.my_1),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
      case myRoot.last_year:
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
            this.param_manuals.amount.currDec0,
            false),
          '4': this.row(
            this.cell.button,
            this.mode.button.post_event,
            [0],
            this.param_manuals.button.view_invoice,
            this.style_manuals.button.my_1),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #subscription_add = (tag) => {
    const myRoot = pb.set.subscriptions.add.t;
    switch (tag) {
      case myRoot.add_product:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            [2],
            false,
            false),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3],
            this.param_manuals.amount.currDec0,
            false),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [4],
            this.param_manuals.amount.currDec0,
            false),
          '4': this.row(
            this.cell.button,
            this.mode.button.deleteButton,
            [0],
            false,
            this.style_manuals.button.my_1)
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;
    }
  }

  #intel_health = (tag) => {
    const myRoot = pb.set.intel.health.t;
    switch (tag) {
      case myRoot.sale:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            ["items-a"],
            false,
            false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            ["items-b"],
            false,
            false),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            ["voucher"],
            false,
            false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff-txn"],
            false,
            false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff-item"],
            false,
            false
          ),
          '6': this.row(
            this.cell.badge,
            this.mode.badge.default,
            ["status_id"],
            false,
            false
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.purchase:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            ["items-a"],
            false,
            false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            ["items-b"],
            false,
            false),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            ["voucher"],
            false,
            false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff-txn"],
            false,
            false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff-item"],
            false,
            false
          ),
          '6': this.row(
            this.cell.badge,
            this.mode.badge.default,
            ["status_id"],
            false,
            false
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.receipt:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            ["vou_rows"],
            false,
            false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            ["vou_head"],
            false,
            false),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff_txn"],
            false,
            false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff_item"],
            false,
            false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            ["status_id"],
            false,
            false
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.payment:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            ["vou_rows"],
            false,
            false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            ["vou_head"],
            false,
            false),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff_txn"],
            false,
            false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff_item"],
            false,
            false
          ),
          '5': this.row(
            this.cell.badge,
            this.mode.badge.default,
            ["status_id"],
            false,
            false
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.journal:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            ["rows_dr"],
            false,
            false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            ["rows_cr"],
            false,
            false),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            ["vou_head"],
            false,
            false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff_txn"],
            false,
            false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff_vou"],
            false,
            false
          ),
          '6': this.row(
            this.cell.badge,
            this.mode.badge.default,
            ["status_id"],
            false,
            false
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.contra:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            ["date_id"], false, false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            ["voucher"],
            false,
            false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            ["debited"],
            false,
            false),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.default,
            ["credited"],
            false,
            false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff_txn"],
            false,
            false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff_dr"],
            false,
            false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.default,
            ["diff_cr"],
            false,
            false
          ),
          '7': this.row(
            this.cell.badge,
            this.mode.badge.default,
            ["status_id"],
            false,
            false
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;


      case myRoot.items:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            ["item_id"],
            false,
            false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            ["opening"],
            false,
            false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            ["sales"],
            false,
            false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            ["purd"],
            false,
            false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            ["loss"],
            false,
            false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            ["closing"],
            false,
            false
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            ["difference", "unit_id"],
            false,
            false
          ),
          '7': this.row(
            this.cell.badge,
            this.mode.badge.default,
            ["status_id"],
            false,
            false
          ),
        }

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;


      case myRoot.shift:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            ["date_id"],
            false,
            false
          ),
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            ["shift_sale"],
            false,
            false
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.default,
            ["voucher_sale"],
            false,
            false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.default,
            ["pre_credit"],
            false,
            false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            ["post_credit"],
            false,
            false
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.default,
            ["difference"],
            false,
            false
          ),
          '6': this.row(
            this.cell.badge,
            this.mode.badge.default,
            ["status_id"],
            false,
            false
          ),
        }

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;


      case myRoot.inputs:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            ["date_id"],
            false,
            false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            ["delivery_date_id"],
            false,
            false
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.default,
            ["item_id"],
            false,
            false
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            ["quantity", "unit_id"],
            false,
            false
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.default,
            ["voucher"],
            false,
            false
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.default,
            ["cost"],
            false,
            false
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.default,
            ["input"],
            false,
            false
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.default,
            ["settled"],
            false,
            false
          ),
          '8': this.row(
            this.cell.number,
            this.mode.number.default,
            ["shift_id"],
            false,
            false
          ),
          '9': this.row(
            this.cell.badge,
            this.mode.badge.default,
            ["status_id"],
            false,
            false
          ),
        }

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.inventory:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            [2],
            false,
            false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3],
            this.param_manuals.amount.currDec0,
            false),
          '3': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [4],
            false,
            false
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.petroleum:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            [1], false, false
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.simple,
            [2],
            false,
            false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3],
            this.param_manuals.amount.currDec0,
            false),
          '3': this.row(
            this.cell.badge,
            this.mode.badge.default,
            [4],
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
      case 'profile_billing':
        this.#profile_billing(tag);
        break;
      case 'profile_logs':
        this.#profile_logs(tag);
        break;
      case 'profile_referral':
        this.#profile_referral(tag);
        break;
      case 'profile_security':
        this.#profile_security(tag);
        break;
      case 'profile_wallet':
        this.#profile_wallet(tag);
        break;

      case 'subscriptions_add':
        this.#subscription_add(tag);
        break;

      case 'intel_health':
        this.#intel_health(tag);
        break;
    }
  }
}

export default tablesSettings;