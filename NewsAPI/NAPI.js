import NewsAPI from 'newsapi';
import NEWS_API_KEY from './NAPI_Key';

const newsapi = new NewsAPI(NEWS_API_KEY);

class NAPI_CONSTRUCTOR {
  constructor() {
    this.current = new Date();
    this.weekAgo = new Date(new Date() - 604800000 * 4);
    this.date = `${this.current.getFullYear()}-${this.current.getMonth() + 1}-${this.current.getDate()}`;
    this.lastWeek = `${this.weekAgo.getFullYear()}-${this.weekAgo.getMonth() + 1}-${this.weekAgo.getDate()}`;
  }

  getTopHeadlines(cat, cb, p = 1) {
    newsapi.v2.everything({
      q: cat,
      from: this.lastWeek,
      to: this.date,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: '100',
      page: p,
    }).then((res) => {
      cb(res.articles);
    });
  }

  search(query, cb) {
    newsapi.v2.everything({
      q: query,
      language: 'en',
      from: this.lastWeek,
      to: this.date,
      sortBy: 'publishedAt',
      pageSize: '100',
    }).then((res) => {
      cb(res.articles);
    });
  }
}

const NAPI = new NAPI_CONSTRUCTOR();

export default NAPI;
