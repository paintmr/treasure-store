import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Discount extends Component {
  render() {
    const { data } = this.props
    return (
      <div className='discount'>
        <a className='discount__header' href='/'>
          <span className='discount__title'>Discounts</span>
          <span className='discount__more'>More Discounts</span>
          <span className='discount__arrow'></span>
        </a>
        <div className='discount__content'>
          {
            data.map((item, index) => {
              return (
                <Link to={`/detail/${item.id}`} key={item.id} className='discount__item' href='/'>
                  <div className='discount__itemPic'>
                    <img wicth='100%' height='100%' src={item.picture} alt={item.product} />
                  </div>
                  <div className='discount__itemTitle'>{item.product}</div>
                  <div className='discount__tiemPriceWrapper'>
                    <ins className='discount__itemCurrentPrice'>{item.currentPrice}</ins>
                    <del className='discount__itemOldPrice'>{item.oldPrice}</del>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Discount;