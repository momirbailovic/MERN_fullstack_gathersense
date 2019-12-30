import React, {Component } from 'react';
import {
    Paper, 
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Avatar,
    Grid,
    Divider,
    Fab,
} from '@material-ui/core';

import loadphoto from '../assets/images/Loading.gif';

import {
    Form,
    Alert,
    Col,
} from 'react-bootstrap';

import { connect } from 'react-redux'
import { 
    addClose, 
    setTitleColor,
    deleteTrain,
    addNewCandidate,
    editTraining,
    getSessionList,
    trainReduxClean,
    getData,
} from '../actions';

import { Link } from 'react-router-dom';

import Data from '../common/dataOrg';
import StyledPopper from '../common/styledPopper';
import {getAbbr} from '../common/Functions'

import '../assets/css/bodypanel.css';
import '../assets/css/Tranining.css';
import profilephoto from '../assets/images/default_image.png';

const columns = [
  { id: 'trainings', label: 'TRAININGS', minWidth: 200 },
  { id: 'candidates', label: 'CANDIDATES', minWidth: 150 },
  {
    id: 'action',
    label: 'ACTIONS',
    minWidth: 300,
    align: 'right',
    format: value => value.toLocaleString(),
  },
];
const columnsNew = [
    { id: 'name', label: 'Names', minWidth: 300 },
    { id: 'option', label: 'Select Candidate', minWidth: 100 },
];
var rows = [
    { trainings:"Gao kotalentsu", candidates:"talent0620kobal1@outlook.com" },
    { trainings:"Gao kotalentsu", candidates:"talent0620kobal2@outlook.com" },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class TrainingTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,            
            delopen: false,
            editopen: false,
            selectdata: '',
            fullname: '',
            email: '',
            password: '',
            anchorElement: null,
            arrowRef: null,
            open: false,
            colorpopopen: true,
            anchorElementCirCol: null,
            selectColor: Data.circleColor[0].svg,
            checkColor: Data.circleColor[0].svgColor,
            trainingTitle: '',

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
            errorshow: false,
            chkedCan: [],

            
        }
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.mouseUp);
    }

    mouseUp = () => {
        this.setState({
            anchorElement: null,
            open: false,
        })
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.mouseUp);
    }

    selectColors(number) {
        this.setState({
            selectColor: Data.circleColor[number].svg,
            checkColor: Data.circleColor[number].svgColor,
            colorpopopen: false,
            anchorElementCirCol: null,
        })
    }

    circleCO = event => {
        if (this.state.colorpopopen)
            this.setState({
                anchorElementCirCol: null,
                colorpopopen: false
            })
        else
            this.setState({
                anchorElementCirCol: event.currentTarget,
                colorpopopen: true
            })
    }

    handleClickButton = () => {
        this.setState({open: !this.state.open});
    };    
    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    onCreateTraining = () => {
        if (this.state.trainingTitle === '')
            return;
        this.handleClose();
        this.props.trainReduxClean();
        this.props.setTitleColor(this.state.trainingTitle, this.state.checkColor)
        this.props.onChangeShowState(1);
    }

    onEditTrain(id) {

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
        this.props.getSessionList(data, this.CBSessionList);
        // this.setState({
        //     editopen: true,
        //     selectdata: keyvalue,
        // });
    }

    CBSessionList = (data) => {
        this.props.getAllData();
        this.props.onChangeShowState(1);
    }

    handleEdit = () => {
        for( var i = rows.length-1; i--;){            
            if ( rows[i].email === this.state.selectdata){
                rows[i].fullname = this.state.fullname;
                rows[i].email = this.state.email;
                break;
            }
        }
        this.handleClose();
    }    

    onCanEditDlg = (event, id) => {
        if (this.state.open){
            
            this.setState({
                selectID: '',
                selectTraining: [],
                anchorElement: null,
                open: false,
            })
        }
        else {
            var index = this.props.train_data.findIndex(obj => obj.id===id);
            var selectTraining = this.props.train_data[index];
            this.setState({
                selectID: id,
                selectTraining: selectTraining,
                chkedCan: selectTraining.candidates,
                anchorElement: event.currentTarget,
                open: true
            })            
        }
    }

    onChangeFile = (e) => {        
        if (e.target.files[0] !== undefined)
            this.setState({file:e.target.files[0]});
        else
            this.setState({file: null});
    }

    validateEmail = (email) => {
        var re = /\S+@\S+.\S+\S/;
        return re.test(email);
    }
    
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
        formData.append("trainings",[]);
        
        this.props.addNewCandidate(formData, this.CBAddNewCan);
    }

    CBAddNewCan = (id) => {
        var selectTraining = this.state.selectTraining;
        selectTraining.candidates.push(id);

        this.props.editTraining(selectTraining, this.CBEditTraining);

    }

    CBEditTraining = (training) => {
        this.props.getAllData();
        this.handleClose();
    }

    onChangeCheckSL(id) {
        var chkedCan = this.state.chkedCan;
        if (chkedCan.includes(id))
            chkedCan.splice(chkedCan.indexOf(id), 1);
        else
            chkedCan.push(id);
        this.setState({chkedCan: chkedCan});
        //this.props.setChkCandidate(chkedCan);
    }

    onChangeCan = () => {
        var selectTraining = this.state.selectTraining;
        selectTraining.candidates = this.state.chkedCan;
        this.props.editTraining(selectTraining, this.CBEditTraining);
    }

    onDeleteDlg(id) {
        this.setState({
            delopen: true,
            selectID: id,
        });
    };

    onTrainDelete = () => {
        this.props.deleteTrain(this.state.selectID, this.CBTrainkDel);
    }

    CBTrainkDel = () => {
        this.props.getAllData();
        this.handleClose();
    }

    handleDelete = () => {
        for( var i = rows.length-1; i--;){            
            if ( rows[i].email === this.state.selectdata){
                rows.splice(i, 1);
                break;
            }
        }
        this.handleClose();
    }
    
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


    handleClose = () => {
        this.setState({
            editopen: false,
            delopen: false,
            selectdata: '',
            fullname: '',
            email: '',
            password: '',
            anchorElement: null,
            open: false,
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
            chkedCan: [],
        });
        this.props.addclose();
    };

    render() {

        if (this.props.train_data === undefined || this.props.train_data.length === 0 || this.props.candi_data === undefined || this.props.train_data.length === 0)
            return (<div >                 
                <div >
                    <img
                        src={loadphoto}
                        alt="user"
                        className="loading-circle"
                        width="26"
                        style={{position: 'absolute', left: '50%', top: '43%'}}
                    />
                </div>
            </div>)

        return (
            <div className="Rcontainer">
                    <div className="container" >
                    <Paper className="tableroot">
                        <div className="tableWrapper">
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                    {columns.map(column => (
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
                                    {
                                        this.props.train_data.map((data, index) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                                                <TableCell >
                                                    <div className="divCard">
                                                        <Avatar style={{backgroundColor: data.color, width: 30, height: 30}}>{getAbbr(data.title)}</Avatar>
                                                        <label className="trtxt"> {data.title} </label>
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="divCard">
                                                        <Grid item xs={12} space={9}>
                                                            <Grid container justify="center"  space={9} >
                                                                {
                                                                    data.candidates.slice(data.candidates.length - 3,data.candidates.length).map((value, index) => 
                                                                    (
                                                                        <Grid item xs={1} container justify="center" key={value} space={9}>
                                                                            {
                                                                                (this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo === "" || this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo === undefined) ?
                                                                                (
                                                                                    <Avatar alt="Remy Sharp" src={profilephoto} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                                                ) : (
                                                                                    <Avatar alt="Remy Sharp" src={this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                                                )
                                                                            }
                                                                        </Grid>
                                                                    )
                                                                )}                                   
                                                                <Grid item xs={9}container justify="center" >
                                                                    <label className="trtxts"> {data.candidates.length} candidates </label>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button onClick={(event) => this.onCanEditDlg(event, data.id)} style={{fontSize: '14px', marginLeft: '15px', borderRadius: '30px', color: '#009FFA', backgroundColor: 'rgba(0, 159, 250, 0.1)', borderWidth: '0px'}}> 
                                                        Add Candidates 
                                                    </Button>
                                                    <Button onClick={() => this.onEditTrain(data.id)} style={{fontSize: '14px', marginLeft: '15px', borderRadius: '30px', color: '#009FFA', backgroundColor: 'rgba(0, 159, 250, 0.1)', borderWidth: '0px'}}> 
                                                        Edit 
                                                    </Button> 
                                                    <Button onClick={() => this.onDeleteDlg(data.id)} style={{fontSize: '14px', marginLeft: '15px', borderRadius: '30px', color: '#F11564', backgroundColor: '#FFEDED', borderWidth: '0px'}} > 
                                                        Delete 
                                                    </Button>
                                                </TableCell>
                                            </TableRow>                                    
                                        ))
                                    }
                                    
                                    {
                                        this.state.anchorElement &&
                                        <StyledPopper
                                        placement="bottom"
                                        open={this.state.open}
                                        anchorEl={this.state.anchorElement}
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
                                        <div className={"popper-content"}>
                                            <Link to="#" className="poplinkcli" onMouseUp={() => this.setState({ newCanOpen: true, addCanOpen: false })}> New Candidate</Link>
                                            <Divider />
                                            <Link to="#" className="poplinkcli" onMouseUp={() => this.setState({ chkCanOpen: true, addCanOpen: false })} > Existing Candidate</Link>
                                        </div>
                                        </StyledPopper>
                                    }
                                </TableBody>
                            </Table>
                        </div>                    
                    </Paper>
                    <Dialog
                        open={this.props.addopen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        fullWidth={true}
                        //maxWidth="xl"
                    >
                        <DialogTitle id="alert-dialog-slide-title" className="deltitle" style={{margin: 'auto'}}>
                            Create a new training
                        </DialogTitle>
                        <DialogContent>
                            <Form >
                                <Form.Group controlId="aformGridFullName" className="dialogAdd" >
                                    <Form.Control placeholder="Training Title" value={this.state.trainingTitle} className="inputtxtD" onChange={(event) => this.setState({trainingTitle: event.target.value})} />
                                    <div onClick={this.circleCO}>
                                        {this.state.selectColor}                                        
                                    </div>
                                    {
                                        this.state.anchorElementCirCol &&
                                        <StyledPopper
                                        placement="right"
                                        open={true}
                                        disablePortal={true}
                                        anchorEl={this.state.anchorElementCirCol}
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
                                        <div className={"popper-content-color"}>
                                            <div style={{display: 'flex'}}>
                                                <div onClick={() => this.selectColors(0)}> {Data.circleColor[0].svg} </div>
                                                <div onClick={() => this.selectColors(1)}> {Data.circleColor[1].svg} </div>
                                                <div onClick={() => this.selectColors(2)}> {Data.circleColor[2].svg} </div>
                                                <div onClick={() => this.selectColors(3)}> {Data.circleColor[3].svg} </div>
                                                </div>
                                                <div style={{display: 'flex'}}>
                                                <div onClick={() => this.selectColors(4)}> {Data.circleColor[4].svg} </div>
                                                <div onClick={() => this.selectColors(5)}> {Data.circleColor[5].svg} </div>
                                                <div onClick={() => this.selectColors(6)}> {Data.circleColor[6].svg} </div>
                                                <div onClick={() => this.selectColors(7)}> {Data.circleColor[7].svg} </div>
                                            </div>
                                        </div>
                                        </StyledPopper>
                                    } 
                                </Form.Group>
                            </Form>
                        </DialogContent>
                        <DialogActions style={{margin: 'auto', padding: '0px 30px 30px'}}>
                            <Button onClick={this.onCreateTraining} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px', float: 'right'}}>
                                Create Training
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
                        style={{paddingLeft: '316px'}}
                    >
                        <DialogTitle id="alert-dialog-slide-title" className="deltitle" style={{margin: 'auto'}}>
                            Edit Administrator Information
                        </DialogTitle>
                        <DialogContent>
                            <Form>
                                <Form.Group controlId="formGridFullName" className="formgroupD" >
                                    <Form.Control placeholder="FullName" value={this.state.fullname} className="inputtxtD" onChange={(event) => this.setState({fullname: event.target.value})} />
                                </Form.Group>                                        
                                <Form.Group controlId="formGridEmail" className="formgroupD" >
                                    <Form.Control type="email" value={this.state.email} placeholder="Email address" className="inputtxtD" onChange={(event) => this.setState({email: event.target.value})} />
                                </Form.Group>
                                <Form.Group controlId="formGridPassword" className="formgroupD" >
                                    <Form.Control type="password" value={this.state.password} placeholder="Password" className="inputtxtD" onChange={(event) => this.setState({password: event.target.value})} />
                                </Form.Group> 
                            </Form>
                        </DialogContent>
                        <DialogActions style={{margin: 'auto', padding: '0px 30px 30px'}}>
                            <Button onClick={this.handleEdit} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px'}}>
                                Update Account
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
                            <Button onClick={this.onTrainDelete} style={{marginRight: '20px', borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px'}}>
                                Yes
                            </Button>
                            <Button onClick={this.handleClose} style={{marginLeft: '20px', borderRadius: '10px', color: '#fff', backgroundColor: '#9AA9B7', borderWidth: '0px'}}>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>   
                    <Dialog
                        open={this.state.newCanOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        //fullWidth={true}
                        //style={{paperFullWidth: true}}
                        maxWidth='md'
                    >
                        <DialogTitle id="alert-dialog-slide-title" style={{margin: 'auto'}}>
                            Add a new candidate to {this.props.title}
                        </DialogTitle>
                        <DialogContent>
                            <Form>
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
                                        <label htmlFor="outlined-button-file">
                                            <Avatar alt="Remy Sharp" src={URL.createObjectURL(this.state.file)} style={{width: 65, height: 65, border: '2px solid #fff'}} />
                                            {/* <img src={URL.createObjectURL(this.state.file)} className="img" alt="sfdsdfsdfdsf"/> */}
                                        </label>
                                    )}
                                    
                                    <div style={{paddingLeft: '20px'}}>
                                        <p style={{margin: '2px', color: '#FF475B', fontSize: '16px', fontWeight: 'bold'}} >Display Photo</p>
                                        <p style={{margin: '2px', color: '#979797', fontSize: '12px'}} >(Less than 10M)</p>
                                    </div>
                                </Form.Row>  
                                <Form.Group controlId="aformGridNewName" className="formgroupC" >
                                    <Form.Control placeholder="Full Name" value={this.state.new_name} className="inputtxtC" onChange={(event) => this.setState({new_name: event.target.value})} />
                                </Form.Group>                          
                                <Form.Row>
                                    <Form.Group as={Col} controlId="aformGridName" className="formgroupO" >
                                        <Form.Control placeholder="Department" value={this.state.new_department} className="inputtxtO" onChange={(event) => this.setState({new_department: event.target.value})} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="aformGridDescriptionE" className="formgroupO" >
                                        <Form.Control placeholder="Occupation" value={this.state.new_occupation} className="inputtxtO" onChange={(event) => this.setState({new_occupation: event.target.value})} />
                                    </Form.Group>
                                </Form.Row>   
                                <Form.Row>                                    
                                    <Form.Group as={Col} controlId="aformGridEmail" className="formgroupO" >
                                        <Form.Control type="email" value={this.state.new_email} placeholder="Email Address" className="inputtxtO" onChange={(event) => this.setState({new_email: event.target.value})} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="aformGridPassword" className="formgroupO" >
                                        <Form.Control type="password" value={this.state.new_password} placeholder="Password" className="inputtxtO" onChange={(event) => this.setState({new_password: event.target.value})} />
                                    </Form.Group>
                                </Form.Row> 
                            </Form>
                        </DialogContent>                    
                        <DialogActions style={{ paddingRight: '30px', marginBottom: '30px'}}>
                            <Button onClick={this.onCreateCan} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px', alignSelf: 'right'}}>
                                Create Account
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.chkCanOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        //fullWidth={true}
                        //style={{paperFullWidth: true}}
                        maxWidth='md'
                    >
                        <DialogTitle id="alert-dialog-slide-title" style={{margin: 'auto'}}>
                        Add an existing candidate to {this.props.title}
                        </DialogTitle>
                        <DialogContent>
                            <div className="tableWrapper">
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
                                        {this.props.candi_data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => 
                                        // if (localStorage.getItem('GSAuserId') !== row.id)
                                            // return (
                                                // localStorage.getItem('GSAuserId') !== row.id &&
                                                (<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                    <TableCell key={columnsNew[0].id} align={columnsNew[0].align}>
                                                        <div style={{display: 'flex'}}>
                                                            <Avatar alt="Remy Sharp" src={row.photo} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                            <label style={{padding: '7px 15px', fontSize: 14}}>
                                                                {row[columnsNew[0].id]}
                                                            </label>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell key={columnsNew[1].id} align={columnsNew[1].align}>
                                                        {   !this.state.chkedCan.includes(row.id) ? (
                                                                <div >
                                                                    <svg onClick={() => this.onChangeCheckSL(row.id)} style={{cursor: 'pointer'}} width="32" height="32" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="16.5" cy="16.5" r="16.5" fill="#F2F2F2"/>
                                                                    </svg>
                                                                </div>
                                                            ) : (
                                                                <div style={{display: 'flex'}}>
                                                                    <Avatar onClick={() => this.onChangeCheckSL(row.id)} style={{backgroundColor: '#FF475B', width: 32, height: 32, cursor: 'pointer' }}>
                                                                        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.70711 9.29289L15 0L16.4142 1.41421L5.70711 12.1213L0 6.41421L1.41421 5L5.70711 9.29289Z" fill="white"/>
                                                                        </svg>
                                                                    </Avatar>
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
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={this.props.candi_data.length}
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
                        <DialogActions style={{ paddingRight: '30px', marginBottom: '30px'}}>
                            <Button onClick={this.onChangeCan} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px', alignSelf: 'right'}}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                
                </div>                 
          </div>
        );
    }
}

const mapDispatchToProps = {
    addclose: addClose,
    setTitleColor:setTitleColor,
    deleteTrain: deleteTrain,
    addNewCandidate: addNewCandidate,
    editTraining: editTraining,
    getSessionList: getSessionList,
    trainReduxClean: trainReduxClean,
    getAllData: getData,
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

TrainingTable = connect(mapStateToProps, mapDispatchToProps)(TrainingTable)
export default TrainingTable;