import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorSchedule.scss"
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import Select from 'react-select'
import moment from 'moment'
import localization from 'moment/locale/vi'
import _ from "lodash";

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
    const { selectedOption, allDays } = this.state;
    let arrDay = [];
    for (let i = 0; i < 7; i++) {
      const date = moment(new Date()).add(i, 'days');
      let label = '';

      if (language === LANGUAGES.VI) {
        const raw = date.format('dddd - DD/MM');
        if (i === 0) {
          const index = raw.indexOf('-');
          label = ['Hôm nay', raw.substring(index + 1)].join(' - ');
        } else label = raw[0].toUpperCase() + raw.slice(1);
      } else {
        const raw = date.locale('en').format('ddd - DD/MM');
        if (i === 0) {
          const index = raw.indexOf('-');
          label = ['Today', raw.substring(index + 1)].join(' - ');
        } else label = raw;
      }

      arrDay.push(({
        label: label,
        value: moment(new Date()).add(i, 'days').startOf('day').valueOf(),
      }));
    }

    let indexSelect = 0;
    if (allDays.length > 0 && selectedOption !== null) {
      indexSelect = allDays.findIndex(item => _.isEqual(item, selectedOption));
    }
    this.setState({ allDays: arrDay, selectedOption: arrDay[indexSelect] });
    this.handleOnchangeSelect(arrDay[indexSelect]);
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
    const { scheduleDoctor, language } = this.props;
    console.log("Check data schedule doctor: ", this.props.scheduleDoctor)
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          {allDays && allDays.length > 0 &&
            <Select options={allDays} value={selectedOption}
              styles={select_style}
              isClearable={false} onChange={this.handleOnchangeSelect}
              classNamePrefix="custom"
            />
          }
        </div>
        <div className="all-time-available">
          <div className="text-calender">
            <span><i className="far fa-calendar-alt"></i> Lịch khám  </span>
          </div>
          <div className="time-content">
            {scheduleDoctor && scheduleDoctor.length > 0 ?
              scheduleDoctor.map(item => {
                const { scheduleData } = item
                const date = language === LANGUAGES.VI ? scheduleData.valueVi : scheduleData.valueEn;
                return (
                  <span className="box-time" key={item.id}>{date}</span>
                )
              })
              :
              <div className="">
                Không có lịch hẹn trong ngày, vui lòng chọn thời gian khác!
              </div>
            }
          </div>
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
