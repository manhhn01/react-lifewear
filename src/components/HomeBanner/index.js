import React from 'react';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import { Link } from 'react-router-dom';

function HomeBanner() {
  const slickConfigs = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...slickConfigs}>
      <div className="relative w-full h-screen">
        <div className="absolute left-0 w-full tracking-wide text-center text-white -translate-y-1/2 font-inter top-1/2">
          <div className="mb-6 text-[2.6rem] font-thin leading-normal uppercase banner-header">
            Bộ sưu tập
            <br />
            Xuân hè 2022
          </div>
          <Link
            to={'/collections'}
            className="inline-block px-4 py-2 text-xl font-medium border-2 border-white banner-button"
          >
            Xem ngay
          </Link>
        </div>
        <img
          className="object-cover w-full h-full"
          src="/images/banner_1.jpg"
          alt="banner"
        />
      </div>
      <div className="relative w-full h-screen">
        <div className="absolute left-0 w-full tracking-wide text-center text-white -translate-y-1/2 font-inter top-1/2">
          <div className="mb-6 text-[2.6rem] font-thin leading-normal uppercase banner-header">
            Chào hè rực rỡ <br />
            Siêu sale giảm tới 40%
          </div>
          <div className="inline-flex">
            <Link
              to={'/collections/nam'}
              className="px-4 py-2 text-xl font-medium border-2 border-white banner-button"
            >
              Thời trang nam
            </Link>
            <Link
              to={'/collections/nu'}
              className="px-4 py-2 ml-10 text-xl font-medium border-2 border-white banner-button"
            >
              Thời trang nữ
            </Link>
          </div>
        </div>
        <img
          className="object-cover w-full h-full"
          src="/images/banner_2.jpg"
          alt="banner"
        />
      </div>
    </Slider>
  );
}

export default HomeBanner;
