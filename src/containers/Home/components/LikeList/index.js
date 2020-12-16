import React, { Component } from 'react';
import LikeItem from '../LikeItem';
import './style.css';
import Loading from '../../../../components/Loading';

const dataSource = 
[
  {
    "id": "p-l-1",
    "shopIds": [
      "s-1",
      "s-1",
      "s-1"
    ],
    "shop": "Wong's Restaurant",
    "tag": "Popular",
    "picture": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl1.jpg?raw=true",
    "product": "Shrimps & Rice",
    "currentPrice": 5.9,
    "oldPrice": 59,
    "saleDesc": "already sold 6034"
  },
  {
    "id": "p-l-2",
    "shopIds": [
      "s-2"
    ],
    "shop": "Peige",
    "tag": "Popular",
    "picture": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl2.jpg?raw=true",
    "product": "Hanfu bag blue",
    "currentPrice": 29,
    "oldPrice": 66,
    "saleDesc": "already sold 1550"
  },
  {
    "id": "p-l-3",
    "shopIds": [
      "s-3",
      "s-3"
    ],
    "shop": "Ning Tea",
    "tag": "Popular",
    "picture": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl3.jpg?raw=true",
    "product": "Green tea",
    "currentPrice": 20,
    "oldPrice": 25,
    "saleDesc": "already sold 88719"
  },
  {
    "id": "p-l-4",
    "shopIds": [
      "s-4"
    ],
    "shop": "Yuan Zhai",
    "tag": "Popular",
    "picture": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl4.jpg?raw=true",
    "product": "Hanfu bag pink",
    "currentPrice": 13,
    "oldPrice": 23.5,
    "saleDesc": "already sold 3538"
  },
  {
    "id": "p-l-5",
    "shopIds": [
      "s-5"
    ],
    "shop": "Ye Tea",
    "tag": "Popular",
    "picture": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl5.jpg?raw=true",
    "product": "Tea cloth",
    "currentPrice": 17.5,
    "oldPrice": 50,
    "saleDesc": "already sold 976"
  },
  {
    "id": "p-l-6",
    "shopIds": [
      "s-6"
    ],
    "shop": "Anran Travel",
    "tag": "Popular",
    "picture": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl6.jpeg?raw=true",
    "product": "One day trip to Nanjing",
    "currentPrice": 67.5,
    "oldPrice": 200,
    "saleDesc": "already sold 976"
  },
  {
    "id": "p-l-7",
    "shopIds": [
      "s-7"
    ],
    "shop": "Spicy Hub",
    "tag": "Popular",
    "picture": "https://github.com/paintmr/pictures-for-treasure-store/blob/main/pl7.jpg?raw=true",
    "product": "Spicy dish",
    "currentPrice": 5.5,
    "oldPrice": 25,
    "saleDesc": "already sold 15976"
  }  
]

class LikeList extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef(); //获取dom节点
    this.state = {
      data: dataSource,
      loadTimes: 1,
    }
    this.removeEventListener = false;
  }

  render() {
    const {data, loadTimes} = this.state;
    return (
      <div ref={this.myRef} className='likeList'>
        <div className='likeList__header'>Recommendations</div>
        <div className='likeList__list'>
          {
            data.map((item, index) => {
              return <LikeItem key={index} data={item} />
            })
          }
        </div>
        {
          loadTimes < 3 ? (
            <Loading/>
          ): (
            <a className='likeList__viewAll'>
              More products...
            </a>
          )
        }
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate() {
    if(this.state.loadTimes >=3 && !this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
      this.removeEventListener = true;
    }
  }

  componentWillUnmount() {
    if(!this.removeListener) {
      document.removeEventListener('scroll',this.handleScroll)
    }
  }

  // 处理屏幕滚动事件，实现加载更多的效果
  handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const likeListTop = this.myRef.current.offsetTop;
    const likeListHeight = this.myRef.current.offsetHeight;
    if(scrollTop >= likeListHeight + likeListTop - screenHeight) {
      const newData =  this.state.data.concat(dataSource);
      const newLoadTimes = this.state.loadTimes +1;
      setTimeout(() => {
        this.setState({
          data: newData,
          loadTimes: newLoadTimes
        })
      }, 1000)
    }
  }
}

export default LikeList;