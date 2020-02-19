import React, { Component, Fragment } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import LiveHelpTwoToneIcon from '@material-ui/icons/LiveHelpTwoTone';
import PermContactCalendarTwoToneIcon from '@material-ui/icons/PermContactCalendarTwoTone';
import PowerSettingsNewTwoToneIcon from '@material-ui/icons/PowerSettingsNewTwoTone';
import AssessmentTwoToneIcon from '@material-ui/icons/AssessmentTwoTone';

import { logoutUser } from '../../store/actions/authActions';
import { 
    clearQuestionsList, 
    clearPostNewQuestionResult, 
    clearAccessPointsList, 
    clearPostQuestionWithTagId, 
    clearLastQuestionGroupId,
    clearToggleDisableQuestion,
    clearQuestionIdState,
    clearApIdState,
    clearResponseAnalysis,
    clearUsers,
    clearUpdatedUser,
    clearSingleUser,
    clearRegisterUserAction,
    clearPostQuestionResults
 } from '../../store/actions/appActions';

function ListItemLink(props){
    return <ListItem button component={RouterLink} {...props} />;
}

class Sidebar extends Component {
    onLogoutUser = (e) => {
        e.preventDefault();
        this.props.clearQuestionsList();
        this.props.clearAccessPointsList();
        this.props.clearLastQuestionGroupId();
        this.props.clearPostQuestionWithTagId();
        this.props.clearPostNewQuestionResult();
        this.props.clearToggleDisableQuestion();
        this.props.clearQuestionIdState();
        this.props.clearApIdState();
        this.props.clearResponseAnalysis();
        this.props.clearUsers();
        this.props.clearRegisterUserAction();
        this.props.clearUpdatedUser();
        this.props.clearSingleUser();
        this.props.clearPostQuestionResults();
        this.props.logoutUser();
    }

  
    render() {
        const { user } = this.props.auth;
        return (
            <List>
                <ListItemLink to="/">
                    <ListItemIcon>
                        <DashboardTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemLink>
                <ListItemLink to="/analysis">
                    <ListItemIcon>
                        <AssessmentTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Question Analysis" />
                </ListItemLink>
               {(user.result.access_level === 1) && 
               <Fragment>
                    <ListItemLink to="/questions">
                        <ListItemIcon>
                            <LiveHelpTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Questions" />
                    </ListItemLink>
                    <ListItemLink to="/users">
                            <ListItemIcon>
                                <PermContactCalendarTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary="User Accounts" />
                    </ListItemLink>
                </Fragment>
                }
                <ListItemLink onClick={this.onLogoutUser}>
                    <ListItemIcon>
                        <PowerSettingsNewTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemLink>
            </List>
        )
    }
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearPostNewQuestionResult: PropTypes.func.isRequired,
    clearUpdatedUser: PropTypes.func.isRequired,
    clearRegisterUserAction: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    clearResponseAnalysis: PropTypes.func.isRequired,
    clearApIdState: PropTypes.func.isRequired,
    clearQuestionIdState: PropTypes.func.isRequired,
    clearToggleDisableQuestion: PropTypes.func.isRequired,
    clearPostQuestionWithTagId: PropTypes.func.isRequired,
    clearAccessPointsList: PropTypes.func.isRequired,
    clearQuestionsList: PropTypes.func.isRequired,
    clearSingleUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { 
        logoutUser, 
        clearQuestionsList, 
        clearPostNewQuestionResult, 
        clearAccessPointsList, 
        clearLastQuestionGroupId, 
        clearPostQuestionWithTagId,
        clearToggleDisableQuestion,
        clearQuestionIdState,
        clearApIdState,
        clearResponseAnalysis,
        clearSingleUser,
        clearUsers,
        clearUpdatedUser,
        clearRegisterUserAction,
        clearPostQuestionResults
    }
)(Sidebar);
