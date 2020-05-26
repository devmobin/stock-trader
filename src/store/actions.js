import { load } from '../api/local';
import Portfolio from './models/Portfolio';

export const onLoadDataAction = ({ commit }) => {
  const data = load();
  if (data) {
    commit('doSetStocks', data.localStocks);

    commit(
      'doSetPortfolio',
      new Portfolio(data.portfolio.stocks, data.portfolio.funds)
    );
  }
};
