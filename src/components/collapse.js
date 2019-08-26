import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { CardImg } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


// connect to redux store
import { connect } from 'react-redux';

class CollapseComponent extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            replies: false,
        };
    }
    componentDidMount(){
        if(this.props.answers !== undefined){
            this.setState({replies: true});
        }
    }
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    render(){
        const classes = this.props.classes;
        if(this.props.answers !== undefined && (this.props.answers).length > 0){
            return (
                <div className={classes.root} >
                {this.props.answers.map(d => 
                <div>
                    {/* <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="300"
                            image={d.image}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {d.content}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Share
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions>
                    </Card> */}
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
                                <Grid item sm={8}>
                                    <Typography>
                                        {d.content}
                                    </Typography>
                            </Grid>
                                <Grid item sm={4}>
                                    <CardImg top width="50%" height="300" src={d.image} alt="Card image cap" />
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>)}
             </div> 
            )
        }else{
            return (
                <Paper>
                    <Typography variant="h5" component="h3">
                        No ansers found!
                    </Typography>
                </Paper>
            )
        }
    }
}
 
const styles = theme => ({
    root: {
        width: '100%',
        overflow: 'auto',
        height: '300px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }, 
    card: {
        maxWidth: 345,
      },  
});

const mapStateToProps = (state) => {
    //console.log(state.current_question);
    return {
        current_question: state.current_question
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateCurrentQuestion : (data) => dispatch(updateCurrentQuestion(data))
//     }
// }
export default connect(mapStateToProps, null)(withStyles(styles)(CollapseComponent))
// export default withStyles(styles)(CollapseComponent)