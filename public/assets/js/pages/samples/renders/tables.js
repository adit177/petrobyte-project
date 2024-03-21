import {$R_common_obj, $R_table_obj} from "../../../base/render.js";
import extend from "../../../extend/extend.js";
import {exT, keys, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {_sampleLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {_k} from "../../../base/keys.js";
import PB_defined from "../../../base/defined.js";
import HTML from "../../../bucket/html.js";

// Shared variables
let PageData;

// Private functions

const pageOpen = (data) => {
  /**
   * this data save into variables.
   * it will be called when create form initiated.
   * @param data
   * @private
   */
  const _process = (data) => {
    let _return = true;

    _return &&= _process_a(data);
    _return &&= _process_update_header(data);

    return _return;
  }

  const _process_a = (data) => {
    PageData = data;
    return true;
  }


  const _process_update_header = () => {
    _.forEach(pb.sam.renders.tables.p, (value, key) => {
      // get element from html by the value
      const tableElement = _sampleLE.ground.querySelector(`#${value} table`);
      // create header as per methods available for the cell option in the table.
      let header = '';
      let sno = 0;

      _.forEach(rdR.table.mode[key], (val) => {
        header += HTML.table.header.simple(sno + ' - ' + val);
        sno++;
      });

      // append header to the table.
      tableElement.querySelector('thead tr').innerHTML = header;
    });
    return true;
  }

  return _process(data.data);
}

const stacksTarget = (element, event) => {

  const _process_a = (data, tag) => {
    // get template element.
    const tableEle = element.querySelector('table');

    console.log(data);
    PB_defined.$_append_table_simple(tableEle, data, tag);

    return true;
  }

  const _date = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.date);
      return _return;
    }


    return Promise.resolve(_process(PageData.date));
  }


  const _amount = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.amount);
      return _return;
    }


    return Promise.resolve(_process(PageData.amount));
  }

  const _account = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.account);
      return _return;
    }


    return Promise.resolve(_process(PageData.account));
  }

  const _text = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.text);
      return _return;
    }


    return Promise.resolve(_process(PageData.text));
  }

  const _note = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.note);
      return _return;
    }


    return Promise.resolve(_process(PageData.note));
  }

  const _checkbox = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.checkbox);
      return _return;
    }


    return Promise.resolve(_process(PageData.checkbox));
  }

  const _dropdown = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.dropdown);
      return _return;
    }


    return Promise.resolve(_process(PageData.dropdown));
  }

  const _input = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.input);
      return _return;
    }


    return Promise.resolve(_process(PageData.input));
  }

  const _image = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.image);
      return _return;
    }


    return Promise.resolve(_process(PageData.image));
  }

  const _option = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.option);
      return _return;
    }


    return Promise.resolve(_process(PageData.option));
  }

  const _icon = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.icon);
      return _return;
    }


    return Promise.resolve(_process(PageData.icon));
  }

  const _rich = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.rich);
      return _return;
    }


    return Promise.resolve(_process(PageData.rich));
  }

  const _status = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.status);
      return _return;
    }


    return Promise.resolve(_process(PageData.status));
  }

  const _button = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.button);
      return _return;
    }


    return Promise.resolve(_process(PageData.button));
  }

  const _badge = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.badge);
      return _return;
    }


    return Promise.resolve(_process(PageData.badge));
  }

  const _number = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.number);
      return _return;
    }


    return Promise.resolve(_process(PageData.number));
  }

  const _tag = (data) => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data, pb.sam.renders.tables.t.tag);
      return _return;
    }


    return Promise.resolve(_process(PageData.tag));
  }

  // here all the function has been called as per the event value.
  switch (event.value) {
    case pb.sam.renders.tables.p.date:
      return _date();
    case pb.sam.renders.tables.p.amount:
      return _amount();
    case pb.sam.renders.tables.p.account:
      return _account();
    case pb.sam.renders.tables.p.text:
      return _text();
    case pb.sam.renders.tables.p.note:
      return _note();
    case pb.sam.renders.tables.p.checkbox:
      return _checkbox();
    case pb.sam.renders.tables.p.dropdown:
      return _dropdown();
    case pb.sam.renders.tables.p.input:
      return _input();
    case pb.sam.renders.tables.p.image:
      return _image();
    case pb.sam.renders.tables.p.option:
      return _option();
    case pb.sam.renders.tables.p.icon:
      return _icon();
    case pb.sam.renders.tables.p.rich:
      return _rich();
    case pb.sam.renders.tables.p.status:
      return _status();
    case pb.sam.renders.tables.p.button:
      return _button();
    case pb.sam.renders.tables.p.badge:
      return _badge();
    case pb.sam.renders.tables.p.number:
      return _number();
    case pb.sam.renders.tables.p.tag:
      return _tag();
    default:
  }
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Tables');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Tables');
  return Promise.resolve(true);
}

function opensTarget(element, event) {
  // check the status.
  return Promise.resolve(true);
}

const get = function (event) {
  switch (event.type) {
    case eTypes.open:
      return eleCheck() ? opensTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      alert(`eventType: ${event.type}, not GET, change nature to POST`);
      return Promise.reject('Invalid Event Type');
  }
}

const post = function (event) {
  switch (event.type) {

    default:
      return Promise.reject('Invalid Event Type');
  }
}

const option = function (event) {
  switch (event.type) {
    case eTypes.stack:
      return eleCheck() ? stacksTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}

export const SRT_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('SRT_Requests', 'Request Type: ' + type);
  switch (type) {

    case keys.event.nature.back:
      return pageBack(data);

    case keys.event.nature.open:
      return pageOpen(data);

    case keys.event.nature.clear:
      return pageClear(data);

    case keys.event.nature.get:
      return get(data);

    case keys.event.nature.post:
      return post(data);

    case keys.event.nature.option:
      return option(data);

    default:
      return false;
  }
}



