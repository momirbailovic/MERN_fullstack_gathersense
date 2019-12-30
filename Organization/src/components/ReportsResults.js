import React, {Component } from 'react';
import {
    Paper, 
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    //TablePagination,
    TableRow,
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
import { 
    addClose,
    getTrain_result,
    getAllResults,
} from '../actions';

import {getAbbr} from '../common/Functions';

import '../assets/css/bodypanel.css';
import '../assets/css/Tranining.css';
import profilephoto from '../assets/images/default_image.png';

const columns = [
  { id: 'candidate', label: 'TRAININGS', minWidth: 70 },
  { id: 'aggregatescore', label: 'AGGREGATE SCORE', minWidth: 300 },
  {
    id: 'action',
    label: 'ACTIONS',
    minWidth: 70,
    align: 'right',
    format: value => value.toLocaleString(),
  },
];


class ReportsResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,  
            candidateId: '',  
        }
    }


    onViewResult = (id) => {
        this.setState({candidateId: id});
        var trainId = this.props.trainId;
        var candidateId = id;
        var data = {
            trainId: trainId,
            candidateId: candidateId,
            photo:  this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===id)].photo,
            name:  this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===id)].name,
            department:  this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===id)].department,
        }
        this.props.getTrain_result(data, this.CBGetTrainRes);
    }

    CBGetTrainRes = (train_result) => {
        this.props.getAllResults(this.state.candidateId, this.CBGetAllResults)
    }
    
    CBGetAllResults = (data) => {
        console.log(data);
        this.props.changeFlag(2);
    }
    
    render() {

        return (
            <div className="Rcontainer">
                <div className="container" >
                    <Grid className="root" container justify="center" >
                        <Grid item xs={12} sm={3} xd={3} lg={3} container justify="center" >
                            <Card className="train1Cardresult">
                                <CardContent>
                                    <div style={{float: 'right', marginRight: '10px', height: 30}}>
                                        
                                    </div>                                       
                                    <br />
                                    <Avatar className="trainAvatar" style={{backgroundColor: this.props.color, width: 80, height: 80, fontSize: '40px'}}>{getAbbr(this.props.title)}</Avatar>
                                    <div className="h2txt"> {this.props.title} </div>
                                    <div style={{margin: '5px', alignItems: 'center', textAlign: 'center', verticalAlign: 'middle'}}>
                                        {
                                            this.props.tags.map((item, index) => (
                                                <Button key={index} style={{fontSize: '10px', margin: '5px', borderRadius: '15px', color: item.color, border: '1px solid ' + item.color, padding: 3}}>
                                                    {item.label}
                                                </Button>
                                            ))
                                        }
                                    </div>
                                    <div className="h3txtb" disabled>{this.props.description}</div>
                                    <Divider style={{marginTop: '25px'}}/>
                                    <div className="divCard">
                                        <Grid item xs={12} space={9}>
                                            <Grid container justify="center"  space={9} >
                                                {
                                                    this.props.chkedCanData.slice(0,3).map((value, index) => 
                                                        this.props.candi_data.map((item) =>
                                                        (item.id === value) &&
                                                        (<Grid item xs={1}container justify="center" key={item.id} space={9}>
                                                            {
                                                                (this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo === undefined ||
                                                                this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo === null) ?(
                                                                    <Avatar alt="Remy Sharp" src={profilephoto} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                                ) : (
                                                                    <Avatar alt="Remy Sharp" src={this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                                )
                                                            }
                                                        </Grid>)
                                                ))}                                   
                                                <Grid item xs={9}container justify="center" >
                                                    <label className="trtxt"> {this.props.chkedCanData.length} candidates </label>
                                                </Grid>
                                            </Grid>
                                        </Grid>                                            
                                    </div>
                                    
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={9} xd={9} lg={9} container justify="center" >                        
                            <Paper className="tableroot" style={{margin: 0, marginBottom: 20}}>
                                <div className="tableWrapper">
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                            {columns.map(column => (
                                                <TableCell
                                                key={column.id}
                                                align={'center'}
                                                style={{ minWidth: column.minWidth }}
                                                >
                                                {column.label}
                                                </TableCell>
                                            ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                this.props.candidateList.map((item, index) =>{
                                                    var progressValue = 0;
                                                    var i = 0;
                                                    for (; i < this.props.trainingresultList[index].scores.length; i++){
                                                        progressValue += this.props.trainingresultList[index].scores[i];
                                                    }
                                                    if (i !== 0 )
                                                        progressValue /= i;
                                                    return (
                                                        this.props.trainingresultList[index].scores.length !== 0 &&
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                                                            <TableCell style={{padding: 0, paddingLeft: 15}}>
                                                                <div className="divCard">
                                                                    <Avatar alt="Remy Sharp" src={item.photo} style={{width: 35, height: 35, border: '2px solid #fff'}} />
                                                                    <label className="trtxt"> {item.name} </label>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell style={{padding: 0}} >
                                                                <div className="divCard">
                                                                    <div className="col-lg-10" style={{padding: 5}}>
                                                                        <ProgressBar variant="warning" now={progressValue} label={`${progressValue}%`} srOnly style={{borderRadius: '5px', height: '8px'}} />
                                                                    </div>
                                                                    <div className="col-lg-2" style={{padding: 0, fontSize: '12px', float: 'right'}}>{progressValue} %</div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell align="right" style={{padding: 0, paddingRight: 15}}>
                                                                <Button onClick={() => this.onViewResult(item.id)} style={{fontSize: '12px', marginLeft: '15px', borderRadius: '30px', color: '#009FFA', backgroundColor: 'rgba(0, 159, 250, 0.1)', borderWidth: '0px'}}> 
                                                                    View Result 
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </div>                    
                            </Paper>
                        </Grid>
                    </Grid>
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
        title,
        color,
        description,
        sessionIDs,
        tags,
        chkedCanData,
        candidateList,
        trainingresultList,
    } = Train;
    return {
        addopen,
        candi_data,
        train_data,
        trainId,
        title,
        color,
        description,
        sessionIDs,
        tags,
        chkedCanData,
        candidateList, 
        trainingresultList,       
    }
};


ReportsResults = connect(mapStateToProps, mapDispatchToProps)(ReportsResults)
export default ReportsResults;