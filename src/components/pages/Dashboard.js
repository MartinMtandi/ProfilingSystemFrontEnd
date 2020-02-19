import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {Grid, Paper} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ResponseGraph from '../common/ResponseGraph';
import QuestionsList from '../common/QuestionsList';
import Background from '../../img/artboard.png';
import { logoutUser } from '../../store/actions/authActions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    backgroundImage: {
        width: '100%',
        backgroundImage: `url(${Background})`
    },
    paper: {
        border: '1px solid #ccc'
    }
})

class Dashboard extends Component {
    render() {
        const {classes} = this.props;

        const { tokenError } = this.props.auth;

        if(tokenError){
            this.props.logoutUser();
        }

        return (
            <div className={classes.root}>
               <Grid container>
                    <Grid item xs={12} sm={8} md={8} lg={8}  className={classes.backgroundImage}>
                        <div id="chartWrapper">
                            <Paper elevation={0} className={classes.paper}>
                                <ResponseGraph />
                            </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <QuestionsList />
                    </Grid>
               </Grid>
            </div>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
  }

export default connect(
    mapStateToProps,
     { logoutUser }
)(withStyles(styles)(Dashboard));
