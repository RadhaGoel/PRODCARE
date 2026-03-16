const analyzeError = async (req, res) => {
    const { error } = req.body;

    if (!error) {
        return res.status(400).json({ message: "Error text is required" });
    }

    // mock AI response (for now)
    res.json({
        error,
        analysis: "This error usually occurs when req.user is undefined. Ensure auth middleware runs before role checks.",
        suggestion: "Check JWT middleware and verify token presence."
    });
};

module.exports = { analyzeError };
