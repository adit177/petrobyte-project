import {rdR} from "../../js/base/const.js";
import pb from "../base/structure.js";

class tablesProfile_taxation {

  // define properties
  tableOptions;
  tableMethods;
  tableShapes;
  tableParams;
  #tableTypes = {};
  #path;

  //#methods = TBL_ct;

  constructor(path) {
    this.#path = path;
  }

  // after properties.


  // define methods.
  #row = (type, method = 'a', value = [1], param = ['a'], style = 0, css = []) => {
    return {
      type  : type,
      method: method,
      value : value.join(','),
      param : param,
      style : style,
      css   : css
    };
  }
  #gstreport_sales = (tag) => {
    const myRoot = pb.tax.gstreport.sales;

    switch (tag) {
      case myRoot.p.detailed:
        this.tableShapes = {
          '0': this.#row(rdR.table.cell.text, 'a', [1], ['a'], 0, [true]),
          '1': this.#row(rdR.table.cell.text, 'a', [2], [], 0, []),
          '2': this.#row(rdR.table.cell.amount, 'a', [3], [], 0, []),
          '3': this.#row(rdR.table.cell.amount, 'a', [4], [], 0, []),
          '4': this.#row(rdR.table.cell.amount, 'a', [5], [], 0, []),
          '5': this.#row(rdR.table.cell.amount, 'a', [6], [], 0, []),
          '6': this.#row(rdR.table.cell.amount, 'a', [7], [], 0, []),
          '7': this.#row(rdR.table.cell.amount, 'a', [8], [], 0, []),
          '8': this.#row(rdR.table.cell.amount, 'a', [9], [], 0, []),

        };
        this.tableMethods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal'
        }
        this.tableOptions = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        }
        this.tableParams = {
          0: [],
          1: [],
          2: []
        }
        break;

      case myRoot.p.invoice:
        this.tableShapes = {
          '0': this.#row(rdR.table.cell.text, 'a', [1], ['a'], 0, [true]),
          '1': this.#row(rdR.table.cell.text, 'a', [2], [], 0, []),
          '2': this.#row(rdR.table.cell.amount, 'a', [3], [], 0, []),
          '3': this.#row(rdR.table.cell.amount, 'a', [4], [], 0, []),
          '4': this.#row(rdR.table.cell.amount, 'a', [5], [], 0, []),
          '5': this.#row(rdR.table.cell.amount, 'a', [6], [], 0, []),
          '6': this.#row(rdR.table.cell.amount, 'a', [7], [], 0, []),
          '7': this.#row(rdR.table.cell.amount, 'a', [8], [], 0, []),
          '8': this.#row(rdR.table.cell.amount, 'a', [9], [], 0, []),

        };
        this.tableMethods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal'
        }
        this.tableOptions = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        }
        this.tableParams = {
          0: [],
          1: [],
          2: []
        }
        break;

      case myRoot.p.item:
        this.tableShapes = {
          '0': this.#row(rdR.table.cell.text, 'a', [1], ['a'], 0, [true]),
          '1': this.#row(rdR.table.cell.text, 'a', [2], [], 0, []),
          '2': this.#row(rdR.table.cell.amount, 'a', [3], [], 0, []),
          '3': this.#row(rdR.table.cell.amount, 'a', [4], [], 0, []),
          '4': this.#row(rdR.table.cell.amount, 'a', [5], [], 0, []),
          '5': this.#row(rdR.table.cell.amount, 'a', [6], [], 0, []),
          '6': this.#row(rdR.table.cell.amount, 'a', [7], [], 0, []),
          '7': this.#row(rdR.table.cell.amount, 'a', [8], [], 0, []),
          '8': this.#row(rdR.table.cell.amount, 'a', [9], [], 0, []),

        };
        this.tableMethods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal'
        }
        this.tableOptions = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        }
        this.tableParams = {
          0: [],
          1: [],
          2: []
        }
        break;

      case myRoot.p.party:
        this.tableShapes = {
          '0': this.#row(rdR.table.cell.text, 'a', [1], ['a'], 0, [true]),
          '1': this.#row(rdR.table.cell.text, 'a', [2], [], 0, []),
          '2': this.#row(rdR.table.cell.amount, 'a', [3], [], 0, []),
          '3': this.#row(rdR.table.cell.amount, 'a', [4], [], 0, []),
          '4': this.#row(rdR.table.cell.amount, 'a', [5], [], 0, []),
          '5': this.#row(rdR.table.cell.amount, 'a', [6], [], 0, []),
          '6': this.#row(rdR.table.cell.amount, 'a', [7], [], 0, []),
          '7': this.#row(rdR.table.cell.amount, 'a', [8], [], 0, []),
          '8': this.#row(rdR.table.cell.amount, 'a', [9], [], 0, []),

        };
        this.tableMethods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal'
        }
        this.tableOptions = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        }
        this.tableParams = {
          0: [],
          1: [],
          2: []
        }
        break;
    }
  }

  #gstreport_purchases = (tag) => {
    const myRoot = pb.tax.gstreport.purchases;

    switch (tag) {
      case myRoot.p.detailed:
        this.tableShapes = {
          '0': this.#row(rdR.table.cell.text, 'a', [1], ['a'], 0, [true]),
          '1': this.#row(rdR.table.cell.text, 'a', [2], [], 0, []),
          '2': this.#row(rdR.table.cell.amount, 'a', [3], [], 0, []),
          '3': this.#row(rdR.table.cell.amount, 'a', [4], [], 0, []),
          '4': this.#row(rdR.table.cell.amount, 'a', [5], [], 0, []),
          '5': this.#row(rdR.table.cell.amount, 'a', [6], [], 0, []),
          '6': this.#row(rdR.table.cell.amount, 'a', [7], [], 0, []),
          '7': this.#row(rdR.table.cell.amount, 'a', [8], [], 0, []),
          '8': this.#row(rdR.table.cell.amount, 'a', [9], [], 0, []),

        };
        this.tableMethods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal'
        }
        this.tableOptions = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        }
        this.tableParams = {
          0: [],
          1: [],
          2: []
        }
        break;

      case myRoot.p.invoice:
        this.tableShapes = {
          '0': this.#row(rdR.table.cell.text, 'a', [1], ['a'], 0, [true]),
          '1': this.#row(rdR.table.cell.text, 'a', [2], [], 0, []),
          '2': this.#row(rdR.table.cell.amount, 'a', [3], [], 0, []),
          '3': this.#row(rdR.table.cell.amount, 'a', [4], [], 0, []),
          '4': this.#row(rdR.table.cell.amount, 'a', [5], [], 0, []),
          '5': this.#row(rdR.table.cell.amount, 'a', [6], [], 0, []),
          '6': this.#row(rdR.table.cell.amount, 'a', [7], [], 0, []),
          '7': this.#row(rdR.table.cell.amount, 'a', [8], [], 0, []),
          '8': this.#row(rdR.table.cell.amount, 'a', [9], [], 0, []),

        };
        this.tableMethods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal'
        }
        this.tableOptions = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        }
        this.tableParams = {
          0: [],
          1: [],
          2: []
        }
        break;

      case myRoot.p.item:
        this.tableShapes = {
          '0': this.#row(rdR.table.cell.text, 'a', [1], ['a'], 0, [true]),
          '1': this.#row(rdR.table.cell.text, 'a', [2], [], 0, []),
          '2': this.#row(rdR.table.cell.amount, 'a', [3], [], 0, []),
          '3': this.#row(rdR.table.cell.amount, 'a', [4], [], 0, []),
          '4': this.#row(rdR.table.cell.amount, 'a', [5], [], 0, []),
          '5': this.#row(rdR.table.cell.amount, 'a', [6], [], 0, []),
          '6': this.#row(rdR.table.cell.amount, 'a', [7], [], 0, []),
          '7': this.#row(rdR.table.cell.amount, 'a', [8], [], 0, []),
          '8': this.#row(rdR.table.cell.amount, 'a', [9], [], 0, []),

        };
        this.tableMethods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal'
        }
        this.tableOptions = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        }
        this.tableParams = {
          0: [],
          1: [],
          2: []
        }
        break;

      case myRoot.p.party:
        this.tableShapes = {
          '0': this.#row(rdR.table.cell.text, 'a', [1], ['a'], 0, [true]),
          '1': this.#row(rdR.table.cell.text, 'a', [2], [], 0, []),
          '2': this.#row(rdR.table.cell.amount, 'a', [3], [], 0, []),
          '3': this.#row(rdR.table.cell.amount, 'a', [4], [], 0, []),
          '4': this.#row(rdR.table.cell.amount, 'a', [5], [], 0, []),
          '5': this.#row(rdR.table.cell.amount, 'a', [6], [], 0, []),
          '6': this.#row(rdR.table.cell.amount, 'a', [7], [], 0, []),
          '7': this.#row(rdR.table.cell.amount, 'a', [8], [], 0, []),
          '8': this.#row(rdR.table.cell.amount, 'a', [9], [], 0, []),

        };
        this.tableMethods = {
          0: 'minimal',
          1: 'minimal',
          2: 'basic',
          3: 'minimal',
          4: 'minimal',
          5: 'minimal'
        }
        this.tableOptions = {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        }
        this.tableParams = {
          0: [],
          1: [],
          2: []
        }
        break;
    }
  }
  profileGenerate = (path, tag) => {
    const propName = path[1] + '_' + path[2];

    switch (propName) {
      case 'gstreport_sales':
        this.#gstreport_sales(tag);
        break;
      case 'gstreport_purchases':
        this.#gstreport_purchases(tag);
        break;

    }
  }
}

export default tablesProfile_taxation;