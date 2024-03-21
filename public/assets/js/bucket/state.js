let data;

export const setStateData = (returnedData) => {
  data = returnedData;
}

export const getStateData = (keys = []) => {
  let _returnObj = {};
  if (keys.length === 0) {
    return data;
  }
  keys.forEach((key) => {
    if (data.hasOwnProperty(key)) {
      _returnObj[key] = data[key];
    }
    else {
      console.log(`Key ${key} does not exist in state.`);
      _returnObj[key] = null;
    }
  });
  console.log("state data return: ", _returnObj);
  return _returnObj;
}

export const updateStateData = (key, id, value) => {
  data[key][id] = value;
}

// TODO: do frezee or seal the object.
