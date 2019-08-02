import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Button, Card, CardImg, CardText, CardBody,
    CardTitle,CardFooter, CardHeader, FormFeedback, Label, Form, FormGroup, Input} from 'reactstrap';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import AnswerList from './collapse';
import ChipComponent from './chip';

class QuestionComponent extends React.Component {
    constructor(props) {
        super(props)
        // this.showQuestion = this.showQuestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.state = {
            curquestion:{},
            answer:null,
            image: "abc.png",
            message:null,
            color: null,
            imagelabel:null,
            // imagename:'abc.png',
            data:{
                "results":[
                    {
                        "id": "ddd595b9-d1c5-4aff-95a1-e110e81ae638",
                        "user": {
                            "id": "9dec1e59-d534-46f2-a1b0-54ca34cef7d2",
                            "full_name": "reetesh",
                            "bio": "",
                            "image": {
                                "thumbnail": "https://dev.farmstock.in/media/__sized__/users/user/ymPU5zK4SAyO3Wu13JIHxg-thumbnail-250x250-70.jpg",
                                "original": "https://dev.farmstock.in/media/users/user/ymPU5zK4SAyO3Wu13JIHxg.jpg"
                            },
                            "address": {
                                "id": "64c1f93a-4116-4b90-a41f-1e79c820a1d8",
                                "address_1": "",
                                "address_2": "",
                                "pincode": "",
                                "location": {
                                    "type": "Point",
                                    "coordinates": [
                                        77.1941842,
                                        28.5249905
                                    ]
                                },
                                "village": {
                                    "id": "174631a3-8109-406b-8c6b-c84fb53d81b2",
                                    "name": "Barasahi",
                                    "slug": "nemalo-Barasahi"
                                },
                                "block": {
                                    "id": "421afbbd-d90e-4a6f-963b-1d914f216205",
                                    "name": "nemalo",
                                    "slug": "कटक-nemalo"
                                },
                                "district": {
                                    "id": "36798f29-fef8-4764-88b3-ac30f82a622e",
                                    "name": "कटक",
                                    "slug": "ओडिशा-कटक"
                                },
                                "state": {
                                    "id": "7371158b-0d23-484d-b901-c122505c67cc",
                                    "name": "ओडिशा",
                                    "slug": "ओडिशा"
                                }
                            },
                            "user_type": "publisher"
                        },
                        "post_type": "question",
                        "content": "question1",
                        "is_satisfied": false,
                        "has_expert_answer": true,
                        "image": 'https://dev.farmstock.in/media/discourse/userpost/2lH91eBQS1aD5t2_AScEbg.jpg',
                        "topics": [],
                        "crops": [],
                        "reply_count": 2,
                        "replies": [
                            {
                                "id": "2c1d9684-2f95-48a7-b680-8485585be75a",
                                "user": {
                                    "id": "aa94c22d-152b-44dc-9a64-d978f866fbe2",
                                    "full_name": "Manish",
                                    "bio": "",
                                    "image": {
                                        "thumbnail": "https://dev.farmstock.in/media/__sized__/users/user/xJ_4VlhYQWyEyUSuiAzKZA-thumbnail-250x250-70.jpeg",
                                        "original": "https://dev.farmstock.in/media/users/user/xJ_4VlhYQWyEyUSuiAzKZA.jpeg"
                                    },
                                    "address": {
                                        "id": "e99e157a-fed4-4675-9c50-e4ea71f1085d",
                                        "address_1": "",
                                        "address_2": "",
                                        "pincode": "",
                                        "location": {
                                            "type": "Point",
                                            "coordinates": [
                                                77.067962,
                                                28.4578863
                                            ]
                                        },
                                        "village": {
                                            "id": "8f6aa06d-3483-456a-ab14-c0a3c89c56b3",
                                            "name": "लारी कलां",
                                            "slug": "Chitarpur-लारी-कलां"
                                        },
                                        "block": {
                                            "id": "e6c2e664-c742-474a-ad50-d0002754d712",
                                            "name": "Chitarpur",
                                            "slug": "रामगढ़-Chitarpur"
                                        },
                                        "district": {
                                            "id": "d2bbcd98-eaa4-4b6b-86b1-c852839afa2c",
                                            "name": "रामगढ़",
                                            "slug": "झारखंड-रामगढ़"
                                        },
                                        "state": {
                                            "id": "961b797b-54c4-4011-a6c7-b8ab2fa6e86d",
                                            "name": "झारखंड",
                                            "slug": "झारखंड"
                                        }
                                    },
                                    "user_type": "publisher"
                                },
                                "content": "www.google.com",
                                "created_at": "2019-07-30T09:35:57.207614Z"
                            },
                            
                        ],
                        "created_at": "2019-07-29T14:02:18.203119Z"
                    },
                    {
                        "id": "ddd595b9-d1c5-4aff-95a1-e110e81ae638",
                        "user": {
                            "id": "9dec1e59-d534-46f2-a1b0-54ca34cef7d2",
                            "full_name": "reetesh",
                            "bio": "",
                            "image": {
                                "thumbnail": "https://dev.farmstock.in/media/__sized__/users/user/ymPU5zK4SAyO3Wu13JIHxg-thumbnail-250x250-70.jpg",
                                "original": "https://dev.farmstock.in/media/users/user/ymPU5zK4SAyO3Wu13JIHxg.jpg"
                            },
                            "address": {
                                "id": "64c1f93a-4116-4b90-a41f-1e79c820a1d8",
                                "address_1": "",
                                "address_2": "",
                                "pincode": "",
                                "location": {
                                    "type": "Point",
                                    "coordinates": [
                                        77.1941842,
                                        28.5249905
                                    ]
                                },
                                "village": {
                                    "id": "174631a3-8109-406b-8c6b-c84fb53d81b2",
                                    "name": "Barasahi",
                                    "slug": "nemalo-Barasahi"
                                },
                                "block": {
                                    "id": "421afbbd-d90e-4a6f-963b-1d914f216205",
                                    "name": "nemalo",
                                    "slug": "कटक-nemalo"
                                },
                                "district": {
                                    "id": "36798f29-fef8-4764-88b3-ac30f82a622e",
                                    "name": "कटक",
                                    "slug": "ओडिशा-कटक"
                                },
                                "state": {
                                    "id": "7371158b-0d23-484d-b901-c122505c67cc",
                                    "name": "ओडिशा",
                                    "slug": "ओडिशा"
                                }
                            },
                            "user_type": "publisher"
                        },
                        "post_type": "question",
                        "content": "question2",
                        "is_satisfied": false,
                        "has_expert_answer": true,
                        "image": null,
                        "topics": [],
                        "crops": [],
                        "reply_count": 2,
                        "replies": [
                            {
                                "id": "2c1d9684-2f95-48a7-b680-8485585be75a",
                                "user": {
                                    "id": "aa94c22d-152b-44dc-9a64-d978f866fbe2",
                                    "full_name": "Manish",
                                    "bio": "",
                                    "image": {
                                        "thumbnail": "https://dev.farmstock.in/media/__sized__/users/user/xJ_4VlhYQWyEyUSuiAzKZA-thumbnail-250x250-70.jpeg",
                                        "original": "https://dev.farmstock.in/media/users/user/xJ_4VlhYQWyEyUSuiAzKZA.jpeg"
                                    },
                                    "address": {
                                        "id": "e99e157a-fed4-4675-9c50-e4ea71f1085d",
                                        "address_1": "",
                                        "address_2": "",
                                        "pincode": "",
                                        "location": {
                                            "type": "Point",
                                            "coordinates": [
                                                77.067962,
                                                28.4578863
                                            ]
                                        },
                                        "village": {
                                            "id": "8f6aa06d-3483-456a-ab14-c0a3c89c56b3",
                                            "name": "लारी कलां",
                                            "slug": "Chitarpur-लारी-कलां"
                                        },
                                        "block": {
                                            "id": "e6c2e664-c742-474a-ad50-d0002754d712",
                                            "name": "Chitarpur",
                                            "slug": "रामगढ़-Chitarpur"
                                        },
                                        "district": {
                                            "id": "d2bbcd98-eaa4-4b6b-86b1-c852839afa2c",
                                            "name": "रामगढ़",
                                            "slug": "झारखंड-रामगढ़"
                                        },
                                        "state": {
                                            "id": "961b797b-54c4-4011-a6c7-b8ab2fa6e86d",
                                            "name": "झारखंड",
                                            "slug": "झारखंड"
                                        }
                                    },
                                    "user_type": "publisher"
                                },
                                "content": "www.google.com",
                                "created_at": "2019-07-30T09:35:57.207614Z"
                            },
                            
                        ],
                        "created_at": "2019-07-29T14:02:18.203119Z"
                    },
                ]
            },
        }
    }
    componentDidMount(){
        // if(this.state.image !== null){
        //     // this.setState({image:'abc.png'})
        //     this.setState({imagelabel:'Update Image'})
        // }
        this.state.image != null ? this.setState({imagelabel:'Update Image'}):this.setState({imagelabel:'Select Image'})
    }
    handleFile(e) {
        // if(this.state.image !== null){
        //     this.setState({image:'abc.png'})
        //     this.setState({imagelabel:'Update Image'})
        // }else{
        //     this.setState({image:e.target.files[0]})
        //     this.setState({imagelabel:'Update Image'})
        // }    
        this.setState({image:e.target.files[0]});
        this.setState({imagelabel:'Update Image'});
    }
    handleChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }
    async handleClick() {
        console.log('handle submit');
        console.log(this.state.answer);
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
        const classes = this.props.classes;
        return (
            <div>
                <Card>
                    <CardHeader>
                        <Grid container spacing={3}>
                            <Grid item sm={6}>
                                {this.state.data.results[0].content}
                            </Grid>
                            <Grid item sm={6}>
                                <CardImg top width="100%" height="200" src={this.state.data.results[0].image} alt="Card image cap" />
                            </Grid>
                        </Grid>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                            <ChipComponent label="dhan ki kheti"/>
                        </CardTitle>
                        <CardText>
                            {<AnswerList />}
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
                                        <Input type="textarea" value="abc" name="answer" onChange={this.handleChange} required placeholder="Enter your answer" />
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
            </div>
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
export default withStyles(styles)(QuestionComponent)