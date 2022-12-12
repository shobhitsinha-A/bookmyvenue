const express = require('express');
const app = express();

const https = require("https");
const fs = require("fs");

const session = require('express-session');
const { urlencoded } = require('body-parser');

//middle ware
app.use(express.text());
app.use(urlencoded({ extended: false }));
app.use(session({ secret: 'secret-phrase', resave: false, saveUninitialized: true, cookie: {secure: false} }));
app.use(express.static('public', { index: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use('/user', require('./routes/user.route'));

https
    .createServer(
        // Provide the private and public key to the server by reading each
        // file's content with the readFileSync() method.
        {
          key: fs.readFileSync("../../../../bookmyvenue.live.key"),
          cert: fs.readFileSync("../../../../bookmyvenue.live.chained.crt"),
        },
        app
    )
    .listen(5000, () => {
      console.log("Server running on port 5000... ");
    });
// app.listen(5000, () => {
//   console.log(`Server running on port 5000... `);
// });

module.exports = app;