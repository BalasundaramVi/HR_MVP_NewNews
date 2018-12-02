const express = require('express');

const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan');

const DB = require('./../PG Database/connection');
const NAPI = require('./../NewsAPI/NAPI');

const app = express();

app.use(parser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './../client/public')));

// TOP ARTICLE RETRIEVAL
app.get('/topHeadlines/:topic', (req, res) => {
  NAPI.getTopHeadlines(req.params.topic, (articles) => {
    res.status(200).send(articles);
  });
});

app.get('/search/:query', (req, res) => {
  NAPI.search(req.params.query, (articles) => {
    res.status(200).send(articles);
  });
});

module.exports = app;
