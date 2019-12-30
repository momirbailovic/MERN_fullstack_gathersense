import React, {Component} from 'react';

import '../assets/css/bodypanel.css';

import { connect } from 'react-redux'
import { 
    getData,
    trainReduxClean,
} from '../actions';

import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import ReportsView from '../components/ReportsView';
import ReportsResults from '../components/ReportsResults';
import ReportsResultView from '../components/ReportsResultView';

import loadphoto from '../assets/images/Loading.gif';

import Data from '../common/dataOrg';

class Reports extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            showflag: this.props.reportShowFlag === undefined ? 0 : this.props.reportShowFlag,
        }
        //this.props.trainReduxClean();
    }

    changeFlag = (value) => {
        this.setState({showflag: value})
    }

    render() {   
        if (this.props.train_data === undefined || this.props.candi_data === undefined)
            return <div >                
                <div >
                    <img
                        src={loadphoto}
                        alt="user"
                        className="loading-circle"
                        width="26"
                        style={{position: 'absolute', left: '50%', top: '43%'}}
                    />
                </div>
            </div>
        return (
            <div>
                <Header menu={Data.menus[3]}  history={this.props.history}/>
                <LeftPanel menus={Data.menus} selectTag={Data.menus[3].text} />              
                {this.state.showflag === 0 && (<ReportsView history={this.props.history} changeFlag={this.changeFlag} />)}
                {this.state.showflag === 1 && (<ReportsResults history={this.props.history} changeFlag={this.changeFlag} />)}
                {this.state.showflag === 2 && (<ReportsResultView history={this.props.history} changeFlag={this.changeFlag} />)}
                
            </div>
        );
    }
}

const mapStateToProps = ({Normal, Train}) => {
    const {
        train_data,
        candi_data,
    } = Normal;
    const {
        reportShowFlag,
    } = Train;
    return {
        reportShowFlag,
        train_data,
        candi_data,
    }
};
const mapDispatchToProps = { 
    getAllData: getData,
    trainReduxClean: trainReduxClean,
};
Reports = connect(mapStateToProps, mapDispatchToProps)(Reports)
export default Reports;