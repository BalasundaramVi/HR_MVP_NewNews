import React from 'react';
import Login from './Login';

const Header = ({ category, changeTopic, search }) => (
  <div className="head">
    <div className="title">
      <img className="logo" alt="New News" src="https://i.imgur.com/G0zqBGD.png" />
    </div>
    <div className="header-search">
      <div className="search">
        <input type="text" id="search" className="searchbar" placeholder="Search..." onKeyPress={(e) => { search(e.key); }} />
        <span className="search button">{'>'}</span>
      </div>
      <div className="topics">
        <span className={`politics category ${category === 'politics' ? 'active' : ''}`} tabIndex="0" role="button" onKeyDown={() => {}} onClick={() => { changeTopic('politics'); }}>POLITICS</span>
        <span className={`sports category ${category === 'sports' ? 'active' : ''}`} tabIndex="-1" role="button" onKeyDown={() => {}} onClick={() => { changeTopic('sports'); }}>SPORTS</span>
        <span className={`entertainment category ${category === 'entertainment' ? 'active' : ''}`} tabIndex="-2" role="button" onKeyDown={() => {}} onClick={() => { changeTopic('entertainment'); }}>ENTERTAINMENT</span>
        <span className={`weather category ${category === 'weather' ? 'active' : ''}`} tabIndex="-3" role="button" onKeyDown={() => {}} onClick={() => { changeTopic('weather'); }}>WEATHER</span>
        <span className={`technology category ${category === 'technology' ? 'active' : ''}`} tabIndex="-4" role="button" onKeyDown={() => {}} onClick={() => { changeTopic('technology'); }}>TECHNOLOGY</span>
        <span className={`world category ${category === 'world' ? 'active' : ''}`} tabIndex="-5" role="button" onKeyDown={() => {}} onClick={() => { changeTopic('world'); }}>WORLD</span>
        <span className={`home category ${category === 'general' ? 'active' : ''}`} tabIndex="-6" role="button" onKeyDown={() => {}} onClick={() => { changeTopic('general'); }}>HOME</span>
      </div>
    </div>
  </div>
);

export default Header;
