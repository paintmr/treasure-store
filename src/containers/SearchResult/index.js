import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResultHeader from './SearchResultHeader'
import KeywordBox from './KeywordBox';
import Banner from '../../components/Banner';
import ShopList from './ShopList';
import {getCurrentKeyword, getSearchedShops} from '../../redux/modules/search';

class SearchResult extends Component {
  render() {
    const {currentKeyword} = this.props;
    return (
      <div>
        <SearchResultHeader onBack={this.handleBack} onSearch={this.handleSearch} />
        <KeywordBox currentKeyword={currentKeyword}/>   
        <Banner />
        <ShopList />     
      </div>
    );
  }

  handleBack = () => {
    this.props.history.push('/');
  }

  handleSearch = () => {
    this.props.history.push('/search');
  }

}

const mapStateToProps = (state, props) => {
  return {
    currentKeyword: getCurrentKeyword(state),
    shops: getSearchedShops(state)
  }
}

export default connect(mapStateToProps, null)(SearchResult);