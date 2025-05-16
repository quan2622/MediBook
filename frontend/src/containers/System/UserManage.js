import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
import userService from "../../services/user.service";
import ModalUser from "./Modal/ModalUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModal: false,
            dataUpdateUser: {},
            isUpdate: false,
        }
    }

    async componentDidMount() {
        await this.getAllUserForm()
    }

    getAllUserForm = async () => {
        const res = await userService.getAllUser('all');
        if (res && res.EC === 0) {
            this.setState({ users: res.user });
        }
    }

    handleAddNewUser = () => {
        this.setState({ isOpenModal: true, isUpdate: false });
    }

    toggleUserModal = () => {
        this.setState({ isOpenModal: !this.state.isOpenModal });
    }

    createNewUser = async (data) => {
        try {
            let response = await userService.createNewUser(data);
            if (response.EC === 0) {
                await this.getAllUserForm();
                this.setState({ isOpenModal: false });
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            } else {
                alert(response.EM);
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (userId) => {
        try {
            let response = await userService.deleteUser(userId);
            await this.getAllUserForm();
            alert(response.EM);
        } catch (error) {
            console.log(error);
        }
    }

    handleUpdateUser = async (user) => {
        this.setState({ isOpenModal: true, dataUpdateUser: user, isUpdate: true });
    }


    udpateUserData = async (dataUpdate) => {
        try {
            let response = await userService.updateDataUser(dataUpdate);
            if (response.EC === 0) {
                await this.getAllUserForm();
                this.setState({ isOpenModal: false });
            }
            alert(response.EM);
        } catch (error) {

        }
    }

    render() {
        return (
            <div className="user-container">
                <ModalUser isOpen={this.state.isOpenModal} toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser} dataUpdateUser={this.state.dataUpdateUser} isUpdate={this.state.isUpdate} udpateUserData={this.udpateUserData} />
                <div className="text-center title">
                    Manage users quan test
                </div>
                <div className="mx-4">
                    <button className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i> Add new user
                    </button>
                </div>
                <div className="user-table mt-4 mx-4">
                    <table id="customers">
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
                            {this.state.users && this.state.users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td className="d-flex gap-2">
                                        <button className="btn-edit" onClick={() => this.handleUpdateUser(user)}>
                                            <i className="far fa-edit"></i>
                                        </button>
                                        <button className="btn-delete" onClick={() => this.handleDeleteUser(user.id)}>
                                            <i className="far fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
