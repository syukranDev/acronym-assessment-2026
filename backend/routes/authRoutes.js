const express = require('express');
const router = express.Router();
const biz = require('../business/business');
const loginThrottle = require('../middleware/loginRateLimiter');

router.post('/signup', async (req, res) => {
    biz.auth.createNewUser(req, res);
});

router.post('/login', loginThrottle, async (req, res) => {
    biz.auth.loginExistingUser(req, res);
});

module.exports = router;