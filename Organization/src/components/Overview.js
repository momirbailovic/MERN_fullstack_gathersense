import React, {Component} from 'react';
import {
    Card, 
    Grid,
    Divider,
    Avatar,
    CardContent,
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    setReviewShowFlag,
    getCandidateList,
    getTrainResultList,
} from '../actions';
import {getAbbr} from '../common/Functions'

import '../assets/css/overview.css';
import '../assets/css/bodypanel.css';


class Overview extends Component {
  
    constructor(props) {
        super(props)
        this.state = {       
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
        this.props.setReviewShowFlag(1);
        this.props.history.push('/reports');
    }

    render() {
        return (
            <div className="Rcontainer" >
                <div className="container" >
                    <Grid container className="rootover" >
                        <Grid item xs={12} sm={6} xd={3} lg={3} container justify="center" style={{marginBottom: '20px'}} >
                            <Card className="overCard">
                                <CardContent>
                                    <div className="rounded-circle1over"> 
                                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule ="evenodd" htmlFor="evenodd" d="M2 0H12.4142L18 5.58579V20C18 21.1046 17.1046 22 16 22H2C0.89543 22 0 21.1046 0 20V2C0 0.89543 0.89543 0 2 0ZM10 2H2V20H16V8H12C10.8954 8 10 7.10457 10 6V2ZM12 2.41421V6H15.5858L12 2.41421ZM5 16V14H11V16H5ZM5 10V12H13V10H5Z" fill="#009FFA"/>
                                        </svg>
                                    </div>
                                    <div className="h2txtover">{this.props.train_data.length}</div>                                                                         
                                    <div className="h3txtover">Trainings</div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} xd={3} lg={3} container justify="center" style={{marginBottom: '20px'}} >
                            <Card className="overCard">
                                <CardContent>
                                    <div className="rounded-circle2over">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule ="evenodd" htmlFor="evenodd" d="M0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11ZM20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11ZM11.0321 18C7.67459 18 5.80643 16.2316 5.80643 13V12H16.1158L16.1434 12.9715C16.2358 16.2145 14.4003 18 11.0321 18ZM14.0875 14C13.8526 15.3955 12.9089 16 11.0321 16C9.15627 16 8.18179 15.3902 7.89677 14H14.0875ZM13 7H16V9H13V7ZM9 7H6V9H9V7Z" fill="#00B187"/>
                                        </svg>
                                    </div>
                                    <div className="h2txtover">{this.props.candi_data.length}</div>                                                                         
                                    <div className="h3txtover">Candidates</div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} xd={6} lg={6} container justify="center"  style={{marginBottom: '20px'}} >
                            <Card className="card2">
                                <CardContent>
                                    <label className="titleCardover"> Recent Trainings </label>
                                    {
                                        this.props.train_data.slice(this.props.train_data.length - 3, this.props.train_data.length).map((item) =>
                                            <div key={item.id}>
                                                <div className="betweendiv">
                                                    <div className="divCardover">
                                                        <Avatar style={{backgroundColor: item.color, width: 30, height: 30}}>{getAbbr(item.title)}</Avatar>
                                                        <label className="tranintxt"> {item.title} </label>
                                                    </div>
                                                    <Link to={'#'}  style={{marginTop: '10px', color: 'red'}} onClick={() => this.onVewResults(item.id)}> View Results </Link>
                                                </div>                                
                                                <Divider />
                                            </div>
                                        )
                                    }
                                </CardContent>
                            </Card>
                        </Grid>                            
                    </Grid>
                </div>
            </div>            
        );
    }
}

const mapDispatchToProps = {    
    setReviewShowFlag: setReviewShowFlag,
    getCandidateList: getCandidateList,
    getTrainResultList: getTrainResultList,
}

const mapStateToProps = ({Normal}) => {
  const {
      candi_data,
      train_data
  } = Normal;
  return {
      candi_data,
      train_data
  }
};
Overview = connect(mapStateToProps, mapDispatchToProps)(Overview)
export default Overview;
