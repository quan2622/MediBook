import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DetailSpecialty.scss"
import * as actions from "../../../store/actions"
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [34, 33, 32, 31]
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const { arrDoctorId } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="detail-specialty-container">
          <div className="specialty-description">
            HELLO WORLD FROM DETAIL Specialty
          </div >
          <div className="list-doctor-container">
            {arrDoctorId && arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => (
                <div className="specialty-each-doctor" key={index} >
                  <div className="content-left">
                    <ProfileDoctor doctorId={item} isShowDescription={true} isShowAddressClinic={false}
                    // dataSchedule={dataSchedule}
                    />
                  </div>
                  <div className="content-right">
                    <DoctorSchedule doctorId={item} />
                    <DoctorExtraInfo doctorId={item} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </>
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
    // getDetailDoctor: (doctorId) => dispatch(actions.getDetailDoctor(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
