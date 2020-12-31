import React, { Component } from 'react';
import UserHeader from './components/UserHeader';
import UserMain from './components/UserMain';

class User extends Component {
  render() {
    return (
      <div>
        <UserHeader onBack={this.handleBack} onLogout={this.handleLogout}/>
        <UserMain />
      </div>
    );
  }

  handleBack = () => {
    this.props.history.push('/');
  }

  handleLogout = () => {

  }
}

export default User;