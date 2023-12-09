"use strict";

const { findShopById } = require("../models/repositories/shop.repo");
const shopModel = require("../models/shop.model");
const user = require("../models/user.model");
class ShopService {
  static async findShopById({ shop_id }) {
    return await findShopById({ shop_id, unSelect: ["__v"] });
  }
}
module.exports = ShopService;
