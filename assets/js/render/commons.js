import {CLS, kws, rdR, STYLE} from "../base/const.js";
import {_dc} from "../base/defaults.js";
import {atr} from "../base/attributes.js";
import {getConfigsData} from "../bucket/configs.js";
import _ic from "../bucket/icons.js";
import {getTagData} from "../bucket/tags.js";

class RenderCommon {

  #shared = {
    // shared variables
    decimal_Arr : [1, 10, 100, 1000, 10000],
    currentTime : new Date().getTime(),
    locales_base: 'en-US',
    locales     : 'en-IN',
    country     : 'IN',
    curr_signs  : {INR: '₹'},

    numberLocales_IN: Intl.NumberFormat('en-IN'),
    pbDate          : undefined,
    // to manage the status.
    precalled: false,
    quarters : {
      1: {
        quarter: 'Q4',
        months : ['Jan', 'Feb', 'Mar']
      },
      2: {
        quarter: 'Q1',
        months : ['Apr', 'May', 'Jun']
      },
      3: {
        quarter: 'Q2',
        months : ['Jul', 'Aug', 'Sep']
      },
      4: {
        quarter: 'Q3',
        months : ['Oct', 'Nov', 'Dec']
      }
    }
  }

  constructor() {

  }

  #setpbDate(value, _case) {
    switch (_case) {
      case 0:
        this.#shared.pbDate.setFullYear(value);
        break;
      case 1:
        const month = parseInt(value) - 1;
        this.#shared.pbDate.setMonth(month);
        break;
      case 2:
        this.#shared.pbDate.setDate(value);
        break;
    }
  }

  getShared($type) {
    switch ($type) {
      case 'numberLocales_IN':
        return this.#shared.numberLocales_IN;

      case 'pbDate':
        return this.#shared.pbDate;

      case 'country':
        return this.#shared.country;

      default:
        return this.#shared.pbDate;

    }
  }

  __atrCheck = (ele, attr, def) => {
    if (!ele.hasAttribute(attr) || ele.getAttribute(attr) === null) {
      return def;
    }
    else {
      return ele.getAttribute(attr);
    }
  }

  /*
   ----------------------------------------------------------------
   ------- renderString
   ----------------------------------------------------------------
   [update, return]
   */
  #param_validation(method, param) {
    // gap params validation
    const __pv_number = (params) => {
      let temp = _dc.render.common.number;
      if (params) {
        if (params.type !== undefined) {
          temp.type = params.type;
        }
        if (params.round !== undefined) {
          temp.round = params.round;
        }
        if (params.prefix !== undefined) {
          temp.prefix = params.prefix;
        }
        if (params.suffix !== undefined) {
          temp.suffix = params.suffix;
        }
      }
      return temp;
    }

    // currency params validation
    const __pv_currency = (params) => {
      let temp = _dc.render.common.currency;
      if (params) {
        if (params.curr !== undefined) {
          temp.curr = params.curr;
        }
        if (params.round !== undefined) {
          temp.round = params.round;
        }
        if (params.sign !== undefined) {
          temp.sign = params.sign;
        }
        if (params.end !== undefined) {
          temp.end = params.end;
        }
      }
      return temp;
    }

    // gap params validation
    const __pv_gap = (params) => {
      let temp = _dc.render.common.gap;
      if (params) {
        if (params.refdate !== undefined) {
          temp.refdate = params.refdate;
        }
        if (params.method !== undefined) {
          temp.method = params.method;
        }
        if (params.color !== undefined) {
          temp.color = params.color;
        }
      }
      return temp;
    }

    // date params validation
    const __pv_date = (params) => {
      let temp = _dc.render.common.date;
      if (params) {
        if (params.format !== undefined) {
          temp.format = params.format;
        }
        if (params.color !== undefined) {
          temp.color = params.color;
        }
      }
      return temp;
    }

    // percent params validation
    const __pv_percent = (params) => {
      let temp = _dc.render.common.percent;
      if (params) {
        if (params.mark !== undefined) {
          temp.mark = params.mark;
        }
        if (params.round !== undefined) {
          temp.round = params.round;
        }
      }
      return temp;
    }

    // average params validation
    const __pb_weightage = (params) => {
      let temp = _dc.render.common.weightage;
      if (params) {
        if (params.mark !== undefined) {
          temp.mark = params.mark;
        }
        if (params.total !== undefined) {
          temp.total = params.total;
        }
        if (params.count !== undefined) {
          temp.count = params.count;
        }
        if (params.round !== undefined) {
          temp.round = params.round;
        }
      }
      return temp;
    }

    // image params validation
    const __pb_img = (params) => {
      let temp = _dc.render.common.image;
      if (params) {
        if (params.method !== undefined) {
          temp.path = params.method;
        }
      }
      return temp;
    }

    // trim params validation
    const __pb_trim = (params) => {
      let temp = _dc.render.common.trim;
      if (params) {
        if (params.type !== undefined) {
          temp.length = params.type;
        }
      }
      return temp;
    }

    // tags params validation
    const __pb_tags = (params) => {
      let temp = _dc.render.common.tag;
      if (params) {
        if (params.tag !== undefined) {
          temp.tag = params.tag;
        }
        if (params.color !== undefined) {
          temp.color = params.color;
        }
      }
      return temp;
    }

    // switch
    switch (method) {
      case rdR.common.methods.number:
        return __pv_number(param);

      case rdR.common.methods.currency:
        return __pv_currency(param);

      case rdR.common.methods.gap:
        return __pv_gap(param);

      case rdR.common.methods.date:
        return __pv_date(param);

      case rdR.common.methods.percent:
        return __pv_percent(param);

      case rdR.common.methods.weightage:
        return __pb_weightage(param);

      case rdR.common.methods.image:
        return __pb_img(param);

      case rdR.common.methods.trim:
        return __pb_trim(param);

      case rdR.common.methods.tag:
        return __pb_tags(param);

      default:
        alert('method is not defined into param_validation function in commons.js file');
    }
  }

  /*
   * =======================================
   * String Rendering
   * =======================================
   * this function returns a string representation of a number
   * data input : 2
   * data output : Received
   */

  #_string(element = null, data = null, params = null, mode) {
    return true;
  }

  /*
   * =======================================
   * renderTrim Rendering
   * =======================================
   * this function remove whitespace or other useless part
   * data input :
   */
  #_trim(element = null, data = null, params = null, method) {

    const _trim_split = (data) => {
      let _r = "";
      data.split(' ').forEach((item) => {
        if (item.length !== 0) {
          _r += ' ' + item;
        }
      });
      return _r.trim();
    }
    const _trim_dual_line = (data) => {
      return data.replace(/ {2}/g, "").replace(/(\r\n|\n|\r)/gm, '');
    }

    const _trim_new_line = (data) => {
      return data.replace(/(\r\n|\n|\r)/gm, '');
    }

    const _return = (data, params) => {
      // validation
      let _trimmed;
      const _param = this.#param_validation(rdR.common.methods.trim, params);

      switch (_param.type) {
        case rdR.common.params.trim.none:
          return _trimmed = data;

        case rdR.common.params.trim.all:
          _trimmed = data.trim();
          _trimmed = _trim_split(_trimmed);
          _trimmed = _trim_new_line(_trimmed);
          return _trimmed = _trim_dual_line(_trimmed);

        case rdR.common.params.trim.edge:
          return _trimmed = data.trim();

        case rdR.common.params.trim.split:
          return _trimmed = _trim_split(data);

        case rdR.common.params.trim.newline:
          return _trimmed = _trim_new_line(data);

        case rdR.common.params.trim.dualspace:
          return _trimmed = _trim_dual_line(data);
      }
    }
    const _update = (element) => {
      // nothing
    }

    switch (method) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }


  /*
   * =======================================
   * element style Rendering
   * =======================================
   *
   */
  #_style(element = null, data = null, params = null, method) {


    const __return = (data, params) => {

    }

    const __update = (element) => {

      const dc = _dc.render.common.style;

      const _update_style_in_element = (itemEle) => {
        if (itemEle.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        // get the style and implement.
        const value = this.__atrCheck(itemEle, atr.custom.value, dc.value);
        const tag = this.__atrCheck(itemEle, atr.custom.tag, dc.style);

        // add the style into the element.
        itemEle.style.cssText = tag + ':' + value;

        itemEle.setAttribute(atr.status.formatted, '1');
      }
      element.getElementsByClassName(rdR.common.class.style).forEach(_update_style_in_element);
    }

    switch (method) {
      case rdR.common.mode.return:
        return __return(data, params);
      case rdR.common.mode.update:
        __update(element);
        break;
    }

  }

  /*
   * =======================================
   * Number Rendering
   * =======================================
   * this function convert numbers into local formats
   * data input : 45234345 (a row number)
   */

  #_number(element = null, data = null, params = null, mode) {

    const _update = (element) => {
      const _update_number = (item) => {
        const dc = _dc.render.common.number;
        const type = this.__atrCheck(item, atr.custom.type, dc.type);
        const round = this.__atrCheck(item, atr.custom.round, dc.round);
        let suffix = this.__atrCheck(item, atr.custom.suffix, dc.suffix);
        if (suffix !== false) {
          suffix = '<small class="opacity-75">&nbsp;' + suffix + '</small>';
        }
        let prefix = this.__atrCheck(item, atr.custom.prefix, dc.prefix);
        if (prefix !== false) {
          prefix = '<small class="opacity-100">' + prefix + '&nbsp;</small>';
        }

        console.log(type, round, suffix, prefix);
        switch (type) {
          case rdR.common.params.num.number:
            item.innerHTML = (prefix !== false ? prefix : '') +
              (Number(item.innerText)).toLocaleString(this.#shared.locales_base, {minimumFractionDigits: round}) +
              (suffix !== false ? suffix : '');
            break;

          case rdR.common.params.num.reading:
            item.innerHTML = (prefix !== false ? prefix : '') +
              (Number(item.innerText)).toLocaleString(this.#shared.locales_base, {minimumFractionDigits: round}) +
              (suffix !== false ? suffix : '');
            break;


          case rdR.common.params.num.plain:
            item.innerHTML = (prefix !== false ? prefix : '') +
              (Number(item.innerText)) +
              (suffix !== false ? suffix : '');
            break;

          case rdR.common.params.num.mobile:
            item.innerHTML = (prefix !== false ? prefix : '') +
              (Number(item.innerText)).toLocaleString(this.#shared.locales_base, {minimumFractionDigits: round}) +
              (suffix !== false ? suffix : '');
            break;

          default:
            alert('type is not valid in common render');
        }
      }

      const asdf = () => {

      }

      const _update_number_in_element = (item) => {
        if (item.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        _update_number(item);
        item.setAttribute(atr.status.formatted, '1');
      }

      //update the number
      element.getElementsByClassName(rdR.common.class.number).forEach(_update_number_in_element);
    }

    const _return = (number, params) => {
      let the_val = [];
      const _param = this.#param_validation(rdR.common.methods.number, params);

      const the_number = Number(number);

      switch (_param.type) {
        case rdR.common.params.num.number:
          the_val[1] = the_number.toLocaleString(this.#shared.locales_base, {minimumFractionDigits: _param.round});
          the_val[2] = _param.prefix ? _param.prefix + the_val[1] : the_val[1];
          the_val[3] = _param.suffix ? the_val[2] + _param.suffix : the_val[2];
          return the_val[3];

        case rdR.common.params.num.reading:
          return the_number.toFixed(_param.round);

        case rdR.common.params.num.plain:
          return the_number;

        case rdR.common.params.num.mobile:
          return the_number;

        default:
          alert('update the number -> amount into currency');
      }
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #_currency(element = null, data = null, params = null, mode) {

    const _convert_number_to_curr = (value, curr, round, sign, end) => {
      let the_val = [];
      // process.
      the_val[0] = Math.round(value * this.#shared.decimal_Arr[round]) / this.#shared.decimal_Arr[round];
      the_val[1] = this.#shared.numberLocales_IN.format(the_val[0]);
      the_val[2] = sign && sign !== '0' ? this.#shared.curr_signs[curr] + ' ' + the_val[1] : the_val[1];
      the_val[3] = end && end !== '0' ? (the_val[2] + ' /-') : the_val[2];
      return the_val[3];
    }

    const _update = (element) => {

      // update number as currency
      const _update_currency = (item) => {
        const dc = _dc.render.common.currency;
        // round.
        const round = this.__atrCheck(item, atr.custom.round, dc.round);
        // curr
        const curr = this.__atrCheck(item, atr.custom.curr, dc.curr);
        // sign
        const sign = this.__atrCheck(item, atr.custom.sign, dc.sign);
        // ending
        const end = this.__atrCheck(item, atr.custom.end, dc.end);

        const the_value = Number(item.innerText);

        item.innerText = _convert_number_to_curr(the_value, curr, round, sign, end);
      }

      const _update_currency_in_element = (item) => {
        if (item.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        _update_currency(item);

        item.setAttribute(atr.status.formatted, '1');
      }

      // update a currency format into all matched elements
      element.getElementsByClassName(rdR.common.class.currency)
        .forEach(_update_currency_in_element);
    }

    const _return = (value, params) => {
      // take the default if not provided.
      const _param = this.#param_validation(rdR.common.methods.currency, params);

      // convert value into number.
      const the_value = Number(value);

      return _convert_number_to_curr(the_value, _param.curr, _param.round, _param.sign, _param.end);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #_percent(element = null, data = null, params = null, mode) {
    /**
     * here we get the percent of the number and status as well for fuel
     * @param value
     * @param mark
     * @param round
     * @param format
     * @returns {[*,(string)]}
     */
    const _generate_percentage = (value, mark, round, format = false) => {
      let the_val = [];

      the_val[0] = Number(value);
      the_val[1] = Number(mark);
      the_val[2] = (the_val[0] / the_val[1]) * 100;
      the_val[3] = Math.round(the_val[2] * this.#shared.decimal_Arr[round]) / this.#shared.decimal_Arr[round];
      the_val[4] = the_val[3] + '%';

      // calculate color as per the percentage value.
      const _color_phase = (value) => {
        if (value > 100) {
          return 5;
        }
        else if (value >= 76) {
          return 4;
        }
        else if (value >= 51) {
          return 3;
        }
        else if (value >= 26) {
          return 2;
        }
        else if (value >= 0) {
          return 1;
        }
        else {
          return 0;
        }
      }

      // return value as per the format.
      return format ? [the_val[4], _color_phase(the_val[3])] : the_val[4];

    }

    const _return = (number, params) => {
      // param validation
      const _param = this.#param_validation(rdR.common.methods.percent, params);
      if (_param.mark === 0) {
        _param.mark = number
      }
      return _generate_percentage(number, _param.mark, _param.round, _param.color);
    }

    const _update = (element) => {

      const dc = _dc.render.common.percent;
      const _update_percent_in_element = (item) => {
        if (item.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        const value = item.innerText;
        let mark = this.__atrCheck(item, atr.custom.mark, dc.mark);
        const round = this.__atrCheck(item, atr.custom.round, dc.round);
        const color = this.__atrCheck(item, atr.custom.color, dc.color);
        if (mark === 0) {
          mark = value;
        }
        const _return = _generate_percentage(value, mark, round, color);
        item.innerText = color ? _return[0] : _return;
        if (color) {
          item.classList.add(STYLE.color_plate[color][_return[1]]);
        }
        item.setAttribute(atr.status.formatted, '1');
      }

      element.getElementsByClassName(rdR.common.class.percent)
        .forEach(_update_percent_in_element);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #_weightage(element = null, data = null, params = null, mode) {

    const _generate_weightage = (number, mark, total, count, round) => {

      const value = Number(number);
      const main_part = mark / total;
      const value_part = value / count;

      const percent = (value_part / main_part) * 100;
      return (Math.round(percent * this.#shared.decimal_Arr[round]) / this.#shared.decimal_Arr[round]) + '%';
    }
    const _return = (number, params) => {

      // param validation
      const _param = this.#param_validation(rdR.common.methods.weightage, params);

      return _generate_weightage(number, _param.mark, _param.total, _param.count, _param.round);

    }

    const _update = (element) => {

      const dc = _dc.render.common.weightage;

      const _update_weightage_in_element = (item) => {

        if (item.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        const value = item.innerText;
        let mark = this.__atrCheck(item, atr.custom.mark, dc.mark);
        let total = this.__atrCheck(item, atr.custom.total, dc.total);
        let count = this.__atrCheck(item, atr.custom.count, dc.count);
        const round = this.__atrCheck(item, atr.custom.round, dc.round);

        console.log(mark, total, count, round);
        if (mark === 0) {
          mark = value;
        }
        item.innerText = _generate_weightage(value, mark, total, count, round);
        // update the status
        item.setAttribute(atr.status.formatted, '1');
      }

      element.getElementsByClassName(rdR.common.class.weightage)
        .forEach(_update_weightage_in_element);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  /**
   *
   * @param element
   * @param data
   * @param params
   * @param mode
   * @returns {[number,[],string|*]|[string,[number|number,null,string],string|*]|[string,[number,number,string],string|*]}
   * @private
   */
  #_gap(element = null, data = null, params = null, mode) {

    /**
     * it takes a date and return the string with date difference from current time.
     * this function help humans to understand date difference from one date to another date.
     * @param value
     * @param refdate
     * @param inner_method
     * @param color
     */
    const getDateGap = (value, refdate, inner_method, color = false) => {
      // get date from the element
      const countDownDate = new Date(value).getTime();

      const distance = refdate - countDownDate;

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));

      let month, day;

      const status = days > 0 ? 'ago' : 'after';
      const mod_days = days < 0 ? days * -1 : days;
      const text_color = color === false ? '' : STYLE.color[color];

      let date_string;

      switch (inner_method) {

        case rdR.common.params.gap.day:
          return [days, [], text_color];

        case rdR.common.params.gap.days:
          date_string = mod_days + ' Days ' + status;
          return [date_string, [mod_days, null, status], text_color];

        case rdR.common.params.gap.detail:
          month = Math.floor(mod_days / 30);
          day = mod_days % 30;
          // month
          const monthStr = month > 0 ? month + ' Months & ' : '';
          // date
          const dateStr = month > 0 ? mod_days % 30 + ' Days ' : mod_days + ' Days ';

          date_string = monthStr + dateStr + status;
          return [date_string, [day, month, status], text_color];

      }
    };


    /**
     * =================================================================
     * @param element
     */
    const _update = (element) => {
      // Duration gap calculator
      let dateGap, method, value, refDate, color;

      const _update_days_gap = (item) => {
        if (item.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        const dc = _dc.render.common.gap;
        // update the date gap
        method = this.__atrCheck(item, atr.custom.method, dc.method);
        color = this.__atrCheck(item, atr.custom.color, dc.color);
        refDate = item.hasAttribute(atr.custom.refdate) && item.getAttribute(atr.custom.refdate) !== '0'
          ? new Date(item.getAttribute(atr.custom.refdate)).getTime()
          : this.#shared.currentTime;
        value = item.innerText;
        console.log(value, refDate, method, color);

        // get the date gap
        dateGap = getDateGap(value, refDate, method, color);
        console.log(dateGap);
        // update the element
        dateGap[2] === '' ? justPass() : item.classList.add(dateGap[2]);
        // update the value
        item.innerText = dateGap[0];

        // update the status.
        item.setAttribute(atr.status.formatted, '1');
      }

      //
      element.getElementsByClassName(rdR.common.class.gap)
        .forEach(_update_days_gap);
    }

    const _return = (date, raw_param) => {
      // param validation
      const _param = this.#param_validation(rdR.common.methods.gap, raw_param);

      let refDate;
      if (_param.refdate !== false) {
        refDate = new Date(_param.refdate).getTime();
      }
      else {
        refDate = this.#shared.currentTime;
      }

      return getDateGap(date, refDate, _param.method, _param.color);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  /*
   * =======================================
   * Date Rendering
   * =======================================
   * this function change date format string
   * data input : [YYYY-MM-DD]
   */
  #_date(element = null, data = null, params = null, mode) {

    const _date_setup = (data) => {
      if (this.#shared.pbDate === undefined) {
        this.#shared.pbDate = new Date();
      }
      data.split('-').map((value, key) => this.#setpbDate(value, key));

      return this.getShared();
    }

    const _format_setup = (moment, format) => {
      switch (format) {
        case rdR.common.params.date.default:
        case rdR.common.params.date.fd_fmi_fy_d:
          return moment.format('DD-MM-YYYY');

        case rdR.common.params.date.from:
          return moment.format('DD MMM');

        case rdR.common.params.date.to:
          return moment.format('DD MMM, YYYY');

        case rdR.common.params.date.fd_sms_fy_d:
          return moment.format('DD-MMM-YYYY');

        case rdR.common.params.date.fd_sms_fy_c:
          return moment.format('DD MMM, YYYY');

        case rdR.common.params.date.fd_sms_sy_c:
          return moment.format('DD MMM, YY');

        case rdR.common.params.date.sms_fd_fy_c:
          return moment.format('MMM DD, YYYY');

        case rdR.common.params.date.sd_sms_sy_c:
          return moment.format('D MMM, YY');

        case rdR.common.params.date.fd_fms_g:
          return moment.format('DD MMMM');

        case rdR.common.params.date.fd_fmi_fy_s:
          return moment.format('DD/MM/YYYY');

        case rdR.common.params.date.fd_fmi_sy_d:
          return moment.format('DD-MM-YY');

        case rdR.common.params.date.fd_sms:
          return moment.format("DD MMM");

        case rdR.common.params.date.sd_smi:
          return moment.format("D MM");

        //all month formats
        case rdR.common.params.date.dc:
          return moment.daysInMonth();

        case rdR.common.params.date.smi:
          return moment.format('M');

        case rdR.common.params.date.fmi:
          return moment.format('MM');

        case rdR.common.params.date.sms:
          return moment.format('MMM');

        case rdR.common.params.date.fms:
          return moment.format('MMMM');

        case rdR.common.params.date.fmi_sy:
          return moment.format('MM YY');

        case rdR.common.params.date.fmi_fy:
          return moment.format('MM/YYYY')

        case rdR.common.params.date.fms_sy:
          return moment.format('MMMM YY');

        case rdR.common.params.date.sms_fy:
          return moment.format('MMM YYYY')

        case rdR.common.params.date.fms_fy:
          return moment.format('MMMM YYYY');

        case rdR.common.params.date.sms_sy:
          return moment.format('MMM"YY');

        case rdR.common.params.date.sy:
          return moment.format('YY');

        case rdR.common.params.date.fy:
          return moment.format('YYYY');

        case rdR.common.params.date.sq:
          return this.#shared.quarters[moment.quarter()].quarter;

        case rdR.common.params.date.fq:
          return this.#shared.quarters[moment.quarter()].months;

        case rdR.common.params.date.day:
          return moment.format('dddd');

        case rdR.common.params.date.week:
          return moment.isoWeek();

        case rdR.common.params.date.fd:
          return moment.format('DD');
      }
    }

    // modes
    const _update = (Ele) => {

      const _update_date_in_element = (dateEle) => {
        if (dateEle.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        const dateRender = _date_setup(dateEle.innerText)
        // get the format from the element or use the default.
        dateEle.innerText = _format_setup(
          moment(dateRender),
          (dateEle.getAttribute(atr.custom.format) ?? rdR.common.params.date.default)
        );
        // update attribute to avoid reformatting
        dateEle.setAttribute(atr.status.formatted, '1');
      }

      Ele.getElementsByClassName(rdR.common.class.date)
        .forEach(_update_date_in_element);
    }

    const _return = (data, param) => {
      const format = param.format ?? rdR.common.params.date.default;
      _date_setup(data);
      return _format_setup(moment(this.#shared.pbDate), format);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  /**
   * add the image path
   * @param element
   * @param data
   * @param params
   * @param mode
   * @returns {*}
   * @private
   */
  #_image(element = null, data = null, params = null, mode) {

    const _get_source = (method) => {
      switch (method) {
        case rdR.common.params.img.media:
          return "../../assets/media/avatars/";
        case rdR.common.params.img.users:
          return "../../assets/media/avatars/";
        case rdR.common.params.img.avatar:
          return "../../assets/media/avatars/";

        default:
          return "../../assets/media/avatars/";
      }
    }

    //set the source of image
    const _return = (data, params) => {
      // param validation
      const _param = this.#param_validation(rdR.common.methods.image, params);
      const [path, value] = [
        _param.method,
        data
      ];

      return path + value;
    }

    const _update = (element) => {

      const _update_image_in_element = (imageEle) => {
        if (imageEle.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        const dc = _dc.render.common.image;
        const path_key = this.__atrCheck(imageEle, atr.custom.path, dc.path);

        let path = _get_source(path_key);

        let value = imageEle.hasAttribute(atr.custom.value)
          ? imageEle.getAttribute(atr.custom.value)
          : imageEle.getAttribute(atr.core.source);

        imageEle.setAttribute("src", path + value);

        imageEle.setAttribute(atr.status.formatted, '1');
      }

      element.getElementsByClassName(rdR.common.class.image).forEach(_update_image_in_element);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #_display(element = null, data = null, params = null, mode) {

    const _return = (data, params) => {
      return true;
    }

    const _update = (element) => {

      const _update_display_in_element = (displayEle) => {
        if (displayEle.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        displayEle.children.forEach((child) => {
          if (child.getAttribute(atr.core.key) === displayEle.getAttribute(atr.custom.display)) {
            child.classList.remove(CLS.display.none);
          }
        });

        displayEle.setAttribute(atr.status.formatted, '1');
      }

      element.getElementsByClassName(rdR.common.class.display).forEach(_update_display_in_element);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #_symbol(element = null, data = null, params = null, mode) {

    const _return = (data, params) => {
      return true;
    }

    const _update = (element) => {

      const _update_symbol_in_element = (symbolEle) => {
        if (symbolEle.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        // change the code here
        const name = symbolEle.innerText;
        let symbol = '';
        symbol = name.includes(' ')
          ? name.split(' ')[0].substring(0, 1).toUpperCase() + name.split(' ')[1].substring(0, 1).toUpperCase()
          : name.substring(0, 2).toUpperCase();

        symbolEle.innerText = symbol;

        symbolEle.setAttribute(atr.status.formatted, '1');
      }

      element.getElementsByClassName(rdR.common.class.symbol).forEach(_update_symbol_in_element);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #_progress(element = null, data = null, params = null, mode) {

    const _return = (data, params) => {
      return true;
    }

    const _update = (element) => {
      const dc = _dc.render.common.progress;
      const _update_progress_in_element = (progressEle) => {
        if (progressEle.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        // get the style and implement.
        const value = this.__atrCheck(progressEle, atr.custom.value, dc.value);
        const mark = this.__atrCheck(progressEle, atr.custom.mark, dc.mark);


        let percent = this.$_return(value, rdR.common.methods.percent, {
          mark : mark,
          round: 0
        });

        // add the style into the element.
        progressEle.style.cssText = 'width' + ':' + percent;

        progressEle.setAttribute(atr.status.formatted, '1');
      }

      element.getElementsByClassName(rdR.common.class.progress).forEach(_update_progress_in_element);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #_checkbox(element = null, data = null, params = null, mode) {

    const _return = (data, params) => {
      // this is not for return
      alert('this is not for return, checkbox in common render');
      return true;
    }

    const _update = (element) => {

      const _update_checkbox_in_element = (checkboxInput) => {
        if (checkboxInput.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        // get the style and implement.
        let value = this.__atrCheck(checkboxInput, atr.custom.value, _dc.render.common.checkbox.value);
        checkboxInput.checked = value === checkboxInput.value;
        // update the status
        checkboxInput.setAttribute(atr.status.formatted, '1');
      }
      element.getElementsByClassName(rdR.common.class.checkbox).forEach(_update_checkbox_in_element);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #_icon(element = null, data = null, params = null, mode) {

    const _return = (data, params) => {
      // checking the family circle.
      const keys = Object.keys(rdR.common.params.icon);
      _.indexOf(keys, params.type) === -1 && alert('invalid icon family, icon in common render');
      return _.has(_ic[params.type], data)
        ? _ic[params.type][data]
        : _ic[params.type]['default'];
    }

    const _update = (element) => {

      const _update_icon = (iconEle) => {
        if (iconEle.getAttribute(atr.status.formatted) === '1') {
          return;
        }
        console.log(iconEle);
        // get the style and implement.
        const type = this.__atrCheck(iconEle, atr.custom.type, _dc.render.common.icon.type);
        const value = iconEle.innerText;
        console.log(type, value);
        // get the target icon
        const icon = _.has(_ic[type], value)
          ? _ic[type][value]
          : _ic[type]['default'];

        // create the array of icon classes.
        const iconArr = icon.split(' ');
        // add the class and remove the text.
        iconEle.classList.add(...iconArr);
        iconEle.innerText = '';
        // update the status
        iconEle.setAttribute(atr.status.formatted, '1');
      }
      element.getElementsByClassName(rdR.common.class.icon)
        .forEach(_update_icon);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #_badge(element = null, data = null, params = null, mode) {

    const _return = (data, params) => {
      // this is not a return item.
    }

    const _update = (element) => {

      let tagData = {};
      const getTagData_once = (tag) => {
        if (_.isEmpty(tagData[tag])) {
          tagData = getTagData([tag]);
        }
      }

      function getColor(key, tag) {
        const defaultValue = 'primary';
        const targetKey = _.find(tagData[tag], (value) => {
          return value[0] === key;
        });
        if (targetKey) {
          return targetKey[1];
        }
        else {
          return defaultValue;
        }
      }

      const get_classes = (style, color) => {
        switch (style) {
          case rdR.common.params.badge.solid:
            return `${CLS.badge.solid}-${color}`;
          case rdR.common.params.badge.light:
            return `${CLS.badge.light}-${color}`;
          case rdR.common.params.badge.square:
            return `${CLS.badge.square}-${color}`;
          case rdR.common.params.badge.square_light:
            return `${CLS.badge.square_light}-${color}`;
          case rdR.common.params.badge.circle:
            return `${CLS.badge.circle}-${color}`;
          case rdR.common.params.badge.circle_light:
            return `${CLS.badge.circle_light}-${color}`;
          case rdR.common.params.badge.outline:
            return `${CLS.badge.outline}-${color}`;
          default:
            return `${CLS.badge.solid}-${color}`;
        }

      }

      const _update_icon = (badgeEle) => {
        if (badgeEle.getAttribute(atr.status.formatted) === rdR.common.methods.badge) {
          return;
        }
        // get the style and implement.
        const style = this.__atrCheck(badgeEle, atr.custom.style, _dc.render.common.badge.style);
        const tag = this.__atrCheck(badgeEle, atr.custom.tag, _dc.render.common.badge.tag);
        const value = badgeEle.innerText;

        // get the target icon
        getTagData_once(tag);

        const color = getColor(value.trim(), tag);

        const badgeClasses = get_classes(style, color);

        // create the array of icon classes.
        const badgeArr = badgeClasses.split(' ');
        // add the class and remove the text.
        badgeEle.classList.add(...badgeArr);
        // update the status
        badgeEle.setAttribute(atr.status.formatted, rdR.common.methods.badge);
      }
      element.getElementsByClassName(rdR.common.class.badge)
        .forEach(_update_icon);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #_tag(element = null, data = null, params = null, mode) {

    const _return = (data, params) => {
      // param validation
      const _param = this.#param_validation(rdR.common.methods.tag, params);
      // process
      const tagData = getTagData([_param.key]);
      // get values using the key.
      return _.has(tagData, data)
        ? _param.color ? tagData[data] : tagData[data][0]
        : data;
    }

    const _update = (element) => {

      let tagData = {};
      const getTagData_once = (tag) => {
        if (_.isEmpty(tagData[tag])) {
          tagData = getTagData([tag]);
        }
      }

      const _update_tag = (tagEle) => {
        if (tagEle.getAttribute(atr.status.formatted) === rdR.common.methods.tag) {
          return;
        }
        // get the style and implement.
        const tag = this.__atrCheck(tagEle, atr.custom.tag, _dc.render.common.tag.key);
        const color = this.__atrCheck(tagEle, atr.custom.color, _dc.render.common.tag.color);
        const value = tagEle.innerText;


        // get the target icon
        getTagData_once(tag);

        // get the value
        const val = tagData[tag][value];

        tagEle.innerText = val[0];
        if (color === '1') {
          tagEle.classList.add(`text-${val[1]}`);
        }
        // update the status
        tagEle.setAttribute(atr.status.formatted, rdR.common.methods.tag);
      }
      element.getElementsByClassName(rdR.common.class.tag)
        .forEach(_update_tag);
    }

    switch (mode) {
      case rdR.common.mode.return:
        return _return(data, params);
      case rdR.common.mode.update:
        _update(element);
        break;
    }
  }

  #preCalled() {

    // these data can be accessible by the global configs
    const config = getConfigsData('common');
    // set the date
    this.#shared.pbDate = new Date()
    this.#shared.decimal_Arr = [1, 10, 100, 1000, 10000];
    this.#shared.currentTime = new Date().getTime();
    this.#shared.locales_base = 'en-US';
    this.#shared.locales = config['locales'];
    this.#shared.country = 'IN';
    this.#shared.curr_signs = config['currency_signs'];
    this.#shared.numberLocales_IN = Intl.NumberFormat(config['locales']);

    // making calls at once.
    this.#shared.precalled = true;
  }

  #_package(Ele) {

    const mode = rdR.common.mode.update;

    // Number update
    this.#_number(Ele, null, null, mode);

    // currency update
    this.#_currency(Ele, null, null, mode);

    // date update
    this.#_date(Ele, null, null, mode);

    // gap update
    this.#_gap(Ele, null, null, mode);

    // Notification update
    this.#_string(Ele, null, null, mode);

    // trim update
    this.#_trim(Ele, null, null, mode);

    // update style
    this.#_style(Ele, null, null, mode);

    // percent update
    this.#_percent(Ele, null, null, mode);

    // average update
    this.#_weightage(Ele, null, null, mode);

    // img
    this.#_image(Ele, null, null, mode);

    // display
    this.#_display(Ele, null, null, mode);

    // symbol
    this.#_symbol(Ele, null, null, mode);

    // progress
    this.#_progress(Ele, null, null, mode);

    // checkbox
    this.#_checkbox(Ele, null, null, mode);

    // icon
    this.#_icon(Ele, null, null, mode);

    // tag
    this.#_tag(Ele, null, null, mode);

    // badge
    this.#_badge(Ele, null, null, mode);
  }

  /**
   * it will only render if the element has attribute [data-dom-catch="common"]
   */
  #initial_execute() {

    const catchedEles = document.querySelectorAll(querySA(atr.dom.catch, kws.render.common));

    catchedEles.forEach((catchEle) => {
      this.#_package(catchEle);
    });
  }


  $_call(theElement) {
    // main function calling
    this.#_package(theElement);
  }

  $_page() {
    // pre call functions.
    this.#shared.precalled ? justPass() : this.#preCalled();

    // main function calling
    this.#initial_execute();
  }

  $_update(theElement, method) {
    const mode = rdR.common.mode.update;
    switch (method) {
      case rdR.common.methods.number:
        this.#_number(theElement, null, null, mode);
        break;

      case rdR.common.methods.currency:
        this.#_currency(theElement, null, null, mode);
        break;

      case rdR.common.methods.date:
        this.#_date(theElement, null, null, mode);
        break;

      case rdR.common.methods.gap:
        this.#_gap(theElement, null, null, mode);
        break;

      case rdR.common.methods.string:
        this.#_string(theElement, null, null, mode);
        break

      case rdR.common.methods.trim:
        this.#_trim(theElement, null, null, mode);
        break;

      case rdR.common.methods.style:
        this.#_style(theElement, null, null, mode);
        break;

      case rdR.common.methods.percent:
        this.#_percent(theElement, null, null, mode);
        break;

      case rdR.common.methods.weightage:
        this.#_weightage(theElement, null, null, mode);
        break;

      case rdR.common.methods.image:
        this.#_image(theElement, null, null, mode);
        break;

      case rdR.common.methods.display:
        this.#_display(theElement, null, null, mode);
        break;

      case rdR.common.methods.symbol:
        this.#_symbol(theElement, null, null, mode);
        break;

      case rdR.common.methods.progress:
        this.#_progress(theElement, null, null, mode);
        break;

      case rdR.common.methods.checkbox:
        this.#_checkbox(theElement, null, null, mode);
        break;

      case rdR.common.methods.icon:
        this.#_icon(theElement, null, null, mode);
        break;

      case rdR.common.methods.tag:
        this.#_tag(theElement, null, null, mode);
        break;

      case rdR.common.methods.badge:
        this.#_badge(theElement, null, null, mode);
        break;
    }
  }

  $_return(data, method, param) {
    const mode = rdR.common.mode.return;
    switch (method) {
      case rdR.common.methods.number:
        return this.#_number(null, data, param, mode);

      case rdR.common.methods.currency:
        return this.#_currency(null, data, param, mode);

      case rdR.common.methods.date:
        return this.#_date(null, data, param, mode);

      case rdR.common.methods.gap:
        return this.#_gap(null, data, param, mode);

      case rdR.common.methods.string:
        return this.#_string(null, data, param, mode);

      case rdR.common.methods.trim:
        return this.#_trim(null, data, param, mode);

      case rdR.common.methods.style:
        return this.#_style(null, data, param, mode);

      case rdR.common.methods.percent:
        return this.#_percent(null, data, param, mode);

      case rdR.common.methods.weightage:
        return this.#_weightage(null, data, param, mode);

      case rdR.common.methods.image:
        return this.#_image(null, data, param, mode);

      case rdR.common.methods.display:
        return this.#_display(null, data, param, mode);

      case rdR.common.methods.symbol:
        return this.#_symbol(null, data, param, mode);

      case rdR.common.methods.progress:
        return this.#_progress(null, data, param, mode);

      case rdR.common.methods.checkbox:
        return this.#_checkbox(null, data, param, mode);

      case rdR.common.methods.icon:
        return this.#_icon(null, data, param, mode);

      case rdR.common.methods.tag:
        return this.#_tag(null, data, param, mode);

      case rdR.common.methods.badge:
        return this.#_badge(null, data, param, mode);

      default:
        alert('No such method found. Please check the method name for common renderer.');
        return true;
    }
  }

};

export default RenderCommon;