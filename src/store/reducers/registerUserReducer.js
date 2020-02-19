import { REGISTER_USER, CLEAR_REGISTER_USER_ACTION } from '../actions/types';

const initialState = {
    results: {}
};

export default function (state = initialState, action){
    switch(action.type){
        case REGISTER_USER:
            return {
                ...state,
                results: action.payload
            }
        case CLEAR_REGISTER_USER_ACTION:
            return {
                ...state,
                results: {}
            }
        default:
            return state;

    }
}