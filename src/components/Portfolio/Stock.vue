<template>
  <div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card border-primary mb-3" style="max-width: 18rem;">
      <div class="card-header">{{ stock.name }}</div>
      <div class="card-body text-primary">
        <h5 class="card-title">
          Price: {{ stock.price | currency }} | Quantity: {{ stock.quantity }}
        </h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <input
          type="number"
          class="form-control"
          placeholder="Quantity"
          v-model.number="quantity"
          :class="{ danger: insufficientQuantity }"
        />
      </div>
      <div class="card-footer bg-transparent border-success">
        <button
          class="btn btn-primary"
          @click="onSellStock"
          :disabled="
            insufficientQuantity || quantity <= 0 || !Number.isInteger(quantity)
          "
        >
          {{ insufficientQuantity ? 'Not enough' : 'Sell' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['stock'],
  data() {
    return {
      quantity: 0,
    };
  },
  computed: {
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    },
  },
  methods: {
    ...mapActions({
      placeSellOrder: 'onSellStockAction',
    }),
    onSellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity,
      };
      this.placeSellOrder(order);
      this.quantity = 0;
    },
  },
};
</script>

<style>
.danger {
  border: 1px solid red;
}
</style>
