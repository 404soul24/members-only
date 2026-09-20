const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/become-member', isAuthenticated, membershipController.getMemberForm);
router.post('/become-member', isAuthenticated, membershipController.postMemberUpgrade);
router.get('/become-admin', isAuthenticated, membershipController.getAdminForm);
router.post('/become-admin', isAuthenticated, membershipController.postAdminUpgrade);

module.exports = router;
