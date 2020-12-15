import React, { Component } from 'react';
import Slider from 'react-slick';
import './style.css';

const dataSource = [
  {
    pic:
      "https://github.com/paintmr/pictures-for-treasure-store/blob/main/homepage-headline1-fan.jpg?raw=true",
    title: "Elegant Fan, Traditional Chinese Style",
    url:
      "https://github.com/paintmr/pictures-for-treasure-store/blob/main/homepage-headline1-fan.jpg?raw=true"
  },
  {
    pic:
      "https://github.com/paintmr/pictures-for-treasure-store/blob/main/homepage-headline2-lijiang.jpg?raw=true",
    title: "A Wonderful Tour To Lijiang, A Paradise In Western China",
    url:
      "https://github.com/paintmr/pictures-for-treasure-store/blob/main/homepage-headline2-lijiang.jpg?raw=true"
  },
  {
    pic:
      "https://github.com/paintmr/pictures-for-treasure-store/blob/main/homepage-headline3-hanfu-zhonglingji.jpg?raw=true",
    title: "Beautiful Hanfu, Traditional Clothing Of The Han Chinese",
    url:
      "https://github.com/paintmr/pictures-for-treasure-store/blob/main/homepage-headline3-hanfu-zhonglingji.jpg?raw=true"
  }
];

class Headline extends Component {
  render() {
    const settings = {
      slidesToShow: 1,
      swipeToSlide: true,
      autoplay: true,
      vertical: true
    }
    return (
      <div className="headline">
        <div className="headline__logo">
        </div>
        <div className="headline__slider">
          <Slider {...settings}>
            {
              dataSource.map((item,index) => {
                return (
                  <a key={index} className='headline__sliderInner' href={item.url}>
                    <div className='headline__sliderTitle'>{item.title}</div>
                    <div className='headline__sliderImgWrapper'>
                      <img className='headline__sliderImg' src={item.pic}/>
                    </div>
                  </a>
                )
              })
            }
          </Slider>
        </div>
      </div>
    );
  }
}

export default Headline;