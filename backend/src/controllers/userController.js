const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// TEMP user store (DB later)
let users = [];

const pool = require("../config/db");

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userRole = role || "CLIENT"; // default role

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    users.push({
        name,
        email,
        password: hashedPassword,
        role: userRole
    });

    res.status(201).json({
        message: "User registered successfully",
        user: { name, email, role: userRole }
    });
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // find user
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
    {
        email: user.email,
        role: user.role
    },
    "secretkey",
    { expiresIn: "1h" }
);


    res.json({
        message: "Login successful",
        token
    });
};

module.exports = { registerUser, loginUser };
