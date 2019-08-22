import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

class ChipComponent extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    // componentDidMount(){
    // }
    handleDelete = chipToDelete => () => {
        this.props.deleteTag(chipToDelete);
    };
    render(){
        const classes = this.props.classes;
        console.log(this.props.tags);
        const tagList = this.props.tags.length > 0 ? (
            this.props.tags.map(record=>{
                return(
                    <Chip
                        key={record.id}
                        label={record.title}
                        name={record.title}
                        onDelete={this.handleDelete(record)}
                        className={classes.chip}
                        color="primary"
                    />
                )
            })
        ) : (<p>No tag selected yet</p>)
        return (
            <div>
                {tagList}
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
    chip: {
        margin: theme.spacing(1),
    },
});
export default withStyles(styles)(ChipComponent)