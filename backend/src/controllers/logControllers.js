let logs = [];

const createLog = (ticketId, errorMessage, severity = "LOW") => {
    const log = {
        id: logs.length + 1,
        ticketId,
        errorMessage,
        severity,
        createdAt: new Date()
    };

    logs.push(log);
};

const getLogs = (req, res) => {
    res.json(logs);
};

module.exports = {
    createLog,
    getLogs
};
