import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import "./DetailClinic.scss"
import HomeHeader from "../../HomePage/HomeHeader";
import { toast } from "react-toastify";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import userService from "../../../services/user.service";

const BoxDoctor = lazy(() => import("../Specialty/BoxDoctor"))

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
      locations: [],
      selectedOption: "",
    }
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.clinicId) {
      const { clinicId } = this.props.match.params;
      const res = await userService.getDetailClinic(clinicId);

      if (res && res.EC === 0) {
        let arr = [];
        if (!_.isEmpty(res.data.doctorInfos)) {
          arr = res.data.doctorInfos.map(item => item.doctorId);
        }
        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arr,
        });
      } else {
        toast.warn(res.EM);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.buildDataSelect(this.state.listProvince);
    }
  }

  handleOnchangeSelect = (select) => {
    this.setState({ selectedOption: select });
    this.handleGetDoctorByProvince(select.value);
  }

  render() {
    console.log("Check state: ", this.state)
    const { arrDoctorId, dataDetailClinic } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="detail-clinic-container">
          {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
            <>
              <div className="clinic-banner" style={{ backgroundImage: `url(${dataDetailClinic.image})` }}>
                <div className="clinic-banner-info">
                  <div className="clinic-banner-info-image">
                    <img src={dataDetailClinic.image} alt={dataDetailClinic.name} />
                  </div>
                  <div className="clinic-banner-info-content">
                    <div className="info-name">{dataDetailClinic.name}</div>
                    <div className="info-address">{dataDetailClinic.address}</div>
                  </div>
                </div>
              </div>
              <div className="detail-clinic-content">
                <div className="clinic-description">
                  <div dangerouslySetInnerHTML={{ __html: dataDetailClinic?.descriptionHTML }}>
                  </div>
                </div >
                <div className="list-doctor-container clinic-page">
                  <Suspense fallback={<div>Đang tải thông tin bác sĩ...</div>}>
                    {arrDoctorId?.map((doctorId, index) => (
                      <BoxDoctor key={index} doctorId={doctorId} />
                    ))}
                  </Suspense>
                </div>
              </div>
            </>
          }
        </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
