const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth.js');

const UsersController = require('../controllers/user.js');

// Login
router.post('/login', UsersController.user_login);

// Signup
router.post('/signup', UsersController.user_signup);

// Get user details by email
router.get('/:useremail', checkAuth, UsersController.user_get_useremail);

// Update user details
router.patch('/:useremail', checkAuth, UsersController.user_update);

// Delete user details
router.delete('/:useremail', checkAuth, UsersController.user_delete);

module.exports = router;