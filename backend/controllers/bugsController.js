const prisma = require("../config/db");

//GET all bugs for logged in user
const getBugs = async (req, res) => {
    try {
        const bugs = await prisma.bug.findMany({
            where: {
                userId: req.user.id
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        res.json(bugs);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

//POST create a new bug
const createBug = async (req, res) => {
    const { title, description, severity, status, solution, tags } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    try {
        const bug = await prisma.bug.create({
            data: {
                title,
                description,
                severity,
                status,
                solution: solution || "",
                tags: tags || [],
                userId: req.user.id
            }
        });
        res.status(201).json(bug);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

//PUT update a bug
const updateBug = async (req, res) => {
    const { title, description, severity, status, solution, tags } = req.body;

    try {
        const existing = await prisma.bug.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!existing || existing.userId !== req.user.id) {
            return res.status(404).json({ message: "Bug not found" });
        }

        const bug = await prisma.bug.update({
            where: { id: parseInt(req.params.id) },
            data: { title, description, severity, status, solution, tags }
        });
        res.status(200).json(bug);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

//DELETE a bug
const deleteBug = async (req, res) => {
    try {
        const existing = await prisma.bug.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!existing || existing.userId !== req.user.id) {
            return res.status(404).json({ message: "Bug not found" });
        }

        await prisma.bug.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getBugs,
    createBug,
    updateBug,
    deleteBug
}