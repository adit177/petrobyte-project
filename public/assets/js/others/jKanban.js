/*
 <div id="kt_docs_jkanban_basic"></div>
 <link href="assets/plugins/custom/jkanban/jkanban.bundle.css" rel="stylesheet" type="text/css"/>
 <script src="assets/plugins/custom/jkanban/jkanban.bundle.js"></script>
 <script src="assets/js/common/jKanban.js"></script>
 */
var kanban = new jKanban({
  element: '#kt_docs_jkanban_basic',
  gutter: '0',
  widthBoard: '250px',
  boards: [{
    'id': '_inprocess',
    'title': 'In Process',
    'item': [{
      'title': '<span class="font-weight-bold">You can drag me too</span>'
    },
      {
        'title': '<span class="font-weight-bold">Buy Milk</span>'
      }
    ]
  }, {
    'id': '_working',
    'title': 'Working',
    'item': [{
      'title': '<span class="font-weight-bold">Do Something!</span>'
    },
      {
        'title': '<span class="font-weight-bold">Run?</span>'
      }
    ]
  }, {
    'id': '_done',
    'title': 'Done',
    'item': [{
      'title': '<span class="font-weight-bold">All right</span>'
    },
      {
        'title': '<span class="font-weight-bold">Ok!</span>'
      }
    ]
  }
  ]
});