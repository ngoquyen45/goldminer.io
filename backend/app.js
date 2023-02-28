// "type": "module",
const express = require('express');
const app = express();
const path = require('path');
const routers = require('./routers');
const poolLib = require('./db/pool');

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// router
app.use('/', routers);

app.set('view engine', 'ejs');

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

process.on('SIGINT', async () => {
  await poolLib.releaseConnection();
});