import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// 以前下列组件都是静态导入的，现在动态导入。
// import Home from '../Home';
// import ProductDetail from '../ProductDetail';
// import Search from '../Search';
// import SearchResult from '../SearchResult';
// import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
// import User from '../User';
// import Purchase from '../Purchase';

import { actions as appActions, getError } from '../../redux/modules/app';
import ErrorToast from '../../components/ErrorToast';

//通过AsyncComponent这个高阶组件和ES的新特性import来动态引入组件
import AsyncComponent from '../../utils/AsyncComponent';

const Home = AsyncComponent(() => import('../Home'));
const ProductDetail = AsyncComponent(() => import('../ProductDetail'));
const Search = AsyncComponent(() => import('../Search'));
const SearchResult = AsyncComponent(() => import('../SearchResult'));
const Login = AsyncComponent(() => import('../Login'));
const User = AsyncComponent(() => import('../User'));
const Purchase = AsyncComponent(() => import('../Purchase'));

class App extends Component {
  render() {
    const { error, appActions: { clearError } } = this.props;
    return (
      <div className="App">
        <Router>
          {/* 用switch，则匹配到第1个路由后，就停止匹配 */}
          <Switch>
            <Route path='/detail/:id' component={ProductDetail} />
            <Route path='/search' component={Search} />
            <Route path='/search_result' component={SearchResult} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/user' component={User} />
            <PrivateRoute path='/purchase/:id' component={Purchase} />
            <Route path='/' component={Home} />
          </Switch>
        </Router>
        {error ? <ErrorToast msg={error} clearError={clearError} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
