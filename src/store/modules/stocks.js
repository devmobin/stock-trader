import localStocks from '../../data/stocks';

const state = {
  stocks: [],
};

const getters = {
  getStocks: (state) => {
    return state.stocks.map((stock) => {
      const { min, max } = _getMinMaxPrice(stock.price);
      stock.min = min;
      stock.max = max;

      return stock;
    });
  },
  getMinMaxPrice() {
    return (price) => {
      const { min, max } = _getMinMaxPrice(price);
      return { min, max };
    };
  },
};

const mutations = {
  doSetStocks(state, stocks) {
    state.stocks = stocks.map((stock) => {
      stock.yesterdayPrice = stock.yesterdayPrice
        ? stock.yesterdayPrice
        : stock.price;

      return stock;
    });
  },
  doRandomizeStocks(state) {
    state.stocks.forEach((stock) => {
      const { min, max } = _getMinMaxPrice(stock.price);

      const random = Math.floor(Math.random() * (max - min + 1) + min);

      stock.yesterdayPrice = stock.price;
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

const _getMinMaxPrice = (price) => {
  const min = price + Math.floor((-5 * price) / 100);
  const max = price + Math.floor((6 * price) / 100);
  return {
    min,
    max,
  };
};
