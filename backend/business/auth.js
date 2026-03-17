const db = require('../config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

let Users = {};

Users.createNewUser = async function(req, res) {
  let { name, email, password } = req.body;
  
  if (!name || !email || !password) 
    return res.status(422).json({ status: 'error', message: 'All fields are required' });

  if (name.length < 3) 
    return res.status(422).json({ status: 'error', message: 'Name must be at least 3 characters long' });

  const hasAt = email.includes('@');
  const validSuffix = email.endsWith('.com') || email.endsWith('.my');
  if (!hasAt || !validSuffix) return res.status(422).json({ status: 'error', message: 'Invalid email address' });

  if (password.length < 6) 
    return res.status(422).json({ status: 'error', message: 'Password must be at least 6 characters long' });


  try {
    const existingEmail = await db('users').where('email', email).first();
    if (existingEmail) throw new Error('Email or username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db('users').insert({
      id: uuidv4(),
      email,
      password: hashedPassword,
      name
    });

    return res.json({ status: 'success', message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

Users.loginExistingUser = async function(req, res) {
  let { email, password } = req.body;
  if (!email || !password) return res.status(422).json({ status: 'error', message: 'All fields are required' });
  const hasAt = email.includes('@');
  const validSuffix = email.endsWith('.com') || email.endsWith('.my');
  if (!hasAt || !validSuffix) return res.status(422).json({ status: 'error', message: 'Invalid email address' });
  if (password.length < 6) return res.status(422).json({ status: 'error', message: 'Password must be at least 6 characters long' });
  try {
    const user = await db('users').where('email', email).first();
    if (!user) throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ status: 'success', message: 'User logged in successfully', data: { user, token } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = Users;
