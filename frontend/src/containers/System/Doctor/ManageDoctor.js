import React, { Component } from 'react';
import { connect } from "react-redux";

class ManageDoctor extends Component {
  render() {
    return (
      <>
        <div>Manage Doctor</div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
