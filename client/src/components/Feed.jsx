import React from 'react';

import Blurb from './Blurb';

const Feed = ({ articles, save, saved, addComment }) => (
  <ul className="article_list">
    {articles.map((article, i) => (
      <Blurb addComment={addComment} article={article} saved={saved} save={save} index={i} key={`${(i + 1)}`} />
    ))}
  </ul>
);

export default Feed;
