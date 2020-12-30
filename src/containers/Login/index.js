import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
import { getUsername, getPassword, islogin, actions as loginActions } from '../../redux/modules/login';
import { Redirect} from 'react-router-dom';

class Login extends Component {
  render() {
    const {username, password, login} = this.props;
    if (login) {
      return <Redirect to='/user' />
    }
    return (
      <div>
        <LoginHeader />
        <LoginForm 
          username={username}
          password={password}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }

  handleChange = (e) => {
    if(e.target.name === 'username') {
      this.props.loginActions.setUsername(e.target.value);
    } else if(e.target.name === 'password') {
      this.props.loginActions.setPassword(e.target.value);
    }
  }

  handleSubmit = () => {
    this.props.loginActions.login();
  }
}

const mapStateToProps = (state, props) => {
  return {
    username: getUsername(state),
    password: getPassword(state),
    login: islogin(state)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);