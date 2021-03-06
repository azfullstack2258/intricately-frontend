import Vue from 'vue';
import numeral from 'numeral';

Vue.filter('currency', amount => numeral(amount).format('$0,0'));
Vue.filter('uppercase', str => str.toUpperCase());
