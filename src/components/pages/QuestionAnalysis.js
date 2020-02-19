import React, { Component } from 'react';
import { Grid, withStyles, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import QuestionsOnlyBox from '../common/QuestionsOnlyBox';
import QuestionGraph from '../common/QuestionGraph';
import { getQuestionsList } from '../../store/actions/appActions';
import Background from '../../img/artboard.png';
import { logoutUser } from '../../store/actions/authActions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    scrollable: {
        height: '94vh',
        overflow: 'scroll',
        backgroundColor: '#676778',
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    backgroundImage: {
        width: '100%',
        backgroundImage: `url(${Background})`
    },
    paper: {
        border: '1px solid #ccc'
    }
})

class QuestionAnalysis extends Component {

    componentDidMount(){
        this.props.getQuestionsList();
    }

    render() {
        const {classes} = this.props;
        const { questions, loading } = this.props.questions;
        const { tokenError } = this.props.auth;

        if(tokenError){
            this.props.logoutUser();
        }

        let questionsDashboard;
        if(questions === null || loading){
            questionsDashboard = <Spinner />
        }else{
            questionsDashboard = <QuestionsOnlyBox question={questions} />
        }

        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8} className={classes.backgroundImage}>
                        <div id="chartWrapper2">
                            <Paper className={classes.paper} elevation={0}>
                                <QuestionGraph />
                            </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <div className={classes.scrollable}>
                            {questionsDashboard}
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

QuestionAnalysis.propTypes = {
    getQuestionsList: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    questions: state.questions,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getQuestionsList, logoutUser }
)(withStyles(styles)(QuestionAnalysis));
