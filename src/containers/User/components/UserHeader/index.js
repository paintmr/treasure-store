import React, { Component } from 'react';
import './style.css';

class UserHeader extends Component {
  render() {
    const {onBack, onLogout} = this.props;
    return (
      <header className='userHeader'>
        <div className='userHeader__back' onClick={onBack}>Homepage</div>
        <div className='userHeader__list'>
          <span className='userHeader__item userHeader__item--selected'>Orders</span>
          <span className='userHeader__item'>Coupons</span>
        </div>
        <div className='userHeader__right' onClick={onLogout}>Logout</div>        
      </header>
    );
  }
}

export default UserHeader;