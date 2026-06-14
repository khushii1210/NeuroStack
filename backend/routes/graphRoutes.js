const express = require('express');
const router = express.Router();
const { getGraph, createNode, createEdge, updateNode, updateNodePosition, deleteNode, deleteEdge } = require('../controllers/graphController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getGraph);
router.post('/nodes', createNode);
router.post('/edges', createEdge);
router.put('/nodes/:id', updateNode);
router.patch('/nodes/:id/position', updateNodePosition);
router.delete('/nodes/:id', deleteNode);
router.delete('/edges/:id', deleteEdge);

module.exports = router;