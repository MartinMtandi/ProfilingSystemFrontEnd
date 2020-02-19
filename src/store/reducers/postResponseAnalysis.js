import { 
    GET_RESPONSE_ANALYSIS, 
    GET_QUESTION_ID_STATE, 
    CLEAR_QUESTION_ID_STATE,
    CLEAR_AP_ID_STATE,
    CLEAR_RESPONSE_ANALYSIS
 } from '../actions/types';

const initialState = {
    responseId: [],
    responseData: {}
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_QUESTION_ID_STATE:
            return {
                ...state,
                responseId: action.payload
            } 
        case GET_RESPONSE_ANALYSIS:
            return {
                ...state,
                responseData: action.payload
            }
        case CLEAR_RESPONSE_ANALYSIS:
            return {
                ...state,
                responseData: {}
            }
        case CLEAR_QUESTION_ID_STATE: 
            return {
                ...state,
                responseId: []
            }
        case CLEAR_AP_ID_STATE: 
            return {
                ...state,
                apId: []
            }
        default:
            return state;
    }
}