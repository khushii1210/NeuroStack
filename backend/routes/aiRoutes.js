const express = require('express');
const router = express.Router();
const { chat, generateGraph, getHistory, clearHistory } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/chat', protect, chat);
router.post('/generate-graph', protect, generateGraph);
router.get('/history', protect, getHistory);
router.delete('/history', protect, clearHistory);

module.exports = router;
