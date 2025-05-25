import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableManageUser.scss"
import * as actions from "../../../store/actions"

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: []
    }
  }

  componentDidMount = () => {
    this.props.getAllUser();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { userRedux } = this.props;
    if (prevProps.userRedux !== userRedux)
      this.setState({ dataTable: [...userRedux] })
  }

  handleDelete = (userId) => {
    this.props.deleteUser(userId);
  }

  handleUpdate = (user) => {
    this.props.handleEditUser(user)
  }

  render() {
    const { dataTable } = this.state;
    return (
      <table id="TableManageUser" className="mb-5">
        <thead>
          <tr>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataTable && dataTable.length > 0 && dataTable.map((item, index) => (
            <tr >
              <td>{item.email}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.address}</td>
              <td>
                <button className="btn-edit" onClick={() => this.handleUpdate(item)}>
                  <i className="far fa-edit"></i>
                </button>
                <button className="btn-delete" onClick={() => this.handleDelete(item.id)}>
                  <i className="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

}

const mapStateToProps = state => {
  return {
    userRedux: state.admin.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUser: () => dispatch(actions.getAllUser()),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
