let dates;

export const setDatesData = (returnedData) => {
  dates = returnedData;
  Object.seal(dates)
}

export const getDatesData = (key = 'all') => {

  if (key === "all") return dates;

  let _return;
  Object.keys(dates).forEach((objKey) => {
    if (objKey === key) {
      _return = dates[objKey];
    }
    else {
      // none
    }
  });
  return _return;
}

// ------------------------------

class AppDates {
  #session = {};

  constructor() {
    this.#session = {};
  }

  get(key) {
    return this.#session[key];
  }

  set(key, value) {
    this.#session[key] = value;
  }
}

const appDates = new AppDates();
export default appDates;