import {kws, plg} from "../base/const.js";
import {atr} from "../base/attributes.js";
import {getDatesData} from "../bucket/dates.js";

// Class definition
var fun = function () {

  /*
   links for help (also bookmarked into dev@beanbyte.in account)
   1. https://flatpickr.js.org/options/
   2. https://flatpickr.js.org/examples/#disabling-all-dates-except-select-few
   3. https://flatpickr.js.org/examples/#disabling-specific-dates
   */

  // fetch from server.
  const aDates = ['2022-12-24', '2022-12-27', '2022-12-29'];
  let dateInstance = {};
  // application dates.
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
  // standard date formats
  const dateFormats = {
    // https://flatpickr.js.org/formatting/
    system          : 'Y-m-d',
    full            : 'Y-m-d',
    default         : 'd M, Y',
    long            : 'j F, Y',
    human           : 'd M, Y',
    c               : 'd M',
    dt_fmonth       : 'd F',
    m               : "j-M-y",
    defaultOnlyMonth: "m.y",
    onlyMonth       : "F Y",
  }

  let onChangeValue = [];

  // Private functions
  const dp_allConfigs = (date) => {
    return {
      onReady   : function () {
        this.jumpToDate(appDates.default.month);
      },
      altInput  : true,
      altFormat : dateFormats.long,
      dateFormat: dateFormats.system,

      minDate: "today",
      maxDate: new Date().fp_incr(14),

      onChange: function (selectedDates, dateStr) {
        console.log('User has selected: ' + dateStr)
      },

      onOpen: [
        function (selectedDates, dateStr, instance) {
          console.log(selectedDates)
        },
      ],

      onClose: function (selectedDates, dateStr, instance) {
        console.log(dateStr);
      },

      onDayCreate: function (dObj, dStr, fp, dayElem) {
        // Utilize dayElem.dateObj, which is the corresponding Date
        // dummy logic
        if (Math.random() < 0.15)
          dayElem.innerHTML += "<span class='event'></span>";

        else if (Math.random() > 0.85)
          dayElem.innerHTML += "<span class='event busy'></span>";
      }
    }
  }

  const dp_custom = (date) => {
    const format = date.getAttribute(atr.date.format) ?? 'full';
    return {
      onReady    : function () {
        this.jumpToDate(appDates.default.month);
      },
      defaultDate: date.value,
      altInput   : true,
      altFormat  : dateFormats[format],
      dateFormat : dateFormats.system,
      minDate    : appDates.active.min,
      maxDate    : appDates.active.max,
    };
  }

  const dp_simple = (date) => {
    return {
      onReady    : function () {
        this.jumpToDate(appDates.default.month);
      },
      onChange   : function (selectedDates, dateStr) {
        onChangeValue = [selectedDates, dateStr];
        console.log(onChangeValue);
      },
      defaultDate: appDates.default.date,
      minDate    : appDates.active.min,
      maxDate    : appDates.active.max,
    };
  }

  const dp_human = (date) => {
    return {
      onReady    : function () {
        this.jumpToDate(appDates.default.month);
      },
      defaultDate: date.value,
      altInput   : true,
      altFormat  : dateFormats.human,
      dateFormat : dateFormats.system,
      minDate    : appDates.active.min,
      maxDate    : appDates.active.max,
    };
  }

  const dp_advance = (date) => {
    return {
      onReady    : function () {
        this.jumpToDate(appDates.default.month);
      },
      defaultDate: date.value,
      altInput   : true,
      altFormat  : dateFormats.long,
      dateFormat : dateFormats.system,
      minDate    : appDates.active.min,
      maxDate    : appDates.active.max,

      onDayCreate: function (dObj, dStr, fp, dayElem) {
        if (aDates.includes(moment(dayElem.dateObj).format('YYYY-MM-DD'))) {
          dayElem.innerHTML += "<span class='cday dopen'></span>";
          // dayElem.innerHTML += "<span class='cday dclose'></span>";
        }
      }
    };
  }

  const dp_people = (date) => {
    return {
      onReady   : function () {
        this.jumpToDate(appDates.default.month);
      },
      altInput  : true,
      altFormat : dateFormats.long,
      dateFormat: dateFormats.system,
      minDate   : appDates.active.min,
      maxDate   : appDates.active.max,
    };
  }


  const dp_range = (date) => {
    return {
      altInput  : true,
      altFormat : dateFormats.human,
      dateFormat: dateFormats.system,
      mode      : "range",
      onChange  : function (selectedDates, dateStr) {
        onChangeValue = [selectedDates, dateStr];
      },
    };
  }
  const dp_month = (date) => {
    return {
      onReady    : function () {
        console.log(appDates.default.month)
        this.jumpToDate(appDates.default.month);
      },
      defaultDate: date.value,
      altInput   : true,
      //      altFormat  : dateFormats.onlyMonth,
      //      dateFormat : dateFormats.defaultOnlyMonth,
      plugins: [
        new monthSelectPlugin({
          shorthand : true, //defaults to false
          dateFormat: "m.y", //defaults to "F Y"
          altFormat : "F Y", //defaults to "F Y"
          theme     : "light" // defaults to "light"
        })
      ]

    };
  }

  const dp_multiple = (date) => {
    return {
      onReady    : function () {
        this.jumpToDate(appDates.default.month)
      },
      mode       : "multiple",
      conjunction: " to ",
      altInput   : true,
      altFormat  : dateFormats.m,
      dateFormat : dateFormats.system,
      //      defaultDate: ["2023-01-05", "2023-01-10"] // preloading multiple dates.
    };
  }

  /**
   * this function blocks the dates in the calendar from user selection
   * todo: need to connect disable with ajax configurations.
   * @param date
   * @param method
   */
  const dp_disabled = (date, method = 1) => {
    switch (method) {
      case 1:
        // it blocks dates from a calendar using array
        return {
          onReady: function () {
            this.jumpToDate(appDates.default.month);
          },
          // todo: get the disable date from server at the conditions
          disable   : ["2023-01-10", "2023-01-11", "2023-01-12", "2023-01-13", "2023-01-14", "2023-01-15", "2023-01-16", "2023-01-17"],
          dateFormat: dateFormats.system,
        };

      case 2:
        // it blocks dates from calendar using range
        // use-case: shift init, credit sales memo. salary payroll created.
        return {
          onReady   : function () {
            this.jumpToDate(appDates.default.month);
          },
          dateFormat: dateFormats.system,
          disable   : [
            {
              from: date.getAttribute('data-date-dis-fo'),
              to  : date.getAttribute('data-date-dis-to')
            }
          ]
        }

      case 3:
        // it blocks dates from calendar using function callback
        // use-case: user can not create entry of locked days.
        return {
          onReady   : function () {
            this.jumpToDate(appDates.default.month);
          },
          dateFormat: dateFormats.system,
          disable   : [
            function (date) {
              // return true to disable
              return (date.getDay() === 0 || date.getDay() === 1);

            }
          ]
        }
    }
  }

  /**
   * it can be used for subscription related date selection.
   * @param date
   * @param method
   */
  const dp_enable = (date, method = 1) => {
    switch (method) {
      case 1:
        // it opens dates from calendar using array
        // use-case:
        return {
          onReady: function () {
            this.jumpToDate(appDates.default.month);
          },
          // todo: get the disable date from server at the conditions
          enable    : ["2023-01-10", "2023-01-11", "2023-01-12", "2023-01-13", "2023-01-14", "2023-01-15", "2023-01-16", "2023-01-17"],
          dateFormat: dateFormats.system,
        };

      case 2:
        // it opens dates from calendar using range
        // use-case: shift init, credit sales memo. salary payroll created.
        return {
          onReady   : function () {
            this.jumpToDate(appDates.default.month);
          },
          dateFormat: dateFormats.system,
          enable    : [
            {
              from: date.getAttribute('data-date-en-fo'),
              to  : date.getAttribute('data-date-en-to')
            }
          ]
        };

      case 3:
        // it opens dates from calendar using function callback
        // use-case: user can not create entry of locked days.
        return {
          onReady   : function () {
            this.jumpToDate(appDates.default.month);
          },
          dateFormat: dateFormats.system,
          enable    : [
            function (date) {
              // return true to disable
              return (date.getDay() === 0 || date.getDay() === 1);

            }
          ]
        }

      case 4:
        let enableJSON = [];
        let dds = {};
        // subscription range
        if (date) {
          dds["from"] = document.querySelector('#date_start').innerText;
          dds["to"] = document.querySelector('#date_end').innerText;
          enableJSON.push(dds);
        }
        else {
          dds["from"] = date.getAttribute('data-pb-en-fo');
          dds["to"] = date.getAttribute('data-pb-en-to');
          enableJSON.push(dds);
        }
        return {
          onReady   : function () {
            this.jumpToDate(appDates.default.month)// take this to default month.
          },
          altInput  : true,
          altFormat : dateFormats.long,
          dateFormat: dateFormats.system,
          // NOTE: enable and disabled will not work together
          enable: enableJSON,
        }
    }
  }

  const _getOptions = (dateEle) => {
    // extra options
    const mType = dateEle.getAttribute(atr.date.type);

    switch (dateEle.getAttribute(atr.core.method)) {
      case plg.datePicker.method.simple:
        return dp_simple(dateEle);

      case plg.datePicker.method.custom:
        return dp_custom(dateEle);

      case plg.datePicker.method.human:
        return dp_human(dateEle);

      case plg.datePicker.method.advance:
        return dp_advance(dateEle);

      case plg.datePicker.method.people:
        return dp_people(dateEle);

      case plg.datePicker.method.multiple:
        return dp_multiple(dateEle);

      case plg.datePicker.method.month:
        return dp_month(dateEle);

      case plg.datePicker.method.range:
        return dp_range(dateEle);

      case plg.datePicker.method.disable:
        return dp_disabled(dateEle, plg.datePicker.type[mType]);

      case plg.datePicker.method.enable:
        return dp_enable(dateEle, plg.datePicker.type[mType]);
    }
  }

  const _execute = function (dates) {
    // loop through all the date picker elements.
    dates.forEach((date) => {
      // if the date picker is already initiated, then skip it.
      if (date.getAttribute(atr.status.initiated) === "1") {
        return;
      }
      // get options
      const options = _getOptions(date);

      // generate unique id for each date picker.
      const uid = KTUtil.getUniqueId('date_');

      // create a new instance of date picker.
      dateInstance[uid] = date.flatpickr(options);

      // set the unique id to the date picker.
      date.setAttribute(atr.plugins.id, uid);

      // set the initiated status to the date picker.
      date.setAttribute(atr.status.initiated, "1");

    })
  }

  const _run = (element, control) => {

    const _form = (form) => {
      _execute(form.querySelectorAll(querySA(atr.core.control, kws.plugin.date)));
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

  function _initialize() {

    // update the appDates object with the new data.
    appDates.default = getDatesData('default');
    appDates.active = getDatesData('active');
    appDates.format = getDatesData('format');
    // setting the default date format.
    dateFormats.default = appDates.format.date;
  }

  const _get = (instanceId, type) => {
    switch (type ?? kws.labels.instance) {
      case kws.labels.value:
        return onChangeValue;

      case kws.labels.instance:
        return dateInstance.hasOwnProperty(instanceId) ? dateInstance[instanceId] : null;
    }
  }

  const _page = () => {
    // get all the select elements [inside or outside of a form]
    const dateNodeList = PBapp.querySelectorAll(querySA(atr.core.control, kws.plugin.date));
    // filter out the selects outside a form
    const dateDirects = [].slice.call(dateNodeList).filter((select) => {
      return !select.closest('form');
    });
    // execute:
    _execute(dateDirects);
  }

  return {
    $_init: function () {
      return _initialize();
    },

    $_get: function (InstanceID, type = null) {
      return _get(InstanceID, type);
    },

    $_page: function () {
      _page();
    },

    $_manual: function (element, control = false) {
      _run(element, control);
      // _execute(element.querySelectorAll(querySA(atr.core.control, kws.plugin.date)));
    },

    $_single: function (input) {
      _execute([input]);
    }
  };
};

const plg_datePicker = fun();
export default plg_datePicker;