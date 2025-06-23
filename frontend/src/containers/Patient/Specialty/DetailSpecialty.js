import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DetailSpecialty.scss"
import * as actions from "../../../store/actions"
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import userService from "../../../services/user.service";
import { toast } from "react-toastify";
import _ from "lodash";
import Select from 'react-select'
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      locations: [],
      selectedOption: ""
    }
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.specialtyId) {
      const { specialtyId } = this.props.match.params;
      const res = await userService.getDetailSpecialty(specialtyId, "ALL");
      const listProvince = await userService.getAllCodeService("PROVINCE");

      if (res && res.EC === 0 && listProvince.EC === 0) {
        let arr = [];
        if (!_.isEmpty(res.data.doctorInfos)) {
          arr = res.data.doctorInfos.map(item => item.doctorId);
        }
        this.buildDataSelect(listProvince.data);
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arr,
        });
      } else {
        toast.warn(res.EM);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }

  buildDataSelect = (payload) => {
    const { language } = this.props;
    const data = [];
    payload.forEach(item => {
      let objectSelect = {};
      objectSelect.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
      objectSelect.value = item.keyMap;
      data.push(objectSelect);
    })
    if (data && data.length > 0) {
      this.setState({ locations: data })
    }
  }

  handleOnchangeSelect = (select) => {
    this.setState({ selectedOption: select });
  }

  render() {
    console.log("Check state: ", this.state)
    const { arrDoctorId, dataDetailSpecialty, selectedOption, locations } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="detail-specialty-container">
          {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
            <div className="specialty-description" dangerouslySetInnerHTML={{ __html: dataDetailSpecialty?.descriptionHTML }}>
            </div >
          }
          <div className="list-doctor-container">
            <div className="search-sp-doctor">
              {locations && locations.length > 0 &&
                <Select options={locations} value={selectedOption} onChange={this.handleOnchangeSelect} />
              }
            </div>
            {arrDoctorId && arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => (
                <div className="specialty-each-doctor" key={index} >
                  <div className="content-left">
                    <ProfileDoctor doctorId={item} isShowDescription={true} isShowAddressClinic={false}
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
