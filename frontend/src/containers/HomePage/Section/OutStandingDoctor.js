import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import oustanding from "../../../assets/OutStandingDoctor/092249-doctor-check.jpg"
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
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
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-section">Xem thêm</button>
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
                  <div className="section-customize" key={`topdocTor-${item.id}`}>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
