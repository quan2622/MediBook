import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from "../../utils";

class Header extends Component {

    handleChangeLanguage = (language) => {
        this.props.changeLangue(language);
    }

    render() {
        const { processLogout, lang } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className="language">
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
