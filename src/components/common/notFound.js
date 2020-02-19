import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Loader from '../../img/loader.gif';

const styles = theme => ({
   root: {
       textAlign: 'center',
       padding: '200px 0px'
   }
})

class notFound extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <img src={Loader} alt="No Data Found" />
                <Typography variant="h5" gutterBottom>
                   No Data Found
                </Typography>
            </div>
        )
    }
}

export default withStyles(styles)(notFound);
