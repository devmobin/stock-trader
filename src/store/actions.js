import { load } from '../api/local';

export const onLoadDataAction = ({ commit }) => {
  const data = load();
  if (data) {
    const stocks = data.stocks;
    const funds = data.funds;
    const stockPortfolio = data.stockPortfolio;

    const portfolio = {
      stockPortfolio,
      funds,
    };

    commit('doSetStocks', stocks);
    commit('doSetPortfolio', portfolio);
  }
};
