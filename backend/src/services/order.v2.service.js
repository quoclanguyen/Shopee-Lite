const OrderRepository = require("../models/repositories/order.v2.repo");

class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async checkout(userId, orderItems, overallTotalPrice) {
    try {
      const orderData = {
        user: userId,
        orderItems: orderItems,
        overallTotalPrice: overallTotalPrice,
        status: "pending",
      };
      const createdOrder = await this.orderRepository.createOrder(orderData);
      return createdOrder;
    } catch (error) {
      throw new Error("Could not create order");
    }
  }
  async findOrdersByShopId(shopId) {
    try {
      const orders = await this.orderRepository.findOrdersByShopId(shopId);
      return orders;
    } catch (error) {
      throw new Error("Could not find orders by shopId");
    }
  }
}

module.exports = OrderService;
