import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./MedicalFacility.scss"
import Slider from "react-slick";
import midical from "../../../assets/Medical-facility/155206-logo-y-duoc-1.jpg"

class MedicalFacility extends Component {

  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings} className="custom-slick-slider">
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={midical} />
                  </div>
                  <h3>Hệ thống y tế thu cúc 1</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={midical} />
                  </div>
                  <h3>Hệ thống y tế thu cúc 2</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={midical} />
                  </div>
                  <h3>Hệ thống y tế thu cúc 3</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={midical} />
                  </div>
                  <h3>Hệ thống y tế thu cúc 4</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={midical} />
                  </div>
                  <h3>Hệ thống y tế thu cúc 5</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={midical} />
                  </div>
                  <h3>Hệ thống y tế thu cúc 6</h3>
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
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
