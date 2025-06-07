import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorSchedule.scss"
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import Select from 'react-select'
import moment from 'moment'
import localization from 'moment/locale/vi'

const select_style = {
  container: (provided) => ({
    ...provided,
    width: 200,
  }),
  control: (provided) => ({
    ...provided,
    width: 200,
  }),
}

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      selectedOption: null,
    }
  }

  componentDidMount() {
    this.buildSelectOptions();
  }

  componentDidUpdate(prevProps, prevState) {
    const { language } = this.props;
    if (prevProps.language !== language) {
      this.buildSelectOptions();
    }
  }

  buildSelectOptions = () => {
    const { language } = this.props;
    let arrDay = [];
    for (let i = 0; i < 7; i++) {
      arrDay.push(({
        label:
          language === LANGUAGES.VI ?
            moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            :
            moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM'),
        value: moment(new Date()).add(i, 'days').startOf('day').valueOf(),
      }));
    }
    this.setState({ allDays: arrDay, selectedOption: arrDay[0] });
    this.handleOnchangeSelect(arrDay[0]);
  }

  handleOnchangeSelect = (select) => {
    const { doctorId } = this.props;
    if (doctorId !== -1) {
      this.setState({ selectedOption: select });
      this.props.fetchScheduleDoctor(doctorId, select.value);
    }
  }

  render() {
    const { allDays, selectedOption } = this.state;
    console.log("Check data schedule doctor: ", this.props.scheduleDoctor)
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          {allDays && allDays.length > 0 &&
            <Select options={allDays} value={selectedOption}
              styles={select_style}
              isClearable={false} onChange={this.handleOnchangeSelect}
            />
          }
        </div>
        <div className="all-time-available">

        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    scheduleDoctor: state.admin.scheduleDoctor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchScheduleDoctor: (doctorId, day) => dispatch(actions.fetchScheduleDoctor(doctorId, day)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
