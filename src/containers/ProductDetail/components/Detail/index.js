import React, { Component } from 'react';
import './style.css';

class Detail extends Component {
  render() {
    return (
      <div className='detail'>
        <div className='detail__header'>
          <span>Group buying</span>
          <i className='detail__headerIcon'/>
        </div>
        <table className='detail__table' cellPadding='0' cellSpacing='0'>
          <tbody>
            <tr className='detail__row'>
              <th className='detail__category' colSpan='3'>Drinks</th>
            </tr>
            <tr className='detail__row'>
              <td>Hanfu bags</td>
              <td className='detail__td--alignRight'>1 bag</td>
              <td className='detail__td--alignRight'>$29</td>
            </tr>
            <tr className='detail__row'>
              <td/>
              <td className='detail__td--price'>
                Original price
                <br/>
                <strong className='detail__td--priceNew'>Group-buying price</strong>
              </td>
              <td className='detail__td--price'>
                66
                <br/>
                <strong className='detail__td--priceNew'>29</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='detail__remark'>
          Free drinks
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