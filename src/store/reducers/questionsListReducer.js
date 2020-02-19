import { GET_QUESTIONS_LIST, LOADING, CLEAR_QUESTIONS_LIST} from '../actions/types';

const initialState = {
    questions: null,
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type){
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_QUESTIONS_LIST:
            return {
                ...state,
                questions: action.payload,
                loading: false
            }
        case CLEAR_QUESTIONS_LIST:
            return {
                ...state,
                questions: null
            }
        default:
            return state;
    }
}