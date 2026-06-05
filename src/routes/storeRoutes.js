const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const controller = require("../controllers/storeController");

router.use(auth);

router.get("/", controller.getStores);

router.get("/:id", controller.getStore);

module.exports = router;
