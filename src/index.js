import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './index.css';
import App from './App';
import store from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';
import { 
    clearQuestionsList, 
    clearAccessPointsList, 
    clearToggleDisableQuestion, 
    clearPostNewQuestionResult, 
    clearPostQuestionWithTagId, 
    clearLastQuestionGroupId,
    clearQuestionIdState,
    clearApIdState,
    clearResponseAnalysis,
    clearUsers,
    clearUpdatedUser,
    clearSingleUser,
    clearRegisterUserAction,
    clearPostQuestionResults 
} from './store/actions/appActions';
//check for token
if(localStorage.jwtToken){
    //set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //decode token and get user info nd exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    //Check for expired token
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
        //logout user
        store.dispatch(logoutUser());
        //clear current state
        store.dispatch(clearQuestionsList());
        store.dispatch(clearAccessPointsList());
        store.dispatch(clearLastQuestionGroupId());
        store.dispatch(clearPostQuestionWithTagId());
        store.dispatch(clearPostNewQuestionResult());
        store.dispatch(clearToggleDisableQuestion());
        store.dispatch(clearQuestionIdState());
        store.dispatch(clearApIdState());
        store.dispatch(clearResponseAnalysis());
        store.dispatch(clearRegisterUserAction());
        store.dispatch(clearPostQuestionResults());
        store.dispatch(clearUpdatedUser());
        store.dispatch(clearSingleUser());
        store.dispatch(clearUsers());
        //redirect to login (Left blank because redirect is automatic)
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
