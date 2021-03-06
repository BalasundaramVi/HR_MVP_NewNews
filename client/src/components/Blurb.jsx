import React from 'react';

import Comments from './Comments';

import timeSince from '../util/timeSince';

const checkSave = (article, saved) => {
  for (let i = 0; i < saved.length; i += 1) {
    if (saved[i].title === article.title && saved[i].author === article.author) {
      return true;
    }
  }
  return false;
}

const Blurb = ({ article, save, index, saved, addComment }) => (
  <li className={`blurb ${index}`}>
    <div className="blurb_header">
      <a className="blurb_title" href={article.url}>{ article.title }</a>
      <div className="blurb_publication_info">
        <div className="author container">
          {article.author !== null ? <div className="blurb_author">{article.author}</div> : <div className="blurb_author">{article.source.name}</div>}
        </div>
        {article.publishedAt !== null ? <div className="blurb_date">{`${timeSince(article.publishedAt)} ago`}</div> : ''}
      </div>
    </div>
    {article.description !== null ? <p className="description">{article.description}</p> : <p className="content">{article.content}</p>}
    {article.comments === undefined ? '' : <Comments comments={article.comments} />}
    <div className="user_interact">
      <svg onClick={() => {save(index)}} className={`save_icon ${ checkSave(article, saved) ? 'saved_article' : '' }  ${article.saved === undefined ? '' : 'saved_article'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z"/></svg>
      <svg className="comment_icon" onClick={() => addComment(index)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      <input type="text" id={`add_comment_${index}`} className="add_comment" />
    </div>
  </li>
);

export default Blurb;
