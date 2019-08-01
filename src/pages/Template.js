import React from 'react';
import { withStyles } from '@material-ui/core/styles';
 
class classname extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
    }
    render(){
        //const classes = this.props.classes
        return (
            <h1>template</h1>      
        );
    }
}
 
const styles = theme => ({
    
});
export default withStyles(styles)(classname)