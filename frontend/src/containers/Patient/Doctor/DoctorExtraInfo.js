import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DoctorExtraInfo.scss"
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import "./DoctorExtraInfo.scss"

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: true,
    }
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.DoctorExtraInfo !== this.props.DoctorExtraInfo) {
    }
  }

  render() {
    const { isShowDetailInfo } = this.state;
    const { language } = this.props;

    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">Địa chỉ phòng Khám</div>
          <div className="name-clinic">Phòng khám chuyên khoa Da liễu</div>
          <div className="detail-address">207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false ?
            <div className="short-info">GÍA KHÁM: 250.000đ. <span onClick={() => this.setState({ isShowDetailInfo: true })}>Xem chi tiết</span></div>
            :
            <>
              <div className="title-price">GIÁ KHÁM: </div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">Giá khám</span>
                  <span className="right">250.000Đ</span>
                </div>
                <div className="note">
                  Được ưu tiên khám trước khi dặt khám qua BookingCare. Giá khám cho người nước ngoài là 20USD
                </div>
              </div>
              <div className="payment">
                Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
              </div>
              <div className="hide-price" onClick={() => this.setState({ isShowDetailInfo: false })}>
                Ẩn bảng giá
              </div>
            </>
          }
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetailDoctor: (doctorId) => dispatch(actions.getDetailDoctor(doctorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
