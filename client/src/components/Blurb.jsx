import React from 'react';

const Blurb = ({ article, i }) => (
  <div className={`blurb ${i}`}>
    <h3 className="blurb_title">{ article.title }</h3>
    <p className="blurb_content">{ `${article.content.split('.')[0]}...` }</p>
  </div>
);

export default Blurb;
