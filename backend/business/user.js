const db = require('../config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

let Users = {};

Users.getUserProfile = async function(req, res) {
  let userId = req.token.userId;
  try {
    const user = await db('users').where('id', userId).first();
    if (!user) throw new Error('User not found');
    return res.json({ status: 'success', message: 'User profile retrieved successfully', data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = Users;
