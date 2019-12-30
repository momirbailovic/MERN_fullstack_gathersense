import React, {Component } from 'react';
import {
    Paper, 
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Avatar,
    Grid,
} from '@material-ui/core';


import { connect } from 'react-redux'
import { 
    getCandidateList,
    getTrainResultList,
} from '../actions';

import {getAbbr} from '../common/Functions';

import '../assets/css/bodypanel.css';
import '../assets/css/Tranining.css';
import profilephoto from '../assets/images/default_image.png';

const columns = [
  { id: 'trainings', label: 'TRAININGS', minWidth: 200 },
  { id: 'candidates', label: 'CANDIDATES', minWidth: 150 },
  {
    id: 'action',
    label: 'ACTIONS',
    minWidth: 300,
    align: 'right',
    format: value => value.toLocaleString(),
  },
];

class ReportsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,           
            open: false,
            selectTrainingID: '',
        }
    }

    onVewResults(id) {

        var index = this.props.train_data.findIndex(obj => obj.id===id);
        this.setState({selectTrainingID: id});
        var data = {
            id: this.props.train_data[index].id,
            title: this.props.train_data[index].title,
            color: this.props.train_data[index].color,
            description: this.props.train_data[index].description,
            sessions: this.props.train_data[index].sessions,
            tags: this.props.train_data[index].tags,
            candidates: this.props.train_data[index].candidates,
        }
        this.props.getCandidateList(data, this.CBgetTrainingsResultList);
    }

    CBgetTrainingsResultList = (data) => {
        this.props.getTrainResultList(this.state.selectTrainingID, this.CBgetTrainResults);
    }

    CBgetTrainResults = (data) => {
        this.props.changeFlag(1);
    }

    render() {

        return (
            <div className="Rcontainer">
                <div className="container" >
                    <Paper className="tableroot">
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
                                            this.props.train_data.map((data, index) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                                                    <TableCell >
                                                        <div className="divCard">
                                                            <Avatar style={{backgroundColor: data.color, width: 30, height: 30}}>{getAbbr(data.title)}</Avatar>
                                                            <label className="trtxt"> {data.title} </label>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell >
                                                        <div className="divCard">
                                                            <Grid item xs={12} space={9}>
                                                                <Grid container justify="center"  space={9} >
                                                                    {
                                                                        data.candidates.slice(0,3).map((value, index) => 
                                                                        (
                                                                            <Grid item xs={1}container justify="center" key={value} space={9}>
                                                                                {
                                                                                    (this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo === undefined ||
                                                                                    this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo === null) ?(
                                                                                        <Avatar alt="Remy Sharp" src={profilephoto} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                                                    ) : (
                                                                                        <Avatar alt="Remy Sharp" src={this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                                                    )
                                                                                }
                                                                            </Grid>
                                                                        )
                                                                    )}                                   
                                                                    <Grid item xs={9}container justify="center" >
                                                                        <label className="trtxts"> {data.candidates.length} candidates </label>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Button onClick={() => this.onVewResults(data.id)} style={{marginLeft: '14px', borderRadius: '30px', color: '#009FFA', backgroundColor: 'rgba(0, 159, 250, 0.1)', borderWidth: '0px'}}> 
                                                            View Results 
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>                                    
                                            ))
                                        }
                                </TableBody>
                            </Table>
                        </div>                    
                    </Paper>
                </div>                
          </div>
        );
    }
}

const mapDispatchToProps = {
    getCandidateList: getCandidateList,
    getTrainResultList: getTrainResultList,
}

const mapStateToProps = ({Normal}) => {
    const {
        train_data,
        candi_data,
    } = Normal;
    return {
        train_data,
        candi_data,
    }
};


ReportsView = connect(mapStateToProps, mapDispatchToProps)(ReportsView)
export default ReportsView;