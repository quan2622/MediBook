import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import userService from "../../services/user.service";

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      isShowPassword: false,
      EM: '',
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

  handleEnter = (e) => {
    if (e.key === "Enter" || e.keyCode === 13)
      this.handleLogin();
  }

  handleLogin = async () => {
    this.setState({ EM: '' });
    try {
      let response = await userService.handleLogin(this.state.userName, this.state.passWord);
      if (response) {
        if (response.EC !== 0)
          this.setState({ EM: response.EM });
        else {
          this.props.userLoginSuccess(response.user);
        }
      }
    } catch (error) {
      if (error.response && error.response.data)
        this.setState({ EM: error.response.data.message });
    }
  }

  render() {

    return (
      <div className="login-background">
        <div className="login-container login-container-admin">
          <div className="login-content row">
            <div className="col-12 text-login">
              Đăng nhập
            </div>
            <div className="col-12 form-group login-input">
              <span className="label-formLogin">Tên đăng nhập</span>
              <input type="text" className="form-control" placeholder="Tên đăng nhập"
                value={this.state.userName} onChange={(e) => this.handleOnChangeInput(e, "UN")} />
            </div>
            <div className="col-12 form-group login-input">
              <span className="label-formLogin">Mật khẩu</span>
              <div className="show-hide-password">
                <input type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control" placeholder="Mật khẩu"
                  value={this.state.passWord} onChange={(e) => this.handleOnChangeInput(e, "PW")}
                  onKeyDown={this.handleEnter} />
                <span onClick={() => this.setState({ isShowPassword: !this.state.isShowPassword })}>
                  <i className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                </span>
              </div>
            </div>
            <div className="col-12 label-formLogin" style={{ 'color': 'red' }}>
              {this.state.EM}
            </div>
            <div className="col-12 btn-login-content">
              <button className="btn-login" onClick={this.handleLogin}>
                Đăng nhập
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Quên mật khẩu</span>
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
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
