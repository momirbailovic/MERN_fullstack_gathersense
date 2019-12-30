import React, {Component } from 'react';
import {
    Button,
    Avatar,
    Grid,
    Card,
    CardContent,
    Snackbar,
    // IconButton,
    SnackbarContent,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
// import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { connect } from 'react-redux'
import { 
    addClose, 
    getData,
    addTraining,
    deleteSession,
    getQuestionList,
    editTraining,
} from '../actions';

import StyledPopper from '../common/styledPopper';

import TrainingEdit from './TrainingEdit';
import TrainingEdition from './TrainingEdition';

import '../assets/css/bodypanel.css';
import '../assets/css/Tranining.css';

const SortableItem = sortableElement(({value, tags, editGo, deleteGo}) =>{

    const [dotopen, setDotOpen] = React.useState(false);
    const [anchorElDot, setAnChorElDot] = React.useState(null);
    const [arrowRef, setArrowRef] = React.useState(null);
    const [selectId, setSelectId] = React.useState('');
    
    // window.addEventListener('mouseup', mouseUp);

    // function mouseUp () {
    //     setAnChorElDot(null);
    //     setDotOpen(false);
    //     setSelectId('');
    // }
     
    const dotOpen = (event, id) => {
        if (dotopen){
            setAnChorElDot(null);
            setDotOpen(false);
            setSelectId('');
        }        
        else{
            setAnChorElDot(event.currentTarget);
            setDotOpen(true);
            setSelectId(id);
        }
    };

    const handleClick = event => {
    };

    const handleArrowRef = node => {
        setArrowRef(node);
    };

    const onEdit = () => {
        editGo(selectId);
        setSelectId('');
        setDotOpen(false);
    };

    const onDelete = () => {  
        deleteGo(selectId);
        setSelectId('');
        setDotOpen(false);
    }

    return (
    <div className="sessionTag">
        <div style={{display: 'flex', alignSelf: 'center', marginLeft: '20px'}}>
            <div >
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 2V0H0V2H20ZM20 6V8H0V6H20ZM20 12V14H0V12H20Z" fill="#979797"/>
                </svg>
            </div>
            <label style={{display: 'flex', alignSelf: 'center', marginLeft: '20px'}}>
                {value.title}
            </label>
        </div>
        <div style={{display: 'flex', alignSelf: 'center', marginLeft: '20px'}}>
            <div style={{margin: '5px', alignItems: 'center', textAlign: 'center', verticalAlign: 'middle'}}>
                {
                    value.tags.map((item, index) => (
                        <Button key={index} onClick={handleClick} style={{fontSize: '10px', margin: '5px', borderRadius: '15px', color: tags[item].color, border: '1px solid ' + tags[item].color, padding: 3}}>
                            {tags[item].label}
                        </Button>
                    ))
                }
                {/* <Button onClick={this.onAddTagDlg} style={{fontSize: '10px', margin: 'auto', borderRadius: '15px', color: '#819CBC', border: '2px dotted #C1D5F4', backgroundColor: '#fff', padding: 3}}>
                    + Add Tag
                </Button> */}
            </div>
            <div onClick={(event) => dotOpen(event, value.id)} style={{float: 'right', margin: '5px', marginLeft: '20px', marginRight: '15px', cursor: 'pointer'}}>
                <svg width="6" height="18" viewBox="0 0 6 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.542969 2C0.542969 3.10457 1.54795 4 2.78765 4C4.02735 4 5.03233 3.10457 5.03233 2C5.03233 0.89543 4.02735 0 2.78765 0C1.54795 0 0.542969 0.89543 0.542969 2ZM2.78765 11C1.54795 11 0.542969 10.1046 0.542969 9C0.542969 7.89543 1.54795 7 2.78765 7C4.02735 7 5.03233 7.89543 5.03233 9C5.03233 10.1046 4.02735 11 2.78765 11ZM2.78765 18C1.54795 18 0.542969 17.1046 0.542969 16C0.542969 14.8954 1.54795 14 2.78765 14C4.02735 14 5.03233 14.8954 5.03233 16C5.03233 17.1046 4.02735 18 2.78765 18Z" fill="#CFCFCF"/>
                </svg>
            </div>
            {
                anchorElDot &&
                <StyledPopper
                placement="bottom"
                open={dotopen}
                anchorEl={anchorElDot}
                modifiers={{
                    flip: {
                    enabled: true,
                    },
                    arrow: {
                    enabled: true,
                    element: arrowRef,
                    },
                    preventOverflow: {
                    enabled: "true",
                    boundariesElement: 'scrollParent'
                    },
                }}
                >
                {
                    true &&
                    <span className="arrow" ref={handleArrowRef} />
                }
                <div className={"popper-content-3dot"} style={{display: 'block'}}>
                    <p onClick={onEdit} className="popdot" > Edit</p>
                    <p onClick={onDelete} className="popdot" > Delete </p>
                </div>
                </StyledPopper>
            }
        </div>                                    
    </div>                           
);
        });

const SortableContainer = sortableContainer(({children}) => {
  return <ul style={{padding: 0}}>{children}</ul>;
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  
const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
        //   <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
        //     <CloseIcon className={classes.icon} />
        //   </IconButton>,
        ]}
        {...other}
      />
    );
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};
  
// const useStyles2 = makeStyles(theme => ({
//     margin: {
//         margin: theme.spacing(1),
//     },
// }));

function CustomizedSnackbars(props) {
    const { open, message } = props;
    // const classes = useStyles2();
    // const [open, setOpen] = React.useState(false);
  
    // const handleClick = () => {
    // //   setOpen(true);
    // };
  
    const handleClose = (event, reason) => {
    //   if (reason === 'clickaway') {
    //     return;
    //   }
  
    //   setOpen(false);
    };
  
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant="success"
            message={message}
          />
        </Snackbar>        
      </div>
    );
}

class TrainingCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightpanal: 0,
            sessionList: this.props.sessionList,
            sessionIDs: this.props.sessionIDs,
            NEFlag: 0,
            showNotification: false,
            message: '',
        }
    }
    handleClick = () => {
        
    }

    editGo = (id) => {
        var index = this.state.sessionList.findIndex(obj => obj.id===id);
        var data = {
            id: id,
            sessionTitle: this.state.sessionList[index].title,
            sessionDescription:  this.state.sessionList[index].description,
        }
        this.props.getQuestionList(data, this.CBQuizList);
    }
    
    CBQuizList = (quizList) => {
        this.setState({
            rightpanal: 1,
            NEFlag: 1,
        });

    }

    deleteGo = (id) => {
        this.props.deleteSession(id, this.CBdelSession);
    }

    CBdelSession = (id) => {
        var index = this.state.sessionIDs.indexOf(id);
        var sessionList = this.state.sessionList;
        var sessionIDs = this.state.sessionIDs;
        sessionIDs.splice(index, 1);
        sessionList.splice(index, 1);
        this.setState({
            sessionList: sessionList,
            sessionIDs: sessionIDs,
        });
        if (sessionIDs.length === 0)
            this.setState({rightpanal: 0});
    }

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    }

    createNew = (sessionData) => {
        var sessionList = this.state.sessionList;
        var sessionIDs = this.state.sessionIDs;
        if (this.state.NEFlag ===0){
            sessionList.push(sessionData);
            sessionIDs.push(sessionData.id);
            this.setState({
                rightpanal: 2,
                sessionList: sessionList,
                sessionIDs: sessionIDs,
            })
        }
        else if (this.state.NEFlag === 1) {
            var index = this.state.sessionList.findIndex(obj => obj.id === sessionData.id);
            sessionList[index] = sessionData;
            sessionIDs[index] = sessionData.id;
            this.setState({
                rightpanal: 2,
                NEFlag: 0,
                sessionList: sessionList,
                sessionIDs: sessionIDs,
            })
        }
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({sessionList, sessionIDs}) => ({
            sessionList: arrayMove(sessionList, oldIndex, newIndex),
            sessionIDs: arrayMove(sessionIDs, oldIndex, newIndex),
        }));
    };

    onCreateTraining = () => {
        if (this.props.trainId === ''){
            var organizationId = localStorage.getItem('GSOuserId');
            var data = {
                title: this.props.title,
                color: this.props.color,
                description: this.props.description,
                tags: this.props.tags,
                candidates: this.props.chkedCanData,
                sessions: this.state.sessionIDs,
                organization: organizationId,
            }

            this.props.addTraining(data, this.callbackadd);
        }
        else {            
            data = {
                id: this.props.trainId,
                title: this.props.title,
                color: this.props.color,
                description: this.props.description,
                tags: this.props.tags,
                candidates: this.props.chkedCanData,
                sessions: this.state.sessionIDs,
            }

            this.props.editTraining(data, this.callbackedit);
        }
    }

    callbackadd = () => {        
        // this.props.getAllData();
        this.setState({
            message: 'Training Created',
            showNotification: true,
        });
        setTimeout(this.showSuccessNotification, 3000);
        
        //this.handleClose();
        //this.props.onChangeShowState(0);
    }

    callbackedit = () => {        
        // this.props.getAllData();
        this.setState({
            message:'Training Update',
            showNotification: true,
        });
        setTimeout(this.showSuccessNotification, 3000);
        //this.handleClose();
        //this.props.onChangeShowState(0);
    }

    onBack = () => {
        this.handleClose();
        this.props.onChangeShowState(0);
    }

    showSuccessNotification = () => {
        this.setState({showNotification: false});
    }

    handleClose = () => {
        this.setState({
            rightpanal: 0,
            sessionList: [],
            sessionIDs: [],
            NEFlag: 0,
            showNotification: false,
        })
    }
    render() {

        return (
            <div className="Rcontainer">
                <div className="container" >
                    <Grid className="root" container justify="center" >
                    {
                        (this.state.rightpanal === 0 || this.state.rightpanal === 2) && (
                            <Grid item xs={12} sm={3} xd={3} lg={3} container justify="center" >                                
                                <div style={{backgroundColor: '#fff', width: '95%'}}>
                                    <TrainingEdition style={{marginTop: 20}} onChangeShowState={this.props.onChangeShowState}/>
                                </div>
                            </Grid>
                        )
                    }
                    {
                        (this.state.rightpanal !== 1 && this.state.sessionList.length === 0) && (
                        <Grid item xs={12} sm={9} xd={9} lg={9} container justify="center" >
                                <Card className="trainCard">
                                    <CardContent style = {{alignItems: 'center'}}>
                                        <div style={{marginTop: '10%'}}>
                                            <Avatar onClick={() => this.setState({rightpanal: 1, NEFlag: 0})} className="trainAvatar" style={{backgroundColor: '#F2F2F2', width: 65, height: 65, }}>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z" fill="#979797"/>
                                                </svg>
                                            </Avatar> 
                                        </div>                                                               
                                        <div className="h3txtfixed" >
                                            You haven't added any sessions yet. Click here to add your first session.
                                        </div>                                                                 
                                    </CardContent>
                                </Card>                    
                        </Grid>
                        )
                    }
                    {
                        this.state.rightpanal === 1 && (
                            <TrainingEdit history={this.props.history} createNew={this.createNew} NEFlag={this.state.NEFlag}/>
                        )
                    }
                    {
                        (this.state.rightpanal !== 1 && this.state.sessionList.length !== 0)&& (
                        <Grid item xs={12} sm={9} xd={9} lg={9} container justify="center">
                            <Card className="autoCard" style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                                <CardContent style={{padding: 0}}>
                                    <div >
                                        <SortableContainer onSortEnd={this.onSortEnd} distance={1}>
                                            {this.state.sessionList.map((value, index) => (
                                            <SortableItem key={value.id} index={index} value={value} tags={this.props.tags} editGo={this.editGo} deleteGo={this.deleteGo}/>
                                            ))}
                                        </SortableContainer>
                                    </div>
                                    
                                    <div className="sessionAdd" onClick={() => this.setState({rightpanal: 1})}>
                                        <div style={{display: 'flex', alignSelf: 'center', marginLeft: '20px'}}>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.7 6.3H14V7.7H7.7V14H6.3V7.7H0V6.3H6.3V0H7.7V6.3Z" fill="#819CBC"/>
                                            </svg>
                                        </div>                                    
                                        <label style={{display: 'flex', alignSelf: 'center', margin: '0px', marginLeft: '20px', cursor: 'pointer'}}>
                                            Add another session
                                        </label>
                                    </div>                             
                                </CardContent>
                            </Card>           
                        </Grid>         
                        )
                    }                
                    </Grid>
                    {
                        (this.state.rightpanal === 0 || this.state.rightpanal === 2) && (
                            <div style={{marginTop: '30px', marginRight: '15px', float: 'right',}}>
                                <Button onClick={this.onBack} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#555', borderWidth: '0px', float: 'right', padding: '5px 50px',marginLeft: 40}}>
                                    No
                                </Button>
                                {
                                    this.props.trainId === '' ? (
                                        <Button onClick={this.onCreateTraining} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px', float: 'right', padding: '5px 30px'}}>
                                            Create 
                                        </Button> 
                                    ) : (
                                        <Button onClick={this.onCreateTraining} style={{borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px', float: 'right', padding: '5px 30px'}}>
                                            Save Changes
                                        </Button> 
                                    )
                                }                                   
                            </div>
                        )
                    }
                     
                </div>
                
                <CustomizedSnackbars open={this.state.showNotification} message={this.state.message} />
            </div>
        );
    }
}

const mapDispatchToProps = {
    addclose: addClose,
    getAllData: getData,
    addTraining: addTraining,
    deleteSession: deleteSession,
    getQuestionList: getQuestionList,
    editTraining: editTraining,
}

const mapStateToProps = ({Train}) => {
    const {
        title,
        color,
        description,
        tags,
        chkedCanData,
        sessionList,
        sessionIDs,
        trainId,
    } = Train;
    return {
        title,
        color,
        description,
        tags,
        chkedCanData,
        sessionList,
        sessionIDs,
        trainId,
    }
};

TrainingCreate = connect(mapStateToProps, mapDispatchToProps)(TrainingCreate)
export default TrainingCreate;