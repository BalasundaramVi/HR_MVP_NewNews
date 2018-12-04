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
    this.saveArticle = this.saveArticle.bind(this);
    this.addComment = this.addComment.bind(this);

    this.state = {
      topic: 'general',
      articles: [],
      signup: false,
      user: false,
      saved: [],
    };
  }

  componentWillMount() {
    const { topic } = this.state;
    axios.get(`/topHeadlines/${topic}`)
      .then((data) => {
        const articles = data.data;
        axios.post('/comments/getAll', {
          articles,
        }).then((res) => {
          const hash = {};
          const comments = res.data;
          for (let i = 0; i < comments.length; i += 1) {
            const hashArt = comments[i].articleTitle;
            if (hash[hashArt] === undefined) {
              hash[hashArt] = [{
                text: comments[i].text,
                author: comments[i].username,
              }];
            } else {
              hash[hashArt].push({
                text: comments[i].text,
                author: comments[i].username,
              });
            }
          }
          for (let i = 0; i < articles.length; i += 1) {
            if (hash[articles[i].title] === undefined) {
              articles[i].comments = [];
            } else {
              articles[i].comments = hash[articles[i].title];
            }
          }
          this.setState({ articles });
        });
      });
  }

  changeTopic(input) {
    const newTopic = input;
    axios.get(`/topHeadlines/${newTopic}`)
      .then((data) => {
        const articles = data.data;
        axios.post('/comments/getAll', {
          articles,
        }).then((res) => {
          const hash = {};
          const comments = res.data;
          for (let i = 0; i < comments.length; i += 1) {
            const hashArt = comments[i].articleTitle;
            if (hash[hashArt] === undefined) {
              hash[hashArt] = [{
                text: comments[i].text,
                author: comments[i].username,
              }];
            } else {
              hash[hashArt].push({
                text: comments[i].text,
                author: comments[i].username,
              });
            }
          }
          for (let i = 0; i < articles.length; i += 1) {
            if (hash[articles[i].title] === undefined) {
              articles[i].comments = [];
            } else {
              articles[i].comments = hash[articles[i].title];
            }
          }
          this.setState({ articles, topic: newTopic });
        });
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

  saveArticle(index) {
    const { user } = this.state;
    const newState = this.state;
    const article = newState.articles[index];
    if (user === false) {
      alert('must be signed in to save articles!');
    } else {
      axios.post('/articles/save', {
        user,
        article,
      }).then(() => {
        newState.articles[index].saved = true;
        axios.get(`/users/${user.id}/savedArticles`)
          .then((docs) => {
            newState.saved = docs.data;
            newState.user.saveCount += 1;
            this.setState(newState);
          });
      }).catch((err) => {
        alert('uh oh, something went wrong');
        console.log(err);
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
          const user = loggedIn.data[0];
          console.log(user);
          this.setState({ user });
          axios.get(`/users/${user.id}/savedArticles`)
            .then((docs) => {
              this.setState({ saved: docs.data });
            });
        }
      });
    }
  }

  addComment(index) {
    const text = document.getElementById(`add_comment_${index}`).value;
    const { user, articles } = this.state;
    const article = articles[index];
    if (article.comments === undefined) {
      article.comments = [{
        text,
        author: user.username,
      }];
    } else {
      article.comments.push({
        text,
        author: user.username,
      });
    }

    if (user === false) {
      alert('must be signed in to comment!');
    } else {
      user.commentCount += 1;
      axios.post('/comments/newComment', {
        text,
        user,
        article,
      }).then(() => {
        this.setState({
          articles,
          user,
        });
      });
    }
  }

  render() {
    const {
      topic, articles, signup, user, saved,
    } = this.state;
    return (
      <div className="app">
        <div id="header">
          {user === false ? <Login user={user} signup={signup} signIn={this.signIn} /> : <UserInfo user={user} />}
          <Header category={topic} changeTopic={this.changeTopic} search={this.search} />
          {user === false ? <SignupBlurb signup={signup} addUser={this.addUser} /> : '' }
        </div>
        <div id="feed">
          <Feed save={this.saveArticle} addComment={this.addComment} saved={saved} articles={articles} />
        </div>
        {(signup && (user === false)) ? <Signup addUser={this.addUser} /> : false}
      </div>
    );
  }
}

export default App;
