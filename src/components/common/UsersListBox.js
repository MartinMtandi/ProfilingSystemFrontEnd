import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmailIcon from '@material-ui/icons/Email';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockIcon from '@material-ui/icons/Lock';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EditIcon from '@material-ui/icons/Edit';

import UserIcon from '../../img/user.png';
import { getUserById } from '../../store/actions/appActions';

const useStyles = makeStyles(theme => ({
    activated: {
        margin: '10px 10px',
        padding: '15px 15px',
        backgroundColor: '#F6FAFD',
        borderRadius: '5px',
        textAlign: 'center'
    },
    deactivated: {
        margin: '10px 10px',
        padding: '15px 15px',
        backgroundColor: '#B4ADA3',
        borderRadius: '5px',
        textAlign: 'center'
    },
    userIcon: {
        width: '25%',
        borderRadius: '50%'
    },
    span: {
        fontWeight: '600',
        margin: '0 7px'
    },
    wrapper: {
        verticalAlign: 'middle',
        display: 'inline-flex'
    },
    icons: {
        color: '#B22222'
    }
  }));

function UsersListBox(props) {
    const classes = useStyles(); 
    let data;

    const handleEdit = (id) => {
        props.getUserById(id);
    }

    data = props.users.data.map((user, index) => {
        return (
            <div className={(user.status === 1) ? classes.activated : classes.deactivated} key={index}>
                <Grid container>
                    <div className="edit">
                        <EditIcon onClick={() => handleEdit(`${user.id}`)} />
                    </div>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <img src={UserIcon} alt="User Placeholder Icon" className={classes.userIcon}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="h6" gutterBottom>
                            {user.firstname} {' '} {user.lastname}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.wrapper} gutterBottom>
                            <EmailIcon className={classes.icons}/><span className={classes.span}> Email: </span> {user.email}
                        </Typography><br />
                        <Typography variant="subtitle1" className={classes.wrapper} gutterBottom>
                            <PhoneInTalkIcon className={classes.icons} /><span className={classes.span}> Phone Number: </span> {user.phone}
                        </Typography><br />
                        <Typography variant="subtitle1" className={classes.wrapper} gutterBottom>
                            <LockIcon className={classes.icons} /><span className={classes.span}> Status: </span>{(user.status === 1) ? 'Active' : 'De-activated'}
                        </Typography><br />
                        <Typography variant="subtitle1" className={classes.wrapper} gutterBottom>
                            <CreditCardIcon className={classes.icons} /><span className={classes.span}> Access Level: </span> {(user.status === 1) ? 'Super Administrator' : 'General User'}
                        </Typography><br />
                        <Typography variant="subtitle1" className={classes.wrapper} gutterBottom>
                            <LocationCityIcon className={classes.icons} /><span className={classes.span}> Department: </span> {user.department}
                        </Typography><br />
                    </Grid>
                </Grid>
            </div>
        )
    })
    return (
        <div>
            {data}
        </div>
    )
}

UsersListBox.propTypes = {
    getUserById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps, { getUserById } )(UsersListBox);
