import React from 'react';
import axios from 'axios';

import Header from './Header';
import Feed from './Feed';

import NAPI from '../../../NewsAPI/NAPI';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeTopic = this.changeTopic.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      topic: 'general',
      articles: [],
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
    const { topic, articles } = this.state;
    return (
      <div className="app">
        <div id="header">
          <Header category={topic} changeTopic={this.changeTopic} search={this.search} />
        </div>
        <div id="feed">
          <Feed articles={articles} />
        </div>
      </div>
    );
  }
}

export default App;
