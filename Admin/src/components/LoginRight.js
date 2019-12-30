import React, {Component} from 'react';
import {
    Card,
    CardContent,
    CardActions,
} from '@material-ui/core';

import profilephoto from '../assets/images/Loading.gif';

import {
    Form,
    Button,
    Alert,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { Login, getData } from '../actions';
import {
    LOGIN_START,
    LOGIN_SUCCESS,
    INIT_URL,
} from '../common/ActionTypes'

import '../assets/css/login.css';

class LoginRight extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorshow: false,
        }
    }

    componentDidUpdate() {
        if(this.props.loginstate === LOGIN_SUCCESS){
            this.props.getAllData();
            this.props.history.push(INIT_URL);
        }
    }

    login = () => {

        if (this.state.email === '' || this.state.password === ''){
            this.setState({errorshow: true})
            return;
        }
        var data = {
            email: this.state.email,
            password: this.state.password,
        } 
        this.setState({
            email: '',
            password: '',
        });
        this.props.login(data);
    }


    render() {

        if (this.props.loginstate === LOGIN_START)
            return (
                <div >
                    <img
                        src={profilephoto}
                        alt="user"
                        className="loading-circle"
                        width="26"
                        style={{position: 'absolute', left: '50%', top: '43%'}}
                    />
                </div>
            )
        return (
            <div className="loginRight" >
                <div className="logindiv" >
                    <Card className="loginCard">
                        <CardContent>
                            <Form >
                                <label className="logintitle"  >Administrator Login</label>
                                <br />
                                <label className="logintitletxt"  >Please enter your login credentials below</label>
                                {(this.state.errorshow || this.props.errorMessage !== '') && (
                                    <Alert  variant="danger" style={{width: '95%', margin: '10px'}} >
                                        Input email and password correctly!
                                    </Alert>
                                )}                                                                           
                                <Form.Group controlId="formLoginEmail" className="formlogin" >
                                    <Form.Control type="email" placeholder="Email address" className="logintxt" onChange={(event) => this.setState({email: event.target.value, errorshow: false})} />
                                </Form.Group>
                                <Form.Group controlId="formLoginPassword" className="formlogin" >
                                    <Form.Control type="password" placeholder="Password" className="logintxt" 
                                        onChange={(event) => this.setState({password: event.target.value, errorshow: false})}
                                        onKeyDown={(event)=>{
                                            if(event.keyCode === 13){
                                                this.login()
                                            }
                                        }} 
                                    />
                                </Form.Group>
                                <Button className="loginbnt" onClick={this.login}>
                                    Login
                                </Button>
                            </Form>
                        </CardContent>                        
                        <CardActions className="bottomcard">
                            <div style={{display: 'flex'}}>
                                <p className="bottomlabel" >This is the administration platform for GatherSense. Please read the 
                                <strong className="bottomlabelred" > Terms </strong>
                                and 
                                <strong className="bottomlabelred" > Privacy Policy </strong>
                                before using the platform.</p>
                            </div>
                        </CardActions>
                    </Card>
                </div>
            </div>            
        );
    }
}

const mapDispatchToProps = { 
    login: Login,
    getAllData: getData,
};
const mapStateToProps = ({Auth}) => {
    let {loginstate, errorMessage} = Auth;
    return {loginstate, errorMessage}
};

LoginRight = connect(mapStateToProps,mapDispatchToProps)(LoginRight);
export default LoginRight;
