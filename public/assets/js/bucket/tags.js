let tags;

export const setTagData = (returnedData) => {
  tags = returnedData;
}

export const getTagData = (keys = []) => {
  let _returnObj = {};
  if (keys.length === 0) {
    return tags;
  }
  keys.forEach((key) => {
    if (tags.hasOwnProperty(key)) {
      _returnObj[key] = tags[key];
    }
  });
  return _returnObj;
}