const Order = require("../order.v2.model");
class OrderRepository {
  async createOrder(orderData) {
    return await Order.create(orderData);
  }
  async findOrdersByShopId(shopId) {
    try {
      const orders = await Order.find({ "orderItems.shop": shopId }).populate("user");
      return orders;
    } catch (error) {
      throw new Error("Could not find orders by shopId");
    }
  }
}

module.exports = OrderRepository;
