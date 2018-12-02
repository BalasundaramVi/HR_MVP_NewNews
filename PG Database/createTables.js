
const DB = require('./connection');

DB.User.sync()
  .then(() => {
    DB.Article.sync()
      .then(() => {
        DB.Comment.sync()
          .then(() => {
            DB.savedArticles.sync()
              .then(() => {
                console.log('>>> all Postgres tables created...');
                process.exit();
              });
          });
      });
  });
