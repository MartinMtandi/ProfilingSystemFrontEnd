import { GET_ERRORS, SET_CURRENT_USER, GET_TOKEN_ERROR } from '../actions/types';
import isEmpty from '../../validation/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {},
    errors: null,
    tokenError: null
}

const auth = (state = initialState, action) => {
    switch(action.type){
        case SET_CURRENT_USER: 
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                errors: null,
                tokenError: null,
                user: action.payload
            }
        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }  
        case GET_TOKEN_ERROR: 
            return {
                ...state,
                tokenError: action.payload
            }
        default: 
            return state
    }
}

export default auth;   