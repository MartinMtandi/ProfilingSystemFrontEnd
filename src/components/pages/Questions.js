import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionForm from '../common/QuestionForm';
import ManageQuestionsList from '../common/ManageQuestionsList';
import Background from '../../img/artboard.png';
import { logoutUser } from '../../store/actions/authActions';

const styles = theme => ({
    root: {
        height: '94vh',
        overflow: 'scroll',
        backgroundColor: '#676778',
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
    },
    questionWrapper: {
        margin: '40px auto',
        width: '80%'
    },
    backgroundImage: {
        width: '100%',
        backgroundImage: `url(${Background})`
    }
})

class Questions extends Component {
    render() {
        
        const { classes } = this.props;
        const { tokenError } = this.props.auth;

        if(tokenError){
            this.props.logoutUser();
        }

        return (
            <Grid container>
                <Grid item xs={12} sm={8} md={8} lg={8} className={classes.backgroundImage}>
                    <div className={classes.questionWrapper}>
                        <QuestionForm />
                    </div>
                </Grid>
                <Grid item  xs={12} sm={4} md={4} lg={4} className={classes.root}>
                    <ManageQuestionsList />
                </Grid>
            </Grid>
        )
    }
}

QuestionForm.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(withStyles(styles)(Questions));
