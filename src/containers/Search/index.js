import React, { Component } from 'react';
import SearchBox from './components/SearchBox';
import PopularSearchKeywords from './components/PopularSearchKeywords';
import SearchHistory from './components/SearchHistory';

class Search extends Component {
  
  render() {
    return (
      <div>
        <SearchBox />
        <PopularSearchKeywords />
        <SearchHistory />
      </div>
    );
  }
}

export default Search;