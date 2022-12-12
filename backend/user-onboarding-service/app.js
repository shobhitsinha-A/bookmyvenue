const express = require('express');
const app = express();
const session = require('express-session');
const { urlencoded } = require('body-parser');

//middle ware
app.use(express.text());
app.use(urlencoded({ extended: false }));
app.use(session({ secret: 'secret-phrase', resave: false, saveUninitialized: true, cookie: {secure: false} }));
app.use(express.static('public', { index: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Routes
app.use('/user', require('./routes/user.route'));

app.listen(5000, () => {
  console.log(`Server running on port 5000... `);
});

module.exports = app;