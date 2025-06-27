import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss"
import * as actions from "../../../store/actions"
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import LikeAndShare from "../SocialPlugin/LikeAndShare"
import Comment from "../SocialPlugin/Comment";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailDoctor: {},
      currentDoctorId: -1,
    }
  }

  componentDidMount() {
    const { match, getDetailDoctor } = this.props;
    if (match && match.params && match.params.doctorId) {
      this.setState({ currentDoctorId: match.params.doctorId })
      getDetailDoctor(match.params.doctorId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      this.setState({ dataDetailDoctor: this.props.detailDoctor })
    }
  }

  render() {
    const { dataDetailDoctor } = this.state;
    const { language } = this.props
    if (!dataDetailDoctor || !dataDetailDoctor.markdown_data)
      return <div style={{ padding: '20px', fontSize: "18px", color: "grey" }}>
        Loading...
      </div>;

    let nameVi = `${dataDetailDoctor.positionData.valueVi}, ${dataDetailDoctor.lastName} ${dataDetailDoctor.firstName}`;
    let nameEn = `${dataDetailDoctor.positionData.valueEn}, ${dataDetailDoctor.firstName} ${dataDetailDoctor.lastName}`;

    const data_href = process.env.REACT_APP_IS_LOCALHOST === "true" ? "https://www.facebook.com/login.php/" : window.location.href;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="content-left" style={{ backgroundImage: `url(${dataDetailDoctor.image})` }} ></div>
            <div className="content-right">
              <h1 className="name-doctor">{language === LANGUAGES.VI ? nameVi : nameEn}</h1>
              <p className="description-doctor">
                <span> {dataDetailDoctor.markdown_data.description}</span>
                <div className="like-share-plugin">
                  <LikeAndShare data_href={data_href} />
                </div>
              </p>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorId={this.state.currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfo doctorId={this.state.currentDoctorId} />
            </div>
          </div>
          <div className="detail-info-doctor" dangerouslySetInnerHTML={{ __html: dataDetailDoctor.markdown_data.contentHTML }}>
          </div>
          <div className="comment-doctor">
            <Comment data_href={data_href} width={"100%"} />
          </div>
        </div >
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    detailDoctor: state.admin.detailDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetailDoctor: (doctorId) => dispatch(actions.getDetailDoctor(doctorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
