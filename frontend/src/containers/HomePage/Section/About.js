import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

  render() {
    return (
      <div className="section-share section-about">
        <div className="section-container">
          <div className="about-header">Truyền thông nói gì về MediGo</div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe width="587px" height="355px" src="https://www.youtube.com/embed/FyDQljKtWnI" title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div className="content-right">
              <div className="list-about">
                <div className="option-content">
                  <a href="#" className="option-link">
                    <div className="img-container">
                      <img src="About/vnexpress.png" />
                    </div>
                  </a>
                </div>
                <div className="option-content">
                  <a href="#" className="option-link">
                    <div className="img-container">
                      <img src="About/suckhoedoisong.png" />
                    </div>
                  </a>
                </div>
                <div className="option-content">
                  <a href="#" className="option-link">
                    <div className="img-container">
                      <img src="About/142415-logo-vnnet.png" />
                    </div>
                  </a>
                </div>
                <div className="option-content">
                  <a href="#" className="option-link">
                    <div className="img-container">
                      <img src="About/vtv1.png" />
                    </div>
                  </a>
                </div>
                <div className="option-content">
                  <a href="#" className="option-link">
                    <div className="img-container">
                      <img src="About/165432-vtcnewslogosvg.png" />
                    </div>
                  </a>
                </div>
                <div className="option-content">
                  <a href="#" className="option-link">
                    <div className="img-container">
                      <img src="About/vnexpress.png" />
                    </div>
                  </a>
                </div>
                <div className="option-content">
                  <a href="#" className="option-link">
                    <div className="img-container">
                      <img src="About/vtv1.png" />
                    </div>
                  </a>
                </div>
                <div className="option-content">
                  <a href="#" className="option-link">
                    <div className="img-container">
                      <img src="About/110757-dantrilogo.png" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
