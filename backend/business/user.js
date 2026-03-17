const db = require('../config/db');

function welcomeRemarks() {
  return 'This is test API';
}

async function getAllUsers() {
  const users = await db('users').select('*');
  return users;
}

module.exports = {
  welcomeRemarks,
  getAllUsers
};
