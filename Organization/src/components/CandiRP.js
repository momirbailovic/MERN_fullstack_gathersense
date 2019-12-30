import React, {Component} from 'react';
import {
    Card, 
    CardContent,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide, 
    Button,
    Fab,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
} from '@material-ui/core';

import loadphoto from '../assets/images/Loading.gif';

import {
    Form,
    Col,
    Alert,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import { 
    addClose, 
    addNewCandidate,
    editCandidate,
    deleteCandidate,
    getData,
    setReviewShowFlag,
    getTrain_result,
    getCandidateList,
    getAllResults
,} from '../actions';
import StyledPopper from '../common/styledPopper';
import {getAbbr} from '../common/Functions'
import profilephoto from '../assets/images/default_image.png';
import '../assets/css/candirp.css';
import '../assets/css/bodypanel.css';

const columnsNew = [
    { id: 'name', label: 'Trainings', minWidth: 100 },
    { id: 'option', label: 'Select', minWidth: 300, align: 'right' },
];

const columnsResultView = [
    { id: 'name', label: 'Trainings', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
    { id: 'option', label: 'Actions', minWidth: 100, align: 'right' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class CandiRP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,  
            department: '',
            occupation: '',
            email: '',
            password: '',
            editopen: false,
            delopen: false,
            anchordot3: null,
            dot3open: false,
            arrowRef: null,

            viewResultopen: false,
            selectID: '',
            trainId: '',
            selectTraining: [],
            newCanOpen: false,
            new_name: '',
            new_department: '',
            new_occupation: '',
            new_email: '',
            new_password: '',
            file: null,
            chkCanOpen: false,
            chkedTrain: [],
        }
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.mouseUp);
    }

    mouseUp = () => {
        this.setState({
            anchordot3: null,
            dot3open: false,
        })
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.mouseUp);
    }

    handleClick = () => {
        
    }

    handleDot3 = (event, id) => {
        if (this.state.dot3open)
            this.setState({
                selectID: '',
                anchordot3: null,
                dot3open: false
            })
        else
            this.setState({
                anchordot3: event.currentTarget,
                dot3open: true,
                selectID: id,
            })
    };

    onDelDlg = () => {
        this.setState({
            dot3open: false,
            delopen: true,
        });
    };

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    onEditDlg = (id) => {
        var index = this.props.candi_data.findIndex(obj => obj.id===id);
        var chkedTrain = [];
        for (var i = 0; i < this.props.train_data.length; i++){
            if (this.props.train_data[i].candidates.includes(id))
                chkedTrain.push(this.props.train_data[i].id);
        }
        var data = this.props.candi_data[index];
        this.setState({
            editopen: true,
            anchordot3: null,
            dot3open: false,
            new_name: data.name,
            new_department: data.department,
            new_occupation: data.occupation,
            new_email: data.email,
            chkedTrain: chkedTrain,
            selectID: id,
        })
    };
    
    onChangeFile = (e) => {
        if (e.target.files[0] !== undefined)
            this.setState({file:e.target.files[0]});
        else
            this.setState({file: null});
    };

    validateEmail = (email) => {
        var re = /\S+@\S+.\S+\S/;
        return re.test(email);
    };

    onChangeCheckSL(id) {
        var chkedTrain = this.state.chkedTrain;
        if (chkedTrain.includes(id))
            chkedTrain.splice(chkedTrain.indexOf(id), 1);
        else
            chkedTrain.push(id);
        this.setState({chkedTrain: chkedTrain});
    };
    
    onCreateCan = () => {
        if (this.state.new_name === '' || 
            this.state.new_department === '' ||
            this.state.new_email === '' ||
            this.state.new_password === ''
        ){
            this.setState({errorshow: true})
            return;
        }
        
        if (!this.validateEmail(this.state.new_email)){
            this.setState({errorshow: true})
            return;
        }

        const formData = new FormData();
        
        var myId = localStorage.getItem('GSOuserId');
        formData.append("organization", myId);
        formData.append("name",this.state.new_name);
        formData.append("email",this.state.new_email);
        if (this.state.file !== null)
            formData.append("image",this.state.file);
        formData.append("department",this.state.new_department);
        if (this.state.new_occupation !== '')
            formData.append("occupation",this.state.new_occupation);
        formData.append("password",this.state.new_password);
        formData.append("trainings",this.state.chkedTrain);
        
        this.props.addNewCandidate(formData, this.CBAddNewCan);
    };
    
    CBAddNewCan = (id) => {
        this.setState({selectID: ''});
        this.props.getAllData();        
        this.handleClose();
    };

    onEditCan = () => {
        if (this.state.new_name === '' || 
            this.state.new_department === '' ||
            this.state.new_email === ''             
        ){
            this.setState({errorshow: true})
            return;
        }
        
        if (!this.validateEmail(this.state.new_email)){
            this.setState({errorshow: true})
            return;
        }
        const formData = new FormData();
        
        var myId = localStorage.getItem('GSOuserId');
        formData.append("organization", myId);
        formData.append("id", this.state.selectID);
        formData.append("name",this.state.new_name);
        formData.append("email",this.state.new_email);
        if (this.state.file !== null)
            formData.append("image",this.state.file);
        formData.append("department",this.state.new_department);
        formData.append("occupation",this.state.new_occupation);
        if (this.state.new_password !== '')
            formData.append("password",this.state.new_password);
        formData.append("trainings",this.state.chkedTrain);
        
        this.props.editCandidate(formData, this.CBAddNewCan);
    };

    onDeletCan = () => {
        // var myId = localStorage.getItem('GSOuserId');
        // formData.append("organization", myId);
        this.props.deleteCandidate(this.state.selectID, this.CBDelCan);
    };
    
    CBDelCan = () => {
        this.setState({selectID: ''});
        this.props.getAllData();
        this.handleClose();
    };
    
    handleChangePage = (event, newPage) => {
        this.setState({page:newPage});
    };

    handleChangeRowsPerPage = event => {
        var rowsPerPage = this.state.rowsPerPage + event.target.value;
        this.setState({
            page: 0,
            rowsPerPage:rowsPerPage,
        });
    };

    onViewResults (id) {
        this.setState({
            selectID: id,
            viewResultopen: true,
        })
    }

    onGoViewResult(id) {
        this.setState({trainId: id});
        var index = this.props.train_data.findIndex(obj => obj.id===id);
        var data = {
            id: this.props.train_data[index].id,
            title: this.props.train_data[index].title,
            color: this.props.train_data[index].color,
            description: this.props.train_data[index].description,
            sessions: this.props.train_data[index].sessions,
            tags: this.props.train_data[index].tags,
            candidates: this.props.train_data[index].candidates,
        }
        this.props.getCandidateList(data, this.onVewResults);
    }

    onVewResults = () => {

        var data = {
            trainId: this.state.trainId,
            candidateId: this.state.selectID,
            photo:  this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===this.state.selectID)].photo,
            name:  this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===this.state.selectID)].name,
            department:  this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===this.state.selectID)].department,
        }
        this.props.getTrain_result(data, this.CBGetTrainRes);
    }

    CBGetTrainRes = (train_result) => {
        this.props.getAllResults(this.state.selectID, this.CBGetAllResults)
    }
    
    CBGetAllResults = (data) => {
        this.props.setReviewShowFlag(2);
        this.handleClose();
        this.props.history.push('/reports');
    }

    handleClose = () => {
        this.setState({
            department: '',
            occupation: '',
            email: '',
            password: '',
            editopen: false,
            delopen: false,
            anchordot3: null,
            dot3open: false,
            arrowRef: null,

            viewResultopen: false,
            selectID: '',
            selectTraining: [],
            newCanOpen: false,
            new_name: '',
            new_department: '',
            new_occupation: '',
            new_email: '',
            new_password: '',
            file: null,
            chkCanOpen: false,
            chkedTrain: [],
            trainId: '',
        });
        this.props.addclose();
    };

    render() {
        if (this.props.candi_data === undefined || this.props.train_data === undefined)
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
        return (
            <div className="Rcontainer">
                <div className="container" >
                    <Grid container className="root" justify="flex-start">
                            {
                                this.props.candi_data.map((item, index) =>
                                    <Grid item xs={12} sm={6} xd={4} lg={4} container justify="center"  key={item.id}>
                                        <Card className="card">
                                            <CardContent>
                                                <div className="dot3" onClick={(event) => this.handleDot3(event, item.id)}>
                                                    <svg width="6" height="18" viewBox="0 0 6 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.542969 2C0.542969 3.10457 1.54795 4 2.78765 4C4.02735 4 5.03233 3.10457 5.03233 2C5.03233 0.89543 4.02735 0 2.78765 0C1.54795 0 0.542969 0.89543 0.542969 2ZM2.78765 11C1.54795 11 0.542969 10.1046 0.542969 9C0.542969 7.89543 1.54795 7 2.78765 7C4.02735 7 5.03233 7.89543 5.03233 9C5.03233 10.1046 4.02735 11 2.78765 11ZM2.78765 18C1.54795 18 0.542969 17.1046 0.542969 16C0.542969 14.8954 1.54795 14 2.78765 14C4.02735 14 5.03233 14.8954 5.03233 16C5.03233 17.1046 4.02735 18 2.78765 18Z" fill="#CFCFCF"/>
                                                    </svg>
                                                </div>                                       
                                                <br />
                                                {
                                                    (item.photo === undefined || item.photo === null || item.photo === "") ? (
                                                        <img
                                                            src={profilephoto}
                                                            alt="user"
                                                            className="rounded-circleimg"
                                                            width="31"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={item.photo}
                                                            alt="user"
                                                            className="rounded-circleimg"
                                                            width="31"
                                                        />
                                                    )
                                                }
                                                <div className="h2txt">{item.name}</div>                                                                         
                                                <div className="h3txt">{item.department}, {item.occupation}</div>
                                                {
                                                    this.props.train_data.map((row) =>
                                                        row.candidates.includes(item.id) && (
                                                            <div className="row" style={{ margin: 'auto'}} key={row.id}>
                                                                <div className="col-lg-5" style={{padding: 0}}>
                                                                    <Avatar alt="Remy Sharp" style={{width: 30, height: 30, border: '2px solid #fff', backgroundColor: row.color, margin: 'auto', marginRight: 0}} >{getAbbr(row.title)}</Avatar>
                                                                </div>
                                                                <div className="col-lg-7 right" style={{padding: 0, fontSize: '12px', textAlign: 'left'}}>
                                                                    <label style={{padding: '7px 15px', fontSize: 14, margin: 'auto', marginLeft: 0,}}>
                                                                        {row.title}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )
                                                    )
                                                }
                                                
                                                <div className="middle2bnt">
                                                    <Button onClick={() => this.onEditDlg(item.id)} style={{fontSize: '12px',  margin: '15px', borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px', paddingLeft: 30, paddingRight: 30}}>
                                                        Edit
                                                    </Button>
                                                    <Button onClick={() => this.onViewResults(item.id)} style={{fontSize: '12px', margin: '15px', borderRadius: '10px', color: '#979797', backgroundColor: '#F2F2F2', borderWidth: '0px'}}>
                                                        View Results
                                                    </Button> 
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            }
                    </Grid>
                    
                    <Dialog
                        open={this.props.addopen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        fullWidth={true}
                        style={{paperFullWidth: true}}
                        maxWidth='md'
                    >
                        <DialogTitle id="alert-dialog-slide-title" style={{margin: 'auto'}}>
                            Add a new candidate
                        </DialogTitle>
                        <DialogContent>
                            <Grid container className="root" justify="flex-start">
                                <Grid item xs={12} sm={12} xd={5} lg={5} container justify="center" >
                                    <Form style={{width: '100%'}}>
                                        {this.state.errorshow && (
                                            <Alert  variant="danger" style={{width: '95%', margin: '10px'}} >
                                                Input information correctly!
                                            </Alert>
                                        )}
                                        <Form.Row className="formgroupO" >
                                            <input
                                                accept="image/*"
                                                ref="file"
                                                style={{display: 'none'}}
                                                id="outlined-button-file1"
                                                multiple
                                                type="file"
                                                onChange={this.onChangeFile}
                                            />
                                            {this.state.file === null ? (
                                                <label htmlFor="outlined-button-file1">
                                                    <Fab variant="round" component="span" aria-label="add" style={{color: '#F2F2F2'}}>
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z" fill="#979797"/>
                                                        </svg>
                                                    </Fab>
                                                </label>
                                            ) : (
                                                <label htmlFor="outlined-button-file1">
                                                    <Avatar alt="Remy Sharp" src={URL.createObjectURL(this.state.file)} style={{width: 65, height: 65, border: '2px solid #fff'}} />
                                                    {/* <img src={URL.createObjectURL(this.state.file)} className="img" alt="sfdsdfsdfdsf"/> */}
                                                </label>
                                            )}
                                            
                                            <div style={{paddingLeft: '20px'}}>
                                                <p style={{margin: '2px', color: '#FF475B', fontSize: '16px', fontWeight: 'bold'}} >Display Photo</p>
                                                <p style={{margin: '2px', color: '#979797', fontSize: '12px'}} >(Less than 10M)</p>
                                            </div>
                                        </Form.Row>  
                                        <Form.Group controlId="aformGridNewName1" className="formgroupO" >
                                            <Form.Control placeholder="Full Name" value={this.state.new_name} className="inputtxtC" onChange={(event) => this.setState({new_name: event.target.value})} />
                                        </Form.Group>  
                                        <Form.Group as={Col} controlId="aformGridName1" className="formgroupO" >
                                            <Form.Control placeholder="Department" value={this.state.new_department} className="inputtxtO" onChange={(event) => this.setState({new_department: event.target.value})} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="aformGridDescriptionE1" className="formgroupO" >
                                            <Form.Control placeholder="Occupation" value={this.state.new_occupation} className="inputtxtO" onChange={(event) => this.setState({new_occupation: event.target.value})} />
                                        </Form.Group>                                   
                                        <Form.Group as={Col} controlId="aformGridEmail1" className="formgroupO" >
                                            <Form.Control type="email" value={this.state.new_email} placeholder="Email Address" className="inputtxtO" onChange={(event) => this.setState({new_email: event.target.value})} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="aformGridPassword1" className="formgroupO" >
                                            <Form.Control type="password" value={this.state.new_password} placeholder="Password" className="inputtxtO" onChange={(event) => this.setState({new_password: event.target.value})} />
                                        </Form.Group>
                                    </Form>
                                </Grid>
                                <Grid item xs={12} sm={12} xd={7} lg={7} container justify="center" >
                                    <div className="tableWrapper">                                            
                                        <DialogTitle style={{padding: 0, paddingLeft: '20px', height: '30px'}}>
                                            Assign trainings
                                        </DialogTitle>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                {columnsNew.map(column => (
                                                    <TableCell
                                                    key={column.id}
                                                    align={'center'}
                                                    style={{ minWidth: column.minWidth }}
                                                    >
                                                    {column.label}
                                                    </TableCell>
                                                ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.props.train_data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => 

                                                        (<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                            <TableCell key={columnsNew[0].id} align={columnsNew[0].align} style={{padding: 0}}>
                                                                <div style={{display: 'flex'}}>
                                                                    <Avatar alt="Remy Sharp" style={{width: 30, height: 30, border: '2px solid #fff', backgroundColor: row.color}} >{getAbbr(row.title)}</Avatar>
                                                                    <label style={{padding: '7px 15px', fontSize: 14, margin: 0}}>
                                                                        {row.title}
                                                                    </label>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell key={columnsNew[1].id} align={'right'} style={{padding: 0}}>
                                                                {   !this.state.chkedTrain.includes(row.id) ? (
                                                                        <div style={{margin: '5px'}}>
                                                                            {
                                                                                row.tags.map((item, index) => (
                                                                                    <Button key={index} onClick={this.handleClick} style={{fontSize: '10px', margin: '5px', borderRadius: '15px', color: item.color, border: '1px solid ' + item.color, padding: 3}}>
                                                                                        {item.label}
                                                                                    </Button>
                                                                                ))
                                                                            }
                                                                            <svg onClick={() => this.onChangeCheckSL(row.id)} style={{cursor: 'pointer'}} width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <circle cx="16.5" cy="16.5" r="16.5" fill="#F2F2F2"/>
                                                                            </svg>
                                                                        </div>   
                                                                    ) : (
                                                                        <div style={{margin: '5px'}}>
                                                                            {
                                                                                row.tags.map((item, index) => (
                                                                                    <Button key={index} onClick={this.handleClick} style={{fontSize: '10px', margin: '5px', borderRadius: '15px', color: item.color, border: '1px solid ' + item.color, padding: 3}}>
                                                                                        {item.label}
                                                                                    </Button>
                                                                                ))
                                                                            }
                                                                            <svg onClick={() => this.onChangeCheckSL(row.id)} width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <circle cx="16.5" cy="16.5" r="16.5" fill="#FF475B"/>
                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.7071 20.2929L24 11L25.4142 12.4142L14.7071 23.1213L9 17.4142L10.4142 16L14.7071 20.2929Z" fill="white"/>
                                                                            </svg>

                                                                        </div>
                                                                    )
                                                                }
                                                            </TableCell>
                                                        </TableRow>)
                                                    // );
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={this.props.train_data.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        backIconButtonProps={{
                                        'aria-label': 'previous page',
                                        }}
                                        nextIconButtonProps={{
                                        'aria-label': 'next page',
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />  
                                </Grid>
                            </Grid>    
                        </DialogContent>
                        
                        <DialogActions style={{ paddingRight: '30px', marginBottom: '30px'}}>
                            <Button onClick={this.onCreateCan} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px', alignSelf: 'right'}}>
                                Create Account
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.editopen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        fullWidth={true}
                        style={{paperFullWidth: true}}
                        maxWidth='md'
                    >
                        <DialogTitle id="alert-dialog-slide-title" style={{margin: 'auto'}}>
                            Edit Candidate: {this.state.new_name}
                        </DialogTitle>
                        <DialogContent>
                            <Grid container className="root" justify="flex-start">
                                <Grid item xs={12} sm={12} xd={5} lg={5} container justify="center" >
                                    <Form style={{width: '100%'}}>
                                        {this.state.errorshow && (
                                            <Alert  variant="danger" style={{width: '95%', margin: '10px'}} >
                                                Input information correctly!
                                            </Alert>
                                        )}
                                        <Form.Row className="formgroupO" >
                                            <input
                                                accept="image/*"
                                                ref="file"
                                                style={{display: 'none'}}
                                                id="outlined-button-file2"
                                                multiple
                                                type="file"
                                                onChange={this.onChangeFile}
                                            />
                                            {this.state.file === null ? (
                                                <label htmlFor="outlined-button-file2">
                                                    <Fab variant="round" component="span" aria-label="add" style={{color: '#F2F2F2'}}>
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z" fill="#979797"/>
                                                        </svg>
                                                    </Fab>
                                                </label>
                                            ) : (
                                                <label htmlFor="outlined-button-file2">
                                                    <Avatar alt="Remy Sharp" src={URL.createObjectURL(this.state.file)} style={{width: 65, height: 65, border: '2px solid #fff'}} />
                                                    {/* <img src={URL.createObjectURL(this.state.file)} className="img" alt="sfdsdfsdfdsf"/> */}
                                                </label>
                                            )}
                                            
                                            <div style={{paddingLeft: '20px'}}>
                                                <p style={{margin: '2px', color: '#FF475B', fontSize: '16px', fontWeight: 'bold'}} >Display Photo</p>
                                                <p style={{margin: '2px', color: '#979797', fontSize: '12px'}} >(Less than 10M)</p>
                                            </div>
                                        </Form.Row>  
                                        <Form.Group controlId="aformGridNewName2" className="formgroupO" >
                                            <Form.Control placeholder="Full Name" value={this.state.new_name} className="inputtxtC" onChange={(event) => this.setState({new_name: event.target.value})} />
                                        </Form.Group>  
                                        <Form.Group as={Col} controlId="aformGridName2" className="formgroupO" >
                                            <Form.Control placeholder="Department" value={this.state.new_department} className="inputtxtO" onChange={(event) => this.setState({new_department: event.target.value})} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="aformGridDescriptionE2" className="formgroupO" >
                                            <Form.Control placeholder="Occupation" value={this.state.new_occupation} className="inputtxtO" onChange={(event) => this.setState({new_occupation: event.target.value})} />
                                        </Form.Group>                                   
                                        <Form.Group as={Col} controlId="aformGridEmail2" className="formgroupO" >
                                            <Form.Control type="email" value={this.state.new_email} placeholder="Email Address" className="inputtxtO" onChange={(event) => this.setState({new_email: event.target.value})} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="aformGridPassword2" className="formgroupO" >
                                            <Form.Control type="password" value={this.state.new_password} placeholder="Password" className="inputtxtO" onChange={(event) => this.setState({new_password: event.target.value})} />
                                        </Form.Group>
                                    </Form>
                                </Grid>
                                <Grid item xs={12} sm={12} xd={7} lg={7} container justify="center" >
                                    <div className="tableWrapper">
                                        <DialogTitle id="alert-dialog" style={{padding: 0, paddingLeft: '20px', height: '30px'}}>
                                            Assign trainings
                                        </DialogTitle>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                {columnsNew.map(column => (
                                                    <TableCell
                                                    key={column.id}
                                                    align={'center'}
                                                    style={{ minWidth: column.minWidth }}
                                                    >
                                                    {column.label}
                                                    </TableCell>
                                                ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.props.train_data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => 
                                                // if (localStorage.getItem('GSAuserId') !== row.id)
                                                    // return (
                                                        // localStorage.getItem('GSAuserId') !== row.id &&
                                                        (<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                            <TableCell key={columnsNew[0].id} align={columnsNew[0].align} style={{padding: 0}}>
                                                                <div style={{display: 'flex'}}>
                                                                    <Avatar alt="Remy Sharp" style={{width: 30, height: 30, border: '2px solid #fff', backgroundColor: row.color}} >{getAbbr(row.title)}</Avatar>
                                                                    <label style={{padding: '7px 15px', fontSize: 14, margin: 0}}>
                                                                        {row.title}
                                                                    </label>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell key={columnsNew[1].id} align={'right'} style={{padding: 0}}>
                                                                {   !this.state.chkedTrain.includes(row.id) ? (
                                                                        <div style={{margin: '5px'}}>
                                                                            {
                                                                                row.tags.map((item, index) => (
                                                                                    <Button key={index} onClick={this.handleClick} style={{fontSize: '10px', margin: '5px', borderRadius: '15px', color: item.color, border: '1px solid ' + item.color, padding: 3}}>
                                                                                        {item.label}
                                                                                    </Button>
                                                                                ))
                                                                            }
                                                                            {/* <Button onClick={this.onAddTagDlg} style={{fontSize: '10px', margin: 'auto', borderRadius: '15px', color: '#819CBC', border: '2px dotted #C1D5F4', backgroundColor: '#fff', padding: 3}}>
                                                                                + Add Tag
                                                                            </Button> */}
                                                                            <svg onClick={() => this.onChangeCheckSL(row.id)} style={{cursor: 'pointer'}} width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <circle cx="16.5" cy="16.5" r="16.5" fill="#F2F2F2"/>
                                                                            </svg>
                                                                        </div>   
                                                                    ) : (
                                                                        <div style={{margin: '5px'}}>
                                                                            {
                                                                                row.tags.map((item, index) => (
                                                                                    <Button key={index} onClick={this.handleClick} style={{fontSize: '10px', margin: '5px', borderRadius: '15px', color: item.color, border: '1px solid ' + item.color, padding: 3}}>
                                                                                        {item.label}
                                                                                    </Button>
                                                                                ))
                                                                            }
                                                                            {/* <Button onClick={this.onAddTagDlg} style={{fontSize: '10px', margin: 'auto', borderRadius: '15px', color: '#819CBC', border: '2px dotted #C1D5F4', backgroundColor: '#fff', padding: 3}}>
                                                                                + Add Tag
                                                                            </Button> */}
                                                                            <svg onClick={() => this.onChangeCheckSL(row.id)} width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <circle cx="16.5" cy="16.5" r="16.5" fill="#FF475B"/>
                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.7071 20.2929L24 11L25.4142 12.4142L14.7071 23.1213L9 17.4142L10.4142 16L14.7071 20.2929Z" fill="white"/>
                                                                            </svg>

                                                                        </div>
                                                                    )
                                                                }
                                                            </TableCell>
                                                        </TableRow>)
                                                    // );
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={this.props.train_data.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        backIconButtonProps={{
                                        'aria-label': 'previous page',
                                        }}
                                        nextIconButtonProps={{
                                        'aria-label': 'next page',
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />  
                                </Grid>
                            </Grid>    
                        </DialogContent>                        
                        <DialogActions style={{ paddingRight: '30px', marginBottom: '30px'}}>
                            <Button onClick={this.onEditCan} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px', alignSelf: 'right'}}>
                                Save Changes
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.delopen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose1}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title" className="deltitle" style={{margin: 'auto'}}>
                            Are you sure you want to delete?
                        </DialogTitle>
                        <DialogContent>
                        </DialogContent>
                        <DialogActions style={{margin: 'auto', padding: '0px 30px 30px'}}>
                            <Button onClick={this.onDeletCan} style={{marginRight: '20px', borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px'}}>
                                Yes
                            </Button>
                            <Button onClick={this.handleClose} style={{marginLeft: '20px', borderRadius: '10px', color: '#fff', backgroundColor: '#9AA9B7', borderWidth: '0px'}}>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {
                        this.state.anchordot3 &&
                        <StyledPopper
                        placement="bottom"
                        open={this.state.dot3open}
                        anchorEl={this.state.anchordot3}
                        modifiers={{
                            flip: {
                            enabled: true,
                            },
                            arrow: {
                            enabled: true,
                            element: this.state.arrowRef,
                            },
                            preventOverflow: {
                            enabled: "true",
                            boundariesElement: 'scrollParent'
                            },
                        }}
                        >
                        {
                            true &&
                            <span className="arrow" ref={this.handleArrowRef} />
                        }
                        <div className={"popper-content-3dot"}>
                            <Link to="#" className="poplinkcli" onMouseUp={() => this.onEditDlg(this.state.selectID)}> Edit</Link>
                            
                            <Link to="#" className="poplinkcli" onMouseUp={this.onDelDlg}> Delete </Link>
                        </div>
                        </StyledPopper>
                    }
                    <Dialog
                        open={this.state.viewResultopen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        fullWidth={true}
                        style={{paperFullWidth: true}}
                        maxWidth='md'
                    >
                        <DialogTitle id="alert-dialog-slide-title" style={{margin: 'auto'}}>
                            Training Results: <span>{this.state.selectID !== '' && this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===this.state.selectID)].name}</span>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContent>
                                <div className="tableWrapper">
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                            {columnsResultView.map(column => (
                                                <TableCell
                                                key={column.id}
                                                align={'center'}
                                                style={{ minWidth: column.minWidth }}
                                                >
                                                {column.label}
                                                </TableCell>
                                            ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.props.train_data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => 
                                                row.candidates.includes(this.state.selectID) && (                                                    
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                        <TableCell key={columnsResultView[0].id} align={columnsResultView[0].align} style={{padding: 0}}>
                                                            <div style={{display: 'flex'}}>
                                                                <Avatar alt="Remy Sharp" style={{width: 30, height: 30, border: '2px solid #fff', backgroundColor: row.color}} >{getAbbr(row.title)}</Avatar>
                                                                <label style={{padding: '7px 15px', fontSize: 14, margin: 0}}>
                                                                    {row.title}
                                                                </label>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell key={columnsResultView[1].id} align={'center'} style={{padding: 0}}>
                                                            <div style={{display: 'flex'}}>
                                                                <label style={{padding: '7px 15px', fontSize: 14, margin: 0, textAlign: 'center'}}>
                                                                    Incompleted
                                                                </label>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell key={columnsResultView[2].id} align={'right'} style={{padding: 0}}>
                                                            <div style={{margin: '5px'}}>
                                                                <Button onMouseUp={() => this.onGoViewResult(row.id)} style={{fontSize: '10px', margin: '5px', borderRadius: '15px', color: '#009FFA', border: '1px solid #009FFA', padding: 3}}>
                                                                    View Results 
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>)
                                                // );
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={this.props.train_data.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    backIconButtonProps={{
                                    'aria-label': 'previous page',
                                    }}
                                    nextIconButtonProps={{
                                    'aria-label': 'next page',
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />  
                            </DialogContent>   
                        </DialogContent>                        
                        <DialogActions style={{ paddingRight: '30px', marginBottom: '30px'}}>
                            <Button onClick={this.handleClose} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px', alignSelf: 'right'}}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>            
        );
    }
}

const mapStateToProps = ({Normal}) => {
    const {
        addopen,
        train_data,
        candi_data,
    } = Normal;
    return {
        addopen,
        train_data,
        candi_data,
    }
};
const mapDispatchToProps = { 
    addclose: addClose,
    addNewCandidate: addNewCandidate,
    editCandidate: editCandidate,
    deleteCandidate: deleteCandidate,
    getAllData: getData,
    setReviewShowFlag: setReviewShowFlag,
    getTrain_result: getTrain_result,
    getCandidateList: getCandidateList,
    getAllResults: getAllResults,
};
CandiRP = connect(mapStateToProps, mapDispatchToProps)(CandiRP)
export default CandiRP;
