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
        this.searchByTopics = this.searchByTopics.bind(this);
        this.searchByCrops = this.searchByCrops.bind(this);
        this.findSuggestionByTopics = this.findSuggestionByTopics.bind(this);
        this.findTagByTopics = this.findTagByTopics.bind(this);
        this.findSuggestionByCrops = this.findSuggestionByCrops.bind(this);
        this.findTagByCrops = this.findTagByCrops.bind(this);
        // this.selectButton = this.selectButton.bind(this);
        this.state = { collapse: false,
            currenttag:'question1',
            filterdata:[],
            data:{},
            // selected_crop:"गेहूँ",
            // selected_topic:"डेरी फार्मिंग",
            crops:["आम","आलू","उरद","करेला","खरबूजा","गेहूँ"],
            topics:["डेरी फार्मिंग","प्लास्टिक मल्चिंग"],
            // crops: [],
            // topics:[]
        };
    }
    componentDidMount(){
        this.setState({data:this.props.data});
        // console.log(this.props.tags);
        this.searchByTopics();
        this.searchByCrops();
    }
    componentWillReceiveProps (newProps) {
        console.log(this.props.tags.selected_topics);
        this.searchByTopics();
        this.searchByCrops();   
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    findTagByCrops(data){
        //return data.title === this.state.selected_topic;
        //return this.props.tags.selected_crops.includes(data.title) ;
        if(this.props.tags.selected_crops !== undefined){
            return this.props.tags.selected_crops.includes(data.title) ;
        }else{
            return null;
        }
    }
    findSuggestionByCrops(data){
        return data.crops.find(this.findTagByCrops);
    }
    searchByCrops() {
        if(this.state.filterdata.indexOf(this.props.data.results.find(this.findSuggestionByCrops)) == -1){
            this.state.filterdata.push(this.props.data.results.find(this.findSuggestionByCrops));
        }
    }

    // search by topics
    findTagByTopics(data){
        if(this.props.tags.selected_topics !== undefined){
            return this.props.tags.selected_topics.includes(data.title) ;
        }else{
            return null;
        } 
    }
    findSuggestionByTopics(data){
        return data.topics.find(this.findTagByTopics);
    }
    searchByTopics() {
        if(this.state.filterdata.indexOf(this.props.data.results.find(this.findSuggestionByTopics)) == -1){
            this.state.filterdata.push(this.props.data.results.find(this.findSuggestionByTopics));
        }
        //console.log(this.state.filterdata);
    }
    selectButton(content, image){
        alert(content);
        alert(image);
    }
    render(){
        const classes = this.props.classes;
        //console.log(this.props.tags);
        return (
            <div className={classes.root}>
                {this.state.filterdat !== undefined ? 'no suggested question found!':
                this.state.filterdata.map(d =>
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

const mapStateToProps = (state) => {
    return {
        tags: state.tags
    }
}

//export default withStyles(styles)(CollapseComponent)
export default connect(mapStateToProps, null)(withStyles(styles)(CollapseComponent))