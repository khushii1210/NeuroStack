const prisma = require("../config/db");

//GET all notes for logged in user
const getNotes = async (req, res) => {
    try {
        const notes = await prisma.note.findMany({
            where: { userId: req.user.id },
            orderBy: { updatedAt: 'desc'},
        });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//POST create a new note
const createNote = async (req, res) => {
    const { title, content, tags } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    try {
        const note = await prisma.note.create({
            data: {
                title,
                content,
                tags: tags || [],
                userId: req.user.id,
            },
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//PUT update a note
const updateNote = async (req, res) => {
    const { title, content, tags, nodeId } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    try {
        const existing = await prisma.note.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!existing || existing.userId !== req.user.id) {
            return res.status(404).json({ message: "Note not found" });
        }

        const note = await prisma.note.update({
            where: { id: parseInt(req.params.id) },
            data: {
                title,
                content,
                tags,
                nodeId: nodeId !== undefined ? nodeId : existing.nodeId,
            },
        });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//DELETE a note
const deleteNote = async (req, res) => {
    try {
        const existing  = await prisma.note.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!existing || existing.userId !== req.user.id) {
            return res.status(404).json({ message: "Note not found" });
        }

        await prisma.note.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(200).json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };