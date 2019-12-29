import Vue from 'vue';
import VModal from 'vue-js-modal'
import 'Components/_globals';
import 'Styles/main.scss';
import router from 'Router';
import store from 'Store';
import App from './App.vue';

Vue.use(VModal);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
