import React, { Component } from 'react';
import LikeItem from '../LikeItem';
import './style.css';
import Loading from '../../../../components/Loading';

class LikeList extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef(); //获取dom节点
    this.likeListCount = 1;
  }

  render() {
    const { data, pageCount } = this.props;
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
          pageCount < 3 ? (
            <Loading />
          ) : (
              <a className='likeList__viewAll' href='/'>
                More products...
              </a>
            )
        }
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchData();
  }

  componentDidUpdate() {
    if (this.props.pageCount === 1 ) {
      document.addEventListener("scroll", this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (!this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
    }
  }

  // 处理屏幕滚动事件，实现加载更多的效果
  handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const likeListTop = this.myRef.current.offsetTop;
    const likeListHeight = this.myRef.current.offsetHeight;
    if (scrollTop >= likeListHeight + likeListTop - screenHeight) {
      this.props.fetchData();
      this.likeListCount++;
      if(this.likeListCount===3){
        document.removeEventListener("scroll", this.handleScroll);
      }
    }
  }
}

export default LikeList;