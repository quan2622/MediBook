import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DoctorSchedule.scss"
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import Select from 'react-select'
import moment from 'moment'
import _ from "lodash";
import { FormattedMessage } from "react-intl";


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

    const arrDay = Array.from({ length: 7 }, (_, i) => {
      const date = moment().add(i, 'days');
      return {
        label: this.buildLabel(date, i === 0, language === LANGUAGES.VI),
        value: date.startOf('day').valueOf()
      }
    })

    let indexSelect = 0;
    if (allDays.length > 0 && selectedOption) {
      indexSelect = allDays.findIndex(item => _.isEqual(item, selectedOption));
    }
    this.setState({ allDays: arrDay, selectedOption: arrDay[indexSelect] });
    this.handleOnchangeSelect(arrDay[indexSelect]);
  }

  buildLabel = (date, isToday, isVi) => {
    if (isVi) {
      const raw = date.format('dddd - DD/MM');
      if (isToday) {
        const index = raw.indexOf('-');
        return `Hôm nay - ${raw.slice(index + 2)}`
      }
      return raw.charAt(0).toUpperCase() + raw.slice(1);
    }
    const raw = date.locale('en').format('ddd - DD/MM');
    return isToday ? `Today - ${raw.split(' - ')[1]}` : raw;
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
            <span>
              <i className="far fa-calendar-alt"></i>
              <FormattedMessage id="patient.detail-doctor.schedule" />
            </span>
          </div>
          <div className="time-content">
            {scheduleDoctor && scheduleDoctor.length > 0 ?
              <>
                <div className="box-schedule">
                  {
                    scheduleDoctor.map(item => {
                      const { scheduleData } = item
                      const date = language === LANGUAGES.VI ? scheduleData.valueVi : scheduleData.valueEn;
                      return (
                        <span className="box-time" key={item.id}>{date}</span>
                      )
                    })
                  }
                </div>
                <div className="note-schedule">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />
                    <i class="far fa-hand-point-up"></i>
                    <FormattedMessage id="patient.detail-doctor.book-free" />

                  </span>
                </div>
              </>
              :
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
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
