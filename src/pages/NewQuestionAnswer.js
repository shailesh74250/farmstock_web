import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

// import Component
import ListComponent from '../components/newlist';
import Test from '../components/test';

// import store
import { connect } from 'react-redux';
import { updateStore } from '../store/actions/postActions'; 

class QuestionAnswer extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            //data:[],
            loading: true,
            fetched: false,
        }
    }
    async getData(){
        await axios.get('http://127.0.0.1:8000/api/v1/posts')
        .then(response => {
            //this.setState({data:response.data});
            this.props.updateStore(response.data);
            this.setState({loading:false});
            this.setState({fetched:true});
            //console.log(response.data);
            //return response.data;
            //console.log(thisdata.state.data.content);
        })
        .catch((error) => {
            // Error
            if (error.response) {
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
            // this.state.loading ? <CircularProgress className={classes.progress} /> :
                this.state.loading ? <CircularProgress style={{marginTop:'250px'}}/> :
                <Test />
        );
    }
}
 
const styles = theme => ({
   
});

// const mapStateToProps = (state, ownProps) => {
//     let data = ownProps.match.params.post_id;
//     return {
//       post: state.posts.find(post => post.id === id)
//     }
//   }
  
const mapDispatchToProps = (dispatch) => {
    return {
        updateStore: (data) => dispatch(updateStore(data))
    }
}
  
export default connect(null,mapDispatchToProps)(withStyles(styles)(QuestionAnswer));
//export default withStyles(styles)(QuestionAnswer)