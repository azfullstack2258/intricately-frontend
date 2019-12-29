import axios from 'axios';

import { fetchPageInfo } from './companyPageInfo';

export { axios, fetchPageInfo };

export default {
  install(Vue) {
    Vue.prototype.$axios = axios;
  },
};
