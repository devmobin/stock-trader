<template>
  <div>
    <Stock v-for="stock in stocks" :key="stock.id" :stock="stock"></Stock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from '../components/Portfolio/Stock';

export default {
  computed: {
    ...mapGetters({
      stocks: 'stocksPortfolio',
    }),
  },
  components: {
    Stock,
  },
};
</script>

<style></style>
