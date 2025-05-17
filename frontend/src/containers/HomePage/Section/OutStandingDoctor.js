import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import oustanding from "../../../assets/OutStandingDoctor/092249-doctor-check.jpg"

class OutStandingDoctor extends Component {

  render() {
    let settings = {
      ...this.props.settings,
      dots: false,
    }
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...settings} className="custom-slick-slider">
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <div className="outer-bg">
                      <img src={oustanding} />
                    </div>
                  </div>
                  <div className="opsition text-center">
                    <div className="title">Giáo sư, Tiến sĩ Nguyen Hong Quan</div>
                    <div className="sub-title">Cơ xương khớp </div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <div className="outer-bg">
                      <img src={oustanding} />
                    </div>
                  </div>
                  <div className="opsition text-center">
                    <div className="title">Giáo sư, Tiến sĩ Nguyen Hong Quan</div>
                    <div className="sub-title">Cơ xương khớp </div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <div className="outer-bg">
                      <img src={oustanding} />
                    </div>
                  </div>
                  <div className="opsition text-center">
                    <div className="title">Giáo sư, Tiến sĩ Nguyen Hong Quan</div>
                    <div className="sub-title">Cơ xương khớp </div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <div className="outer-bg">
                      <img src={oustanding} />
                    </div>
                  </div>
                  <div className="opsition text-center">
                    <div className="title">Giáo sư, Tiến sĩ Nguyen Hong Quan</div>
                    <div className="sub-title">Cơ xương khớp </div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <div className="outer-bg">
                      <img src={oustanding} />
                    </div>
                  </div>
                  <div className="opsition text-center">
                    <div className="title">Giáo sư, Tiến sĩ Nguyen Hong Quan</div>
                    <div className="sub-title">Cơ xương khớp </div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <div className="outer-bg">
                      <img src={oustanding} />
                    </div>
                  </div>
                  <div className="opsition text-center">
                    <div className="title">Giáo sư, Tiến sĩ Nguyen Hong Quan</div>
                    <div className="sub-title">Cơ xương khớp </div>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
