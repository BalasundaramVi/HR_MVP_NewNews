import React from 'react';

import Blurb from './Blurb';

const Feed = ({ articles }) => (
  <ul className="article_list">
    {articles.map((article, i) => (
      <Blurb article={article} index={i} key={`${(i + 1)}`} />
    ))}
  </ul>
);

export default Feed;
