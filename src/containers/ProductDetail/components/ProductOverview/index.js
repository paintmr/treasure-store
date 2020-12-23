import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class ProductOverview extends Component {
  render() {
    const { id, product, picture, description, currentPrice, oldPrice } = this.props.product;
    return (
      <div className='productOverview'>
        <div className='productOverview__header'>
          <div className='productOverview__imgContainer'>
            <img alt='img' className='productOverview__img' src={picture} />
          </div>
          <div className='productOverview__baseInfo'>
            <div className='productOverview__title'>{product}</div>
            <div className='productOverview__content'>{description}</div>
          </div>
        </div>
        <div className='productOverview__purchase'>
          <span className='productOverview__symbol'>$</span>
          <span className='productOverview__price'>{currentPrice}</span>
          <span className='productOverview__price--old'>${oldPrice}</span>
          <Link className='productOverview__btn' to={`/purchase/${id}`}>Buy Now</Link>
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