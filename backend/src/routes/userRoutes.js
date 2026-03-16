const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

// admin-only route
router.get(
    "/admin",
    protect,
    allowRoles("ADMIN"),
    (req, res) => {
        res.json({ message: "Welcome Admin" });
    }
);

// protected route
router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Profile accessed",
        user: req.user
    });
});

module.exports = router;
