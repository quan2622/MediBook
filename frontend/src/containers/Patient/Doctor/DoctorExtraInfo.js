import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DoctorExtraInfo.scss"
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import "./DoctorExtraInfo.scss"
import { NumericFormat } from 'react-number-format';
import { FormattedMessage } from "react-intl";
import userService from "../../../services/user.service";
import { toast } from "react-toastify";
import _ from "lodash";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      extraInfo: {},
    }
  }

  componentDidMount() {
    if (this.props.doctorId) {
      this.handleGetExtraInfo(this.props.doctorId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.doctorId !== this.props.doctorId) {
      this.handleGetExtraInfo(this.props.doctorId);
    }
  }


  handleGetExtraInfo = async (doctorId) => {
    const res = await userService.getExtraInfoDoctor(doctorId);
    if (res.EC === 0 && res.infoDoctor) {
      this.setState({ extraInfo: res.infoDoctor });
    } else {
      this.setState({ extraInfo: {} });
      // toast.error(res.EM);
    }
  }

  render() {
    const { isShowDetailInfo, extraInfo } = this.state;
    const { language } = this.props;

    if (_.isEmpty(extraInfo)) return (
      <div className="doctor-extra-info-nodata">Không tìm thấy thông tin của bác sĩ</div>
    )

    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <i class="fas fa-map-marker-alt"></i>
            <FormattedMessage id="patient.extra-info.text-address" />
          </div>
          <div className="name-clinic">{extraInfo?.nameClinic || ""}</div>
          <div className="detail-address">{extraInfo?.addressClinic || ""}</div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false ?
            <div className="short-info">
              <span style={{ 'textTransform': 'uppercase', 'fontStyle': 'italic', 'textDecoration': 'underline' }}>
                <FormattedMessage id="patient.extra-info.price" />
              </span>
              {language === LANGUAGES.VI ?
                <NumericFormat value={extraInfo?.price_data?.valueVi || ""} displayType="text" thousandSeparator="," suffix=" VNĐ" className="short-info-price" />
                :
                <NumericFormat value={extraInfo?.price_data?.valueEn || ""} displayType="text" thousandSeparator="," suffix=" $" className="short-info-price" />
              }
              <span className="btn-detail" onClick={() => this.setState({ isShowDetailInfo: true })}>
                <FormattedMessage id="patient.extra-info.detail" />
              </span>
            </div>
            :
            <>
              <div className="title-price">
                <span style={{ 'textTransform': 'uppercase', 'fontStyle': 'italic', 'textDecoration': 'underline' }}>
                  <FormattedMessage id="patient.extra-info.price" />
                </span>
              </div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-info.price" />
                  </span>
                  <span className="right">
                    {language === LANGUAGES.VI ?
                      <NumericFormat value={extraInfo?.price_data?.valueVi || ""} displayType="text" thousandSeparator="," suffix=" VNĐ" />
                      :
                      <NumericFormat value={extraInfo?.price_data?.valueEn || ""} displayType="text" thousandSeparator="," suffix=" $" />
                    }
                  </span>
                </div>
                <div className="note">
                  {extraInfo?.note || ""}
                </div>
              </div>
              <div className="payment">
                <FormattedMessage id="patient.extra-info.payment-method" />
                {extraInfo?.payment_data?.valueVi === "Tất cả" ? (
                  (language === LANGUAGES.VI ? ['Tiền Mặt', 'Thẻ ATM'] : ['Cash', 'Credit Card']).map((item, index) => (
                    <span key={index} className="badge bg-primary mx-1">{item}</span>
                  ))
                ) : (
                  <span className="badge bg-primary mx-1">
                    {language === LANGUAGES.VI ? extraInfo?.payment_data?.valueVi : extraInfo?.payment_data?.valueEn}
                  </span>
                )}

              </div>
              <div className="hide-price" onClick={() => this.setState({ isShowDetailInfo: false })}>
                <FormattedMessage id="patient.extra-info.hidden-detail" />
              </div>
            </>
          }
        </div>
      </div >
    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
