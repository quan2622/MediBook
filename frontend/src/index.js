import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";


import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';
import { GoogleOAuthProvider } from "@react-oauth/google";

const renderApp = () => {
    ReactDOM.render(
        <GoogleOAuthProvider clientId="461504149941-qf4up1agpgbsqnjvfum6skih2078ili6.apps.googleusercontent.com">
            <Provider store={reduxStore}>
                <IntlProviderWrapper>
                    <App persistor={persistor} />
                </IntlProviderWrapper>
            </Provider>
        </GoogleOAuthProvider>
        ,
        document.getElementById('root')
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
