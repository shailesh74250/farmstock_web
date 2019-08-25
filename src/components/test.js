import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';

// connect to redux store
import { connect } from 'react-redux';
import { updateCurrentQuestion } from '../store/actions/postActions'; 

// component
import Question from './question';

const drawerWidth = 300;
class Test extends Component {
    constructor(props){
        super(props)
        this.state = {
            open:false,
            direction:'ltr',
            curquestion:{},
            selectedIndex : 1,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleDrawerOpen = () => {
        this.setState({
            open:true
        })
    }
    
    handleDrawerClose = () => {

        this.setState({
            open:false
        })
    }

    componentDidMount(){
        //this.setState({curquestion:this.props.storedata.results[0]})
        console.log('inside componentDidMount');
        this.props.updateCurrentQuestion(this.props.storedata.results[0]);
        this.setState({curquestion:this.props.storedata.results[0]});
    }
    componentWillMount(){
        //this.setState({curquestion:this.props.storedata.results[0]})
        //console.log('inside componentDidMount');
        //this.props.updateCurrentQuestion(this.props.storedata.results[0]);
    }
    handleClick(e, d) {
        e.preventDefault()
        //this.setState({selectedIndex:0}) 
        //d === 'undefined' ? this.props.updateCurrentQuestion('') : this.props.updateCurrentQuestion(d);
        this.props.updateCurrentQuestion(d); 
        this.setState({curquestion:d});
        console.log("inside newlist")
        console.log(d);
    }  
    render(){
        const classes = this.props.classes
        //const theme = useTheme();
        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                    [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Question Answer Module
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Asked Questions
                        </Typography>
                        <IconButton onClick={this.handleDrawerClose} >
                            {this.state.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            {/* <ChevronLeftIcon /> */}
                        </IconButton>
                    </div>
                    <Divider />
                    <Paper className={classes.paper}>
                        <List component="nav" aria-label="secondary mailbox folders" style={{overflow: 'auto', height: '450px'}}>          
                            {this.props.storedata.results.map(d => 
                                <ListItem 
                                    key={d.id}
                                    button 
                                    //selected={this.state.selectedIndex === 0}
                                    onClick={e => this.handleClick(e,d)}
                                >
                                    <ListItemText primary={d.content} />
                                </ListItem>)
                            }            
                        </List> 
                    </Paper>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                    [classes.contentShift]: this.state.open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                        <Paper className={classes.paper}>
                            {/* <Typography variant="h5" component="h1" gutterBottom>
                                Question Answer Module
                            </Typography> */}
                            <Question 
                                current_question = {this.state.curquestion} 
                                current_question_image = {this.state.curquestion.image}
                                data = {this.props.storedata} 
                            />
                        </Paper>
                </main>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
});

const mapStateToProps = (state) => {
    // console.log("first time called");
    // console.log(state);
    return {
        storedata: state.storedata
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentQuestion : (data) => dispatch(updateCurrentQuestion(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Test))
//export default withStyles(styles)(Test)