import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

class ChipComponent extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            tags : [],
        }
    }
    componentDidMount(){
        this.setState({tags:[...this.props.label.selected_crops, ...this.props.label.selected_topics]})
    }
    handleClick(e) {
        alert('clicked called')
        alert(e.target.label)
    } 
    handleDelete(){
        alert('delete called')
    }
    render(){
        const classes = this.props.classes;
        
        return (
            <div>
                {/* {this.props.label.selected_crops.map(d =>
                <Chip
                    label={d}
                    onClick={this.handleClick}
                    onDelete={this.handleDelete}
                    className={classes.chip}
                    color="primary"
                />)} */}
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
export default withStyles(styles)(ChipComponent)