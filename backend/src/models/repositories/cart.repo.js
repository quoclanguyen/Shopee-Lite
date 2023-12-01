"use strict";

const { getSelectData, unGetSelectData } = require("../../utils");
const { cart } = require("../cart.model");

const checkCartExists = async ({ model, filter }) => {
  return await model.findOne(filter).lean();
};

const createUserCart = async ({ userId, product }) => {
  const query = { cart_userId: userId, cart_state: "active" },
    updateOrInsert = {
      $addToSet: {
        cart_products: product,
      },
    },
    options = { upsert: true, new: true };

  return await cart.findOneAndUpdate(query, updateOrInsert, options);
};

const updateUserCartQuantity = async ({ userId, product }) => {
  const { productId, quantity } = product;
  const query = {
      cart_userId: userId,
      "cart_product.productId": productId,
      cart_state: "active",
    },
    updateSet = {
      $inc: {
        "cart_products.$.quantity": quantity,
      },
    },
    options = { upsert: true, new: true };

  return await cart.findOneAndUpdate(query, updateSet, options);
};

module.exports = {
  checkCartExists,
  createUserCart,
  updateUserCartQuantity,
};
