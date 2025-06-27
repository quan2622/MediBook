import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManagePatient.scss"
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker"
import userService from "../../../services/user.service";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cunrrentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatients: [],
      modal: false,
      dataModal: {},
      isShowLoading: false,
    }
  }

  componentDidMount() {

    this.handleGetListPatient();

  }

  componentDidUpdate(prevProps, prevState) {

  }

  handleGetListPatient = async () => {
    const { userInfo } = this.props;
    const { cunrrentDate } = this.state;
    if (userInfo.id && cunrrentDate) {
      const res = await userService.getListPatientForDoctor(userInfo.id, cunrrentDate);
      if (res && res.EC === 0) {
        this.setState({ dataPatients: res.data });
      }
    }
  }

  handleSelectDate = (date) => {
    if (date && date[0] !== "Invalid Date")
      this.setState(
        { cunrrentDate: moment(date[0]).startOf('day').valueOf() },
        () => {
          this.handleGetListPatient();
        });
  }

  hanleConfirm = (item) => {
    const data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.user_data.email,
      timeType: item.timeType,
      patientName: `${item.user_data.lastName} ${item.user_data.firstName}`,
    }
    this.setState({ modal: true, dataModal: data })
  }

  handleToggleModal = () => {
    this.setState({ modal: !this.state.modal });
  }

  sendRemedy = async (dateChild) => {
    this.setState({ isShowLoading: true });
    const res = await userService.sendRemedy(dateChild);
    if (res && res.EC === 0) {
      this.setState({ isShowLoading: false });
      toast.success(res.EM);
      this.handleToggleModal();
      this.setState({ dataModal: {} });
      this.handleGetListPatient();
    } else {
      this.setState({ isShowLoading: false });
      toast.error(res.EM);
    }
  }

  render() {
    const { cunrrentDate, dataPatients, modal, dataModal, isShowLoading } = this.state;
    const { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={isShowLoading}
          spinner
          text='Loading...'
        >
          <div className="manage-patient-container">
            <div className="m-p-title">
              quản lý bệnh nhân khám bệnh
            </div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label className="form-label">Chọn ngày khám</label>
                <DatePicker onChange={this.handleSelectDate} className="form-control"
                  value={cunrrentDate} />
              </div>
              <div className="col-12 mt-3">
                <table className="table table-hover table-patient-booking">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Thời gian</th>
                      <th scope="col">Họ và tên</th>
                      <th scope="col">Địa chỉ</th>
                      <th scope="col">Giới tính</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPatients && dataPatients.length > 0 ?
                      dataPatients.map((item, index) => {
                        const isVi = language === LANGUAGES.VI;
                        const gender = isVi ? item?.user_data?.genderData?.valueVi : item?.user_data?.genderData?.valueEn;
                        const timeData = isVi ? item?.time_data?.valueVi : item?.time_data?.valueEn;
                        const name = isVi ? `${item?.user_data?.lastName} ${item?.user_data?.firstName}` : `${item?.user_data?.firstName} ${item?.user_data?.lastName}`;
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{timeData}</td>
                            <td>{name}</td>
                            <td>{item?.user_data?.address}</td>
                            <td>{gender}</td>
                            <td>
                              <button className="mp-btn-confirm" onClick={() => this.hanleConfirm(item)}>Xác nhận</button>
                            </td>
                          </tr>
                        )
                      })
                      :
                      <tr>
                        <td colSpan={6} className="text-center">
                          No data for this date
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div >
          <RemedyModal modal={modal} toggleModal={this.handleToggleModal} dataModal={dataModal} sendRemedy={this.sendRemedy} />
        </LoadingOverlay>
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getDetailDoctor: (doctorId) => dispatch(actions.getDetailDoctor(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
