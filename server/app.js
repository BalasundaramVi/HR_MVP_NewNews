const express = require('express');

const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan');

//const sequelize = require('../PG Database/connection');

const app = express();

app.use(parser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './../client/public')));

module.exports = app;
