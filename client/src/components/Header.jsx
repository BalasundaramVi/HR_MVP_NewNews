import React from 'react';

const Header = () => {

  const newsSearch = (val) => {
    console.log(val);
  };

  return (
    <div className="head">
      <div className="title">
        <img className="logo" alt="New News" src="https://i.imgur.com/G0zqBGD.png" />
      </div>
      <div className="header-search">
        <div className="search">
          <input type="text" className="searchbar" onInput={newsSearch(this)} />
          <span className="addMovie button">+</span>
        </div>
        <div className="topics">
          <span className="politics category">POLITICS</span>
          <span className="sports category">SPORTS</span>
          <span className="entertainment category">ENTERTAINMENT</span>
          <span className="weather category">WEATHER</span>
          <span className="technology category">TECHNOLOGY</span>
          <span className="world category">WORLD</span>
          <span className="saved category">SAVED</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
