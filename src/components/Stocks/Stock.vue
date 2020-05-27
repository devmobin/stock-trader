<template>
  <div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card border-success mb-4 mx-auto" style="max-width: 18rem;">
      <div class="card-header bg-transparent border-success">
        {{ stock.name }}
      </div>
      <div class="card-body text-success">
        <h6 class="card-title">Price: {{ stock.price | currency }}</h6>
        <p class="card-text text-dark">
          Yesterday Price: {{ stock.yesterdayPrice }} <br />
          <small class="text-danger"> Today Min: {{ todayMin }} </small> \
          <small class="text-success"> Today Max: {{ todayMax }} </small>
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
          {{ insufficientFunds ? "Insufficient Funds" : "Buy" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
    funds() {
      return this.$store.getters.getFunds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
    todayMin() {
      const { min } = this.$store.getters.getMinMaxPrice(this.stock.price);
      return min;
    },
    todayMax() {
      const { max } = this.$store.getters.getMinMaxPrice(this.stock.price);
      return max;
    }
  },
  methods: {
    onBuyStock() {
      const order = new Order(
        new Stock(this.stock.id, this.stock.name, this.stock.price),
        this.quantity
      );
      this.$store.dispatch("onBuyStockAction", order);
      const total = this.stock.price * this.quantity;
      const alert = {
        title: `You bought ${this.stock.name} stock`,
        message: `bought at $${this.stock.price.toLocaleString()} price point\nTotal: $${total.toLocaleString()}`
      };
      this.$store.dispatch("onSetAlertAction", alert);
      this.quantity = 0;
    }
  }
};
</script>

<style scoped>
input:focus {
  outline: none !important;
  border-color: rgb(150, 150, 150);
  background-color: rgba(211, 255, 198, 0.295);
  box-shadow: none;
}
p.text-dark {
  white-space: pre !important;
}
</style>
