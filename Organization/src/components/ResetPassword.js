import React, {Component} from 'react';
import {
    Card,
    CardContent,
} from '@material-ui/core';

import {
    Form,
    Button,
    Alert,
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { resetPW, RESETsendemailstate } from '../actions';
import {
    GOTO_LOGIN_URL,
    RESETPW_FAILED,
} from '../common/ActionTypes'

import { Link } from 'react-router-dom';

import '../assets/css/login.css';

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: this.props.email,
            digit6Num: '',
            new_pw: '',
            confirm_pw: '',
            errorshow: false,
        }
    }

    onChangeTxt = (event) => {

        this.setState({
            digit6Num: event.target.value, 
            errorshow: false
        })
        this.props.RESETsendemailstate();
    }

    resetPassword = () => {

        if (this.state.new_pw === '' || this.state.confirm_pw === '' || this.state.new_pw !== this.state.confirm_pw){
            this.setState({
                new_pw: '',
                confirm_pw: '',
                errorshow: true
            })
            return;
        }
        var data = {
            pin: this.state.digit6Num,
            password: this.state.new_pw,
        } 

        this.props.resetPW(data, this.CBResetPW);
    }

    CBResetPW = (data) => {
        if (data.email === this.state.email){
            this.props.history.push(GOTO_LOGIN_URL);
            this.props.onChangeShow(0);
        }
    }

    render() {
        return (
            <div className="forget" >
                <div className="middle" >
                    <div className="forgetlogoimg">
                        <svg width="242" height="48" viewBox="0 0 242 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M73.6258 22.2023H62.7398V26.3087H68.2872C68.2872 29.1855 65.8268 30.8326 63.1576 30.8326C59.8616 30.8326 57.1923 27.5383 57.1923 23.4551C57.1923 19.372 59.8616 16.0776 63.1576 16.0776C65.2001 16.0776 67.057 16.8896 68.4961 19.1632L71.9778 15.2656C69.9352 12.8064 67.057 11.1592 62.9487 11.1592C56.3799 11.1592 51.4591 16.704 51.4591 23.4783C51.4591 30.2527 56.5888 35.7974 62.9487 35.7974C67.6605 35.7974 72.6045 33.3382 73.8347 27.1671V22.2023H73.6258ZM74.856 28.1647C74.856 32.4798 77.9431 35.9598 82.2372 35.9598C84.2798 35.9598 85.9278 35.1478 87.158 33.9182V35.5654H92.2876V20.7639H87.158V22.2023C85.9278 20.9727 84.2798 20.3464 82.2372 20.3464C77.9431 20.3464 74.856 23.8495 74.856 28.1647ZM80.4035 28.1647C80.4035 26.1231 81.8426 24.6847 83.8852 24.6847C85.7421 24.6847 87.3669 26.1231 87.3669 28.1647C87.3669 30.2063 85.9278 31.6446 83.8852 31.6446C81.6337 31.6446 80.4035 30.2063 80.4035 28.1647ZM96.2103 20.7639H94.1677V24.6615H96.2103V30.4151C96.2103 33.083 97.2316 35.9598 101.34 35.9598C103.383 35.9598 105.031 34.939 105.031 34.939L103.8 30.8326C103.8 30.8326 103.174 31.2502 102.57 31.2502C101.758 31.2502 101.34 30.6238 101.34 29.2087V24.4991H104.427V20.5552H101.34V15.0104H96.2103V20.7639ZM106.887 35.5422H112.017V27.1207C112.017 25.6823 113.456 24.2439 115.104 24.2439C116.752 24.2439 117.774 25.6823 117.774 27.1207V35.5422H122.903V25.8911C122.903 21.7847 119.213 20.3464 116.334 20.3464C114.686 20.3464 113.247 21.1583 112.226 22.3879V10.9272H107.096V35.5422H106.887ZM140.776 28.7679V28.1415C140.776 23.0143 137.294 20.3464 132.768 20.3464C128.242 20.3464 124.76 23.8263 124.76 28.1415C124.76 32.4566 128.451 35.9366 132.768 35.9366C136.064 35.9366 138.733 34.9158 140.358 32.039L136.667 30.1831C135.437 31.4126 134.625 31.8302 132.977 31.8302C131.747 31.8302 129.681 31.0182 129.681 28.7447H140.776V28.7679ZM130.099 26.0999C130.099 24.6615 131.12 23.6407 132.977 23.6407C134.416 23.6407 135.437 24.4527 135.855 26.0999H130.099ZM143.027 35.5422H148.157V27.7471C148.157 27.3295 148.575 24.6615 151.244 24.6615C152.892 24.6615 153.913 25.4735 153.913 25.4735L155.956 21.1583C155.956 21.1583 154.726 20.1376 152.66 20.1376C149.782 20.1376 148.134 22.5967 148.134 22.5967V20.5552H143.004V35.5422H143.027ZM166.239 11.3216C162.339 11.3216 158.44 14.1984 158.44 18.5136C158.44 20.9727 160.088 23.2231 162.966 24.6615C165.844 26.0999 168.304 26.9119 168.304 28.5591C168.304 30.8094 166.053 30.8094 164.823 30.8094C162.153 30.8094 159.066 28.1415 159.066 28.1415L156.397 32.6654C156.397 32.6654 159.693 35.751 165.217 35.751C169.929 35.751 174.246 33.7094 174.246 28.1647C174.246 25.0791 171.368 22.8287 168.699 21.8079C166.03 20.5784 163.778 19.7664 163.778 18.328C163.778 17.0984 164.799 16.2864 166.656 16.2864C169.117 16.2864 171.368 17.9336 171.368 17.9336L173.62 13.6184C173.411 13.5952 170.533 11.3216 166.239 11.3216ZM191.678 28.7679V28.1415C191.678 23.0143 188.196 20.3464 183.879 20.3464C179.353 20.3464 175.871 23.8263 175.871 28.1415C175.871 32.4566 179.562 35.9366 183.879 35.9366C187.175 35.9366 189.821 34.9158 191.469 32.039L187.779 30.1831C186.548 31.4126 185.922 31.8302 184.088 31.8302C182.858 31.8302 181.001 31.0182 181.001 28.7447H191.678V28.7679ZM181.001 26.0999C181.001 24.6615 182.022 23.6407 183.879 23.6407C185.318 23.6407 186.339 24.4527 186.757 26.0999H181.001ZM193.953 35.5422H199.082V27.1207C199.082 25.6823 200.522 24.2439 202.17 24.2439C203.818 24.2439 204.839 25.6823 204.839 27.1207V35.5422H209.968V25.8911C209.968 21.7847 206.278 20.3464 203.4 20.3464C201.752 20.3464 200.313 21.1583 199.082 22.3879V20.7407H193.953V35.5422ZM219.207 20.3464C215.307 20.3464 212.847 21.9935 212.847 25.0559C212.847 27.3063 214.286 28.3503 215.934 29.1623C217.582 29.9743 219.23 30.1831 219.23 31.2038C219.23 32.2246 218.417 32.2246 217.582 32.2246C215.934 32.2246 213.891 30.5775 213.891 30.5775L211.849 34.0574C211.849 34.0574 213.891 36.099 217.605 36.099C220.692 36.099 224.592 35.4726 224.592 30.9718C224.592 27.8863 222.131 26.8655 220.065 26.2623C218.835 25.8447 217.814 25.6359 217.814 24.8239C217.814 24.1975 218.232 24.0119 219.462 24.0119C221.11 24.0119 222.758 25.0327 222.758 25.0327L224.406 21.7383C224.127 21.3903 222.085 20.3464 219.207 20.3464ZM242 28.7679V28.1415C242 23.0143 238.518 20.3464 234.201 20.3464C229.675 20.3464 226.193 23.8263 226.193 28.1415C226.193 32.4566 229.884 35.9366 234.201 35.9366C237.497 35.9366 240.166 34.9158 241.791 32.039L238.1 30.1831C236.87 31.4126 236.058 31.8302 234.41 31.8302C233.18 31.8302 231.114 31.0182 231.114 28.7447H242V28.7679ZM231.323 26.0999C231.323 24.6615 232.344 23.6407 234.201 23.6407C235.64 23.6407 236.661 24.4527 237.079 26.0999H231.323Z" fill="#FF475B"/>
                            <path d="M30.2906 38.9524H7.05621V33.3845C2.66929 29.8581 0 24.383 0 18.7222C0 8.35192 8.35603 0 18.7314 0C29.1069 0 37.4629 8.35192 37.4629 18.7222C37.4629 24.499 34.7936 29.8581 30.4067 33.3845V38.9524H30.2906ZM12.418 33.5933H24.952V30.6005L26.1358 29.8581C29.8728 27.3989 32.0315 23.223 32.0315 18.7222C32.0315 11.3447 26.043 5.35915 18.7547 5.35915C11.4663 5.35915 5.36179 11.3447 5.36179 18.7222C5.36179 23.223 7.61328 27.2829 11.2574 29.8581L12.4412 30.6005V33.5933H12.418Z" fill="#FF475B"/>
                            <path d="M28.9908 41.7363H8.44885V47.0955H28.9908V41.7363Z" fill="#FF475B"/>
                            <path d="M20.5427 25.5671L16.8057 20.8575L13.0687 23.9663L9.63342 19.7904L17.5484 13.364L21.4015 18.0736L25.3706 15.0808L28.5738 19.2568L20.5427 25.5671Z" fill="#F2D64B"/>
                        </svg>
                    </div>
                    <Card className="loginCard"  style={{marginBottom: '250px'}} >
                        <CardContent>
                            <Form>
                                <label className="logintitle">Reset Password</label>
                                <br />
                                <label className="resetPWtitletxt"  >Please check your email for the Verification Code.</label>
                                <label className="resetPWtitletxt"  >Enter Your Verification PIN Below:</label> 
                                <Form.Group controlId="formN6Digital" className="formlogin" style={{display: 'flex'}}>
                                    <Form.Control type="text" placeholder="6 Digit PIN" className="digitalNumtxt" 
                                        value={this.state.digit6Num}
                                        onChange={(event) => this.onChangeTxt(event)}
                                    />
                                    {
                                        this.props.resetpwstate === RESETPW_FAILED && <label className="digitErrortxt"  >Incorrect PIN</label>
                                    }
                                    
                                </Form.Group>                                          
                                {(this.state.errorshow) && (
                                    <Alert  variant="danger" style={{width: '95%', margin: '10px'}} >
                                        Input password correctly!
                                    </Alert>
                                )}
                                
                                <label className="logintitletxt"  >Enter your new password below</label>      
                                <Form.Group controlId="formNPassword" className="formlogin" >
                                    <Form.Control type="password" placeholder="New Password" className="logintxt" 
                                        value={this.state.new_pw}
                                        onChange={(event) => this.setState({new_pw: event.target.value, errorshow: false})}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCPassword" className="formlogin" >
                                    <Form.Control type="password" placeholder="Confirm Password" className="logintxt" 
                                        value={this.state.confirm_pw}
                                        onChange={(event) => this.setState({confirm_pw: event.target.value, errorshow: false})}
                                    />
                                </Form.Group>
                                <Button className="loginbnt"  onClick={this.resetPassword}>
                                    Update Password
                                </Button>
                                <Link to="#" onClick={() => this.props.onChangeShow(0, '')}   style={{float: 'right', margin: '20px'}}> Login </Link>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>            
        );
    }
}

const mapDispatchToProps = { 
    resetPW: resetPW,
    RESETsendemailstate: RESETsendemailstate,
};
const mapStateToProps = ({Auth}) => {
    const {resetpwstate} = Auth;
    return {resetpwstate}
};

ResetPassword = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
export default ResetPassword;