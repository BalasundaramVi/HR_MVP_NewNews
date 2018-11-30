import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'HOME',
    };
  }

  newsSearch(q) {
    return(q);
  };

  render() {
    return (
      <div className="head">
        <div className="title">
          <img className="logo" alt="New News" src="https://i.imgur.com/G0zqBGD.png" />
        </div>
        <div className="header-search">
          <div className="search">
            <input type="text" className="searchbar" placeholder="Search..." onInput={this.newsSearch} />
            <span className="addMovie button">{'>'}</span>
          </div>
          <div className="topics">
            <span className="politics category">POLITICS</span>
            <span className="sports category">SPORTS</span>
            <span className="entertainment category">ENTERTAINMENT</span>
            <span className="weather category">WEATHER</span>
            <span className="technology category">TECHNOLOGY</span>
            <span className="world category">WORLD</span>
            <span className="home category">HOME</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
