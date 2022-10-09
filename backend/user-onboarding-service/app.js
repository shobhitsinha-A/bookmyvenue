const express = require('express');
const app = express();

//middle ware
app.use(express.text());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use('/user', require('./routes/user.route'));

app.listen(5000, () => {
  console.log(`Server running on port 5000... `);
});

module.exports = app;