import {exT, rdR, CLS, STYLE, plg, deF, kws, Lyt, otR, sD, glob} from "../base/const.js"
import {atr} from "../base/attributes.js"
import {$R_common_obj} from "../base/render.js";
import {_dc} from "../base/defaults.js";
import HTML from "../bucket/html.js";

class OptionTables {

  // list of all cells.
  #shape;

  #_c_date(method, value, params, style) {

    const __value_deconstruct = () => {
      let refDate, date;
      if (Array.isArray(value)) {
        date = value[0];
        refDate = value[1];
      }
      else {
        refDate = '0';
        date = value;
      }
      // final return
      return {
        refdate: refDate,
        date   : date
      };
    }

    const _simple = () => {
      return `<span class="rc_date ${style}" ${atr.custom.format}="${params.format}">${value}</span>`;
    }
    const _range = () => {
      return `<span class="rc_date ${style.from}" 
                    ${atr.custom.format}="${params.from}">${value[0]}</span> - <span 
                    class="rc_date ${style.to}" 
                    ${atr.custom.format}="${params.to}">${value[1]}</span>`;
    }
    const _month = () => {
      return `<span class="rc_date ${style}" 
                    ${atr.custom.format}="${params.format}">${value}</span>`;
    }
    const _gap = () => {
      const refDate = value[0] === value[1] ? 0 : value[1];
      return `<span class="rc_gap ${style}" 
                ${atr.custom.method}="${params.method}" 
                ${atr.custom.refdate}="${refDate}">${value[0]}</span>`
    }
    const _date_w_gap = () => {
      const refDate = value[0] === value[1] ? 0 : value[1];
      return `<div class="d-flex flex-column">
                <span class="rc_date ${style.date}" 
                        ${atr.custom.format}="${params.format}">${value[0]}</span>
                 <span class="rc_gap ${style.gap}" 
                        ${atr.custom.method}="${params.method}" 
                        ${atr.custom.refdate}="${refDate}">${value[0]}</span>
              </div>`
    }
    const _range_w_text = () => {
      return `<div>
        <span class="rc_date ${style.date}" 
              ${atr.custom.format}="${params.from}">${value[0]}</span> - <span 
              class="rc_date ${style.date}" 
              ${atr.custom.format}="${params.to}">${value[1]}</span>
        <div class="${style.text}">${params.text}</div>
      </div>`;
    }
    const _date_w_invoice = () => {
      return `<div class="position-relative ps-6 pe-3 py-2">
          <div class="position-absolute start-0 top-0 w-4px h-100 rounded-2 bg-primary"></div>
          <a type="button" data-e-nature="ignore" class="mb-1 ${style.invoice}">${value[0]}</a>
          <div class="${style.text}">${params.text}<spaan class="rc_date ms-1 ${style.date}" ${atr.custom.format}="${params.format}">${value[1]}</spaan></div>
        </div>`
    }
    const _date_w_range = () => {
      return `<div>
                <div>
                  <span class="rc_date ${style.date}" ${atr.custom.format}="${params.format}">${value[0]}</span>
                </div>
                <div>
                  <span class="rc_date ${style.from}" 
                        ${atr.custom.format}="${params.from}">${value[1]}</span> - <span 
                        class="rc_date ${style.to}" 
                        ${atr.custom.format}="${params.to}">${value[2]}</span>
                </div>
              </div>
             `;
    }

    // picking method as per requirements
    switch (method) {
      case rdR.table.mode.date.simple:
        return _simple();

      case rdR.table.mode.date.range:
        return _range();

      case rdR.table.mode.date.month:
        return _month();

      case rdR.table.mode.date.gap:
        return _gap();

      case rdR.table.mode.date.date_w_gap:
        return _date_w_gap();

      case rdR.table.mode.date.range_w_text:
        return _range_w_text();

      case rdR.table.mode.date.date_w_invoice:
        return _date_w_invoice();

      case rdR.table.mode.date.date_w_range:
        return _date_w_range();

      default:
        alert('invalid date format in table profile, so we have applied default date format');
        return _simple();
    }
  }

  #_c_amount(method, value, params, style) {
    const _default = () => {
      return `<span class="rc_currency ${style}"
                  ${atr.custom.round}="${params.round}" 
                  ${atr.custom.sign}="${params.sign}" 
                  ${atr.custom.end}="${params.end}">${value}</span>`;
    }
    const _amount_breakup = () => {
      return `<span class="rc_currency" ${style.left}"
                  ${atr.custom.round}="${params.round}" 
                  ${atr.custom.sign}="${params.sign}" 
                  ${atr.custom.end}="${params.end}">${value[0]}</span>&nbsp;+&nbsp;
              <span class="rc_currency ${style.right}"
                  ${atr.custom.round}="${params.round}" 
                  ${atr.custom.sign}="${params.sign}" 
                  ${atr.custom.end}="${params.end}">${value[1]}</span>`
    }
    const _amount_w_button = () => {
      return `<div class="d-flex flex-row">
                <span class="rc_currency ${style.amount}"
                      ${atr.custom.round}="${params.round}" 
                      ${atr.custom.sign}="${params.sign}" 
                >${value[0]}</span>
                <span>
                <a type="button"
                        data-e-value="${value[1]}"
                        data-e-name="${params.name}"
                        data-e-value="${params.value}"
                        class="ms-2 ${style.button} py-0">
                    <i class="${style.icon} bi bi-table" 
                        data-bs-toggle="tooltip" title="${params.text}"></i>
                </a>
                </span>
              </div>`;
    }
    const _dual_amount_w_percent = () => {
      return `<div class="d-flex flex-column gap-1 text-nowrap">
                <div class="rc_currency ${style.amount}" 
                  ${atr.custom.round}="${params.round}" 
                  ${atr.custom.sign}="${params.sign}" 
                  ${atr.custom.end}="${params.end}">${value[0]}</div>
                <div class="text-nowrap ${style.value}">
                <span class="rc_currency"
                  ${atr.custom.round}="${params.round}" 
                  ${atr.custom.sign}="${params.sign}" 
                  ${atr.custom.end}="${params.end}">${value[1]}</span>
                <span class="${style.percent}">
                  ${params.text}
                  (<span class="rc_percent" ${atr.custom.mark}="${value[0]}">
                    ${value[1]}
                  </span>)
                </span>
              </div>`;
    }
    const _triple_amount_column_row = () => {
      return `<div class="d-flex flex-column gap-1 fw-semibold text-nowrap">
                <div class="rc_currency ${style.main}" 
                  ${atr.custom.round}="${params.round}" 
                  ${atr.custom.sign}="${params.sign}" 
                  ${atr.custom.end}="${params.end}">${value[0]}</div>
                <div class="text-nowrap ${style.other}">
                  <span class="rc_currency"
                    ${atr.custom.round}="${params.round_2}" 
                    ${atr.custom.sign}="${params.sign_2}">${value[1]}</span>
                  <span class="rc_currency"
                    ${atr.custom.round}="${params.round_2}" 
                    ${atr.custom.sign}="${params.sign_2}" >${value[2]}</span>
              </div>`;
    }
    const _amount_w_checkbox = () => {
      return `<div class="d-flex">
                <span class="rc_currency ${style.amount}"   
                      ${atr.custom.round}="${params.round}" 
                      ${atr.custom.sign}="${params.sign}">${value[0]}</span>
                <button type="button"
                        value="${params.value}" name="${params.name}" 
                        data-e-value="${value[1]}" class="${style.button}">
                  <i class="me-1 bi bi-check-circle ${style.icon}"></i>
                </button>
              </div>`;
    }
    const _amount_w_badge = () => {
      return `<div class="rc_currency ${style.amount}" 
                  ${atr.custom.round}="${params.round}" 
                  ${atr.custom.sign}="${params.sign}" 
                  ${atr.custom.end}="${params.end}">${value[0]}</div>
                <div class="badge ${style.badge}">${value[1]}</div>`
    }
    const _amount_w_percent = () => {
      return `<div class="d-flex gap-2 text-nowrap rc_currency ${style.amount}"
                ${atr.custom.round}="${params.round}" 
                ${atr.custom.sign}="${params.sign}" 
                ${atr.custom.end}="${params.end}">${value[0]}
              </div>
              <div class="text-nowrap ${style.text}">
                ${params.text}
                (<span class="rc_percent ${style.percent}" 
                  ${atr.custom.mark}="${value[1]}">
                  ${value[0]}
                </span>)
              </span>
            </div>`;
    }
    const _amount_w_button_a_percent = () => {
      return `<div class="d-flex ">
                <div class="d-flex flex-column">
                <div class="rc_currency ${style.amount}" 
                      ${atr.custom.round}="${params.round}" 
                      ${atr.custom.sign}="${params.sign}">${value[0]}</div>
                <div>
                <span class="${style.text}">${params.text}</span>
                <span class="${style.percent}">${value[1]}%</span></div>
              </div>
                <button type="button" value="${params.value}" name="${params.name}" 
                        data-e-value="${value[2]}" class="${style.button}">
                  <i class="me-1 bi bi-check-circle ${style.icon}"></i>
                </button>
              </div>`;
    }
    const _amount_w_unit = () => {
      return `<div>
                <span class="rc_currency ${style.amount}" 
                      ${atr.custom.round}="${params.round}" 
                      ${atr.custom.sign}="${params.sign}">${value[0]}</span>
                <span class="${style.unit}">${params.unit} ${value[1]}</span>
             </div>`;
    }

    // picking method as per requirements
    switch (method) {
      case rdR.table.mode.amount.default:
        return _default();

      case rdR.table.mode.amount.amount_breakup:
        return _amount_breakup();

      case rdR.table.mode.amount.amount_w_button:
        return _amount_w_button(value);

      case rdR.table.mode.amount.dual_amount_w_percent:
        return _dual_amount_w_percent(value);

      case rdR.table.mode.amount.triple_amount_column_row:
        return _triple_amount_column_row(value);

      case rdR.table.mode.amount.amount_w_checkbox:
        return _amount_w_checkbox(value);

      case rdR.table.mode.amount.amount_w_badge:
        return _amount_w_badge(value);

      case rdR.table.mode.amount.amount_w_percent:
        return _amount_w_percent(value);

      case rdR.table.mode.amount.amount_w_button_a_percent:
        return _amount_w_button_a_percent(value);

      case rdR.table.mode.amount.amount_w_unit:
        return _amount_w_unit(value);

      default:
        alert('invalid amount format in table profile, so we have applied default amount format');
        return _default();
    }
  }

  #_c_account(method, value, params, style) {
    // inside arrow functions
    const _default = () => {
      return `<span class="${style}">${value}</span>`;
    };

    const _image_text = () => {
      return `<div class="d-flex flex-row align-items-center">
      <div class="symbol ${style.symbol} symbol-${style.size}px">
          <img alt="${value[1]}" class="rc_image me-3 ${style.img}"
              ${atr.core.source}="${value[0]}" ${atr.custom.path}="${params.path}"> 
      </div>
      <div class="d-flex flex-column">
      <span class="${style.text}">${value[1]}</span>
      </div>
      </div>`
    }

    const _image_dual_text = () => {
      return `<div class="d-flex flex-row align-item-center">
      <div class="symbol ${style.symbol} symbol-${style.size}px">
        <img alt="${value[1]}" class="rc_image me-3 ${style.img}" 
            ${atr.custom.value}="${value[0]}" ${atr.custom.path}="${params.path}" />
      </div>
      <div class="d-flex flex-column">
      <span class="${style.text}">${value[1]}</span>
      <span class="${style.desc}">${value[2]}</span>
      </div>
      </div>`
    }

    const _account_w_alias = () => {
      return `<div class="d-flex flex-column">
              <span class="${style.text}">${value[0]}</span>
              <span class="${style.desc}">${value[1]}</span>
              </div>`
    }

    const _account_w_alias_w_popover = () => {
      return `<div class="d-flex flex-column" data-bs-toggle="tooltip" data-bs-placement="${params.placement}" 
                    data-bs-html="true" title="<span class='fs-6'>${value[0]}</span>" >
              <span class="${style.text}">${value[0]}</span>
              <span class="${style.desc}">${value[1]}</span>
              </div>`
    }

    // picking method as per requirements
    switch (method) {
      case rdR.table.mode.account.default:
        return _default();
      case rdR.table.mode.account.image_text:
        return _image_text();
      case rdR.table.mode.account.image_dual_text:
        return _image_dual_text();
      case rdR.table.mode.account.account_w_alias:
        return _account_w_alias();
      case rdR.table.mode.account.account_alias_w_popover:
        return _account_w_alias_w_popover();

      default:
        alert('invalid account profile, default account format applied');
        return _default();
    }
  }

  #_c_text(method, value, params, style) {
    // inner functions
    const _default = () => {
      return `<span class="${style}" title="${params.info}">${value}</span>`;
    }
    const _modify = () => {
      return `<span class="${style}" title="${params.info}">${value}</span>`;
    }
    const _dual_fx_row = () => {
      return `<div class="d-flex flex-row">
                <p class="mb-0 ${style.main}">${value[0]}</p>
                <p class="align-self-center ms-2 mb-0 ${style.subtext}">${value[1]}</p>
              </div>`
    }
    const _dual_fx_column = () => {
      return `<div class="d-flex flex-column">
                <p class="mb-0 ${style.main}">${value[0]}</p>
                <p class="mb-0 ${style.subtext}">${value[1]}</p>
              </div>`
    }
    const _dual_fx1_column_w_prefix = () => {
      return `<div class="d-flex flex-column">
                <p class="m-0 ${style.left}"><span class="me-1 ${style.suffix}">${params.left}</span>${value[0]}</p>
                <p class="m-0 text-end ${style.right}">${value[1]}<span class="ms-1 ${style.suffix}">${params.right}</span></p>
              </div>`
    }
    const _dual_fx1_column_aligned = () => {
      return `<div class="d-flex flex-column">
                <span class="${style.top}">${value[0]}</span>
                <span class="m-0 ${style.bottom}">${value[1]}</span>
              </div>`
    }
    const _triple_row_col = () => {
      return `<div class="d-flex flex-row">
                <div class="d-flex flex-column">
                  <span class="${style.title}">${value[0]}</span>
                  <span class="${style.description}">${value[1]}</span>
                </div>
                <span class="align-self-center ms-2 ${style.center}">${value[2]}</span>
              </div>`
    }
    const _triple_stack_col = () => {
      return `<div class="d-flex flex-stack">
                <div class="d-flex flex-column">
                  <span class="${style.title}">${value[0]}</span>
                  <span class="${style.description}">${value[1]}</span>
                </div>
                <span class="align-self-center ms-2 ${style.center}">${value[2]}</span>
              </div>`
    }
    const _triple_row_col_icon = () => {
      return `<div class="d-flex flex-row">
                <div class="d-flex flex-column">
                  <span class="${style.title}">${value[0]}</span>
                  <span class="${style.description}">${value[1]}</span>
                </div>
                <span class="align-self-center ms-2 text-end">
                  <i class="rc_icon ${style.icon}" data-cs-type="keen">${value[2]}</i>
                </span>
              </div>`
    }

    switch (method) {

      case rdR.table.mode.text.default:
        return _default();
      case rdR.table.mode.text.modify:
        return _modify();
      case rdR.table.mode.text.row:
        return _dual_fx_row();
      case rdR.table.mode.text.column:
        return _dual_fx_column();
      case rdR.table.mode.text.column_w_prefix:
        return _dual_fx1_column_w_prefix();
      case rdR.table.mode.text.column_aligned:
        return _dual_fx1_column_aligned();
      case rdR.table.mode.text.row_col:
        return _triple_row_col();
      case rdR.table.mode.text.row_col_icon:
        return _triple_row_col_icon();
      case rdR.table.mode.text.stack_col:
        return _triple_stack_col();

      default:
        alert('default text format');
        return _default();
    }
  }

  #_c_note(method, value, params, style) {
    const _default = () => {
      return `<span class="${style}">${value}</span>`;
    }
    const _word_limit = () => {
      return `<span class="${style}" ${atr.custom.limit}="${params.limit}">${value}</span>`;
    }
    const _tooltip = () => {
      return `<span class="${style.text}" 
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title="<span class='${style.tip}'>${value}</span>"
              >${params.span}</span>`;
    }
    const _popover = () => {
      return `<span class="${style.text}"
              data-bs-toggle="popover" 
              data-bs-placement="${params.placement}" 
              title="${value[0]}" 
              data-bs-content="${value[1]}"
              >${params.text}</span>`;
    }
    const _expandable = () => {
      return `<span class="${style}">${value}</span>`;
    }

    switch (method) {
      case rdR.table.mode.note.default:
        return _default();
      case rdR.table.mode.note.word_limit:
        return _word_limit();
      case rdR.table.mode.note.tooltip:
        return _tooltip();
      case rdR.table.mode.note.popover:
        return _popover();
      case rdR.table.mode.note.expandable:
        return _expandable();
      default:
        alert('invalid profile in table, default format applied note format');
        return _default(value);
    }
  }

  #_c_checkbox(method, value, params, style) {
    const _default = () => {
      return `<div class="form-check form-check-solid ${style.check}">
                  <label class="${style.label}">
                    <input type="checkbox"  
                      class="form-check-input" 
                      name="${params.name}" 
                      value="${value}"/>
                    ${params.label}</label>
              </div>`;
    }
    const _eventble = () => {
      return `<input type="checkbox" 
                      class="form-check-input rc_checkbox ${style}"
                      name="${params.name}" 
                      data-e-listen="click"
                      ${atr.custom.value}="${value}" 
                      value="${value}"/>`;
    }
    const _sample = () => {
      return `<div class="form-check form-check-sm form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" checked/>
              </div>`;
    }

    switch (method) {
      case rdR.table.mode.checkbox.default:
        return _default();
      case rdR.table.mode.checkbox.eventble:
        return _eventble();
      default:
        alert("default checkbox format");
        return _default();
    }
  }

  #_c_dropdown(method, value, params, style) {

    // common function.
    const ___menu_button_eventble = (event) => {
      return `<div class="menu-item px-3">
                <a type="button" 
                    data-e-name="${event.name}" 
                    data-e-value="${event.value}" 
                    data-e-data="${value}" 
                    class="menu-link px-3 ${style.item}">
                  <i class="${style.icon} fs-5 me-1 rc_icon" 
                    ${atr.custom.type}="${params.icon}">${event.icon}</i>${event.text}</a>
              </div>`;
    }

    const _single_button = () => {
      return `<a type="button" data-e-nature="ignore" 
                      class="${style.button}" 
                      data-kt-menu-trigger="${params.trigger}" 
                      data-kt-menu-placement="bottom-end">${params.name} <i class="ms-1 bi bi-chevron-down"></i></a>
                <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-700 menu-state-bg-light-primary ${style.menu}" 
                    data-kt-menu="true">
                  <div class="menu-item px-3">
                    <a class="menu-link px-3 ${style.item}" 
                        data-e-name="${params.button.name}" 
                        data-e-value="${params.button.value}" 
                        data-e-data="${value}">${params.button.text}</a>
                  </div>
                </div>`;
    }

    const _multiple_button = () => {
      let dropButton = `<a type="button" data-e-nature="ignore" 
                            class="${style.button}" 
                            data-kt-menu-trigger="${params.trigger}" 
                            data-kt-menu-placement="bottom-end">${params.name} <i class="ms-1 bi bi-chevron-down"></i></a>`;
      dropButton += `<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary ${style.menu}" data-kt-menu="true">`;
      for (let i = 1; i <= params.size; i++) {
        dropButton += ___menu_button_eventble(params.buttons[i]);
      }
      dropButton += '</div>';

      return dropButton;
    }

    // method
    switch (method) {
      case rdR.table.mode.dropdown.single:
        return _single_button();
      case rdR.table.mode.dropdown.multiple:
        return _multiple_button();
      default:
        alert('invalid profile in table, default format applied dropbtn format');
        return _single_button();
    }
  }

  #_c_number(method, value, params, style) {
    const _default = () => {
      return `<span class="rc_number ${style}"
                ${atr.custom.round}="${params.round}"
                ${atr.custom.type}="${params.type}">${value}</span>`;
    }
    const _percent = () => {
      return `<span class="rc_percent ${style}" 
                ${atr.custom.mark}="${value[1]}" 
                ${atr.custom.round}="${params.round}"
              >${value[0]}</span>`
    }
    const _dual_number = () => {
      return `<div>
                <span class="rc_number ${style.left}" 
                      ${atr.custom.type}="${params.type}"
                      ${atr.custom.round}="${params.round}">${value[0]}</span>
                      <span ${style.joiner}>${params.joiner}</span>
                <span class="rc_number ${style.right}"
                      ${atr.custom.type}="${params.type}"
                      ${atr.custom.round}="${params.round}">${value[1]}</span>
              </div>`;
    }
    const _with_unit = () => {
      return `<div>
                <span class="rc_number ${style.number}" 
                      ${atr.custom.type}="${params.type}"
                      ${atr.custom.round}="${params.round}">${value[0]}</span>
                <span class="${style.unit}">${value[1]}</span>
              </div>`;
    }
    const _with_percent = () => {
      return `<div class="d-flex flex-column">
                <span class="rc_number ${style.number}"
                      ${atr.custom.type}="${params.type}" 
                      ${atr.custom.round}="${params.round}" 
                      ${atr.custom.suffix}="${params.unit}">${value[0]}</span>
                <div class="d-flex flex-row">
                  <span class="badge badge-light-primary ${style.badge}">${value[2]}</span>
                  <span class="ms-1 rc_percent ${style.percent}"
                        ${atr.custom.mark}="${value[1]}">${value[0]}</span>
                </div>
              </div>`
    }
    const _numbers_collection = () => {
      return `
      <div class="d-flex align-items-center">
        <div class="symbol symbol-45px">
          <div class="symbol-label fs-2 fw-bold bg-light-primary text-primary">${value[0]}</div>
        </div>
        <div class="ms-5">
          <a type="button" data-e-nature="ignore"
             class="rc_number ${style.reading}"
                    ${atr.custom.type}="${params.type}"
                    ${atr.custom.round}="${params.round}">${value[1]}</a>
          <div class="${style.bottom}">
            <span>${params.net}&nbsp;</span>:
            <span class="rc_number ${style.net}" 
                  ${atr.custom.type}="${params.type}"
                  ${atr.custom.round}="${params.round}">${value[2]}</span>
          </div>
        </div>
      </div>`
    }

    switch (method) {
      case rdR.table.mode.number.default:
        return _default();

      case rdR.table.mode.number.percent:
        return _percent();

      case rdR.table.mode.number.dual_number:
        return _dual_number();

      case rdR.table.mode.number.w_unit:
        return _with_unit();

      case rdR.table.mode.number.w_percent:
        return _with_percent();

      case rdR.table.mode.number.collection:
        return _numbers_collection();

      default:
        alert('invalid number format in table profile, so we have applied default number format');
        return _default();
    }
  }

  #_c_input(method, value, params, style) {

    const __iam_common = (_name, _min, _max, _maxlength, _type) => {
      // create the name of the input field
      console.log(value);
      const name = _name !== '$$$$' ? `${params.name}[${_name}]` : params.name;

      // other attributes of the input field
      const min = _min !== '$$$$' ? `min="${_min}"` : '';
      const max = _max !== '$$$$' ? `max="${_max}"` : '';
      const maxlength = _maxlength !== '$$$$' ? `maxlength="${_maxlength}"` : '';
      // input type
      const type = _type !== undefined ? `type="${_type}"` : 'type="text"';


      return {
        name,
        min,
        max,
        maxlength,
        type
      };
    }

    const _default = () => {

      const c = __iam_common();
      return `<input type="text" 
                      name="${c.name}" 
                      class="${style.input} ${style.width}" 
                      placeholder="${params.placeholder}" 
                      title="${params.title}" 
                      value="${value[0]}" ${c.min} ${c.max} ${c.maxlength} />`;
    }

    const _plugin = () => {
      params.required = params.required === true ? 'required' : '';

      const c = __iam_common();

      return `<input type="text" name="${c.name}" 
                      class="${style.input} ${style.width}" 
                      data-pb-control="${params.plugin}" 
                      data-pb-method="${params.method}" 
                      placeholder="${params.placeholder}"  
                      value="${value[0]}"
                      title="${params.title}" ${params.required} ${c.min} ${c.max} ${c.maxlength}/>`;
    }

    const _event = () => {
      // create the name of the input field
      console.log(value);
      const c = __iam_common(value[1], value[2], value[3], value[4], params.input);

      let _plugin = '';
      if (params.plugin !== undefined) {
        _plugin = `data-pb-control="${params.plugin}" data-pb-method="${params.method}"`;
      }
      let _catch = '';
      if (params.find !== undefined) {
        _catch = `data-pb-catch="${params.find}"`;
      }

      return `<input ${c.type} name="${c.name}" ${_catch}
                      ${atr.event.listen}="${params.listen}"
                      ${atr.event.type}="${params.type}"
                      ${atr.event.value}="${params.value}"
                      ${atr.event.data}="${value[0]}"
                      class="${style.input} ${style.width}" 
                      ${_plugin} 
                      value="${value[0]}"
                      placeholder="${params.placeholder}"  
                      title="${params.title}" ${c.min} ${c.max} ${c.maxlength}/>`;
    }

    const _checkbox = () => {
      const id = KTUtil.getUniqueId('checkbox_input_');
      return `<div class="${style.checkbox}">
                <input class="form-check-input ${style.input}" type="checkbox" id="${id}"  
                    ${atr.event.listen}="${params.listen}"
                    ${atr.event.type}="${params.type}"
                    ${atr.event.value}="${params.value}"
                    ${atr.event.data}="${value}"
                    name="${params.name}"
                    value="${value}" />
                <label class="form-check-label ${style.label}" for="${id}">${params.text}</label>
              </div>`;
    }

    const _switch = () => {
      const id = KTUtil.getUniqueId('switch_input_');
      return `<div class="form-check form-switch ${style.switch}">
                <input class="form-check-input ${style.input}" type="checkbox" role="switch" id="${id}"
                    ${atr.event.listen}="${params.listen}"
                    ${atr.event.type}="${params.type}"
                    ${atr.event.value}="${params.value}"
                    ${atr.event.data}="${value}"
                    name="${params.name}"
                    value="${value}" />
                <label class="form-check-label ${style.label}" for="${id}">${params.text}</label>
            </div>`;
    }

    switch (method) {

      case rdR.table.mode.input.default:
        return _default();

      case rdR.table.mode.input.plugin:
        return _plugin();

      case rdR.table.mode.input.event:
        return _event();

      case rdR.table.mode.input.checkbox:
        return _checkbox();

      case rdR.table.mode.input.switch:
        return _switch();

      default:
        alert('invalid profile in table, default format applied input format');
        return _default();
    }
  }

  #_c_badge(method, value, params, style) {

    // inside arrow functions
    const _default = () => {
      return `<div class="rc_badge ${style.text}" 
                    ${atr.custom.style}="${params.badge}"
                    ${atr.custom.tag}="${params.tag}">${value}</div>`
    };
    const _inside = () => {
      return `<button class="btn btn-success me-5">
                  Messages <span class="rc_badge ms-2" 
                    ${atr.custom.style}="${params.badge}"
                    ${atr.custom.tag}="${params.tag}">${value}</span>
              </button>`
    };
    const _corner = () => {
      return `<button class="btn btn-success position-relative me-5">
                  Button <span class="position-absolute top-100 start-0 translate-middle  rc_badge" 
                    ${atr.custom.style}="${params.badge}"
                    ${atr.custom.tag}="${params.tag}">${value}</span>
              </button>`
    };

    // picking method as per requirements
    switch (method) {
      case rdR.table.mode.badge.default:
        return _default();
      case rdR.table.mode.badge.inside:
        return _inside();
      case rdR.table.mode.badge.corner:
        return _corner();
      default:
        alert('default badge format');
        return _default();
    }
  }

  #_c_image(method, value, params, style) {
    const _simple = () => {
      return `<img class="rc_image symbol"
                  ${atr.custom.value}="${value[0]}" 
                  ${atr.custom.path}="${params.path}" 
                  alt="${value[1]}" width="${style.size}px">`;
    }

    const _image = () => {
      return `<div class="symbol symbol-${style.size}px ${style.symbol}">
                <img src="" class="rc_image" 
                      ${atr.custom.value}="${value}" 
                      ${atr.custom.path}="${params.path}" 
                      alt="image"/>
              </div>`
    }

    const _label = () => {
      return `<div class="symbol symbol-${style.size}px ${style.symbol}">
                  <div class="symbol-label fs-${style.font} fw-semibold bg-${style.color} text-inverse-${style.color} rc_symbol">${value}</div>
              </div>`;
    }

    const _group = () => {
      let html = `<div class="symbol-group symbol-hover">`;
      for (let i = 0; i < params.length; i++) {
        const inside = params.type === 'image'
          ? HTML.image.image_inside(value[0])
          : HTML.image.label_inside(value[1], style.color, style.fs);
        html += HTML.image.symbol_body(inside, style.size);
      }
      html += `</div>`;
      return html;
    }

    switch (method) {
      case rdR.table.mode.image.simple:
        return _simple();

      case rdR.table.mode.image.image:
        return _image();

      case rdR.table.mode.image.label:
        return _label();

      case rdR.table.mode.image.group:
        return _group();

      default:
        alert("default image format");
        return _simple(value, path);
    }
  }

  #_c_status(method, value, params = {}, style) {

    const _simple = () => {
      return `<span class="rc_tag ${style.text}"
                    ${atr.custom.tag}="${params.tag}"
                    ${atr.custom.color}="${params.color}">${value}</span>`;
    }
    const _badge = () => {
      return `<div class="rc_tag rc_badge ${style.text}" 
                    ${atr.custom.style}="${params.badge}"
                    ${atr.custom.color}="${params.color}"
                    ${atr.custom.tag}="${params.tag}">${value}</div>`
    }

    switch (method) {
      case rdR.table.mode.status.simple:
        return _simple();

      case rdR.table.mode.status.badge:
        return _badge();

      default:
        alert('invalid method in table cell of status');
        return _simple();
    }
  }

  #_c_icon(method, value, params, style) {

    const _bootstrap = () => {
      return `<span class="align-self-${style.align}">
                  <i ${atr.custom.type}="${params.type}" class="rc_icon text-${style.color} fs-${style.size}">${value}</i>
              </span>`;
    }
    const _keen = () => {
      return `<span class="align-self-${style.align}">
                  <i ${atr.custom.type}="${params.type}" class="rc_icon text-${style.color} fs-${style.size}">${value}</i>
              </span>`;
    }
    const _flat = () => {
      return `<span class="align-self-${style.align}">
                  <i ${atr.custom.type}="${params.type}" class="rc_icon text-${style.color} fs-${style.size}">${value}</i>
              </span>`;
    }
    const _line = () => {
      return `<span class="align-self-center ${style.align}">
                  <i ${atr.custom.type}="${params.type}" class="rc_icon text-${style.color} fs-${style.size}">${value}</i>
              </span>`;
    }
    switch (method) {
      case rdR.table.mode.icon.bootstrap:
        return _bootstrap();
      case rdR.table.mode.icon.keen:
        return _keen();
      case rdR.table.mode.icon.font:
        return _flat();
      case rdR.table.mode.icon.line:
        return _line();

      default:
        alert('invalid profile in table, default format applied icon format');
        return _bootstrap();
    }
  }

  #_c_button(method, value, params, style) {

    const _event = (nature = undefined) => {
      const _nature = nature !== undefined ? nature : params.nature;
      return `<button type="button" ${atr.event.nature}="${_nature}" 
                  name="${params.type}" 
                  value="${params.value}" 
                  ${atr.event.value}="${value}" 
                  class="${style}" >${params.text}</button>`
    }

    const _action = () => {
      // icon.
      const _icon = params.icon !== undefined ? `<i class="rc_icon ${style.icon} me-2">${params.icon}</i>` : '';
      // recall.
      const _recall = params.recall !== undefined ? `data-e-recall="${params.recall}"` : '';
      // catch.
      const _catch = params.pluck !== undefined ? `data-e-catch="${params.pluck}"` : '';
      // return the final button.
      return `<button type="button" ${atr.event.nature}="${params.nature}"
                  name="${params.type}" 
                  value="${params.value}" 
                  ${atr.event.value}="${value}"
                  class="${style.button}" ${_recall} ${_catch}>${_icon} ${params.text}</button>`
    }

    const _two_inline = () => {
      return `<button>this is button</button>`;
    }

    const _three_row_column = () => {
      return `
      <div class="d-flex flex-row mb-2">
        <button type="button" name="${params.type.left}" value="${params.value.left}" data-e-value="${value}" 
                class="btn btn-sm py-1 btn-light-primary w-50 me-2">
                  <i class="rc_icon fs-2 me-2" data-cs-type="line">${params.icon.left}</i>${params.text.left}</button>
        <button type="button" name="${params.type.right}" value="${params.value.right}" data-e-value="${value}" 
                class="btn btn-sm py-1 btn-light-info w-50">
                  <i class="rc_icon fs-2 me-2" data-cs-type="line">${params.icon.right}</i>${params.text.right}</button>
      </div>
      <button type="button" name="${params.type.down}" value="${params.value.down}" data-e-value="${value}" 
              class="btn btn-sm py-1 btn-active-light-danger w-100">
                <i class="rc_icon fs-2 me-2" data-cs-type="line">${params.icon.down}</i>${params.text.down}</button>`
    }

    const _three_inline_w_icon = () => {
      return `<div class="btn-group">
            <button type="button"  name="${params.type.left}" value="${params.value.left}" data-e-value="${value}"
                    class="btn btn-light-primary btn-active-primary py-2">
              <span class="d-flex flex-column">
                <i class="rc_icon fs-2" data-cs-type="line">${params.icon.left}</i>
                <span>${params.text.left}</span>
              </span>
            </button>
            <button type="button"  name="${params.type.center}" value="${params.value.center}" data-e-value="${value}"
                    class="btn btn-light-info btn-active-info py-2">
              <span class="d-flex flex-column">
                <i class="rc_icon fs-2" data-cs-type="line">${params.icon.center}</i>
                <span>${params.text.center}</span>
              </span>
            </button>
            <button type="button"  name="${params.type.right}" value="${params.value.right}" data-e-value="${value}"
                    class="btn btn-light-danger btn-active-danger py-2">
              <span class="d-flex flex-column">
                <i class="rc_icon fs-2" data-cs-type="line">${params.icon.right}</i>
                <span>${params.text.right}</span>
              </span>
            </button>
          </div>`
    }

    switch (method) {
      case rdR.table.mode.button.event:
        return _event();
      case rdR.table.mode.button.get_event:
        return _event('get');
      case rdR.table.mode.button.post_event:
        return _event('post');
      case rdR.table.mode.button.action:
        return _action();
      case rdR.table.mode.button.two_inline:
        return _two_inline();
      case rdR.table.mode.button.three_row_column:
        return _three_row_column();
      case rdR.table.mode.button.three_inline_w_icon:
        return _three_inline_w_icon();

      default:
        alert('invalid profile in table, default format applied button format');
        return _event(value, params);
    }
  }


  /**
   * ----------------------------------------------------------------
   * Value render function fo the cell.
   * ----------------------------------------------------------------
   * this function return the cell value as per its type.
   * @param type
   * @param method
   * @param value
   * @param params
   * @param style value {'color': 'black', 'fs': 5, 'fw': 500}
   * @returns {string}
   */
  create_cell(type, method, value, params, style) {
    if (style === false) style = 'pass'; // pass is nothing in css
    // create cell value as per its type.
    switch (type) {
      case rdR.table.cell.date:
        return this.#_c_date(method, value, params, style);

      case rdR.table.cell.amount:
        return this.#_c_amount(method, value, params, style);

      case rdR.table.cell.account:
        return this.#_c_account(method, value, params, style);

      case rdR.table.cell.text:
        return this.#_c_text(method, value, params, style);

      case rdR.table.cell.note:
        return this.#_c_note(method, value, params, style);

      case rdR.table.cell.checkbox:
        return this.#_c_checkbox(method, value, params, style);

      case rdR.table.cell.dropdown:
        return this.#_c_dropdown(method, value, params, style);

      case rdR.table.cell.number:
        return this.#_c_number(method, value, params, style);

      case rdR.table.cell.input:
        return this.#_c_input(method, value, params, style);

      case rdR.table.cell.badge:
        return this.#_c_badge(method, value, params, style);

      case rdR.table.cell.image:
        return this.#_c_image(method, value, params, style);

      case rdR.table.cell.status:
        return this.#_c_status(method, value, params, style);

      case rdR.table.cell.icon:
        return this.#_c_icon(method, value, params, style);

      case rdR.table.cell.button:
        return this.#_c_button(method, value, params, style);

      default:
        return value;
    }
  }


  /**
   * this function return the cell value with <td>.
   * @returns {string}
   * @param shape
   */
  cell_profile(shape) {
    this.#shape = shape;
    console.log(shape);

    glob.env === kws.env.test ? console.log(shape.style) : false;
    // create cell value using passed params.
    const cell_val = this.create_cell(shape.type, shape.method, shape.value, shape.params, shape.style);

    glob.env === kws.env.test ? console.log(shape.outline) : false;
    // create td block using style and css.
    if (_.isEmpty(shape.outline)) {
      // getting the default out style.
      shape.outline = _.has(_dc.render.table.styles[shape.type])
        ? _dc.render.table.styles[shape.type].out
        : _dc.render.table.styles.default.out;
      console.log(shape.outline);
    }
    let css = [];
    // text warp or not
    const warp = shape.outline.warp === false ? `nowrap=""` : ``;
    // basic style
    shape.outline.align ? css.push(STYLE.align[shape.outline.align]) : false;
    shape.outline.minw ? css.push(STYLE.minw[shape.outline.minw]) : false;
    shape.outline.w ? css.push(STYLE.w[shape.outline.w]) : false;
    shape.outline.fw ? css.push(STYLE.fw[shape.outline.fw]) : false;
    shape.outline.fs ? css.push(STYLE.fs[shape.outline.fs]) : false;
    shape.outline.cls ? css.push(shape.outline.cls) : false;

    // remove the false values from array.
    const newCSS = _.filter(css, (val) => val !== false);
    // making a single string
    const css_class_string = newCSS.join(' ');
    // return the cell.
    return `<td ${warp} class="${css_class_string}">${cell_val}</td>`;
  }

  buildCell() {
    // ...
  }
}

export default OptionTables;