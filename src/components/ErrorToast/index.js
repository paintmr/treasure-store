import React, { Component } from 'react';
import "./style.css";

class ErrorToast extends Component {
  render() {
    const { msg } = this.props
    return (
      <div>
        {msg}
      </div>
    );
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.clearError();
    },3000);
  }

  componentWillUnmount() {
    if(this.timer) {
      clearTimeout(this.timer)
    }
  }
}

export default ErrorToast;