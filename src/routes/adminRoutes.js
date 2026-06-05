const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const controller = require("../controllers/adminController");

router.use(auth);
router.use(role("ADMIN"));

router.get("/dashboard", controller.dashboard);

router.post("/users", controller.createUser);

router.post("/stores", controller.createStore);

router.get("/users", controller.getUsers);

router.get("/users/:id", controller.getUserDetails);

router.get("/stores", controller.getStores);

router.delete("/users/:id", controller.deleteUser);

module.exports = router;
