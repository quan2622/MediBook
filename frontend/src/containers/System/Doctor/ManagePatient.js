import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManagePatient.scss"
import * as actions from "../../../store/actions"
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker"



class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cunrrentDate: new Date(),
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {

  }


  handleSelectDate = (date) => {
    if (date && date[0] !== "Invalid Date")
      this.setState({ cunrrentDate: date[0] });
  }

  render() {
    const { cunrrentDate } = this.state;
    return (
      <div className="manage-patient-container">
        <div className="m-p-title">
          quản lý bệnh nhân khám bệnh
        </div>
        <div className="manage-patient-body row">
          <div className="col-4 form-group">
            <label className="form-label">Chọn ngày khám</label>
            <DatePicker onChange={this.handleSelectDate} className="form-control"
              value={cunrrentDate} />
          </div>
          <div className="col-12 mt-3">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
    // getDetailDoctor: (doctorId) => dispatch(actions.getDetailDoctor(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
