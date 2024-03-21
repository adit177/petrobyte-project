let configs;

export const setConfigsData = (returnedData) => {
  configs = returnedData;
}

export const getConfigsData = (key) => {
  switch (key) {
    case 'common':
      return configs[key];

    case 'account':
      return configs[key];

    case 'user_preference':
      return configs[key];

    default:
      return configs;
  }
}