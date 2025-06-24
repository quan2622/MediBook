import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ContentToggle.scss"
import * as actions from "../../../store/actions"
import { FormattedMessage } from "react-intl";

class ContentToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapse: true,
      showToggleButton: false
    }
    this.contentRef = React.createRef();
  }

  componentDidMount() {
    this.checkContentOverFlow();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.children !== prevProps.children ||
      this.props.initialMinHeight !== prevProps.initialMinHeight
    ) {
      this.checkContentOverFlow();
    }
  }

  checkContentOverFlow = () => {
    const { initHeight = 300 } = this.props;
    if (this.contentRef.current && this.contentRef.current.scrollHeight > +initHeight)
      this.setState({ showToggleButton: true });
    else this.setState({ showToggleButton: false });
  }

  toggleContent = () => {
    this.setState({ isCollapse: !this.state.isCollapse });
  }

  render() {
    const { initHeight, children, bgImgae } = this.props;
    const { showToggleButton, isCollapse } = this.state;
    const realHeight = this.contentRef?.current?.scrollHeight ? this.contentRef.current.scrollHeight : "auto";
    const currentMinHeight = isCollapse ? initHeight : realHeight;
    return (
      <>
        <div
          ref={this.contentRef}
          className={`${isCollapse ? 'collapsed-content' : 'expanded-content'}`}
          style={{ height: currentMinHeight }}
        >
          <div className="collapse-container">
            <img src={bgImgae} alt="" className="bg-image" />
            <div className="content-text">
              {children}
            </div>
          </div>
        </div>
        {showToggleButton && (
          <button onClick={this.toggleContent} className="btn-collapse">
            {isCollapse ? <FormattedMessage id="patient.content-collapse.show-detail" /> : <FormattedMessage id="patient.content-collapse.hidden-detail" />}
          </button>)
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentToggle);
