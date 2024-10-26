// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes');

app.use('/', routes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});