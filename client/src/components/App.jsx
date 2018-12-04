import React from 'react';
import axios from 'axios';

import Header from './Header';
import Feed from './Feed';
import Login from './Login';
import Signup from './Signup';
import UserInfo from './UserInfo';
import SignupBlurb from './SignupBlurb';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeTopic = this.changeTopic.bind(this);
    this.search = this.search.bind(this);
    this.addUser = this.addUser.bind(this);
    this.signIn = this.signIn.bind(this);

    this.state = {
      topic: 'general',
      articles: [],
      signup: false,
      user: false,
    };
  }

  componentWillMount() {
    const { topic } = this.state;
    axios.get(`/topHeadlines/${topic}`)
      .then((data) => {
        const articles = data.data;
        this.setState({ articles });
      });
  }

  changeTopic(input) {
    const newTopic = input;
    axios.get(`/topHeadlines/${newTopic}`)
      .then((data) => {
        const articles = data.data;
        this.setState({ articles, topic: newTopic });
      });
  }

  addUser() {
    const newState = this.state;
    newState.signup = !newState.signup;
    this.setState(newState);
  }

  search(key) {
    if (key === 'Enter') {
      const query = document.getElementById('search').value;
      axios.get(`/search/${query}`)
        .then((data) => {
          const articles = data.data;
          this.setState({ articles, topic: 'query' });
        });
    }
  }

  signIn(e) {
    const username = document.getElementById('username_input').value;
    const password = document.getElementById('password_input').value;
    if (e.key === 'Enter') {
      axios.post('/users/login', {
        username,
        password,
      }).then((loggedIn) => {
        if (loggedIn.data !== false) {
          this.setState({ user: loggedIn.data[0] });
        }
      });
    }
  }

  render() {
    const {
      topic, articles, signup, user,
    } = this.state;
    console.log(user);
    return (
      <div className="app">
        <div id="header">
          {user === false ? <Login user={user} signup={signup} signIn={this.signIn} /> : <UserInfo user={user} />}
          <Header category={topic} changeTopic={this.changeTopic} search={this.search} />
          {user === false ? <SignupBlurb signup={signup} addUser={this.addUser} /> : '' }
        </div>
        <div id="feed">
          <Feed articles={articles} />
        </div>
        {(signup && (user === false)) ? <Signup addUser={this.addUser} /> : false}
      </div>
    );
  }
}

export default App;
