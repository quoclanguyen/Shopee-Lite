const OrderService = require("../services/order.v2.service");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
    this.checkout = this.checkout.bind(this);
  }

  async checkout(req, res, next) {
    const { userId, orderItems, overallTotalPrice } = req.body;

    try {
      // Gọi service để thực hiện checkout
      const createdOrder = await this.orderService.checkout(
        userId,
        orderItems,
        overallTotalPrice
      );

      // Trả về thông tin đơn hàng đã tạo
      res
        .status(201)
        .json({ message: "Order created successfully", data: createdOrder });
    } catch (error) {
      // Xử lý lỗi nếu có
      res
        .status(500)
        .json({ message: "Failed to create order", error: error.message });
    }
  }

  // Các phương thức khác liên quan đến xử lý yêu cầu từ người dùng
}

module.exports = OrderController;
