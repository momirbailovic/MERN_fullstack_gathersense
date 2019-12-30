import React, {Component} from 'react';

import '../assets/css/bodypanel.css';

import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import Overview from '../components/Overview';

import loadphoto from '../assets/images/Loading.gif';

import { connect } from 'react-redux';
import { 
    trainReduxClean,
} from '../actions';
import {
    GET_DATA_SUCCESS
} from '../common/ActionTypes'

import Data from '../common/dataOrg';

class Dashboard extends Component {  
  constructor(props) {
    super(props) 
    this.state = {

    }
    this.props.trainReduxClean();
  }
  render() { 
    if (this.props.getstate !== GET_DATA_SUCCESS || this.props.candi_data === undefined || this.props.train_data === undefined){
        return (
            <div >
                <img
                    src={loadphoto}
                    alt="user"
                    className="loading-circle"
                    width="26"
                    style={{position: 'absolute', left: '50%', top: '43%'}}
                />
            </div>    
        )
    }    
    return (
        <div>
            <Header  menu={Data.menus[0]}  history={this.props.history} />
            <LeftPanel menus={Data.menus} selectTag={Data.menus[0].text} />
            <Overview  history={this.props.history} />
        </div>
    );
  }
}

const mapStateToProps = ({Normal}) => {
  const {
      getstate,
      candi_data,
      train_data
  } = Normal;
  return {
      getstate,
      candi_data,
      train_data
  }
};
const mapDispatchToProps = { 
  trainReduxClean: trainReduxClean,
};
Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default Dashboard;