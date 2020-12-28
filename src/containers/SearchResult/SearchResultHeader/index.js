import React, { Component } from 'react';
import './style.css';

class SearchResultHeader extends Component {
  render() {
    return (
      <header className='searchResultHeader'>
        <div className='searchResultHeader__back'></div>
        <div className='searchResultHeader__list'>
          <span className='searchResultHeader__item searchResultHeader__item--selected'>Shops</span>
          <span className='searchResultHeader__item'>Disounts</span>
        </div>
        <div className='searchResultHeader__icon'></div>        
      </header>
    );
  }
}

export default SearchResultHeader;