import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {IconButton, InputAdornment} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form'
import {Paper, Typography, Button, FormHelperText, Grid, FormControl, InputLabel, OutlinedInput, MenuItem, Select, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

import { registerUser } from '../../store/actions/appActions';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '50%',
        },
      },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      border: '1px solid #ccc'
    },
    title: {
        textAlign: 'center',
        fontSize: '17px'
    },
    status: {
        border: '1px solid #ccc',
        padding: theme.spacing(2)
    },
    errors: {
        color: 'red'
    }
  }));

  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    answerC: "",
    access_level: "",
    department: "",
  };

function UserForm(props) {
    const classes = useStyles();
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    const { register, handleSubmit, reset, errors, control } = useForm({defaultValues});

    const onSubmit = data => {
        const postData = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            access_level: data.access_level,
            department: data.department,
            password: data.password,
            status: 1
        }

        props.registerUser(postData);

        reset({ defaultValues })
    }

    const [values, setValues] = useState({
        showPassword: false,
      });
  
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    
    return (
        <Paper className={classes.paper} elevation={0}>
            <form className={classes.root} noValidate autoComplete="off"  onSubmit={handleSubmit(onSubmit)}>
                <Typography className={classes.title} variant="overline" display="block" gutterBottom>
                    Create New Account
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="first-name">First Name</InputLabel>
                            <OutlinedInput
                                id="first-name"
                                name="firstname"
                                error={errors.firstname && true}
                                inputRef={register({ required: true})}
                                labelWidth={80}
                            />{errors.firstname && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="last-name">Last Name </InputLabel>
                            <OutlinedInput
                                id="last-name"
                                name="lastname"
                                error={errors.lastname && true}
                                inputRef={register({ required: true})}
                                labelWidth={80}
                            />{errors.lastname && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                id="email"
                                name="email"
                                error={errors.email && true}
                                inputRef={register({ required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
                                labelWidth={45}
                            />{errors.email && errors.email.type === 'required' && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
                            {errors.email && errors.email.type === 'pattern' && <FormHelperText className={classes.errors}>Please enter valid email address</FormHelperText>}  
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="phone">Phone Number </InputLabel>
                            <OutlinedInput
                                id="phone"
                                name="phone"
                                type="number"
                                error={errors.phone && true}
                                inputRef={register({ required: true})}
                                labelWidth={106}
                            />{errors.phone && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel ref={inputLabel} id="form-control">
                                Choose Access Level
                            </InputLabel>
                            <Controller
                            as={
                            <Select
                                labelId="form-control"
                                id="access-level"
                                error={errors.access_level && true}
                                labelWidth={labelWidth}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="1">Super Administrator</MenuItem>
                            <MenuItem value="2">General User</MenuItem>
                            </Select>
                            }
                            rules={{ required: true }}
                            control={control}
                            name="access_level"
                            />
                            {errors.access_level && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel ref={inputLabel} id="form-control">
                                Choose Department
                            </InputLabel>
                            <Controller
                            as={
                            <Select
                                labelId="form-control"
                                id="access-level"
                                error={errors.department && true}
                                labelWidth={labelWidth}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Information Technology">Information Technology</MenuItem>
                            <MenuItem value="Marketing">Marketing</MenuItem>
                            <MenuItem value="Sales and Innovation">Sales and Innovation</MenuItem>
                            <MenuItem value="Software Development">Software Development</MenuItem>
                            <MenuItem value="Networks">Networks</MenuItem>
                            <MenuItem value="Business Analyst">Business Analyst</MenuItem>
                            </Select>
                            }
                            rules={{ required: true }}
                            control={control}
                            name="department"
                            />{errors.department && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            name="password"
                            error={errors.password && true}
                            inputRef={register({ required: true, minLength: 8 })}
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Paper className={classes.status} elevation={0} >
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup 
                                aria-label="status" 
                                name="status" 
                                defaultValue="1"
                                inputRef={register({ required: true})} 
                                row>
                                    <FormControlLabel
                                    value="1"
                                    control={<Radio color="primary" />}
                                    label="Active"
                                    labelPlacement="end"
                                    />
                                <FormControlLabel
                                    value="0"
                                    disabled
                                    control={<Radio color="primary" />}
                                    label="Disabled"
                                    labelPlacement="end"
                                />
                                </RadioGroup>
                            </FormControl>
                        </Paper>
                    </Grid>
                    <Grid  item xs={12} sm={12} md={12} lg={12}>
                        <Button fullWidth variant="contained" color="primary" type="submit">
                            Register
                        </Button> 
                    </Grid>
                </Grid>  
            </form>
        </Paper>
    )
}

UserForm.propTypes = {
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps, {registerUser})(UserForm);
