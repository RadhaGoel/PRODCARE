require("dotenv").config();
const express = require("express");
const app = express();

const morgan = require("morgan");

app.use(morgan("dev"));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "ProdCare API",
    time: new Date()
  });
});

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

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error"
  });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
