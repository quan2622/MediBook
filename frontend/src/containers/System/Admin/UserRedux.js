import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import * as actions from "../../../store/actions"
import "./UserRedux.scss"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: [],
            position: [],
            role: [],
            imagePreviewUrl: "",
            isOpen: false,
        }
    }

    async componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({ gender: this.props.genderRedux });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({ position: this.props.positionRedux });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({ role: this.props.roleRedux });
        }
    }

    handleOnChangeImage = (event) => {
        console.log("check file: ", event.target.files);
        if (event.target && event.target.files && event.target.files[0]) {
            this.setState({ imagePreviewUrl: URL.createObjectURL(event.target.files[0]) });
        }
    }

    handleOpenPreviewImage = () => {
        if (this.state.imagePreviewUrl !== "")
            this.setState({ isOpen: true });
    }

    render() {
        const { gender, position, role, imagePreviewUrl, isOpen } = this.state;
        const { language, isLoadingGender } = this.props;

        return (
            <div className="user-redux-container">
                <div className="title" >Learn React - Redux</div>
                <div className="user-redux-body mt-4">
                    <div className="container" style={{ "padding": "0 180px" }}>
                        <div className="row">
                            <div className="col-12 mb-3 text-center h2"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-12 mb-3">{isLoadingGender === true ? "Is Loading Genders" : ""}</div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.firstName" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.lastName" /></label>
                                <input className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className="form-control" type="email" />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="password" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.phone" /></label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-2">
                                <label><FormattedMessage id="manage-user.gender" /> </label>
                                <select class="form-select">
                                    {!_.isEmpty(gender) && gender.map((item, index) => (
                                        <option key={item.id} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select class="form-select">
                                    {position && position.length > 0 && position.map((item, index) => (
                                        <option key={item.id} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select class="form-select">
                                    {role && role.length > 0 && role.map((item, index) => (
                                        <option key={item.id} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-content">
                                    <input id="imageUpload" type="file" className="form-control" hidden onChange={(e) => this.handleOnChangeImage(e)} />
                                    <label htmlFor="imageUpload" className="label-upload">
                                        <i class="fas fa-upload"></i>
                                        <span className="upload-text">Tải ảnh</span>
                                    </label>
                                    <div className="preview-img" style={{ backgroundImage: `url(${imagePreviewUrl})` }}
                                        onClick={() => this.handleOpenPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <button className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={imagePreviewUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
