import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import poster from '../../img/graphic5.svg'

const styles = theme => ({
    root: {
        backgroundColor: '#C3423F',
        height: '100vh',
    },
    img: {
        textAlign: 'center',
        paddingTop: '15%',
    }
  });

class svgPoster extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.img}>
                    <img src={poster} alt="Poshto Poster" width="45%"/>
                </div>
            </div>
        )
    }
}

export default (withStyles(styles)(svgPoster));
