import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      isShowPassword: false,
    }
  }

  handleOnChangeInput = (e, type) => {
    if (type === "UN")
      this.setState({
        userName: e.target.value,
      })
    else if (type === "PW")
      this.setState({
        passWord: e.target.value,
      })
  }

  handleLogin = () => {
    console.log(this.state.userName, this.state.passWord)
  }

  render() {

    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">
              Login
            </div>
            <div className="col-12 form-group login-input">
              <span>User name</span>
              <input type="text" className="form-control" placeholder="Enter your username"
                value={this.state.userName} onChange={(e) => this.handleOnChangeInput(e, "UN")} />
            </div>
            <div className="col-12 form-group login-input">
              <span>Password</span>
              <div className="show-hide-password">
                <input type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control" placeholder="Enter your password"
                  value={this.state.passWord} onChange={(e) => this.handleOnChangeInput(e, "PW")} />
                <span onClick={() => this.setState({ isShowPassword: !this.state.isShowPassword })}>
                  <i class={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                </span>
              </div>
            </div>
            <div className="col-12 btn-login-content">
              <button className="btn-login" onClick={this.handleLogin}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lang: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
