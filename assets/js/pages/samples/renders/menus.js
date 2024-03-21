import {$R_menu_obj} from "../../../base/render.js";
import extend from "../../../extend/extend.js";
import {exT, keys, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {_sampleLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {_k} from "../../../base/keys.js";

// Shared variables
let PageData, UpdateData;

// Private functions

/**
 * preloaded data that will be same for this page
 */
const pageOpen = (data) => {
  // init things.

  const _process = (data) => {
    // calling all process functions.
    let _return = true;
    _return &&= _process_save_page_state(data.data);
    return _return;
  }
  const _process_save_page_state = (data) => {
    // saving page state data.
    PageData = data[_k.page_common_info];
    UpdateData = data['update_menu_info'];
    return true;
  }

  return _process(data);
}

const stacksTarget = (element, event) => {

  // value
  const _value = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      // $R_menu_obj.$_left(data, rdR.menu.type.value);
      $R_menu_obj.$_left(data, rdR.menu.type.value, {}, rdR.menu.role.new, rdR.menu.tags.menu);
      return true;
    }

    console.log(PageData);
    return Promise.resolve(_process(PageData.value));
  }
  // stack
  const _stack = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      const tag = 'menuList_stack';
      $R_menu_obj.$_left(data, rdR.menu.type.stack, {}, rdR.menu.role.new, tag);
      return true;
    }

    return Promise.resolve(_process(PageData.stack));
  }
  // bar
  const _bar = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      return true;
    }

    return Promise.resolve(_process(PageData.single_string));
  }
  // button
  const _button = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      return true;
    }

    return Promise.resolve(_process(PageData.single_string));
  }

  // here all the function has been called as per the event value.
  switch (event.value) {
    case pb.sam.renders.menus.p.value:
      return _value();
    case pb.sam.renders.menus.p.stack:
      return _stack();
    case pb.sam.renders.menus.p.bar:
      return _bar();
    case pb.sam.renders.menus.p.button:
      return _button();
  }
}

const changesTarget = (element, event) => {
  // value
  const _value = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      $R_menu_obj.$_left(data, rdR.menu.type.value, {}, rdR.menu.role.update, rdR.menu.tags.menu);
      return true;
    }

    return Promise.resolve(_process(UpdateData.value));
  }
  // stack
  const _stack = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      const tag = 'menuList_stack';
      $R_menu_obj.$_left(data, rdR.menu.type.stack, {}, rdR.menu.role.update, tag);
      return true;
    }

    return Promise.resolve(_process(UpdateData.stack));
  }
  // bar
  const _bar = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      return true;
    }

    return Promise.resolve(_process(PageData.single_string));
  }
  // button
  const _button = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      return true;
    }

    return Promise.resolve(_process(PageData.single_string));
  }

  // here all the function has been called as per the event value.
  switch (event.value) {
    case pb.sam.renders.menus.p.value:
      return _value();
    case pb.sam.renders.menus.p.stack:
      return _stack();
    case pb.sam.renders.menus.p.bar:
      return _bar();
    case pb.sam.renders.menus.p.button:
      return _button();
  }
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Menu');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Menu');
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
    case eTypes.change:
      return eleCheck() ? changesTarget(get_callEl(), event) : Promise.reject('Invalid call Element');
    default:
      return Promise.reject('Invalid Event Type');
  }
}

export const SRM_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('SRM_Requests', 'Request Type: ' + type);
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

