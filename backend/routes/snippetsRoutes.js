const express = require('express');
const router = express.Router();
const { getSnippets, createSnippet, updateSnippet, deleteSnippet } = require('../controllers/snippetsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // protect all routes

router.get('/', getSnippets);
router.post('/', createSnippet);
router.put('/:id', updateSnippet);
router.delete('/:id', deleteSnippet);

module.exports = router;