import React from 'react';

const Login = props => (
  <div className="login">
    <div className="username">
      <span className="username_label">username: </span>
      <input className="username_input" placeholder="username" />
    </div>
    <div className="password">
      <span className="password_label">password: </span>
      <input className="password_input" type="password" placeholder="password" />
    </div>
  </div>
);

export default Login;