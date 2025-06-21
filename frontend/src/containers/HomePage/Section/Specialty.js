import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Specialty.scss"
import Slider from "react-slick";
import userService from "../../../services/user.service";
import { FormattedMessage } from "react-intl";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSpecialty: []
    }
  }

  async componentDidMount() {
    const res = await userService.getAllSpecialty();
    if (res && res.EC === 0) {
      this.setState({ allSpecialty: res.data })
    }
  }

  render() {
    const { allSpecialty } = this.state;
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"><FormattedMessage id="homePage.specialty-popular" /></span>
            <button className="btn-section"><FormattedMessage id="homePage.more-infomation" /></button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings} className="custom-slick-slider">
              {allSpecialty && allSpecialty.length > 0 &&
                allSpecialty.map((item, index) => (
                  <div className="section-customize" key={item.id}>
                    <div className="customize-content">
                      <div className="bg-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                ))
              }
            </Slider>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
