"use strict";

// Class definition
var fun = function () {

  // Shared variables
  const DT_options =
          {
            0: 'options',
            1: 'features',
            2: 'buttons',
            3: 'columns',
            4: 'rows',
            //      5: '',
          };

  const option_details = {
    features: {
      0: 'scrollX',
      1: 'scrollY',
      2: 'autoWidth',
      3: 'ordering',
      4: 'paging',
      5: 'pageLength',
      6: 'processing',
    },
    columns : {
      0: 'columnDefs',
      1: 'columns',
      2: 'fixedCol',
      3: 'order',
      4: '',
      5: '',
    },
    buttons : {
      0: 'buttons',
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
    },
    sample  : {
      0 : '',
      1 : '',
      2 : '',
      3 : '',
      4 : '',
      5 : '',
      6 : '',
      7 : '',
      8 : '',
      9 : '',
      10: '',
      11: '',
      12: '',
      13: '',
    }
  };
  const DT_methods =
          {
            0: 'minimal',
            1: 'basic',
            2: 'simple',
            3: 'medium',
            4: 'advance',
            5: 'complex',
            6: 'custom'
          };


  // Private functions
  /*
   ----------------------------------------------------------------
   OPTIONS
   -------------------------------
   */

  /*
   ----------------------------------------------------------------
   TEMPLATE
   -------------------------------
   */

  const building_DT_Options = function (method, params) {
    const __lengthMenu = {
      0: [[5, 10, 15, 25, 50, 100, -1], ['5 Rows', '10 Rows', '15 Rows', '25 Rows', '50 Rows', '100 Rows', 'All Rows']],
      1: [[10, 25, 50, 100, -1], ['10 Rows', '25 Rows', '50 Rows', '100 Rows', 'All Rows']]
    }
    const _minimal = (a, b, c, d, e, f) => {
      return {
        // basic
        responsive: true,
        autoWidth : true,
        // pagination
        paging      : true,
        pageLength  : 10,
        lengthChange: true,
        lengthMenu  : __lengthMenu[0],
        // more
        keys  : true,
        select: true,
        // default search
        search: {
          regex: true,
          smart: false
        },
      }
    }
    const _basic = (a, b, c, d, e, f) => {
      return {
        responsive: {
          details: false
        },

      }
    }
    const _simple = (a, b, c, d, e, f) => {
      return {}
    }
    const _medium = (a, b, c, d, e, f) => {
      return {}
    }
    const _advance = (a, b, c, d, e, f) => {
      return {}
    }
    const _complex = (a, b, c, d, e, f) => {
      return {
        responsive: {
          breakpoints: [
            {
              name : 'bigdesktop',
              width: Infinity
            },
            {
              name : 'meddesktop',
              width: 1480
            },
            {
              name : 'smalldesktop',
              width: 1280
            },
            {
              name : 'medium',
              width: 1188
            },
            {
              name : 'tabletl',
              width: 1024
            },
            {
              name : 'btwtabllandp',
              width: 848
            },
            {
              name : 'tabletp',
              width: 768
            },
            {
              name : 'mobilel',
              width: 480
            },
            {
              name : 'mobilep',
              width: 320
            }
          ]
        },

      }
    }
    const _custom = (a, b, c, d, e, f) => {
      return {}
    }

    const [a, b, c, d, e, f] =
            [
              params[0] ?? false,
              params[1] ?? false,
              params[2] ?? false,
              params[3] ?? false,
              params[4] ?? false,
              params[5] ?? false,
            ]

    switch (method) {
      case DT_methods[0]:
        return _minimal(a, b, c, d, e, f);

      case DT_methods[1]:
        return _basic(a, b, c, d, e, f);

      case DT_methods[2]:
        return _simple(a, b, c, d, e, f);

      case DT_methods[3]:
        return _medium(a, b, c, d, e, f);

      case DT_methods[4]:
        return _advance(a, b, c, d, e, f);

      case DT_methods[5]:
        return _complex(a, b, c, d, e, f);

      case DT_methods[6]:
        return _custom(a, b, c, d, e, f);
    }
  }

  const building_DT_Features = function (method, params) {
    const _minimal = (a, b, c, d, e, f) => {
      return {
        // scroll
        scrollX       : false,
        scrollY       : '',
        scrollCollapse: false,
        // order
        ordering: true,
        order   : [[0, 'asc']],
      }
    }
    const _basic = (a = false, b = true, c = 500, d, e, f) => {
      return {
        // scroll
        scrollX       : a,
        scrollY       : c + "px",
        scrollCollapse: b,
        // order
        orderFixed  : [0, 'asc'],
        orderMulti  : true,
        orderClasses: true
      }
    }
    const _simple = (a, b, c, d, e, f) => {
      return {
        orderFixed: {
          pre : [0, 'asc'],
          post: [[0, 'asc'], [1, 'asc']]
        }
      }
    }
    const _medium = (a, b, c, d, e, f) => {
      return {}
    }
    const _advance = (a, b, c, d, e, f) => {
      return {}
    }
    const _complex = (a, b, c, d, e, f) => {
      return {}
    }
    const _custom = (a, b, c, d, e, f) => {
      return {}
    }

    const [a, b, c, d, e, f] =
            [
              params[0] ?? false,
              params[1] ?? false,
              params[2] ?? false,
              params[3] ?? false,
              params[4] ?? false,
              params[5] ?? false,
            ]

    switch (method) {
      case DT_methods[0]:
        return _minimal(a, b, c, d, e, f);

      case DT_methods[1]:
        return _basic(a, b, c, d, e, f);

      case DT_methods[2]:
        return _simple(a, b, c, d, e, f);

      case DT_methods[3]:
        return _medium(a, b, c, d, e, f);

      case DT_methods[4]:
        return _advance(a, b, c, d, e, f);

      case DT_methods[5]:
        return _complex(a, b, c, d, e, f);

      case DT_methods[6]:
        return _custom(a, b, c, d, e, f);
    }
  }

  const building_DT_Buttons = function (method, params) {
    const _minimal = (a, b, c, d, e, f) => {
      return {
        dom    : 'Blfrtip',
        buttons: {
          name   : 'primary',
          buttons: ['copy', 'print', 'csv', 'excel', 'pdf']
        }
      }
    }
    const _basic = (a, b, c, d, e, f) => {
      return {}
    }
    const _simple = (a, b, c, d, e, f) => {
      return {}
    }
    const _medium = (a, b, c, d, e, f) => {
      return {}
    }
    const _advance = (a, b, c, d, e, f) => {
      return {}
    }
    const _complex = (a, b, c, d, e, f) => {
      return {
        dom    : 'Blfrtip',
        buttons: [
          // Col-visible
          {
            extend: 'colvis',
            text  : '<span class="kt-font-brand fa fa-eye"></span>',
          },
          // print
          {
            extend: 'print',
            text  : 'Print',
            footer: true,
            // filename, title and message
            title        : 'title',
            messageTop   : '<p style="font-size: 16px">' + 'messageTop' + '</p>',
            messageBottom: '<p>messageBottom</p>',
            // short-key
            key: {
              altKey  : true,
              shiftKey: true,
              key     : 'n'
            },
            // options
            // autoPrint: true,
            // export option
            exportOptions: {
              columns: ':visible',
              search : 'applied',
              order  : 'applied',
              rows   : ':visible'
            },
            customize    : function (win) {
              // $(win.document.body).css('top', '100');
              $(win.document.body).prepend('<h2>' + 'pump_name' + '</h2>');
              $(win.document.body).prepend('<h4>' + 'file_subheader' + '</h4>');
              $(win.document.body).find('table').addClass('compact').css('font-size', '14px');
              $(win.document.body).find('h1').css('text-align', 'center').css('font-size', '18pt');
              $(win.document.body).find('h2').css('text-align', 'left').css('font-size', '20pt').css('color', '#353535');
              $(win.document.body).find('h4').css('text-align', 'right').css('color', '#909090');
              $(win.document.body).find('p').css('text-align', 'center');
              $(win.document.body).find('tfoot th').css('font-size', '18px').css('font-weight', '500');
            }
          },
          // CSV
          {
            extend: 'csvHtml5',
            text  : 'PB CSV',
            footer: true,
            // filename, title and message
            filename: 'filename',
            // short-key
            key          : {
              altKey  : true,
              shiftKey: true,
              key     : 'v'
            },
            exportOptions: {
              columns: ':visible',
              search : 'applied',
              order  : 'applied',
              rows   : ':visible'
            },
          },
          // excel
          {
            extend: 'excelHtml5',
            text  : 'PB Excel',
            footer: true,
            // filename, title and message
            filename     : 'filename',
            sheetName    : 'sheet-name',
            title        : 'title',
            messageTop   : 'messageTop',
            messageBottom: 'End of List',
            // short-key
            key: {
              altKey  : true,
              shiftKey: true,
              key     : 'e'
            },
            // options
            createEmptyCells: false,
            autoFilter      : true,
            // export option
            exportOptions: {
              columns: ':visible',
              search : 'applied',
              order  : 'applied',
              rows   : ':visible'
            },

            customize: function (xlsx) {
              var sheet = xlsx.xl.worksheets['sheet1.xml'];
              var style = xlsx.xl['styles.xml'];
              var numrows = 4;

              function _createNode(doc, nodeName, opts) {
                var tempNode = doc.createElement(nodeName);

                if (opts) {
                  if (opts.attr) {
                    $(tempNode).attr(opts.attr);
                  }

                  if (opts.children) {
                    $.each(opts.children, function (key, value) {
                      tempNode.appendChild(value);
                    });
                  }

                  if (opts.text !== null && opts.text !== undefined) {
                    tempNode.appendChild(doc.createTextNode(opts.text));
                  }
                }

                return tempNode;
              }

              // merge cells
              var mergeCells = $('mergeCells', sheet);
              mergeCells[0].appendChild(_createNode(sheet, 'mergeCell', {attr: {ref: 'A5:H5',}}));
              mergeCells[0].appendChild(_createNode(sheet, 'mergeCell', {attr: {ref: 'A6:H6',}}));

              mergeCells.attr('count', mergeCells.attr('count') + 1);

              // fonts update
              var tagName = style.getElementsByTagName('sz');
              for (var i = 0; i < tagName.length; i++) {
                tagName[i].setAttribute("val", "11")
              }

              //update Row
              $('row', sheet).each(function () {
                var attr = $(this).attr('r');
                var ind = parseInt(attr);
                ind = ind + numrows;
                $(this).attr("r", ind);
              });

              // Create row before data
              $('row c', sheet).each(function () {
                var attr = $(this).attr('r');
                var pre = attr.substring(0, 1);
                var ind = parseInt(attr.substring(1, attr.length));
                ind = ind + numrows;
                $(this).attr("r", pre + ind);
              });

              function Addrow(index, data) {
                var msg = '<row r="' + index + '">'
                for (var i = 0; i < data.length; i++) {
                  var key = data[i].key;
                  var value = data[i].value;
                  msg += '<c t="inlineStr" r="' + key + index + '">';
                  msg += '<is>';
                  msg += '<t>' + value + '</t>';
                  msg += '</is>';
                  msg += '</c>';
                }
                msg += '</row>';
                return msg;
              }

              var pump = 'pump_name';
              var now = new Date();
              var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
              //insert
              var r2 = Addrow(2, [
                {
                  key  : 'A',
                  value: pump
                }
              ]);
              var r3 = Addrow(3, [
                {
                  key  : 'A',
                  value: 'Created On: ' + jsDate
                }, {
                  key  : 'H',
                  value: 'file_subheader'
                }
              ]);

              sheet.childNodes[0].childNodes[1].innerHTML = r2 + r3 + sheet.childNodes[0].childNodes[1].innerHTML;

              // -- Rows and cells Updates
              // File Header
              $('row c[r="A2"]', sheet).attr('s', '51');
              $('row c[r="A3"]', sheet).attr('s', '3');
            }
          },
          // pdf
          {
            extend     : 'pdfHtml5',
            text       : 'PB PDF',
            pageSize   : 'A4',
            orientation: 'portrait', // 'portrait'
            pageMargins: [0, 0, 0, 0],
            footer     : true,

            // filename, title and message
            filename     : 'file-name',
            title        : 'file_title',
            messageTop   : 'message-top',
            messageBottom: 'message-bottom',
            key          : {
              shiftKey: true,
              altKey  : true,
              key     : 'p'
            },
            download     : 'open',
            exportOptions: {
              columns  : ':visible',
              columnGap: 10,
              search   : 'applied',
              order    : 'applied',
              rows     : ':visible',
              // columns: ':visible',
            },
            customize    : function (doc, btn, tbl) {

              console.log(btn);
              console.log(tbl);
              // console.log(doc);
              // doc.content.splice(0,0);
              var now = new Date();
              var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
              doc.pageMargins = [30, 50, 30, 50];
              doc.defaultStyle.noWrap = true;
              doc.defaultStyle.fontSize = 10;
              doc.defaultStyle.alignment = 'justify';
              delete doc.styles.tableBodyOdd.fillColor;

              // title
              doc.styles.title.bold = true;
              doc.styles.title.fontSize = 15;

              // header
              doc.styles.tableHeader.alignment = 'center';
              doc.styles.tableHeader.bold = true;
              doc.styles.tableHeader.color = '#000';
              doc.styles.tableHeader.fillColor = '#dedede';
              doc.styles.tableHeader.fontSize = 11;

              // table footer
              doc.styles.tableFooter.alignment = 'center';
              doc.styles.tableFooter.bold = false;
              doc.styles.tableFooter.color = '#000';
              doc.styles.tableFooter.fillColor = '#f3f3f3';
              doc.styles.tableFooter.fontSize = 11;

              // message
              doc.styles.message.alignment = 'center';
              doc.styles.message.color = '#737373';
              doc.styles.message.fontSize = 12;

              doc['header'] = (function () {
                const image64 = CreateImage_base64('')
                return {
                  columns: [
                    {
                      // image: 'data:image/png;base64,',
                      //                      image: image64,
                      //                      width: 48
                    },
                    {
                      alignment: 'left',
                      italics  : false,
                      text     : 'Header Name',
                      fontSize : 18,
                      margin   : [10, 0]
                    },
                    {
                      alignment: 'right',
                      fontSize : 14,
                      color    : '#666666',
                      text     : 'File Sub hreader',
                    }
                  ],
                  margin : [25, 25, 25, 25]
                }
              });
              doc['footer'] = (function (page, pages) {
                return {
                  columns: [
                    {
                      alignment: 'left',
                      fontSize : 7,
                      text     : ['PDF Created on: ', {text: jsDate.toString()}]
                    },
                    {
                      alignment: 'center',
                      fontSize : 7,
                      text     : ['PDF Created by PetroByte']
                    },
                    {
                      alignment: 'right',
                      fontSize : 7,
                      text     : ['Page ', {text: page.toString()}, ' of ', {text: pages.toString()}]
                    }
                  ],
                  margin : [25, 25, 25, 25]
                }
              });

              let objLayout = {};
              objLayout['hLineWidth'] = function (i) { return .5; };
              objLayout['vLineWidth'] = function (i) { return .5; };
              objLayout['hLineColor'] = function (i) { return '#5e5e5e'; };
              objLayout['vLineColor'] = function (i) { return '#5e5e5e'; };
              objLayout['paddingLeft'] = function (i) { return 4; };
              objLayout['paddingRight'] = function (i) { return 4; };
              doc.content[2].layout = objLayout;
            }
          }
        ],

      }
    }

    const _custom = (a, b, c, d, e, f) => {
      return {}
    }

    const [a, b, c, d, e, f] =
            [
              params[0] ?? false,
              params[1] ?? false,
              params[2] ?? false,
              params[3] ?? false,
              params[4] ?? false,
              params[5] ?? false,
            ]

    switch (method) {
      case DT_methods[0]:
        return _minimal(a, b, c, d, e, f);

      case DT_methods[1]:
        return _basic(a, b, c, d, e, f);

      case DT_methods[2]:
        return _simple(a, b, c, d, e, f);

      case DT_methods[3]:
        return _medium(a, b, c, d, e, f);

      case DT_methods[4]:
        return _advance(a, b, c, d, e, f);

      case DT_methods[5]:
        return _complex(a, b, c, d, e, f);

      case DT_methods[6]:
        return _custom(a, b, c, d, e, f);
    }
  }

  const building_DT_Columns = function (method, params) {
    const _minimal = (a, b, c, d, e, f) => {
      return {
        fixedColumns: false,
        //        columns: [
        //          // {searchable: false, name: 'name'},
        //          null, null, null, null, null, null, null, null
        //        ],
        //        columnDefs: [
        //          { targets: [0, 1], visible: true},
        //          { targets: '_all', visible: false }
        //        ]
      }
    }
    const _basic = (a, b, c, d, e, f) => {
      return {
        fixedColumns: {
          left: 2
        },
        columnDefs  : [
          {
            responsivePriority: 1,
            targets           : 2
          },
          {
            responsivePriority: 2,
            targets           : 11
          },
          // { width: 200, targets: 3 },
          {
            visible: false,
            targets: [0, 1, 3, 4]
          },
        ],
      }
    }
    const _simple = (a, b, c, d, e, f) => {
      return {}
    }
    const _medium = (a, b, c, d, e, f) => {
      return {}
    }
    const _advance = (a, b, c, d, e, f) => {
      return {}
    }
    const _complex = (a, b, c, d, e, f) => {
      return {}
    }
    const _custom = (a, b, c, d, e, f) => {
      return {}
    }

    const [a, b, c, d, e, f] =
            [
              params[0] ?? false,
              params[1] ?? false,
              params[2] ?? false,
              params[3] ?? false,
              params[4] ?? false,
              params[5] ?? false,
            ]

    switch (method) {
      case DT_methods[0]:
        return _minimal(a, b, c, d, e, f);

      case DT_methods[1]:
        return _basic(a, b, c, d, e, f);

      case DT_methods[2]:
        return _simple(a, b, c, d, e, f);

      case DT_methods[3]:
        return _medium(a, b, c, d, e, f);

      case DT_methods[4]:
        return _advance(a, b, c, d, e, f);

      case DT_methods[5]:
        return _complex(a, b, c, d, e, f);

      case DT_methods[6]:
        return _custom(a, b, c, d, e, f);
    }
  }

  const building_DT_Rows = function (method, params) {
    const _minimal = (a = false, b, c, d, e, f) => {
      return {
        rowGroup: a ? {dataSrc: 4} : false,
      }
    }
    const _basic = (a, b, c, d, e, f) => {
      return {}
    }
    const _simple = (a, b, c, d, e, f) => {
      return {}
    }
    const _medium = (a, b, c, d, e, f) => {
      return {}
    }
    const _advance = (a, b, c, d, e, f) => {
      return {}
    }
    const _complex = (a, b, c, d, e, f) => {
      return {}
    }
    const _custom = (a, b, c, d, e, f) => {
      return {}
    }

    const [a, b, c, d, e, f] =
            [
              params[0] ?? false,
              params[1] ?? false,
              params[2] ?? false,
              params[3] ?? false,
              params[4] ?? false,
              params[5] ?? false,
            ]

    switch (method) {
      case DT_methods[0]:
        return _minimal(a, b, c, d, e, f);

      case DT_methods[1]:
        return _basic(a, b, c, d, e, f);

      case DT_methods[2]:
        return _simple(a, b, c, d, e, f);

      case DT_methods[3]:
        return _medium(a, b, c, d, e, f);

      case DT_methods[4]:
        return _advance(a, b, c, d, e, f);

      case DT_methods[5]:
        return _complex(a, b, c, d, e, f);

      case DT_methods[6]:
        return _custom(a, b, c, d, e, f);
    }
  }

  const building_DT_sample = function (method, params) {
    const _minimal = (a, b, c, d, e, f) => {
      return {
        // basic
        responsive: true,

        // scroll
        scrollX       : false,
        scrollY       : 500 + "px",
        scrollCollapse: true,
        paging        : false,
        // column fix
        fixedColumns: {
          left: 2
        }

      }
    }
    const _basic = (a, b, c, d, e, f) => {
      return {
        responsive: {
          details: false
        },

      }
    }
    const _simple = (a, b, c, d, e, f) => {
      return {}
    }
    const _medium = (a, b, c, d, e, f) => {
      return {}
    }
    const _advance = (a, b, c, d, e, f) => {
      return {}
    }
    const _complex = (a, b, c, d, e, f) => {
      return {
        responsive: {
          breakpoints: [
            {
              name : 'bigdesktop',
              width: Infinity
            },
            {
              name : 'meddesktop',
              width: 1480
            },
            {
              name : 'smalldesktop',
              width: 1280
            },
            {
              name : 'medium',
              width: 1188
            },
            {
              name : 'tabletl',
              width: 1024
            },
            {
              name : 'btwtabllandp',
              width: 848
            },
            {
              name : 'tabletp',
              width: 768
            },
            {
              name : 'mobilel',
              width: 480
            },
            {
              name : 'mobilep',
              width: 320
            }
          ]
        },

      }
    }
    const _custom = (a, b, c, d, e, f) => {
      return {}
    }

    const [a, b, c, d, e, f] =
            [
              params[0] ?? false,
              params[1] ?? false,
              params[2] ?? false,
              params[3] ?? false,
              params[4] ?? false,
              params[5] ?? false,
            ]

    switch (method) {
      case DT_methods[0]:
        return _minimal(a, b, c, d, e, f);

      case DT_methods[1]:
        return _basic(a, b, c, d, e, f);

      case DT_methods[2]:
        return _simple(a, b, c, d, e, f);

      case DT_methods[3]:
        return _medium(a, b, c, d, e, f);

      case DT_methods[4]:
        return _advance(a, b, c, d, e, f);

      case DT_methods[5]:
        return _complex(a, b, c, d, e, f);

      case DT_methods[6]:
        return _custom(a, b, c, d, e, f);
    }
  }


  /*
   -------------------------------
   protected functions
   -------------------------------
   */
  const initOptions = (data) => {
    var option = {};

    // series
    option['series'] = data.dataset;
    // labels
    option['labels'] = data.labels;

    return option;
  }


  const buildingOptions = (option, method = 'minimal', params = []) => {
    let _return;

    switch (DT_options[option]) {
      case DT_options[0]:
        // console.log('i am here - DT Options');
        _return = building_DT_Options(method, params);
        break;
      case DT_options[1]:
        // console.log('i am here - DT Features');
        _return = building_DT_Features(method, params);
        break;
      case DT_options[2]:
        // console.log('i am here - DT Buttons');
        _return = building_DT_Buttons(method, params);
        break;
      case DT_options[3]:
        // console.log('i am here - DT Columns');
        _return = building_DT_Columns(method, params);
        break;
      case DT_options[4]:
        // console.log('i am here - DT Rows');
        _return = building_DT_Rows(method, params);
        break;
    }

    return _return;
  }

  // Public methods
  return {
    dataset   : function (data) {
      return initOptions(data);
    },
    building  : function (option, method, params) {
      return buildingOptions(option, method, params);
    },
    optionKeys: function () {
      return Object.keys(DT_options);
    }
  };
};

const PB_option_datatables = fun();
export default PB_option_datatables;