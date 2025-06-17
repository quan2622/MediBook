import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DefaultClass.scss"
import * as actions from "../../../store/actions"
import { FormattedMessage } from "react-intl";

class DefaultClass extends Component {
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
      <div className="doctor-extra-info-container">

      </div >
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
    getDetailDoctor: (doctorId) => dispatch(actions.getDetailDoctor(doctorId)),
    getExtraInfoDoctor: (doctorId) => dispatch(actions.getExtraInfoDoctor(doctorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
