import React, { Component } from 'react';
import './style.css';

class Remark extends Component {
  render() {
    return (
      <div className='remark'>
        <div className='remark__header'>
          Purchasing information
          <i className='remark__icon'></i>
        </div>    
        <div className='remark__list'>
          <dl className='remark__item'>
            <dt className='remark__itemTitle'>
              Validity Period
            </dt>
            <dd className='remark__itemDesc'>
              Oct 20, 2020 to Oct 19, 2020
            </dd>
          </dl>
          <dl className='remark__item'>
            <dt className='remark__itemTitle'>
              Days excepted
            </dt>
            <dd className='remark__itemDesc'>
              Using the coupon at weekends and holidays
            </dd>
          </dl>
          <dl className='remark__item'>
            <dt className='remark__itemTitle'>
              Coupon using time
            </dt>
            <dd className='remark__itemDesc'>
              11:00-22:00
            </dd>
          </dl>
          <dl className='remark__item'>
            <dt className='remark__itemTitle'>
              Booking remind
            </dt>
            <dd className='remark__itemDesc'>
              No need to book, but maybe a waiting list during busy times
            </dd>
          </dl>
          <dl className='remark__item'>
            <dt className='remark__itemTitle'>
              Rule
            </dt>
            <dd className='remark__itemDesc'>
              Every coupon for two customers
            </dd>
          </dl>
          <dl className='remark__item'>
            <dt className='remark__itemTitle'>
              VIP room
            </dt>
            <dd className='remark__itemDesc'>
              Available
            </dd>
          </dl>
          <dl className='remark__item'>
            <dt className='remark__itemTitle'>
              Embroideries
            </dt>
            <dd className='remark__itemDesc'>
              Suzhou embroideries
            </dd>
          </dl>
          <dl className='remark__item'>
            <dt className='remark__itemTitle'>
              Other services
            </dt>
            <dd className='remark__itemDesc'>
              Dry cleaning
            </dd>
          </dl>
        </div>    
      </div>
    );
  }
}

export default Remark;