import React, {Component} from 'react';
import { Dropdown } from 'react-bootstrap';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addOpen, Logout } from '../actions';

import {IconButton, Modal} from '@material-ui/core';
import {
    GOTO_LOGIN_URL,
} from '../common/ActionTypes';

import '../assets/css/header.css';
import profilephoto from '../assets/images/default.png';
import logoImg from '../assets/images/logo.png';
import Data from '../common/dataAdmin';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menushow: false,
        }
    }

    onLogout = () => {
        this.props.logout();
        this.props.history.push(GOTO_LOGIN_URL);
    }

    onOpenMenu = () => {
        this.setState({
            menushow: true,
        })
    }
    handleClose = () => {
        this.setState({
            menushow: false,
        })
    }
    
    render() {
        return (
            <header className="Hcontainer">  
                <div className="hdr">
                    <div className="hdrtxt">
                        {this.props.menu.titletxt}
                    </div>
                    <div className="logoResponseShow">
                        <img className="logoimg1" src={logoImg} alt="" />
                        <div className="logotxt1">Admin</div>                    
                    </div>
                    <div className="hdr-bar">
                        <i className="fa fa-bars" aria-hidden="true" />
                    </div>
                    <div className="hdrnav">
                        {
                            this.props.menu.redtxt !== "" ? (
                                <div className="additem" >
                                    <div  onClick={this.props.addopen} style={{ cursor: 'pointer', paddingBottom: '3px' }}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM12 7H9V4H7V7H4V9H7V12H9V9H12V7Z" fill="#FF475B"/>
                                        </svg>
                                    </div>
                                    <span onClick={this.props.addopen} className="h-addtxt" >{this.props.menu.redtxt}</span>
                                </div>
                            ) : (
                                <div className="hadditem"> </div>
                            )
                        }
                        
                        <Dropdown>
                            <div className="dropmenu">
                                <div style={{display: 'flex'}}>
                                    <img
                                        src={profilephoto}
                                        alt="user"
                                        className="rounded-circle"
                                        width="26"
                                    />
                                    {/* <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40ZM33.4536 29.3175C35.2884 26.6733 36.3636 23.4622 36.3636 20C36.3636 10.9626 29.0374 3.63636 20 3.63636C10.9626 3.63636 3.63636 10.9626 3.63636 20C3.63636 23.4622 4.71161 26.6733 6.54638 29.3176C8.59264 26.6147 13.4011 25.4545 20 25.4545C26.5989 25.4545 31.4074 26.6147 33.4536 29.3175ZM30.8449 32.2541C30.3127 30.3406 26.4898 29.0909 20 29.0909C13.5102 29.0909 9.68728 30.3406 9.15514 32.2541C12.0424 34.8112 15.8399 36.3636 20 36.3636C24.1601 36.3636 27.9576 34.8112 30.8449 32.2541ZM20 9.09091C15.5984 9.09091 12.7273 12.2832 12.7273 16.3636C12.7273 22.5952 15.9288 25.4545 20 25.4545C24.0329 25.4545 27.2727 22.6902 27.2727 16.7273C27.2727 12.5847 24.3894 9.09091 20 9.09091ZM16.3636 16.3636C16.3636 20.4896 17.8513 21.8182 20 21.8182C22.1413 21.8182 23.6364 20.5425 23.6364 16.7273C23.6364 14.4553 22.2103 12.7273 20 12.7273C17.6977 12.7273 16.3636 14.2106 16.3636 16.3636Z" fill="#DADADA"/>
                                    </svg> */}

                                    <div>                      
                                        <p style={{margin:'1px', marginLeft: '15px', fontSize: '14px', fontWeight: 'bold'}}>{localStorage.getItem('GSAuserName')}</p>
                                        <p style={{margin:'1px', marginLeft: '15px', fontSize: '12px'}}>Adminstrator</p>
                                    </div>
                                </div>
                                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                                    
                                </Dropdown.Toggle>
                                </div>
                                <Dropdown.Menu className="drp_menu">
                                    <Dropdown.Item className="drp_item" onSelect={() => this.props.history.push('/myaccount')} >My account</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item className="drp_item" onSelect={this.onLogout}>Log out</Dropdown.Item>
                                </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="menubarshow">
                        {
                            this.props.menu.redtxt !== "" ? (
                                <div className="additem" >
                                    <div  onClick={this.props.addopen} style={{ cursor: 'pointer', paddingBottom: '3px', marginRight: 20 }}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM12 7H9V4H7V7H4V9H7V12H9V9H12V7Z" fill="#FF475B"/>
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <div className="hadditem"> </div>
                            )
                        }

                        <IconButton edge="start" className="" color="inherit" aria-label="menu" onClick={this.onOpenMenu}>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20 2V0H0V2H20ZM20 6V8H0V6H20ZM20 12V14H0V12H20Z" fill="#FF475B"/>
                            </svg>
                        </IconButton>
                    </div>
                    <Modal
                        open={this.state.menushow}
                        onClose={this.handleClose}
                    >
                        <div style={{marginTop: '95px', width: '100%', height: 'auto', backgroundColor: 'black'}}>
                            {Data.menus.map((menu, index) =>
                                menu.text === this.props.menu.text ?
                                (<div key={index} className="selectpanel1">
                                    <div className="Lselecticon">{menu.icon}</div><Link to={'/'+ menu.link} className="clickmenu" >{menu.text}</Link>
                                </div>) :
                                (<div key={index} className="unselectpanel1">
                                    <div className="Lselecticon">{menu.icon}</div><Link to={'/'+ menu.link} className="clickmenu" >{menu.text}</Link>
                                </div>)
                            )}
                        </div>

                    </Modal>
                </div>    
            </header>
        );
    }
}
// addopen: addOpen,
const mapDispatchToProps = { addopen: addOpen, logout:Logout};
const mapStateToProps = ({Auth}) => {
    let {userName} = Auth;
    return {userName}
};
Header = connect(mapStateToProps,mapDispatchToProps)(Header);
export default Header;
