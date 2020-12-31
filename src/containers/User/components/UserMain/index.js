import React, { Component } from 'react';
import './style.css'; 
import OrderItem from '../OrderItem';

const tabTitles = ['All Orders', 'To Be Paid', 'Paid', 'Refund']

const data = [
  {
    "id": "o-1",
    "statusText": "Paid",
    "orderPicUrl": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl3.jpg?raw=true",
    "channel": "Group Buying",
    "title": "Ning Tea：Green Tea",
    "text": ["1 coupon | Total price：$20", "Validity Period Oct 19, 2021"],
    "type": 1
  },
  {
    "id": "o-2",
    "statusText": "To Be Paid",
    "orderPicUrl": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl1.jpg?raw=true",
    "channel": "Group Buying",
    "title": "Wong's Restaurant：Shrimps & Rice",
    "text": ["2 coupons | Total price：$11.8", "Validity Period Oct 19, 2021"],
    "type": 2
  },
  {
    "id": "o-3",
    "statusText": "Paid",
    "orderPicUrl": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl4.jpg?raw=tru",
    "channel": "Group Buying",
    "title": "Yuan Zhai：Hanfu bag pink",
    "text": ["1 coupon | Total price：$13", "Validity Period Oct 19, 2021"],
    "type": 1
  }
]


class UserMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    }
  }
  render() {
    const {currentTab }= this.state;
    return (
      <div className='userMain'>
        <div className='userMain__menu'>
          {
            tabTitles.map((item, index) => {
              return (
                <div className='userMain__tab' key={index} onClick={this.handleClickTab.bind(this, index)}>
                  <span className={currentTab === index ? 'userMain__title userMain__title--active' : 'userMain__title'}>{item}</span>
                </div>
              )
            })
          }
        </div>
        <div className='userMain__content'>
          {data && data.length > 0 ? this.renderOrderList(data) : this.renderEmpty()}
        </div>        
      </div>
    );
  }

  renderOrderList = data => {
    return data.map(item => {
      return (
        <OrderItem key={item.id} data={item} />
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
    this.setState({
      currentTab: index
    })
  }

}

export default UserMain;