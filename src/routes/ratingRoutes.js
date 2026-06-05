const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const controller = require("../controllers/ratingController");

router.use(auth);

router.post("/", controller.submit);

router.put("/:storeId", controller.update);

module.exports = router;
