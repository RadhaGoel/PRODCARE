const express = require("express");
const router = express.Router();

const { analyzeError } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

router.post("/analyze", protect, analyzeError);

module.exports = router;
