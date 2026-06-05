const storeService = require("../services/storeService");

class StoreController {
  async getStores(req, res, next) {
    try {
      const stores = await storeService.getStores(req.query, req.user.id);

      res.json({
        success: true,
        data: stores,
      });
    } catch (err) {
      next(err);
    }
  }

  async getStore(req, res, next) {
    try {
      const store = await storeService.getStoreById(req.params.id, req.user.id);

      res.json({
        success: true,
        data: store,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new StoreController();
