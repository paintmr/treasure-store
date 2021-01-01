import React, { Component } from 'react';
import './style.css'; 
import OrderItem from '../OrderItem';

const tabTitles = ['All Orders', 'To Be Paid', 'Paid', 'Refund']

class UserMain extends Component {

  render() {
    const {currentTab, orders }= this.props;
    return (
      <div className='userMain'>
        <div className='userMain__menu'>
          {
            tabTitles.map((tabTitle, index) => {
              return (
                <div className='userMain__tab' key={index} onClick={this.handleClickTab.bind(this, index)}>
                  <span className={currentTab === index ? 'userMain__title userMain__title--active' : 'userMain__title'}>{tabTitle}</span>
                </div>
              )
            })
          }
        </div>
        <div className='userMain__content'>
          {orders && orders.length > 0 ? this.renderOrderList(orders) : this.renderEmpty()}
        </div>        
      </div>
    );
  }

  renderOrderList = orders => {
    return orders.map(item => {
      return (
        <OrderItem key={item.id} order={item} />
      )
    })
  }

  renderEmpty = () => {
    return (
      <div className='userMain__empty'>
        <div className='userMain__emptyIcon'/>
        <div className='userMain__emptyText1'>No orders</div>
        <div className='userMain__emptyText2'>Would you like to buy something?</div>
      </div>
    )
  }

  handleClickTab = (index) => {
    this.props.onSetCurrentTab(index);
  }

}

export default UserMain;