const express = require('express');
const app = express();

//middle ware
app.use(express.text());

const path = require('path')
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use('/', require('./routes/venue.route'));
app.use('/email', require('./routes/email.route'));
app.use('/chats', require('./routes/chat.route'));
app.use('/reservations', require('./routes/reservation.route'));

app.listen(6969, () => {
  console.log(`Server running on port 6969... `);
});

module.exports = app;