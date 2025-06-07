import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss"
import { FormattedMessage } from "react-intl";
import Select from "react-select"
import * as actions from "../../../store/actions"
import { dateFormat, LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker"
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectedOption: "",
      cunrrentDate: "",
      rangeTime: [],
    }
  }

  componentDidMount() {
    this.props.getAllDoctor();
    this.props.fetchAllScheduleHours();
  }

  componentDidUpdate(prevProps, prevSate) {
    if (prevProps.doctors !== this.props.doctors) {
      const doctorSelect = this.buildDataSelect(this.props.doctors);
      this.setState({ listDoctor: doctorSelect });
    }

    if (prevProps.schedule !== this.props.schedule || prevSate.selectedOption !== this.state.selectedOption) {
      const { schedule } = this.props;
      let rangeTime = [];
      if (schedule && schedule.length > 0)
        rangeTime = schedule.map(item => ({ ...item, isSelected: false }))
      this.setState({ rangeTime });
    }
  }


  buildDataSelect = (data) => {
    let result = [];
    const { language } = this.props;
    if (data && data.length > 0) {
      data.forEach((item) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;

        result.push(object);
      })
    }
    return result;
  }

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
  }

  handleSelectDate = (date) => {
    // console.log('Check date: ', date);
    if (date && date[0] !== "Invalid Date")
      this.setState({ cunrrentDate: date[0] });
  }
  handleClickButtonTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0)
      rangeTime = rangeTime.map(item => item.keyMap === time.keyMap ? { ...item, isSelected: !item.isSelected } : item);
    this.setState({ rangeTime });
  }

  handleSubmit = () => {
    const { rangeTime, selectedOption, cunrrentDate } = this.state;
    let result = [];

    if (!cunrrentDate) {
      toast.error("Invalid date");
      return;
    }
    if (_.isEmpty(selectedOption)) {
      toast.error("Please choose doctor you want to modify");
      return;
    }
    const formattedDate = moment(cunrrentDate).valueOf();
    if (rangeTime && rangeTime.length > 0) {
      const data = rangeTime.filter(item => item.isSelected === true);
      if (data) {
        result = data.map(item => ({
          doctorId: selectedOption.value,
          date: formattedDate,
          timeType: item.keyMap,
        }))
      } else {
        toast.error("Invalid schedule");
        return;
      }
      this.props.saveScheduleDoctor(result);
    }
  }

  render() {
    const { listDoctor, selectedOption, cunrrentDate, rangeTime } = this.state;
    const { language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title"><FormattedMessage id="manage-schedule.title" /></div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label className="form-label"><FormattedMessage id="manage-schedule.choose-doctor" /></label>
              <Select value={selectedOption}
                onChange={this.handleChange} options={listDoctor} />
            </div>
            <div className="col-6 form-group">
              <label className="form-label"><FormattedMessage id="manage-schedule.choose-date" /></label>
              <DatePicker onChange={this.handleSelectDate} className="form-control"
                value={cunrrentDate} minDate={(new Date()).setHours(0, 0, 0, 0)} />
            </div>

            <div className="col-12 pick-hour-container">
              {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => (
                <button className={`btn btn-schedule ${item.isSelected ? 'isSelected' : ''}`} key={`time-${index}`} onClick={() => this.handleClickButtonTime(item)}>
                  {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                </button>
              ))}
            </div>
            <div className="col-12">
              <button className="btn btn-primary" onClick={this.handleSubmit}><FormattedMessage id="manage-schedule.save-schedule" /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    doctors: state.admin.doctorList,
    language: state.app.language,
    schedule: state.admin.schedule
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllDoctor: () => dispatch(actions.getAllDoctor()),
    fetchAllScheduleHours: () => dispatch(actions.fetchAllScheduleHours()),
    saveScheduleDoctor: (data) => dispatch(actions.saveScheduleDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
