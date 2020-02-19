import React, { Component } from 'react';
import { 
    AppBar, Toolbar, Typography, Drawer, IconButton, Divider  
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../img/poshto.png';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Sidebar from './common/Sidebar';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24
    },
    appBarSpace: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#252626',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'noWrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuIcon: {
        color: '#fff'
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        width: theme.spacing(7),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    logo: {
        height: '40px'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.units * 1,
        height: '100vh',
        overflow: 'auto'
    }
})

class AdminWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: true
        }
    }

    handleDrawerOpen = (e) => {
        this.setState({open: true})
    }

    handleDrawerClose = (e) => {
        this.setState({open: false})
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerOpen} className={classes.menuIcon}>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            className={classes.poshtoLogo} 
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                        >
                            <img src={Logo} alt="Poshto logo" className={classes.logo}/>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    classes={{paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)}}
                    variant="permanent"
                    open={true}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Sidebar />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpace} />
                    {this.props.children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(withStyles(styles)(AdminWrapper));

