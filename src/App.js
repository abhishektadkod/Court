import './App.css';
import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter, Switch, Route ,Link} from "react-router-dom";
import Confetti from 'react-confetti'

import store from './redux/store'
import { setType } from './redux'

import Home from './components/home';
import Registration from './components/registration';
import Login from './components/login';
import LawyerLogin from './components/Lawyer/Login';

import Dashboard from './components/Client/dashboard';
import Notify from './components/Client/notify';
import Viewcase from './components/Client/ViewCase';

import SelectClient from './components/Lawyer/SelectClient';

import { SERVER_URL } from './config';
import Navigation from './Navigation';


const height=window.height;
const width=window.width;
const a=(
    <Confetti
        width={width}
        height={height}
     />);

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      on: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({ on: true });
    setTimeout(function() { 
        this.setState({on: false}) 
    }.bind(this), 4000)
  }

  handleLogin(data) {
    //alert(data.username);
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user:data,
    });
    store.dispatch( setType({ payload:data.Usertype ,userid:data._id}) );
    console.log(store.getState().typeOfUser);
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user:{}
    });
    store.dispatch( setType({ payload:"none",userid:""}) );
    console.log(store.getState().typeOfUser);
  }

  handleLogoutClick() {
    const a=store.getState().typeOfUser.payload;
    const b=a===1?"/client":"/lawyer"
    axios
      .get(SERVER_URL+b+"/logout/"+this.state.user._id, { withCredentials: true })
      .then(response => {
        this.handleLogout();
        window.location.href="/";
        
      })
      .catch(error => {
        console.log("logout error", error);
      });
    if(b==="/client"){
      localStorage.removeItem("clientdash");
    }
  }

  checkLoginStatus() {
    console.log(store.getState().typeOfUser);
    
    const a=store.getState().typeOfUser.payload;
    //const b=a==1?"client":"lawyer
    let b;
    if(a===1){b="/client";}
    else if(a===0){b="/lawyer";}
    else {b="";}
    axios
      .get(SERVER_URL+b+"/logged/"+store.getState().typeOfUser.userid, { withCredentials: true })
      .then(response => {

        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {

          console.log(response);
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          });
          
        } else if (
          !response.data.logged_in &&
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          console.log(response);
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
        else{
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });

  }

  componentDidMount() {
     this.checkLoginStatus();
  }


  render() {

    const navlist=[
      {'name':'Home','path':'/'},
      {'name':'Register','path':'/register'},
      {'name':'Login','path':'/login'},
      {'name':'Lawyer','path':'/lawyer'},
    ];

    const navlistforclient=[
      {'name':'Home','path':'/dash'},
      {'name':'My Profile','path':'/dash'},
      {'name':'Register a case','path':'/case'},
      {'name':'Registered Cases','path':'/viewcases/0'},
      {'name':'History of hearings','path':'/dash'},
      {'name':'Logout','path':'/logout','click':this.handleLogoutClick},
    ];

    const navlistforlawyer=[
      {'name':'Home','path':'/dash'},
      {'name':'My Profile','path':'/dash'},
      {'name':'History of hearings','path':'/dash'},
      {'name':'Logout','path':'/logout','click':this.handleLogoutClick},
    ];

    const routecomponents=[
      {'Component':Home,'path':'/'},
      {'Component':Registration,'path':'/register'},
      {'Component':Login,'path':'/login'},
      {'Component':Dashboard,'path':'/dash'},
      {'Component':LawyerLogin,'path':'/lawyer'},
    ];

    const routecomponentsclient=[
      {'Component':Home,'path':'/'},
      {'Component':Notify,'path':'/dash'},
      {'Component':Dashboard,'path':'/case'},
      {'Component':Viewcase,'path':'/viewcases/:id'},
    ];

    const routecomponentslawyer=[
      {'Component':SelectClient,'path':'/dash'},
    ];

    
     let navigation;
     let routing;

     if( this.state.loggedInStatus==="NOT_LOGGED_IN"){
       navigation=navlist;
       routing=routecomponents;
      }

     else{
        if(this.state.user.Usertype===1){
          navigation=navlistforclient;
          routing=routecomponentsclient;
        }

        else{
          navigation=navlistforlawyer;
          routing=routecomponentslawyer;
        }
      }

      return(
          <div className="app" >

            {this.state.on?a:null}
        
              <BrowserRouter>

                <Navigation 
                    content={navigation.map((item,index) =>   
                      <li className="nav-item active" key={index}>
                        <div className="nav-link" onClick={item.click}>
                          <Link className="links" style={{ textDecoration: 'none'}} to={item.path}>{item.name}</Link>
                          
                        </div>
                      </li>  
                  )}/>

                <Switch>

                  {routing.map(({Component:C,path},index) =>   
                      <Route
                      exact
                      key={index}
                      path={path}
                      render={props => (
                        <C
                          {...props}
                          handleLogin={this.handleLogin}
                          animation={this.toggle}
                          loggedInStatus={this.state.loggedInStatus}
                          User={this.state.user}
                        />
                      )}
                    />  
                  )}

                </Switch>

              </BrowserRouter>

          </div>
      ); 
  }
  
}

export default App;