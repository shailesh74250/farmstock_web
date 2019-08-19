import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { CardImg, Button } from 'reactstrap';

import { connect } from 'react-redux';

class CollapseComponent extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount(){
        // this.setState({data:this.props.data});
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    } 
    handleSelect = (content,image) => () => {
        this.props.answerSuggestion(content,image);
    };
    
    render(){
        const classes = this.props.classes;
        console.log(this.props.answers);
        return (
            <div className={classes.root}>
                
                {!this.props.answers ? 'no suggested question found!':
                this.props.answers.map(d =>
                <div key={d.id} >
                    <ExpansionPanel > 
                        <ExpansionPanelSummary 
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{d.content}</Typography>
                        </ExpansionPanelSummary>
                        {(d.replies.length === 0) ? 'No answers found' : d.replies.map(d => <ExpansionPanelDetails key={d.id}> <div>
                            <ExpansionPanel >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>{d.content}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item sm={5}>
                                            <Typography>
                                                {d.content}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={4}>
                                            <CardImg top src={d.image} alt="Card image cap" />
                                        </Grid>
                                        <Grid item sm={3}>
                                            <Button variant="contained" color="primary" onClick={this.handleSelect(d.content, d.image)}>select</Button>
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
        overflow: 'auto',
        height: '200px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },   
});

const mapStateToProps = (state) => {
    console.log(state);
    return {
        tags: state.tags
    }
}

//export default withStyles(styles)(CollapseComponent)
export default connect(mapStateToProps, null)(withStyles(styles)(CollapseComponent))