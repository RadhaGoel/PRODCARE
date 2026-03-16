const express = require("express");
const router = express.Router();

const { createTicket, getAllTickets, updateTicketStatus, assignTicket } = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// CLIENT can create ticket
router.post(
    "/",
    protect,
    allowRoles("CLIENT"),
    createTicket
);

// ADMIN can view all tickets
router.get(
    "/",
    protect,
    allowRoles("ADMIN"),
    getAllTickets
);

// ADMIN can assign ticket to engineer
router.put(
    "/assign",
    protect,
    allowRoles("ADMIN"),
    assignTicket
);

// ENGINEER updates status
router.put("/status", protect, allowRoles("ENGINEER"), updateTicketStatus);

module.exports = router;
