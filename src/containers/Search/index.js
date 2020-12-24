import React, { Component } from 'react';
import SearchBox from './components/SearchBox';
import PopularSearchKeyWords from './components/PopularSearchKeyWords';

class Search extends Component {
  render() {
    return (
      <div>
        <SearchBox />
        <PopularSearchKeyWords />
      </div>
    );
  }
}

export default Search;