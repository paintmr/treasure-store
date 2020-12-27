import React, { Component } from 'react';
import './style.css'

class SearchHistory extends Component {  
  render() {
    return (
      <div className='searchHistory'>
        <div className='searchHistory__header'>Search history</div>
        <ul className='searchHistory__list'>
          {
            this.props.historyKeywords.map((item, index) => {
              return <li key={item.id} className='searchHistory__item' onClick={this.handleClick.bind(this, item)}>{item.keyword}</li>
            })
          }
        </ul>
        <div className='searchHistory__clear' onClick={this.handleClear}>Clear search history</div>        
      </div>
    );
  }

  handleClick = (item) => {
    this.props.onClickItem(item);
  }

  handleClear = () => {
    this.props.onClear()
  }
}

export default SearchHistory;