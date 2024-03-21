import {$R_common_obj} from "../../../base/render.js";
import extend from "../../../extend/extend.js";
import {exT, keys, rdR} from "../../../base/const.js";
import {eTypes} from "../../../base/events.js";
import {get_callEl} from "../../../base/global.js";
import pb from "../../../base/structure.js";
import {_sampleLE} from "../../../base/elements.js";
import {atr} from "../../../base/attributes.js";
import {_k} from "../../../base/keys.js";

// Shared variables
let PageData;
let StateData;

// Private functions

/**
 * preloaded data that will be same for this page
 */
const pageOpen = (data) => {
  // init the required classes.


  // process.

  const _process = (data) => {
    // calling all process functions.
    let _return = true;
    _return &&= _process_save_page_state(data);

    _return &&= _process_currency(data);
    _return &&= _process_date(data);
    _return &&= _process_number(data);
    _return &&= _process_gap(data);
    _return &&= _process_trim(data);
    _return &&= _process_image(data);
    _return &&= _process_percent(data);
    _return &&= _process_weightage(data);
    _return &&= _process_progress(data);
    _return &&= _process_style(data);
    _return &&= _process_symbol(data);
    _return &&= _process_checkbox(data);
    _return &&= _process_display(data);
    _return &&= _process_icon(data);
    _return &&= _process_badge(data);
    _return &&= _process_tag(data);
    _return &&= _process_combo(data);

    return _return;

  }
  const _process_save_page_state = (data) => {
    // saving page state data.
    StateData = data[_k.page_common_info];
    return true;
  }
  const _process_currency = (data) => {
    // calling render to place data into menu.

    const currencyEle = _sampleLE.ground.querySelector('#currency');

    $R_common_obj.$_update(currencyEle, rdR.common.methods.currency);

    return true;
  }

  const _process_date = (data) => {
    // calling render to place data into menu.

    const dateEle = _sampleLE.ground.querySelector('#date');

    $R_common_obj.$_update(dateEle, rdR.common.methods.date);

    return true;

  }
  const _process_number = (data) => {
    // calling render to place data into menu.

    const numberEle = _sampleLE.ground.querySelector('#number');

    $R_common_obj.$_update(numberEle, rdR.common.methods.number);

    return true;
  }

  const _process_gap = (data) => {
    // calling render to place data into menu.

    const gapEle = _sampleLE.ground.querySelector('#gap');

    $R_common_obj.$_update(gapEle, rdR.common.methods.gap);

    return true;
  }

  const _process_trim = (data) => {
    // calling render to place data into menu.

    const trimEle = _sampleLE.ground.querySelector('#trim');

    $R_common_obj.$_update(trimEle, rdR.common.methods.trim);

    return true;
  }

  const _process_image = (data) => {
    // calling render to place data into menu.

    const imageEle = _sampleLE.ground.querySelector('#image');

    $R_common_obj.$_update(imageEle, rdR.common.methods.image);

    return true;
  }

  const _process_style = (data) => {
    // calling render to place data into menu.

    const styleEle = _sampleLE.ground.querySelector('#style');

    $R_common_obj.$_update(styleEle, rdR.common.methods.style);

    return true;
  }

  const _process_weightage = (data) => {
    // calling render to place data into menu.

    const weightageEle = _sampleLE.ground.querySelector('#weightage');

    $R_common_obj.$_update(weightageEle, rdR.common.methods.weightage);

    return true;
  }

  const _process_percent = (data) => {
    // calling render to place data into menu.

    const percentEle = _sampleLE.ground.querySelector('#percent');

    $R_common_obj.$_update(percentEle, rdR.common.methods.percent);

    return true;
  }

  const _process_symbol = (data) => {
    // calling render to place data into menu.

    const symbolEle = _sampleLE.ground.querySelector('#symbol');

    $R_common_obj.$_update(symbolEle, rdR.common.methods.symbol);

    return true;
  }

  const _process_checkbox = (data) => {
    // calling render to place data into menu.

    const displayEle = _sampleLE.ground.querySelector('#checkbox');

    $R_common_obj.$_update(displayEle, rdR.common.methods.checkbox);

    return true;
  }

  const _process_display = (data) => {
    // calling render to place data into menu.

    const displayEle = _sampleLE.ground.querySelector('#display');

    $R_common_obj.$_update(displayEle, rdR.common.methods.display);

    return true;
  }

  const _process_progress = (data) => {
    // calling render to place data into menu.

    const progressEle = _sampleLE.ground.querySelector('#progress');

    $R_common_obj.$_update(progressEle, rdR.common.methods.progress);

    return true;
  }

  const _process_icon = (data) => {
    // calling render to place data into menu.

    const iconEle = _sampleLE.ground.querySelector('#icon');

    $R_common_obj.$_update(iconEle, rdR.common.methods.icon);

    return true;
  }

  const _process_badge = (data) => {
    // calling render to place data into menu.

    const badgeEle = _sampleLE.ground.querySelector('#badge');

    $R_common_obj.$_update(badgeEle, rdR.common.methods.badge);

    return true;
  }

  const _process_tag = (data) => {
    // calling render to place data into menu.

    const tagEle = _sampleLE.ground.querySelector('#tag');

    $R_common_obj.$_update(tagEle, rdR.common.methods.tag);

    return true;
  }

  const _process_combo = (data) => {
    // calling render to place data into menu.

    const comboEle = _sampleLE.ground.querySelector('#combo');

    $R_common_obj.$_call(comboEle);

    return true;
  }

  return _process(data);
}

const stacksTarget = (element, event) => {

  const _abcd = () => {
    const _process = (data) => {
      let _return = true;
      _return &&= _process_a(data);
      return _return;
    }

    const _process_a = (data) => {
      // get template element.
      const key = 'single_string';
      const template = _sampleLE.templates.querySelector(querySA(atr.core.template, key));
      element.querySelector(querySA(atr.core.append, key)).innerHTML = extend.append.$_single_on_innerHTML(template, data);
      return true;
    }

    return Promise.resolve(_process(PageData.single_string));
  }

  // here all the function has been called as per the event value.
  switch (event.value) {
    case pb.sam.extends.filter.p:
      return _abcd();
  }
}

const pageBack = (data) => {
  toastr.info('bank clicked', 'pageBack - Commons');
  return Promise.resolve(true);
}

const pageClear = (data) => {
  toastr.info('clear state data.', 'pageClear - Commons');
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

export const SRC_Requests = (data, type) => {
  console.log(data, type);
  toastr.success('SRC_Requests', 'Request Type: ' + type);
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

