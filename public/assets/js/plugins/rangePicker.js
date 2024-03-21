import {plg, kws} from "../base/const.js";
import {atr} from "../base/attributes.js";
import {getDatesData} from "../bucket/dates.js";

var fun = function () {
  // Shared variables
  let appDates = {
    default: {
      date : undefined,
      month: undefined,
      year : undefined
    },
    format : {
      date : undefined,
      month: undefined,
      year : undefined,
    },
    // the max and min date user can select
    active : {
      min: undefined,
      max: undefined
    },
    licence: {
      from: undefined,
      to  : undefined
    },
    fiscal : {
      start: undefined,
      end  : undefined
    },
    range  : {
      from: undefined,
      to  : undefined
    }
  };
  let rangeInstance = {};
  let method;
  let start_date, end_date;
  let min_date, max_date;
  let RP_formats = {
    plugin : 'MM/DD/YYYY',
    default: 'DD/MM/YYYY',
    india  : 'DD-MM-YYYY',
    human  : 'DD MMM, YYYY',
    month  : 'MMM, YYYY',
    system : "YYYY-MM-DD"
  };
  let RP_separator = {
    default: ' - ',
    arrow  : ' -> ',
    dash   : ' - ',
    slash  : ' / ',
    alpha  : ' to '
  }
  let Values = {};

  const _getOptions = (method) => {

    // calender max and min dates
    min_date = moment(appDates.active.min);
    max_date = moment(appDates.active.max);

    switch (method) {
      case plg.rangePicker.method.all:
        //
        break;

      case plg.rangePicker.method.simple:
        start_date = moment(appDates.range.from);
        end_date = moment(appDates.range.to);
        return {
          // access
          minDate: min_date.format(RP_formats.default),
          maxDate: max_date.format(RP_formats.default),
          // range
          startDate: start_date.format(RP_formats.default),
          endDate  : end_date.format(RP_formats.default),
          // locale
          locale           : {
            format     : RP_formats.default,
            separator  : RP_separator.arrow,
            cancelLabel: 'Clear'
          },
          opens            : 'center',
          drops            : 'down',
          autoApply        : false,
          autoUpdateInput  : true,
          maxSpan          : {days: 90},
          selectBackwards  : true,
          singleDatePicker : false,
          singleRangePicker: false,
          keepSelected     : false,
        }

      case plg.rangePicker.method.dropdown:
        start_date = moment(appDates.range.from);
        end_date = moment(appDates.range.to);
        return {
          // access
          minDate: min_date.format(RP_formats.default),
          maxDate: max_date.format(RP_formats.default),
          // range
          startDate: start_date.format(RP_formats.default),
          endDate  : end_date.format(RP_formats.default),
          // locale
          locale         : {
            format     : RP_formats.default,
            separator  : RP_separator.arrow,
            cancelLabel: 'Clear'
          },
          opens          : 'center',
          drops          : 'down',
          autoApply      : false,
          autoUpdateInput: false,
          ranges         : {
            "Today"       : [moment(), moment()],
            "Yesterday"   : [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days" : [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "Month to Now": [moment().startOf("month"), moment().endOf("month")],
            "Last Month"  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            "Last 3 Month": [moment().subtract(3, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "Last 6 Month": [moment().subtract(6, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "This Year"   : [moment().startOf("year"), moment().endOf("year")]
          }
        }

      case plg.rangePicker.method.advance:
        start_date = moment(appDates.range.from);
        end_date = moment(appDates.range.to);
        return {
          // access
          minDate: min_date.format(RP_formats.default),
          maxDate: max_date.format(RP_formats.default),
          // range
          startDate: start_date.format(RP_formats.default),
          endDate  : end_date.format(RP_formats.default),
          // locale
          locale         : {
            format     : RP_formats.default,
            separator  : RP_separator.arrow,
            cancelLabel: 'Clear'
          },
          opens          : 'center',
          drops          : 'down',
          autoApply      : false,
          autoUpdateInput: false,
          ranges         : {
            "Today"       : [moment(), moment()],
            "Yesterday"   : [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days" : [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "Month to Now": [moment().startOf("month"), moment().endOf("month")],
            "Last Month"  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            "Last 3 Month": [moment().subtract(3, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "Last 6 Month": [moment().subtract(6, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "This Year"   : [moment().startOf("year"), moment().endOf("year")]
          }
        }
      case plg.rangePicker.method.date:
        start_date = moment(appDates.range.from);
        end_date = moment(appDates.range.to);
        return {
          // access
          minDate: min_date.format(RP_formats.default),
          maxDate: max_date.format(RP_formats.default),
          // range
          startDate: start_date.format(RP_formats.default),
          endDate  : end_date.format(RP_formats.default),
          // locale
          locale         : {
            format     : RP_formats.default,
            separator  : RP_separator.arrow,
            cancelLabel: 'Clear'
          },
          opens          : 'center',
          drops          : 'down',
          autoApply      : false,
          autoUpdateInput: false,
          ranges         : {
            "Today"       : [moment(), moment()],
            "Yesterday"   : [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days" : [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "Month to Now": [moment().startOf("month"), moment().endOf("month")],
            "Last Month"  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            "Last 3 Month": [moment().subtract(3, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "Last 6 Month": [moment().subtract(6, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "This Year"   : [moment().startOf("year"), moment().endOf("year")]
          }
        }
      case plg.rangePicker.method.month:
        start_date = moment(appDates.range.from);
        end_date = moment(appDates.range.to);
        return {
          // access
          minDate: min_date.format(RP_formats.default),
          maxDate: max_date.format(RP_formats.default),
          // range
          startDate: start_date.format(RP_formats.default),
          endDate  : end_date.format(RP_formats.default),
          // locale
          locale         : {
            format     : RP_formats.default,
            separator  : RP_separator.arrow,
            cancelLabel: 'Clear'
          },
          opens          : 'center',
          drops          : 'down',
          autoApply      : false,
          autoUpdateInput: false,
          ranges         : {
            "Today"       : [moment(), moment()],
            "Yesterday"   : [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days" : [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "Month to Now": [moment().startOf("month"), moment().endOf("month")],
            "Last Month"  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            "Last 3 Month": [moment().subtract(3, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "Last 6 Month": [moment().subtract(6, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "This Year"   : [moment().startOf("year"), moment().endOf("year")]
          }
        }
      case plg.rangePicker.method.quarter:
        start_date = moment(appDates.range.from);
        end_date = moment(appDates.range.to);
        return {
          // access
          minDate: min_date.format(RP_formats.default),
          maxDate: max_date.format(RP_formats.default),
          // range
          startDate: start_date.format(RP_formats.default),
          endDate  : end_date.format(RP_formats.default),
          // locale
          locale         : {
            format     : RP_formats.default,
            separator  : RP_separator.arrow,
            cancelLabel: 'Clear'
          },
          opens          : 'center',
          drops          : 'down',
          autoApply      : false,
          autoUpdateInput: false,
          ranges         : {
            "Today"       : [moment(), moment()],
            "Yesterday"   : [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days" : [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "Month to Now": [moment().startOf("month"), moment().endOf("month")],
            "Last Month"  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            "Last 3 Month": [moment().subtract(3, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "Last 6 Month": [moment().subtract(6, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "This Year"   : [moment().startOf("year"), moment().endOf("year")]
          }
        }
      case plg.rangePicker.method.mixed:
        start_date = moment(appDates.range.from);
        end_date = moment(appDates.range.to);
        return {
          // access
          minDate: min_date.format(RP_formats.default),
          maxDate: max_date.format(RP_formats.default),
          // range
          startDate: start_date.format(RP_formats.default),
          endDate  : end_date.format(RP_formats.default),
          // locale
          locale         : {
            format     : RP_formats.default,
            separator  : RP_separator.arrow,
            cancelLabel: 'Clear'
          },
          opens          : 'center',
          drops          : 'down',
          autoApply      : false,
          autoUpdateInput: false,
          ranges         : {
            "Today"       : [moment(), moment()],
            "Yesterday"   : [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days" : [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "Month to Now": [moment().startOf("month"), moment().endOf("month")],
            "Last Month"  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            "Last 3 Month": [moment().subtract(3, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "Last 6 Month": [moment().subtract(6, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "This Year"   : [moment().startOf("year"), moment().endOf("year")]
          }
        }
      case plg.rangePicker.method.ndays:
        start_date = moment(appDates.range.from);
        end_date = moment(appDates.range.to);
        return {
          // access
          minDate: min_date.format(RP_formats.default),
          maxDate: max_date.format(RP_formats.default),
          // range
          startDate: start_date.format(RP_formats.default),
          endDate  : end_date.format(RP_formats.default),
          // locale
          locale         : {
            format     : RP_formats.default,
            separator  : RP_separator.arrow,
            cancelLabel: 'Clear'
          },
          opens          : 'center',
          drops          : 'down',
          autoApply      : false,
          autoUpdateInput: false,
          ranges         : {
            "Today"       : [moment(), moment()],
            "Yesterday"   : [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days" : [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "Month to Now": [moment().startOf("month"), moment().endOf("month")],
            "Last Month"  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            "Last 3 Month": [moment().subtract(3, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "Last 6 Month": [moment().subtract(6, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "This Year"   : [moment().startOf("year"), moment().endOf("year")]
          }
        }
      case plg.rangePicker.method.fiscal:
        start_date = moment(appDates.range.from);
        end_date = moment(appDates.range.to);
        return {
          // access
          minDate: min_date.format(RP_formats.default),
          maxDate: max_date.format(RP_formats.default),
          // range
          startDate: start_date.format(RP_formats.default),
          endDate  : end_date.format(RP_formats.default),
          // locale
          locale         : {
            format     : RP_formats.default,
            separator  : RP_separator.arrow,
            cancelLabel: 'Clear'
          },
          opens          : 'center',
          drops          : 'down',
          autoApply      : false,
          autoUpdateInput: false,
          ranges         : {
            "Today"       : [moment(), moment()],
            "Yesterday"   : [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days" : [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "Month to Now": [moment().startOf("month"), moment().endOf("month")],
            "Last Month"  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            "Last 3 Month": [moment().subtract(3, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "Last 6 Month": [moment().subtract(6, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "This Year"   : [moment().startOf("year"), moment().endOf("year")]
          }
        }

      default:
        return {
          singleDatePicker: true,
          showDropdowns   : true,
          minYear         : 1901,
          maxYear         : parseInt(moment().format("YYYY"), 12)
        }
    }
  }

  const _getCallback = (method, uid) => {
    return function (start, end, text) {
      const val = {};
      val.start = start.format('YYYY-MM-DD');
      val.end = end.format('YYYY-MM-DD');
      Values[uid] = val;
    }
  }

  const reformat = (startDate, endDate) => {
    return startDate.format(RP_formats.human) + RP_separator.arrow + endDate.format(RP_formats.human);
  }

  const execute = (range) => {

    // check the status.
    if (range.getAttribute(atr.status.initiated) === '1') {
      return;
    }
    const $range = $(range);
    // create new unique id.
    const uid = KTUtil.getUniqueId('range');
    // get method
    method = range.getAttribute(atr.core.method);

    const options = _getOptions(method);
    const callback = _getCallback(method, uid);

    // init the plugin.
    rangeInstance[uid] = $range.daterangepicker(options, callback);

    // reformat date.
    //    $range.val(reformat(rangePickerObj[uid].startDate, rangePickerObj[uid].endDate));

    // events
    $range.on('apply.daterangepicker', function (ev, picker) {
      $(this).val(reformat(picker.startDate, picker.endDate));
    });
    // create range on cancel button.
    $range.on('cancel.daterangepicker', function (ev, picker) {
      $(this).val('');
    });

    // update the status.
    range.setAttribute(atr.plugins.id, uid);
    range.setAttribute(atr.status.initiated, '1');
  }

  const _run = (element, control) => {


    const _form = (form) => {
      _execute(form.querySelectorAll(querySA(atr.core.control, kws.plugin.range)));
    }

    const _collective = () => {
      element.querySelectorAll('form' + querySA(atr.core.control, control)).forEach((form) => {
        _form(form);
      });
    }

    const _toRun = () => {
      if (element.tagName === 'FORM') {
        control === false || element.getAttribute(atr.core.control) === control
          ? _form(element)
          : printError('form element does not have the control attribute');
      }
      else {
        _collective()
      }
    }
    _toRun();
  }

  // rangePicker Init.
  function _execute(ranges) {
    ranges.forEach(execute);
  }

  function _initialize() {
    // update the appDates object with the new data.
    appDates.default = getDatesData('default');
    appDates.format = getDatesData('format');
    appDates.active = getDatesData('active');
    appDates.range = getDatesData('range');
    appDates.fiscal = getDatesData('fiscal');
    appDates.licence = getDatesData('licence');

    console.log(appDates);
  }

  const _page = () => {
    // get all the select elements [inside or outside of a form]
    const rangeNodeList = PBapp.querySelectorAll(querySA(atr.core.control, kws.plugin.range));
    // filter out the selects outside a form
    const rangeDirects = [].slice.call(rangeNodeList).filter((range) => {
      return !range.closest('form');
    });
    // execute:
    _execute(rangeDirects);
  }

  function _destroy(input) {
    const uid = input.getAttribute(atr.plugins.id);
    if (rangeInstance.hasOwnProperty(uid)) {
      rangeInstance[uid].remove();
      delete rangeInstance[uid];
    }
  }

  // Public methods
  return {

    $_init: function () {
      return _initialize();
    },

    $_get: function (instanceID, type) {

      switch (type ?? kws.labels.instance) {
        case kws.labels.value:
          return Values[instanceID] ?? {
            start: '',
            end  : ''
          };

        case kws.labels.instance:
          return rangeInstance.hasOwnProperty(instanceID)
            ? rangeInstance[instanceID] : null;
      }
    },

    $_page: function () {
      _page();
    },

    $_manual: function (element, control = false) {
      _run(element, control);
    },

    $_single: function (input) {
      _execute([input])
    },

    $_destroy: function (input) {
      _destroy(input);
    }
  };
};

const plg_rangePicker = fun();
export default plg_rangePicker;