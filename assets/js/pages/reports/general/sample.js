export const PB_RG_sample = function () {

  // Shared variables
  let StateData, formData, redData, tableEle, filterEle;
  var ajaxResponse;
  let tableObject = [];

  // Private functions
  function sales_ajaxCalling(button, params = []) {
    let response;

    console.log(button);

    // [button.value, button.getAttribute('name')]
    const btnValue = button[0];
    const btnType = button[1];

    console.log(btnType)

    switch (btnValue) {
      case pb.rpt.general:
        // base data calling
        // var fetchData = JSON.parse(responseData["key"])
        switch (btnType) {
          case 'page':
            response = {
              rows  : {
                items   : {},
                employee: {},
              },
              status: true
            }
            break;
          case 'state':
            response = {
              rows  : {},
              status: true
            }
            break;
        }
        break;

      case pb.rpt.general.sample.p.simple:
        // call the ajax
        // var fetchData = JSON.parse(responseData["key"])
        switch (btnType) {
          case 'tab':
            response = {
              rows  : {
                customers :
                  {
                    // [cid, name, prefix, alias, category_id, status];
                    21: [21, 'Lokesh Kumar', '0', 'lucky', '2', '1'],
                    22: [22, 'Naveen Kumar', '0', 'vicky', '2', '1'],
                    23: [23, 'Suresh Kumar', '0', 'suri', '2', '0'],
                    24: [24, 'Rakesh Kumar', '0', 'rakhi', '3', '1'],
                  },
                categories:
                  {
                    // gid, name
                    2: [2, 'Govt Vehicles'],
                    3: [3, 'Regular Customers'],
                    4: [4, 'Agriculture Customers'],
                  },
              },
              status: true
            }
            break;

          case 'report':
            console.log(params);
            response = {
              rows  :
                {
                  data : {
                    // [0:id, 1:date_id, 2:item_id, 3:rate, 4:qty, 5:unit, 6:amount, 7:slip, 8:token, 9:vehicles]
                    12: [234, '12', 1, '87.60', '171.23', 1, '15000', '', '132', 'RJ 14 GA 3423'],
                    13: [406, '13', 2, '89.20', '168.16', 1, '16000', '', '132', 'RJ 12 GA 2423'],
                    14: [496, '14', 3, '87.60', '171.23', 1, '17000', '', '132', 'RJ 12 GA 2425'],
                    15: [505, '15', 4, '87.60', '171.23', 4, '18000', '', '132', 'RJ 42 GA 3333'],
                    16: [232, '16', 1, '87.60', '171.23', 1, '15000', '', '132', 'RJ 14 GA 3423'],
                    17: [434, '17', 2, '89.20', '168.16', 1, '36000', '', '132', 'RJ 12 GA 2423'],
                    18: [488, '18', 2, '87.60', '171.23', 1, '27000', '', '132', 'RJ 12 GA 2425'],
                    19: [590, '19', 1, '87.60', '171.23', 4, '28000', '', '132', 'RJ 42 GA 3333']
                  },
                  items: {
                    1: [1, 'Diesel'],
                    2: [2, 'Petrol'],
                    3: [3, 'Speed'],
                    4: [4, 'MAK 4T'],
                  },
                  units: {
                    1: [1, 'LTR'],
                    4: [4, 'PCS'],
                  },
                  dates: {
                    12: ['2023-01-01'],
                    13: ['2023-01-04'],
                    14: ['2023-01-06'],
                    15: ['2023-01-09'],
                    16: ['2023-01-10'],
                    17: ['2023-01-13'],
                    18: ['2023-01-15'],
                    19: ['2023-01-20']
                  }
                },
              status: true
            }
            break;
        }
        break;

      case pb.rpt.general.sample.p.nested:
        // call the ajax
        // var fetchData = JSON.parse(responseData["key"])
        switch (btnType) {
          case 'tab':
            response = {
              rows  : {
                groups:
                  {
                    // gid, name, prefix, counts, counts, status
                    2: [2, 'Govt Vehicles', '2', '10 A/cs', '10', '1'],
                    3: [3, 'Regular Customers', '2', '10 A/cs', '10', '1'],
                    4: [4, 'Agriculture Customers', '2', '10 A/cs', '10', '1'],
                  },
              },
              status: true
            }
            break;

          case 'report':
            console.log(params);
            response = {
              rows  :
                {
                  data: {
                    // [id, date, item_id, rate, qty, amount, slip, token]
                    12: [234, '2022-12-12', 1, '87.60 /Ltr', '171.23', '15,000', '', ' 132212334'],
                    13: [406, '2022-03-23', 2, '89.20 /Ltr', '168.16', '15,000', '', ' 132212334'],
                    14: [496, '2022-12-12', 3, '87.60 /Ltr', '171.23', '15,000', '', ' 132212334'],
                    15: [505, '2022-12-12', 4, '87.60 /Ltr', '171.23', '15,000', '', ' 132212334']

                  }
                },
              status: true
            }
            break;
        }
        break;

      case pb.rpt.general.sample.p.advance:
        // call the ajax
        // var fetchData = JSON.parse(responseData["key"])
        switch (btnType) {
          case 'tab':
            response = {
              rows  : {
                customers:
                  {
                    // [cid, name];
                    21: [21, 'Lokesh Kumar'],
                    22: [22, 'Naveen Kumar'],
                    23: [23, 'Suresh Kumar'],
                    24: [24, 'Rakesh Kumar'],
                  },
                vehicles :
                  {
                    // vid, name, customer_id, type
                    342: [342, 'RJ 14 GA 4523', '21', '1'],
                    424: [424, 'RJ 34 FA 5345', '21', '3'],
                    426: [426, 'RJ 34 CA 9928', '21', '4'],
                    427: [427, 'RJ 34 CA 0897', '22', '4'],
                  }
              },
              status: true
            }
            break;
          case 'report':
            response = {
              rows  :
                {
                  data: {
                    // [id, customer ,  date, item_id, rate, qty, amount, slip, token]
                    12: [234, 'DPS School, India', '2022-12-12', 1, '87.60 /Ltr', '171.23', '15,000', '', ' 132212334'],
                    13: [406, 'Rahul Drum', '2022-03-23', 2, '89.20 /Ltr', '168.16', '15,000', '', ' 132212334'],
                    14: [496, 'DPS School, India', '2022-12-12', 3, '87.60 /Ltr', '171.23', '15,000', '', ' 132212334'],
                    15: [505, 'DPS School, India', '2022-12-12', 4, '87.60 /Ltr', '171.23', '15,000', '', ' 132212334']
                  }
                },
              status: true
            }
            break;
        }

        break;
    }


    if (!response.status) {
      console.log(JSON.stringify(response.rows))
      return false
    }
    return response.rows;
  }

  /**
   * this will be used for show page's base-0 data.
   */
  const pageData = (path) => {
    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act : 'auto',
      line: 'page'
    });
    ajax.callREQUEST({}, urlID, false);

    // call data from ajax
    const data = sales_ajaxCalling([path[2], 'page']);

    // calling render to place data
    console.log(data);
  }

  /**
   * preloaded data that will not change for this page
   */
  const stateData = (path) => {
    //
  }

  const dataTableCalling = (options, methods, profile, call) => {
    let DT_options = {};
    console.log(methods);
    // create options
    const end = PB_option_datatables.optionKeys();
    end.forEach((i) => {
      if (options[i]) {
        DT_options[i] = PB_option_datatables.building(i, methods[i], profile[i]);
      }
    })

    console.log(DT_options);

    let optionsObj = {};
    Object.entries(DT_options).forEach(([key, value]) => {
      optionsObj = {...optionsObj, ...value}
    })

    // console.log(optionsObj);

    // Init datatable --- more info on datatables: https://datatables.net/manual/
    tableObject[call] = plg_dataTables.$_manual(tableEle, optionsObj, 'new');

    // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
    /*
     tableObject[pb.rpt.general.sample.p.simple].on('draw', function () {
     console.log('i am call at the time of re-inti.')
     });
     */
  }

  const basicTableCalling = (tableProfile, type = 'array') => {
    // rendering data into table using above profile.
    redData = PB_render_table.$_simple(ajaxResponse.data, tableProfile, type);

    // have look into plain HTML table
    //console.log(redData);

    tableEle.appendChild(redData)

    // update table status
    tableEle.setAttribute('data-load-table', '1');

    // apply common renders
    $R_common_obj.$_call(tableEle);
  }

  const propertyDetails = (call) => {
    let tableProfile, profile, methods, options;
    switch (call) {
      case pb.rpt.general.sample.p.simple:
        tableProfile = {
          '0': {
            type  : rdR.table.cell.date,
            method: 'a',
            value : '1',
            param : ['a'],
            style : 0,
            css   : [true]
          },
          '1': {
            type  : rdR.table.cell.text,
            method: 'a',
            value : '2',
            param : [],
            style : 0,
            css   : []
          },
          '2': {
            type  : rdR.table.cell.text,
            method: 'a',
            value : '7',
            param : [],
            style : 0,
            css   : []
          },
          '3': {
            type  : rdR.table.cell.text,
            method: 'a',
            value : '8',
            param : [],
            style : 0,
            css   : []
          },
          '4': {
            type  : rdR.table.cell.amount,
            method: 'a',
            value : '3',
            param : [],
            style : 0,
            css   : []
          },
          '5': {
            type  : rdR.table.cell.text,
            method: 'c',
            value : '4,5',
            param : [],
            style : 0,
            css   : []
          },
          '6': {
            type  : rdR.table.cell.amount,
            method: 'a',
            value : '6',
            param : [],
            style : 0,
            css   : []
          },
          '7': {
            type  : rdR.table.cell.text,
            method: 'a',
            value : '9',
            param : [],
            style : 0,
            css   : [true]
          },
          // '8': {type: rdR.table.cell.act, method: 'c', value: '0', param: [], style: 100, css: ['pe-0 text-end', 100]},
        };
        methods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal',
        };
        options = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
        };
        profile = {
          0: [],
          1: [],
          2: []
        };
        break;
      case pb.rpt.general.sample.p.nested:
        //
        break;
      case pb.rpt.general.sample.p.advance:
        //
        break;
    }
    return {
      table  : tableProfile,
      options: options,
      methods: methods,
      profile: profile
    };
  }

  const filterEvents = (element, btnValue) => {
    element.querySelectorAll('select, input').forEach((value, key, parent) => {

      //let col = value.getAttribute('data-dt-column');

      switch (value.name) {
        case 'search':
          const regex = value.getAttribute('data-dt-regex') === '1';
          value.addEventListener('keyup', function (evt) {
            tableObject[btnValue].search(evt.target.value, regex).draw();
          })
          break;

        case 'select':
          value.addEventListener('change', function (evt) {
            var val = evt.target.value;
            if (val === 'all') val = '';
            tableObject[btnValue].column(evt.target.getAttribute('data-dt-column')).search(val).draw();
          })
          break;

        case 'clear':
          value.addEventListener('click', function (evt) {
            const iid = evt.target.getAttribute('data-pb-instance');
            console.log(iid);
            const fp = plg_datePicker.$_get(kws.labels.instance, iid)
            fp.clear();
            $.fn.dataTable.ext.search.push(function () { return true});
            tableObject[btnValue].draw();
          })
          break;

        case 'date':
          value.addEventListener('change', function (evt) {
            let dates;
            var val = evt.target.value;
            if (!val.includes(' to ')) {
              return;
            }
            else {
              //dates = val.split(' to ');
            }
            dates = plg_datePicker.$_get(kws.labels.value)[0];
            let min = moment(dates[0]).format('YYYY-MM-DD');
            let max = moment(dates[1]).format('YYYY-MM-DD');
            $.fn.dataTable.ext.search.push(
              function (settings, data, dataIndex) {
                let date = moment(data[evt.target.getAttribute('data-dt-column')]).format('YYYY-MM-DD');
                //console.log(date);
                //console.log(min, max);
                return (min === null && max === null) ||
                  (min === null && date <= max) ||
                  (min <= date && max === null) ||
                  (min <= date && date <= max);
              }
            );
            tableObject[btnValue].draw();
          })
          break;
      }
    })
  }

  // generate the advance interactive table for data present
  const reportGenerating = function (element, button) {

    // form for parameters
    formData = extend.collect.$_step(button.closest('form'));
    if (!formData) return false;
    // table for data loading
    tableEle = element.querySelector('table');
    filterEle = element.querySelector('[data-pb-target="filter"]');

    if (tableEle.getAttribute('data-load-table') === '1') return true;

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : button.value,
      line   : button.name,
      account: formData
    });
    ajax.callREQUEST({}, urlID, false);

    // get data from ajax
    ajaxResponse = sales_ajaxCalling([button.value, button.getAttribute('name')], formData);

    // matching the dataset
    ajaxResponse = extend.foreign.$_remote('single', ajaxResponse,
      [
        ['data', 'dates', 1, 0],
        ['data', 'items', 2, 1],
        ['data', 'units', 5, 1],
      ]);

    // creating a profile for table.
    if (!ajaxResponse) {
      redData = PB_render_table.$_zero(tableEle.querySelectorAll('thead>tr>th').length);
      return true;
    }

    const property = propertyDetails(button.value);

    basicTableCalling(property.table, 'array');

    dataTableCalling(property.options, property.methods, property.profile, button.value);

    // user is filtering
    filterEvents(filterEle, button.value);

    return true;
  }

  // tabsTarget functions
  const tab_sale_a = function (element, button) {

    //    console.log(element);
    if (button.hasAttribute('data-load-select')) return true;

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : button.value,
      line   : button.name,
      account: []
    });
    ajax.callREQUEST({}, urlID, false);

    // get data from ajax
    ajaxResponse = sales_ajaxCalling([button.value, button.getAttribute('name')], []);

    // value putting for category_id into customers.
    redData = extend.foreign.$_remote('single', ajaxResponse, [['customers', 'categories', 4, 1]]);

    $R_form_obj.$_run(rdR.form.method.selectOnly, redData, element);

    button.setAttribute('data-load-select', '1');
    return true;
  }

  const tab_sale_b = function (element, button) {

    if (button.hasAttribute('data-load-select')) return true;

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : button.value,
      line   : button.name,
      account: []
    });
    ajax.callREQUEST({}, urlID, false);

    ajaxResponse = sales_ajaxCalling([button.value, button.getAttribute('name')], []);

    $R_form_obj.$_run(rdR.form.method.selectOnly, ajaxResponse, element);

    button.setAttribute('data-load-select', '1');
    return true;
  }

  const tab_sale_c = function (element, button) {

    if (button.hasAttribute('data-load-select')) return true;

    const ajax = new AjaxPB();
    const urlID = ajax.buildingURL([], {
      act    : button.value,
      line   : button.name,
      account: []
    });
    ajax.callREQUEST({}, urlID, false);

    ajaxResponse = sales_ajaxCalling([button.value, button.getAttribute('name')], []);

    // value putting for category_id into customers.
    redData = extend.foreign.$_remote('single', ajaxResponse, [['vehicles', 'customers', 2, 1]]);

    $R_form_obj.$_run(rdR.form.method.selectOnly, ajaxResponse, element);

    button.setAttribute('data-load-select', '1');
    return true;
  }


  const tabsTarget = function (element, button) {
    switch (button.value) {
      case pb.rpt.general.sample.p.simple:
        return tab_sale_a(element, button);
      case pb.rpt.general.sample.p.nested:
        return tab_sale_b(element, button);
      case pb.rpt.general.sample.p.advance:
        return tab_sale_c(element, button);
    }
  }
  const reportsTarget = function (element, button) {
    return reportGenerating(element, button);
    /*
     switch (button.value) {
     case pb.rpt.general.sample.p.simple:
     return report_sale_a(element, button);
     case pb.rpt.general.sample.p.nested:
     return report_sale_b(element, button);
     case pb.rpt.general.sample.p.advance:
     return report_sale_c(element, button);

     } */
  }
  const tablesTarget = function (element, button) {
    switch (button.value) {
      case pb.rpt.general.sample.p.simple:
        return tab_sale_a(element, button);
      case pb.rpt.general.sample.p.nested:
        return tab_sale_b(element, button);
      case pb.rpt.general.sample.p.advance:
        return tab_sale_c(element, button);
    }
  }
  const backsTarget = function (element, button) {
    // destroy the datatable
    tableObject[button.value].clear().destroy();
    // tableObject[button.value].destroy();
    return true;
  }


  // Public methods
  return {

    RGS_tabs   : function (element, button) {
      return tabsTarget(element, button);
    },
    RGS_reports: function (element, button) {
      return reportsTarget(element, button);
    },
    RGS_tables : function (element, button) {
      return tablesTarget(element, button);
    },
    RGS_backs  : function (element, button) {
      return backsTarget(element, button);
    },

    // fetching all basic required details
    RGS_page: function (path) {
      pageData(path);
    },

    // fetching all upcoming required details
    RGS_pageOpen: function (path) {
      return stateData(path);
    },

  };
}();