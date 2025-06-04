import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss"
import { FormattedMessage } from "react-intl";
import Select from "react-select"
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker"

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

    if (prevProps.schedule !== this.props.schedule) {
      this.setState({ rangeTime: this.props.schedule });
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
    console.log('Check date: ', date);
    if (date && date[0] !== "Invalid Date")
      this.setState({ cunrrentDate: date[0] });
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
                <button className="btn btn-schedule" key={`time-${index}`}>
                  {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                </button>
              ))}
            </div>
            <div className="col-12">
              <button className="btn btn-primary"><FormattedMessage id="manage-schedule.save-schedule" /></button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
