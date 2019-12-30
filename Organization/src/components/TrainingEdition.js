import React, {Component } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    Slide,
    Avatar,
    Grid,
    Divider,
    Card,
    CardContent,
    Fab,
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
    setTagColor, 
    addNewCandidate,
    setChkCandidate,
    setTitle,
    setDescription,
    trainReduxClean,
    deleteTrain,
    getData, 
} from '../actions';
import {
    GET_DATA_SUCCESS
} from '../common/ActionTypes';

import Data from '../common/dataOrg';
import StyledPopper from '../common/styledPopper';
import {getAbbr} from '../common/Functions'


import '../assets/css/bodypanel.css';
import '../assets/css/Tranining.css';
import profilephoto from '../assets/images/default_image.png';
    
const columns = [
    { id: 'name', label: 'Names', minWidth: 300 },
    { id: 'option', label: 'Select Candidate', minWidth: 100 },
];
  
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class TrainingEdition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightpanal: 0,

            anchorElementDot3: null,
            dot3open: false,

            anchorElementAddCan: null,
            addCanOpen: false,
            
            colorpopopen: true,
            anchorElementCirCol: null,

            arrowRef: null,

            addTagOpen: false,
            tagDivColor: Data.circleColor[0].svg,
            items: ['Introduction', 'Logic', 'Critical', 'Thinking'],

            tags: this.props.tags,

            tagColor: Data.circleColor[0].svgColor,
            tagTitle: '',

            newCanOpen: false,
            file: null,
            
            
            new_title: this.props.title,
            new_name: '',
            new_department: '',
            new_occupation: '',
            new_description: this.props.description,
            new_email: '',
            new_password: '',
            errorshow: false,

            delNum: 0,

            chkCanOpen: false,
            page: 0,
            rowsPerPage: 10, 
            rows: [
                { id: 0, name:"Gao kotalentsu", option: false },
                { id: 1, name:"Gao kotalentsu", option: true },
            ],
            chkedCan: this.props.chkedCanData,
        }
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.mouseUp);
    }

    mouseUp = () => {
        this.setState({
            anchorElementDot3: null,
            dot3open: false,
            anchorElementAddCan: null,
            addCanOpen: false,
        })
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.mouseUp);
    }

    handleClick = () => {
        
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

    tagDivColors(number) {
        this.setState({
            tagDivColor: Data.circleColor[number].svg,
            tagColor: Data.circleColor[number].svgColor,
            colorpopopen: false,
            anchorElementCirCol: null,
        })
    }

    onCreateTag = () => {
        if (this.state.tagTitle === '')
            return;
        var tags = this.state.tags;
        var temp = {label: this.state.tagTitle, color: this.state.tagColor};
        tags.push(temp);
        this.setState({ tags:tags });
        this.props.setTagColor(tags);
        this.handleClose();
    }

    onDot3Open = (event, value) => {
        if (this.state.dot3open)
            this.setState({
                dot3open: false,
                anchorElementDot3: null,
            })
        else
            this.setState({
                dot3open: true,
                delNum: value,
                anchorElementDot3: event.currentTarget,
            })
    }

    onDelTrainAndTag = () => {
        if (this.state.delNum === 10000){
            if (this.props.trainId !== '')
            {
                this.props.deleteTrain(this.props.trainId, this.CBTrainkDel);
                return;
            }
            this.props.trainReduxClean();
            this.handleClose();
            this.props.onChangeShowState(0);
            return;                         // delete train data
        }
        
        var tags = this.state.tags;
        tags.splice(this.state.delNum, 1);
        this.setState({tags: tags});
        this.props.setTagColor(tags);
        this.handleClose();
    }

    CBTrainkDel = () => {
        this.props.trainReduxClean();
        this.props.getAllData();
        this.handleClose();
        this.props.onChangeShowState(0);
    }

    onAddCan = (event) => {
        if (this.state.addCanOpen)
            this.setState({
                addCanOpen: false,
                anchorElementAddCan: null,
            })
        else
            this.setState({
                addCanOpen: true,
                anchorElementAddCan: event.currentTarget,
            })
    }

    callback = (id) => {
        var chkedCan = this.state.chkedCan;
        chkedCan.push(id);
        this.props.setChkCandidate(this.state.chkedCan);
        this.props.getAllData();        
        this.handleClose();
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

        this.props.addNewCandidate(formData, this.callback);
    }

    onAddTagDlg = () => {
        this.setState({addTagOpen: !this.state.addTagOpen});
    }

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
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

    onChangeCheckSL(id) {
        var chkedCan = this.state.chkedCan;
        if (chkedCan.includes(id))
            chkedCan.splice(chkedCan.indexOf(id), 1);
        else
            chkedCan.push(id);
        this.setState({chkedCan: chkedCan});
        this.props.setChkCandidate(chkedCan);
    }

    onChangeCan = () => {
        this.props.setChkCandidate(this.state.chkedCan);
        this.handleClose();
    }

    
    onSetTitle(event) {
        if (event.target.value === '')
            return;
        this.setState({new_title: event.target.value});
        this.props.setTitle(event.target.value);
    }

    onSetDescription(event) {
        this.setState({new_description: event.target.value});
        this.props.setDescription(event.target.value);
    }

    handleClose = () => {
        this.setState({
            addTagOpen: false,
            tagColor: Data.circleColor[0].svgColor,
            tagDivColor: Data.circleColor[0].svg,
            tagTitle: '',
            addCanOpen: false,
            newCanOpen: false,
            new_name: '',
            new_department: '',
            new_occupation: '',
            new_email: '',
            new_password: '',
            errorshow: false,
            file: null,
            dot3open: false,
            anchorElementDot3: null,
            chkCanOpen: false,
        });
        //this.props.addclose();
    }

    render() {
        if (this.props.color === '' || this.props.title === '' || this.props.getstate !== GET_DATA_SUCCESS)
            return (<div>                
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
            <div >
                <Card className="train1Card">
                    <CardContent >
                        <div onClick={(event) => this.onDot3Open(event,10000)} style={{float: 'right', marginRight: '10px', cursor: 'pointer'}}>
                            <svg width="6" height="18" viewBox="0 0 6 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.542969 2C0.542969 3.10457 1.54795 4 2.78765 4C4.02735 4 5.03233 3.10457 5.03233 2C5.03233 0.89543 4.02735 0 2.78765 0C1.54795 0 0.542969 0.89543 0.542969 2ZM2.78765 11C1.54795 11 0.542969 10.1046 0.542969 9C0.542969 7.89543 1.54795 7 2.78765 7C4.02735 7 5.03233 7.89543 5.03233 9C5.03233 10.1046 4.02735 11 2.78765 11ZM2.78765 18C1.54795 18 0.542969 17.1046 0.542969 16C0.542969 14.8954 1.54795 14 2.78765 14C4.02735 14 5.03233 14.8954 5.03233 16C5.03233 17.1046 4.02735 18 2.78765 18Z" fill="#CFCFCF"/>
                            </svg>
                            {
                            this.state.anchorElementDot3 &&
                            <StyledPopper
                            placement="bottom"
                            open={this.state.dot3open}
                            anchorEl={this.state.anchorElementDot3}
                            modifiers={{
                                flip: {
                                    nabled: true,
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
                            <div className={"popper-content-single"}>
                                <Link to="#" className="poplinkcli" onMouseUp={this.onDelTrainAndTag}> delete </Link>
                            </div>
                            </StyledPopper>
                        } 
                        </div>
                                                                                            
                        <br />
                        <Avatar className="trainAvatar" style={{backgroundColor: this.props.color, width: 80, height: 80, fontSize: '40px'}}>{getAbbr(this.props.title)}</Avatar>
                        {/* <div className="h2txt"> {this.props.title} </div> */}
                        <Form.Group controlId="aformGridTitle">
                                <Form.Control placeholder="Add training description here" value={this.state.new_title} className="inputtxtAddtitle" onChange={(event) => this.onSetTitle(event)} />
                        </Form.Group> 
                        <div style={{margin: '5px', alignItems: 'center', textAlign: 'center', verticalAlign: 'middle'}}>
                            {
                                this.state.tags.map((item, index) => (
                                    <Button key={index} onClick={(event) => this.onDot3Open(event,index)} style={{fontSize: '10px', margin: '5px', borderRadius: '15px', color: item.color, border: '1px solid ' + item.color, padding: 3}}>
                                        {item.label}
                                    </Button>
                                ))
                            }
                            <Button onClick={this.onAddTagDlg} style={{fontSize: '10px', margin: 'auto', borderRadius: '15px', color: '#819CBC', border: '2px dotted #C1D5F4', backgroundColor: '#fff', padding: 3}}>
                                + Add Tag
                            </Button>
                        </div>
                        <Form.Group controlId="aformGridDescription">
                                <Form.Control placeholder="Add training description here" value={this.state.new_description} className="inputtxtAddDescription" onChange={(event) => this.onSetDescription(event)} />
                        </Form.Group> 
                        <Divider style={{marginTop: '25px'}}/>
                        <div className="divCard">
                            <Grid item xs={12} space={9}>
                                <Grid container justify="center"  space={9} >
                                    {
                                        this.props.chkedCanData.slice(0,3).map((value, index) => 
                                            this.props.candi_data.map((item) =>
                                            (item.id === value) &&
                                            (<Grid item xs={1}container justify="center" key={item.id} space={9}>
                                                {
                                                    (this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo === undefined ||
                                                    this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo === null || 
                                                    this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo === "") ?(
                                                        <Avatar alt="Remy Sharp" src={profilephoto} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                    ) : (
                                                        <Avatar alt="Remy Sharp" src={this.props.candi_data[this.props.candi_data.findIndex(obj => obj.id===value)].photo} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                    )
                                                }
                                            </Grid>)
                                    ))}                                   
                                    <Grid item xs={9}container justify="center" >
                                        <label className="trtxt"> {this.props.chkedCanData.length} candidates </label>
                                    </Grid>
                                </Grid>
                            </Grid>                                            
                        </div>
                        <Button onClick={this.onAddCan} style={{fontSize: '10px', margin: 'auto', borderRadius: '10px', color: '#009FFA', border: '1px solid #fff', backgroundColor: '#E5F5FE', display: 'table-cell', verticalAlign: 'middle'}}>
                            Add Candidates
                        </Button>
                        {
                            this.state.anchorElementAddCan &&
                            <StyledPopper
                            placement="bottom"
                            open={this.state.addCanOpen}
                            anchorEl={this.state.anchorElementAddCan}
                            modifiers={{
                                flip: {
                                    nabled: true,
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
                    </CardContent>
                </Card>
                <Dialog
                    open={this.state.addTagOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth={true}
                    //maxWidth="xl"
                >
                    <DialogTitle id="alert-dialog-slide-title" className="deltitle" style={{margin: 'auto'}}>
                        Create a new tag
                    </DialogTitle>
                    <DialogContent>
                        <Form >
                            <Form.Group controlId="aformGridTagTitle" className="dialogAdd" >
                                <Form.Control placeholder="Enter tag" value={this.state.tagTitle} className="inputtxtD" onChange={(event) => this.setState({tagTitle: event.target.value})} />
                                <div onClick={this.circleCO}>
                                    {this.state.tagDivColor}                                    
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
                                        <div onClick={() => this.tagDivColors(0)}> {Data.circleColor[0].svg} </div>
                                        <div onClick={() => this.tagDivColors(1)}> {Data.circleColor[1].svg} </div>
                                        <div onClick={() => this.tagDivColors(2)}> {Data.circleColor[2].svg} </div>
                                        <div onClick={() => this.tagDivColors(3)}> {Data.circleColor[3].svg} </div>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                        <div onClick={() => this.tagDivColors(4)}> {Data.circleColor[4].svg} </div>
                                        <div onClick={() => this.tagDivColors(5)}> {Data.circleColor[5].svg} </div>
                                        <div onClick={() => this.tagDivColors(6)}> {Data.circleColor[6].svg} </div>
                                        <div onClick={() => this.tagDivColors(7)}> {Data.circleColor[7].svg} </div>
                                        </div>
                                    </div>
                                    </StyledPopper>
                                } 
                            </Form.Group>
                        </Form>
                    </DialogContent>
                    <DialogActions style={{margin: 'auto', padding: '0px 30px 30px'}}>
                        <Button onClick={this.onCreateTag} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px', float: 'right'}}>
                            Create Tag
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
                            <Form.Group controlId="aformGridFullName" className="formgroupC" >
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
                                    {this.props.candi_data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => 
                                    // if (localStorage.getItem('GSAuserId') !== row.id)
                                        // return (
                                            // localStorage.getItem('GSAuserId') !== row.id &&
                                            (<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                <TableCell key={columns[0].id} align={columns[0].align}>
                                                    <div style={{display: 'flex'}}>
                                                        <Avatar alt="Remy Sharp" src={row.photo} style={{width: 30, height: 30, border: '2px solid #fff'}} />
                                                        <label style={{padding: '7px 15px', fontSize: 14}}>
                                                            {row[columns[0].id]}
                                                        </label>
                                                    </div>
                                                </TableCell>
                                                <TableCell key={columns[1].id} align={columns[1].align}>
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
        );
    }
}

const mapDispatchToProps = {
    addclose: addClose,
    setTagColor: setTagColor,
    addNewCandidate: addNewCandidate,
    setChkCandidate: setChkCandidate,
    setTitle: setTitle,
    setDescription: setDescription,
    trainReduxClean: trainReduxClean,
    deleteTrain:deleteTrain,
    getAllData: getData,
}

const mapStateToProps = ({Train, Normal}) => {
    const {
        color,
        title,
        chkedCanData,
        description,
        tags,
        trainId,
    } = Train;
    const {
        candi_data,
        train_data,
        getstate,
    } = Normal;
    return {
        color,
        title,
        chkedCanData,
        description,
        tags,
        trainId,
        candi_data,
        train_data,
        getstate,
    }
};


TrainingEdition = connect(mapStateToProps, mapDispatchToProps)(TrainingEdition)
export default TrainingEdition;