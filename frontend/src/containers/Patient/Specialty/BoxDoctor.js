import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";

class BoxDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const { doctorId } = this.props;
    return (
      <div className="specialty-each-doctor">
        <div className="content-left">
          <ProfileDoctor doctorId={doctorId} isShowDescription={true} isShowAddressClinic={false} isShowLinkDetail={true} isShowPrice={false} isSpecialtyPage={true}
          />
        </div>
        <div className="content-right">
          <DoctorSchedule doctorId={doctorId} />
          <DoctorExtraInfo doctorId={doctorId} />
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BoxDoctor);
