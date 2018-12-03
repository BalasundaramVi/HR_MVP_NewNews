import React from 'react';
import axios from 'axios';

import Header from './Header';
import Feed from './Feed';
import Login from './Login';
import Signup from './Signup';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeTopic = this.changeTopic.bind(this);
    this.search = this.search.bind(this);
    this.addUser = this.addUser.bind(this);

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

  render() {
    const {
      topic, articles, signup, user,
    } = this.state;
    return (
      <div className="app">
        <div id="header">
          <Login user={user} signup={signup} />
          <Header category={topic} changeTopic={this.changeTopic} search={this.search} />
          <div className="signup">
            <p className="signup_blurb">{'Don\'t have an account? Become a member to save & comment on articles!'}</p>
            <div tabIndex="-7" role="button" className={`signup_button ${signup ? 'signup_active' : ''}`} onKeyDown={() => {}} onClick={this.addUser}>SIGNUP</div>
          </div>
        </div>
        <div id="feed">
          <Feed articles={articles} />
        </div>
        {signup ? <Signup /> : false}
      </div>
    );
  }
}

export default App;
