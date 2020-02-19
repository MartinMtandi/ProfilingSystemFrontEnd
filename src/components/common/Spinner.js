import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  loader: {
    textAlign: 'center',
    fontSize: '20px',
    marginTop: '100px',
    fontWeight: 700,
    fontStyle: 'italic',
    color: '#fff'
  },
});

export default function Spinner() {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h6" gutterBottom className={classes.loader}>
                Loading...
            </Typography>
        </div>
    )
}
