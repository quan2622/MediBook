import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import handbook from "../../../assets/HandBook/105820-he-thong-y-te-thu-cuc-tci-1.png"

class HandBook extends Component {

  render() {
    return (
      <div className="section-share section-hand-book">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings} className="custom-slick-slider">
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={handbook} />
                  </div>
                  <h3>Cẩm nang 1</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={handbook} />
                  </div>
                  <h3>Cẩm nang 2</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={handbook} />
                  </div>
                  <h3>Cẩm nang 3</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={handbook} />
                  </div>
                  <h3>Cẩm nang 4</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={handbook} />
                  </div>
                  <h3>Cẩm nang 5</h3>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-content">
                  <div className="bg-image">
                    <img src={handbook} />
                  </div>
                  <h3>Cẩm nang 6</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
