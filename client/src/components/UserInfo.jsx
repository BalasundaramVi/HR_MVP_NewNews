import React from 'react';

const UserInfo = ({ user }) => (
  <div className="user_details">
    <div className="user">{`${user.username}`}</div>
    <div className="saved">
      <div className="saved_label">SAVED: </div>
      <div className="saved_count">{user.saveCount}</div>
    </div>
    <div className="comments">
      <div className="comment_label">COMMENTS: </div>
      <div className="comment_count">{user.commentCount}</div>
    </div>
  </div>
);

export default UserInfo;
