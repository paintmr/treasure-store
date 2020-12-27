import React, { Component } from 'react';
import './style.css';

class PopularSearchKeywords extends Component {
  render() {
    const {popularKeywords} = this.props
    return (
      <div className='popularSearch '>
        {
          popularKeywords.map((item, index) => {
            return (
              <span key={item.id} onClick={this.handleClick.bind(this, item)} className='popularSearch__item'>{item.keyword}</span>
            )
          })
        }
        
      </div>
    );
  }
  
  handleClick = (item) => {
    this.props.onClickItem(item);
  }
}

export default PopularSearchKeywords;