const { GoogleGenerativeAI } = require('@google/generative-ai');
const prisma = require("../config/db");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chat = async (req, res) => {
  const { message, history } = req.body;
  const userId = req.user.id;
  if (!message) return res.status(400).json({ message: 'Message is required' });

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `You are an expert coding assistant built into NeuroStack, a developer productivity app.
      You ONLY answer questions related to software development, programming, and technology. This includes:
      - Code explanations, debugging, and error fixing
      - Software architecture and design patterns
      - Programming languages, frameworks, libraries, and tools
      - Databases, APIs, DevOps, and infrastructure
      - Best practices, performance, and security in software development
      - Computer science concepts

      If the user asks ANYTHING outside of these topics — such as cooking, sports, politics, relationships, general knowledge, or any non-development subject — you must respond with exactly:
      "I'm a developer assistant and can only help with software development and programming topics. Feel free to ask me anything code-related!"

      Do not attempt to answer non-development questions under any circumstances, even if the user insists or reframes the question.
      Keep responses concise and practical. Use code examples when helpful. Format code blocks with the language name.`,
    });

    const geminiHistory = (history || []).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chatSession = model.startChat({ history: geminiHistory });
    const result = await chatSession.sendMessage(message);
    const reply = result.response.text();

    // persist both turns
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
      orderBy: { createdAt: 'asc' },
    });
    res.status(200).json(messages);
  } catch (err) {
    console.error('Get history error:', err.message);
    res.status(500).json({ message: 'Failed to load history' });
  }
};

const clearHistory = async (req, res) => {
  try {
    await prisma.chatMessage.deleteMany({ where: { userId: req.user.id } });
    res.status(200).json({ message: 'History cleared' });
  } catch (err) {
    console.error('Clear history error:', err.message);
    res.status(500).json({ message: 'Failed to clear history' });
  }
};

const generateGraph = async (req, res) => {
    try {
        const userId = req.user.id;

        //fetch all user's notes and snippets
        const [notes, snippets] = await Promise.all([
            prisma.note.findMany({ where: { userId }, select: { title: true, content: true, tags: true } }),
            prisma.snippet.findMany({ where: { userId }, select: { title: true, description: true, language: true, tags: true } }),
        ]);

        if (notes.length === 0 && snippets.length === 0) {
            return res.status(400).json({ message: 'No data to generate graph' });
        }

        //prepare content for AI
        const notesText = notes.map(n => `Note: ${n.title}\n${n.content}\nTags: ${n.tags.join(', ')}`).join('\n\n');
        const snippetsText = snippets.map(s => `Snippet: ${s.title} (${s.language})\n${s.description}\nTags: ${s.tags.join(', ')}`).join('\n\n');
        const content = `${notesText}\n\n${snippetsText}`;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const prompt = `Analyze these developer notes and code snippets. Extract key technical conscepts and their relationships.
        
        Content: 
        ${content}
        
        Return ONLY valid JSON in this exact format (no markdown, no explanations):
        {
            "nodes": [
                {"label": "React:, "category": "framework"},
                { "label": "useEffect", "category": "concept" }
            ]
            "edges": [
                { "from": "React", "to": "useEffect" }
            ]
        }

        Rules:
        - Extract 8-15 most important concepts
        - Categories must be one of: concept, language, framework, tool, database, other
        - Each edge connects two nodes by their exact label
        - Only create edges where there's a clear relationship
        - Return ONLY the JSON object, nothing else`;
        
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        // parse JSON from response
        let graphData;
        try {
            const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            graphData = JSON.parse(cleaned);
        } catch {
            return res.status(500).json({ message: 'Failed to parse AI response' });
        }

        //create nodes first
        const createdNodes = [];
        for (const node of graphData.nodes) {
            const created = await prisma.node.create({
                data: { label: node.label, category: node.category || 'concept', userId },
            });
            createdNodes.push(created);
        }

        //create edges
        const createdEdges = [];
        for (const edge of graphData.edges) {
            const fromNode = createdNodes.find(n => n.label === edge.from);
            const toNode = createdNodes.find(n => n.label === edge.to);
            if (fromNode && toNode) {
                const created = await prisma.edge.create({
                    data: { fromNodeId: fromNode.id, toNodeId: toNode.id, userId },
                });
                createdEdges.push(created);
            }
        }

        res.status(200).json({ message: 'Graph generated successfully', nodes: createdNodes, edges: createdEdges });
    } catch (err) {
        console.error('Generate graph error:', err.message);
        res.status(500).json({ message: 'Failed to generate graph' });
    }
};

module.exports = { chat, generateGraph, getHistory, clearHistory };