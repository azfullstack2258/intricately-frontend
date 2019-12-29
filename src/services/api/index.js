import axios from 'axios';

export * from './companyPageInfo';

export { axios };

export default {
  install(Vue) {
    Vue.prototype.$axios = axios;
  },
};
