const state = {
  funds: 10000,
  stocks: [],
};

const getters = {
  stocksPortfolio(state, getters) {
    return state.stocks.map((stock) => {
      const record = getters.stocks.find((s) => s.id == stock.id);
      return {
        id: stock.id,
        name: record.name,
        price: record.price,
        quantity: stock.quantity,
      };
    });
  },
  funds(state) {
    return state.funds;
  },
};

const mutations = {
  BUY_STOCK(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find((s) => s.id === stockId);
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stockId,
        quantity,
      });
    }
    state.funds -= stockPrice * quantity;
  },
  SELL_STOCKS(state, { stockId, quantity, stockPrice }) {
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
  sellStock: ({ commit }, order) => {
    commit('SELL_STOCKS', order);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
