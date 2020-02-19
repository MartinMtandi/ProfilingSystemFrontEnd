import { POST_NEW_QUESTION, CLEAR_POST_NEW_QUESTION_RESULT } from '../actions/types';

const initialState = {
    results: {}
};

export default function (state = initialState, action){
    switch(action.type){
        case POST_NEW_QUESTION:
            return {
                ...state,
                results: action.payload
            }
        case CLEAR_POST_NEW_QUESTION_RESULT:
            return {
                ...state,
                results: {}
            }
        default:
                return state;
    }
}