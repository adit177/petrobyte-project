import OptionTables from "../options/tables.js";
import tablesManagement from "../profiles/tables.management.js";
import tablesReports from "../profiles/tables.reports.js";
import tablesOperations from "../profiles/tables.operations.js";
import tablesFinancials from "../profiles/tables.financials.js";
import tablesDashboards from "../profiles/tables.dashboards.js";
import tablesSettings from "../profiles/tables.setting.js";
import tablesCommunications from "../profiles/tables.communication.js";
import tablesSample from "../profiles/tables.sample.js";
import pb from "../base/structure.js";
import {exT, kws, rdR, CLS, otR, Lyt, deF, plg, sD, glob, STYLE} from "../../js/base/const.js";
import {$R_common_obj} from "../base/render.js";
import extend from "../extend/extend.js";
import {atr} from "../base/attributes.js";
import {get_thePathArr} from "../base/global.js";

class RenderTables extends OptionTables {

  #path;
  $tableObject;

  constructor() {
    super();
  }

  setPath(path) {
    this.#path = path;
  }

  getPath() {
    return this.#path;
  }

  //  path switching
  switchPath = (path, tag) => {
    // create a table object.
    switch (path[0]) {
      case pb.mng.n:
        this.$tableObject = new tablesManagement(path);
        break;

      case pb.opr.n:
        this.$tableObject = new tablesOperations(path);
        break;

      case pb.rpt.n:
        console.log("in rpt");
        this.$tableObject = new tablesReports(path);
        break;

      case pb.fin.n:
        this.$tableObject = new tablesFinancials(path);
        break;

      case pb.dsb.n:
        this.$tableObject = new tablesDashboards(path);
        break;

      case pb.set.n:
        this.$tableObject = new tablesSettings(path);
        break;

      case pb.com.n:
        this.$tableObject = new tablesCommunications(path);
        break;

      case pb.sam.n:
        this.$tableObject = new tablesSample(path);
        break;
    }
    // generate table profile.
    this.$tableObject.profileGenerate(path, tag);

  }

  #collection_of_child_table_headers = {
    operations: {
      transactions: {
        banking: {
          modal: ["txn_id", 'amount', 'charges', 'memo']
        }
      }
    }
  }

  #createHeader = (headerData = undefined, tag = '') => {
    if (headerData === undefined) {
      // get header from the collection.
      const path = get_thePathArr();
      headerData = this.#collection_of_child_table_headers[path[0]][path[1]][path[2]][tag] ?? [];
    }
    // if there is header then create thead and tr
    if (headerData.length > 0) {
      let th;
      // create thead and tr
      const thead = document.createElement('thead');
      const headTR = document.createElement('tr');
      headTR.classList.add('text-gray-500');


      // create th for each header
      headerData.forEach((thText, index) => {
        th = document.createElement('th');
        th.classList.add('py-2');
        th.setAttribute('data-index', index);
        th.innerText = thText.toUpperCase();
        headTR.appendChild(th);
      });

      // adding the tr to the thead
      thead.appendChild(headTR);
      // adding thead to the table
      return thead;
    }
    else {
      // no header data received.
      return false
    }
  }

  designRow = (shape = null) => {
    if (!shape) {
      shape = this.$tableObject.getShape;
    }
    console.log(shape);
    // creat row elements.
    let tr = document.createElement('tr');

    let tds = ``;
    console.log("TABLE", Object.keys(shape))
    Object.keys(shape).forEach((key) => {
      let value = [];
      console.log("shape keys", key)
      // if the value is a string then it will be a list.
      // for example the string is "1,2,3" then the value will be [1,2,3] and the value will be ["$$1$$","$$2$$","$$3$$"]
      if (shape[key].value.includes(',')) {
        shape[key].value.split(',').forEach(val => {
          // push the value with $$. because it will help to replace the value with the data.
          value.push("$$" + val + "$$");
        });
      }
      // if the value is not a string then it will be a number.
      else {
        value = "$$" + shape[key].value + "$$";
      }
      shape[key].value = value;

      // get the td element with the value.
      tds += super.cell_profile(shape[key])

    });
    tr.innerHTML = tds;
    return tr;
  }

  createRow = (data, template) => {

    // replace the value index with the data.

    let cloneTr = template.cloneNode(true);

    let cloneArr = cloneTr.innerHTML.split('$$');


    for (let i = 1; i < cloneArr.length; i += 2) {
      cloneArr[i] = data[cloneArr[i]];
    }

    cloneTr.innerHTML = cloneArr.join('');


    return cloneTr;
  }

  createRows = (data, template, key = 'id') => {

    let tbody = document.createElement('tbody');

    const _insert_order_item_list = (column) => {
      // making list of ledgers
      let title = "<ol class='mb-0'>";
      column.forEach((v, i) => {
        title += '<li>' + v + '</li>';
      });
      title += '</ol>';
      console.log(title);
      return title;
    }

    // replace the value index with the data.
    Object.keys(data).forEach(index => {
      let cloneTr = template.cloneNode(true);

      cloneTr.setAttribute(atr.table.rowID, data[index][key]);

      let cloneArr = cloneTr.innerHTML.split('$$');

      for (let i = 1; i < cloneArr.length; i += 2) {
        if (typeof data[index][cloneArr[i]] === 'object') {
          console.log(typeof data[index][cloneArr[i]]);
          if (cloneArr[i - 1].includes('data-bs-toggle="tooltip"')) {
            cloneArr[i] = _insert_order_item_list(data[index][cloneArr[i]]);
          }
          else {
            cloneArr[i] = data[index][cloneArr[i]].join(', ').substring(0, 30) + '...';
          }
        }
        else {
          cloneArr[i] = data[index][cloneArr[i]];
        }
      }

      cloneTr.innerHTML = cloneArr.join('');

      tbody.appendChild(cloneTr);
    });

    return tbody;
  }


  createNestedRows = (data, template) => {

  }

  #zero = (colspan, text) => {
    // create row elements.
    let tr = document.createElement('tr');
    // add text to the row.
    tr.innerHTML = '<td colspan="' + colspan + '" class="text-center">' + text + '</td>';
    // return tbody for append the into the table.
    return document.createElement('tbody').appendChild(tr);
  }

  /**
   * simple table.
   * render data into the table.
   * @param data
   * @param table
   * @param key
   * @returns {HTMLTableSectionElement}
   */
  #simple = (data, table, key) => {
    console.log("#simple", data, table, key);
    // getting the profile.
    this.switchPath(this.#path, table);


    // design the row for table using profile.

    const rowTemplate = this.designRow();


    // create all rows.
    const tbody = this.createRows(data, rowTemplate, key);


    return tbody;
  }

  #nested = (data, tableTag, header) => {

    console.log(data);
    // getting the profile of parent table.
    this.switchPath(this.#path, tableTag);
    // design the row for table using profile.
    const parent_row_template = this.designRow();

    // getting the profile of child table.
    this.switchPath(this.#path, tableTag + '_child');
    // design the row for table using profile.
    const child_row_template = this.designRow();

    console.log('parent_row_template', parent_row_template);
    console.log('child_row_template', child_row_template);

    // -----------------parent table-----------------
    let child_table, tbody, tr_parent, child_tr, child_td, th, rows;

    tbody = document.createElement('tbody');

    Object.keys(data.parent).forEach((index) => {

      const head_row_id = data.parent[index].id ?? index;
      console.log(head_row_id);

      // create the single row for parent table.
      tr_parent = this.createRow(data.parent[index], parent_row_template);
      tbody.appendChild(tr_parent);

      // create the single row for child table
      child_tr = document.createElement('tr');
      child_td = document.createElement('td');
      /* OLD.
       // set the colspan of th td because it should be equal to the number of columns in the parent table.
       td.colSpan = Object.keys(data.parent[index]).length;
       */
      // do a count to the parent profile.
      const dd = countSubstringOccurrences(parent_row_template.outerHTML, '<td ');
      console.log(dd);
      child_td.colSpan = dd;

      // new child table of parent table
      child_table = document.createElement('table');
      // add classes [table table-bordered table-responsive]
      child_table.classList.add('table', 'table-rounded', 'table-responsive', 'mb-0', 'bg-light', 'gs-4', 'gy-1');
      child_table.classList.add(...['border', 'border-2', 'border-gray-300']);
      child_table.classList.add(...['table-row-bordered', 'table-row-gray-300']);

      // create headers for the child table
      const passHeader = typeof header === 'string' ? [undefined, header] : [header, '']
      console.log(passHeader)
      const child_thead = this.#createHeader(passHeader[0], passHeader[1]);
      console.log('head for child table', child_thead);

      console.log(child_thead);
      // insert the head of the child table.
      if (child_thead !== false) child_table.appendChild(child_thead);

      // create all rows for child table
      if (data.child[head_row_id] && data.child[head_row_id].length > 0) {

        // create all rows for child table
        const tbody_child = this.createRows(data.child[head_row_id], child_row_template);

        console.log('child table', tbody_child);

        // append the tbody_child into the table.
        child_table.appendChild(tbody_child);
        child_td.appendChild(child_table);
        child_tr.appendChild(child_td);

        tbody.appendChild(child_tr);
      }
    });
    return tbody;
  }

  #advance = (data, table) => {
    table = document.createElement('table');
    // define the import table objects.
    // set row span and col span
    let row_span = {
      0: [],
      1: [],
      2: []
    };
    let col_span = {
      0: [],
      1: [],
      2: []
    };
    let headers = {
      0: [],
      1: [],
      2: []
    }

    const _header = (data) => {
      generate_header_profile(data);
      // create the header for the table
      const thead = document.createElement('thead');
      // create the first row of the header
      thead.appendChild(process_header(col_span[0], row_span[0], headers[0]));
      thead.appendChild(process_header(col_span[1], row_span[1], headers[1]));
      thead.appendChild(process_header(col_span[2], row_span[2], headers[2]));

      return thead;
    }
    const _body = (data) => {

      // getting the profile.
      this.switchPath(this.#path, table);

      // design the row for table using profile.
      const template = this.designRow();


      // create all rows.
      const tbody = this.createRows(data.body, template);

      // return tbody for append the into the table.
      return tbody;
    }

    table.appendChild(_header(data));
    table.appendChild(_body(data));


    const generate_header_profile = (data) => {

      // calculate the general row span
      let general_row_span = 1;

      // define the general row span if element exist in the block
      if (data.block.length) {
        general_row_span = 2;
      }
      // if target object block is object then our row span is 3
      data.block.forEach((key, index) => {
        let targetData = data.head[key];

        //set the general row span of element
        if (!Array.isArray(targetData)) {
          general_row_span = 3;
        }
      });

      // process the first row col span and row span
      data.head.header.forEach((value) => {
        if (value.includes('@')) {
          // calculate the col span for the special cell
          let block_key = value.split('@')[0];
          let block_value = value.split('@')[1];

          let tar_obj_key = data[block_key][block_value];

          // push the data into the headers
          headers[0].push(tar_obj_key);

          row_span[0].push(1);
          if (Array.isArray(data.head[tar_obj_key])) {
            col_span[0].push(data.head[tar_obj_key].length);
          }
          else {
            let count = 0;
            //traverse in object and calculate the col span
            Object.keys(data.head[tar_obj_key]).forEach((key) => {
              count += data.head[tar_obj_key][key].length;
            });
            col_span[0].push(count);
          }
        }
        else {
          headers[0].push(value);
          // push the col span and row span for the general cell
          col_span[0].push(1);
          row_span[0].push(general_row_span);
        }
      });

      // process the second row col span and row span
      data.block.forEach((tar_obj_key) => {
        if (Array.isArray(data.head[tar_obj_key])) {
          data.head[tar_obj_key].forEach((value) => {
            headers[1].push(value);
            col_span[1].push(1);

            if (general_row_span === 3) {
              row_span[1].push(2);
            }
            else {
              row_span[1].push(1);
            }
          });
        }
        else {
          Object.keys(data.head[tar_obj_key]).forEach((inner_key) => {
            headers[1].push(inner_key);
            col_span[1].push(data.head[tar_obj_key][inner_key].length);
            row_span[1].push(1);
          });
        }
      });

      // process the third row col span and row span
      data.block.forEach((tar_obj_key) => {
        if (!Array.isArray(data.head[tar_obj_key])) {
          Object.keys(data.head[tar_obj_key]).forEach((inner_key) => {
            data.data[tar_obj_key][inner_key].forEach((value) => {
              headers[2].push(value);

              col_span[2].push(1);
              row_span[2].push(1);
            });
          });
        }
      });
    }
    const process_header = (row_span = [], col_span = [], headers = []) => {
      let tr = document.createElement('tr');

      for (let i = 0; i < headers.length; i++) {
        let th = document.createElement('th');
        th.innerText = headers[i];
        th.rowSpan = row_span[i];
        th.colSpan = col_span[i];

        tr.appendChild(th);
      }

      return tr;
    }

    return table;
  }


  #advance_new = (headers, data, tableEl, indexes, profilePath) => {


    const generateHeaders = () => {
      if (!headers.header1 && !headers.header2) {
        const tr = tableEl.querySelector("thead tr");
        const children = [];
        let cs = 0;
        console.log(cs);
        tr.children.forEach((th, idx) => {
          children.push(th);
          console.log(children.length, indexes[cs][1])
          if (children.length - 1 === indexes[cs][1]) {
            console.log(indexes[cs][0])
            const pattern = headers[`${indexes[cs][0]}_pattern`];
            pattern.forEach((id) => {
              const header = headers[`${indexes[cs][0]}`][id];
              for (let key in header) {
                const newth = document.createElement("th");
                newth.setAttribute("is-dynamic-header", 1);
                newth.innerText = header[key];
                children.push(newth);
                if (cs + 1 < indexes.length) {
                  indexes[cs + 1][1]++;
                }
              }
            })
            if (cs + 1 < indexes.length) {
              cs++;
            }
          }
        });
        tr.innerHTML = "";
        tr.append(...children);
      }
      else {
        const thead = tableEl.querySelector("thead");
        const tr1 = tableEl.querySelector("thead tr");
        let rowSpan = 2;
        if (headers.header2) {
          rowSpan = 3;
        }
        let cs = 0;
        const children = [];
        tr1.children.forEach((th, idx) => {
          th.rowSpan = rowSpan;
          children.push(th);
          console.log(children.length, indexes[cs][1]);
          if (children.length - 1 === indexes[cs][1]) {

            const header = headers.header1[indexes[cs][0]];
            const type = typeof header;
            if (type === "string") {

              const colSpan = Object.keys(headers[indexes[cs][0]]).length *
                Object.keys(headers[indexes[cs][0]][Object.keys(headers[indexes[cs][0]])[0]]).length;
              console.log(colSpan);

              const newTh = document.createElement("th");

              newTh.setAttribute("is-dynamic-header", 1);
              newTh.innerText = header;
              newTh.rowSpan = 1;
              newTh.colSpan = colSpan;
              children.push(newTh);

              if (cs + 1 < indexes.length) {
                indexes[cs + 1][1]++;
                cs++;
              }
            }
            else {
              const colSpan = Object.keys(headers[indexes[cs][0]][Object.keys(headers[indexes[cs][0]])[0]]).length;
              const pattern = headers[indexes[cs][0] + "_pattern"];
              let inc = 0;
              pattern.forEach((id) => {
                const newTh = document.createElement("th");
                newTh.colSpan = colSpan;
                newTh.innerText = header[id];
                newTh.setAttribute("is-dynamic-header", 1);
                children.push(newTh);
                inc++;
              })
              if (cs + 1 < indexes.length) {
                indexes[cs + 1][1] += inc;
                cs++;
              }
            }
          }
        })

        tr1.innerHTML = "";
        tr1.append(...children);

        if (headers.header2) {

          // construct row 2 if exist
          const r2Children = [];
          for (let key in headers.header2) {

            const colSpan = Object.keys(headers[key][Object.keys(headers[key])[0]]).length;

            const pattern = headers[`${key}_pattern`];
            console.log(pattern);

            pattern.forEach((id) => {
              const newTh = document.createElement("th");
              newTh.colSpan = colSpan;
              newTh.innerText = headers.header2[key][id]
              r2Children.push(newTh);

            })

          }
          const tr2 = document.createElement("tr");
          tr2.append(...r2Children);
          thead.appendChild(tr2);
        }

        const newChildren = [];
        console.log(indexes);

        indexes.forEach((val) => {

          const header = val[0];

          const pattern = headers[`${header}_pattern`];
          pattern.forEach((id) => {
            const head = headers[header][id];

            for (let key in head) {
              const newTh = document.createElement("th");
              newTh.innerText = head[key];
              newChildren.push(newTh);
            }
          })

        })
        const tr3 = document.createElement("tr");
        tr3.append(...newChildren);
        thead.appendChild(tr3);

      }

    }


    const getBody = () => {
      this.switchPath(this.#path, profilePath);

      const shape = this.$tableObject.getShape;
      console.log(shape);

      const newShapeArr = [];
      Object.keys(shape).forEach((key) => {
        const valArr = shape[key]["value"].split("@");
        const val1 = valArr[0];

        if (newShapeArr.length > 0) {
          const prvShapeValue = newShapeArr[newShapeArr.length - 1];

          const prvValArr = prvShapeValue[0]["value"].split("@");

          let prvVal1 = prvValArr[0];

          if (val1 === prvVal1) {
            newShapeArr[newShapeArr.length - 1].push(shape[key]);
          }
          else {
            newShapeArr.push([shape[key]]);
          }
        }
        else {
          newShapeArr.push([shape[key]]);
        }
      })

      console.log(newShapeArr);

      let finalShapeArr = [];
      newShapeArr.forEach((shapes) => {

        const valArr = shapes[0].value.split("@");
        const val1 = valArr[0];
        if (headers[val1]) {

          let pattern = headers[`${val1}_pattern`];

          pattern.forEach((id) => {

            shapes.forEach((sh) => {
              const val = sh.value.split("@")[1];
              const newVal = val + "_" + id;
              const newSh = {...sh};
              newSh.value = newVal;
              finalShapeArr.push(newSh);
            })

          })

        }
        else {
          finalShapeArr.push(shapes[0]);
        }
      })

      let finalShape = Object.assign({}, finalShapeArr);
      const template = this.designRow(finalShape);
      console.log(template);

      const tbody = this.createRows(data, template);

      return tbody;
    }

    generateHeaders();

    return getBody();


  }


  addSearchListeners = (tableId, element, dt) => {
    console.log("attaching event listeners");
    element.querySelectorAll(`.table-input[data-pb-catch=${tableId}]`).forEach((ele) => {
      console.log(ele);
      let indexes = ele.getAttribute("data-col-index");
      if (indexes === "-1") {
        // global search
        ele.addEventListener("input", (event) => {
          console.log("global search");
          dt.search(event.target.value).draw();
        })
      }
      else {
        indexes = indexes.split(",");
        for (let i = 0; i < indexes.length; i++) {
          indexes[i] = parseInt(indexes[i]);
        }
        console.log(indexes);
        const eventType = ele.getAttribute("data-filter-event");
        if (eventType === "select") {
          $(ele).on(kws.listen.select2, function (event) {
            const val = event.params.data.text;
            dt.columns(indexes).search(val).draw();
          });
          $(ele).on("select2:unselecting", function (event) {
            dt.columns(indexes).search("").draw();
          });
        }
        else if (eventType === "text") {

        }
        else if (eventType === "group_by") {

          $(ele).on(kws.listen.select2, function (event) {
            const val = event.params.data.id;
            console.log(val, event.params.data);
            const col = dt.column(val);
            col.order("asc");
            dt.rowGroup().dataSrc(col.dataSrc());
            dt.rowGroup().enable().draw();
          });
          $(ele).on("select2:unselecting", function (event) {
            dt.rowGroup().disable();
            dt.draw();
          });
        }
        // attaching column listeners
      }
    })
    return true;
  }


  addNestedSearchListeners = (tableId, element, dt) => {
    element.querySelectorAll(`.table-input[data-pb-catch=${tableId}]`).forEach((ele) => {
      console.log(ele);
      let indexes = ele.getAttribute("data-col-index");
      if (indexes === "-1") {
        console.log("attaching global search in nested table");
        // global search
        ele.addEventListener("input", (event) => {
          console.log("global search in nested table");
          let serachQuery = event.target.value;
          dt.rows().every(function (rowIdx, tableLoop, rowLoop) {
            const row = dt.row(rowIdx);
            if (row.child()) {
              const table = row.child().find("table").get(0);
              const childDt = $(table).DataTable({"bRetrieve": true});
              childDt.search(event.target.value);
              if (childDt.rows({search: "applied"}).count() > 0) {
                serachQuery = serachQuery + "|" + row.data()._id;
              }
            }
          });
          dt.search(serachQuery, true, false).draw();
        });
      }
    })
  }

  addExportButtons = (tableId, element, dt) => {
    element.querySelectorAll(`.${tableId}-export-button`).forEach((btn) => {
      const export_method = btn.getAttribute("data-export-method");
      if (export_method === "excel") {
        btn.addEventListener("click", () => {
          dt.button(".buttons-excel").trigger();
        })
      }
      else if (export_method === "pdf") {
        btn.addEventListener("click", () => {
          dt.button(".buttons-pdf").trigger();
        })
      }
      else if (export_method === "colvis") {
        btn.addEventListener("click", () => {
          dt.button(".buttons-colvis").trigger();
        })
      }
    })
  }


  #create_dt_columns = (shape, data) => {
    const columns = [];

    Object.keys(shape).forEach((key) => {
      let column = {};
      let value = [];

      // if the value is a string then it will be a list.
      // for example the string is "1,2,3" then the value will be [1,2,3] and the value will be ["$$1$$","$$2$$","$$3$$"]
      if (shape[key].value.includes(',')) {
        column.data = {};
        shape[key].value.split(',').forEach(val => {
          column.data[val] = val;
          // push the value with $$. because it will help to replace the value with the data.
          value.push("$$" + val + "$$");
        });
      }
      // if the value is not a string then it will be a number.
      else {
        column.data = shape[key].value;
        value = "$$col-data$$";

      }
      shape[key].value = value;

      const cell_profile = super.cell_profile(shape[key]);

      console.log(cell_profile);

      column.render = function (data, type, row, meta) {


        const cellArr = cell_profile.split("$$");

        for (let i = 1; i < cellArr.length; i = i + 2) {
          if (cellArr[i] === "col-data") {
            cellArr[i] = data;
          }
          else {
            cellArr[i] = data[cellArr[i]];
          }
        }
        return cellArr.join("");
      }

      const options = shape[key].options
      let newColumn = {...column, ...options}

      console.log(newColumn);

      columns.push(newColumn);
    });

    return columns;
  }

  #simple_dt = (data, tableId, element, profilePath, dtClickListener) => {

    console.log(element);


    console.log("initializing dt");
    DataTable.ext.search.pop();

    extend.reset.$_simple_form(element);

    console.log(DataTable.ext.search.length);
    let dateEl = element.querySelector("#" + tableId + "-date-range-filter");


    console.log("popping the search");
    let dataTable
    if (!$.fn.DataTable.isDataTable("#" + tableId)) {
      this.switchPath(this.#path, profilePath);
      const options = this.$tableObject.getOptions;

      const shape = this.$tableObject.getShape;
      console.log(shape);
      // creat row elements.

      console.log(data);
      dataTable = $("#" + tableId).DataTable({
        "bRetrieve": true,
        searching  : true,
        data       : data,
        columns    : this.#create_dt_columns(shape, data),
        rowGroup   : {
          emptyDataGroup: null,
          endRender     : function (rows, group) {
            let Sumltr = rows
              .data()
              .pluck("balance")
              .reduce(function (a, b) {
                return a + b;
              }, 0);
            Sumltr = $.fn.dataTable.render.number(',', '.', 2, '', '').display(Sumltr);

            let Sumamt = rows
              .data()
              .pluck("age")
              .reduce(function (a, b) {
                return a + b;
              }, 0);


            let cols = $('#fr_cols').text();
            let colr;
            switch (cols) {
              case '0':
                colr = '</tr>';
                break;
              case '1':
                colr = '<td class="kt-bg-light"></td></tr>';
                break;
              case '2':
                colr = '<td class="kt-bg-light" colspan="2"></td></tr>';
                break;
            }
            console.log(group);

            if (group) {
              return $('<tr/>')
                // .append('<tr>')
                .append('<td class="kt-font-bold kt-bg-light"></td>')
                .append('<td class="kt-font-bold kt-font-brand text-center py-1 kt-bg-light-metal" >' + Sumltr + '</td>')
                .append('<td class="kt-font-bold kt-font-dark text-center py-1 kt-bg-light-metal" >' + Sumamt + '</td>')
                .append(colr);
            }
          },
          //          dataSrc       : "isActive",
        },
        ...options
      });

      console.log(dataTable.rows().nodes());

      dataTable.rows().every((idx) => {
        $R_common_obj.$_call(dataTable.row(idx).node())
      })

      this.addSearchListeners(tableId, element, dataTable);

      this.addExportButtons(tableId, element, dataTable);

      dataTable.on("click", "tr", function () {
        let row = dataTable.row(this);
        const tr = row.node();
        if (tr) {
          const btn = tr.querySelector("button");
          if (btn) {
            btn.click();
          }
        }
      })


      if (dtClickListener) {
        console.log("registerning listener");
        dataTable.on("click", "td", dtClickListener);
      }

      if (dateEl) {

        const index = dateEl.getAttribute("data-col-index");
        dateEl.addEventListener("input", (e) => {
          const val = e.target.value;
          if (!val.includes("to")) {
            return true;
          }
          if (DataTable.ext.search.length === 0) {
            DataTable.ext.search.push(function (setting, data, dataIndex) {
              console.log("hi");
              if (setting.sTableId !== tableId) return true;
              let val = dateEl.value;
              const dates = val.split(" to ");
              let min = moment(dates[0]).format('YYYY-MM-DD');
              let max = moment(dates[1]).format('YYYY-MM-DD');
              let date = moment(data[index]).format("YYYY-MM-DD");
              return date >= min && date <= max;
            })
          }
          dataTable.draw();
        })

        const clearEl = element.querySelector("#" + tableId + "-date-range-filter-clear");
        clearEl.addEventListener("click", (evt) => {
          DataTable.ext.search.pop();
          const fp = flatpickr(`#${tableId}-date-range-filter`, {mode: 'range'});
          fp.clear();
          dataTable.draw();
        })
      }

    }
    else {
      console.log("clearing");
      dataTable = $("#" + tableId).DataTable({"bRetrieve": true});
      console.log(dataTable, data);
      dataTable.clear();
      dataTable.rows.add(data);
      dataTable.rowGroup().disable();
      dataTable.search("");
      dataTable.columns().search("").draw();

      dataTable.rows().every((idx) => {
        $R_common_obj.$_call(dataTable.row(idx).node())
      })

    }


    return dataTable;
  }

  #nested_dt = (data, tableId, element, profilePath, headers) => {

    const createHeaders = (headerData) => {
      if (headerData.length > 0) {
        let th;
        // create thead and tr
        const thead = document.createElement('thead');
        const headTR = document.createElement('tr');


        // create th for each header
        headerData.forEach((thText, index) => {
          th = document.createElement('th');
          th.setAttribute('data-index', index);
          th.innerText = thText;
          headTR.appendChild(th);
        });

        // adding the tr to the thead
        thead.appendChild(headTR);
        // adding thead to the table
        return thead;
      }
      // if there is no header then return empty string.
      else {
        return '';
      }
    }

    const createClone = (childShape) => {
      const newShape = {};
      for (let key in childShape) {
        newShape[key] = {...childShape[key]};
      }
      return newShape;
    }


    let dataTable;

    this.switchPath(this.#path, profilePath);
    const options = this.$tableObject.getOptions;

    const shape = this.$tableObject.getShape;
    console.log(shape);

    const tableCols = [
      {
        className     : 'dt-control',
        orderable     : false,
        data          : null,
        defaultContent: '',
      },
      ...this.#create_dt_columns(shape),
      {
        data   : "_id",
        visible: false
      }
    ]
    console.log(tableCols);
    // creat row elements.

    console.log(data);
    dataTable = $("#" + tableId).DataTable({
      searching     : true,
      data          : data.parent,
      columns       : tableCols,
      footerCallback: function (row, data, start, end, display) {
        var api = this.api();

        // Remove the formatting to get integer data for summation
        var intVal = function (i) {
          return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
        };

        // Total over all pages
        let total = api
          .column(2)
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);

        // Total over this page
        let pageTotal = api
          .column(2, {page: 'current'})
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);
        // Update footer
        $(api.column(2).footer()).html(pageTotal);
      },
      buttons       : ["pdf", "excel"],
      ...options
    });

    this.switchPath(this.#path, profilePath + '_child');
    const childShape = this.$tableObject.getShape;
    console.log(childShape);

    dataTable.rows().every((idx) => {
      const row = dataTable.row(idx);
      const rowData = row.data();
      const childData = data.child[rowData._id];
      if (childData) {
        console.log("executing child datatable");
        const table = document.createElement("table");
        const thead = createHeaders(headers);
        const tbody = document.createElement("tbody");
        table.appendChild(thead);
        table.appendChild(tbody);
        console.log(childData);
        const childId = `${tableId}-${rowData._id}`;
        table.id = childId;
        row.child(table);
        const childDt = $(table).DataTable({
          data      : childData,
          columns   : this.#create_dt_columns(createClone(childShape)),
          paging    : false,
          createdRow: function (row, data, dataIndex) {
            console.log(data);
          }
        })
        console.log(childShape);
      }
    })

    console.log(dataTable.rows().nodes());

    dataTable.rows().every((idx) => {
      $R_common_obj.$_call(dataTable.row(idx).node())
    })

    dataTable.on("click", "td.dt-control", function () {
      let tr = $(this).closest('tr');
      let row = dataTable.row(tr);
      if (row.child.isShown()) {
        row.child.hide();
      }
      else {
        row.child.show();
      }
    })

    this.addNestedSearchListeners(tableId, element, dataTable);

    this.addExportButtons(tableId, element, dataTable);


    return dataTable;

  }

  #destroy_nested_dt = (dt) => {
    dt.rows().every(function (rowIdx) {
      const row = dt.row(rowIdx);
      if (row.child()) {
        const table = row.child().find("table").get(0);
        const childDt = $(table).DataTable({"bRetrieve": true});
        childDt.destroy();
      }
    })
    dt.destroy();
    return true;
  }


  // render return functions
  $_zero = (colspan, text) => {
    return this.#zero(colspan, text);
  }


  $_simple = (data, table, key = 'id') => {
    return this.#simple(data, table, key);
  }

  $_nested = (data, table, header) => {
    return this.#nested(data, table, header);
  }

  $_advance = (data, table) => {
    return this.#advance(data, table);
  }

  $advance_new = (headers, data, table, indexes, profilePath) => {
    return this.#advance_new(headers, data, table, indexes, profilePath);
  }

  $simple_dt(data, tableId, Ele, profilePath, dtClickListener = null) {
    return this.#simple_dt(data, tableId, Ele, profilePath, dtClickListener)
  }

  $nested_dt(data, tableId, Ele, ProfilePath, headers) {
    return this.#nested_dt(data, tableId, Ele, ProfilePath, headers);
  }

  $destroy_nested_dt(dataTable) {
    return this.#destroy_nested_dt(dataTable);
  }
}

export default RenderTables;