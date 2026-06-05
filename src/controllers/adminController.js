const adminService = require("../services/adminService");

const {
  createUserSchema,
  createStoreSchema,
} = require("../validators/adminValidator");

class AdminController {
  async dashboard(req, res, next) {
    try {
      const result = await adminService.getDashboardStats();

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const payload = createUserSchema.parse(req.body);

      const user = await adminService.createUser(payload);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async createStore(req, res, next) {
    try {
      const payload = createStoreSchema.parse(req.body);

      const store = await adminService.createStore(payload);

      res.status(201).json({
        success: true,
        data: store,
      });
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await adminService.getUsers(req.query);

      res.json({
        success: true,
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }

  async getStores(req, res, next) {
    try {
      const stores = await adminService.getStores(req.query);

      res.json({
        success: true,
        data: stores,
      });
    } catch (err) {
      next(err);
    }
  }

  async getUserDetails(req, res, next) {
    try {
      const user = await adminService.getUserDetails(req.params.id);

      res.json({
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await adminService.deleteUser(req.params.id);

      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
