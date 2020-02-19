import React, { Component } from 'react';
import { withStyles, FormControl, FormGroup, FormControlLabel, Switch, Typography, Grow  } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestionsList, getResponseAnalysis, getQuestionIdState } from '../../store/actions/appActions';
import Spinner from './Spinner';

const styles = theme => ({
    root: {
       height: '91vh',
       overflow: 'scroll',
       backgroundColor: '#676778',
       ...theme.mixins.gutters(),
       paddingTop: theme.spacing.unit * 2,
       paddingBottom: theme.spacing.unit * 2
    },
    question: {
        fontSize: '17px',
        fontWeight: 600,
        color: '#212121'
    },
    wrapper: {
        margin: '10px 10px',
        padding: '15px 15px',
        backgroundColor: '#F6FAFD',
        borderRadius: '5px'
    }
})

class QuestionsList extends Component {
    toggler = [];
    exists = 0;
    indexValue = 0;
    constructor(){
        super();

        this.state = {
            animate: true,
            toggle: [],
            checked: true
        }
        
    }
   
    componentDidMount(){
        this.props.getQuestionsList();        
    }

     onHandleChange = data => {
        
        let toggleResponseID = this.props.response_analysis.responseId;

        this.exists = 0;
        toggleResponseID.forEach((element,index) => {
        
            if(element === data){
                this.indexValue = index;
                this.exists = 1;
            }
        });

        if(this.exists === 0){
            toggleResponseID.push(data)
            
        }else{
            toggleResponseID.splice(this.indexValue, 1);
        }

        const newPost = {
            responseId: toggleResponseID
        }
        
        this.props.getResponseAnalysis(newPost); 
        this.props.getQuestionIdState(toggleResponseID);        
    }
    
    render() {
        const {classes} = this.props;
        
        const { questions, loading } = this.props.questions;

        let dashboardContent;

        if(questions === null || loading){
            dashboardContent = <Spinner />
        }else{
            dashboardContent = questions.data.map((question, index) => {
                    const response = JSON.parse(question.answers);
                    return (
                        <div key={index}>

                            <Grow 
                                in={this.state.animate}
                                style={{ transformOrigin: '0 0 0' }}
                                {...(this.state.animate ? { timeout: 1000 } : {})}
                            >
                            <div className={classes.wrapper}>
                                    <Typography variant="h6" className={classes.question} gutterBottom>
                                        {question.question}
                                    </Typography>
                                    <FormControl component="fieldset">
                                        <FormGroup>
                                            {response.map((result, index) => {
                                                let val = Object.values(result);
                                                let keys = Object.keys(result);
                                                return <FormControlLabel
                                                    className={classes.formControl}
                                                    key={index}
                                                    control={
                                                        <Switch 
                                                            className={classes.switch} 
                                                            onChange={() => this.onHandleChange(keys[0])} 
                                                            value={keys[0]} 
                                                        />}
                                                    labelPlacement="end"
                                                    label={val[0]}
                                                />
                                            })}
                                        </FormGroup>
                                    </FormControl>
                            </div>
                            </Grow>
                        </div>
                    )
                }  
            )
        }

        return (
            <div className={classes.root}>
                {dashboardContent}
            </div>
        )
    }
}

QuestionsList.propTypes = {
    getQuestionsList: PropTypes.func.isRequired,
    getQuestionIdState: PropTypes.func.isRequired,
    getResponseAnalysis: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired,
    response_analysis: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    questions: state.questions,
    response_analysis: state.response_analysis
});

export default connect(
    mapStateToProps,
    { getQuestionsList, getResponseAnalysis, getQuestionIdState }
)(withStyles(styles)(QuestionsList));