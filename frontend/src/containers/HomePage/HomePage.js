import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import "./HomePage.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

const PrevArrow = (props) => {
  const { onClick, currentSlide } = props;
  let isDisable = currentSlide === 0;
  return (
    <button className={`slick-prev custom-btn ${isDisable ? 'slick-disable' : ''}`} onClick={onClick}>
      <i className="fa fa-chevron-left" />
    </button>
  );
};

const NextArrow = (props) => {
  const { onClick, currentSlide, slideCount } = props;
  const slideShow = 4;
  let isDisable = currentSlide === slideCount - slideShow;
  return (
    <button className={`slick-next custom-btn ${isDisable ? 'slick-disable' : ''}`} onClick={onClick}>
      <i className="fa fa-chevron-right" />
    </button>
  );
};

class HomePage extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      slidesMargin: 20,
      // dots: false
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <About />
        <HomeFooter />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
