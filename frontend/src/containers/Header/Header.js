import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            menuApp: [],
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLangue(language);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            } else if (role === userInfo.roleId) {
                menu = doctorMenu;
            }
            this.setState({
                menuApp: menu,
            })
        }
    }

    render() {
        const { processLogout, lang, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="language">
                    <span className="welcome">
                        <FormattedMessage id="home-header.welcome" /> {userInfo && userInfo.firstName ? userInfo.firstName : 'user'}
                    </span>
                    <span className={`language-vi ${lang === LANGUAGES.VI ? 'active' : ''}`}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                        VN
                    </span>
                    <span className={`language-en ${lang === LANGUAGES.EN ? 'active' : ''}`}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLangue: (languageType) => dispatch(actions.changeLangue(languageType)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
