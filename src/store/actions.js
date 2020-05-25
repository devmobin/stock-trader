import { load } from '../api/local';

export const loadData = ({ commit }) => {
  const data = load();
  if (data) {
    const stocks = data.stocks;
    const funds = data.funds;
    const stockPortfolio = data.stockPortfolio;

    const portfolio = {
      stockPortfolio,
      funds,
    };

    commit('SET_STOCKS', stocks);
    commit('SET_PORTFOLIO', portfolio);
  }
};
