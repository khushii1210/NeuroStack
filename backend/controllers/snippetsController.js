const prisma = require("../config/db");

//GET all snippets for logged in user
const getSnippets = async (req, res) => {
    try {
      const snippets = await prisma.snippet.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(snippets);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};
  
//POST create a new snippet
const createSnippet = async (req, res) => {
    const { title, code, language, description, tags } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    try {
      const snippet = await prisma.snippet.create({
        data: { title, code, language, description, tags: tags || [], userId: req.user.id },
      });
      res.status(201).json(snippet);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};
  

//PUT update a snippet
const updateSnippet = async (req, res) => {
    const { title, code, language, description, tags, nodeId } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    try {
        const existing = await prisma.snippet.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!existing || existing.userId !== req.user.id) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        const snippet = await prisma.snippet.update({
            where: { id: parseInt(req.params.id) },
            data: {
                title, code, language, description, tags,
                nodeId: nodeId !== undefined ? nodeId : existing.nodeId,
            }
        });
        res.status(200).json(snippet);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//DELETE a snippet
const deleteSnippet = async (req, res) => {
    try {
        const existing = await prisma.snippet.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!existing || existing.userId !== req.user.id) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        await prisma.snippet.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(200).json({ message: "Snippet deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getSnippets, createSnippet, updateSnippet, deleteSnippet };