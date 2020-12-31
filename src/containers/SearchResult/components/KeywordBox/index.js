import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style.css'

class KeywordBox extends Component {
  render() {
    const {currentKeyword} = this.props
    return (
      <div className='keywordBox'>
        <Link to='/search' className='keywordBox__text'>{currentKeyword}</Link>
      </div>
    );
  }
}

export default KeywordBox;