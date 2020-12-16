import React, { Component } from 'react';
import './style.css'

class HomeHeader extends Component {
  render() {
    return (
      <div className='homeHeader'>
        <header className='homeHeader__wrapper'>
          <a className='homeHeader__city'>Hangzhou</a>
          <a className='homeHeader__search'>Search for shops and places.</a>
          <a className='homeHeader__user'>
            <div className='homeHeader__icon'></div>
          </a>
        </header>
        
      </div>
    );
  }
}

export default HomeHeader;