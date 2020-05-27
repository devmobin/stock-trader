<template>
  <div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card border-primary mb-3 mx-auto" style="max-width: 18rem;">
      <div class="card-header">{{ stock.name }}</div>
      <div class="card-body text-primary">
        <h5 class="card-title">
          Price: {{ stock.price | currency }}
          <small class="text-dark">
            | Quantity: {{ stock.inPortfolioQuantity }}
          </small>
        </h5>
        <p class="card-text">
          Your last buy: {{ stock.lastBuyPrice | currency }} <br />
          Your buys average: {{ average | currency }}
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
          {{ insufficientQuantity ? "Not enough" : "Sell" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Order from "@/store/models/Order";
import Stock from "@/store/models/Stock";

export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    insufficientQuantity() {
      return this.quantity > this.stock.inPortfolioQuantity;
    },
    average() {
      let average =
        this.stock.buys.reduce((a, b) => a + b) / this.stock.buys.length;
      return average;
    }
  },
  methods: {
    ...mapActions({
      onSellStockAction: "onSellStockAction",
      onSetAlertAction: "onSetAlertAction"
    }),
    onSellStock() {
      const order = new Order(
        new Stock(this.stock.id, this.stock.name, this.stock.price),
        this.quantity
      );
      this.onSellStockAction(order);
      const profit = (this.stock.price - this.average) * this.quantity;
      const alert = {
        title: `You sold ${this.stock.name} stocks`,
        message: `sold ${
          this.quantity
        } by price of: $${this.stock.price.toLocaleString()}\nYour profit: $${profit.toLocaleString()}`
      };
      this.onSetAlertAction(alert);
      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
.danger {
  border: 1px solid red;
}

input:focus {
  outline: none !important;
  border-color: rgb(150, 150, 150);
  background-color: rgba(198, 223, 255, 0.295);
  box-shadow: none;
}
</style>
