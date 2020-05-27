import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './routes';
import store from './store';
import App from './App.vue';
import './helpers/filters';

Vue.use(VueResource);

Vue.http.options.root = "https://devmobin-vue-trader.firebaseio.com";

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
