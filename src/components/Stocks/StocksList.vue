<template>
  <div>
    <Stock v-for="stock of stocks" :key="stock.id" :stock="stock"></Stock>
  </div>
</template>

<script>
import Stock from './Stock';

export default {
  components: {
    Stock,
  },
  computed: {
    stocks() {
      return this.$store.getters.getStocks;
    },
  },
};
</script>

<style></style>
