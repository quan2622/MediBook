import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
import userService from "../../services/user.service";
import ModalUser from "./Modal/ModalUser";

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModal: false,
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
        this.setState({ isOpenModal: true });
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
            } else {
                alert(response.EM);
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className="user-container">
                <ModalUser isOpen={this.state.isOpenModal} toggleUserModal={this.toggleUserModal} createNewUser={this.createNewUser} />
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
                                        <button className="btn-edit"><i className="far fa-edit"></i></button>
                                        <button className="btn-delete"><i className="far fa-trash-alt"></i></button>
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
