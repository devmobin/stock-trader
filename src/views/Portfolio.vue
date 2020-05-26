<template>
  <div class="row">
    <template v-if="stocks.length">
      <Stock v-for="stock in stocks" :key="stock.id" :stock="stock"></Stock>
    </template>
    <template v-else>
      <h6 class="mt-4">
        You got nothing in your portfolio lets
        <router-link to="/stocks"> buy something</router-link>
      </h6>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from '@/components/Portfolio/Stock';

export default {
  computed: {
    ...mapGetters({
      stocks: 'getPortfolioStocks',
    }),
  },
  components: {
    Stock,
  },
};
</script>

<style></style>
