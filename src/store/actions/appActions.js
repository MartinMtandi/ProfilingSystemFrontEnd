import axios from 'axios';
import {
    GET_QUESTIONS_LIST, GROUP_LOADING, GET_TOKEN_ERROR, REGISTER_USER, GET_LAST_QUESTION_GROUP_ID, CLEAR_UPDATED_USER,
    POST_QUESTION, GET_USERS, TOGGLE_DISABLE_FUNC, POST_NEW_QUESTION, GET_AP_ID_STATE, CLEAR_USER,
    GET_RESPONSE_ANALYSIS, GET_ERRORS, GET_QUESTION_ID_STATE , LOADING, CLEAR_QUESTIONS_LIST,
    GET_ALL_ACCESS_POINTS, CLEAR_ACCESS_POINT_LIST, USERS_LOADING, POST_QUESTION_WITH_TAG_ID, 
    CLEAR_POST_QUESTION_RESULT,CLEAR_POST_NEW_QUESTION_RESULT, CLEAR_AP_ID_STATE, CLEAR_RESPONSE_ANALYSIS,
    CLEAR_TOGGLE_DISABLE_QUESTION, CLEAR_LAST_QUESTION_GROUP_ID, CLEAR_USERS, CLEAR_REGISTER_USER_ACTION,
    CLEAR_POST_QUESTION_WITH_TAG_ID, CLEAR_QUESTION_ID_STATE, GET_USER_BY_ID, USER_LOADING, UPDATE_USER_DETAILS
} from './types';


const host = 'https://p.poshto.co.zw:5000';

//Questions Sections
export const getQuestionsList = () => dispatch => {
    dispatch(setQuestionsLoading());
    axios.get(`${host}/api/questions`)
        .then(res => {
                if(res.data.tokenError){
                    dispatch({
                        type: GET_TOKEN_ERROR,
                        payload: res.data.tokenError
                    })
                }else{
                    dispatch({
                        type: GET_QUESTIONS_LIST,
                        payload: res.data
                    })
                }
            }
        ).catch(err => 
            dispatch({
                type: GET_QUESTIONS_LIST,
                payload: {}
            })
        );
}

export const clearQuestionsList = () => {
    return {
        type: CLEAR_QUESTIONS_LIST
    }
}

export const postQuestion = postData => dispatch => {
    axios.post(`${host}/api/graph/question`, postData)
    .then(res => {
        if(res.data.tokenError){
            dispatch({
                type: GET_TOKEN_ERROR,
                payload: res.data.tokenError
            })
        }else{
            dispatch({
                type: POST_QUESTION,
                payload: res.data
            })
        }
    }
    )
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.error
        })
    )
}

export const clearPostQuestionResults = () => {
    return {
        type: CLEAR_POST_QUESTION_RESULT
    }
}

export const getLastQuestionGroupId = () => dispatch => {
    dispatch(setQuestionGroupLoading());
    axios.get(`${host}/api/getLastQuestionGroupId`)
        .then(res => {
            if(res.data.tokenError){
                dispatch({
                    type: GET_TOKEN_ERROR,
                    payload: res.data.tokenError
                })
            }else{
                dispatch({
                    type: GET_LAST_QUESTION_GROUP_ID,
                    payload: res.data
                })
            }
        }
        ).catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.error
            })
        )
}

export const clearLastQuestionGroupId = () => {
    return {
        type: CLEAR_LAST_QUESTION_GROUP_ID
    }
}

export const postQuestionWithTagId = postData => dispatch => {
    axios.post(`${host}/api/questions/via-group`, postData)
        .then(res => {
            if(res.data.tokenError){
                dispatch({
                    type: GET_TOKEN_ERROR,
                    payload: res.data.tokenError
                })
            }else{
                dispatchEvent({
                    type: POST_QUESTION_WITH_TAG_ID,
                    payload: res.data
                })
            }
        }).catch(
            err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        )
}

export const clearPostQuestionWithTagId = () => {
    return {
        type: CLEAR_POST_QUESTION_WITH_TAG_ID
    }
}

export const setQuestionGroupLoading = () => {
    return {
        type: GROUP_LOADING
    }
}

export const postNewQuestion = postData => dispatch => {
    axios.post(`${host}/api/questions`, postData)
    .then(res => {
        if(res.data.tokenError){
            dispatch({
                type: GET_TOKEN_ERROR,
                payload: res.data.tokenError
            })
        }else{
            dispatch({
                type: POST_NEW_QUESTION,
                payload: res.data
            })
        }
    }
    )
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.error
        })
    )
}

export const clearPostNewQuestionResult = () => {
    return {
        type: CLEAR_POST_NEW_QUESTION_RESULT
    }
}

export const toggleDisableQuestion = postData => dispatch => {
    axios.patch(`${host}/api/questions`, postData)
        .then(res => {
            if(res.data.tokenError){
                dispatch({
                    type: GET_TOKEN_ERROR,
                    payload: res.data.tokenError
                }) 
            }else{
                dispatch({
                    type: TOGGLE_DISABLE_FUNC,
                    payload: res.data
                })
            }
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.error
            })
        )
}

export const clearToggleDisableQuestion = () => {
    return {
        type: CLEAR_TOGGLE_DISABLE_QUESTION
    }
}

export const getQuestionIdState = postData => dispatch => {
    dispatch({
        type: GET_QUESTION_ID_STATE,
        payload: postData
    })
}

export const clearQuestionIdState = () => {
    return {
        type: CLEAR_QUESTION_ID_STATE
    }
}

export const setQuestionsLoading = () => {
    return {
        type: LOADING
    }
}

//Access points Section
export const getAllAccessPoints = () => dispatch => {
    dispatch(setQuestionsLoading());
    axios.get(`${host}/api/aps`)
        .then(res => {
            if(res.data.tokenError){
                dispatch({
                    type: GET_TOKEN_ERROR,
                    payload: res.data.tokenError
                })
            }else{
                dispatch({
                    type: GET_ALL_ACCESS_POINTS,
                    payload: res.data
                })
            }
        }
        ).catch(err =>
            dispatch({
                type: GET_ALL_ACCESS_POINTS,
                payload: {}
            })
        );
}

export const clearAccessPointsList = () => {
    return {
        type: CLEAR_ACCESS_POINT_LIST
    }
}


export const getApIdState = postData => dispatch => {
    dispatch({
        type: GET_AP_ID_STATE,
        payload: postData
    })
}

export const clearApIdState = () => {
    return {
        type: CLEAR_AP_ID_STATE
    }
}


//Data Visualization Section
export const getResponseAnalysis = postData => dispatch => {
    axios.post(`${host}/api/graph/response`, postData)
        .then(res => {
            if(res.data.tokenError){
                dispatch({
                    type: GET_TOKEN_ERROR,
                    payload: res.data.tokenError
                })
                
            }else{
                dispatch({
                    type: GET_RESPONSE_ANALYSIS,
                    payload: res.data
                })
            }
        }
            
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        )
}

export const clearResponseAnalysis = () => {
    return {
        type: CLEAR_RESPONSE_ANALYSIS
    }
}


//User Management Section
export const getUsers = () => dispatch => {
    dispatch(setUsersLoading());
    axios.get(`${host}/api/users`)
        .then(res => {
            if(res.data.tokenError){
                dispatch({
                    type: GET_TOKEN_ERROR,
                    payload: res.data.tokenError
                })
            }else{
                dispatch({
                    type: GET_USERS,
                    payload: res.data
                })
            }
        }
        ).catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.error
            })
        )
}

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    }
}

export const clearUsers = () => {
    return {
        type: CLEAR_USERS
    }
}

export const registerUser = postData => dispatch => {
    axios.post(`${host}/api/users/register`, postData)
        .then(res => {
            if(res.data.tokenError){
                dispatch({
                    type: GET_TOKEN_ERROR,
                    payload: res.data.tokenError
                })
            }else{
                dispatch({
                    type: REGISTER_USER,
                    payload: res.data
                })
            }
        }
    )
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
}

export const clearRegisterUserAction = () => {
    return {
        type: CLEAR_REGISTER_USER_ACTION
    }
}

export const getUserById = id => dispatch => {
    dispatch(setUserLoading());
    axios.get(`${host}/api/users/${id}`)
        .then(res => {
            if(res.data.tokenError){
                dispatch({
                    type: GET_TOKEN_ERROR,
                    payload: res.data.tokenError
                })
            }else{
                dispatch({
                    type: GET_USER_BY_ID,
                    payload: res.data
                })
            }
        }
        ).catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.error
            })
        )
}

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

export const clearSingleUser = () => {
    return {
        type: CLEAR_USER
    }
}

export const updateUser = postData => dispatch => {
    axios.patch(`${host}/api/users`, postData)
        .then(res => {
            if(res.data.tokenError){
                dispatch({
                    type: GET_TOKEN_ERROR,
                    payload: res.data.tokenError
                })
            }else{
                dispatch({
                    type: UPDATE_USER_DETAILS,
                    payload: res.data
                })
            }
        }).catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.error
            })
        )
} 

export const clearUpdatedUser = () => {
    return {
        type: CLEAR_UPDATED_USER
    }
}


