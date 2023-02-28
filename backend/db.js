const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "hellodev"
const DBSOURCE = "./db.sqlite";

async function openConnection() {
  try {
    const db = await open({
      filename: DBSOURCE,
      driver: sqlite3.cached.Database
    });
    console.log('Connection opened successfully.');
    return db;
  } catch (error) {
    console.error('Error opening database:', error.message);
  }
}

async function closeConnection(db) {
  return await db.close();
}

// Danh sách các hàm liên quan đến user
async function createUserTable(db) {
  try {
    await db.run(`CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      password TEXT
    )`);
    console.log('Created users table.');
  } catch (err) {
    console.error(err.message);
  }
}

async function insertOrUpdateUser(db, username, password) {
  try {
    // Check if the username exists in the users table
    var err, user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    console.log(user)
    if (user && JSON.stringify(user) != '{}') {
      // If the user already exists, update their password
      await db.run('UPDATE users SET password = $password WHERE username = $username', {
        $username: username,
        $password: password
      });
      console.log('Updated user', username);
    } else {
      // If the user doesn't exist, insert a new record with their username and password
      await db.run('INSERT INTO users (username, password) VALUES ($username, $password)', {
        $username: username,
        $password: password
      });
      console.log('Inserted user', username);
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    
  }
}

async function getUserByUsername(db, username) {
  try {
    var err, row = await db.get('SELECT * FROM users WHERE username = ?', [username]);	
    return row;
  } catch (err) {
    console.error(err.message);
  } finally {
  }
}

// Tạo danh sách các hàm liên quan đến token
async function createTokenTable(db) {
  try {
    await db.run(`
      CREATE TABLE IF NOT EXISTS tokens (
        id INTEGER PRIMARY KEY,
        username INTEGER UNIQUE,
        token TEXT UNIQUE,
        expires_at INTEGER,
        created_at INTEGER,
        FOREIGN KEY (username) REFERENCES users(username) 
      );
    `);
  } catch (err) {
    console.error(err.message);
  } finally {
    
  }
}

// Generate a token with a default expiration time of 1 day
async function createOrUpdateToken(db, username, expirationTime = 86400) {
  try {
    // Check if the username exists in the users table
    const user = await db.get('SELECT * FROM users WHERE username = $username', {
      $username: username
    });

    if (!user) {
      // If the user doesn't exist, return null
      return null;
    }
    // Create a JSON Web Token (JWT) with the provided username and expiration time
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: expirationTime });
    // Get the current token and its expiration time from the tokens table, if it exists
    const tokenRecord = await db.get('SELECT * FROM tokens WHERE username = $username', {
      $username: username
    });
    const expiresAt = Math.floor(Date.now() / 1000) + expirationTime;
    const createdAt = Math.floor(Date.now() / 1000);
    if (tokenRecord) {
      // If the token already exists, update its value and expiration time
      await db.run(`
        UPDATE tokens
        SET token = $token, expires_at = $expiresAt, created_at = $createdAt
        WHERE username = $username
      `, {
        $username: username,
        $token: token,
        $expiresAt: expiresAt,
        $createdAt: createdAt
      });
    } else {
      // If the token doesn't exist, insert a new record with its value and expiration time
      await db.run(`
        INSERT INTO tokens (username, token, expires_at, created_at)
        VALUES ($username, $token, $expiresAt, $createdAt)
      `, {
        $username: username,
        $token: token,
        $expiresAt: expiresAt,
        $createdAt: createdAt
      });
    }
    // Return the generated token
    return token;
  } catch (err) {
    console.error(err.message);
    return null;
  } finally {
    
  }
}

// Validate a token and return the associated username if valid
async function validateToken(db, token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Check if the username exists in the users table
    const user = await db.get('SELECT * FROM users WHERE username = ?', [decoded.username]);
    if (!user) {
      throw new Error('Invalid token: user not found');
    }
    
    // Check if the token exists in the tokens table
    const row = await db.get('SELECT * FROM tokens WHERE token = ?', [token]);

    if (!row) {
      throw new Error('Invalid token: token not found');
    }
    
    // Check if the token has expired
    const now = Date.now() / 1000;
    if (now > decoded.exp) {
      throw new Error('Invalid token: token has expired');
    }
    
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  } finally {
    
  }
}



module.exports = {
  openConnection,
  createUserTable, 
  insertOrUpdateUser, 
  getUserByUsername,
  createTokenTable,
  createOrUpdateToken,
  validateToken,
  closeConnection
};
