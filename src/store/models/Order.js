export default class Order {
  stock = null;
  quantity = 0;

  constructor(stock, quantity) {
    this.stock = stock;
    this.quantity = quantity;
  }
}
