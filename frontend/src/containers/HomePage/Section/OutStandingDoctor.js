import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from 'react-router-dom';

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrDoctor: [],
    }
  }
  componentDidMount() {
    this.props.loadDoctor();
  }
  componentDidUpdate(prevProps, prevState) {
    const { topDoctors } = this.props;
    if (prevProps.topDoctors !== topDoctors) {
      this.setState({ arrDoctor: topDoctors });
    }

  }

  handleViewDetailDoctor = (doctorId) => {
    this.props.history.push(`/detail/${doctorId}`);
  }

  render() {
    let settings = {
      ...this.props.settings,
      dots: false,
    }
    const { lang } = this.props;
    const { arrDoctor } = this.state;
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"><FormattedMessage id="homePage.outstanding-doctor" /></span>
            <button className="btn-section"><FormattedMessage id="homePage.more-infomation" /></button>
          </div>
          <div className="section-body">
            <Slider {...settings} className="custom-slick-slider">
              {arrDoctor && arrDoctor.length > 0 && arrDoctor.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                }
                let nameVi = `${item.positionData.valueVi},  ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div className="section-customize" key={`topdocTor-${item.id}`} onClick={() => this.handleViewDetailDoctor(item.id)}>
                    <div className="customize-content">
                      <div className="bg-image">
                        <div className="outer-bg">
                          <img src={imageBase64} alt={item.id} />
                        </div>
                      </div>
                      <div className="opsition text-center">
                        <div className="title">{lang === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div className="sub-title">Cơ xương khớp </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
        </div >
      </div >
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
    lang: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDoctor: () => dispatch(actions.fetchTopDoctor())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
