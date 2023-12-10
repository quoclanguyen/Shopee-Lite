const OrderService = require("../services/order.v2.service");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
    this.checkout = this.checkout.bind(this);
    this.getOrdersByShopId = this.getOrdersByShopId.bind(this);
  }

  async checkout(req, res, next) {
    const { userId, orderItems, overallTotalPrice } = req.body;

    try {
      // Gọi service để thực hiện checkout
      const orderData = { user: userId, orderItems: orderItems };

      const createdOrders = await this.orderService.checkout(orderData);

      if (createdOrders.length === 0) {
        return res.status(404).json({ message: "No orders created" });
      }

      res
        .status(201)
        .json({ message: "Orders created successfully", data: createdOrders });
    } catch (error) {
      // Xử lý lỗi nếu có
      res
        .status(500)
        .json({ message: "Failed to create order", error: error.message });
    }
  }

  async getOrdersByShopId(req, res, next) {
    const { shopId } = req.params;

    try {
      const orders = await this.orderService.findOrdersByShopId(shopId);

      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this shop" });
      }

      res.status(200).json({ message: "Orders found", data: orders });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve orders", error: error.message });
    }
  }
}

module.exports = OrderController;
