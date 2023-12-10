const { updateUserById } = require("../models/repositories/user.repo");

// UserService.js
class UserService {
  async updateUser(userId, updates) {
    try {
      const user = await updateUserById(userId, updates);
      return user;
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }

  // Add other service methods as needed
}

module.exports = UserService;
