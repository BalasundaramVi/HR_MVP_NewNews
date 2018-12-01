import React from 'react';

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
    NAPI.getTopHeadlines(topic, (articles) => {
      this.setState({ articles });
    });
  }

  changeTopic(input) {
    const newTopic = input;
    NAPI.getTopHeadlines(newTopic, (articles) => {
      this.setState({ articles, topic: newTopic });
    });
  }

  search(key) {
    if (key === 'Enter') {
      const query = document.getElementById('search').value;
      NAPI.search(query, (articles) => {
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
