import React, { Component } from 'react';
import './style.css'

class HomeHeader extends Component {
  render() {
    return (
      <div className='homeHeader'>
        <header className='homeHeader__wrapper'>
          <a className='homeHeader__city' href='/'>Hangzhou</a>
          <a className='homeHeader__search' href='/'>Search for shops and places.</a>
          <a className='homeHeader__user' href='/'>
            <div className='homeHeader__icon'></div>
          </a>
        </header>
        
      </div>
    );
  }
}

export default HomeHeader;