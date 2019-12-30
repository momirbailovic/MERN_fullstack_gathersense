import React, {Component } from 'react';
import SessionView from './SessionView';
import {
    Paper, 
    Button,
    Avatar,
    Grid,
    Divider,
    Card,
    CardContent,
} from '@material-ui/core';

import {
    ProgressBar
} from 'react-bootstrap';

import { connect } from 'react-redux'
import { addClose, getTrain_result, getAllResults } from '../actions';

import {getAbbr} from '../common/Functions';

import '../assets/css/bodypanel.css';
import '../assets/css/Tranining.css';

class ReportsResultView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidateId: '',
        }
    }
    

    onShow = () => {
    }
    
    onNextCan (id) {
        this.setState({candidateId: id})
        var trainId = this.props.trainId;
        var candidateId = id;
        var data = {
            trainId: trainId,
            candidateId: candidateId,
            photo:  this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===id)].photo,
            name:  this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===id)].name,
            department:  this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===id)].department,
        }
        this.props.getTrain_result(data, this.CBGetTrainRes)
    }
    CBGetTrainRes = (train_result) => {
        this.props.getAllResults(this.state.candidateId, this.CBGetAllResults)
    }
    
    CBGetAllResults = (data) => {
        this.props.changeFlag(2);
    }

    render() {

        return (
            <div className="Rcontainer">
                <div className="container" >
                    <div className="bothdiv">
                        <div className="leftdiv" >
                            <Card className="reportCardAvt">
                                <CardContent>                                
                                    <Avatar className="middle" alt="Sharp" src={this.props.candidatePhoto} style={{width: 75, height: 75, marginTop: '20px' }} />
                                    <div className="h2txt" style={{marginTop: '10px'}}>{this.props.candidateName}</div>
                                    <div className="h3txt">{this.props.candidateDepartment}</div>
                                </CardContent>
                            </Card>
                            <Card className="reportCard">
                                <CardContent>
                                    <div style={{float: 'right', marginRight: '10px', height: 30}}>
                                        
                                    </div>                                       
                                    <br />
                                    <Avatar className="trainAvatar" style={{backgroundColor: this.props.train_result.color, width: 80, height: 80, fontSize: '40px'}}>{getAbbr(this.props.train_result.title)}</Avatar>
                                    <div className="h2txt"> {this.props.train_result.title} </div>
                                    <div style={{margin: '5px', alignItems: 'center', textAlign: 'center', verticalAlign: 'middle'}}>
                                        {
                                            this.props.train_result.tags.map((item, index) => (
                                                <Button key={index} style={{fontSize: '10px', margin: '5px', borderRadius: '15px', color: item.color, border: '1px solid ' + item.color, padding: 3}}>
                                                    {item.label}
                                                </Button>
                                            ))
                                        }
                                    </div>
                                    <div className="h3txtb" disabled>{this.props.train_result.description}</div>
                                    <Divider style={{marginTop: '25px'}}/>
                                    <div className="divCard">
                                        <Grid item xs={12} space={9}>
                                            <Grid container justify="center"  space={9} >
                                                {
                                                    this.props.candidateList.slice(0,3).map((item, index) => 
                                                        (<Grid item xs={1}container justify="center" key={item.id} space={9}>
                                                            <Avatar alt="Remy Sharp" src={item.photo} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                        </Grid>)
                                                )}                                   
                                                <Grid item xs={9}container justify="center" >
                                                    <label className="trtxt"> {this.props.candidateList.length} candidates </label>
                                                </Grid>
                                            </Grid>
                                        </Grid>                                            
                                    </div>
                                    
                                </CardContent>
                            </Card>                        
                            <Card className="reportCardView">
                                <CardContent style={{display: 'flex'}}>                                
                                    <Avatar className="middle" alt="Sharp" src={this.props.candidateList[(this.props.candidateList.findIndex(obj => obj.id===this.props.candidateId) + 1) >= this.props.candidateList.length ? 0 : (this.props.candidateList.findIndex(obj => obj.id===this.props.candidateId) + 1)].photo} style={{width: 50, height: 50 }} />
                                    <div >
                                        <div className="h3txt">Next Candidate</div>
                                        <div className="h2txt">{this.props.candidateList[(this.props.candidateList.findIndex(obj => obj.id===this.props.candidateId) + 1) >= this.props.candidateList.length ? 0 : (this.props.candidateList.findIndex(obj => obj.id===this.props.candidateId) + 1)].name}</div>
                                    </div>
                                    <Button className="trainAvatar" onClick={() => this.onNextCan(this.props.candidateList[(this.props.candidateList.findIndex(obj => obj.id===this.props.candidateId) + 1) >= this.props.candidateList.length ? 0 : (this.props.candidateList.findIndex(obj => obj.id===this.props.candidateId) + 1)].id)} style={{fontSize: '10px', margin: 'auto', borderRadius: '15px', color: '#00B187', border: '1px solid #00B187', backgroundColor: '#F2FBF9', padding: 2 }}>
                                        View
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="rightdiv">
                            {
                                this.props.train_all_results.map((item) =>
                                    (this.props.trainId === item.training) && (
                                        item.session_results.map((session) =>
                                            session.scores.length !== 0 &&
                                            <SessionView session={session} key={session.id} tags={item.tags}/>
                                        )
                                    )
                                )
                            } 
                            
                            <Paper style={{marginBottom: 20, backgroundColor: '#FF475B'}}>
                                <label style={{fontSize: 16, fontWeight: 600, color: '#fff', padding: '12px',margin: 0, marginLeft: '30px'}}> Aggregate Scores </label>
                                    <div className="tableWrapper">
                                        {
                                            this.props.train_all_results[this.props.train_all_results.findIndex(obj => obj.training===this.props.trainId)].tags.map((item, index) =>
                                                <div className="row" style={{ margin: 'auto', marginBottom: '10px'}} key={index}>
                                                    <div className="col-lg-2 right" style={{padding: 0, fontSize: '12px', textAlign: 'right', color: '#fff'}}>{item.label}</div>
                                                    <div className="col-lg-9" style={{padding: 5}}>                                                
                                                        <ProgressBar variant="color9" now={this.props.train_all_results[this.props.train_all_results.findIndex(obj => obj.training===this.props.trainId)].scores[index]} label={`${60}%`} srOnly style={{borderRadius: '5px', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.4)'}} />
                                                    </div>
                                                    <div className="col-lg-1" style={{padding: 0, fontSize: '12px', color: '#fff'}}>{this.props.train_all_results[this.props.train_all_results.findIndex(obj => obj.training===this.props.trainId)].scores[index] !== undefined ? (this.props.train_all_results[this.props.train_all_results.findIndex(obj => obj.training===this.props.trainId)].scores[index]) : (0) }/100</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                <div style={{height: 25}} />                                                
                            </Paper>
                            
                        </div>
                    </div>
                </div>                
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
        train_all_results,
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
        train_all_results, 
    }
};


ReportsResultView = connect(mapStateToProps, mapDispatchToProps)(ReportsResultView)
export default ReportsResultView;