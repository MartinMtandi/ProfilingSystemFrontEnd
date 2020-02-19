import React, {useEffect} from 'react';
import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserList from '../common/UserList';
import Background from '../../img/artboard.png';
import UserForm from '../common/UserForm';
import EditUser from '../common/EditUser';
import Loading from '../common/Loading';
import { logoutUser } from '../../store/actions/authActions';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    backgroundImage: {
        width: '100%',
        backgroundImage: `url(${Background})`
    },
    formWrapper: {
        margin: '40px auto',
        width: '80%'
    },
  })
);

function Users(props) {
    const classes = useStyles();
    const {user, update_results, single_user_loading} = props.users;

    useEffect(() => {
        console.log('refresh page')
      },[user]);

    useEffect(() => {
        // props.users.update_results: null,
        // props.users.user: null
    }, [update_results])

    const {tokenError} = props.auth;

    if(tokenError){
        props.logoutUser();
    }

    let content;

    if(user === null && single_user_loading){
        content = <Loading />
    }else if(user === null && single_user_loading === false){
        content = <UserForm />
    }else{
        content = <EditUser user={user}/>
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={12} md={8} lg={8} className={classes.backgroundImage}>
                    <div className={classes.formWrapper}>
                    {(tokenError !== null) && <Alert severity="error" className={classes.alert}>{tokenError}</Alert>}
                        {content}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <UserList />
                </Grid>
            </Grid>
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
   users: state.users,
   auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Users);

