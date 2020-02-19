import { GET_LAST_QUESTION_GROUP_ID, CLEAR_LAST_QUESTION_GROUP_ID, GROUP_LOADING } from '../actions/types';

const initialState = {
    results: {},
    loading: false
};

export default function (state = initialState, action){
    switch(action.type){
        case GROUP_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_LAST_QUESTION_GROUP_ID:
            return {
                ...state,
                results: action.payload,
                loading: false
            }
        case CLEAR_LAST_QUESTION_GROUP_ID:
            return {
                ...state,
                results: {}
            }
        default:
            return state;
    }
}