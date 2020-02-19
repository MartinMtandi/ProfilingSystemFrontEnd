import React, { useState, useEffect } from 'react';
import { Typography, Grow, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getQuestionsList, toggleDisableQuestion } from '../../store/actions/appActions';
import Spinner from './Spinner';

const useStyles = makeStyles(theme => ({
    question: {
        fontSize: '17px',
        fontWeight: 600,
        color: '#212121',
        marginTop: '10px'
    },
    wrapper: {
        margin: '10px 10px',
        padding: '15px 15px',
        backgroundColor: '#F6FAFD',
        borderRadius: '5px'
    },
    responses: {
        textAlign: 'right'
    },
    disabled: {
        margin: '10px 10px',
        padding: '15px 15px',
        backgroundColor: '#B4ADA3',
        borderRadius: '5px'
    },
    btnColor: {
        backgroundColor: 'grey',
        color: '#fff'
    },
    tag: {
        backgroundColor: '#E8EBE4',
        padding: '4px 8px',
        borderRadius: '4px'
    },
    bullet: {
        color: '#EC5990',
        fontWeight: '600',
        fontSize: '14px',
        paddingRight: '8px'
    },
    response: {
        paddingLeft: '10px'
    }
  }));

function ManageQuestionsList(props) {
    const classes = useStyles();
    const [checked] = useState(true);
    const { questions, loading } = props.questions;
    
    useEffect(() => {
        props.getQuestionsList();
    }, [props.postNewQuestion, props.toggleDisable, props.questionWithTag])
   
    let componentContent;

    const toggleActivate = (id) => {
        const apiData = {
            id: id,
            status: 1
          }

          props.toggleDisableQuestion(apiData);
    }

    const toggleDeActivate = (id) => {
        const apiData = {
            id: id,
            status: 0
          }
      
          props.toggleDisableQuestion(apiData);
    }

    if(questions === null || loading){
        componentContent = <Spinner /> 
    }else{
        componentContent = questions.data.map((question, index) => {
            const response = JSON.parse(question.answers);
            return (
                <div key={index}>
                    <Grow 
                        in={checked}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1000 } : {})}
                    >
                        <div className={(question.status === 1) ? classes.wrapper : classes.disabled}>
                            <span variant="contained" size="small" className={classes.tag}>
                                #{question.set_name.toLowerCase()}
                            </span>
                            <Typography variant="h5" className={classes.question} gutterBottom>
                                {question.question}
                            </Typography>
                            {response.map((result, index) => {
                                let val = Object.values(result);
                                return(
                                    <Typography variant="subtitle1" key={index} className={classes.response} gutterBottom>
                                       <span className={classes.bullet}>{"</>"}</span>{val[0]}
                                    </Typography>
                                )
                            })}
                            <div className={classes.responses} >
                                {(question.status === 0 || question.status === '0') ?
                                    <Button onClick={() => toggleActivate(`${question.id}`)} variant="contained" size="small" className={classes.btnColor}>
                                        Activate
                                    </Button>
                                : 
                                    <Button onClick={() => toggleDeActivate(`${question.id}`)} variant="contained" size="small" color="primary">
                                        De-activate
                                    </Button>
                                }
                                
                            </div>
                            
                        </div>
                    </Grow>
                </div>
            )
        })
    }
    return (
        <div  className={classes.root}>
             {componentContent}
        </div>
    )
}

ManageQuestionsList.propTypes = {
    getQuestionsList: PropTypes.func.isRequired,
    toggleDisableQuestion: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired,
    postNewQuestion: PropTypes.object.isRequired,
    toggleDisable: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    questions: state.questions,
    toggleDisable: state.toggleDisable,
    postNewQuestion: state.postNewQuestion,
    questionWithTag: state.questionWithTag
});


export default connect(mapStateToProps, { getQuestionsList, toggleDisableQuestion })(ManageQuestionsList);
