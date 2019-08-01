import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

// import Component
import CollapseComponent from '../components/collapse';
import ListComponent from '../components/list';
import Question from '../components/question';

class QuestionAnswer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            loading: true,
            fetched: false,
        }
    }
    async getData(){
        await axios.get('https://dev.farmstock.in/api/v1/posts')
        .then(response => {
            
            this.setState({data:response.data});
            this.setState({loading:false});
            this.setState({fetched:true});
            console.log(this.state.data);
            //return response.data;
            //console.log(this.state.data.content);
        })
        .catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }
    componentDidMount(){
        
    }
    componentWillMount(){
        this.getData();
    }
    handleDelete = () => {
        alert('You clicked the delete icon.');
    }
    handleClick = () => {
        alert('You clicked the Chip.');
    }
    
    render(){
        const classes = this.props.classes
        //console.log(this.state.data.result[0]);
        return (
            this.state.loading ? <CircularProgress className={classes.progress} /> :
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
                                {/* <Form>
                                    <FormGroup>
                                        <Typography variant="body1" component="body1" style={{ textAlign:`left`}} gutterBottom>
                                            Question 1
                                        </Typography>
                                    </FormGroup>
                                    <FormGroup>
                                        <Chip
                                            label="Tag1"
                                            onDelete={this.handleDelete}
                                            className={classes.chip}
                                            color="primary"
                                        />
                                        <Chip
                                            label="Tag2"
                                            onDelete={this.handleDelete}
                                            className={classes.chip}
                                            color="primary"
                                        />
                                    </FormGroup>   
                                    <FormGroup>
                                        <Input type="textarea" name="answer" id="answer" placeholder="Enter your answer" />
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form> */}
                                <Question />
                            </Paper>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h1" gutterBottom>
                                    Suggested Answers
                                </Typography>
                                <CollapseComponent />
                                {/* <CollapseComponent />
                                <CollapseComponent />
                                <CollapseComponent /> */}
                            </Paper>
                        </Grid>
                        <Grid item sm={4}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h1" gutterBottom>
                                    Asked Questions
                                </Typography>
                                <ListComponent questions={this.state.data} />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}
 
const styles = theme => ({
    root:{
        flexGrow:1,
    },
    paper:{
        padding: theme.spacing(2),
        textAlign:'center',
        color: theme.palette.text.secondary,
    },
});
export default withStyles(styles)(QuestionAnswer)