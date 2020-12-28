import React, { Component } from 'react';
import SearchResultHeader from './SearchResultHeader'
import KeywordBox from './KeywordBox';
import Banner from '../../components/Banner';
import ShopList from './ShopList';

class SearchResult extends Component {
  render() {
    return (
      <div>
        <SearchResultHeader />
        <KeywordBox />   
        <Banner />
        <ShopList />     
      </div>
    );
  }
}

export default SearchResult;