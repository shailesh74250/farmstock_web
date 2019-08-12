import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { FixedSizeList } from 'react-window';
import CircularProgress from '@material-ui/core/CircularProgress';

// connect to redux store
import { connect } from 'react-redux';
import { updateCurrentQuestion } from '../store/actions/postActions'; 

// component
import Question from './question';
import Suggestion from './suggestion';
import CollapseComponent from './collapse';
import { declareExportAllDeclaration } from '@babel/types';

class ListComponent extends React.Component {
    constructor(props) {
        super(props)
        // this.showQuestion = this.showQuestion.bind(this);
        
        this.state = {
            curquestion:{},
            selectedIndex : 1,
        }
        this.handleClick = this.handleClick.bind(this);
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
        const classes = this.props.classes;
        
        return (
            <React.Fragment>
                <CssBaseline />
                {/* <Container maxWidth="lg">
                    <Typography component="div" style={{background:'#cfe8fc', height:'100vh'}} />
                </Container> */}
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item sm={8}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h1" gutterBottom>
                                    Question Answer Module
                                </Typography>
                                <Question current_question = {this.state.curquestion}/>
                            </Paper>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h1" gutterBottom>
                                    Suggested Answers
                                </Typography>
                                <Suggestion data = {this.props.storedata}/>
                            </Paper>
                        </Grid>
                        <Grid item sm={4}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h1" gutterBottom>
                                    Asked Questions
                                </Typography>
                                <List component="nav" aria-label="secondary mailbox folders">          
                                    {this.props.storedata.results.map(d => 
                                        <ListItem 
                                            button 
                                            //selected={this.state.selectedIndex === 0}
                                            onClick={e => this.handleClick(e,d)}
                                        >
                                            <ListItemText key={d.id} primary={d.content} />
                                        </ListItem>)
                                    }            
                                </List> 
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}
 
const styles = theme => ({
    root: {
        flexGrow:1,
        // width: '100%',
        // maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
    },
    paper:{
        padding: theme.spacing(2),
        textAlign:'center',
        color: theme.palette.text.secondary,
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListComponent))
//export default withStyles(styles)(ListComponent)