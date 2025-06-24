import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./MedicalFacility.scss"
import Slider from "react-slick";
import userService from "../../../services/user.service";
import { withRouter } from "react-router-dom/cjs/react-router-dom";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    }
  }

  async componentDidMount() {
    const res = await userService.getAllClinic();
    if (res && res.EC === 0) {
      this.setState({ dataClinics: res.data });
    }

  }

  handleNavToDetail = (clinicId) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinicId}`);
    }
  }

  render() {
    const { dataClinics } = this.state;
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings} className="custom-slick-slider">
              {dataClinics && dataClinics.length > 0 &&
                dataClinics.map(item => (
                  <div className="section-customize" key={item.id} onClick={() => this.handleNavToDetail(item.id)}>
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
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
