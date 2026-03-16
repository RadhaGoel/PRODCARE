const { sendSlackMessage } = require("../utils/slackNotifier");
const { createLog } = require("./logControllers");
let tickets = [];

const createTicket = (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    const ticket = {
        id: tickets.length + 1,
        title,
        description,
        priority: priority || "MEDIUM",
        status: "OPEN",
        createdBy: req.user.email,
        assignedTo: null,
        createdAt: new Date()
    };

    tickets.push(ticket);

    sendSlackMessage(
        `New Ticket Created\nTitle: ${title}\nPriority: ${ticket.priority}\nCreated by: ${req.user.email}`
    );

    res.status(201).json({
        message: "Ticket created successfully",
        ticket
    });
};

const assignTicket = (req, res) => {
    const { ticketId, engineerEmail } = req.body;

    const ticket = tickets.find(t => t.id === Number(ticketId));

    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
    }

    sendSlackMessage(
        ` Ticket Assigned\nTicket ID: ${ticket.id}\nAssigned to: ${engineerEmail}`
    );


    ticket.assignedTo = engineerEmail;
    ticket.status = "ASSIGNED";

    res.json({
        message: "Ticket assigned successfully",
        ticket
    });
};

const updateTicketStatus = (req, res) => {
    const { ticketId, status } = req.body;

    const ticket = tickets.find(t => t.id === Number(ticketId));

    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
    }

    sendSlackMessage(
        ` Ticket Status Updated\nTicket ID: ${ticket.id}\nNew Status: ${status}`
    );


    ticket.status = status;

    createLog(
        ticket.id,
        `Ticket status changed to ${status}`,
        "MEDIUM"
    );

    res.json({
        message: "Ticket status updated",
        ticket
    });
};



const getAllTickets = (req, res) => {
    res.json(tickets);
};

module.exports = {
    createTicket,
    getAllTickets,
    assignTicket,
    updateTicketStatus
};

