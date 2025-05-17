import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeHeader.scss"
import logo from "../../assets/images/logo.svg"
import { FormattedMessage } from "react-intl";

class HomeHeader extends Component {

  render() {
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo">
                <img src={logo} alt="LogoApp" />
              </div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="home-header.specialty" /></b>
                </div>
                <div className="sub-title"><FormattedMessage id="home-header.specialty-sub" /></div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="home-header.health-facility" /></b>
                </div>
                <div className="sub-title"><FormattedMessage id="home-header.health-facility-sub" /></div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="home-header.doctor" /></b>
                </div>
                <div className="sub-title"><FormattedMessage id="home-header.doctor-sub" /></div>
              </div>
              <div className="child-content">
                <div>
                  <b><FormattedMessage id="home-header.fee" /></b>
                </div>
                <div className="sub-title"><FormattedMessage id="home-header.fee-sub" /></div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="far fa-question-circle"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              <div className="language-vi active">VN</div>
              <div className="language-en">EN</div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-top">
            <div className="title1"><FormattedMessage id="banner.title1" /></div>
            <div className="title2"><FormattedMessage id="banner.title2" /></div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
            </div>
          </div>
          <div className="content-bottom">
            <div className="option">
              <div className="option-child">
                <div className="icon-child">
                  <img src="/Banner/khamchuyenkhoa.png" alt="KhamChuyenKhoa" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child1" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src="/Banner/kham-tu-xa.png" alt="KhamChuyenKhoa" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child2" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src="/Banner/kham-tong-quan.png" alt="KhamChuyenKhoa" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child3" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src="/Banner/xet-nghiem-y-hoc.png" alt="KhamChuyenKhoa" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child4" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src="/Banner/suc-khoe-tinh-than.png" alt="KhamChuyenKhoa" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child5" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src="/Banner/kham-nha-khoa.png" alt="KhamChuyenKhoa" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.child6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
