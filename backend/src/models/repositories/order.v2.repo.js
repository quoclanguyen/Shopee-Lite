const { convertToObjectIdMongodb } = require("../../utils");
const Order = require("../order.v2.model");
class OrderRepository {
  async createOrder(orderData) {
    return await Order.create(orderData);
  }
  async findOrdersByShopId(shopId) {
    try {
      const orders = await Order.find({ "orderItems.shop": shopId }).populate(
        "user"
      );
      return orders;
    } catch (error) {
      throw new Error("Could not find orders by shopId");
    }
  }
  async updateOrderStatus(orderId, newStatus) {
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: convertToObjectIdMongodb(orderId) },
        { status: newStatus },
        { new: true }
      );
      return updatedOrder;
    } catch (error) {
      throw new Error("Could not update order status");
    }
  }
}

module.exports = OrderRepository;
