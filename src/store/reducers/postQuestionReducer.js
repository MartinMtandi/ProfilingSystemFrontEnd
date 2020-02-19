import { POST_QUESTION, CLEAR_POST_QUESTION_RESULT } from '../actions/types';

const initialState = {
    questionId: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type){
        case POST_QUESTION:
            return {
                ...state,
                questionId: action.payload
            }
        case CLEAR_POST_QUESTION_RESULT:
            return {
                ...state,
                questionId: {}
            }
        default:
            return state;
    }
}