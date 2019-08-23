import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import {Button, Card, CardImg, CardText, CardBody,
    CardTitle,CardFooter, CardHeader, FormFeedback, Label, Form, FormGroup, Input} from 'reactstrap';

import { connect } from 'react-redux';
import axios from 'axios';

// import component
import AddTag from './addtag';
import AnswerList from './collapse';
import ChipComponent from './chip';

class CollapseComponent extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            tag:[],
        }
        this.tags_with_id = [];
        this.crop_topic_url = '';
    }
    componentDidMount(){
        // this.getSuggestedAnswers();
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    } 
    handleSelect = (content,image) => () => {
        this.props.answerSuggestion(content, image);
    }
    async getSuggestedAnswers(){
        // https://dev.farmstock.in/api/v1/tags?crops={id1}&crops={id2}....crops={idn}&topics={id1} &topics={id2}.
        var crop_topic_url = '';
        //console.log(data);
        this.state.tag.find((obj)=>{
            if(obj.type === 'crop'){
                crop_topic_url += 'crops='+obj.id+'&';
            }else if(obj.type ==='topic'){
                crop_topic_url += 'topics='+obj.id+'&';
            }
        });
        console.log(crop_topic_url);
        if(crop_topic_url !== ''){
            await axios.get('http://127.0.0.1:8000/api/v1/posts/tag?'+crop_topic_url)
            .then(response => {
                console.log(response.data.results);
                crop_topic_url = '';
                this.props.suggestedAnswers(response.data.results);
            })
            .catch((error) => {
                crop_topic_url = '';
                // Error
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }else{
            crop_topic_url = '';
            this.props.suggestedAnswers('');
        } 
    }
    getTag = (item) => {
        this.state.tag.find((obj)=>{
            if(obj.id === item.id){
                alert('This tag already selected!');
            }else {
                let updatedtag = [...this.state.tag, item];
                this.setState({
                    tag:updatedtag
                });
            }
        });
    }
    deleteTag = (item) => {
        console.log(item);
        let filtertag = this.state.tag.filter(obj => {
            return obj.id !== item.id
        })
        this.setState({
            tag:filtertag
        })
    }
    handleSubmit = () => {
        if(this.state.tag.length > 0){
            this.getSuggestedAnswers();
        }else{
            alert("No tag selected yet! Please select tag by clicking on + button and then click on submit")
        }
    }
    componentDidUpdate(oldProps) {
        const newProps = this.props.tag_list
        if(oldProps.tag_list !== newProps) {
            this.setState({tag:newProps});
        }
        //this.getSuggestedAnswers();
    }
    render(){
        const classes = this.props.classes;
        console.log(this.state.tag);
        //this.getSuggestedAnswers();
        return (
            <div className={classes.root}>
                <Card>
                    <CardHeader>
                        <Typography variant="h5" component="h3" gutterBottom>
                            Suggested Answers
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                        <Grid container spacing={3}>
                            <Grid item sm={8} style={{textAlign:'left'}}>
                                <ChipComponent tags={this.state.tag} deleteTag={this.deleteTag}/>
                            </Grid>
                            <Grid item sm={3}>
                                <Button variant="contained" color="primary" size="small" onClick={this.handleSubmit}>
                                    Get Answer
                                </Button>
                            </Grid>
                            <Grid item sm={1}>
                                <AddTag data = {this.props.data} getTag={this.getTag} crops_list = {this.props.crops_list} topics_list = {this.props.topics_list}/>
                            </Grid>
                        </Grid>
                        </CardTitle>
                        <CardText>
                            {this.props.answers.length === 0 ? 'no suggested question found!':
                            this.props.answers.map(d =>
                            <div key={d.id} >
                                <ExpansionPanel > 
                                    <ExpansionPanelSummary 
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>{d.content}</Typography>
                                    </ExpansionPanelSummary>
                                    {(d.replies.length === 0) ? 'No answers found' : d.replies.map(d => <ExpansionPanelDetails key={d.id}> <div>
                                        <ExpansionPanel >
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography className={classes.heading}>{d.content}</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Grid container>
                                                    <Grid item sm={5}>
                                                        <Typography>
                                                            {d.content}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm={4}>
                                                        <CardImg top src={d.image} alt="Card image cap" />
                                                    </Grid>
                                                    <Grid item sm={3}>
                                                        <Button variant="contained" color="primary" onClick={this.handleSelect(d.content, d.image)}>select</Button>
                                                    </Grid>
                                                </Grid>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel></div>
                                    </ExpansionPanelDetails>)}
                                </ExpansionPanel> 
                            </div>)}
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
 
const styles = theme => ({
    root: {
        width: '100%',
        overflow: 'auto',
        height: '200px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },   
});

const mapStateToProps = (state) => {
    console.log(state);
    return {
        tags: state.tags
    }
}

//export default withStyles(styles)(CollapseComponent)
export default connect(mapStateToProps, null)(withStyles(styles)(CollapseComponent))