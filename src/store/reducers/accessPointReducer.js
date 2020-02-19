import { GET_ALL_ACCESS_POINTS, CLEAR_ACCESS_POINT_LIST, LOADING } from '../actions/types';

const initialState  = {
    access_points: null,
    ap_loading: false
}

export default function (state = initialState, action){
    switch(action.type){
        case LOADING: 
            return {
                ...state,
                ap_loading: true
            }
        case GET_ALL_ACCESS_POINTS:
            return {
                ...state,
                access_points: action.payload,
                ap_loading: false
            }
        case CLEAR_ACCESS_POINT_LIST:
            return {
                ...state,
               access_points: null
            }
        default: 
            return state;
    }
}