import React, {Component} from 'react';

import '../assets/css/bodypanel.css';

import { connect } from 'react-redux'
import { 
    trainReduxClean,
} from '../actions';

import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import UpdateAccount from '../components/UpdateAccount';

import Data from '../common/dataOrg';

class MyAccount extends Component {  
  constructor(props) {
    super(props) 
    this.state = {

    }
    this.props.trainReduxClean();
  }
  render() {   
    return (
      <div>
        <Header  menu={Data.menus[4]}  history={this.props.history} />
        <LeftPanel menus={Data.menus} selectTag={Data.menus[4].text} />
        <UpdateAccount />
      </div>
    );
  }
}
const mapDispatchToProps = { 
  trainReduxClean: trainReduxClean,
};
MyAccount = connect(null, mapDispatchToProps)(MyAccount)
export default MyAccount;
