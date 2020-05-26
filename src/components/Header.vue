<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">Stock Trader</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <router-link
            class="nav-item"
            to="/"
            :exact="true"
            activeClass="active"
            tag="li"
          >
            <a class="nav-link">Home</a>
          </router-link>
          <router-link
            class="nav-item"
            to="/portfolio"
            activeClass="active"
            tag="li"
          >
            <a class="nav-link">Portfolio</a>
          </router-link>
          <router-link
            class="nav-item"
            to="/stocks"
            activeClass="active"
            tag="li"
          >
            <a class="nav-link">Stocks</a>
          </router-link>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" @click="onEndDay">End Day</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Save & Load
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" @click="onSaveData">Save Data</a>
              <a class="dropdown-item" @click="onLoadData">Load Data</a>
            </div>
          </li>
        </ul>

        <strong class="navbar-text"> Funds: {{ funds | currency }} </strong>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';
import { save } from '@/api/local';

export default {
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  computed: {
    funds() {
      return this.$store.getters.getFunds;
    },
  },
  methods: {
    ...mapActions({
      randomizeStocks: 'onRandomizeStocksPriceAction',
      loadData: 'onLoadDataAction',
    }),
    onEndDay() {
      this.randomizeStocks();
    },
    onSaveData() {
      const data = {
        funds: this.$store.getters.getFunds,
        stockPortfolio: this.$store.getters.getStocksPortfolio,
        stocks: this.$store.getters.getStocks,
      };
      save(data);
    },
    onLoadData() {
      this.loadData();
    },
  },
};
</script>

<style scoped>
li,
a {
  cursor: pointer;
}
</style>
