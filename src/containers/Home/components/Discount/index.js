import React, { Component } from 'react';
import './style.css'

const dataSource =
  [
    {
      "id": "p-d-1",
      "shopIds": ["s-100"],
      "shop": "Chixia",
      "tag": "Popular",
      "product": "Hanfu",
      "currentPrice": 1,
      "oldPrice": 500,
      "picture": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pd1-chixia-chuchu1.jpg?raw=true"
    },
    {
      "id": "p-d-2",
      "shopIds": ["s-101"],
      "shop": "Tianfu",
      "tag": "Popular",
      "product": "Dim sum",
      "currentPrice": 1,
      "oldPrice": 36,
      "picture": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pd2-shuxiangyuan-gaodian.jpg?raw=true"
    },
    {
      "id": "p-d-3",
      "shopIds": ["s-102"],
      "shop": "Yequ",
      "tag": "Popular",
      "product": "Tea box",
      "currentPrice": 1,
      "oldPrice": 166,
      "picture": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pd3-yequ-chaguan.jpg?raw=true"
    }
  ]


class Discount extends Component {
  render() {
    const data = dataSource
    return (
      <div className='discount'>
        <a className='discount__header'>
          <span className='discount__title'>Discounts</span>
          <span className='discount__more'>More Discounts</span>
          <span className='discount__arrow'></span>
        </a>
        <div className='discount__content'>
          {
            data.map((item, index) => {
              return (
                <a key={item.id} className='discount__item' href={item.picture}>
                  <div className='discount__itemPic'>
                    <img wicth='100%' height='100%' src={item.picture} />
                  </div>
                  <div className='discount__itemTitle'>{item.product}</div>
                  <div className='discount__tiemPriceWrapper'>
                    <ins className='discount__itemCurrentPrice'>{item.currentPrice}</ins>
                    <del className='discount__itemOldPrice'>{item.oldPrice}</del>
                  </div>
                </a>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Discount;