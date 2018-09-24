const express = require('express');
const app = express();
const path = require('path')
const parser = require('body-parser');
const createRouter = require('./helpers/create_router');


const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));
app.use(parser.json());

app.listen(3000, function () {
    console.log(`App running on port ${ this.address().port }`);
  });