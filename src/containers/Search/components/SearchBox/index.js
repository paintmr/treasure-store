import React, { Component } from 'react';
import './style.css';

const data = [
  { "id": "k-10", "keyword": "hotpot", "quantity": 8710 },
  { "id": "k-11", "keyword": "hotpot buffet", "quantity": 541 },
  { "id": "k-12", "keyword": "hotpot Chengdu", "quantity": 65 },
  { "id": "k-13", "keyword": "hotpot Chongqing", "quantity": 133 },
  { "id": "k-14", "keyword": "hotpot homemade", "quantity": 179 },
  { "id": "k-15", "keyword": "hotpot Guangzhou", "quantity": 291 },
  { "id": "k-16", "keyword": "hotpot dinners", "quantity": 261 },
  { "id": "k-17", "keyword": "hotpot restaurants", "quantity": 8648 }
]

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    }
  }
  render() {
    return (
      <div className='searchBox'>
        <div className='searchBox__container'>
          <input className='searchBox__text' value={this.state.inputText} onChange={this.handleChange}/>
          <span className='searchBox__clear' onClick={this.handleClear}></span>
          <span className='searchBox__cancel' onClick={this.handleCancel}>Cancel</span>
        </div>     
        {this.state.inputText.length > 0 ? this.renderSuggestList() : null}   
      </div>
    );
  }

  renderSuggestList = () => {
    return (
      <ul className='searchBox__list'>
        {
          data.map(item => {
            return (
              <li className='searchBox__item'>
                <span className='searchBox__itemKeyword'>{item.keyword}</span>
                <span className='searchBox__itemQuantity'>about {item.quantity} results</span>
              </li>
            )
          })
        }      
      </ul>
    )
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value
    })
  }

  handleClear = () => {
    this.setState({
      inputText: ''
    })
  }

  handleCancel = () => {
    
  }

}

export default SearchBox;