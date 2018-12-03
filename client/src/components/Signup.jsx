import React from 'react';

const Signup = props => (
  <div className="signup_form">
    <div className="username">
      <span className="username_label">username: </span>
      <input className="username_input" placeholder="username" />
    </div>
    <div className="password">
      <span className="password_label">password: </span>
      <input className="password_input" type="password" placeholder="password" />
    </div>
    <div className="password">
      <span className="password_label">password (again): </span>
      <input className="password_input" type="password" placeholder="password" />
    </div>
    <div className="addAccount">
      <div className="addAccount_button">Create Acount</div>
    </div>
  </div>
);

export default Signup;
