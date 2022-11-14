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
app.use('/', require('./routes/venue.route'));

app.listen(6969, () => {
  console.log(`Server running on port 6969... `);
});

module.exports = app;