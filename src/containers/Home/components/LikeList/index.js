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
    //当pageCount为0的时候，说明还没有加载过LikeList，这时候才去mock数据中请求LikeList的数据
    if(this.props.pageCount === 0) {
    this.props.fetchData();
    }

    //第一次进入HomePage，然后进入Detail，然后从Detail回到HomePage后的判断。如果pageCount大于0但小于3，说明还有数据没加载完，还有监听的必要
    if(this.props.pageCcount > 0 && this.props.pageCcount <3) {
      document.addEventListener("scroll", this.handleScroll);
      this.likeListCount = this.props.pageCcount;
    }
  }

  componentDidUpdate() { 
    //第一次进入页面，加载了1个LikeList后，开始监听
    if(this.likeListCount === 1){
      document.addEventListener("scroll", this.handleScroll);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
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