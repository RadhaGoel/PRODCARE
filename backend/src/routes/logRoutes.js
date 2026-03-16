const express = require("express");
const router = express.Router();

const { getLogs } = require("../controllers/logControllers");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

router.get(
    "/",
    protect,
    allowRoles("ADMIN"),
    getLogs
);

module.exports = router;
