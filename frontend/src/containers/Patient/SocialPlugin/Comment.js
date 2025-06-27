import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from "../../../utils";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  initFacebookSDK() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    let { language } = this.props;
    let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US'
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v2.5'
      });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/${locale}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  componentDidMount() {
    this.initFacebookSDK();
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const { width, data_href, numPost } = this.props;

    return (
      <>
        <div class="fb-comments" data-width={width || ""} data-numposts={numPost || 5}
          data-href={data_href} >
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
