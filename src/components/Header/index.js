import React, { Component } from 'react';
import './style.css';

class Header extends Component {
  render() {
    const {grey, title, onBack} = this.props;
    const backgroundColor = grey ? '#f0f0f0' : '#fff';
    return (
      <header className='header' style={{'backgroundColor': backgroundColor}}>
        <div className='header__back' onClick={onBack}>Back</div>
        <div className='header__title'>{title}</div>        
      </header>
    );
  }
}

export default Header;