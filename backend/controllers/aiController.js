const { GoogleGenerativeAI } = require("@google/generative-ai");
const prisma = require("../config/db");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chat = async (req, res) => {
  const { message, history } = req.body;
  const userId = req.user.id;
  if (!message) return res.status(400).json({ message: 'Message is required' });

  try {
    // fetch user's knowledge base
    const [notes, snippets, bugs] = await Promise.all([
      prisma.note.findMany({
        where: { userId },
        select: { title: true, content: true, tags: true, createdAt: true },
        orderBy: { updatedAt: 'desc' },
        take: 30,
      }),
      prisma.snippet.findMany({
        where: { userId },
        select: { title: true, code: true, language: true, description: true, tags: true },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      prisma.bug.findMany({
        where: { userId },
        select: { title: true, description: true, solution: true, tags: true, status: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
    ]);

    // format knowledge base for the prompt
    const notesContext = notes.length > 0
      ? notes.map(n =>
          `Note: "${n.title}" (${new Date(n.createdAt).toDateString()})\n${n.content}\nTags: ${n.tags.join(', ')}`
        ).join('\n\n')
      : 'No notes saved yet.';

    const snippetsContext = snippets.length > 0
      ? snippets.map(s =>
          `Snippet: "${s.title}" [${s.language}]\n${s.description}\nCode:\n${s.code}\nTags: ${s.tags.join(', ')}`
        ).join('\n\n')
      : 'No snippets saved yet.';

    const bugsContext = bugs.length > 0
      ? bugs.map(b =>
          `Bug: "${b.title}" (${b.status}) — ${new Date(b.createdAt).toDateString()}\nDescription: ${b.description}\nSolution: ${b.solution || 'Not yet solved'}\nTags: ${b.tags.join(', ')}`
        ).join('\n\n')
      : 'No bugs saved yet.';

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `You are an expert coding assistant built into NeuroStack, a developer productivity app.
You ONLY answer questions related to software development, programming, and technology.

If the user asks ANYTHING outside of software development — such as cooking, sports, politics, relationships, or general knowledge — respond with exactly:
"I'm a developer assistant and can only help with software development and programming topics. Feel free to ask me anything code-related!"

--- THE USER'S KNOWLEDGE BASE ---

NOTES:
${notesContext}

CODE SNIPPETS:
${snippetsContext}

BUG JOURNAL:
${bugsContext}

--- END OF KNOWLEDGE BASE ---

When answering, search the knowledge base above first. If you find a relevant note, snippet, or bug:
- Reference it explicitly (e.g. "Based on your note 'JWT Auth Setup'..." or "You solved a similar bug on May 14...")
- Quote the solution or relevant content directly
- Tell the user when they first encountered or saved it

If nothing relevant is found in the knowledge base, answer from your general knowledge.
Keep responses concise and practical. Use code examples when helpful. Format code blocks with the language name.`,
    });

    const geminiHistory = (history || []).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chatSession = model.startChat({ history: geminiHistory });
    const result = await chatSession.sendMessage(message);
    const reply = result.response.text();

    await prisma.chatMessage.createMany({
      data: [
        { role: 'user', content: message, userId },
        { role: 'assistant', content: reply, userId },
      ],
    });

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Gemini error:', err.message);
    res.status(500).json({ message: 'AI service error' });
  }
};

const getHistory = async (req, res) => {
  try {
    const messages = await prisma.chatMessage.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Get history error:", err.message);
    res.status(500).json({ message: "Failed to load history" });
  }
};

const clearHistory = async (req, res) => {
  try {
    await prisma.chatMessage.deleteMany({ where: { userId: req.user.id } });
    res.status(200).json({ message: "History cleared" });
  } catch (err) {
    console.error("Clear history error:", err.message);
    res.status(500).json({ message: "Failed to clear history" });
  }
};

const generateGraph = async (req, res) => {
  try {
    const userId = req.user.id;

    const [notes, snippets, bugs] = await Promise.all([
      prisma.note.findMany({
        where: { userId },
        select: { id: true, title: true, content: true, tags: true },
      }),
      prisma.snippet.findMany({
        where: { userId },
        select: { id: true, title: true, description: true, language: true, tags: true },
      }),
      prisma.bug.findMany({
        where: { userId },
        select: { id: true, title: true, description: true, tags: true },
      }),
    ]);

    if (notes.length === 0 && snippets.length === 0) {
      return res.status(400).json({ message: "No data to generate graph" });
    }

    const notesText = notes
      .map((n) => `Note #${n.id}: ${n.title}\n${n.content}\nTags: ${n.tags.join(", ")}`)
      .join("\n\n");
    const snippetsText = snippets
      .map((s) => `Snippet #${s.id}: ${s.title} (${s.language})\n${s.description}\nTags: ${s.tags.join(", ")}`)
      .join("\n\n");
    const bugsText = bugs
      .map((b) => `Bug #${b.id}: ${b.title}\n${b.description}\nTags: ${b.tags.join(", ")}`)
      .join("\n\n");
    const content = `${notesText}\n\n${snippetsText}\n\n${bugsText}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Analyze these developer notes, code snippets, and bugs. Extract key technical concepts and their relationships. Also link each note, snippet, and bug to the most relevant concept node.

Content:
${content}

Return ONLY valid JSON in this exact format (no markdown, no explanations):
{
    "nodes": [
        { "label": "React", "category": "framework", "description": "A JavaScript library for building user interfaces using reusable components and a virtual DOM." },
        { "label": "useEffect", "category": "concept", "description": "A React hook that runs side effects after render, replacing lifecycle methods like componentDidMount." }
    ],
    "edges": [
        { "from": "React", "to": "useEffect" }
    ],
    "links": {
        "notes": [{ "id": 1, "node": "React" }],
        "snippets": [{ "id": 2, "node": "useEffect" }],
        "bugs": [{ "id": 3, "node": "React" }]
    }
}

Rules:
- Extract 8-15 most important concepts
- Categories must be one of: concept, language, framework, tool, database, other
- Each node must have a concise 1-2 sentence description
- Each edge connects two nodes by their exact label
- Only create edges where there is a clear relationship
- In links, use the exact numeric IDs shown above (Note #1 has id 1, Snippet #2 has id 2, etc.)
- Only link items where there is a strong clear match to a node
- Return ONLY the JSON object, nothing else`;

    console.log('[generateGraph] Calling Gemini...');
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    console.log('[generateGraph] Raw AI response:', response.substring(0, 300));

    let graphData;
    try {
      const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      graphData = JSON.parse(cleaned);
      console.log('[generateGraph] Parsed nodes:', graphData.nodes?.length, 'edges:', graphData.edges?.length, 'links:', JSON.stringify(graphData.links));
    } catch (parseErr) {
      console.error('[generateGraph] JSON parse failed:', parseErr.message);
      console.error('[generateGraph] Raw response was:', response);
      return res.status(500).json({ message: "Failed to parse AI response" });
    }

    const { canvasMaxY = 0 } = req.body;
    const offsetY = canvasMaxY > 0 ? canvasMaxY + 260 : 100;
    const offsetX = 100;

    const createdNodes = [];
    for (let i = 0; i < graphData.nodes.length; i++) {
      const node = graphData.nodes[i];
      const created = await prisma.node.create({
        data: {
          label: node.label,
          category: node.category || "concept",
          description: node.description || "",
          x: offsetX + (i % 4) * 260,
          y: offsetY + Math.floor(i / 4) * 160,
          userId,
        },
      });
      createdNodes.push(created);
    }
    console.log('[generateGraph] Created', createdNodes.length, 'nodes');

    const createdEdges = [];
    for (const edge of graphData.edges) {
      const fromNode = createdNodes.find((n) => n.label === edge.from);
      const toNode = createdNodes.find((n) => n.label === edge.to);
      if (fromNode && toNode) {
        const created = await prisma.edge.create({
          data: { fromNodeId: fromNode.id, toNodeId: toNode.id, userId },
        });
        createdEdges.push(created);
      }
    }

    const links = graphData.links || {};

    if (links.notes?.length) {
      for (const link of links.notes) {
        const targetNode = createdNodes.find((n) => n.label === link.node);
        if (targetNode) {
          await prisma.note.updateMany({ where: { id: link.id, userId }, data: { nodeId: targetNode.id } });
        }
      }
    }

    if (links.snippets?.length) {
      for (const link of links.snippets) {
        const targetNode = createdNodes.find((n) => n.label === link.node);
        if (targetNode) {
          await prisma.snippet.updateMany({ where: { id: link.id, userId }, data: { nodeId: targetNode.id } });
        }
      }
    }

    if (links.bugs?.length) {
      for (const link of links.bugs) {
        const targetNode = createdNodes.find((n) => n.label === link.node);
        if (targetNode) {
          await prisma.bug.updateMany({ where: { id: link.id, userId }, data: { nodeId: targetNode.id } });
        }
      }
    }

    res.status(200).json({ message: "Graph generated successfully", nodes: createdNodes, edges: createdEdges });
  } catch (err) {
    console.error("[generateGraph] Error:", err);
    res.status(500).json({ message: "Failed to generate graph" });
  }
};

module.exports = { chat, generateGraph, getHistory, clearHistory };