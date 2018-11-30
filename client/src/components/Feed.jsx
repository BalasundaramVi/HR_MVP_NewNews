import React from 'react';

import Blurb from './Blurb';

import NAPI from '../../../NewsAPI/NAPI';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      category: props.category,
    };
  }

  componentWillMount() {
    const { category } = this.state;
    NAPI.getTopHeadlines(category, (articles) => {
      console.log(articles);
      this.setState({ articles });
    });
  }

  render() {
    const { articles } = this.state;
    return (
      <div className="article_list">
        {articles.map((article, i) => (
          <Blurb article={article} index={i} key={`${(i + 1)}`} />
        ))}
      </div>
    );
  }
}

export default Feed;
