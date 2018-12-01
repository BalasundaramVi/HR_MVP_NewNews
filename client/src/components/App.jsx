import React from 'react';

import Header from './Header';
import Feed from './Feed';

import NAPI from '../../../NewsAPI/NAPI';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeTopic = this.changeTopic.bind(this);

    this.state = {
      topic: 'general',
      articles: [],
    };
  }

  componentWillMount() {
    const { topic } = this.state;
    NAPI.getTopHeadlines(topic, (articles) => {
      console.log(articles);
      this.setState({ articles });
    });
  }

  changeTopic(input) {
    const newTopic = input;
    NAPI.getTopHeadlines(newTopic, (articles) => {
      this.setState({ articles, topic: newTopic });
    });
  }

  render() {
    const { topic, articles } = this.state;
    console.log(`>> ${topic}`);
    return (
      <div className="app">
        <div id="header">
          <Header category={topic} changeTopic={this.changeTopic} />
        </div>
        <div id="feed">
          <Feed articles={articles} />
        </div>
      </div>
    );
  }
}

export default App;
