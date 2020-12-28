import React, { Component } from 'react';
import './style.css';

class SearchResultHeader extends Component {
  render() {
    const { onBack, onSearch } = this.props
    return (
      <header className='searchResultHeader'>
        <div className='searchResultHeader__back' onClick={onBack}></div>
        <div className='searchResultHeader__list'>
          <span className='searchResultHeader__item searchResultHeader__item--selected'>Shops</span>
          <span className='searchResultHeader__item'>Disounts</span>
        </div>
        <div className='searchResultHeader__icon' onClick={onSearch}></div>        
      </header>
    );
  }
}

export default SearchResultHeader;