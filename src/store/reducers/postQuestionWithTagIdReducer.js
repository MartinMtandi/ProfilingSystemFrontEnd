import { POST_QUESTION_WITH_TAG_ID, CLEAR_POST_QUESTION_WITH_TAG_ID, GET_ERRORS } from '../actions/types';

const initialState = {
    results: {},
    error: null
}

export default function (state = initialState, action){
    switch(action.type){
        case POST_QUESTION_WITH_TAG_ID:
            return {
                ...state,
                results: action.payload
            }
        case GET_ERRORS:
            return {
                error: {}
            }
        case CLEAR_POST_QUESTION_WITH_TAG_ID: 
            return {
                ...state,
                results: {}
            }
        default:
            return state;
    }
}