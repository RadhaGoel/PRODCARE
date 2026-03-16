require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("ProdCare API is running");
});

const userRoutes = require("./src/routes/userRoutes");
app.use("/api/users", userRoutes);

const ticketRoutes = require("./src/routes/ticketRoutes");
app.use("/api/tickets", ticketRoutes);

const logRoutes = require("./src/routes/logRoutes");
app.use("/api/logs", logRoutes);

const aiRoutes = require("./src/routes/aiRoutes");
app.use("/api/ai", aiRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
