import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './carousel.css';

export default class Featured extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      rows: 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1

    };
    return (
      <div>
        <p></p>
        <h2> Our Featured Dishes</h2>
        <Slider {...settings}>
          <div>
          <img src={"https://bit.ly/2qQM030"} class="center" width="300" height="450" />
          </div>
          <div>
          <img src={"https://bit.ly/36E7BuK"} class="center2" width="300" height="450" />
          </div>
        
        </Slider>
      </div>
            
    );
    
  }
}