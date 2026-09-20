const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/messages', isAuthenticated, messageController.postMessage);
router.post('/messages/:id/delete', isAuthenticated, messageController.deleteMessage);

module.exports = router;
