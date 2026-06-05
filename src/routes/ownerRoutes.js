const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const ownerController = require("../controllers/ownerController");

router.use(auth);

router.use(role("STORE_OWNER"));

router.get("/dashboard", ownerController.dashboard);

module.exports = router;
