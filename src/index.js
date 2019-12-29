import Vue from 'vue';
import 'Components/_globals';
import 'Styles/main.scss';
import router from 'Router';
import App from './App.vue';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
