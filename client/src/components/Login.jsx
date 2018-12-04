import React from 'react';

const Login = ({ user, signup, signIn }) => (
  <div className={`login ${signup ? 'hidden' : ''}`}>
    <div className="username">
      <span className="username_label">username: </span>
      <input id="username_input" onKeyPress={signIn} className="username_input" placeholder="username" />
    </div>
    <div className="password">
      <span className="password_label">password: </span>
      <input id="password_input" className="password_input" onKeyPress={signIn} type="password" placeholder="password" />
    </div>
  </div>
);

export default Login;