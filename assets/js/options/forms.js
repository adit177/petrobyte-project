import {exT, rdR, CLS, STYLE, plg, deF, kws, Lyt, otR, sD, glob, keys} from "../base/const.js"

import {$R_common_obj} from "../base/render.js";
import {atr} from "../base/attributes.js";
import {getTagData} from "../bucket/tags.js";


class OptionForms {


  constructor() {
    //
  }

  // options for select in the form
  select_option_building(method, values, params = []) {
    // <option value="$value$">$text$</option>

    // get tack of rendering.
    const tack = method[1] === undefined
      ? plg.selectPicker.opts[method[0]]['default']
      : plg.selectPicker.opts[method[0]][method[1]];

    //
    switch (method[0]) {
      case plg.selectPicker.method.simple:
        return this.#_simple_sob(values, params, tack);

      case plg.selectPicker.method.account:
        return this.#_account_sob(values, params, tack);

      case plg.selectPicker.method.image:
        return this.#_image_sob(values, params, tack);

      case plg.selectPicker.method.text:
        return this.#_text_sob(values, params, tack);

      case plg.selectPicker.method.custom:
        return this.#_custom_sob(values, params, tack);

      case plg.selectPicker.method.tag:
        return this.#_tag_sob(values, params, tack);
    }
  }


  #_simple_sob = function (values, params, tack) {
    let option = `<option></option>`;
    const __direct = (val, param) => {
      option += `<option value="${val[param[0]]}" ${atr.select.options.whoiam}="${tack}">${val[param[1]]}</option>`
    }

    const __withid = (val, param) => {
      option += `<option value="` + val[param[0]] + `"
       ${atr.select.options.whoiam}="${tack}" ${atr.select.options.subtext}="${val[parseInt(param[1]) + 1] ?? ''}">${val[param[1]]}</option>`
    }
    const __subtext = (val, param) => {
      option += `<option value="${val[param[0]]}"
      ${atr.select.options.whoiam}="${tack}" ${atr.select.options.subtext}="${val[param[2]]}">${val[param[1]]}</option>`
    }

    switch (tack) {
      case plg.selectPicker.opts.simple.direct:
        // values = [key, text];
        for (const valuesKey in values) {
          __direct(values[valuesKey], params);
        }
        break;
      case plg.selectPicker.opts.simple.withid:
        // values = [key, text, ~subtext];
        for (const valuesKey in values) {
          __withid(values[valuesKey], params);
        }
        break;
      case plg.selectPicker.opts.simple.subtext:
        // values = [key, text, subtext];
        for (const valuesKey in values) {
          __subtext(values[valuesKey], params);
        }
        break;

      default:
        alert(tack + ': tack is not defined');
    }
    return $R_common_obj.$_return(option, rdR.common.methods.trim);
  }

  #_account_sob = function (values, params, tack) {
    let option = `<option></option>`;
    /**
     * options for account with amount
     * @param val [0 => lid, 1 => account, 2 => alias, 3 => prefix, 4 => amount, 5 => suffix ]
     * @param params
     */
    const __amount = (val, params) => {

      // get tags to implement directly in the option
      const tags = getTagData([keys.tagData.colors, keys.tagData.prefix, keys.tagData.suffix]);

      option += `<option value="` + val[params[0]] + `" 
      ${atr.select.options.whoiam}="${tack}"
      ${atr.select.options.amount}="${$R_common_obj.$_return(val[params[4]], rdR.common.methods.currency, {sign: true})}"
      ${atr.select.options.alias}="${val[params[2]]}"
      ${atr.select.options.prefix}="${tags[keys.tagData.prefix][val[params[3]] ?? 0]}"
      ${atr.select.options.suffix}="${tags[keys.tagData.suffix][val[params[5]] ?? 0]}"
      ${atr.select.options.color}="${tags[keys.tagData.colors][val[params[6]] ?? 0][0]}">${val[params[1]]}</option>`
    }
    /**
     * options for account with  group
     * @param val [0 => key,  1 => value,  2 => alias, 3 => prefix,  4 => group]
     * @param params
     */
    const __group = (val, params) => {
      // get a color object to implement direclty in the option
      const tags = getTagData([keys.tagData.colors, keys.tagData.prefix]);
      // craft option
      option += `<option value="` + val[params[0]] + `" 
      ${atr.select.options.whoiam}="${tack}"
      ${atr.select.options.alias}="${val[params[2]]}" 
      ${atr.select.options.prefix}="${tags[keys.tagData.prefix][val[params[3]] ?? 0]}" 
      ${atr.select.options.text}="${val[params[4]]}"
      ${atr.select.options.color}="${tags[keys.tagData.colors][val[params[5]] ?? 0][0]}">${val[params[1]]}</option>`
    }
    /**
     * options for account with  group
     * @param val [0 => key,  1 => value,  2 => alias, 3 => prefix,  4 => group]
     * @param params
     */
    const __ledger = (val, params) => {

      // get color object to implement direclty in the option
      const tags = getTagData([keys.tagData.ledger_balance_tag]);
      let row = {
        3: ``,
        4: ``,
        5: ``
      };
      const curr_param = {
        sign : true,
        round: 0
      };

      for (let i = 3; i < 6; i++) {
        if (val[i] !== undefined) {
          const theValue = typeof val[i][1] === 'number'
            ? $R_common_obj.$_return(val[i][1], rdR.common.methods.currency, curr_param)
            : val[i][1];

          row[i] += atr.select.options['key' + i] + `="${tags[keys.tagData.ledger_balance_tag][val[i][0] ?? 0][0]}" `;
          row[i] += atr.select.options['val' + i] + `="${theValue}" `;
        }
      }

      option += `<option value="` + val[params[0]] + `" 
      ${atr.select.options.alias}="${val[params[2]]}"
      ${atr.select.options.whoiam}="${tack}"
      ${row[3]}
      ${row[4]}
      ${row[5]}
      ${atr.select.options.color}="gray-600">${val[params[1]]}</option>`
    }

    switch (tack) {
      case plg.selectPicker.opts.account.amount:
        // [id, name, alias, string, amount, behave]
        for (const valuesKey in values) {
          __amount(values[valuesKey], params)
        }
        break;
      case plg.selectPicker.opts.account.group:
        // [id, name, alias, string, group]
        for (const valuesKey in values) {
          __group(values[valuesKey], params)
        }
        break;
      case plg.selectPicker.opts.account.ledger:
        // [id, name, alias, string, array, array, array = [key, value]]
        for (const valuesKey in values) {
          __ledger(values[valuesKey], params)
        }
        break;

      default:
        alert(tack + ': tack is not defined');
    }
    return $R_common_obj.$_return(option, rdR.common.methods.trim);
  }

  #_image_sob = function (values, params, tack) {

    let option = `<option></option>`;
    /**
     * options for account with amount
     * @param val [0 => key, 1 => value, 2 => alias, 3 => suffix, 4 => amount, 5 => prefix]
     * @param params
     */
    const __inline = (val, params) => {
      option += `<option value="` + val[params[0]] + `" 
      ${atr.select.options.whoiam}="${tack}" ${atr.select.options.image}="${val[params[2]]}">${val[params[1]]}</option>`
    }
    /**
     * options for account with  group
     * @param val [0 => key,  1 => value,  2 => alias, 3 => prefix,  4 => group]
     * @param params
     */
    const __rich = (val, params) => {
      option += `<option value="` + val[params[0]] + `" 
      ${atr.select.options.image}="${val[params[2]]}"
      ${atr.select.options.whoiam}="${tack}"
      ${atr.select.options.text}="${val[params[3]]}">${val[params[1]]}</option>`
    }


    switch (tack) {
      case plg.selectPicker.opts.image.inline:
        // [id, name, alias, string, amount, behave]
        for (const valuesKey in values) {
          __inline(values[valuesKey], params)
        }
        break;
      case plg.selectPicker.opts.image.rich:
        // [id, name, alias, string, group]
        for (const valuesKey in values) {
          __rich(values[valuesKey], params)
        }
        break;

      default:
        alert(tack + ': tack is not defined');
    }
    return $R_common_obj.$_return(option, rdR.common.methods.trim);
  }

  #_text_sob = function (values, params, tack) {
    let option = `<option></option>`;
    const __col = (val, param) => {
      option += `<option value="${val[param[0]]}"
       ${atr.select.options.whoiam}="${tack}"
      ${atr.select.options.alias}="${val[param[2]] ?? ''}"
      ${atr.select.options.text}="${val[param[3]]}">${val[param[1]]}</option>`
    }

    const __dual = (val, param) => {
      option += `<option value="${val[param[0]]}"
      ${atr.select.options.whoiam}="${tack}"
      ${atr.select.options.alias}="${val[param[2]] ?? ''}"
      ${atr.select.options.text}="${val[param[3]][0]}"
      ${atr.select.options.subtext}="${val[param[3]][1]}">${val[param[1]]}</option>`
    }
    const __menu = (val, param) => {
      option += `<option value="${val[param[0]]}"
      ${atr.select.options.whoiam}="${tack}"
      ${atr.select.options.alias}="${val[param[2]] ?? ''}"
      ${atr.select.options.text}="${val[param[3]][0]}"
      ${atr.select.options.subtext}="${val[param[3]][1]}"
      ${atr.select.options.badge}="${val[param[3]][2]}"
      ${atr.select.options.color}="${CLS.colors.array[val[param[4]]] ?? 'primary'}">${val[param[1]]}</option>`
    }
    const __grid = (val, param) => {
      option += `<option value="${val[param[0]]}"
      ${atr.select.options.whoiam}="${tack}"
      ${atr.select.options.alias}="${val[param[2]] ?? ''}"
      ${atr.select.options.text}="${val[param[3]][0]}"
      ${atr.select.options.subtext}="${val[param[3]][1]}"
      ${atr.select.options.desc}="${val[param[3]][2]}"
      ${atr.select.options.badge}="${val[param[3]][3]}"
      ${atr.select.options.color}="${CLS.colors.array[val[param[4]]]}">${val[param[1]]}</option>`
    }

    switch (tack) {
      case plg.selectPicker.opts.text.col:
      case plg.selectPicker.opts.text.end:
      case plg.selectPicker.opts.text.row:
        // values = [key, text, alias, [strings]];
        for (const valuesKey in values) {
          __col(values[valuesKey], params);
        }
        break;

      case plg.selectPicker.opts.text.dual:
        // values = [key, text, alias, [strings]];
        for (const valuesKey in values) {
          __dual(values[valuesKey], params);
        }
        break;
      case plg.selectPicker.opts.text.menu:
        // values = [key, text, alias, [strings]];
        for (const valuesKey in values) {
          __menu(values[valuesKey], params);
        }
        break;
      case plg.selectPicker.opts.text.grid:
        // values = [key, text, alias, [strings]];
        for (const valuesKey in values) {
          __grid(values[valuesKey], params);
        }
        break;

      default:
        alert(tack + ': tack is not defined');
    }
    return $R_common_obj.$_return(option, rdR.common.methods.trim);
  }

  #_custom_sob = function (values, params, tack) {

    let option = `<option></option>`;

    const __table = (val, param) => {
      option += `<option value="` + val[param[0]] + `"
      ${atr.select.options.whoiam}="${tack}"
      ${atr.select.options.text}="${val[param[2]]}" ${atr.select.options.subtext}="${val[param[3]]}"
      ${atr.select.options.date}="${$R_common_obj.$_return(val[param[4]], rdR.common.methods.date, {
        format: rdR.common.params.date.default
      })}"
      ${atr.select.options.amount}="${$R_common_obj.$_return(val[param[7]], rdR.common.methods.currency)}"
      ${atr.select.options.debit}="${val[param[5]]}" 
      ${atr.select.options.credit}="${val[param[6]]}" 
      ${atr.select.options.note}="${val[param[8]] ?? ''}">${val[param[1]]}</option>`
    }

    switch (tack) {
      case plg.selectPicker.opts.custom.table:
        // values = [key, text, ~subtext];
        for (const valuesKey in values) {
          __table(values[valuesKey], params);
        }
        break;


      default:
        alert(tack + ': tack is not defined');
    }
    // console.log(option);
    return $R_common_obj.$_return(option, rdR.common.methods.trim);
  }

  #_tag_sob = function (values, params, tack) {
    let option = `<option></option>`;
    const __single = (val, param) => {
      option += `<option value="${val[param[0]]}" ${atr.select.options.whoiam}="${tack}">${val[param[1]]}</option>`
    }

    switch (tack) {
      case plg.selectPicker.opts.tag.single:
        // values = [key, text];
        for (const valuesKey in values) {
          __single(values[valuesKey], params);
        }
        break;

      default:
        alert(tack + ': tack is not defined');
    }
    return $R_common_obj.$_return(option, rdR.common.methods.trim);
  }

}

export default OptionForms;