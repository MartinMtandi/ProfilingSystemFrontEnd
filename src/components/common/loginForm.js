import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl,InputAdornment,InputLabel,OutlinedInput, IconButton, Fab, FormHelperText, Typography} from '@material-ui/core';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { useForm } from 'react-hook-form'

import { loginUser} from '../../store/actions/authActions'

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(3)
  },
  formControl: {
      margin: theme.spacing(1)
  },
  margin: {
      margin: theme.spacing(1),
  },
  extendedIcon: {
      marginRight: theme.spacing(1),
  },
  btn:{
      paddingTop: '33px',
      textAlign: 'center'
  },
  login: {
      width: '100%'
  },
  errors: {
      color: 'red'
  },
  signInText: {
      paddingLeft: '20px',
      fontWeight: 500,
      fontSize: '18px'
  },
  alert: {
      margin: '20px 0'
  }
  }));

 function LoginForm(props) {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    
    const onSubmit = data => { 
      props.loginUser(data);
     }

    const [values, setValues] = React.useState({
      showPassword: false,
    });
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = event => {
      event.preventDefault();
    };

  return (
    <div className={classes.container}>
      {(props.auth.errors !== null) && <Alert severity="error" className={classes.alert}>{props.auth.errors}</Alert>}
      {(props.auth.tokenError !== null) && <Alert severity="error" className={classes.alert}>{props.auth.tokenError}</Alert>}
      <Typography variant="button" gutterBottom className={classes.signInText}>
          Sign In
      </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
            id="email"
            name="email"
            error={errors.email && true}
            autoComplete="email"
            defaultValue=""
            inputRef={register({ required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
            color="secondary"
            startAdornment={
                <InputAdornment position="start">
                    <MailOutlineOutlinedIcon />
                </InputAdornment>}
            labelWidth={40}
            />{errors.email && errors.email.type === 'required' && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
            {errors.email && errors.email.type === 'pattern' && <FormHelperText className={classes.errors}>Please enter valid email address</FormHelperText>}  
      </FormControl>
      <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            error={errors.password && true}
            name="password"
            type={values.showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            inputRef={register({ required: true, minLength: 8 })}
            defaultValue=""
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          {errors.password && errors.password.type === 'required' && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
          {errors.password && errors.password.type === 'minLength' && <FormHelperText className={classes.errors}>Minimum characters allowed is 8</FormHelperText>}  
        </FormControl>      
      <div className={classes.btn}>
          <Fab color="secondary" type="submit" variant="extended" className={classes.login}>
              <LockOpenIcon className={classes.extendedIcon} />
              Login
          </Fab>
      </div>
    </form>
    </div>
  );
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
      auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { loginUser })(LoginForm);