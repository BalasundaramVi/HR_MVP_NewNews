import React from 'react';

const Blurb = ({ article, i }) => (
  <div className={`blurb ${i}`}>
    <h3 className="blurb_title">{ article.title }</h3>
    {article.description !== null ? <p className="description">{article.description}</p> : ''}
    {article.content !== null ? <p className="content">{article.content.split('[')[0]}</p> : ''}
    <a className="blurb_content" href={article.url}>MORE...</a>
  </div>
);

export default Blurb;
