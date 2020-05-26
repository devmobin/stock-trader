<template>
  <div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card border-success mb-4 mx-auto" style="max-width: 18rem;">
      <div class="card-header bg-transparent border-success">
        {{ stock.name }}
      </div>
      <div class="card-body text-success">
        <h6 class="card-title">Price: {{ stock.price | currency }}</h6>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <input
          type="number"
          class="form-control"
          placeholder="Quantity"
          v-model.number="quantity"
          :class="{ danger: insufficientFunds }"
        />
      </div>
      <div class="card-footer bg-transparent border-success">
        <button
          class="btn btn-success"
          @click="onBuyStock"
          :disabled="
            insufficientFunds || +quantity <= 0 || !Number.isInteger(+quantity)
          "
        >
          {{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0,
    };
  },
  computed: {
    funds() {
      return this.$store.getters.getFunds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
  },
  methods: {
    onBuyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: +this.quantity,
      };
      this.$store.dispatch('onBuyStockAction', order);
      this.quantity = 0;
    },
  },
};
</script>

<style scoped>
input:focus {
  outline: none !important;
  border-color: rgb(150, 150, 150);
  background-color: rgba(211, 255, 198, 0.295);
  box-shadow: none;
}
</style>
