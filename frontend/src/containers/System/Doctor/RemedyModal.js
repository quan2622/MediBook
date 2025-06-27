import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./RemedyModal.scss"
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from "lodash";
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageBase64: "",
    }
  }

  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({ email: this.props.dataModal.email });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({ email: this.props.dataModal.email });
    }
  }

  hanleOnChange = (e) => {
    this.setState({ email: e.target.value });
  }


  hanleOnChange = async (event, id) => {
    let clone_state = _.cloneDeep(this.state);
    if (id === "imageBase64") {
      if (event.target && event.target.files && event.target.files[0]) {
        let base64 = await CommonUtils.getBase64(event.target.files[0]);
        clone_state[id] = base64;
      }
    } else
      clone_state[id] = event.target.value;

    this.setState({ ...clone_state });
  };

  handleConfirmBooking = () => {
    const { email, ...res } = this.props.dataModal;
    this.props.sendRemedy({ ...this.state, ...res, language: this.props.language });
  }


  render() {
    const { modal, toggleModal } = this.props;
    return (
      <div className="booking-modal-container">
        <Modal isOpen={modal} toggle={toggleModal} {...this.props} centered={true} size="lg" backdrop="static" scrollable>
          <ModalHeader toggle={toggleModal} className="booking-modal-header">
            Gửi hóa đơn khám bệnh thành công
          </ModalHeader>
          <ModalBody className="remedy-modal py-4">
            <div className="row">
              <div className="col-6 form-group">
                <label className="form-label">Email bệnh nhân</label>
                <input type="email" className="form-control" value={this.state.email} onChange={(e) => this.hanleOnChange(e, 'email')} />
              </div>
              <div className="col-6 form-group">
                <label className="form-label">Chọn file đơn thuốc</label>
                <input type="file" accept="image/*" className="form-control" onChange={(e) => this.hanleOnChange(e, 'imageBase64')} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleConfirmBooking}>
              Send
            </Button>{' '}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
