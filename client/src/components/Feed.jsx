import React from 'react';

import Blurb from './Blurb';

import NAPI from '../../../NewsAPI/NAPI';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      category: 'general',
    };
  }

  componentWillMount() {
    NAPI.getTopHeadlines('general', (articles) => {
      console.log(articles);
      this.setState({ articles });
    });
  }

  render() {
    const { articles } = this.state;
    return (
      <div className="article_list">
        {articles.map((article, i) => (
          <Blurb article={article} index={i} />
        ))}
      </div>
    );
  }
}

export default Feed;
