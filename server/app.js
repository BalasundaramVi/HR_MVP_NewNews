const express = require('express');
const Promise = require('bluebird');

const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan');

const DB = require('./../PG Database/connection');
const NAPI = require('./../NewsAPI/NAPI');

const app = express();

app.use(parser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './../client/public')));

// ARTICLE RETRIEVAL
app.get('/topHeadlines/:topic', (req, res) => {
  const { topic } = req.params;
  NAPI.getTopHeadlines(topic, (articles) => {
    for (let i = 0; i < articles.length; i += 1) {
      const article = articles[i];
      DB.Article.findAll({
        where: {
          title: article.title,
          author: article.author,
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
    res.send(articles);
  });
});

app.get('/search/:query', (req, res) => {
  NAPI.search(req.params.query, (articles) => {
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

// USER MANAGEMENT
app.post('/users/createUser', (req, res) => {
  const { username, password } = req.body;
  DB.User.findAll({
    where: {
      username,
    },
  }).then((doc) => {
    if (doc.length !== 0) {
      res.send(false);
    } else {
      DB.User.create({
        username,
        password,
        saveCount: 0,
        commentCount: 0,
      }).then(() => {
        res.send(true);
      });
    }
  });
});

app.post('/users/login', (req, res) => {
  const { username, password } = req.body;
  DB.User.findAll({
    where: {
      username,
      password,
    },
  }).then((doc) => {
    if (doc.length === 0) {
      res.send(false);
    } else {
      res.send(doc);
    }
  });
});

const getArticlesByID = (id) => {
  return DB.Article.findAll({
    where: {
      id,
    },
  }).then(data => (data[0]));
};

app.get('/users/:id/savedArticles', (req, res) => {
  const { id } = req.params;
  DB.savedArticles.findAll({
    attributes: ['articleID'],
    where: {
      userID: id,
    },
  }).then((results) => {
    const articleIDs = [];
    results.forEach((article) => {
      articleIDs.push(article.articleID);
    });
    DB.Article.findAll({
      where: {
        id: {
          [DB.Op.or]: articleIDs,
        },
      },
    }).then((articles) => {
      res.send(articles);
    });
  });
});

// ARTICLE MANAGEMENT
app.post('/articles/save', (req, res) => {
  const userID = req.body.user.id;
  const { article } = req.body;
  DB.Article.findAll({
    where: {
      title: article.title,
      author: article.author,
    },
  }).then((data) => {
    const articleID = data[0].id;
    DB.savedArticles.create({
      userID,
      articleID,
    }).then((doc) => {
      res.send(doc);
    }).catch((err) => {
      res.send(err);
    });
  }).catch((error) => {
    res.send(error);
  });
});

// ARTICLE MANAGEMENT
app.post('/comments/newComment', (req, res) => {
  const { content } = req.body;
  // TO-DO
  res.send();
})


module.exports = app;
