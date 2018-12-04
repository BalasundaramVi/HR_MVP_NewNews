const Sequelize = require('sequelize');

const sequelize = new Sequelize('vb_mvp_nn', 'student', 'student', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('>>>>> Connected to postgres db');
  })
  .catch((err) => {
    console.log(err);
  });


const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING(30),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  saveCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  commentCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

const Article = sequelize.define('article', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  author: Sequelize.TEXT,
  content: Sequelize.TEXT,
  description: Sequelize.TEXT,
  publishedAt: Sequelize.TEXT,
  sourceID: Sequelize.TEXT,
  sourceName: Sequelize.TEXT,
  title: Sequelize.TEXT,
  url: Sequelize.TEXT,
  urlToImage: Sequelize.TEXT,
});

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  text: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },

  articleAuthor: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  articleTitle: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  username: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  articleID: {
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: Article,
      key: 'id',
    },
  },
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

const savedArticles = sequelize.define('saved_articles', {
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },

  articleID: {
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: Article,
      key: 'id',
    },
  },
});

const userComments = sequelize.define('user_comments', {
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },

  commentID: {
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: Comment,
      key: 'id',
    },
  },
});

const articleComments = sequelize.define('article_comments', {
  articleID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Article,
      key: 'id',
    },
  },

  commentID: {
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: Comment,
      key: 'id',
    },
  },
});

module.exports.User = User;
module.exports.Article = Article;
module.exports.Comment = Comment;
module.exports.savedArticles = savedArticles;
module.exports.userComments = userComments;
module.exports.articleComments = articleComments;
module.exports.sequelize = sequelize;
module.exports.Op = Sequelize.Op;
