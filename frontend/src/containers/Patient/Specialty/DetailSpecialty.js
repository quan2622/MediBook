import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DetailSpecialty.scss"
import * as actions from "../../../store/actions"
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";

class DetailSpecialty extends Component {
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
    return (
      <>
        <HomeHeader />
        <div className="">
          HELLO WORLD FROM DETAIL Specialty
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
