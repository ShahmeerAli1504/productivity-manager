const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/auth');

// Register route
router.post('/register', authController.register);

// Get current user route (protected)
router.get('/me', authenticate, authController.getCurrentUser);

module.exports = router;