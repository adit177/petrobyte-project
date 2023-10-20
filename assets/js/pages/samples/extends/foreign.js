import {exT, keys} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";


// Shared variables
let PageData;

// Private functions

/**
 * preloaded data that will be same for this page
 */
const pageOpen = (data) => {

  const _process = (data) => {
    // calling all process functions.
    data = data.data;
    let _return = true;
    _return &&= _process_save_page_state(data);
    return _return;
  }
  const _process_save_page_state = (data) => {
    // saving page state data.
    PageData = data['page_common_info'];
    return true;
  }

  return _process(data);
}

const stacksTarget = (element, event) => {

  const _individual = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      return _return;
    }

    const _process_collect = (data) => {

      return true;
    }

    return Promise.resolve(_process(PageData.simple));
  }

  const _combined = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_init_form(data);
      return _return;
    }

    const _process_init_form = (data) => {

      return true;
    }

    return Promise.resolve(_process(PageData.simple));
  }

  const _acquire = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      return _return;
    }

    const _process_collect = (data) => {

      return true;
    }

    return Promise.resolve(_process(PageData.simple));
  }

  const _table = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      return _return;
    }

    const _process_collect = (data) => {

      return true;
    }


    return Promise.resolve(_process(PageData.simple));
  }

  const _branch = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      return _return;
    }

    const _process_collect = (data) => {

      return true;
    }

    return Promise.resolve(_process(PageData.simple));
  }

  const _state = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_collect(data);
      return _return;
    }

    const _process_collect = (data) => {

      return true;
    }

    return Promise.resolve(_process(PageData.simple));
  }

  // here all the function has been called as per the event value.
  switch (event.value) {
    case pb.sam.extends.foreign.p.individual:
      return _individual();
    case pb.sam.extends.foreign.p.combined:
      return _combined();
    case pb.sam.extends.foreign.p.acquire:
      return _acquire();
    case pb.sam.extends.foreign.p.table:
      return _table();
    case pb.sam.extends.foreign.p.branch:
      return _branch();
    case pb.sam.extends.foreign.p.state:
      return _state();
  }
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Contacts');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Contacts');
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

export const SEF_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('SEF_Requests', 'Request Type: ' + type);
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