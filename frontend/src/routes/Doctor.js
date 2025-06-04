import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageDoctor from "../containers/System/Doctor/ManageDoctor";

class Doctor extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/doctor/manage-schedule" component={ManageDoctor} />
              <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
