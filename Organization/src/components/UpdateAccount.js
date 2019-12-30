import React, {Component} from 'react';
import {
    Card, 
    CardContent,
    Avatar,
} from '@material-ui/core';

import {
    Form,
    Button,
    Alert,
} from 'react-bootstrap';

import '../assets/css/updateaccount.css';
import '../assets/css/bodypanel.css';

import { connect } from 'react-redux'
import { 
    editOrgan,
    setUserName,
} from '../actions';


class UpdateAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedId: localStorage.getItem('GSOuserId'),
            organ_name: localStorage.getItem('GSOuserName'),
            new_email: localStorage.getItem('GSOuserEmail'),
            descr: localStorage.getItem('GSOuserDescription'),
            file: null,
            new_pw: '',
            errorshow: '',
            successshow: '',
        }
    }

    callback = () => {
        this.props.setusername(this.state.organ_name);
    }

    onChange = (e) => {
        this.setState({file:e.target.files[0]})
    }

    validateEmail = (email) => {
        var re = /\S+@\S+.\S+\S/;
        return re.test(email);
    }

    onEditUpdata = () => {
        if (this.state.selectedId === '' || 
            this.state.organ_name === '' ||
            this.state.new_email === '' ||
            this.state.descr === ''
        ){
            this.setState({errorshow: true})
            return;
        }
        
        if (!this.validateEmail(this.state.new_email)){
            this.setState({errorshow: true})
            return;
        }
        const formData = new FormData();

        formData.append("id",this.state.selectedId);
        formData.append("name",this.state.organ_name);
        formData.append("email",this.state.new_email);
        formData.append("description",this.state.descr);
        if (this.state.new_pw !== '')
            formData.append("password",this.state.new_pw);
        if (this.state.file)
            formData.append("image",this.state.file);

        this.props.editorgan(formData, this.callback);
        this.handleClose();
    }

    handleClose = () => {
        this.setState({
            new_pw: '',
            errorshow: false,
            successshow: true,
        })
    }

    render() {
        return (
            <div className="Rcontainer" >
                <div className="container">
                    <Card className="updatecard">
                        <CardContent>
                            <Form>
                                {this.state.errorshow && (
                                    <Alert  variant="danger" style={{width: '95%', margin: '10px'}} >
                                        Input information correctly!
                                    </Alert>
                                )}                            
                                {this.state.successshow && (
                                    <Alert  variant="success" style={{width: '95%', margin: '10px'}} >
                                        Update Success!
                                    </Alert>
                                )}
                                <Form.Row className="formgroupO" >
                                    <input
                                        accept="image/*"
                                        ref="file"
                                        style={{display: 'none'}}
                                        id="outlined-button-file"
                                        multiple
                                        type="file"
                                        onChange={this.onChange}
                                    />
                                    {this.state.file === null ? (
                                        <label htmlFor="outlined-button-file">
                                            <Avatar alt="Remy Sharp" src={localStorage.getItem('GSOuserPhoto')} style={{width: 65, height: 65, border: '2px solid #fff'}} />
                                        </label>
                                    ) : (
                                        <label htmlFor="outlined-button-file">
                                            <Avatar alt="Remy Sharp" src={URL.createObjectURL(this.state.file)} style={{width: 65, height: 65, border: '2px solid #fff'}} />
                                        </label>
                                    )}                                
                                    <div style={{paddingLeft: '20px'}}>
                                        <p style={{margin: '2px', color: '#FF475B', fontSize: '16px', fontWeight: 'bold'}} >Update a Logo</p>
                                        <p style={{margin: '2px', color: '#979797', fontSize: '12px'}} >(Square Images Only)</p>
                                    </div>
                                </Form.Row> 
                                {/* <Form.Row className="formgroupO" >
                                        <Avatar alt="Remy Sharp" src={d7} style={{width: 60, height: 60}} />                                
                                    <div style={{paddingLeft: '20px'}}>
                                        <p style={{margin: '2px', color: '#FF475B', fontSize: '16px', fontWeight: 'bold'}} >Update a Logo</p>
                                        <p style={{margin: '2px', color: '#979797', fontSize: '12px'}} >(Square Images Only)</p>
                                    </div>
                                </Form.Row>  */}
                                <Form.Group controlId="formGridDescription" className="formgroup" >
                                    {/* <Form.Label>Address</Form.Label> */}
                                    <Form.Control placeholder="FullName" className="inputtxt" value={this.state.organ_name} onChange={(event) => this.setState({organ_name: event.target.value, successshow: false})} />
                                </Form.Group>
                                {/* <Form.Group controlId="formGridState" className="formgroup">
                                    <Form.Control as="select" className="inputtxt" >
                                        <option value="">Category</option>
                                        <option value={10}>Ten</option>
                                        <option value={20}>Twenty</option>
                                        <option value={30}>Thirty</option>
                                    </Form.Control>
                                </Form.Group> */}
                                <Form.Group controlId="formDescription" className="formgroup" >
                                    {/* <Form.Label>Address</Form.Label> */}
                                    <Form.Control placeholder="Description" className="inputtxt" value={this.state.descr} onChange={(event) => this.setState({descr: event.target.value, successshow: false})} />
                                </Form.Group>                                        
                                <Form.Group controlId="formGridEmail" className="formgroup" >
                                    {/* <Form.Label>Email</Form.Label> */}
                                    <Form.Control type="email" placeholder="Email address" className="inputtxt" value={this.state.new_email} onChange={(event) => this.setState({new_email: event.target.value, successshow: false})} />
                                </Form.Group>

                                <Form.Group controlId="formGridPassword" className="formgroup" >
                                    <Form.Control type="password" placeholder="Password" className="inputtxt"  value={this.state.new_pw} onChange={(event) => this.setState({new_pw: event.target.value, successshow: false})} />
                                </Form.Group>                    

                                <Button className="updatebnt" onClick={this.onEditUpdata} >
                                    Update Account
                                </Button>
                            </Form>
                        </CardContent>
                    </Card>
                </div>    
            </div>            
        );
    }
}

const mapDispatchToProps = { 
    editorgan: editOrgan,
    setusername: setUserName,
};
UpdateAccount = connect(null, mapDispatchToProps)(UpdateAccount)
export default UpdateAccount 
