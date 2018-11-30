import React from 'react';

const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
};

const Blurb = ({ article, i }) => (
  <div className={`blurb ${i}`}>
    <div className="blurb_header">
      <h3 className="blurb_title">{ article.title }</h3>
      <div className="blurb_publication_info">
        {article.author !== null ? <div className="blurb_author">{article.author}</div> : <div className="blurb_author">{article.source.name}</div>}
        {article.publishedAt !== null ? <div className="blurb_date">{`${timeSince(article.publishedAt)} ago`}</div> : ''}
      </div>
    </div>
    {article.description !== null ? <p className="description">{article.description}</p> : ''}
    {article.content !== null ? <p className="content">{article.content.split('[')[0]}</p> : ''}
    <a className="blurb_content" href={article.url}>MORE...</a>
  </div>
);

export default Blurb;
