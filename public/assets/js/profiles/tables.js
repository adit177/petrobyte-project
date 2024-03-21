import {exT, plg, otR, CLS, sD, rdR, kws, deF, Lyt, glob, STYLE, keys} from "../../js/base/const.js";
import pb from "../base/structure.js";
import {eTypes} from "../base/events.js";
import {_dc} from "../base/defaults.js";
import Profiles from "./profiles.js";


class Tables extends Profiles {

  constructor() {
    super('Tables');
  }

  cell = rdR.table.cell;
  mode = rdR.table.mode;

  style_manuals = {
    rich  : {
      asdf: 'asdf',
    },
    button: {
      my_1: 'my_1',
    },
    amount: {
      right : 'right',
      center: 'center',
    },
    text  : {
      center: 'center',
    }
  }

  param_manuals = {
    rich  : {},
    button: {
      view_account    : 'view_account',
      edit_account    : 'edit_account',
      view_slip       : 'view_slip',
      get_email       : 'get_email',
      view_invoice    : 'view_invoice',
      view_transaction: 'view_transaction',
      delete_entry    : 'delete_entry',
      view_bill       : 'view_bill',
      view_email      : "view_email",
      view_table      : "view_table",
      view_card       : "view_card",
      view_wizard     : "view_wizard",
      create_slip     : "create_slip",

    },
    amount: {
      dec2    : 'dec2',
      dec1    : 'dec1',
      dec0    : 'dec0',
      currDec2: 'currdec2',
      currDec1: 'currdec1',
      currDec0: 'currdec0',
    },
    date  : {
      range_full    : 'range_full',
      range_w_text  : "range_w_text",
      date_w_invoice: "date_w_invoice",
    },
    drop  : {
      text_btn : 'text_button',
      text_btn2: 'text_button2',
    },
    badge : {
      rc_string       : 'rc_string',
      s_amount_status : 's_amount_status',
      s_payroll_status: 's_payroll_status',
      s_crb_status    : 's_crb_status',
      s_vehicle       : 's_vehicle',
    }
  }


  /**
   *
   * @param type
   * @param method
   * @param value
   * @param {any} param
   * @param style
   * @param outline
   * @param options
   * @returns {{type: *, method: *, value: *, param: *, style: *, plot: *, options: *}}
   */
  row = (type, method, value, param = false, style = false, outline = false, options = {}) => {

    let styleObj, paramObj, outlineObj;

    console.log('row', type, method, value, param, style, options);

    if (_.isObject(param)) {
      paramObj = this.param_default(type, method)(param);
    }
    else {
      param = this.params[type][method]();
      paramObj = this.param_default(type, method)(param);
    }

    // going with default style as per cell mode.
    if (_.isObject(style)) {
      styleObj = this.style_default(type, method)(style);
    }
    else {
      style = this.styles[type][method]();
      styleObj = this.style_default(type, method)(style);
    }

    // cell Style.
    // going with default style as per cell mode.
    if (_.isObject(outline)) {
      outlineObj = this.outline_default(type, method)(outline);
    }
    else {
      outline = this.outline[type][method]();
      outlineObj = this.outline_default(type, method)(outline);
    }

    return {
      type   : type,
      method : method,
      value  : value.join(','),
      params : paramObj,
      style  : styleObj,
      outline: outlineObj,
      options: options
    };
  }

  notDefiend = (parma_style, mode, method) => {
    alert(`${parma_style} not defined in ${mode} => ${method}`);
  }

  style_default(type, method) {

    const dc = _dc.render.table.styles;
    // done
    const __date = (method) => {
      switch (method) {
        case this.mode.date.simple:
          return (s) => {
            return s.in ?? ''
          };

        case this.mode.date.range:
          return (s) => {
            return {
              from: s.from ?? '',
              to  : s.to ?? '',
            }
          };

        case this.mode.date.month:
          return (s) => {
            return s.in ?? ''
          };

        case this.mode.date.gap:
          return (s) => {
            return s.in ?? 'fw-normal fs-7'
          };

        case this.mode.date.date_w_gap:
          return (s) => {
            return {
              date: s.date ?? 'text-gray-700 fw-semibold',
              gap : s.gap ?? 'text-gray-500 fw-normal fs-7 text-end',
            }
          };

        case this.mode.date.range_w_text:
          return (s) => {
            return {
              date: s.date ?? 'text-gray-700 fw-normal',
              text: s.text ?? 'text-gray-500 fw-semibold fs-7',
            }
          };

        case this.mode.date.date_w_invoice:
          return (s) => {
            return {
              invoice: s.invoice ?? 'text-dark text-hover-primary fw-semibold',
              date   : s.date ?? 'text-gray-700 fw-normal',
              text   : s.text ?? 'fs-7 text-gray-400 fw-semibold'
            }
          };

        case this.mode.date.date_w_range:
          return (s) => {
            return {
              date: s.date ?? 'text-gray-700 text-hover-primary fw-semibold',
              from: s.from ?? 'text-muted',
              to  : s.to ?? 'text-muted'
            }
          };

        default:
          alert(`date method ${method} not defined for style_default in profiles/tables.js`);
      }
    }
    const __amount = (method) => {
      switch (method) {
        case this.mode.amount.default:
          return (s) => {
            return s.in ?? 'text-grey-700'
          }
        case this.mode.amount.amount_breakup:
          return (s) => {
            return {
              left : s.left ?? 'text-gray-700 fw-normal',
              right: s.right ?? 'text-gray-500 fw-normal',
            }
          };
        case this.mode.amount.amount_w_button:
          return (s) => {
            return {
              amount: s.amount ?? 'text-primary fw-semibold',
              button: s.button ?? 'py-0 px-2',
              icon  : s.icon ?? 'fs-6 text-primary',
            }
          };
        case this.mode.amount.dual_amount_w_percent:
          return (s) => {
            return {
              amount : s.amount ?? 'text-gray-700 fw-normal',
              value  : s.value ?? 'text-muted fw-semibold',
              percent: s.percent ?? 'text-info fw-normal',
            }
          };
        case this.mode.amount.triple_amount_column_row:
          return (s) => {
            return {
              main : s.main ?? '',
              other: s.other ?? 'text-muted fw-semibold fs-6'
            }
          };
        case this.mode.amount.amount_w_checkbox:
          return (s) => {
            return {
              amount: s.amount ?? 'text-gray-700 fw-normal',
              button: s.button ?? 'btn py-0',
              icon  : s.icon ?? 'fs-2 text-success',
            }
          }
        case this.mode.amount.amount_w_badge:
          return (s) => {
            return {
              amount: s.amount ?? 'text-gray-700 fw-normal',
              badge : s.badge ?? 'badge-light-primary fs-4 fw-normal'
            }
          }
        case this.mode.amount.amount_w_percent:
          return (s) => {
            return {
              amount : s.amount ?? 'fw-bold fs-4',
              text   : s.text ?? 'fs-7 text-muted fw-bold',
              percent: s.percent ?? 'text-danger fw-bold',
            }
          }
        case this.mode.amount.amount_w_button_a_percent:
          return (s) => {
            return {
              amount : s.amount ?? 'fw-bold fs-4',
              text   : s.text ?? 'text-muted',
              percent: s.percent ?? 'text-danger',
              button : s.button ?? 'btn btn-icon',
              icon   : s.icon ?? 'fs-2 text-success',
            }
          }
        case this.mode.amount.amount_w_unit:
          return (s) => {
            return {
              amount: s.amount ?? 'text-gray-700',
              unit  : s.unit ?? 'text-muted fw-semibold'
            }
          };

        default:
          alert(`${this.mode.amount} not defined in ${method} in profiles/tables.js`);
      }
    }
    const __account = (method) => {
      switch (method) {
        case this.mode.account.default:
          return (s) => {
            return s.in ?? 'text-gray-700'
          };
        case this.mode.account.image_text:
          return (s) => {
            return {
              size  : s.size ?? 40,
              symbol: s.symbol ?? CLS.symbol.square,
              image : s.image ?? '',
              text  : s.text ?? 'text-gray-700 fw-semibold',
            };
          }
        case this.mode.account.image_dual_text:
          return (s) => {
            return {
              size  : s.size ?? 40,
              symbol: s.symbol ?? CLS.symbol.circle,
              image : s.image ?? '',
              text  : s.text ?? 'text-gray-700 fw-semibold',
              desc  : s.desc ?? 'fs-7 text-gray-500'
            }
          }
        case this.mode.account.account_w_alias:
          return (s) => {
            return {
              text: s.text ?? 'text-gray-700 fw-semibold',
              desc: s.desc ?? 'fs-7 text-gray-500'
            }
          }
        case this.mode.account.account_alias_w_popover:
          return (s) => {
            return {
              text: s.text ?? 'text-gray-700 fw-semibold',
              desc: s.desc ?? 'fs-7 text-gray-500'
            }
          }
      }
    }
    const __text = (method) => {
      switch (method) {
        case this.mode.text.default:
          return (s) => {
            return s.in ?? ''
          }
        case this.mode.text.modify:
          return (s) => {
            return s.in ?? ''
          }
        case this.mode.text.row:
          return (s) => {
            return {
              main   : s.main ?? 'min-w-100px',
              subtext: s.subtext ?? 'text-muted fw-semibold fs-6'
            }
          }
        case this.mode.text.column:
          return (s) => {
            return {
              main   : s.main ?? '',
              subtext: s.subtext ?? 'text-muted fw-semibold fs-6 text-end'
            }
          }
        case this.mode.text.column_w_prefix:
          return (s) => {
            return {
              suffix: s.suffix ?? STYLE.color.gray4,
              left  : s.left ?? STYLE.color.gray7,
              right : s.right ?? STYLE.color.gray7,
            }
          }
        case this.mode.text.column_aligned:
          return (s) => {
            return {
              top   : s.top ?? 'fw-bold',
              bottom: s.bottom ?? 'text-gray-600 fs-6'
            }
          }
        case this.mode.text.row_col:
          return (s) => {
            return {
              title      : s.title ?? 'text-gray-900',
              description: s.description ?? 'fs-7 fw-semibold text-gray-500',
              center     : s.center ?? 'text-gray-700',
            }
          }
        case this.mode.text.row_col_icon:
          return (s) => {
            return {
              title      : s.title ?? 'text-gray-900',
              description: s.description ?? 'fs-7 text-gray-500',
              icon       : s.icon ?? 'text-info fs-2',
            }
          }
        case this.mode.text.stack_col:
          return (s) => {
            return {
              title      : s.title ?? 'text-gray-900',
              description: s.description ?? 'fs-7 fw-semibold text-gray-500',
              center     : s.center ?? 'text-gray-700',
            }
          }
      }
    }
    const __note = (method) => {
      switch (method) {
        case this.mode.note.default:
          return (s) => {
            return s.in ?? ''
          }
        case this.mode.note.word_limit:
          return (s) => {
            return s.in ?? ''
          }
        case this.mode.note.tooltip:
          return (s) => {
            return {
              tip : s.tip ?? 'fs-6',
              text: s.text ?? 'text-dark'
            }
          }
        case this.mode.note.popover:
          return (s) => {
            return {
              text: s.text ?? ''
            }
          }
        case this.mode.note.expandable:
          return (s) => {
            return s.in ?? ''
          }
      }
    }
    const __checkbox = (method) => {
      switch (method) {
        case this.mode.checkbox.default:
          return (s) => {
            return {
              check: s.check ?? 'form-check-primary',
              label: s.label ?? 'text-grey-700 fs-5'
            }
          }
        case this.mode.checkbox.eventble:
          return (s) => {
            return {
              in: false,
            }
          }
      }
    }
    const __dropdown = (method) => {
      switch (method) {
        case this.mode.dropdown.single:
          return (s) => {
            return {
              button: s.button ?? CLS.cluster.button.drop_just,
              menu  : s.menu ?? CLS.cluster.menu.small,
              item  : s.item ?? CLS.cluster.menu.link,
            }
          }
        case this.mode.dropdown.multiple:
          return (s) => {
            return {
              button: s.button ?? CLS.cluster.button.drop_full,
              menu  : s.menu ?? CLS.cluster.menu.medium,
              item  : s.item ?? CLS.cluster.menu.link,
              icon  : s.icon ?? STYLE.color.gray5,
            }
          }
      }
    }
    const __number = (method) => {
      switch (method) {
        case this.mode.number.default:
          return (s) => {
            return s.in ?? ''
          }
        case this.mode.number.percent:
          return (s) => {
            return s.in ?? ''
          }
        case this.mode.number.dual_number:
          return (s) => {
            return {
              right : s.right ?? 'text-gray-600',
              left  : s.left ?? 'text-gray-600',
              joiner: s.joiner ?? 'text-gray-600',
            }
          }
        case this.mode.number.w_unit:
          return (s) => {
            return {
              number: s.number ?? 'text-gray-700',
              unit  : s.unit ?? 'text-gray-500',
            }
          }
        case this.mode.number.w_percent:
          return (s) => {
            return {
              percent: s.percent ?? 'text-dark fw-normal',
            }
          }
        case this.mode.number.collection:
          return (s) => {
            return {
              reading: s.reading ?? 'text-gray-600 text-hover-primary fs-5 fw-bold',
              bottom : s.bottom ?? 'text-gray500 fs-6 fw-semibold',
              net    : s.net ?? 'text-primary',
            }
          }
      }
    }
    const __input = (method) => {
      switch (method) {
        case this.mode.input.default:
          return (s) => {
            return {
              width: s.width ? STYLE.w[s.width] : STYLE.w["100"],
              input: s.input ?? CLS.cluster.input.default_sm,
            }
          };
        case this.mode.input.plugin:
          return (s) => {
            return {
              width: s.width ? STYLE.w[s.width] : STYLE.w["100"],
              input: s.input ?? CLS.cluster.input.default_sm,
            }
          };
        case this.mode.input.event:
          return (s) => {
            return {
              width: s.width ? STYLE.w[s.width] : STYLE.w["100"],
              input: s.input ?? CLS.cluster.input.default_sm,
            };
          }
        case this.mode.input.checkbox:
          return (s) => {
            return {
              checkbox: s.checkbox ?? CLS.cluster.checkbox.color(),
              input   : s.input ?? '',
              label   : s.label ?? '',
            };
          }
        case this.mode.input.switch:
          return (s) => {
            return {
              switch: s.switch ?? CLS.cluster.switch.default,
              input : s.input ?? '',
              label : s.label ?? '',
            };
          }
      }
    }
    const __badge = (method) => {
      switch (method) {
        case this.mode.badge.default:
          return (s) => {
            return {
              text: s.text ?? '',
            }
          }
        case this.mode.badge.inside:
          return (s) => {
            return {
              text: s.text ?? '',
            }
          }
        case this.mode.badge.corner:
          return (s) => {
            return {
              text: s.text ?? '',
            }
          }
      }
    }
    const __image = (method) => {
      switch (method) {
        case this.mode.image.simple:
          return (s) => {
            return {
              size: s.size ?? '50',
            };
          }
        case this.mode.image.image:
          return (s) => {
            return {
              symbol: s.symbol ?? '',
              size  : s.size ?? '50',
            };
          }
        case this.mode.image.label:
          return (s) => {
            return {
              symbol: s.symbol ?? '',
              size  : s.size ?? '50',
              font  : s.font ?? '5',
              color : s.color ?? 'success'
            };
          }
        case this.mode.image.group:
          return (s) => {
            return {};
          }
      }
    }
    const __status = (method) => {
      switch (method) {
        case this.mode.status.simple:
          return (s) => {
            return {
              text: s.text ?? '',
            };
          }
        case this.mode.status.badge:
          return (s) => {
            return {
              text: s.text ?? '',
            };
          }
      }
    }
    const __icon = (method) => {
      const dc = _dc.render.table.styles.icon;
      switch (method) {
        case this.mode.icon.bootstrap:
          return (s) => {
            return {
              align: s.align ?? dc.in.align,
              color: s.color ?? dc.in.color,
              size : s.size ?? dc.in.size,
            }
          }
        case this.mode.icon.keen:
          return (s) => {
            return {
              align: s.align ?? dc.in.align,
              color: s.color ?? dc.in.color,
              size : s.size ?? dc.in.size,
            }
          }
        case this.mode.icon.font:
          return (s) => {
            return {
              align: s.align ?? dc.in.align,
              color: s.color ?? dc.in.color,
              size : s.size ?? dc.in.size,
            }
          }
        case this.mode.icon.line:
          return (s) => {
            return {
              align: s.align ?? dc.in.align,
              color: s.color ?? dc.in.color,
              size : s.size ?? dc.in.size,
            }
          }
      }
    }
    const __button = (method) => {
      switch (method) {
        case this.mode.button.action:
          return () => {
            return {
              icon  : 'fs-2',
              button: CLS.cluster.button.small,
            }
          }
        case this.mode.button.event:
        case this.mode.button.get_event:
        case this.mode.button.post_event:
          return () => {
            return CLS.cluster.button.small
          }
        case this.mode.button.two_inline:
        case this.mode.button.three_row_column:
        case this.mode.button.three_inline_w_icon:
          return () => {
            return ''
          }
      }
    }
    // main return
    switch (type) {
      case rdR.table.cell.date:
        return __date(method);

      case rdR.table.cell.amount:
        return __amount(method);

      case rdR.table.cell.account:
        return __account(method);

      case rdR.table.cell.button:
        return __button(method);

      case rdR.table.cell.icon:
        return __icon(method);

      case rdR.table.cell.text:
        return __text(method);

      case rdR.table.cell.dropdown:
        return __dropdown(method);

      case rdR.table.cell.checkbox:
        return __checkbox(method);

      case rdR.table.cell.badge:
        return __badge(method);

      case rdR.table.cell.number:
        return __number(method);

      case rdR.table.cell.note:
        return __note(method);

      case rdR.table.cell.image:
        return __image(method);

      case rdR.table.cell.status:
        return __status(method);

      case rdR.table.cell.input:
        return __input(method);
    }
  }

  style_manual(type, method) {
    const rich = (method) => {
      switch (method) {
        case this.style_manuals.rich.asdf:
          return {};
      }
    }

    const button = (method) => {
      switch (method) {
        //        case this.style_manuals.button.my_1:
        //          return {
        //            in : CLS.cluster.button.small,
        //            out: false,
        //          };
      }
    }

    const text = (method) => {
      switch (method) {
        case this.style_manuals.text.center:
          return {
            in : false,
            out: {
              align: 'c'
            },
          };
      }
    }

    const amount = (method) => {
      switch (method) {
        case this.style_manuals.amount.right:
          return {
            in : false,
            out: {
              align: 'r'
            },
          };
        case this.style_manuals.amount.center:
          return {
            in : false,
            out: {
              align: 'c'
            },
          }
      }
    }

    // main return
    switch (type) {
      case this.cell.rich:
        return rich(method);

      case this.cell.button:
        return button(method);

      case this.cell.text:
        return text(method);

      case this.cell.amount:
        return amount(method);

    }
  }

  param_default(type, method) {
    const _param = rdR.common.params;
    const pd_date = () => {
      switch (method) {
        case this.mode.date.simple:
          return (p) => {
            return {
              format: p.format ?? _param.date.fd_sms_fy_d
            }
          }
        case this.mode.date.range:
          return (p) => {
            return {
              from: p.from ?? _param.date.from,
              to  : p.to ?? _param.date.to
            }
          }
        case this.mode.date.month:
          return (p) => {
            return {
              format: p.format ?? _param.date.fms_fy
            }
          }
        case this.mode.date.gap:
          return (p) => {
            return {
              method: p.method ?? _param.gap.days
            }
          }
        case this.mode.date.date_w_gap:
          return (p) => {
            return {
              format: p.format ?? _param.date.fd_sms_fy_c,
              method: p.method ?? _param.gap.detail
            }
          }
        case this.mode.date.range_w_text:
          return (p) => {
            return {
              from: p.from ?? _param.date.from,
              to  : p.to ?? _param.date.to,
              text: p.text ?? 'Date Range',
            }
          }
        case this.mode.date.date_w_invoice:
          return (p) => {
            return {
              text  : p.text ?? 'Created On',
              format: p.format ?? _param.date.fd_sms
            }
          }

        case this.mode.date.date_w_range:
          return (p) => {
            return {
              from  : p.from ?? _param.date.from,
              to    : p.to ?? _param.date.to,
              format: p.format ?? _param.date.fd_sms_fy_d,
            }
          }

        default:
          this.notDefiend('param_default', 'date', method);
      }
    }
    const pd_amount = () => {
      const dc = _dc.render.table.params.amount;
      switch (method) {
        case this.mode.amount.default:
          return (p) => {
            return {
              round: p.round ?? dc.round,
              sign : p.sign ?? dc.sign,
              end  : p.end ?? dc.end,
            }
          };

        case this.mode.amount.amount_breakup:
          return (p) => {
            return {
              round: p.round ?? dc.round,
              sign : p.sign ?? dc.sign,
              end  : p.end ?? dc.end,
            }
          };

        case this.mode.amount.amount_w_button:
          return (p) => {
            return {
              round: p.round ?? dc.round,
              sign : p.sign ?? dc.sign,
              name : p.eName ?? 'modal',
              value: p.eValue ?? 'summary',
              text : p.text ?? 'View Summary',
            }
          }

        case this.mode.amount.dual_amount_w_percent:
          return (p) => {
            return {
              text : p.text ?? 'Received',
              round: p.round ?? dc.round,
              sign : p.sign ?? dc.sign,
              end  : p.end ?? dc.end,
            }
          };

        case this.mode.amount.triple_amount_column_row:
          return (p) => {
            return {
              round  : p.round ?? dc.round,
              sign   : p.sign ?? dc.sign,
              end    : p.end ?? dc.end,
              round_2: p.round_2 ?? dc.round,
              sign_2 : p.sign_2 ?? dc.sign,
            }
          };

        case this.mode.amount.amount_w_checkbox:
          return (p) => {
            return {
              round: p.round ?? dc.round,
              sign : p.sign ?? dc.sign,
              name : p.name ?? 'action',
              value: p.value ?? 'amount',
            }
          }

        case this.mode.amount.amount_w_badge:
          return (p) => {
            return {
              round: p.round ?? dc.round,
              sign : p.sign ?? dc.sign,
              end  : p.end ?? dc.end,
            }
          }

        case this.mode.amount.amount_w_percent:
          return (p) => {
            return {
              round: p.round ?? dc.round,
              sign : p.sign ?? dc.sign,
              end  : p.end ?? dc.end,
              text : p.text ?? 'Used ',
            }
          }

        case this.mode.amount.amount_w_button_a_percent:
          return (p) => {
            return {
              round: p.round ?? dc.round,
              sign : p.sign ?? dc.sign,
              text : p.text ?? 'Tax Rate: ',
              name : p.name ?? 'action',
              value: p.value ?? 'amount',
            }
          }

        case this.mode.amount.amount_w_unit:
          return (p) => {
            return {
              round: p.round ?? dc.round,
              sign : p.sign ?? dc.sign,
              unit : p.unit ?? '/',
            }
          }

        default:
          // this.notDefiend('param_default', 'amount', method);
          return dc;
      }
    }
    const pd_account = () => {
      switch (method) {
        case this.mode.account.default:
          return (p) => {
            return {}
          }
        case this.mode.account.image_text:
          return (p) => {
            return {
              path: p.path ?? _param.img.avatar,
            }
          }
        case this.mode.account.image_dual_text:
          return (p) => {
            return {
              path: p.path ?? _param.img.avatar,
            }
          }
        case this.mode.account.account_w_alias:
          return (p) => {
            return {}
          }
        case this.mode.account.account_alias_w_popover:
          return (p) => {
            return {
              placement: p.placement ?? 'top',
              title    : p.title ?? 'list of all Account',
            }
          }
      }
    }
    const pd_text = () => {
      switch (method) {
        case this.mode.text.default:
          return (p) => {
            return {
              info: p.info ?? 'info',
            }
          }
        case this.mode.text.modify:
          return (p) => {
            return {
              info: p.info ?? 'info',
            }
          }
        case this.mode.text.row:
          return (p) => {
            return {}
          }
        case this.mode.text.column:
          return (p) => {
            return {}
          }
        case this.mode.text.column_w_prefix:
          return (p) => {
            return {
              left : p.left ?? '(DR)',
              right: p.right ?? '(CR)'
            }
          }
        case this.mode.text.column_aligned:
          return (p) => {
            return {}
          }
        case this.mode.text.row_col:
          return (p) => {
            return {}
          }
        case this.mode.text.row_col_icon:
          return (p) => {
            return {}
          }
        case this.mode.text.stack_col:
          return (p) => {
            return {}
          }
      }
    }
    const pd_note = () => {
      switch (method) {
        case this.mode.note.default:
          return (p) => {
            return {}
          }
        case this.mode.note.word_limit:
          return (p) => {
            return {
              limit: p.limit ?? 30,
            }
          }
        case this.mode.note.tooltip:
          return (p) => {
            return {
              span: p.span ?? 'View Note'
            }
          }
        case this.mode.note.popover:
          return (p) => {
            return {
              placement: p.placement ?? 'top',
              text     : p.text ?? 'Click to view note'
            }
          }
        case this.mode.note.expandable:
          return (p) => {
            return {}
          }
      }
    }
    const pd_checkbox = () => {
      switch (method) {
        case this.mode.checkbox.default:
          return (p) => {
            return {
              name : p.name ?? 'name',
              label: p.label ?? 'label'
            }
          }
        case this.mode.checkbox.eventble:
          return (p) => {
            return {
              name: p.name ?? 'name'
            }
          }
      }
    }
    const pd_dropdown = () => {
      switch (method) {
        case this.mode.dropdown.single:
          return (p) => {
            return {
              name   : p.name ?? 'Option',
              trigger: p.trigger ?? 'click',
              button : {
                name : p.button.name ?? 'card',
                value: p.button.value ?? 'view',
                text : p.button.text ?? 'View'
              }
            }
          }
        case this.mode.dropdown.multiple:
          return (p) => {
            return {
              name   : p.name ?? 'Options',
              trigger: p.trigger ?? 'click',
              size   : p.size ?? 0,
              icon   : p.icon ?? keys.icons.line,
              buttons: p.buttons === false
                ? _dc.render.table.params.dropdown.multiple
                : p.buttons
            }
          }
      }
    }
    const pd_number = () => {
      const dc = _dc.render.common.number;
      switch (method) {
        case this.mode.number.default:
          return (p) => {
            return {
              type : p.type ?? dc.type,
              round: p.round ?? dc.round,
            }
          }
        case this.mode.number.percent:
          return (p) => {
            return {
              round: p.round ?? dc.round,
            }
          }
        case this.mode.number.dual_number:
          return (p) => {
            return {
              type  : p.type ?? dc.type,
              round : p.round ?? dc.round,
              joiner: p.joiner ?? ' + ',
            }
          }
        case this.mode.number.w_unit:
          return (p) => {
            return {
              type : p.type ?? dc.type,
              round: p.round ?? dc.round,
            }
          }
        case this.mode.number.w_percent:
          return (p) => {
            return {
              type : p.type ?? dc.type,
              round: p.round ?? dc.round,
              unit : p.unit ?? ' Ltr',
            }
          }
        case this.mode.number.collection:
          return (p) => {
            return {
              type : p.type ?? dc.type,
              round: p.round ?? dc.round,
              net  : p.net ?? 'Net',
            }
          }
      }
    }
    const pd_input = () => {
      switch (method) {
        case this.mode.input.default:
          return (p) => {
            return {
              name       : p.name ?? 'name',
              placeholder: p.placeholder ?? '',
              title      : p.title ?? ''
            }
          }
        case this.mode.input.plugin:
          return (p) => {
            return {
              name       : p.name ?? 'name',
              plugin     : p.plugin ?? 'none',
              method     : p.method ?? 'none',
              placeholder: p.placeholder ?? 'Input',
              title      : p.title ?? 'Add Text here',
              required   : p.required ?? false,
            }
          }

        case this.mode.input.event:
          return (p) => {
            return {
              name       : p.name ?? 'input_name',
              plugin     : p.plugin ?? undefined,
              method     : p.method ?? undefined,
              placeholder: p.placeholder ?? 'Input',
              title      : p.title ?? 'Add Text here',
              listen     : p.listen ?? 'input',
              type       : p.type ?? 'alter',
              value      : p.value ?? '',
              find       : p.find ?? undefined,
              input      : p.input ?? undefined,
            }
          }

        case this.mode.input.checkbox:
          return (p) => {
            return {
              listen: p.listen ?? 'input',
              type  : p.type ?? 'alter',
              value : p.value ?? '',
              name  : p.name ?? 'name',
              text  : p.text ?? ''
            }
          }

        case this.mode.input.switch:
          return (p) => {
            return {
              listen: p.listen ?? 'input',
              type  : p.type ?? 'alter',
              value : p.value ?? '',
              name  : p.name ?? 'name',
              text  : p.text ?? ''
            }
          }
      }
    }
    const pd_badge = () => {
      switch (method) {
        case this.mode.badge.default:
          return (p) => {
            return {
              badge: p.badge ?? rdR.common.params.badge.outline,
              tag  : p.tag ?? 'default',
            }
          }
        case this.mode.badge.inside:
          return (p) => {
            return {
              badge: p.badge ?? rdR.common.params.badge.circle_light,
              tag  : p.tag ?? 'default',
            }
          }
        case this.mode.badge.corner:
          return (p) => {
            return {
              badge: p.badge ?? rdR.common.params.badge.solid,
              tag  : p.tag ?? 'default',
            }
          }
      }
    }
    const pd_image = () => {
      switch (method) {
        case this.mode.image.simple:
          return (p) => {
            return {
              path: p.path ?? _dc.render.common.image.path,
            };
          }
        case this.mode.image.image:
          return (p) => {
            return {
              path: p.path ?? _dc.render.common.image.path,
            };
          }
        case this.mode.image.label:
          return (p) => {
            return {};
          }
        case this.mode.image.group:
          return (p) => {
            return {
              length: p.length ?? 3,
              type  : p.type ?? 'image',
              path  : p.path ?? _dc.render.common.image.path,
            };
          }
      }
    }
    const pd_status = () => {
      switch (method) {
        case this.mode.status.simple:
          return (p) => {
            return {
              tag  : p.tag ?? 'default',
              color: p.color ?? '1',
            }
          }
        case this.mode.status.badge:
          return (p) => {
            return {
              badge: p.badge ?? CLS.badge.outline,
              color: p.color ?? '0',
              tag  : p.tag ?? 'default',
            }
          }
      }
    }
    const pd_icon = () => {
      switch (method) {
        case this.mode.icon.bootstrap:
          return (p) => {
            return {
              type: rdR.table.mode.icon.bootstrap,
            }
          }
        case this.mode.icon.keen:
          return (p) => {
            return {
              type: rdR.table.mode.icon.keen,
            }
          }
        case this.mode.icon.font:
          return (p) => {
            return {
              type: rdR.table.mode.icon.font,
            }
          }
        case this.mode.icon.line:
          return (p) => {
            return {
              type: rdR.table.mode.icon.line,
            }
          }
      }
    }
    const pd_button = () => {
      switch (method) {
        case this.mode.button.action:
          return (p) => {
            return {
              nature: p.nature ?? 'get',
              type  : p.type ?? '',
              value : p.value ?? '',
              text  : p.text ?? 'button',
              recall: p.recall ?? undefined,
              icon  : p.icon ?? undefined,
              pluck : p.pluck ?? undefined
            }
          }
        case this.mode.button.event:
          return (p) => {
            return {
              nature: p.nature ?? 'get',
              type  : p.type ?? '',
              value : p.value ?? '',
              text  : p.text ?? 'event'
            }
          }
        case this.mode.button.post_event:
          return (p) => {
            return {
              type : p.type ?? '',
              value: p.value ?? '',
              text : p.text ?? 'post event'
            }
          }
        case this.mode.button.get_event:
          return (p) => {
            return {
              type : p.type ?? '',
              value: p.value ?? '',
              text : p.text ?? 'get event'
            }
          }
        case this.mode.button.two_inline:
          return (p) => {
            return {}
          }
        case this.mode.button.three_row_column:
          return (p) => {
            return {
              type : {
                left : p.type.left ?? 'card',
                right: p.type.right ?? 'card',
                down : p.type.down ?? 'card'
              },
              value: {
                left : p.value.left ?? 'view',
                right: p.value.right ?? 'edit',
                down : p.value.down ?? 'delete'
              },
              icon : {
                left : p.icon.left ?? 'view',
                right: p.icon.right ?? 'edit',
                down : p.icon.down ?? 'delete'
              },
              text : {
                left : p.text.left ?? 'view',
                right: p.text.right ?? 'edit',
                down : p.text.down ?? 'delete'
              }
            }
          }
        case this.mode.button.three_inline_w_icon:
          return (p) => {
            return {
              type : {
                left  : p.type.left ?? 'card',
                center: p.type.center ?? 'card',
                right : p.type.right ?? 'card',
              },
              value: {
                left  : p.value.left ?? 'view',
                center: p.value.center ?? 'edit',
                right : p.value.right ?? 'delete',
              },
              icon : {
                left  : p.icon.left ?? 'view',
                center: p.icon.center ?? 'edit',
                right : p.icon.right ?? 'delete',
              },
              text : {
                left  : p.text.left ?? 'view',
                center: p.text.center ?? 'edit',
                right : p.text.right ?? 'delete',
              }
            }
          }
      }
    }

    switch (type) {
      case this.cell.date:
        return pd_date();
      case this.cell.amount:
        return pd_amount();
      case this.cell.account:
        return pd_account();
      case this.cell.text:
        return pd_text();
      case this.cell.note:
        return pd_note();
      case this.cell.checkbox:
        return pd_checkbox();
      case this.cell.dropdown:
        return pd_dropdown();
      case this.cell.input:
        return pd_input();
      case this.cell.image:
        return pd_image();
      case this.cell.icon:
        return pd_icon();
      case this.cell.status:
        return pd_status();
      case this.cell.button:
        return pd_button();
      case this.cell.badge:
        return pd_badge();
      case this.cell.number:
        return pd_number();
    }
  }

  param_manual(type, method) {

    const button = (method) => {
      switch (method) {
        //        case this.param_manuals.button.view_transaction:
        //          return {
        //            type : eTypes.card,
        //            place: pb.opr.transactions.banking.t.transactions,
        //          }
        case this.param_manuals.button.view_account:
          return {
            type : eTypes.card,
            value: pb.mng.accounts.contacts.p.view,
            place: pb.mng.accounts.contacts.p.list,
            text : 'View'
          }
        case this.param_manuals.button.edit_account:
          return {
            type : eTypes.card,
            value: pb.mng.accounts.contacts.p.edit,
            place: pb.mng.accounts.contacts.p.list,
            text : 'Edit'
          }
        case this.param_manuals.button.delete_entry:
          return {
            type : eTypes.card,
            place: pb.opr.employees.activities.n,
            text : 'Delete'
          }
        case this.param_manuals.button.view_slip:
          return {
            type : eTypes.load,
            value: pb.mng.billing.display.p.present,
            place: pb.mng.billing.display.p.result,
            text : 'View Slip'
          };
        case this.param_manuals.button.get_email:
          return {
            type : eTypes.action,
            value: '',
            place: '',
            text : 'Get Email'
          };
        case this.param_manuals.button.view_invoice:
          return {
            type : eTypes.action,
            value: '',
            place: '',
            text : 'View Invoice'
          };
        case this.param_manuals.button.view_bill:
          return {
            type : eTypes.view,
            value: pb.mng.billing.display.p.bill,
            place: '',
            text : 'View Bill'
          }
        case this.param_manuals.button.view_email:
          return {
            type : eTypes.goto,
            value: "view",
            place: "",
            text : "view",
          }
        case this.param_manuals.button.view_table:
          console.log("returning params view table");
          return {
            type : eTypes.table,
            value: "",
            place: "",
            text : "View Table",
          }
        case  this.param_manuals.button.view_card:
          return {
            type : eTypes.card,
            value: "",
            place: "",
            text : "View Card",
          }
        case this.param_manuals.button.view_wizard:
          return {
            type : eTypes.wizard,
            value: "",
            place: "",
            text : "View Wizard",
          }
      }
    }

    const amount = (method) => {
      switch (method) {
        case this.param_manuals.amount.dec0:
          return {
            round: 0,
            curr : 0,
            post : '',
          }
        case this.param_manuals.amount.dec1:
          return {
            round: 1,
            curr : 0,
            post : '',
          }
        case this.param_manuals.amount.dec2:
          return {
            round: 2,
            curr : 0,
            post : '',
          }
        case this.param_manuals.amount.currDec0:
          return {
            round: 0,
            curr : 1,
            post : '',
          }
        case this.param_manuals.amount.currDec2:
          return {
            round: 2,
            curr : 1,
            post : '',
          }
      }
    }

    const dropdown = (method) => {
      switch (method) {
        case this.param_manuals.drop.text_btn:
          return {
            size  : 3,
            types : ['card', 'card', 'action'],
            values: ['account', 'report', 'summary'],
            names : ['Account Details', 'Full Report', 'Ledger Summary'],
          }
        case this.param_manuals.drop.text_btn2:
          return {
            size  : 3,
            types : ['card', 'card', 'card'],
            values: ['view', 'create', 'delete'],
            names : ['View Salary Slip', 'Create Payroll', 'Delete, if Created'],
          }
      }
    }

    const badge = (method) => {
      return {
        target: this.param_manuals.badge.rc_string
      }
    }

    const date = (method) => {

      const range_full = () => {
        return {
          from: rdR.common.params.date.fd_sms_sy_c,
          to  : rdR.common.params.date.fd_sms_sy_c
        }
      }


      switch (method) {
        case this.param_manuals.date.range_full:
          return range_full();
        case this.param_manuals.date.date_w_invoice:
          return date_w_invoice();
      }
    }

    switch (type) {
      case this.cell.rich:
        return '';
      case this.cell.button:
        return button(method);
      case this.cell.amount:
        return amount(method);
      case this.cell.dropdown:
        return dropdown(method);
      case this.cell.badge:
        return badge(method);
      case this.cell.date:
        return date(method);
    }
  }

  outline_default(type, method) {

    const dc_out = _dc.render.table.styles.default.out;
    // done
    const __date = (method) => {
      switch (method) {
        case this.mode.date.simple:
          return (t) => {
            return {}
          };

        case this.mode.date.range:
          return (t) => {
            return {}
          };

        case this.mode.date.month:
          return (t) => {
            return {}
          };

        case this.mode.date.gap:
          return (t) => {
            return {}
          };

        case this.mode.date.date_w_gap:
          return (t) => {
            return {}
          };

        case this.mode.date.range_w_text:
          return (t) => {
            return {}
          };

        case this.mode.date.date_w_invoice:
          return (t) => {
            return {}
          };

        case this.mode.date.date_w_range:
          return (t) => {
            return {}
          };

        default:
          alert(`date method ${method} not defined for outline_default in profiles/tables.js`);
      }
    }
    const __amount = (method) => {
      switch (method) {
        case this.mode.amount.default:
          return (t) => {
            return {
              cls  : t.cls ?? dc_out.cls,
              wrap : t.wrap ?? dc_out.wrap,
              align: t.align ?? dc_out.align,
            }
          }
        case this.mode.amount.amount_breakup:
          return (t) => {
            return {}
          };
        case this.mode.amount.amount_w_button:
          return (t) => {
            return {}
          };
        case this.mode.amount.dual_amount_w_percent:
          return (t) => {
            return {}
          };
        case this.mode.amount.triple_amount_column_row:
          return (t) => {
            return {}
          };
        case this.mode.amount.amount_w_checkbox:
          return (t) => {
            return {}
          }
        case this.mode.amount.amount_w_badge:
          return (t) => {
            return {}
          }
        case this.mode.amount.amount_w_percent:
          return (t) => {
            return {}
          }
        case this.mode.amount.amount_w_button_a_percent:
          return (t) => {
            return {}
          }
        case this.mode.amount.amount_w_unit:
          return (t) => {
            return {}
          };

        default:
          alert(`${this.mode.amount} not defined in ${method} in profiles/tables.js`);
      }
    }
    const __account = (method) => {
      switch (method) {
        case this.mode.account.default:
          return (t) => {
            return {}
          };
        case this.mode.account.image_text:
          return (t) => {
            return {};
          }
        case this.mode.account.image_dual_text:
          return (t) => {
            return {}
          }
        case this.mode.account.account_w_alias:
          return (t) => {
            return {}
          }
        case this.mode.account.account_alias_w_popover:
          return (t) => {
            return {}
          }
      }
    }
    const __text = (method) => {
      switch (method) {
        case this.mode.text.default:
          return (t) => {
            return {
              cls: t.cls ?? dc_out.cls,
            }
          }
        case this.mode.text.modify:
          return (t) => {
            return {}
          }
        case this.mode.text.row:
          return (t) => {
            return {}
          }
        case this.mode.text.column:
          return (t) => {
            return {}
          }
        case this.mode.text.column_w_prefix:
          return (t) => {
            return {}
          }
        case this.mode.text.column_aligned:
          return (t) => {
            return {}
          }
        case this.mode.text.row_col:
          return (t) => {
            return {}
          }
        case this.mode.text.row_col_icon:
          return (t) => {
            return {}
          }
        case this.mode.text.stack_col:
          return (t) => {
            return {}
          }
      }
    }
    const __note = (method) => {
      switch (method) {
        case this.mode.note.default:
          return (t) => {
            return {}
          }
        case this.mode.note.word_limit:
          return (t) => {
            return {}
          }
        case this.mode.note.tooltip:
          return (t) => {
            return {}
          }
        case this.mode.note.popover:
          return (t) => {
            return {}
          }
        case this.mode.note.expandable:
          return (t) => {
            return {}
          }
      }
    }
    const __checkbox = (method) => {
      switch (method) {
        case this.mode.checkbox.default:
          return (t) => {
            return {}
          }
        case this.mode.checkbox.eventble:
          return (t) => {
            return {}
          }
      }
    }
    const __dropdown = (method) => {
      switch (method) {
        case this.mode.dropdown.single:
          return (t) => {
            return {}
          }
        case this.mode.dropdown.multiple:
          return (t) => {
            return {}
          }
      }
    }
    const __number = (method) => {
      switch (method) {
        case this.mode.number.default:
          return (t) => {
            return {}
          }
        case this.mode.number.percent:
          return (t) => {
            return {}
          }
        case this.mode.number.dual_number:
          return (t) => {
            return {}
          }
        case this.mode.number.w_unit:
          return (t) => {
            return {}
          }
        case this.mode.number.w_percent:
          return (t) => {
            return {}
          }
        case this.mode.number.collection:
          return (t) => {
            return {}
          }
      }
    }
    const __input = (method) => {
      switch (method) {
        case this.mode.input.default:
          return (t) => {
            return {}
          };
        case this.mode.input.plugin:
          return (t) => {
            return {}
          };
        case this.mode.input.event:
          return (t) => {
            return {};
          }
        case this.mode.input.checkbox:
          return (t) => {
            return {};
          }
        case this.mode.input.switch:
          return (t) => {
            return {};
          }
      }
    }
    const __badge = (method) => {
      switch (method) {
        case this.mode.badge.default:
          return (t) => {
            return {}
          }
        case this.mode.badge.inside:
          return (t) => {
            return {}
          }
        case this.mode.badge.corner:
          return (t) => {
            return {}
          }
      }
    }
    const __image = (method) => {
      switch (method) {
        case this.mode.image.simple:
          return (t) => {
            return {};
          }
        case this.mode.image.image:
          return (t) => {
            return {};
          }
        case this.mode.image.label:
          return (t) => {
            return {};
          }
        case this.mode.image.group:
          return (t) => {
            return {};
          }
      }
    }
    const __status = (method) => {
      switch (method) {
        case this.mode.status.simple:
          return (t) => {
            return {};
          }
        case this.mode.status.badge:
          return (t) => {
            return {};
          }
      }
    }
    const __icon = (method) => {
      const dc = _dc.render.table.styles.icon;
      switch (method) {
        case this.mode.icon.bootstrap:
          return (t) => {
            return {}
          }
        case this.mode.icon.keen:
          return (t) => {
            return {}
          }
        case this.mode.icon.font:
          return (t) => {
            return {}
          }
        case this.mode.icon.line:
          return (t) => {
            return {}
          }
      }
    }
    const __button = (method) => {
      switch (method) {
        case this.mode.button.action:
          return (t) => {
            return {}
          }
        case this.mode.button.event:
        case this.mode.button.get_event:
        case this.mode.button.post_event:
          return (t) => {
            return {}
          }
        case this.mode.button.two_inline:
        case this.mode.button.three_row_column:
          return (t) => {
            return {}
          }
        case this.mode.button.three_inline_w_icon:
          return (t) => {
            return {
              cls  : t.cls ?? dc_out.cls,
              warp : t.warp ?? dc_out.warp,
              align: t.align ?? dc_out.align,
            }
          }
      }
    }
    // main return
    switch (type) {
      case rdR.table.cell.date:
        return __date(method);

      case rdR.table.cell.amount:
        return __amount(method);

      case rdR.table.cell.account:
        return __account(method);

      case rdR.table.cell.button:
        return __button(method);

      case rdR.table.cell.icon:
        return __icon(method);

      case rdR.table.cell.text:
        return __text(method);

      case rdR.table.cell.dropdown:
        return __dropdown(method);

      case rdR.table.cell.checkbox:
        return __checkbox(method);

      case rdR.table.cell.badge:
        return __badge(method);

      case rdR.table.cell.number:
        return __number(method);

      case rdR.table.cell.note:
        return __note(method);

      case rdR.table.cell.image:
        return __image(method);

      case rdR.table.cell.status:
        return __status(method);

      case rdR.table.cell.input:
        return __input(method);
    }
  }
}

export default Tables;