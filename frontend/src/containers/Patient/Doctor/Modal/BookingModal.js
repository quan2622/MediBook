import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import "./BookingModal.scss"
import * as actions from "../../../../store/actions"
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.containerRef = createRef();
    this.state = {
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const { modal, toggleModal, dataSchedule } = this.props;
    const doctorId = dataSchedule && !_.isEmpty(dataSchedule) ? dataSchedule.doctorId : "";
    console.log("Check data schedule: ", dataSchedule);
    return (
      <div className="booking-modal-container">
        <Modal isOpen={modal} toggle={toggleModal} {...this.props} centered={true} size="lg" backdrop="static" scrollable>
          <ModalHeader toggle={toggleModal} className="booking-modal-header">Thông tin đặt lịch khám bệnh</ModalHeader>
          <ModalBody className="booking-modal-body">
            <div className="doctor-info">
              <ProfileDoctor doctorId={doctorId} isShowDescription={false} isShowAddressClinic={true} dataSchedule={dataSchedule} />
            </div>

            <div className="row pt-3">
              <div className="col-6 form-group">
                <label className="form-label">Họ tên</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label className="form-label">Số điện thoại</label>
                <input className="form-control" />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6 form-group">
                <label className="form-label">Email</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label className="form-label">Địa chỉ liên hệ</label>
                <input className="form-control" />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6 form-group">
                <label className="form-label">Đặt cho ai</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label className="form-label">Giới tính</label>
                <input className="form-control" />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-12 form-group">
                <label className="form-label">Lí do</label>
                <textarea className="form-control" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>
              Xác nhận
            </Button>{' '}
            <Button color="secondary" onClick={toggleModal}>
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
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
  return {
    getDetailDoctor: (doctorId) => dispatch(actions.getDetailDoctor(doctorId)),
    getExtraInfoDoctor: (doctorId) => dispatch(actions.getExtraInfoDoctor(doctorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
