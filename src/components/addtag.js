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

class AddTagComponent extends React.Component {
    constructor(props) {
        super(props)
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.state = {
            open: false,
            select_type:["Topics", "Crops"],
            selected_type: "",
            selected_tag: "",
            // topics_list : [],
            // crops_list :[]
            tags_list:[],
            crops_list:[],
            topics_list:[]
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
        //alert(e.target.value);
        if(e.target.value === 'Topics'){
            //this.getTopics();
            this.setState({tags_list:this.state.topics_list})
        }else if(e.target.value === 'Crops'){
            //this.getCrops();
            this.setState({tags_list:this.state.crops_list})
        }
        //console.log(e.currenttarget.key)
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleOk(){
        this.props.getTag(this.state.selected_tag, this.state.crops_list, this.state.topics_list);
        this.setState({ ...this.state, open: false });
    }

    async getTopics(){
        await axios.get('https://dev.farmstock.in/api/v1/topics')
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
        await axios.get('https://dev.farmstock.in/api/v1/crops')
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
    componentDidMount(){
        this.getTopics();
        this.getCrops();
    }
    render(){
        const classes = this.props.classes;
        const tagsList = this.state.tags_list.length ? (
            this.state.tags_list.map(tag => {
                return (
                    <MenuItem key={tag.id} value={tag.title}>{tag.title}</MenuItem>
                )
            })
        ) : (<p>Tag Not Found</p>);
        console.log(tagsList);
        return (
            <React.Fragment>
                <Fab color="primary" size="small" aria-label="add" onClick={this.handleOpen}>
                    <AddIcon />
                </Fab>
                <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Select Tag</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="topics-simple">Select</InputLabel>
                                <Select
                                    value={this.state.selected_type}
                                    name='selected_type'
                                    onChange={this.handleChange}
                                    input={<Input id="topics-simple" />}
                                >
                                    {this.state.select_type.map(d => <MenuItem value={d}>{d}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="tag-simple">{this.state.selected_type}</InputLabel>
                                <Select
                                    value={this.state.selected_tag}
                                    name='selected_tag'
                                    onChange={this.handleChange}
                                    input={<Input id="tag-simple"/>}
                                >
                                    {tagsList}
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
    // return {
    //     updateCropsTopics: (data) => dispatch(updateCropsTopics(data))
    // }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(AddTagComponent));