const router = require("express").Router();

const authController = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Change password
 */
router.post("/change-password", auth, authController.changePassword);

module.exports = router;
