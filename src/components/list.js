import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { FixedSizeList } from 'react-window';

// connect to redux store
import { connect } from 'react-redux';
import { updateCurrentQuestion } from '../store/actions/postActions'; 

// component
import Question from '../components/question';
import { declareExportAllDeclaration } from '@babel/types';

class ListComponent extends React.Component {
    constructor(props) {
        super(props)
        // this.showQuestion = this.showQuestion.bind(this);
        
        this.state = {
            curquestion:{},
            selectedIndex : 1,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, d) {
        e.preventDefault()
        //this.setState({selectedIndex:0}) 
        //this.props.updateCurrentQuestion(d)
        this.setState({curquestion:d});
        console.log(this.state.curquestion);
        alert(this.state.curquestion);
        //console.log(d)
    }
   
    render(){
        // const classes = this.props.classes;
        return (
            <div>
                <List component="nav" aria-label="secondary mailbox folders">          
                    {this.props.storedata.results.map(d => 
                        <ListItem 
                            button 
                            //selected={this.state.selectedIndex === 0}
                            onClick={e => this.handleClick(e,d)}
                        >
                            <ListItemText key={d.id} primary={d.content} />
                        </ListItem>)
                    }            
                </List> 
                <Question current_question = {this.state.curquestion}/>
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

const mapStateToProps = (state) => {
    console.log("first time called");
    return {
        storedata: state.storedata
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentQuestion : (data) => dispatch(updateCurrentQuestion(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListComponent))
//export default withStyles(styles)(ListComponent)