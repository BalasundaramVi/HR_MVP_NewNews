import React from 'react';

import Blurb from './Blurb';

const Feed = ({ articles }) => (
  <div className="article_list">
    {articles.map((article, i) => (
      <Blurb article={article} index={i} key={`${(i + 1)}`} />
    ))}
  </div>
);

export default Feed;
