import React, {Component} from 'react';

import '../assets/css/bodypanel.css';

import { connect } from 'react-redux'
import { 
    trainReduxClean,
    getData,
} from '../actions';
import {
  GET_DATA_SUCCESS
} from '../common/ActionTypes'
import loadphoto from '../assets/images/Loading.gif';
import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import CandiRP from '../components/CandiRP';

import Data from '../common/dataOrg';

class Candidates extends Component {  
  constructor(props) {
    super(props) 
    this.state = {

    }
    this.props.trainReduxClean();
    this.props.getAllData();
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
        <Header menu={Data.menus[2]} history={this.props.history} />
        <LeftPanel menus={Data.menus} selectTag={Data.menus[2].text} />
        <CandiRP history={this.props.history} />
      </div>
    );
  }
}
const mapDispatchToProps = { 
  trainReduxClean: trainReduxClean,
  getAllData: getData,
};
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
Candidates = connect(mapStateToProps, mapDispatchToProps)(Candidates)
export default Candidates;
