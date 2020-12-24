import React, { Component } from 'react';
import './style.css';

const data = ['Chixia', 'Tianfu', 'Yequ', "Dinner Time", 'Peige', 'Ning Tea', 'Yuan Zhai', 'Ye Tea', 'Anran Travel']

class PopularSearchKeyWords extends Component {
  render() {
    return (
      <div className='popularSearch '>
        {
          data.map((item, index) => {
            return (
              <span key={index} className='popularSearch__item'>{item}</span>
            )
          })
        }
        
      </div>
    );
  }
}

export default PopularSearchKeyWords;