const authService = require("../services/authService");

const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} = require("../validators/authValidator");

class AuthController {
  async register(req, res, next) {
    try {
      const payload = registerSchema.parse(req.body);

      const result = await authService.register(payload);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const payload = loginSchema.parse(req.body);

      const result = await authService.login(payload.email, payload.password);

      return res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req, res, next) {
    try {
      const payload = changePasswordSchema.parse(req.body);

      const result = await authService.changePassword(
        req.user.id,
        payload.currentPassword,
        payload.newPassword,
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

module.exports = new AuthController();
