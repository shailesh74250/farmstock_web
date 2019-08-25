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
import Suggestion from './suggestion';

class QuestionComponent extends React.Component {
    constructor(props) {
        super(props)
        // this.showQuestion = this.showQuestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.getSuggestedAnswers = this.getSuggestedAnswers.bind(this);
        this.postSuggestedAnswers = this.postSuggestedAnswers.bind(this);
        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.state = {
            image: '',
            answer:'',
            color: null,
            imagelabel:null,
            newdata: this.props.storedata,
            tag:[],
            updated_answer:'',
            updated_image:'',
            suggested_answers:[],
            crops_list:[],
            topics_list:[],
            qimage:'',
            image_selected:''
        }
        this.tags_with_id = [];
        this.crop_topic_url = '';
    }
    componentDidMount(){
        this.getTopics();
        this.getCrops();
        //this.state.image != null ? this.setState({imagelabel:'Update Image'}):this.setState({imagelabel:'Select Image'})  
    }
   
    handleFile(e) {
        this.setState({image:e.target.files[0]});
        //this.setState({imagelabel:'Update Image'});
    }
    handleChange(e) {
        //alert(e.target.value);
        this.setState({[e.target.name]:e.target.value})

        //let updatedtag = [...this.state.updated_answer, e.target.value];
        this.setState({
            updated_answer:e.target.value
        });
    }
    addTag(){
        alert('this is alert')
    }
    async getTopics(){
        await axios.get('http://127.0.0.1:8000/api/v1/topics')
        .then(response => {
            this.setState({topics_list:response.data.results});
        })
        .catch((error) => {
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
    }
    async getCrops(){
        await axios.get('http://127.0.0.1:8000/api/v1/crops')
        .then(response => {
            this.setState({crops_list:response.data.results});
        })
        .catch((error) => {
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
    }
    async onFormSubmit(e) {
        console.log(this.props.current_question.id)
        e.preventDefault();

        let formData = new FormData()  
        if(this.state.updated_answer !== '' && this.state.updated_image !== '' && this.state.image === ''){
            var filename = this.state.updated_image.replace(/^.*[\\\/]/, '');
            let file = await fetch(this.state.updated_image)
            .then(r => r.blob())
            .then(blobFile => new File([blobFile], filename, { type: ["image/png","image/jpg","image/jpeg"]}))
            formData.set('content', this.state.updated_answer);
            formData.set('image', file);
        }else{
            console.log(this.state.image)
            let file = this.state.image;
            formData.set('content', this.state.answer);
            formData.set('image', file);
        }
        try {
            const response =  await axios.post('http://127.0.0.1:8000/api/v1/posts/'+this.props.current_question.id+'/post_replies',
            formData, {
                headers: {
                  Authorization: 'Token ec5e8a7ac4555bacd704a8f9a5c66784eac11060','content-type': 'multipart/form-data'
                }
            });
            console.log('👉 Returned data:', response);
            this.setState({message:'Answer posted successfully!'});
            this.setState({color:'green'});
            this.setState({image:''});
            this.setState({updated_answer:''});
            this.setState({updated_image:''});
            this.setState({image_selected:''});
            setTimeout(function(){window.location.reload()},2000);
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
            this.setState({message:'Answer posted failed'});
            this.setState({color:'red'});
            this.setState({image:''});
            this.setState({updated_answer:''});
            this.setState({updated_image:''});
        }
    }
    async getSuggestedAnswers(){
        // https://dev.farmstock.in/api/v1/tags?crops={id1}&crops={id2}....crops={idn}&topics={id1} &topics={id2}.
        var crop_topic_url = '';
        //console.log(data);
        // if(this.state.tag.length > 0){
            this.state.tag.find((obj)=>{
                if(obj.type === 'crop'){
                    crop_topic_url += 'crops='+obj.id+'&';
                }else if(obj.type ==='topic'){
                    crop_topic_url += 'topics='+obj.id+'&';
                }
            });
        // }else{
        //     tags.find((obj)=>{
        //         if(obj.type === 'crop'){
        //             crop_topic_url += 'crops='+obj.id+'&';
        //         }else if(obj.type ==='topic'){
        //             crop_topic_url += 'topics='+obj.id+'&';
        //         }
        //     });
        // }
        
        console.log(crop_topic_url);
        this.crop_topic_url = crop_topic_url;
        // if(crop_topic_url !== ''){
            await axios.get('http://127.0.0.1:8000/api/v1/posts/tag?'+crop_topic_url)
            .then(response => {
                this.postSuggestedAnswers();
                this.suggestedAnswers(response.data.results);
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
        // }else{
        //     crop_topic_url = '';
        //     this.suggestedAnswers('');
        // } 
    }
    // post tag or update tag
    async postSuggestedAnswers(){
        console.log(this.crop_topic_url);
        axios.get('http://127.0.0.1:8000/api/v1/posts/'+this.props.current_question.id+'/tag/update?'+this.crop_topic_url,
            {
                headers: {
                    Authorization: 'Token ec5e8a7ac4555bacd704a8f9a5c66784eac11060','content-type': 'application/json'
                }
            }
        ).then(response => {
            if(response.status === 200)
               // alert("Tag updated successfully!") 
                //window.location.reload();
                this.crop_topic_url = ''
        })
        .catch(err => console.warn(err));  
    }
    // get selected tag from addtag.js 
    getTag = (item) => {
        //alert(item);
        console.log(item)
        if(this.state.tag.length > 0){
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
        }else{
            let updatedtag = [...this.state.tag, item];
            this.setState({
                tag:updatedtag
            });
        }
        
    }
    // get deleted tag from chip.js
    deleteTag = (item) => {
        let filtertag = this.state.tag.filter(obj => {
            return obj.id !== item.id
        })
        this.setState({
            tag:filtertag
        })
    }
    handleSubmit = () => {
        this.getSuggestedAnswers();
        this.postSuggestedAnswers();

    }
    // get suggested answer 
    suggestedAnswers = (answers) => {
        this.setState({
            suggested_answers:answers
        })
    }
    answerSuggestion = (content, image) => {
        this.setState({updated_answer:content});
        this.setState({updated_image: image});
        // if(image !== '')
            this.setState({image_selected:'Image selected'});
    }
    componentDidUpdate(oldProps) {
        const cur_question = this.props.current_question
        let updatedtag = [];
        if(oldProps.current_question !== cur_question) {
            cur_question.crops.map(d=>{
                updatedtag.push({id:d.id, title:d.title, type:'crop'});
                this.tags_with_id.push({id:d.id, value:d.title, type:'crop'});
                //this.setState({tag:[...this.state.tag, d.title]})
               // this.state.tag.push(d.title)
            })
            cur_question.topics.map(d=>{
                //updatedtag = [...this.state.tag, d.title];
                updatedtag.push({id:d.id, title:d.title, type:'topic'});
                this.tags_with_id.push({id:d.id, value:d.title, type:'topic'});
                //this.setState({tag:[...this.state.tag, d.title]})
                //this.state.tag.push(d.title)
            })    
            this.setState({tag: updatedtag})
            if(cur_question.image !== null){
                console.log(cur_question.image.original);
                this.setState({qimage:cur_question.image.original});
            }else{
                this.setState({qimage:''});
            }
                
            //this.getSuggestedAnswers(updatedtag);
        }
    }
    render(){
        //console.log(this.props.current_question_image.original)
        //console.log(this.props.current_question.image.original)
        // this.getSuggestedAnswers();
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <Grid container spacing={3}>
                            <Grid item sm={6}>
                                {this.props.current_question.content}
                            </Grid>
                            <Grid item sm={6}>
                                <CardImg top width="100" height="150" src={this.state.qimage} alt="This question doesn't have image" />
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
                                    <AddTag data = {this.props.data} getTag={this.getTag} crops_list={this.state.crops_list} topics_list={this.state.topics_list}/>
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
                                        {this.state.updated_answer !== '' ? <input type="textarea" name="answer" className="form-control" rows="20" defaultValue={this.state.updated_answer} onChange={this.handleChange} required placeholder="Enter your answer" /> : <input type="textarea" name="answer" className="form-control" rows="20"  onChange={this.handleChange} required placeholder="Enter your answer" />}
                                    </Grid>
                                    <Grid item sm={3}>
                                        <input type="file"  name="image" onChange={this.handleFile} />
                                        <p style={{color:'green'}}>{this.state.image_selected}</p>
                                    </Grid>
                                </Grid>
                            </FormGroup>
                            <Button type = "submit">
                                Submit
                            </Button>
                        </Form>
                    </CardFooter>
                </Card>
                <Suggestion data = {this.props.data} crops_list = {this.state.crops_list} topics_list = {this.state.topics_list} tag_list={this.state.tag} deleteTag={this.deleteTag} suggestedAnswers = {this.suggestedAnswers}  answers= {this.state.suggested_answers} answerSuggestion={this.answerSuggestion}/>
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
