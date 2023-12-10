const express = require("express");
const { authentication } = require("../../auth/authUtils");
const OrderController = require("../../controllers/order.v2.controller");
const router = express.Router();

const orderController = new OrderController();

// router.use(authentication);
// Route for creating or adding an item to a cart
router.post("/checkout", orderController.checkout);

module.exports = router;
