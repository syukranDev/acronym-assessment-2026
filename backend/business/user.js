const db = require('../config/db');
const logger = require('../config/logger');

let Users = {};

Users.getUserProfile = async function(req, res) {
  let userId = req.token.userId;
  if (!userId) return res.status(401).json({ status: 'error', message: 'Missing user ID' });
  
  try {
    const user = await db('users').where('id', userId).first();
    if (!user) throw new Error('User not found');

    return res.json({ status: 'success', message: 'User profile retrieved successfully', data: user });
  } catch (error) {
    logger.error('getUserProfile', { message: error.message, stack: error.stack });
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = Users;
