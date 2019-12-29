import 'Styles/main.scss';
import Vue from 'vue';
import HelloWorld from 'Components/HelloWorld.vue';

new Vue({
  render: createElement => createElement(HelloWorld),
  el: '#app'
});
