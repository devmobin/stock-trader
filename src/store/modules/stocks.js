import stocks from '../../data/stocks';

const state = {
  stocks: [],
};

const getters = {
  stocks: (state) => state.stocks,
};

const mutations = {
  SET_STOCKS(state, stocks) {
    state.stocks = stocks;
  },
  RND_STOCKS(state) {
    state.stocks.forEach((stock) => {
      const min = stock.price + Math.floor((-5 * stock.price) / 100);
      const max = stock.price + Math.floor((6 * stock.price) / 100);

      const random = Math.floor(Math.random() * (max - min + 1) + min);
      stock.price = random ? random : 100;
    });
  },
};

const actions = {
  buyStock: ({ commit }, order) => {
    commit('BUY_STOCK', order);
  },
  initStocks: ({ commit }) => {
    commit('SET_STOCKS', stocks);
  },
  randomizeStocks: ({ commit }) => {
    commit('RND_STOCKS');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
