import React, {Component} from 'react';

// 有几个路由，就把js代码分割成几个编译的文件。这样每访问一个路由的URL，就只加载对应的js代码，不会加载其它页面的代码，提升速度，节约性能。
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props){
      super(props);
      this.state = {
        component: null
      }
    }

    componentDidMount() {
      importComponent().then((mod) => {
        this.setState({
          component: mod.default
        })
      })
    }

    render(){
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}