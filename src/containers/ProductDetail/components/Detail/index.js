import React, { Component } from 'react';
import './style.css';

class Detail extends Component {
  render() {
    const {detail: {category, products, remark}, currentPrice, oldPrice} = this.props.product
    return (
      <div className='detail'>
        <div className='detail__header'>
          <span>Group buying information</span>
          <i className='detail__headerIcon'/>
        </div>
        <table className='detail__table' cellPadding='0' cellSpacing='0'>
          <tbody>
            <tr className='detail__row'>
              <th className='detail__category' colSpan='3'>{category}</th>
            </tr>
           {products.map((item, index) => {
              return (
                <tr key={index} className='detail__row'>
                  <td>{item.name}</td>
                  <td className='detail__td--alignRight'>{item.quantity}</td>
                  <td className='detail__td--alignRight'>{item.price}</td>
                </tr>
              )
           })}
            <tr className='detail__row'>
              <td/>
              <td className='detail__td--price'>
                Original price
                <br/>
                <strong className='detail__td--priceNew'>Group-buying price</strong>
              </td>
              <td className='detail__td--price'>
                ${oldPrice}
                <br/>
                <strong className='detail__td--priceNew'>${currentPrice}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='detail__remark'>
          {remark}
        </div>
        <div className='detail__more'>
          <span>More detail</span>
          <span className='detail__notice'>To save money open the page when using wifi.</span>
          <i className='detail__arrow' />
        </div>        
      </div>
    );
  }
}

export default Detail;