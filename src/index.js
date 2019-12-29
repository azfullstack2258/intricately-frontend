import Vue from 'vue';
import 'Components/_globals';
import 'Styles/main.scss';
import router from 'Router';
import store from 'Store';
import App from './App.vue';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
