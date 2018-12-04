import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.updateInfo = this.updateInfo.bind(this);
    this.createUser = this.createUser.bind(this);

    this.state = {
      username: '',
      password: '',
      password2: '',
    };
  }

  updateInfo(e) {
    const targetElement = e.target.parentElement.className.split(' ')[0];
    this.setState({ [targetElement]: e.target.value });
  }

  createUser() {
    const {username, password, password2 } = this.state;
    if (password !== password2 || password === '') {
      alert('passwords must match');
    } else if (username.length < 8) {
      alert('username must be longer than 8 characters')
    } else {
      axios.post('/users/createUser', {
        username,
        password,
      }).then((added) => {
        if (added.data) {
          alert('user was created. Please sign in');
          const { addUser } = this.props;
          addUser();
        } else {
          alert('username already taken');
        }
      });
    }
  }

  render() {
    return (
      <div className="signup_form">
        <div className="username">
          <span className="username_label">username: </span>
          <input className="username_input" onChange={this.updateInfo} placeholder="username" />
        </div>
        <div className="password">
          <span className="password_label">password: </span>
          <input className="password_input" onChange={this.updateInfo} type="password" placeholder="password" />
        </div>
        <div className="password2 password">
          <span className="password_label">password (again): </span>
          <input className="password_input" onChange={this.updateInfo} type="password" placeholder="password" />
        </div>
        <div className="addAccount">
          <div className="addAccount_button" tabIndex="-8" role="button" onKeyDown={() => {}} onClick={this.createUser}>Create Acount</div>
        </div>
      </div>
    );
  }
};

export default Signup;
