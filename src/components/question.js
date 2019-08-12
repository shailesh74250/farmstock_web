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
        this.handleClick = this.handleClick.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.addTag = this.addTag.bind(this);
        this.state = {
            answers:[] ,
            image: "abc.png",
            message:null,
            color: null,
            imagelabel:null,
            // imagename:'abc.png',
            newdata: this.props.storedata,
        }
    }
    componentDidMount(){
        //this.state.image != null ? this.setState({imagelabel:'Update Image'}):this.setState({imagelabel:'Select Image'})
        
    }
    
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
    async handleClick() {
        //console.log('handle submit');
        //console.log(this.state.answer);
        let formData = new FormData()  
        formData.set('image', this.state.image);
        formData.set('content', this.state.answer);
        try {
            const response = await axios.post('https://dev.farmstock.in/api/v1/posts/1d64de50-5703-4919-9674-8a7a680a7208/post_replies',
            formData, {
                headers: {
                  Authorization: 'Token b05a75d45b58c1637ea312212bd27f43d1bc1f1b','content-type': 'multipart/form-data'
                }
            });
            console.log('👉 Returned data:', response);
            this.setState({message:'Anser posted successfully!'});
            this.setState({color:'green'});
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
            this.setState({message:'Anser posted failed'});
            this.setState({color:'red'});
        }
    }
    
    render(){
        //console.log(this.props.current_question.replies);
        const classes = this.props.classes;
        console.log("inside question");
        console.log(this.props.current_question.content);
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
                                <Grid item sm={10} style={{textAlign:'left'}}>
                                    <ChipComponent label="dhan ki kheti"/>
                                </Grid>
                                <Grid item sm={2}>
                                   <AddTag /> 
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
                        <Form>
                            <FormGroup>
                                <Grid container spacing={3}>
                                    <Grid item sm={9}>
                                        <Input type="textarea" name="answer" onChange={this.handleChange} required placeholder="Enter your answer" />
                                    </Grid>
                                    <Grid item sm={3}>
                                        {/* <input type="file"  name="image" onChange={this.handleFile} /> */}
                                        <Input type="file" name="uploadfile" id="img" onChange={this.handleFile} style={{display:'none'}}/>
                                        <Label for="img" style={{cursor: 'pointer', color:'blue', fontWeight:'bold'}}>{this.state.imagelabel}</Label><br/>
                                        <Label style={{cursor: 'pointer', color:'blue', fontWeight:'bold'}}>{this.state.image}</Label>
                                        {/* <Button color="primary">select image</Button> */}
                                    </Grid>
                                </Grid>
                            </FormGroup>
                            <Button onClick={this.handleClick}>
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
    //console.log('sdfs')
    //console.log(state.cureentquestion.content);
    // return {
    //     currentquestion: state.cureentquestion
    // }
}
export default connect(mapStateToProps,null)(withStyles(styles)(QuestionComponent))
//export default withStyles(styles)(QuestionComponent)