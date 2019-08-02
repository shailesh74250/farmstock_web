import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { CardImg, Button } from 'reactstrap';

class CollapseComponent extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.searchTag = this.searchTag.bind(this);
        this.findSuggestion = this.findSuggestion.bind(this);
        // this.selectButton = this.selectButton.bind(this);
        this.state = { collapse: false,
            currenttag:'question1',
            filterdata:[],
            filterquestion:null,
            filteranswers:[],
            data:{
                "results":
                [
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
                                "image":"https://dev.farmstock.in/media/__sized__/users/user/xJ_4VlhYQWyEyUSuiAzKZA-thumbnail-250x250-70.jpeg",
                                "created_at": "2019-07-30T09:35:57.207614Z"
                            },  
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
                                "image":"https://dev.farmstock.in/media/__sized__/users/user/xJ_4VlhYQWyEyUSuiAzKZA-thumbnail-250x250-70.jpeg",
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
                            "image":"https://dev.farmstock.in/media/__sized__/users/user/xJ_4VlhYQWyEyUSuiAzKZA-thumbnail-250x250-70.jpeg",
                            "created_at": "2019-07-30T09:35:57.207614Z"
                        },  
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
                            "image":"https://dev.farmstock.in/media/__sized__/users/user/xJ_4VlhYQWyEyUSuiAzKZA-thumbnail-250x250-70.jpeg",
                            "created_at": "2019-07-30T09:35:57.207614Z"
                        }, 
                    ],
                    "created_at": "2019-07-29T14:02:18.203119Z"
               }
                ]
            }
        };
    }
    componentDidMount(){
        this.searchTag();
        this.searchTag();
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    findSuggestion(data){
        return data.content === this.state.currenttag;
    }
    searchTag() {
        this.state.filterdata.push(this.state.data.results.find(this.findSuggestion));
        this.state.filterquestion = this.state.filterdata.content;
        this.state.filteranswers = this.state.filterdata.replies;
        console.log(this.state.filterdata);
        //console.log(this.state.data.results.find(this.findSuggestion));
    }
    selectButton(content, image){
        alert(content);
        alert(image);
    }
    render(){
        const classes = this.props.classes
        return (
            <div className={classes.root}>
            {this.state.filterdata.map(d =>
                <div>
                    <ExpansionPanel> 
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{d.content}</Typography>
                        </ExpansionPanelSummary>
                        {d.replies.map(d => <ExpansionPanelDetails> <div>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>{d.content}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container spacing={3}>
                                        <Grid item sm={6}>
                                            <Typography>
                                                {d.content}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={4}>
                                            <CardImg top width="100%" src={d.image} alt="Card image cap" />
                                        </Grid>
                                        <Grid item sm={2}>
                                            <Button variant="contained" color="primary" onClick={() => this.selectButton(d.content, d.image)}>select</Button>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel></div>
                        </ExpansionPanelDetails>)}
                    </ExpansionPanel> </div>)}
            </div>
        );
    }
}
 
const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },   
});
export default withStyles(styles)(CollapseComponent)