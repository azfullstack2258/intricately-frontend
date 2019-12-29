import Vue from 'vue';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import _camelCase from 'lodash/camelCase';
import router from 'Router';
import configureModerator from './plugins/storeModerator';

const requireModule = require.context('./modules/', true, /index\.js/);
const modules = requireModule.keys().reduce((accumulator, fileName) => {
  const moduleName = _camelCase(fileName.replace(/(\.\/|\/index\.js)/g, ''));
  accumulator[moduleName] = requireModule(fileName).default;

  return accumulator;
}, {});

Vue.use(Vuex);
const store = new Vuex.Store({
  modules,
  plugins: [configureModerator],
});

const unsync = sync(store, router);
export default store;
