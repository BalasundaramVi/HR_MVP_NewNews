import NEWS_API_KEY from './NAPI_Key';

const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(NEWS_API_KEY);

class NAPI {
  constructor() {
    this.current = new Date();
    this.weekAgo = new Date(new Date() - 604800000 * 5);
    this.date = `${this.current.getFullYear()}-${this.current.getMonth() + 1}-${this.current.getDate()}`;
    this.lastWeek = `${this.weekAgo.getFullYear()}-${this.weekAgo.getMonth() + 1}-${this.weekAgo.getDate()}`;
  }

  static getTopHeadlines(cat, cb) {
    newsapi.v2.everything({
      q: cat,
      from: this.lastWeek,
      to: this.date,
      language: 'en',
    }).then((res) => {
      cb(res.articles);
    });
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


export default NAPI;
