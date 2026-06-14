const prisma = require("../config/db");

const getGraph = async (req, res) => {
    try {
        const nodes = await prisma.node.findMany({ where: { userId: req.user.id } });
        const edges = await prisma.edge.findMany({ where: { userId: req.user.id } });
        res.status(200).json({ nodes, edges });
    } catch (err) {
        console.error('Graph error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getNodeDetail = async (req, res) => {
    try {
        const node = await prisma.node.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                notes: { select: { id: true, title: true, tags: true, updatedAt: true } },
                snippets: { select: { id: true, title: true, language: true, tags: true } },
                bugs: { select: { id: true, title: true, severity: true, status: true } },
                edgesFrom: { include: { toNode: { select: { id: true, label: true, category: true } } } },
                edgesTo: { include: { fromNode: { select: { id: true, label: true, category: true } } } }
            },
        });
        if (!node || node.userId !== req.user.id) {
            return res.status(404).json({ message: 'Node not found' });
        }
        res.status(200).json(node);
    } catch (err) {
        console.error('Node detail error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const createNode = async (req, res) => {
    const { label, category, description } = req.body;
    if (!label) return res.status(400).json({ message: 'Label is required' });
    try {
        const node = await prisma.node.create({
            data: { label, category: category || 'concept', description: description || '', userId: req.user.id }
        });
        res.status(201).json(node);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};

const createEdge = async (req, res) => {
    const { fromNodeId, toNodeId } = req.body;
    if (!fromNodeId || !toNodeId) return res.status(400).json({ message: 'Both fromNodeId and toNodeId are required' });
    try {
        const edge = await prisma.edge.create({
            data: { fromNodeId, toNodeId, userId: req.user.id },
        });
        res.status(201).json(edge);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateNode = async (req, res) => {
    const { label, category, description } = req.body;
    try {
        const existing = await prisma.node.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!existing || existing.userId !== req.user.id) {
            return res.status(404).json({ message: 'Node not found' });
        }
        const updated = await prisma.node.update({
            where: { id: existing.id },
            data: { label: label || existing.label, category: category || existing.category, description: description || existing.description },
        });
        res.status(200).json(updated);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteNode = async (req, res) => {
    try {
        const existing = await prisma.node.findUnique
            ({ where: { id: parseInt(req.params.id) } });
        if (!existing || existing.userId !== req.user.id) {
            return res.status(404).json({ message: 'Node not found' });
        }
        // Delete related edges first
        await prisma.edge.deleteMany({
            where: {
                OR: [
                    { fromNodeId: existing.id },
                    { toNodeId: existing.id }
                ]
            }
        });
        await prisma.node.delete({ where: { id: existing.id } });
        res.status(200).json({ message: 'Node deleted' });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteEdge = async (req, res) => { 
    try {
        const existing = await prisma.edge.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!existing || existing.userId !== req.user.id) {
            return res.status(400).json({ message: 'Edge not found' });
        }
        await prisma.edge.delete({ where: { id: existing.id } });
        res.status(200).json({ message: 'Edge deleted' });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateNodePosition = async (req, res) => {
    const { x, y } = req.body;
    try {
        const existing = await prisma.node.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!existing || existing.userId !== req.user.id) {
            return res.status(404).json({ message: 'Node not found' });
        }
        await prisma.node.update({
            where: { id: existing.id },
            data: { x, y },
        });
        res.status(200).json({ message: 'Position saved' });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getGraph, getNodeDetail, createNode, createEdge, updateNode, updateNodePosition, deleteNode, deleteEdge };