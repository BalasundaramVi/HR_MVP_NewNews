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
    for (let i = 0; i < articles.length; i += 1) {
      const article = articles[i];
      DB.Article.findAll({
        where: {
          title: article.title,
        },
      }).then((docs) => {
        if (docs.length === 0) {
          DB.Article.create({
            author: article.author,
            content: article.content,
            description: article.description,
            publishedAt: article.publishedAt,
            sourceID: article.source.id,
            sourceName: article.source.name,
            title: article.title,
            url: article.url,
            urlToImage: article.urlToImage,
          });
        }
      });
    }
    res.status(200).send(articles);
  });
});

app.get('/search/:query', (req, res) => {
  NAPI.search(req.params.query, (articles) => {
    res.status(200).send(articles);
  });
});

module.exports = app;
