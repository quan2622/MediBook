import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import "./DetailSpecialty.scss"
import HomeHeader from "../../HomePage/HomeHeader";
import userService from "../../../services/user.service";
import { toast } from "react-toastify";
import _ from "lodash";
import Select from 'react-select'
import { LANGUAGES } from "../../../utils";
import ContentToggle from "./ContentToggle";

const BoxDoctor = lazy(() => import("./BoxDoctor"))

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      locations: [],
      selectedOption: "",
      listProvince: []
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
          listProvince: listProvince.data
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

  buildDataSelect = (payload) => {
    const { language } = this.props;
    const data = [];
    data.push({ label: language === LANGUAGES.VI ? "Tất cả" : "All", value: "ALL" });
    payload.forEach(item => {
      let objectSelect = {};
      objectSelect.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
      objectSelect.value = item.keyMap;
      data.push(objectSelect);
    })
    if (data && data.length > 0) {
      this.setState({
        locations: data,
        selectedOption: data[0],
      });
      this.handleGetDoctorByProvince(data[0].value);
    }
  }

  handleGetDoctorByProvince = async (type) => {
    const { specialtyId } = this.props.match.params;

    const res = await userService.getDetailSpecialty(specialtyId, type);

    if (res && res.EC === 0) {
      let arr = [];
      if (!_.isEmpty(res.data.doctorInfos)) {
        arr = res.data.doctorInfos.map(item => item.doctorId);
      }
      this.setState({
        arrDoctorId: arr,
      });
    } else {
      toast.warn(res.EM);
    }
  }

  handleOnchangeSelect = (select) => {
    this.setState({ selectedOption: select });
    this.handleGetDoctorByProvince(select.value);
  }

  render() {
    console.log("Check state: ", this.state)
    const { arrDoctorId, dataDetailSpecialty, selectedOption, locations } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="detail-specialty-container">
          {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
            <div className="specialty-description">
              <ContentToggle initHeight={300} bgImgae={dataDetailSpecialty?.image}>
                <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty?.descriptionHTML }}>
                </div>
              </ContentToggle>
            </div >
          }
          <div className="list-doctor-container">
            <div className="search-sp-doctor">
              {locations && locations.length > 0 &&
                <Select options={locations} value={selectedOption} onChange={this.handleOnchangeSelect} />
              }
            </div>
            <Suspense fallback={<div>Đang tải thông tin bác sĩ...</div>}>
              {arrDoctorId?.map((doctorId, index) => (
                <BoxDoctor key={index} doctorId={doctorId} />
              ))}
            </Suspense>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
