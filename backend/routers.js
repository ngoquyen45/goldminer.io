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
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await poolLib.getConnection();
  const user = await dbLib.getUserByUsername(db, username);

  if (!user || JSON.stringify(user) == '{}') {
    return res.status(404).send({code: 404, msg: 'User not found'});
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).send({code: 500, msg: 'Error comparing passwords'});
    }

    if (!result) {
      return res.status(401).send({code: 401, msg: 'Incorrect password'});
    }

    return res.send({code: 200, msg: 'Login successful'});
  });
});

// Logout route
router.post('/logout', (req, res) => {
  return res.send('Logout successful');
});

// Password reset route
router.post('/reset', (req, res) => {
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


module.exports = router;
