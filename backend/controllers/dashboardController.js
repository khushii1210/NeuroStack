const prisma = require("../config/db");

const getStats = async (req, res) => {
    const userId = req.user.id;
    try {
        const [totalNotes, totalSnippets, totalBugs, openBugs, resolvedBugs, recentNotes, recentSnippets, recentBugs] = await Promise.all([
            prisma.note.count({ where: { userId } }),
            prisma.snippet.count({ where: { userId } }),
            prisma.bug.count({ where: { userId } }),
            prisma.bug.count({ where: { userId, status: "open" } }),
            prisma.bug.count({ where: { userId, status: "resolved" } }),
            prisma.note.findMany({
                where: { userId },
                orderBy: { updatedAt: "desc" },
                take: 3
            }),
            prisma.snippet.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                take: 3
            }),
            prisma.bug.findMany({
                where: { userId, status: "open" },
                orderBy: { createdAt: "desc" },
                take: 3
            })
        ]);

        res.status(200).json({
            totalNotes,
            totalSnippets,
            totalBugs,
            openBugs,
            resolvedBugs,
            recentNotes,
            recentSnippets,
            recentBugs
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getStats };