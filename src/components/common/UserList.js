import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UsersListBox from './UsersListBox';
import { getUsers } from '../../store/actions/appActions';
import Spinner from './Spinner';

const useStyles = makeStyles(theme => ({
    root: {
        height: '91vh',
        overflow: 'scroll',
        backgroundColor: '#676778',
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
     }
    })
  );

function UserList(props) {
    const classes = useStyles();
    const {users, update_results, user_loading} = props.users;

    useEffect(() => {
        props.getUsers();
      },[props.newUser, update_results]);

    let content;

    if(users === null || user_loading){
        content = <Spinner />
    }else{
       content = <UsersListBox users={ users } />
    }
    return (
        <div className={classes.root}>
            { content }
        </div>
    )
}

UserList.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    newUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    users: state.users,
    newUser: state.newUser,
})

export default connect(mapStateToProps, { getUsers })(UserList);
