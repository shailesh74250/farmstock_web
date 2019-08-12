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
        this.findTag = this.findTag.bind(this);
        // this.selectButton = this.selectButton.bind(this);
        this.state = { collapse: false,
            currenttag:'question1',
            filterdata:[],
            data:{},
            selected_crop:"गेहूँ",
            selected_topic:"डेरी फार्मिंग",
        };
    }
    componentDidMount(){
        this.setState({data:this.props.data});
        console.log(this.props.data);
        this.searchTag();
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    findTag(data){
        return data.title === this.state.selected_topic;
    }
    findSuggestion(data){
        //console.log(data);
        return data.topics.find(this.findTag);
    }
    searchTag() {
        this.state.filterdata.push(this.props.data.results.find(this.findSuggestion));
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