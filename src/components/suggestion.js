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
        // this.setState({data:this.props.data});
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    } 
    handleSelect = (content,image) => () => {
        this.props.answerSuggestion(content,image);
    };
    async getSuggestedAnswers(data){
        // https://dev.farmstock.in/api/v1/tags?crops={id1}&crops={id2}....crops={idn}&topics={id1} &topics={id2}.
        var crop_topic_url = '';
        console.log(data);
        data.find((value)=>{
            if(value.type === 'crop'){
                crop_topic_url += 'crops='+value.id+'&';
            }else if(value.type ==='topic'){
                crop_topic_url += 'topics='+value.id+'&';
            }
        });
        console.log(crop_topic_url);
        if(crop_topic_url !== ''){
            await axios.get('https://dev.farmstock.in/api/v1/posts/tag?'+crop_topic_url)
            .then(response => {
                //console.log(response.data.results);
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
    getTag = (item, crops_list, topics_list) => {
        
        // check wheather selected tag already present in list if yes then it goes to elese block
        if(!this.state.tag.includes(item)){
            let updatedtag = [...this.state.tag, item];
            this.setState({
                tag:updatedtag
            })
            // taggin with id
            topics_list.find((value)=>{
                if(value.title === item){
                    this.tags_with_id.push({id:value.id, value:value.title, type:'topic'});
                }
            });
            crops_list.find((value)=>{
                if(value.title === item){
                    this.tags_with_id.push({id:value.id, value:value.title, type:'crop'});
                }
            });
        }else{
            alert('Already selected!')
        }
        // tags_with_id is global variable
        console.log(this.tags_with_id);
        //this.getSuggestedAnswers(this.tags_with_id);
    }
    deleteTag = (item) => {
        console.log(item);
        let filtertag = this.state.tag.filter(data => {
            return data !== item
        })
        this.setState({
            tag:filtertag
        })
        let filtertags_with_id = this.tags_with_id.filter(data => {
            return data.value !== item
        })
        this.tags_with_id = filtertags_with_id;
        //console.log(this.tags_with_id)
        if(this.tags_with_id.length === 0)
            this.getSuggestedAnswers(filtertags_with_id);
    }

    handleSubmit = () => {
        
        if(this.tags_with_id.length > 0){
            this.getSuggestedAnswers(this.tags_with_id);
        }else{
            alert("No tag selected yet! Please select tag by clicking on + button and then click on submit")
        }
    }
    
    render(){
        const classes = this.props.classes;
        console.log(this.props.answers);
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
                                {/* <AddTag crops_list = {this.state.crops} topics_list = {this.state.topics}/>  */}
                                <AddTag data = {this.props.data} getTag={this.getTag}/>
                            </Grid>
                        </Grid>
                        </CardTitle>
                        <CardText>
                            {!this.props.answers ? 'no suggested question found!':
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