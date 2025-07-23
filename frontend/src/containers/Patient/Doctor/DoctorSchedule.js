import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DoctorSchedule.scss"
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import Select from 'react-select'
import moment from 'moment';
import 'moment/min/locales';
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
import { toast } from "react-toastify";
import userService from "../../../services/user.service";


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
      isOpenModalBooking: false,
      dataScheduleBooking: {},
      scheduleDoctor: [],
      isToday: false,
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
      const raw = date.locale('vi').format('dddd - DD/MM');
      if (isToday) {
        const index = raw.indexOf('-');
        return `Hôm nay - ${raw.slice(index + 2)}`
      }
      return raw.charAt(0).toUpperCase() + raw.slice(1);
    }
    const raw = date.locale('en').format('ddd - DD/MM');
    return isToday ? `Today - ${raw.split(' - ')[1]}` : raw;
  }

  handleOnchangeSelect = async (select) => {
    const { doctorId } = this.props;
    if (doctorId !== -1) {
      this.setState({ selectedOption: select });

      if (select.value === (new Date()).setHours(0, 0, 0, 0)) {

        this.setState({ isToday: true })
      } else {
        this.setState({ isToday: false });
      }
      const res = await userService.fetchScheduleDoctor(doctorId, select.value);
      if (res && res.EC === 0) {
        this.setState({ scheduleDoctor: res.data })
      } else {
        this.setState({ scheduleDoctor: [] })
        toast.error(res.EM);
      };
    }
  }

  toggleOpenModalBooking = () => {
    this.setState({ isOpenModalBooking: !this.state.isOpenModalBooking })
  }

  handleClickScheduleTime = (data) => {
    this.setState({ dataScheduleBooking: data })
    this.toggleOpenModalBooking();
  }

  parseHourFromAnyFormat = (timeStr) => {
    // Trường hợp có AM/PM
    if (/(AM|PM)$/i.test(timeStr.trim())) {
      const [time, meridiem] = timeStr.trim().split(" ");
      let [hour] = time.split(":").map(Number);

      if (/PM/i.test(meridiem) && hour !== 12) hour += 12;
      if (/AM/i.test(meridiem) && hour === 12) hour = 0;

      return hour;
    }

    // Trường hợp 24h: "13:00", "08:30"
    const [hour] = timeStr.split(":").map(Number);
    return hour;
  }

  isAfterCurrentHour = (timeStr) => {
    const inputHour = this.parseHourFromAnyFormat(timeStr);
    const currentHour = new Date().getHours();
    return inputHour > currentHour;
  }

  render() {
    const { allDays, selectedOption, isOpenModalBooking, dataScheduleBooking, scheduleDoctor } = this.state;
    const { language } = this.props;
    return (
      <>
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
                        const time = language === LANGUAGES.VI ? scheduleData.valueVi : scheduleData.valueEn;
                        const validate = this.isAfterCurrentHour(time);
                        if (this.state.isToday) {
                          return (
                            <>
                              {validate &&
                                <span className="box-time" key={item.id} onClick={() => this.handleClickScheduleTime(item)}>{time}</span>
                              }
                            </>
                          )
                        } else {
                          return (
                            <>
                              <span className="box-time" key={item.id} onClick={() => this.handleClickScheduleTime(item)}>{time}</span>
                            </>
                          )
                        }

                      })
                    }
                  </div>
                  <div className="note-schedule">
                    <span>
                      <FormattedMessage id="patient.detail-doctor.choose" />
                      <i className="far fa-hand-point-up"></i>
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
        <BookingModal modal={isOpenModalBooking} toggleModal={this.toggleOpenModalBooking} dataSchedule={dataScheduleBooking} />
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
