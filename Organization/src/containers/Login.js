import React, {Component} from 'react';

import '../assets/css/bodypanel.css';

import LoginLeft from '../components/LoginLeft';
import LoginRight from '../components/LoginRight';

import ForgetPassword from '../components/ForgetPassword';
import ResetPassword from '../components/ResetPassword';

class Login extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            showState: 0,
            email: '',
        }
    }

    onChangeShow = (showKey, value) => {
        this.setState({
            showState: showKey,
            email: value,
        })
    }
  
    render() {   
        return (
            <div>
                {
                    this.state.showState === 0 && (
                        <div>
                            <LoginLeft />
                            <LoginRight  history={this.props.history} onChangeShow={this.onChangeShow}  />
                        </div>
                    )
                }
                {
                    this.state.showState === 1 && (
                        <ForgetPassword history={this.props.history}  onChangeShow={this.onChangeShow} />
                    )
                }
                {
                    this.state.showState === 2 && this.state.showState !== '' && (
                        <ResetPassword history={this.props.history} email={this.state.email} onChangeShow={this.onChangeShow} />
                    )
                }
            </div>
           
        );
    }
}

export default Login;
