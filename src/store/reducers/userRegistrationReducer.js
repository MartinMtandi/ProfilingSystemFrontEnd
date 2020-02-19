import { GET_USERS, USERS_LOADING, CLEAR_USERS, GET_USER_BY_ID, USER_LOADING, UPDATE_USER_DETAILS, CLEAR_UPDATED_USER, CLEAR_USER } from '../actions/types';

const initialState = {
    users: null,
    user: null,
    user_loading: false,
    single_user_loading: false,
    update_results: null
}

export default function(state = initialState, action){
    switch(action.type){
        case USERS_LOADING: 
            return {
                ...state,
                user_loading: true
            }
        case USER_LOADING:
            return {
                ...state,
                single_user_loading: true
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                user_loading: false
            } 
        case GET_USER_BY_ID: 
            return {
                ...state,
                user: action.payload,
                single_user_loading: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: null
            }
        case CLEAR_USER:
            return {
                ...state,
                user: null
            }
        case UPDATE_USER_DETAILS:
            return {
                ...state,
                update_results: action.payload
            } 
        case CLEAR_UPDATED_USER:
            return {
                ...state,
                update_results: null
            }
        default:
            return state;
    }
}