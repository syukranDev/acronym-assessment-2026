const express = require('express');
const router = express.Router();
const biz = require('../business/business');
const { verifyToken } = require('../middleware/auth');

router.get('/profile', verifyToken, (req, res) => {
  biz.user.getUserProfile(req, res);
});

module.exports = router;
