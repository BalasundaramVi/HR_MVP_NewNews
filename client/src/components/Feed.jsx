import React from 'react';

import Blurb from './Blurb';
import NAPI from '../../../NewsAPI/NAPI';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [{ title: 'Test Article 1', content: "Lorem ipsum dolor amet distillery taiyaki godard kombucha offal, plaid craft beer roof party. Vinyl mumblecore lo-fi twee deep v. Air plant mlkshk shoreditch poke umami vaporware sriracha offal chicharrones you probably haven't heard of them butcher. Hammock gastropub waistcoat, kinfolk single-origin coffee chia asymmetrical iPhone VHS flannel schlitz keytar squid." }, { title: 'Test Article 2', content: "Lorem ipsum dolor amet distillery taiyaki godard kombucha offal, plaid craft beer roof party. Vinyl mumblecore lo-fi twee deep v. Air plant mlkshk shoreditch poke umami vaporware sriracha offal chicharrones you probably haven't heard of them butcher. Hammock gastropub waistcoat, kinfolk single-origin coffee chia asymmetrical iPhone VHS flannel schlitz keytar squid." }, { title: 'Test Article 3', content: "Lorem ipsum dolor amet distillery taiyaki godard kombucha offal, plaid craft beer roof party. Vinyl mumblecore lo-fi twee deep v. Air plant mlkshk shoreditch poke umami vaporware sriracha offal chicharrones you probably haven't heard of them butcher. Hammock gastropub waistcoat, kinfolk single-origin coffee chia asymmetrical iPhone VHS flannel schlitz keytar squid." }, { title: 'Test Article 4', content: "Lorem ipsum dolor amet distillery taiyaki godard kombucha offal, plaid craft beer roof party. Vinyl mumblecore lo-fi twee deep v. Air plant mlkshk shoreditch poke umami vaporware sriracha offal chicharrones you probably haven't heard of them butcher. Hammock gastropub waistcoat, kinfolk single-origin coffee chia asymmetrical iPhone VHS flannel schlitz keytar squid." }],
      category: 'general',
    };
  }

  componentWillMount() {
    NAPI.getTopHeadlines('general', (articles) => {
      console.log(articles);
      this.setState({ articles });
    });
  }

  render() {
    const { articles } = this.state;
    return (
      <div className="article_list">
        {articles.map((article, i) => (
          <Blurb article={article} index={i} />
        ))}
      </div>
    );
  }
}

export default Feed;
