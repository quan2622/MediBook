import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ProfileDoctor.scss"
import * as actions from "../../../store/actions"
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import { NumericFormat } from 'react-number-format';
import moment from "moment";
import 'moment/min/locales';

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    }
  }

  componentDidMount() {
    const { doctorId, getProfileDoctor } = this.props;
    if (doctorId) {
      getProfileDoctor(doctorId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.doctorId !== this.props.doctorId) {
      this.props.getProfileDoctor(this.props.doctorId);
    }
    if (prevProps.profileDoctor !== this.props.profileDoctor) {
      this.setState({ dataProfile: this.props.profileDoctor })
    }
  }

  renderTimeBooking = (props) => {
    const { dataSchedule } = props;
    const { language } = this.props;
    if (dataSchedule && !_.isEmpty(dataSchedule)) {
      let date = language === LANGUAGES.VI ?
        moment.unix(+dataSchedule.date / 1000).locale('vi').format("dddd - DD/MM/YYYY")
        :
        moment.unix(+dataSchedule.date / 1000).locale('en').format("ddd - MM/DD/YYYY")

      date = date.charAt(0).toUpperCase() + date.slice(1);
      const { scheduleData } = dataSchedule;
      return (
        <>
          <div className="schdeule-container">
            <span>
              <i class="fas fa-clock"></i>
              {language === LANGUAGES.VI ? scheduleData.valueVi : scheduleData.valueEn}
            </span>
            <span>
              <i class="fas fa-calendar-alt"></i>
              {date}
            </span>
          </div>
          <div><FormattedMessage id="patient.bookingModal.price-booking" /></div>
        </>
      )
    } else {
      return (<></>);
    }
  }

  render() {
    console.log("Check data schedule: ", this.props.dataSchedule)
    const { language, isShowDescription, isShowAddressClinic, dataSchedule } = this.props;
    const { dataProfile } = this.state;
    if (_.isEmpty(dataProfile)) {
      return (
        <div>Loading profile doctor...</div>
      )
    }
    let nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    let nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div className="profile-left" style={{ backgroundImage: `url(${dataProfile.image})` }} ></div>
          <div className="profile-right">
            <h1 className="name-doctor">{language === LANGUAGES.VI ? nameVi : nameEn}</h1>
            <p className="description-doctor">
              {isShowDescription === true ?
                <p className="description-doctor">{dataProfile.markdown_data.description}</p>
                :
                <>
                  <this.renderTimeBooking dataSchedule={dataSchedule} />
                </>
              }
              {isShowAddressClinic === true &&
                <>
                  <span><FormattedMessage id="patient.bookingModal.clinic-address" /></span> {`${dataProfile.doctor_info.nameClinic} - ${dataProfile.doctor_info.addressClinic}`}
                </>
              }
            </p>
          </div>
        </div>
        <div className="price">
          <i class="fas fa-flag fa-lg"></i>
          {language === LANGUAGES.VI ?
            <span>
              <FormattedMessage id="patient.bookingModal.price" />&nbsp;
              <NumericFormat value={dataProfile?.doctor_info?.price_data.valueVi} thousandSeparator="," suffix=" VNĐ" displayType="text" />
            </span>
            :
            <span>
              <FormattedMessage id="patient.bookingModal.price" />&nbsp;
              <NumericFormat value={dataProfile?.doctor_info?.price_data.valueEn} thousandSeparator="," suffix=" $" displayType="text" />
            </span>
          }
        </div>
      </div>
    );

  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    profileDoctor: state.admin.profileDoctor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetailDoctor: (doctorId) => dispatch(actions.getDetailDoctor(doctorId)),
    getProfileDoctor: (doctorId) => dispatch(actions.getProfileDoctor(doctorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
