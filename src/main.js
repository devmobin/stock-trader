import Vue from 'vue';
import router from './routes';
import store from './store';
import App from './App.vue';
import './helpers/filters';

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
