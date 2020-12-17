import React, { Component } from 'react';
import Slider from "react-slick";
import './style.css';

const dataSource = [
  [
    {
      name: "Films",
      src:
        "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/1-films.png?raw=true"
    },
    {
      name: "Hotels",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/2-hotels.png?raw=true"
    },
    {
      name: "Leisure",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/3-leisure.png?raw=true"
    },
    {
      name: "Takeaway",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/4-takeaway.png?raw=true"
    },
    {
      name: "Hotpot",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/5-hotpot.png?raw=true"
    },
    {
      name: "Food",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/6-food.png?raw=true"
    },
    {
      name: "Beauty",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/7-beauty.png?raw=true"
    },
    {
      name: "Landscape",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/8-landscape.png?raw=true"
    },
    {
      name: "Vehicles",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/9-vehicles.png?raw=true"
    },
    {
      name: "Sports",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/10-sports.png?raw=true"
    }
  ],
  [
    {
      name: "Hotels",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/2-hotels.png?raw=true"
    },
    {
      name: "Hotpot",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/5-hotpot.png?raw=true"
    },
    {
      name: "Films",
      src:
        "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/1-films.png?raw=true"
    },
    {
      name: "Takeaway",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/4-takeaway.png?raw=true"
    },
    {
      name: "Leisure",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/3-leisure.png?raw=true"
    },
    {
      name: "Beauty",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/7-beauty.png?raw=true"
    },
    {
      name: "Food",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/6-food.png?raw=true"
    },
    {
      name: "Vehicles",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/9-vehicles.png?raw=true"
    },
    {
      name: "Sports",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/10-sports.png?raw=true"
    },
    {
      name: "Landscape",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/8-landscape.png?raw=true"
    }
  ],
  [
    {
      name: "Films",
      src:
        "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/1-films.png?raw=true"
    },
    {
      name: "Takeaway",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/4-takeaway.png?raw=true"
    },
    {
      name: "Hotels",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/2-hotels.png?raw=true"
    },
    {
      name: "Leisure",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/3-leisure.png?raw=true"
    },
    {
      name: "Beauty",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/7-beauty.png?raw=true"
    },
    {
      name: "Food",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/6-food.png?raw=true"
    },
    {
      name: "Sports",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/10-sports.png?raw=true"
    },
    {
      name: "Hotpot",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/5-hotpot.png?raw=true"
    },
    {
      name: "Vehicles",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/9-vehicles.png?raw=true"
    },
    {
      name: "Landscape",
      src: "https://github.com/paintmr/pictures-for-treasure-store/blob/main/categories-icons/8-landscape.png?raw=true"
    }
  ]
];

class Category extends Component {
  render() {
    const settings = {
      dots: true,
      arrows: false,
      slidesToShow: 1,
      swipeToSlide: true,
      autoplay: true
    }
    return (
      <div className='category'>
        <Slider {...settings}>
          {
            dataSource.map((section, index) => {
              return (
                <div key={index}>
                  {
                    section.map((item,i) => {
                      return (
                        <div className='category__section' key={i}>
                          <img className='category__icon' src={item.src} alt={item.name} />
                          <div>
                            <span className='category__text'>{item.name}</span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </Slider>
      </div>
    );
  }
}

export default Category;