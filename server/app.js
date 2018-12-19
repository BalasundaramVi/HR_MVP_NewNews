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

// const getArticlesByID = (id) => {
//   return DB.Article.findAll({
//     where: {
//       id,
//     },
//   }).then(data => (data[0]));
// };

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
    if (articleIDs.length === 0) {
      res.send([]);
    } else {
      DB.User.update({ saveCount: results.length },
        { where: { id } });
      DB.Article.findAll({
        where: {
          id: {
            [DB.Op.or]: articleIDs,
          },
        },
      }).then((articles) => {
        res.send(articles);
      });
    }
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

// COMMENT MANAGEMENT
app.post('/comments/newComment', (req, res) => {
  const { text, user, article } = req.body;
  if (text === '') {
    res.end();
    return;
  }

  DB.Article.findAll({
    where: {
      title: article.title,
      author: article.author,
    },
  }).then((data) => {
    const art = data[0];
    const articleID = art.id;

    DB.Comment.create({
      text,
      articleID,
      userID: user.id,
      articleTitle: art.title,
      articleAuthor: art.author,
      username: user.username,
    }).then((doc) => {
      DB.userComments.create({
        userID: user.id,
        commentID: doc.id,
      });

      DB.articleComments.create({
        articleID,
        commentID: doc.id,
      });
      DB.User.update({ commentCount: user.commentCount },
        { where: { id: user.id } });
      res.send(true);
    });
  });
});

app.post('/comments/getAll', (req, res) => {
  const { articles } = req.body;
  const authors = [];
  const titles = [];
  for (let i = 0; i < articles.length; i += 1) {
    authors.push(articles[i].author);
    authors.push(articles[i].title);
  }
  DB.Article.findAll({
    where: {
      author: {
        [DB.Op.or]: authors,
      },
      title: {
        [DB.Op.or]: titles,
      },
    },
  }).then((results) => {
    const articleIDs = [];
    for (let i = 0; i < results.length; i += 1) {
      articleIDs.push(results[i].id);
    }
    DB.Comment.findAll({
      where: {
        articleID: {
          [DB.Op.or]: articleIDs,
        },
      },
    }).then((comments) => {
      res.send(comments);
    });
  });
});

module.exports = app;
