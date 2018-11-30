import NEWS_API_KEY from './NAPI';

const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(NEWS_API_KEY);

class NAPI {
  constructor() {
    this.current = new Date();
    this.weekAgo = new Date() - 6048000000;
    this.date = `${this.current.getFullYear()}-${this.current.getMonth() + 1}-${this.current.getDate()}`;
    this.lastWeek = `${this.weekAgo.getFullYear()}-${this.weekAgo.getMonth() + 1}-${this.weekAgo.getDate()}`;
  }

  static search(query, cb) {
    newsapi.v2.everything({
      q: query,
      language: 'en',
      from: this.lastWeek,
      to: this.date,
      sortBy: 'relevancy',
      pageSize: '100',
    }).then((res) => {
      cb(res);
    });
  }
}

module.exports = NAPI;
