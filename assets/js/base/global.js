let thePath, thePathArr, theParams, theParamsArr;
// little history
let currentState;
// trigger
let _action, _actionData;

// use action-based element holding.
let _triggerEl, _callEl, _passedEl, _tableEl, _chartEl;

let _layoutName, _layoutIndex, _LN,
    _LZone = '#layout_zone';

export const set_thePath = (value) => {
  thePath = value;
}

export const set_thePathArr = (value) => {
  thePathArr = value;
}

export const set_currentState = (value) => {
  currentState = value;
}
export const set_actionEl = (value) => {
  _action = value;
}

export const set_actionData = (value) => {
  _actionData = value;
}

export const set_triggerEl = (value) => {
  _triggerEl = value;
}

export const set_callEl = (value, mode = true) => {
  if (typeof value === 'undefined' && mode) {
    alert('set_callEl: value is undefined');
  }
  _callEl = value;
}

export const set_passedEl = (value) => {
  _passedEl = value;

}

export const set_tableEl = (value) => {
  _tableEl = value;

}

export const updateChartEl = (value) => {
  _chartEl = value;

}

export const set_layoutName = (value) => {
  _layoutName = value;

}

export const set_layoutIndex = (value) => {
  _layoutIndex = value;


}

export const set_LN = (value) => {
  _LN = value;
}

export const get_currentState = () => {
  return currentState;
}
export const get_thePath = () => {
  return thePath;
}

export const get_thePathArr = () => {
  return thePathArr;
}

export const get_action = () => {
  return _action;
}

export const get_actionData = () => {
  return _actionData;
}

export const get_triggerEl = () => {
  return _triggerEl;
}

export const get_callEl = () => {
  return _callEl;
}

export const get_passedEl = () => {
  return _passedEl;
}

export const get_tableEl = () => {
  return _tableEl;
}

export const get_chartEl = () => {
  return _chartEl;
}

export const get_layoutName = () => {
  return _layoutName;
}

export const get_layoutIndex = () => {
  return _layoutIndex;
}

export const get_LN = () => {
  return _LN;
}

export const get_LZone = () => {
  return _LZone;
}


// plugins instances.


