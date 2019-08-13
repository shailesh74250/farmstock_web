import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';

// import store
import { connect } from 'react-redux';
import { updateCropsTopics } from '../store/actions/postActions'; 

class AddTagComponent extends React.Component {
    constructor(props) {
        super(props)
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.state = {
            open: false,
            crops:["आम","आलू","उरद","करेला","खरबूजा","गेहूँ"],
            topics:["डेरी फार्मिंग","प्लास्टिक मल्चिंग"],
            tags:{
                selected_crops:[],
                selected_topics:[]
            }
        } 
    }
    handleOpen(e) {
        this.setState({ ...this.state, open: true });
    } 
    handleClose(){
        console.log("close")
        this.setState({ ...this.state, open: false });
    }
    handleChange(e) {
        if(e.target.name === 'selected_crops'){
            //crops.push(e.target.value);
            if(this.state.tags.selected_crops.indexOf(e.target.value) === -1){
                this.state.tags.selected_crops.push(e.target.value)
            }
        }else {
            if(this.state.tags.selected_topics.indexOf(e.target.value) === -1){
                this.state.tags.selected_topics.push(e.target.value)
            }
        }
    }
    handleOk(){
        this.props.updateCropsTopics(this.state.tags);
        this.setState({ ...this.state, open: false });
    }
    async getCropsList(){
        await axios.get('https://dev.farmstock.in/api/v1/crops')
        .then(response => {
            this.setState({crops:response.data});
            console.log(this.state.crops.results);
        })
        .catch((error) => {
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
    async getTopicsList(){
        await axios.get('https://dev.farmstock.in/api/v1/topics')
        .then(response => {
            this.setState({topics:response.data});
            console.log(this.state.topics.results);
        })
        .catch((error) => {
            // Error
            if (error.response) {
            } else if (error.request) {
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }
    componentDidMount(){
        // this.getCropsList();
        // this.getTopicsList();
    }
    render(){
        const classes = this.props.classes;
        // console.log(this.state.topics.results);
        const crops = [
            {
                "id": "48b65b3c-bfa6-479d-aa06-dca711af8510",
                "title": "गेहूँ",
                "slug": "गेहूँ",
                "description": "",
                "image": {
                  "original": "https://dev.farmstock.in/media/base/crop/ANCXERaxRkWpaTnq0S5TFA.png",
                  "thumbnail": "https://dev.farmstock.in/media/__sized__/base/crop/ANCXERaxRkWpaTnq0S5TFA-thumbnail-250x250.png"
                },
                "crop_type": {
                  "name": "फल",
                  "eng_name": "Fruits"
                }
            },
            {
                "id": "48b65b3c-bfa6-479d-aa06-dca711af8510",
                "title": "आम",
                "slug": "आम",
                "description": "",
                "image": {
                  "original": "https://dev.farmstock.in/media/base/crop/ANCXERaxRkWpaTnq0S5TFA.png",
                  "thumbnail": "https://dev.farmstock.in/media/__sized__/base/crop/ANCXERaxRkWpaTnq0S5TFA-thumbnail-250x250.png"
                },
                "crop_type": {
                  "name": "फल",
                  "eng_name": "Fruits"
                }
            },
            {
                "id": "e08d387a-a677-4f01-8f36-683d703c84dc",
                "title": "आलू",
                "slug": "आल",
                "description": "",
                "image": {
                  "original": "https://dev.farmstock.in/media/base/crop/m1QsvB0lQ6mYLEmgftwa9w.jpg",
                  "thumbnail": "https://dev.farmstock.in/media/__sized__/base/crop/m1QsvB0lQ6mYLEmgftwa9w-thumbnail-250x250-70.jpg"
                },
                "crop_type": {
                  "name": "सब्जियाँ",
                  "eng_name": "Vegetables"
                }
            },
            {
                "id": "364e8698-d19f-410e-8e01-80d31f100b2a",
                "title": "उरद",
                "slug": "उरद",
                "description": "",
                "image": {
                    "thumbnail": "https://dev.farmstock.in/media/__sized__/base/crop/xr6Du-JBQam3uRisPS4a2A-thumbnail-250x250-70.jpg",
                    "original": "https://dev.farmstock.in/media/base/crop/xr6Du-JBQam3uRisPS4a2A.jpg"
                },
                "crop_type": {
                    "name": "दालें",
                    "eng_name": "Pulses"
                }
            },
            {
                "id": "fdf00c93-c890-4b71-933d-56d787accb77",
                "title": "करेला",
                "slug": "करल",
                "description": "",
                "image": {
                    "thumbnail": "https://dev.farmstock.in/media/__sized__/base/crop/nfhMPzALSdCpd5i374aU-g-thumbnail-250x250-70.jpeg",
                    "original": "https://dev.farmstock.in/media/base/crop/nfhMPzALSdCpd5i374aU-g.jpeg"
                },
                "crop_type": {
                    "name": "सब्जियाँ",
                    "eng_name": "Vegetables"
                }
            },
            {
                "id": "866d904b-f92d-44ee-bcc2-2052a2609524",
                "title": "खरबूजा",
                "slug": "खरबज",
                "description": "",
                "image": {
                    "thumbnail": "https://dev.farmstock.in/media/__sized__/base/crop/Q6f1KLICQi6wfPxxDt-Htg-thumbnail-250x250.png",
                    "original": "https://dev.farmstock.in/media/base/crop/Q6f1KLICQi6wfPxxDt-Htg.png"
                },
                "crop_type": {
                    "name": "फल",
                    "eng_name": "Fruits"
                }
            }
        ];
        const topics = [
            {
                "id": "a63b3910-b417-42bf-8308-8159dedb3748",
                "title": "डेरी फार्मिंग",
                "slug": "डर-फरमग",
                "description": "",
                "image": {
                    "thumbnail": "https://dev.farmstock.in/media/__sized__/base/topic/BkWw923CSlCkCW_nw0YzKw-thumbnail-250x250-70.jpg",
                    "original": "https://dev.farmstock.in/media/base/topic/BkWw923CSlCkCW_nw0YzKw.jpg"
                }
            },
            {
                "id": "55c6c80a-2723-40cc-b29c-e763653dab37",
                "title": "प्लास्टिक मल्चिंग",
                "slug": "पलसटक-मलचग",
                "description": "",
                "image": {
                    "thumbnail": "https://dev.farmstock.in/media/__sized__/base/topic/o2jaVOQnQPqzztFtSIdESg-thumbnail-250x250.png",
                    "original": "https://dev.farmstock.in/media/base/topic/o2jaVOQnQPqzztFtSIdESg.png"
                }
            },
            {
                "id": "fb198314-8d57-4457-a920-eaf36d881ff6",
                "title": "मछली पालन",
                "slug": "मछल-पलन",
                "description": "",
                "image": {
                    "thumbnail": "https://dev.farmstock.in/media/__sized__/base/topic/vkGtueaBRSyM2pBYCvOZbQ-thumbnail-250x250-70.jpg",
                    "original": "https://dev.farmstock.in/media/base/topic/vkGtueaBRSyM2pBYCvOZbQ.jpg"
                }
            },
            {
                "id": "2db955e1-0298-402b-811b-6b459714d36c",
                "title": "मल्टीलेयर खेती",
                "slug": "मलटलयर-खत",
                "description": "",
                "image": {
                    "thumbnail": "https://dev.farmstock.in/media/__sized__/base/topic/evbgzmk_QJmnF--Q4NhTSQ-thumbnail-250x250-70.jpg",
                    "original": "https://dev.farmstock.in/media/base/topic/evbgzmk_QJmnF--Q4NhTSQ.jpg"
                }
            },
            {
                "id": "c6e48010-55be-4b0c-8343-a721cf436e24",
                "title": "मुर्गी पालन",
                "slug": "मरग-पलन",
                "description": "",
                "image": {
                    "thumbnail": "https://dev.farmstock.in/media/__sized__/base/topic/LLtw_KD4Sn-QvuSwZ7npUQ-thumbnail-250x250-70.jpg",
                    "original": "https://dev.farmstock.in/media/base/topic/LLtw_KD4Sn-QvuSwZ7npUQ.jpg"
                }
            }
        ];
        return (
            <React.Fragment>
                <Fab color="primary" size="small" aria-label="add" onClick={this.handleOpen}>
                    <AddIcon />
                </Fab>
                <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Select topics and crops</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="topics-simple">Topics</InputLabel>
                            <Select
                                value={this.state.selected_topics}
                                name='selected_topics'
                                onChange={this.handleChange}
                                input={<Input id="topics-simple" />}
                            >
                                {topics.map(d => <MenuItem value={d.title}>{d.title}</MenuItem>)}
                            </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="crop-simple">Crops</InputLabel>
                            <Select
                                value={this.state.selected_crops}
                                name='selected_crops'
                                onChange={this.handleChange}
                                input={<Input id="crop-simple" />}
                            >
                                {crops.map(d => <MenuItem value={d.title}>{d.title}</MenuItem>)}
                            </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleOk} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}
 
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        updateCropsTopics: (data) => dispatch(updateCropsTopics(data))
    }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(AddTagComponent));