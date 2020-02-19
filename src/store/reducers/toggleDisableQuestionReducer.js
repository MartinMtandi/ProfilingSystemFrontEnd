import { TOGGLE_DISABLE_FUNC, CLEAR_TOGGLE_DISABLE_QUESTION } from '../actions/types';

const initialState = {
    disableResult: {}
};

export default function(state= initialState, action){
    switch(action.type){
        case TOGGLE_DISABLE_FUNC:
            return {
                ...state,
                disableResult: action.payload
            }
        case CLEAR_TOGGLE_DISABLE_QUESTION:
            return {
                ...state,
                disableResult: {}
            }
        default:
            return state;
    }
}