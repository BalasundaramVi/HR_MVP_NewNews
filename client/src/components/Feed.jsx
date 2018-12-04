import React from 'react';

import Blurb from './Blurb';

const Feed = ({ articles, save }) => (
  <ul className="article_list">
    {articles.map((article, i) => (
      <Blurb article={article} save={save} index={i} key={`${(i + 1)}`} />
    ))}
  </ul>
);

export default Feed;
