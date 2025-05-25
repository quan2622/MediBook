import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import _ from "lodash";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
import { toast } from "react-toastify";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: [],
            position: [],
            role: [],
            imagePreviewUrl: "",
            isOpen: false,
            action: '',
            new_user: {
                id: "",
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                gender: "",
                position: "",
                role: "",
                avatar: null,
            },
        };
    }

    async componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let genderRedux = this.props.genderRedux;
            this.setState((prevState) => ({
                gender: genderRedux,
                new_user: {
                    ...prevState.new_user,
                    gender:
                        genderRedux && genderRedux.length > 0 ? genderRedux[0].key : "",
                },
            }));
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let positionRedux = this.props.positionRedux;
            this.setState({
                position: positionRedux,
                new_user: {
                    ...prevState.new_user,
                    position:
                        positionRedux && positionRedux.length > 0
                            ? positionRedux[0].key
                            : "",
                },
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let roleRedux = this.props.roleRedux;
            this.setState({
                role: roleRedux,
                new_user: {
                    ...prevState.new_user,
                    role: roleRedux && roleRedux.length > 0 ? roleRedux[0].key : "",
                },
            });
        }
        if (prevProps.userRedux !== this.props.userRedux) {
            let genderRedux = this.props.genderRedux;
            let positionRedux = this.props.positionRedux;
            let roleRedux = this.props.roleRedux;
            this.setState({
                new_user: {
                    id: "",
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    address: "",
                    position: positionRedux && positionRedux.length > 0 ? positionRedux[0].key : "",
                    gender: genderRedux && genderRedux.length > 0 ? genderRedux[0].key : "",
                    role: roleRedux && roleRedux.length > 0 ? roleRedux[0].key : "",
                    avatar: null,
                },
                imagePreviewUrl: "",
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleInputUser = async (event, id) => {
        let clone_state = _.cloneDeep(this.state);
        if (id === "avatar") {
            if (event.target && event.target.files && event.target.files[0]) {
                let base64 = await CommonUtils.getBase64(event.target.files[0]);
                clone_state.imagePreviewUrl = URL.createObjectURL(event.target.files[0]);
                clone_state.new_user[id] = base64;
            }
        } else
            clone_state.new_user[id] = event.target.value;

        this.setState({ ...clone_state });
    };

    handleOpenPreviewImage = () => {
        if (this.state.imagePreviewUrl !== "") this.setState({ isOpen: true });
    };

    handleSaveUser = () => {
        const isValid = this.validateForm();
        const { new_user, action } = this.state;
        if (isValid === false) return;

        if (action === CRUD_ACTIONS.CREATE)
            this.props.saveUserRedux({
                firstName: new_user.firstName,
                lastName: new_user.lastName,
                email: new_user.email,
                password: new_user.password,
                address: new_user.address,
                phoneNumber: new_user.phoneNumber,
                gender: new_user.gender,
                role: new_user.role,
                position: new_user.position,
                avatar: new_user.avatar,
            });
        else
            this.props.editUser({
                id: new_user.id,
                firstName: new_user.firstName,
                lastName: new_user.lastName,
                address: new_user.address,
                phoneNumber: new_user.phoneNumber,
                roleId: new_user.role,
                positionId: new_user.position,
                gender: new_user.gender,
                avatar: new_user.avatar,
            })

        this.props.getAllUser();
    };

    validateForm = () => {
        let isValid = true;
        const { new_user } = this.state;
        let arrCheck = ["email", "password", "firstName", "lastName", "phoneNumber", "address"];
        for (let key of arrCheck) {
            if (!new_user[key]) {
                toast.warn(`Missing required params: ${key}`)
                isValid = false;
                break;
            }
        }
        return isValid;
    };



    handleEditUser = (user) => {
        let imageBase64 = '';
        if (user.image) {
            // imageBase64 = new Buffer(user.image, 'base64').toString('binary');
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }
        this.setState({
            new_user: {
                id: user.id,
                email: user.email,
                password: "HARD_CODE",
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                position: user.positionId,
                gender: user.gender,
                role: user.roleId,
                avatar: '',
            },
            imagePreviewUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
        })
    }

    render() {
        const { gender, position, role, imagePreviewUrl, isOpen, new_user, action } =
            this.state;
        const { language, isLoadingGender } = this.props;
        return (
            <div className="user-redux-container">
                <div className="title">Learn React - Redux</div>
                <div className="user-redux-body mt-4">
                    <div className="container" style={{ padding: "0 180px" }}>
                        <div className="row">
                            <div className="col-12 mb-3 text-center h2">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-12 mb-3">
                                {isLoadingGender === true ? "Is Loading Genders" : ""}
                            </div>
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="manage-user.firstName" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={new_user.firstName}
                                    onChange={(e) => this.handleInputUser(e, "firstName")}
                                />
                            </div>
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="manage-user.lastName" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={new_user.lastName}
                                    onChange={(e) => this.handleInputUser(e, "lastName")}
                                />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={new_user.email}
                                    onChange={(e) => this.handleInputUser(e, "email")}
                                    disabled={action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={new_user.password}
                                    onChange={(e) => this.handleInputUser(e, "password")}
                                    disabled={action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={new_user.address}
                                    onChange={(e) => this.handleInputUser(e, "address")}
                                />
                            </div>
                            <div className="col-4">
                                <label>
                                    <FormattedMessage id="manage-user.phone" />
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={new_user.phoneNumber}
                                    onChange={(e) => this.handleInputUser(e, "phoneNumber")}
                                />
                            </div>
                            <div className="col-2">
                                <label>
                                    <FormattedMessage id="manage-user.gender" />{" "}
                                </label>
                                <select
                                    className="form-select"
                                    onChange={(e) => this.handleInputUser(e, "gender")}
                                    value={new_user.gender}
                                >
                                    {!_.isEmpty(gender) &&
                                        gender.map((item, index) => (
                                            <option key={item.id} value={item.key}>
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-4">
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    className="form-select"
                                    onChange={(e) => this.handleInputUser(e, "position")}
                                    value={new_user.position}
                                >
                                    {position &&
                                        position.length > 0 &&
                                        position.map((item, index) => (
                                            <option key={item.id} value={item.key}>
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    className="form-select"
                                    onChange={(e) => this.handleInputUser(e, "role")}
                                    value={new_user.role}
                                >
                                    {role &&
                                        role.length > 0 &&
                                        role.map((item, index) => (
                                            <option key={item.id} value={item.key} >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-content">
                                    <input
                                        id="imageUpload"
                                        type="file"
                                        className="form-control"
                                        hidden
                                        onChange={(e) => this.handleInputUser(e, "avatar")}
                                    />
                                    <label htmlFor="imageUpload" className="label-upload">
                                        <i className="fas fa-upload"></i>
                                        <span className="upload-text">Tải ảnh</span>
                                    </label>
                                    <div
                                        className="preview-img"
                                        style={{ backgroundImage: `url(${imagePreviewUrl})` }}
                                        onClick={() => this.handleOpenPreviewImage()}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-12">
                                <button
                                    className={`btn  ${this.state.action === CRUD_ACTIONS.EDIT ? 'btn-warning' : 'btn-primary'}`}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="col-12">
                            <TableManageUser handleEditUser={this.handleEditUser} action={this.state.action} />
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={imagePreviewUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        userRedux: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        saveUserRedux: (data) => dispatch(actions.saveUserRedux(data)),
        getAllUser: () => dispatch(actions.getAllUser()),
        editUser: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
