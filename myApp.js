let express = require('express');
let app = express();
require('dotenv').config(); // <- Cargar dotenv

console.log("Hello World");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  let message = "Hello json";
  
  if (messageStyle === 'uppercase') {
    message = message.toUpperCase();
  }

  res.json({ message });
});

module.exports = app;
