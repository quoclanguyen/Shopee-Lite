const UserService = require("../services/user.service");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.updateUser = this.updateUser.bind(this);
  }

  async updateUser(req, res) {
    const { userId } = req.params;
    const updates = req.body;

    try {
      const updatedUser = await this.userService.updateUser(userId, updates);
      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  // Add other controller methods as needed
}

module.exports = UserController;
