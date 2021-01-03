import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { actions as loginActions } from '../../../../redux/modules/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class UserHeader extends Component {
  render() {
    return (
      <header className='userHeader'>
        <Link to='/' >
          <div className='userHeader__back'>Homepage</div>
        </Link>
        <div className='userHeader__list'>
          <span className='userHeader__item userHeader__item--selected'>Orders</span>
          <span className='userHeader__item'>Coupons</span>
        </div>
        <div className='userHeader__right' onClick={this.handleLogout}>Logout</div>        
      </header>
    );
  }

  handleLogout = () => {
    this.props.loginActions.logout();
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(UserHeader);