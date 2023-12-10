const Order = require("../order.v2.model");
class OrderRepository {
  async createOrder(orderData) {
    return await Order.create(orderData);
  }
}

module.exports = OrderRepository;
