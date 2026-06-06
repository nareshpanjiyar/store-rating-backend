const ownerService = require("../services/ownerService");

class OwnerController {
  async dashboard(req, res, next) {
    try {
      const result = await ownerService.getDashboard(
        req.user.id,
        req.query.storeId,
      );

      return res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OwnerController();
