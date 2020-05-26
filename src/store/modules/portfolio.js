import Stock from '../models/Stock';

const state = {
  funds: 10000,
  stocks: [],
};

const getters = {
  getPortfolioStocks(state, getters) {
    return state.stocks.map((stock) => {
      const record = getters.getStocks.find((s) => s.id == stock.id);
      stock.name = record.name;
      stock.price = record.price;
      return stock;
    });
  },
  getFunds(state) {
    return state.funds;
  },
};

const mutations = {
  doSetPortfolio(state, portfolio) {
    state.funds = portfolio.funds;
    state.stocks = portfolio.stocks.length ? portfolio.stocks : [];
  },
  doBuyStocks(state, order) {
    const record = state.stocks.find((s) => s.id == order.stock.id);

    if (record) {
      record.inPortfolioQuantity += order.quantity;
      record.buys.push(order.stock.price);
      record.lastBuyPrice = order.stock.price;
    } else {
      const portfolioStock = new Stock(
        order.stock.id,
        order.stock.name,
        order.stock.price
      );
      portfolioStock.inPortfolioQuantity = order.quantity;
      portfolioStock.buys = [order.stock.price];
      portfolioStock.lastBuyPrice = order.stock.price;

      state.stocks.push(portfolioStock);
    }
    state.funds -= order.stock.price * order.quantity;
  },
  doSellStocks(state, order) {
    const record = state.stocks.find((s) => s.id === order.stock.id);
    if (record.inPortfolioQuantity > order.quantity) {
      record.inPortfolioQuantity -= order.quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += order.stock.price * order.quantity;
  },
};

const actions = {
  onSellStockAction: ({ commit }, order) => {
    commit('doSellStocks', order);
  }, // TODO: this do not belong to this file
};

export default {
  state,
  getters,
  mutations,
  actions,
};
