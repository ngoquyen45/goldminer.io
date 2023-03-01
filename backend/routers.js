const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const dbLib = require('./db/manager');
const poolLib = require('./db/pool');

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/game', (req, res) => {
  res.render('game');
});

// Restfuls API
// Login route
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await poolLib.getConnection();
  const user = await dbLib.getUserByUsername(db, username);

  if (!user || JSON.stringify(user) == '{}') {
    return res.status(404).send({code: 404, msg: 'User not found'});
  }

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
      return res.status(500).send({code: 500, msg: 'Error comparing passwords'});
    }

    if (!result) {
      return res.status(401).send({code: 401, msg: 'Incorrect password'});
    }

    // Generate a token for the user
    const token = await dbLib.createOrUpdateToken(db, username);
    if (!token) {
      return res.status(500).send({code: 500, msg: 'Token is error'});
    }
    return res.send({code: 200, msg: 'Login successful', token: token});
  });
});

router.get('/api/verify', async (req, res) => {
  const db = await poolLib.getConnection();
    const token = getToken(req);
    const isValid = await dbLib.validateToken(db, token);
    if (!isValid)
      return res.status(401).send({code: 401, msg: 'Token is invalid'});
    return res.send({code: 200, msg: 'Token is valid' });
});

// Logout route
router.post('/api/logout', (req, res) => {
  return res.send('Logout successful');
});

// Password reset route
router.post('/api/reset', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(404).send('User not found');
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    user.password = hash;
    return res.send('Password reset successful');
  });
});


function getToken(req) {
  try {
    const authHeader = req.header('Authorization');
    return authHeader.split(' ')[1];
  }
  catch (error) {
    return ''
  }
}


module.exports = router;
