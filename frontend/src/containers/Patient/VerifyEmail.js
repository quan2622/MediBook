import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./VerifyEmail.scss"
import { FormattedMessage } from "react-intl";
import userService from "../../services/user.service";
import { toast } from "react-toastify";
import HomeHeader from "../HomePage/HomeHeader";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import { toPng } from 'html-to-image';
import { LANGUAGES } from "../../utils";
import moment from "moment";
import 'moment/min/locales';
import _ from "lodash";


class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      dataBooking: {},
    };
    this.cardRef = React.createRef();
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const queryParams = new URLSearchParams(this.props.location.search);
      const token = queryParams.get('token');
      const doctorId = queryParams.get('doctorId');
      const resVerify = await userService.verifyBooking({
        doctorId: doctorId,
        token: token,
      })

      if (resVerify && resVerify.EC === 0) {
        toast.success(resVerify.EM);
        this.setState({ statusVerify: true });
        const res = await userService.getDataBooking(token);
        console.log("Check res: ", res);
        if (res && res.EC === 0) {
          this.setState({
            dataBooking: res.dataBooking,
          });
        } else {
          toast.error(res.EM)
        }
      } else {
        toast.error(resVerify.EM);
        this.setState({ statusVerify: false });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }


  handleRedirectHome = () => {
    this.props.history.push('/home');
  }

  handleSaveAsImage = () => {
    const node = this.cardRef.current;

    // Cách fix nếu vẫn có màu oklch
    node.querySelectorAll("*").forEach(el => {
      const computed = getComputedStyle(el);
      if (computed.color.includes("oklch")) el.style.color = "#333";
      if (computed.backgroundColor.includes("oklch")) el.style.backgroundColor = "#fff";
    });

    toPng(node, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'confirm-booking.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('❌ Error when save image:', error);
      });
  };


  render() {
    const { dataBooking } = this.state;
    const { language } = this.props;

    if (!dataBooking && _.isEmpty(dataBooking)) {
      return (
        <div>Loading ...</div>
      )
    }

    let date = language === LANGUAGES.VI ?
      moment.unix(+dataBooking.date / 1000).locale('vi').format("dddd - DD/MM/YYYY")
      :
      moment.unix(+dataBooking.date / 1000).locale('en').format("ddd - DD/MM/YYYY")

    date = date.charAt(0).toUpperCase() + date.slice(1);

    const namePateint = language === LANGUAGES.VI ?
      `${dataBooking?.user_data?.lastName} ${dataBooking?.user_data?.firstName}`
      :
      `${dataBooking?.user_data?.firstName} ${dataBooking?.user_data?.lastName}`

    return (
      <>
        <HomeHeader />
        <div className="card-container">
          {this.state.statusVerify ?
            <div className="confirmation-card" ref={this.cardRef}>
              <div className="success-header">
                <div className="success-icon"></div>
                <h1 className="success-title">Đặt lịch thành công!</h1>
                <p className="success-subtitle">Lịch hẹn của bạn đã được xác nhận</p>
              </div>

              <div className="appointment-details">
                <div className="detail-row">
                  <span className="detail-label">Họ tên bệnh nhân:</span>
                  <span className="detail-value">{namePateint}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Ngày khám:</span>
                  <span className="detail-value">{date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Thời gian:</span>
                  <span className="detail-value">
                    {language === LANGUAGES.VI ? dataBooking?.time_data?.valueVi : dataBooking.time_data?.valueEn}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Bác sĩ:</span>
                  <span className="detail-value">
                    {language === LANGUAGES.VI ?
                      `${dataBooking?.doctor_data?.lastName} ${dataBooking?.doctor_data?.firstName}`
                      :
                      `${dataBooking?.doctor_data?.firstName} ${dataBooking?.doctor_data?.lastName}`
                    }
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Địa chỉ:</span>
                  <span className="detail-value hospital-address">
                    {dataBooking?.doctor_data?.doctor_info?.nameClinic}
                    <br />
                    <span className="address">{dataBooking?.doctor_data?.doctor_info?.addressClinic}</span>

                  </span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn btn-secondary" onClick={this.handleSaveAsImage}>In phiếu hẹn</button>
                <button className="btn btn-primary" onClick={this.handleRedirectHome}>Về trang chủ</button>
              </div>

              <div className="appointment-id">
                <strong>Mã lịch hẹn:</strong> {dataBooking.id}
              </div>
            </div>
            :
            <div className="error-card">
              <div className="error-icon"></div>
              <h1 className="error-title">Đặt lịch thất bại!</h1>
              <p className="error-message">Có lỗi xảy ra trong quá trình đặt lịch hẹn. Vui lòng thử lại sau.</p>
            </div>
          }
        </div>
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyEmail));
