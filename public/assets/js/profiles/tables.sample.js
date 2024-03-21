import Tables from "./tables.js";
import pb from "../base/structure.js";
import {CLS, keys, rdR, STYLE} from "../base/const.js";

class tablesSample extends Tables {

  // define properties
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
  cases = ['renders_tables', 'extends_foreign'];


  // define methods.
  #renders_tables = (tag) => {
    console.log("bhai please dikh ja" );
    console.log(tag);
    console.log("ho gya")
    const myRoot = pb.sam.renders.tables.t;
    switch (tag) {
      case myRoot.date:
        this.#shape = {
          '0': this.row(
            this.cell.date,
            this.mode.date.simple,
            this.values.date.simple('date_0'),
            this.params.date.simple(rdR.common.params.date.fd_fmi_sy_d),
            this.styles.date.simple()
          ),
          '1': this.row(
            this.cell.date,
            this.mode.date.range,
            this.values.date.range('date_0', 'date_1'),
            this.params.date.range(),
            this.styles.date.range()
          ),
          '2': this.row(
            this.cell.date,
            this.mode.date.month,
            this.values.date.month('date_0'),
            this.params.date.month(),
            this.styles.date.month()
          ),
          '3': this.row(
            this.cell.date,
            this.mode.date.gap,
            this.values.date.gap('date_0', 'date_2'),
            this.params.date.gap(),
            this.styles.date.gap('fs-6 text-info')
          ),
          '4': this.row(
            this.cell.date,
            this.mode.date.date_w_gap,
            this.values.date.date_w_gap('date_0', 'date_2'),
            this.params.date.date_w_gap(),
            this.styles.date.date_w_gap()
          ),
          '5': this.row(
            this.cell.date,
            this.mode.date.range_w_text,
            this.values.date.range_w_text('date_0', 'date_1'),
            this.params.date.range_w_text(undefined, undefined, 'billing period'),
            this.styles.date.range_w_text()
          ),
          '6': this.row(
            this.cell.date,
            this.mode.date.date_w_invoice,
            this.values.date.date_w_invoice('invoice', 'date_1'),
            this.params.date.date_w_invoice(undefined, 'Created On'),
            this.styles.date.date_w_invoice()
          ),
          '7': this.row(
            this.cell.date,
            this.mode.date.date_w_range,
            this.values.date.date_w_range('date_0', 'date_1', 'date_2'),
            this.params.date.date_w_range(),
            this.styles.date.date_w_range('text-primary fw-semibold')
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.amount:
        this.#shape = {
          '0': this.row(
            this.cell.amount,
            this.mode.amount.default,
            this.values.amount.default('amount_0'),
            this.params.amount.default(),
            this.styles.amount.default()
          ),
          '1': this.row(
            this.cell.amount,
            this.mode.amount.amount_breakup,
            this.values.amount.amount_breakup('amount_0', 'amount_1'),
            this.params.amount.amount_breakup(),
            this.styles.amount.amount_breakup()
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_button,
            this.values.amount.amount_w_button('amount_0', 'button'),
            this.params.amount.amount_w_button(),
            this.styles.amount.amount_w_button(undefined, undefined, 'fs-4 text-info')
          ),
          '3': this.row(
            this.cell.amount,
            this.mode.amount.dual_amount_w_percent,
            this.values.amount.dual_amount_w_percent('amount_0', 'amount_1'),
            this.params.amount.dual_amount_w_percent(),
            this.styles.amount.dual_amount_w_percent()
          ),
          '4': this.row(
            this.cell.amount,
            this.mode.amount.triple_amount_column_row,
            this.values.amount.triple_amount_column_row('amount_0', 'amount_1', 'amount_2'),
            this.params.amount.triple_amount_column_row(),
            this.styles.amount.triple_amount_column_row()
          ),
          '5': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_checkbox,
            this.values.amount.amount_w_checkbox('amount_0', ''),
            this.params.amount.amount_w_checkbox(),
            this.styles.amount.amount_w_checkbox()
          ),
          '6': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_badge,
            this.values.amount.amount_w_badge('amount_0', 'badge'),
            this.params.amount.amount_w_badge(),
            this.styles.amount.amount_w_badge()
          ),
          '7': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_percent,
            this.values.amount.amount_w_percent('amount_0', 'amount_1'),
            this.params.amount.amount_w_percent(),
            this.styles.amount.amount_w_percent()
          ),
          '8': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_button_a_percent,
            this.values.amount.amount_w_button_a_percent('amount_0', 'percent', 'amount_1'),
            this.params.amount.amount_w_button_a_percent(),
            this.styles.amount.amount_w_button_a_percent()
          ),
          '9': this.row(
            this.cell.amount,
            this.mode.amount.amount_w_unit,
            this.values.amount.amount_w_unit('amount_0', 'unit'),
            this.params.amount.amount_w_unit(),
            this.styles.amount.amount_w_unit()
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.account:
        this.#shape = {
          '0': this.row(
            this.cell.account,
            this.mode.account.default,
            this.values.account.default('name'),
            this.params.account.default(),
            this.styles.account.default()
          ),
          '1': this.row(
            this.cell.account,
            this.mode.account.image_text,
            this.values.account.image_text('img', 'name'),
            this.params.account.image_text(),
            this.styles.account.image_text(undefined, CLS.symbol.circle, undefined, `${STYLE.color.danger} fw-semibold`)
          ),
          '2': this.row(
            this.cell.account,
            this.mode.account.image_dual_text,
            this.values.account.image_dual_text('image', 'name', 'desc'),
            this.params.account.image_dual_text(),
            this.styles.account.image_dual_text()
          ),
          '3': this.row(
            this.cell.account,
            this.mode.account.account_w_alias,
            this.values.account.account_w_alias('name', 'desc'),
            this.params.account.account_w_alias(),
            this.styles.account.account_w_alias()
          ),
          '4': this.row(
            this.cell.account,
            this.mode.account.account_alias_w_popover,
            this.values.account.account_alias_w_popover('ledgers', 'desc'),
            this.params.account.account_alias_w_popover(),
            this.styles.account.account_alias_w_popover()
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.text:
        this.#shape = {
          '0': this.row(
            this.cell.text,
            this.mode.text.default,
            this.values.text.default('text'),
            this.params.text.default(),
            this.styles.text.default()
          ),
          '1': this.row(
            this.cell.text,
            this.mode.text.modify,
            this.values.text.modify('text'),
            this.params.text.modify(),
            this.styles.text.modify()
          ),
          '2': this.row(
            this.cell.text,
            this.mode.text.row,
            this.values.text.row('text', 'desc'),
            this.params.text.row(),
            this.styles.text.row()
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.column,
            this.values.text.column('text', 'desc'),
            this.params.text.column(),
            this.styles.text.column()
          ),
          '4': this.row(
            this.cell.text,
            this.mode.text.column_w_prefix,
            this.values.text.column_w_prefix('debit', 'credit'),
            this.params.text.column_w_prefix(),
            this.styles.text.column_w_prefix()
          ),
          '5': this.row(
            this.cell.text,
            this.mode.text.column_aligned,
            this.values.text.column_aligned('text', 'name'),
            this.params.text.column_aligned(),
            this.styles.text.column_aligned()
          ),
          '6': this.row(
            this.cell.text,
            this.mode.text.row_col,
            this.values.text.row_col('text', 'name', 'number'),
            this.params.text.row_col(),
            this.styles.text.row_col()
          ),
          '7': this.row(
            this.cell.text,
            this.mode.text.row_col_icon,
            this.values.text.row_col_icon('text', 'name', 'icon'),
            this.params.text.row_col_icon(),
            this.styles.text.row_col_icon()
          ),
          '8': this.row(
            this.cell.text,
            this.mode.text.stack_col,
            this.values.text.stack_col('text', 'name', 'number'),
            this.params.text.stack_col(),
            this.styles.text.stack_col()
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.note:
        this.#shape = {
          '0': this.row(
            this.cell.note,
            this.mode.note.default,
            this.values.note.default('note'),
            this.params.note.default(),
            this.styles.note.default('fs-7')
          ),
          '1': this.row(
            this.cell.note,
            this.mode.note.word_limit,
            this.values.note.word_limit('long_note'),
            this.params.note.word_limit(10),
            this.styles.note.word_limit()
          ),
          '2': this.row(
            this.cell.note,
            this.mode.note.tooltip,
            this.values.note.tooltip('tooltip'),
            this.params.note.tooltip(),
            this.styles.note.tooltip()
          ),
          '3': this.row(
            this.cell.note,
            this.mode.note.popover,
            this.values.note.popover('title', 'pop_note'),
            this.params.note.popover('left', 'view note'),
            this.styles.note.popover()
          ),
          '4': this.row(
            this.cell.note,
            this.mode.note.expandable,
            this.values.note.expandable('long_note'),
            this.params.note.expandable(),
            this.styles.note.expandable()
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.checkbox:
        this.#shape = {
          '0': this.row(
            this.cell.checkbox,
            this.mode.checkbox.default,
            this.values.checkbox.default('value'),
            this.params.checkbox.default('name', 'this is checkbox'),
            this.styles.checkbox.default()
          ),
          '1': this.row(
            this.cell.checkbox,
            this.mode.checkbox.eventble,
            this.values.checkbox.eventble('value'),
            this.params.checkbox.eventble(),
            this.styles.checkbox.eventble()
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.dropdown:
        this.#shape = {
          '1': this.row(
            this.cell.dropdown,
            this.mode.dropdown.single,
            this.values.dropdown.single('id'),
            this.params.dropdown.single(),
            this.styles.dropdown.single()
          ),
          '2': this.row(
            this.cell.dropdown,
            this.mode.dropdown.multiple,
            this.values.dropdown.multiple('id'),
            this.params.dropdown.multiple('View Options', undefined, 3, keys.icons.line, false),
            this.styles.dropdown.multiple()
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.number:
        this.#shape = {
          '1': this.row(
            this.cell.number,
            this.mode.number.default,
            this.values.number.default('decimal'),
            this.params.number.default(),
            this.styles.number.default()
          ),
          '2': this.row(
            this.cell.number,
            this.mode.number.percent,
            this.values.number.percent('value', 'mark'),
            this.params.number.percent(),
            this.styles.number.percent()
          ),
          '3': this.row(
            this.cell.number,
            this.mode.number.dual_number,
            this.values.number.dual_number('medium', 'small'),
            this.params.number.dual_number(undefined, 0),
            this.styles.number.dual_number()
          ),
          '4': this.row(
            this.cell.number,
            this.mode.number.w_unit,
            this.values.number.w_unit('value', 'unit'),
            this.params.number.w_unit(undefined, 0),
            this.styles.number.w_unit()
          ),
          '5': this.row(
            this.cell.number,
            this.mode.number.w_percent,
            this.values.number.w_percent('value', 'mark', 'badge'),
            this.params.number.w_percent(undefined, 0),
            this.styles.number.w_percent()
          ),
          '6': this.row(
            this.cell.number,
            this.mode.number.collection,
            this.values.number.collection('sno', 'decimal', 'small'),
            this.params.number.collection(undefined, 2, 'Sale'),
            this.styles.number.collection()
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.input:
        this.#shape = {
          '0': this.row(
            this.cell.input,
            this.mode.input.default,
            this.values.input.default('name'),
            this.params.input.default(),
            this.styles.input.default()
          ),
          '1': this.row(
            this.cell.input,
            this.mode.input.plugin,
            this.values.input.plugin(undefined),
            this.params.input.plugin('date', 'date', 'human', 'Date is here'),
            this.styles.input.plugin('200', CLS.cluster.input.solid_sm)
          ),
          '2': this.row(
            this.cell.input,
            this.mode.input.event,
            this.values.input.event('name'),
            this.params.input.event(),
            this.styles.input.event()
          ),
          '3': this.row(
            this.cell.input,
            this.mode.input.checkbox,
            this.values.input.checkbox('name'),
            this.params.input.checkbox(),
            this.styles.input.checkbox()
          ),
          '4': this.row(
            this.cell.input,
            this.mode.input.switch,
            this.values.input.switch('name'),
            this.params.input.switch(),
            this.styles.input.switch()
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.badge:
        this.#shape = {
          '0': this.row(
            this.cell.badge,
            this.mode.badge.default,
            this.values.badge.default('badge'),
            this.params.badge.default(undefined, 'shift_slots'),
            this.styles.badge.default()
          ),
          '1': this.row(
            this.cell.badge,
            this.mode.badge.inside,
            this.values.badge.inside('count'),
            this.params.badge.inside(),
            this.styles.badge.inside()
          ),
          '2': this.row(
            this.cell.badge,
            this.mode.badge.corner,
            this.values.badge.corner('count'),
            this.params.badge.corner(rdR.common.params.badge.circle),
            this.styles.badge.corner()
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.image:
        this.#shape = {
          '0': this.row(
            this.cell.image,
            this.mode.image.simple,
            this.values.image.simple('img', 'name'),
            this.params.image.simple(),
            this.styles.image.simple()
          ),
          '1': this.row(
            this.cell.image,
            this.mode.image.image,
            this.values.image.image('img'),
            this.params.image.image(rdR.common.params.img.avatar),
            this.styles.image.image(45, 'symbol-circle')
          ),
          '2': this.row(
            this.cell.image,
            this.mode.image.label,
            this.values.image.label('name'),
            this.params.image.label(),
            this.styles.image.label(undefined, '2x', 'success')
          ),
          '3': this.row(
            this.cell.image,
            this.mode.image.group,
            this.values.image.group('img', 'name'),
            this.params.image.group(),
            this.styles.image.group()
          ),

        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.status:
        this.#shape = {
          '0': this.row(
            this.cell.status,
            this.mode.status.simple,
            this.values.status.simple('sts'),
            this.params.status.simple('notify_mode'),
            this.styles.status.simple()
          ),
          '1': this.row(
            this.cell.status,
            this.mode.status.badge,
            this.values.status.badge('sts'),
            this.params.status.badge('shift_slots', CLS.badge.square_light, undefined),
            this.styles.status.badge()
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.icon:
        this.#shape = {
          '0': this.row(
            this.cell.icon,
            this.mode.icon.bootstrap,
            this.values.icon.bootstrap('bi'),
            this.params.icon.bootstrap(),
            this.styles.icon.bootstrap()
          ),
          '1': this.row(
            this.cell.icon,
            this.mode.icon.keen,
            this.values.icon.keen('ki'),
            this.params.icon.keen(),
            this.styles.icon.keen(undefined, 'danger')
          ),
          '2': this.row(
            this.cell.icon,
            this.mode.icon.font,
            this.values.icon.font('fa'),
            this.params.icon.font(),
            this.styles.icon.font()
          ),
          '3': this.row(
            this.cell.icon,
            this.mode.icon.line,
            this.values.icon.line('la'),
            this.params.icon.line(),
            this.styles.icon.line()
          )
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

      case myRoot.button:
        this.#shape = {
          '0': this.row(
            this.cell.button,
            this.mode.button.action,
            this.values.button.action('id'),
            this.params.button.action(),
            this.styles.button.action()
          ),
          '1': this.row(
            this.cell.button,
            this.mode.button.event,
            this.values.button.event('id'),
            this.params.button.event(),
            this.styles.button.event()
          ),
          '2': this.row(
            this.cell.button,
            this.mode.button.post_event,
            this.values.button.post_event('id'),
            this.params.button.post_event(),
            this.styles.button.post_event()
          ),
          '3': this.row(
            this.cell.button,
            this.mode.button.get_event,
            this.values.button.get_event('id'),
            this.params.button.get_event(),
            this.styles.button.get_event()
          ),
          '4': this.row(
            this.cell.button,
            this.mode.button.two_inline,
            this.values.button.two_inline('id'),
            this.params.button.two_inline(),
            this.styles.button.two_inline()
          ),
          '5': this.row(
            this.cell.button,
            this.mode.button.three_row_column,
            this.values.button.three_row_column('id'),
            this.params.button.three_row_column(),
            this.styles.button.three_row_column()
          ),
          '6': this.row(
            this.cell.button,
            this.mode.button.three_inline_w_icon,
            this.values.button.three_inline_w_icon('id'),
            this.params.button.three_inline_w_icon(),
            this.styles.button.three_inline_w_icon()
          ),
        }
        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  #extends_foreign = (tag) => {
    const myRoot = pb.sam.extends.foreign.t;
    console.log("idhar");
    switch (tag) {
      case myRoot.fore:

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
            this.mode.text.modify,
            [2],
            false,
            false
          ),
          '2': this.row(
            this.cell.amount,
            this.mode.amount.default,
            [3],
            false,
            false
          ),
          '3': this.row(
            this.cell.text,
            this.mode.text.modify,
            [4],
            false,
            false)
        }

        this.tableMethods = {}
        this.tableOptions = {}
        this.tableParams = {}
        break;

    }
  }

  profileGenerate = (path, tag) => {
    const propName = path[1] + '_' + path[2];
    console.log(propName);
    if (_.indexOf(this.cases, propName) === -1) {
      alert(`Invalid case: ${propName} in table.sample.js`);
    }
    switch (propName) {
      case 'renders_tables':
        this.#renders_tables(tag);
        break;

      case 'extends_foreign':
        this.#extends_foreign(tag);
        break;
    }
  }
}

export default tablesSample;