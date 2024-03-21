import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {exT, rdR} from "../../../base/const.js";

// Shared variables
let StateData, redData, formEl;
var ajaxResponse;
let tableObject = [];
let tableEle;


// Private functions
function lubes_ajaxCalling(button, params = []) {
  let response;

  // [button.value, button.getAttribute('name')]
  const btnValue = button[0];
  const btnType = button[1];

  switch (btnValue) {
    case pb.mng.products.lubes.n:
      switch (btnType) {
        case 'page':
          response = {
            'rows'  : {},
            'status': true
          };
          break;
        case 'state':
          response = {
            'rows'  : {},
            'status': true
          }
          break;
      }
      break;
    case 'lube-table':
      response = {
        'rows'  : {
          product: {
            //['id':int, 'icon':string url, 'product_name':string ,'SKU':string, 'SKU_value': int, 'tax_rate':int, 'full_tax_rate':'int', 'QTY': int, 'cost':int, 'price':int, 'valuation':int, 'status':int, 'unit':string]
            11: ['11', '11', 'Product 1', 'SKU', '234355', '11%', '100', '21', '21999', '5461', '43534', '0', '12'],
            12: ['12', '12', 'Product 2', 'SKU', '234355', '31%', '100', '99', '21999', '235431', '3453453', '1', '11'],
            13: ['13', '12', 'Product 3', 'SKU', '225355', '56%', '100', '32', '78999', '435341', '34534', '1', '11']
          },
          type   : {
            11: ["2."],
            12: ["3."]
          },
          unit   : {
            11: ["PCS"],
            12: ["SI"]
          },
        },
        'status': true
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
  // console.log(Object.keys(data));
  let Layout = PBapp.querySelector('#layout_zone');
  let Tables = Layout.querySelector('#tables_zone');


  loadTable(Tables);
}

/**
 * preloaded data that will not change for this page
 */
const staticData = (path) => {

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
          var iid = evt.target.getAttribute('data-pb-target');
          console.log(iid);
          var fp = plg_datePicker.instanceOnChange(iid)
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
          dates = plg_datePicker.valueOnChange()[0];
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
const getProfile = function (type) {
  let OPTION;
  let tableProfile, profile, methods, options;
  switch (type) {
    case 'product':
      OPTION = [3, ['card', 'card', 'action'], ['view-lubes', 'edit-lubes', 'delete-lubes']];
      tableProfile = {
        '0': {
          type  : rdR.table.cell.checkbox,
          method: 'a',
          value : '0',
          param : [2, 1],
          style : 0,
          css   : []
        },
        '1': {
          type  : rdR.table.cell.text,
          method: 'g',
          value : '1,2,3,4',
          param : [2, 1],
          style : 0,
          css   : []
        },
        '2': {
          type  : rdR.table.cell.text,
          method: 'a',
          value : '5',
          param : [2, 1],
          style : 0,
          css   : []
        },
        '3': {
          type  : rdR.table.cell.amount,
          method: 'a',
          value : '7',
          param : [],
          style : 0,
          css   : []
        },
        '4': {
          type  : rdR.table.cell.amount,
          method: 'a',
          value : '8',
          param : [],
          style : 0,
          css   : []
        },
        '5': {
          type  : rdR.table.cell.amount,
          method: 'a',
          value : '9',
          param : [],
          style : 0,
          css   : []
        },
        '6': {
          type  : rdR.table.cell.amount,
          method: 'a',
          value : '10',
          param : [],
          style : 0,
          css   : []
        },
        '7': {
          type  : rdR.table.cell.text,
          method: 'a',
          value : '11',
          param : [2, 1],
          style : 0,
          css   : []
        },
        '8': {
          type  : rdR.table.cell.dropdown,
          method: 'b',
          value : '0',
          param : OPTION,
          style : 1,
          css   : ['', 'end', 150]
        },
        '9': {
          type  : rdR.table.cell.text,
          method: 'a',
          value : '12',
          param : [2, 1],
          style : 0,
          css   : []
        },
      }
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
  }
  return {
    table  : tableProfile,
    options: options,
    methods: methods,
    profile: profile
  };
}
const renderTable = function (targetTableEle, ajaxResponse) {
  let renderedData;
  Object.keys(targetTableEle).forEach((key, index) => {
    let targetEle = tableEle = targetTableEle[key].querySelector('table');
    let filterEle = targetTableEle[key].querySelector('[data-pb-target="filter"]');
    let property = getProfile(key);

    if (ajaxResponse[key]) {
      //now we make the profile
      renderedData = PB_render_table.$_simple(ajaxResponse[key], property.table, 'array');

    }
    else {
      let columns;

      console.log('status has failed, table data :' + JSON.stringify(ajaxResponse));
      columns = targetEle.querySelectorAll('thead>tr>th').length;
      renderedData = PB_render_table.$_zero(columns);
    }

    // calling other basic plugin functions
    targetEle.appendChild(renderedData);
    $R_common_obj.$_call(targetEle);

    //datatable code
    dataTableCalling(property.options, property.methods, property.profile, key);

    // user is filtering
    filterEvents(filterEle, key);
  })

  // for enable dropdown in the table.
  KTMenu.init();
  return true;
}
let loadTable = function (element) {
  let targetTableEle = {
    product: element
  }

  ajaxResponse = lubes_ajaxCalling(['load-table', '']);

  extend.foreign.$_remote('single', ajaxResponse, [
      ['product', 'type', 1, 0],
      ['product', 'unit', 12, 0],
    ]
  );
  console.log(ajaxResponse)
  renderTable(targetTableEle, ajaxResponse);
}


// Public methods


// fetching all basic required details
export const MPL_page = function (path) {
  pageData(path);
};

// fetching all upcoming required details
export const MPL_state = function (path) {
  return staticData(path);
};

