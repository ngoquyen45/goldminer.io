// "type": "module",
const express = require('express');
const app = express();
const path = require('path');
const routers = require('./routers');

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

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});