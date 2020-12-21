import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Home';
import productDetail from '../ProductDetail';

import { actions as appActions, getError } from '../../redux/modules/app';
import ErrorToast from '../../components/ErrorToast';

class App extends Component {
  render() {
    const { error, appActions: { clearError } } = this.props;
    return (
      <div className="App">
        <Router>
          {/* 用switch，则匹配到第1个路由后，就停止匹配 */}
          <Switch>
            <Route path='/detail/:id' component={productDetail} />
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
