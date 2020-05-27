import Vue from "vue";
import Portfolio from "./models/Portfolio";

export const onSaveToDataBaseAction = (context, data) => {
  Vue.http
    .put("data.json", data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const onLoadFromDataBaseAction = ({ commit }) => {
  Vue.http
    .get("data.json")
    .then(res => {
      const data = res.body;

      if (data) {
        commit("doSetStocks", data.localStocks);

        commit(
          "doSetPortfolio",
          new Portfolio(data.portfolio.stocks, data.portfolio.funds)
        );
      }
    })
    .catch(err => console.log(err));
};
