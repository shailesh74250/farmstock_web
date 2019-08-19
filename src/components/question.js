import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Button, Card, CardImg, CardText, CardBody,
    CardTitle,CardFooter, CardHeader, FormFeedback, Label, Form, FormGroup, Input} from 'reactstrap';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { connect } from 'react-redux';

// import component
import AddTag from './addtag';
import AnswerList from './collapse';
import ChipComponent from './chip';

class QuestionComponent extends React.Component {
    constructor(props) {
        super(props)
        // this.showQuestion = this.showQuestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.getSuggestedAnswers = this.getSuggestedAnswers.bind(this);
        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.state = {
            image: null,
            answer:null,
            color: null,
            imagelabel:null,
            newdata: this.props.storedata,
            tag:[],
        }
        this.tags_with_id = [];
        this.crop_topic_url = '';
    }
    componentDidMount(){
        console.log("question did mount")
        //this.state.image != null ? this.setState({imagelabel:'Update Image'}):this.setState({imagelabel:'Select Image'})  
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(this.props.answer_by);
    //     // You don't have to do this check first, but it can help prevent an unneeded render
    //     if (this.props.answer_by !== this.state.answer) {
    //         console.log(this.props.answer_by);
    //         this.setState({ answer: this.props.answer_by });
    //     }
    //   }
    handleFile(e) {
        this.setState({image:e.target.files[0]});
        this.setState({imagelabel:'Update Image'});
    }
    handleChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }
    addTag(){
        alert('this is alert')
    }
    async onFormSubmit(e) {
        console.log(this.state.image)
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('content', this.state.content)
        const config = {
            headers: {
                Authorization: 'Token b05a75d45b58c1637ea312212bd27f43d1bc1f1b',
                'content-type': 'multipart/form-data',
            }
        };
        axios.post("https://dev.farmstock.in/api/v1/posts/9c78ec5c-6217-41f0-a2b0-dce0677a139d/post_replies",formData,config)
            .then((response) => {
                this.setState({message:'Answer posted successfully!'});
                this.setState({color:'green'});
                alert("The file is successfully uploaded");
            }).catch((error) => {
                this.setState({message:'Answer posted failed'});
                this.setState({color:'red'});
        });

        // let formData = new FormData()  
        // formData.set('image', this.state.image);
        // formData.set('content', this.state.answer);
        // try {
        //     const response = await axios.post('https://dev.farmstock.in/api/v1/posts/9c78ec5c-6217-41f0-a2b0-dce0677a139d/post_replies',
        //     formData, {
        //         headers: {
        //           Authorization: 'Token b05a75d45b58c1637ea312212bd27f43d1bc1f1b','content-type': 'multipart/form-data'
        //         }
        //     });
        //     console.log('👉 Returned data:', response);
        //     this.setState({message:'Answer posted successfully!'});
        //     this.setState({color:'green'});
        // } catch (e) {
        //     console.log(`😱 Axios request failed: ${e}`);
        //     this.setState({message:'Answer posted failed'});
        //     this.setState({color:'red'});
        // }
    }
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
        console.log(this.props.answer_by);
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <Grid container spacing={3}>
                            <Grid item sm={6}>
                                {this.props.current_question.content}
                            </Grid>
                            <Grid item sm={6}>
                                <CardImg top width="100%" height="200" src={this.props.current_question.image} alt="Card image cap" />
                            </Grid>
                        </Grid>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                            <Grid container spacing={3}>
                                <Grid item sm={9} style={{textAlign:'left'}}>
                                    <ChipComponent tags={this.state.tag} deleteTag={this.deleteTag}/>
                                </Grid>
                                <Grid item sm={2}>
                                    <Button variant="contained" color="primary" size="small" onClick={this.handleSubmit}>
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item sm={1}>
                                   {/* <AddTag crops_list = {this.state.crops} topics_list = {this.state.topics}/>  */}
                                    <AddTag data = {this.props.data} getTag={this.getTag}/>
                                </Grid>
                            </Grid>
                        </CardTitle>
                        <CardText>
                            {<AnswerList answers = {this.props.current_question.replies}/>}
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <Typography variant="body1" gutterBottom style={{color:this.state.color}}>
                            {this.state.message}
                        </Typography>   
                        <Form onSubmit={this.onFormSubmit}>
                            <FormGroup>
                                <Grid container spacing={3}>
                                    <Grid item sm={9}>
                                        <Input type="textarea" name="answer" value={this.props.updated_answer} onChange={this.handleChange} required placeholder="Enter your answer" />
                                    </Grid>
                                    <Grid item sm={3}>
                                        {/* <input type="file"  name="image" onChange={this.handleFile} /> */}
                                        <Input type="file" name="image" id="img" value= {this.props.updated_image} onChange={this.handleFile}/>
                                        {/* <Label for="img" style={{cursor: 'pointer', color:'blue', fontWeight:'bold'}}>{this.state.imagelabel}</Label><br/>
                                        <Label style={{cursor: 'pointer', color:'blue', fontWeight:'bold'}}>{this.state.image}</Label> */}
                                        {/* <Button color="primary">select image</Button> */}
                                    </Grid>
                                </Grid>
                            </FormGroup>
                            <Button type = "submit">
                                Submit
                            </Button>
                        </Form>
                    </CardFooter>
                </Card>
            </React.Fragment>
        );
    }
}
 
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

const mapStateToProps = (state) => {
    return {
        tags: state.tags
    }
}
export default connect(mapStateToProps, null)(withStyles(styles)(QuestionComponent))
