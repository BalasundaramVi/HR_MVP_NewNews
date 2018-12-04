import React from 'react';

const Comments = ({ comments }) => (
  <ul className="comment_list">
    {comments.map((comment, i) => (
      <li className="comment" key={`${i + 1}`}>
        <p className="comment_text">{ comment.text }</p>
        <div className="author_block">
          <span className="comment_author">{ comment.author }</span>
        </div>
      </li>
    ))}
  </ul>
);

export default Comments;
