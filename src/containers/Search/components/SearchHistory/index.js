import React, { Component } from 'react';
import './style.css'

class SearchHistory extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: ['Peige', 'Dinner Time', 'Chixia']
    }
  }
  
  render() {
    return (
      <div className='searchHistory'>
        <div className='searchHistory__header'>Search history</div>
        <ul className='searchHistory__list'>
          {
            this.state.data.map((item, index) => {
              return <li key={index} className='searchHistory__item' onClick={this.handleClick}>{item}</li>
            })
          }
        </ul>
        <div className='searchHistory__clear' onClick={this.handleClear}>Clear search history</div>        
      </div>
    );
  }

  handleClick = () => {

  }

  handleClear = () => {
    this.setState({
      data: []
    })
  }
}

export default SearchHistory;