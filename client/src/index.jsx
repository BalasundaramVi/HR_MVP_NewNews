import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Feed from './components/Feed';

ReactDOM.render(
  <Header />,
  document.getElementById('header'),
);

ReactDOM.render(
  <Feed category="general" />,
  document.getElementById('feed'),
);
