const express = require('express');
const router = express.Router();
const { register, login, updateProfile, updatePassword, deleteAccount, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, (req, res) => {
  res.status(200).json(req.user);
});
router.post('/register', register);
router.post('/login', login);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);
router.delete('/account', protect, deleteAccount);
router.post('/logout', logout);

module.exports = router;