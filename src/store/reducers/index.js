import { combineReducers } from 'redux';
import auth from './authReducer';
import errors from './errorReducer';
import questions from './questionsListReducer';
import access_points from './accessPointReducer';
import post_question from './postQuestionReducer';
import response_analysis from './postResponseAnalysis';
import postNewQuestion from './postNewQuestionReducer';
import toggleDisable from './toggleDisableQuestionReducer';
import users from './userRegistrationReducer';
import newUser from './registerUserReducer';
import questionGroupId from './questionGroupReducer';
import questionWithTag from './postQuestionWithTagIdReducer';

export default combineReducers({
    auth,
    questions,
    post_question,
    access_points,
    response_analysis,
    postNewQuestion,
    toggleDisable,
    users,
    questionGroupId,
    questionWithTag,
    newUser,
    errors
});