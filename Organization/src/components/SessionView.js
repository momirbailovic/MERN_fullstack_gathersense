import React, {Component } from 'react';
import {
    Paper, 
    Avatar,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
    ProgressBar
} from 'react-bootstrap';

import { connect } from 'react-redux'
import { addClose, getTrain_result, getAllResults } from '../actions';

import '../assets/css/bodypanel.css';
import '../assets/css/Tranining.css';

class SessionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: this.props.session,
            tags: this.props.tags,
        }
    }
    

    onShow = () => {
    }

    questionViewResult = () => {
        var no = 0;

        return (
                this.state.session.question_results.map((item1, index)=>(
                    item1.category !==3 && ++no &&(
                    <div key={item1.id}>
                        <label style={{fontSize: 14, fontWeight: 600, color: '#0F1B33', padding: '10px',margin: 0, marginLeft: '10px', marginTop: '20px'}} > 
                            Q{no + ": " + item1.question}
                        </label>
                        <div style={{marginLeft: '25px'}}>
                            <Grid container justify="center" item xs={12} >
                                {
                                    item1.category === 0 ? (
                                        item1.options.map((value, count) =>
                                            <Grid key={count} item xs={12} sm={12} xd={12} lg={12} container justify="flex-start">
                                                <div style={{display: 'flex'}}>
                                                    {
                                                        item1.correct_answer[0] === count ? (
                                                            <Avatar style={{backgroundColor: '#00B187', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#eee'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                        ) : (
                                                            item1.my_answer[0] === count ? (
                                                                <Avatar style={{backgroundColor: '#FF475B', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#eee'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                            ):(
                                                                <Avatar style={{backgroundColor: '#F2F2F2', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#979797'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                            )
                                                        )
                                                    }
                                                    <div className="h3txt" style={{margin: '11px', textAlign: 'left'}}> {value} </div>
                                                </div>
                                            </Grid>
                                        )
                                    ) : (
                                        <Grid container justify="center" item xs={12} >
                                            <Grid item xs={12} sm={6} xd={6} lg={6} container justify="center">
                                                {
                                                    item1.category === 1 ? (
                                                        <Grid item xs={12} sm={12} xd={12} lg={12} container justify="flex-start" className="h3txtyc"> Your sequence </Grid>
                                                    ) : (
                                                        <Grid item xs={12} sm={12} xd={12} lg={12} container justify="flex-start" className="h3txtyc"> Your selection </Grid>
                                                    )
                                                }
                                                {
                                                    item1.category === 1 ? (
                                                        item1.my_answer.map((value, count) =>
                                                        <Grid key={count} item xs={12} sm={12} xd={12} lg={12} container justify="flex-start">
                                                            <div style={{display: 'flex'}}>
                                                                {
                                                                    value === item1.correct_answer[count] ? (
                                                                        <Avatar style={{backgroundColor: '#00B187', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#eee'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                                    ) :(
                                                                        <Avatar style={{backgroundColor: '#FF475B', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#eee'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                                    )
                                                                }
                                                                <div className="h3txt" style={{margin: '11px', textAlign: 'left'}}> {item1.options[value]} </div>
                                                            </div>
                                                        </Grid>
                                                )) : (
                                                    item1.options.map((value, count) =>
                                                    <Grid key={count} item xs={12} sm={12} xd={12} lg={12} container justify="flex-start">
                                                        <div style={{display: 'flex'}}>
                                                            {
                                                                item1.my_answer.includes(count) === false ? (
                                                                    <Avatar style={{backgroundColor: '#F2F2F2', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#979797'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                                ):(
                                                                    item1.correct_answer.includes(count) === false ? (
                                                                        <Avatar style={{backgroundColor: '#FF475B', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#eee'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                                    ) : (
                                                                        <Avatar style={{backgroundColor: '#00B187', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#eee'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                                    )
                                                                )
                                                            }
                                                            <div className="h3txt" style={{margin: '11px', textAlign: 'left'}}> {value} </div>
                                                        </div>
                                                    </Grid>
                                                    ))
                                                }
                                            </Grid>
                                            <Grid item xs={12} sm={6} xd={6} lg={6} container justify="center">
                                                {
                                                    item1.category === 1 ? (
                                                        <Grid item xs={12} sm={12} xd={12} lg={12} container justify="flex-start" className="h3txtyc"> Correct sequence </Grid>
                                                    ) : (
                                                        <Grid item xs={12} sm={12} xd={12} lg={12} container justify="flex-start" className="h3txtyc"> Correct selection </Grid>
                                                    )
                                                }
                                                {
                                                    item1.category === 1 ? (
                                                        item1.correct_answer.map((value, count) =>
                                                        <Grid key={count} item xs={12} sm={12} xd={12} lg={12} container justify="flex-start">
                                                            <div style={{display: 'flex'}}>
                                                                <Avatar style={{backgroundColor: '#00B187', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#eee'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                                <div className="h3txt" style={{margin: '11px'}}> {item1.options[value]} </div>
                                                            </div>
                                                        </Grid>
                                                )) : (
                                                    item1.options.map((value, count) =>
                                                    <Grid key={count} item xs={12} sm={12} xd={12} lg={12} container justify="flex-start">
                                                        <div style={{display: 'flex'}}>
                                                            {
                                                                item1.correct_answer.includes(count) === false ? (
                                                                    <Avatar style={{backgroundColor: '#F2F2F2', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#979797'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                                ) : (
                                                                    <Avatar style={{backgroundColor: '#00B187', width: 20, height: 20, fontSize: '12px', margin: '10px', color: '#eee'}}>{String.fromCharCode(65 + count)}</Avatar>
                                                                )
                                                            }
                                                            <div className="h3txt" style={{margin: '11px', textAlign: 'left'}}> {value} </div>
                                                        </div>
                                                    </Grid>
                                                    ))
                                                }
                                            </Grid>
                                        </Grid>
                                    )

                                }
                                
                            </Grid>
                            {
                                JSON.stringify(item1.my_answer.sort()) !== JSON.stringify(item1.correct_answer.sort()) ? ( 
                                    <div className="h3txt" style={{margin: '11px', color: 'red', textAlign: 'left'}}> Your answer was incorrect </div>
                                ) : (
                                    <div className="h3txt" style={{margin: '11px', color: 'green', textAlign: 'left'}}> Your answer was correct </div>
                                )
                            }
                            <div className="h3txt" style={{margin: '11px', color: 'black', textAlign: 'left'}}> <span style={{fontWeight: 'bold'}}>Feedback: </span> {item1.feedback} </div>     
                        </div>
                        <hr></hr>                                           
                    </div>                                        
                )))
        );
    }

    render() {

        return (
           <div className="righdiv">                        
                <Paper style={{marginBottom: 20}}>
                    <label style={{fontSize: 16, fontWeight: 600, color: '#0F1B33', padding: '12px',margin: 0, marginLeft: '30px'}}> {this.state.session.title} </label>
                    <div className="tableWrapper">
                        {
                            this.state.session.tags.map((item, index) =>
                                <div className="row" style={{ margin: 'auto', marginBottom: '10px'}} key={index}>
                                    <div className="col-lg-2 right" style={{padding: 0, fontSize: '12px', textAlign: 'right'}}>{this.state.tags[item].label}</div>
                                    <div className="col-lg-9" style={{padding: 5}}>                                                
                                        <ProgressBar variant={this.state.tags[item].color.slice(1, this.state.tags[item].color.length)} now={this.state.session.scores[index]} label={`${60}%`} srOnly style={{borderRadius: '5px', height: '8px'}} />
                                    </div>
                                    <div className="col-lg-1" style={{padding: 0, fontSize: '12px', color: '#8D8D8D'}}>{this.state.session.scores[index]}/100</div>
                                </div>
                            )
                        }                        
                    </div>
                    <div style={{height: 10}} />
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style ={{margin: 'auto', color:'#979797', fontSize:'12px'}}> VIEW RESULTS </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div   className="blockdiv">
                                {this.questionViewResult()}                                
                            </div>
                        </ExpansionPanelDetails>
                    
                    </ExpansionPanel>                    
                </Paper>
            </div>
        );
    }
}

const mapDispatchToProps = {
    addclose: addClose,
    getTrain_result: getTrain_result,
    getAllResults: getAllResults,
}

const mapStateToProps = ({Normal, Train}) => {
    const {
        addopen,
        candi_data,
        train_data,
    } = Normal;
    const {
        trainId,
        chkedCanData,
        candidateId,
        candidateList,
        candidateName,
        candidatePhoto,
        candidateDepartment,
        train_result,
    } = Train;
    return {
        addopen,
        candi_data,
        train_data,
        trainId,
        chkedCanData,
        candidateId,
        candidateList,
        candidateName,
        candidatePhoto,
        candidateDepartment,
        train_result,        
    }
};


SessionView = connect(mapStateToProps, mapDispatchToProps)(SessionView)
export default SessionView;