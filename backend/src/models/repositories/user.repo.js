"use strict";

const { convertToObjectIdMongodb } = require("../../utils");
const user = require("../user.model");

const findByEmail = async ({
  email,
  select = {
    email: 1,
    password: 2,
    name: 1,
    status: 1,
    roles: 1,
  },
}) => {
  return await user.findOne({ email }).select(select).lean();
};
const findById = async ({
  shop_id,
  select = {
    email: 1,
    password: 2,
    name: 1,
    status: 1,
    roles: 1,
  },
}) => {
  console.log({ shop_id });
  return await user
    .findOne({ _id: convertToObjectIdMongodb(shop_id) })
    .select(select);
};
const createNewRole = async ({ foundUser, role }) => {
  const query = { email: foundUser.email },
    updateOrInsert = {
      $addToSet: {
        roles: role,
      },
    },
    options = { upsert: true, new: true };

  return await user.findOneAndUpdate(query, updateOrInsert, options);
};
async function updateUserById(userId, updates) {
  return user.findOneAndUpdate(
    { _id: convertToObjectIdMongodb(userId) },
    { $set: updates },
    { new: true }
  );
}
module.exports = {
  findByEmail,
  createNewRole,
  findById,
  updateUserById,
};
