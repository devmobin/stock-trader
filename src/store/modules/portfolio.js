const state = {
  funds: 10000,
  stocks: [],
};

const getters = {
  getStocksPortfolio(state, getters) {
    return state.stocks.map((stock) => {
      const record = getters.getStocks.find((s) => s.id == stock.id);
      return {
        id: stock.id,
        name: record.name,
        price: record.price,
        quantity: stock.quantity,
        buys: stock.buys,
        lastBuyPrice: stock.buys[stock.buys.length - 1],
      };
    });
  },
  getFunds(state) {
    return state.funds;
  },
};

const mutations = {
  doSetPortfolio(state, portfolio) {
    state.funds = portfolio.funds;
    state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
  },
  doBuyStocks(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((s) => s.id == stockId);
    if (record) {
      record.quantity += quantity;
      record.buys.push(stockPrice);
    } else {
      state.stocks.push({
        id: stockId,
        quantity,
        buys: [stockPrice],
      });
    }
    state.funds -= stockPrice * quantity;
  },
  doSellStocks(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((s) => s.id === stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
  },
};

const actions = {
  onSellStockAction: ({ commit }, order) => {
    commit('doSellStocks', order);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
