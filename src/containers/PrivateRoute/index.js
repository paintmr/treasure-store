import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLogin } from '../../redux/modules/login';

//先校驗登錄情況，只有用戶處於登錄狀態，才渲染相關組件。PrivateRoute本質上也是個Route
class PrivateRoute extends Component {
  render() {
    //component是待渲染的組件，大寫其首字母，將其重命名為Component。其它的屬性都放到參數rest下
    const { component: Component, login, ...rest} = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return login ? (
            <Component {...props} />
          ) : (
            <Redirect 
              to={{
                pathname: '/login',
                state: { from: props.location}
              }}
            />
          )
        }}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    login: isLogin(state)
  }
}

export default connect(mapStateToProps, null)(PrivateRoute);