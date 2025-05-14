import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import "./ModalUser.scss"
class ModalUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    }
  }

  componentDidMount() {
  }


  toggle = () => {
    this.props.toggleUserModal();
  }

  handleInput = (e, id) => {
    let clone_state = { ...this.state };
    clone_state[id] = e.target.value
    this.setState({ ...clone_state });
  }

  checkValidateInput = () => {
    let isValidate = true;
    let dataInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    for (let i = 0; i < dataInput.length; i++) {
      if (!this.state[dataInput[i]]) {
        isValidate = false;
        alert("Missing parameter: " + dataInput[i]);
        break;
      }
    }
    return isValidate;
  }

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  }


  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()}
        className={"modal-user-container"} size="lg" >
        <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input type="text" value={this.state.email} onChange={(e) => this.handleInput(e, 'email')} />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input type="password" value={this.state.password} onChange={(e) => this.handleInput(e, 'password')} />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input type="text" value={this.state.firstName} onChange={(e) => this.handleInput(e, 'firstName')} />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input type="text" value={this.state.lastName} onChange={(e) => this.handleInput(e, 'lastName')} />
            </div>
            <div className="input-container max-w">
              <label>Address</label>
              <input type="text" value={this.state.address} onChange={(e) => this.handleInput(e, 'address')} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleAddNewUser()} className="px-3">
            Save
          </Button>
          <Button color="secondary" onClick={() => this.toggle()} className="px-3">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
