import Vue from "vue";
import Vuex from "vuex";
import stocks from "./modules/stocks";
import portfolio from "./modules/portfolio";
import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alert: null
  },
  getters,
  mutations,
  actions,
  modules: {
    stocks,
    portfolio
  }
});
