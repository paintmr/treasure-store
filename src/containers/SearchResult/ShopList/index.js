import React, { Component } from 'react';
import './style.css';
import ShopListItem from '../ShopListItem';

const shopData = [
  {
    "id": "s-1",
    "url": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/SearchResult-shop1.jpg?raw=true",
    "pic": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/SearchResult-shop1.jpg?raw=true",
    "shop": "Chixia",
    "star": 45,
    "price": 106,
    "commentQuantity": 20305,
    "region": "Clothes",
    "category": "Hanfu"
  },
  {
    "id": "s-2",
    "url": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/SearchResult-shop2.jpg?raw=true",
    "pic": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/SearchResult-shop2.jpg?raw=true",
    "shop": "Xuande Zhai Paper",
    "star": 50,
    "price": 92,
    "quantity": 6715,
    "region": "Paper",
    "category": "Chinese paper"
  },
  {
    "id": "s-3",
    "url": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/SearchResult-shop3.png?raw=true",
    "pic": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/SearchResult-shop3.png?raw=true",
    "shop": "The Song In The Cloud",
    "star": 50,
    "price": 104,
    "quantity": 200,
    "region": "Umbrellas",
    "category": "Chinese umbrellas"
  },
  {
    "id": "s-4",
    "url": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/SearchResult-shop4.png?raw=true",
    "pic": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/SearchResult-shop4.png?raw=true",
    "shop": "Ning Tea",
    "star": 50,
    "price": 114,
    "quantity": 4025,
    "region": "Tea",
    "category": "Tea sets"
  },
  {
    "id": "s-5",
    "url": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/SearchResult-shop5.png?raw=true",
    "pic": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/SearchResult-shop5.png?raw=true",
    "shop": "Summer Scent",
    "star": 50,
    "price": 92,
    "quantity": 6715,
    "region": "Fans",
    "category": "Chinese fans"
  }
]


class ShopList extends Component {
  constructor(props){
    super(props);
    this.state={
      data: shopData
    }
  }
  render() {
    return (
      <div className='shopList'>
        <div className='shopList__filter'>
          <span className='shopList__filterItem'>All shops</span>
          <span className='shopList__filterItem'>All categories</span>
          <span className='shopList__filterItem'>Auto ranking</span>
        </div>   
        <div className='shopList__list'>
          {this.state.data.map((item,index) => {
            return (
              <div key={item.id}>
                <ShopListItem data={item} />
                {index < this.state.data.length - 1 ? (<div className='shopList__divider' />) : null }
              </div>
            )
          })}
        </div>     
      </div>
    );
  }
}

export default ShopList;