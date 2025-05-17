import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {

  render() {
    return (
      <div className="home-footer">
        <p>&copy; 2025 Quan_Nguyen_Hong. More Infomation, please visit my <b>Github</b>.<a href="https://github.com/" target="blank"> &#11162; Click here &#11160;</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
