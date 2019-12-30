import React from 'react';
import { Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';

import routes from './routes';

import Login from '../containers/Login';
import '../assets/css/index.css';
import { connect } from 'react-redux';
import { 
    getData,
    verifyToken,
} from '../actions';
import profilephoto from '../assets/images/Loading.gif';
class Prong extends React.Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    componentDidMount() {
        const tokensession = localStorage.getItem('GSOtoken');
        if (tokensession !== null && tokensession !== undefined && tokensession !== "Token undefined"){
            if (this.props.token !== tokensession){
                this.props.verifyToken(tokensession);
            }
        }
    }

    render() {

        const {location} = this.props;
        const tokensession = localStorage.getItem('GSOtoken');

        if (location.pathname === '/') {
            if (tokensession === undefined || tokensession === null || tokensession === "Token undefined"){
                return ( <Redirect to={'/login'}/> );
            }
            else if (this.props.token !== tokensession){
                return(
                    <div >
                        <img
                            src={profilephoto}
                            alt="user"
                            className="loading-circle"
                            width="26"
                            style={{position: 'absolute', left: '50%', top: '43%'}}
                        />
                    </div>
                );
            }
            else{
                return ( <Redirect to={'/login'}/> );
            }
        }


        if (location.pathname !== '/login' && this.props.token === '' && tokensession === 'Token '){
            return ( <Redirect to={'/login'}/> );
        }
        if (location.pathname !== '/login' && this.props.token === tokensession& tokensession !== 'Token '){
            this.props.getAllData();
        }
        
        return (
            <div className="body"> 
                <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    {tokensession === null ?
                        (
                        <Redirect to={'/login'}/>
                        ) : (
                            routes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => (
                                    <route.component {...props} />
                                )} />
                            ) : (null);
                            })
                    )}
                </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = ({Auth}) => {
    const {
      userName,
      token,
    } = Auth;
    return {
      userName,
      token,
    }
};
const mapDispatchToProps = { 
  getAllData: getData,
  verifyToken: verifyToken
};
Prong = connect(mapStateToProps, mapDispatchToProps)(Prong)
export default Prong;
