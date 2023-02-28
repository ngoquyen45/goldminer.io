const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const DBSOURCE = "./db.sqlite";

let pool;

async function createPool() {
  pool = await open({
    filename: DBSOURCE,
    driver: sqlite3.cached.Database
  });
}

async function getConnection() {
  if (!pool) {
    await createPool();
  }
  return await pool;
}

async function releaseConnection() {
  if (pool) {
    await pool.close();
  }
}

module.exports = {
  getConnection,
  releaseConnection
};
