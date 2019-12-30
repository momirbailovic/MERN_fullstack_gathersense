import React, {Component} from 'react';

import '../assets/css/bodypanel.css';

import { connect } from 'react-redux'
import { 
    trainReduxClean, 
} from '../actions';

import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import TrainingTable from '../components/TrainingTable';
import TrainingCreate from '../components/TrainingCreate';

import loadphoto from '../assets/images/Loading.gif';

import Data from '../common/dataOrg';

class Trainings extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            showState: 0,
        }
        this.props.trainReduxClean();
    }

    onChangeShowState = (showKey) => {
        this.setState({
            showState: showKey,
        })
    }

    render() {   
        if (this.props.train_data === undefined || this.props.candi_data === undefined)
            return <div>                 
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
                
                {
                    this.state.showState === 0 ? <Header menu={Data.menus[1]}  history={this.props.history}/> : <Header menu={Data.menus[1]}  history={this.props.history} addshow={0}  />
                }
                <LeftPanel menus={Data.menus} selectTag={Data.menus[1].text} />
                {
                    this.state.showState === 0 && <TrainingTable history={this.props.history} onChangeShowState={this.onChangeShowState}/>
                }
                {
                    this.state.showState === 1 && <TrainingCreate history={this.props.history} onChangeShowState={this.onChangeShowState}/>
                }
                
            </div>
        );
    }
}

const mapDispatchToProps = {
    trainReduxClean: trainReduxClean,
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

Trainings = connect(mapStateToProps, mapDispatchToProps)(Trainings)
export default Trainings;