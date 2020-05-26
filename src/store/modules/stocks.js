import localStocks from '../../data/stocks';

const state = {
  stocks: [],
};

const getters = {
  getStocks: (state) => state.stocks,
};

const mutations = {
  doSetStocks(state, stocks) {
    state.stocks = stocks;
  },
  doRandomizeStocks(state) {
    state.stocks.forEach((stock) => {
      const min = stock.price + Math.floor((-5 * stock.price) / 100);
      const max = stock.price + Math.floor((6 * stock.price) / 100);

      const random = Math.floor(Math.random() * (max - min + 1) + min);
      stock.price = random ? random : 100;
    });
  },
};

const actions = {
  onBuyStockAction: ({ commit }, order) => {
    commit('doBuyStocks', order);
  }, // TODO: this do not belong to this file
  onInitStocksAction: ({ commit }) => {
    commit('doSetStocks', localStocks);
  },
  onRandomizeStocksPriceAction: ({ commit }) => {
    commit('doRandomizeStocks');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
