import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css'

class HomeHeader extends Component {
  render() {
    return (
      <div className='homeHeader'>
        <header className='homeHeader__wrapper'>
          <a className='homeHeader__city' href='/'>Hangzhou</a>
          <Link to='/search' className='homeHeader__search' href='/'>Search for shops and places.</Link>
          <Link to='/user' className='homeHeader__user' href='/'>
            <div className='homeHeader__icon'></div>
          </Link>
        </header>

      </div>
    );
  }
}

export default HomeHeader;