import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import "./BookingModal.scss"
import * as actions from "../../../../store/actions"
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker"
import moment from "moment";
import { LANGUAGES } from "../../../../utils";
import Select from 'react-select'
import userService from "../../../../services/user.service"
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.containerRef = createRef();
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      birthDay: "",
      gender: "",
      doctorId: "",
      reason: "",
      genderSelect: [],
      timeType: "",
      isShowLoading: false,
    }
  }

  componentDidMount() {
    if (this.state.birthDay === "") {
      this.setState({ birthDay: moment(new Date()).valueOf() });
    }
    this.props.fetchGenderStart();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language || prevProps.genders !== this.props.genders) {
      this.setState({ genderSelect: this.buildDataSelect(this.props.genders) });
    }
    if (prevProps.dataSchedule !== this.props.dataSchedule) {
      if (this.props.dataSchedule && !_.isEmpty(this.props.dataSchedule)) {
        this.setState({
          doctorId: this.props.dataSchedule.doctorId,
          timeType: this.props.dataSchedule.timeType,
        })
      }
    }
  }

  buildDataSelect = (data) => {
    let result = [];
    const { language } = this.props;
    if (data && data.length > 0) {
      data.forEach((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;

        result.push(object);
      })
    }
    return result;
  }

  // SELECT BIRTHDAY
  handleSelectDate = (date) => {
    if (date && date[0] !== "Invalid Date")
      this.setState({ birthDay: moment(new Date(date[0])).valueOf() });
  }
  // SELECT GENDER
  handleOnchangeSelect = (selected) => {
    this.setState({ gender: selected });
  }
  // NORMAL INPUT
  hanldeInput = (event, type) => {
    this.setState({ [type]: event.target.value });
  }
  // BUILD APPOINMENT TIME
  buildAppoimentTime = () => {
    const { language, dataSchedule } = this.props;
    if (dataSchedule && !_.isEmpty(dataSchedule)) {
      const { scheduleData } = dataSchedule;
      const time = language === LANGUAGES.VI ? scheduleData.valueVi : scheduleData.valueEn
      let date = language === LANGUAGES.VI ?
        moment.unix(+dataSchedule.date / 1000).locale('vi').format("dddd - DD/MM/YYYY")
        :
        moment.unix(+dataSchedule.date / 1000).locale('en').format("ddd - MM/DD/YYYY")

      date = date.charAt(0).toUpperCase() + date.slice(1);
      return `${time}, ${date}`;

    } else {
      return "";
    }
  }

  handleConfirmBooking = async () => {
    this.setState({ isShowLoading: true });
    const { language, dataSchedule } = this.props;

    const validateArr = ["fullName", "phoneNumber", "email", "address", "birthDay", "gender", "doctorId", "reason", "timeType"];

    const hadError = validateArr.some(item => {
      if (this.state[item] === "") {
        toast.error(`Missing ${item} !`);
        return true;
      } return false;
    })

    if (hadError) return;

    // BUILD DOCTOR NAME
    const { profile_doctor } = dataSchedule;
    let nameVi = `${profile_doctor.lastName} ${profile_doctor.firstName}`;
    let nameEn = `${profile_doctor.firstName} ${profile_doctor.lastName}`;
    const doctorName = language === LANGUAGES.VI ? nameVi : nameEn;
    // CLINIC ADDRESS    
    const addressClinic = `${profile_doctor.doctor_info.nameClinic} - ${profile_doctor.doctor_info.addressClinic}`

    let res = await userService.postBookingAppoinment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      birthDay: this.state.birthDay,
      date: dataSchedule.date,
      gender: this.state.gender.value,
      doctorId: this.state.doctorId,
      reason: this.state.reason,
      timeType: this.state.timeType,
      appoinmentTime: this.buildAppoimentTime(),
      language: language,
      addressClinic: addressClinic,
      doctorName: doctorName
    });

    this.setState({ isShowLoading: false });

    if (res && res.EC === 0) {
      toast.success(res.EM);
      this.props.toggleModal();
    } else {
      toast.success(res.EM);
    }
  }

  render() {
    const { modal, toggleModal, dataSchedule } = this.props;
    const doctorId = dataSchedule && !_.isEmpty(dataSchedule) ? dataSchedule.doctorId : "";
    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner
        text='Loading your content...'
      >
        <div className="booking-modal-container">
          <Modal isOpen={modal} toggle={toggleModal} {...this.props} centered={true} size="lg" backdrop="static" scrollable>
            <ModalHeader toggle={toggleModal} className="booking-modal-header">
              <FormattedMessage id="patient.bookingModal.title" />
            </ModalHeader>
            <ModalBody className="booking-modal-body">
              <div className="doctor-info">
                <ProfileDoctor doctorId={doctorId} isShowDescription={false} isShowAddressClinic={true} dataSchedule={dataSchedule} isShowLinkDetail={false} isShowPrice={true} />
              </div>

              <div className="row pt-3">
                <div className="col-6 form-group">
                  <label className="form-label"><FormattedMessage id="patient.bookingModal.fullName" /></label>
                  <input className="form-control" value={this.state.fullName} onChange={(e) => this.hanldeInput(e, 'fullName')} />
                </div>
                <div className="col-6 form-group">
                  <label className="form-label"><FormattedMessage id="patient.bookingModal.phoneNumber" /></label>
                  <input className="form-control" value={this.state.phoneNumber} onChange={(e) => this.hanldeInput(e, 'phoneNumber')} />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6 form-group">
                  <label className="form-label"><FormattedMessage id="patient.bookingModal.email" /></label>
                  <input className="form-control" value={this.state.email} onChange={(e) => this.hanldeInput(e, 'email')} />
                </div>
                <div className="col-6 form-group">
                  <label className="form-label"><FormattedMessage id="patient.bookingModal.address" /></label>
                  <input className="form-control" value={this.state.address} onChange={(e) => this.hanldeInput(e, 'address')} />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6 form-group">
                  <label className="form-label"><FormattedMessage id="patient.bookingModal.birth" /></label>
                  <DatePicker className="form-control"
                    value={this.state.birthDay} onChange={this.handleSelectDate}
                    options={{
                      maxDate: new Date(),
                      dateFormat: "d/m/Y"
                    }}
                  />
                </div>
                <div className="col-6 form-group">
                  <label className="form-label"><FormattedMessage id="patient.bookingModal.gender" /></label>
                  {this.state.genderSelect && this.state.genderSelect.length > 0 &&
                    <Select options={this.state.genderSelect} value={this.state.gender}
                      onChange={this.handleOnchangeSelect}
                    />
                  }
                </div>
              </div>
              <div className="row py-3">
                <div className="col-12 form-group">
                  <label className="form-label"><FormattedMessage id="patient.bookingModal.reason" /></label>
                  <textarea className="form-control" value={this.state.reason} onChange={(e) => this.hanldeInput(e, 'reason')} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleConfirmBooking}>
                <FormattedMessage id="patient.bookingModal.confirm" />
              </Button>{' '}
              <Button color="secondary" onClick={toggleModal}>
                <FormattedMessage id="patient.bookingModal.cancel" />
              </Button>
            </ModalFooter>
          </Modal>
        </div >
      </LoadingOverlay>
    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
