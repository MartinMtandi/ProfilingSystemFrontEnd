import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

const host = 'http://p.poshto.co.zw:5000';

export const loginUser = userData => dispatch => {
    axios.post(`${host}/api/users/login`, userData)
        .then(res => {
            if(res.data.error){
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data.error
                })
            }else{
                const { token } = res.data; 
                localStorage.setItem('jwtToken', token);
                //SET TOKEN TO AUTH HEADER
                setAuthToken(token);
                //DECODE TOKEN TO GET USER DATA
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded))
            }
            
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const logoutUser = () => dispatch => {
    //remove token from localStorage
    localStorage.removeItem('jwtToken');
    //remove auth header for future requests
    setAuthToken(false);
    //set the current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}
