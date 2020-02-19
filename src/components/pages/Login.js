import React, { Component } from 'react';
import {Typography, Grid, Grow} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import LoginForm from '../common/LoginForm';
import Poster from '../common/svgPoster';
import Logo from '../../img/logo.png';
import contitouchLogo from '../../img/contitouch-logo.png';

const styles = theme => ({
    logoWrapper: {
        textAlign: 'center',
        paddingTop: '15%',
    },
    logo: {
        width: '180px'
    },
    h5: {
        marginBottom: '44px',
        marginLeft: '20px',
        marginRight: '20px',
        fontWeight: 700,
        color: '#494847',
        textAlign: 'center',
    },
    sponsor: {
        textAlign: 'center',
        paddingTop: '60px',
    }
   
});

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            animate: true
        }
    }
    
    render() {
        const {classes} = this.props;
        return (
                <Grid container>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                        <Poster />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <div className={classes.logoWrapper}>
                        <Grow 
                            in={this.state.animate}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(this.state.animate ? { timeout: 1000 } : {})}
                        >
                                <img src={Logo} alt="Poshto logo" className={classes.logo}/>
                            </Grow>
                        </div>
                        <Grow 
                            in={this.state.animate}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(this.state.animate ? { timeout: 1000 } : {})}
                        >
                            <Typography className={classes.h5} variant="h5" gutterBottom>
                                Get more out of your data with Poshto Profiling System. Making data make sense.
                            </Typography>
                        </Grow>
                        <LoginForm />
                        <Grow 
                            in={this.state.animate}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(this.state.animate ? { timeout: 1000 } : {})}
                        >
                            <div className={classes.sponsor}>
                                <Typography className={classes.poweredBy} variant="button" display="block" gutterBottom>
                                    Powered By
                                </Typography>
                                <div className={classes.contilogo}>
                                    <img src={contitouchLogo} alt="Contitouch Logo" width="210px"/>
                                </div>
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            
        )
    }
}

export default (withStyles(styles)(Login));
