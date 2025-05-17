import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Specialty.scss"
import Slider from "react-slick";
import slider from "../../../assets/Specialty/112457-co-xuong-khop.jpg"



class Specialty extends Component {
  render() {

    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings} className="custom-slick-slider">
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={slider} />
                  </div>
                  <h3>Cơ xương khóp 1</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={slider} />
                  </div>
                  <h3>Cơ xương khóp 2</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={slider} />
                  </div>
                  <h3>Cơ xương khóp 3</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={slider} />
                  </div>
                  <h3>Cơ xương khóp 4</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={slider} />
                  </div>
                  <h3>Cơ xương khóp 5</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={slider} />
                  </div>
                  <h3>Cơ xương khóp 6</h3>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
