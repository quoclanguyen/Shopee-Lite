"use strict";

const { convertToObjectIdMongodb } = require("../../utils");
const user = require("../user.model");

const findShopById = async ({
  shop_id,
  select = {
    email: 1,
    password: 2,
    name: 1,
    status: 1,
    roles: 1,
  },
}) => {
  return await user
    .findOne({ _id: convertToObjectIdMongodb(shop_id) })
    .select(select);
};
module.exports = {
  findShopById,
};
