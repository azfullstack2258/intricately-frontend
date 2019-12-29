const UPDATE_COMPANY_DATA = (state, data) => {
  state = Object.assign(state, data);
};

const UPDATE_COMPANY_DATA_BY_KEY = (state, { key, value }) => {
  state[key] = value;
};

export default {
  UPDATE_COMPANY_DATA,
  UPDATE_COMPANY_DATA_BY_KEY,
};
