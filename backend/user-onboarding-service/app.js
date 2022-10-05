const express = require('express');

const app = express();

//middle ware
app.use(express.json());

// Routes
app.use('/user', require('./routes/user.route'));


app.listen(5000, () => {
  console.log(`Server running on port 5000 port... `)
});

module.exports = app;