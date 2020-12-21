import React, { Component } from 'react';
import './style.css';

class ProductOverview extends Component {
  render() {
    return (
      <div className='productOverview'>
        <div className='productOverview__header'>
          <div className='productOverview__imgContainer'>
            <img alt='img' className='productOverview__img' src='https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl2.jpg?raw=true'/>
          </div>
          <div className='productOverview__baseInfo'>
            <div className='productOverview__title'>Hanfu bag blue</div>
            <div className='productOverview__content'>Buy Hanfu bag at $29. The Hanfu bag is worth $66 and now costs only $29</div>
          </div>
        </div>
        <div className='productOverview__purchase'>
          <span className='productOverview__symbol'>$</span>
          <span className='productOverview__price'>29</span>
          <span className='productOverview__price--old'>$66</span>
          <a className='productOverview__btn' href='/'>Buy Now</a>
        </div>
        <ul className='productOverview__remark'>
          <li className='productOverview__remarkItem'>
            <i className='productOverview__sign1'></i>
            <span className='productOverview__desc'>Return the product at any time</span>
          </li>
          <li className='productOverview__remarkItem'>
            <i className='productOverview__sign2'></i>
            <span className='productOverview__desc'>Auto refund</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default ProductOverview;