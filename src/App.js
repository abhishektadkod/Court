import './App.css';
import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter, Switch, Route ,Link} from "react-router-dom";
import { Provider } from 'react-redux'
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

// Files which are not required anymore:
// ./Client/time.js,
// ./Lawyer/App.js,
// ./Lawyer/Dashboard.js
// ./Lawyer/Home.js

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
    store.dispatch( setType({ payload:data.Usertype }) );
    console.log(store.getState().typeOfUser);
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user:{}
    });
    store.dispatch( setType({ payload:"none"}) );
    console.log(store.getState().typeOfUser);
  }

  handleLogoutClick() {
    const a=store.getState().typeOfUser.payload;
    const b=a==1?"client":"lawyer"
    axios
      .get("http://localhost:4000/"+b+"/logout", { withCredentials: true })
      .then(response => {
        this.handleLogout();
        window.location.href="/";
        
      })
      .catch(error => {
        console.log("logout error", error);
      });
    if(b==="client"){
      localStorage.removeItem("clientdash");
    }
  }

  checkLoginStatus() {
    console.log(store.getState().typeOfUser);
    const a=store.getState().typeOfUser.payload;
    const b=a==1?"client":"lawyer"
    axios
      .get("http://localhost:4000/"+b+"/logged", { withCredentials: true })
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
      })
      .catch(error => {
        console.log("check login error", error);
      });

  }

  componentDidMount() {
     this.checkLoginStatus();
     store.subscribe(() => console.log('Look ma, Redux!!'));   
  }


  render() {

    const navlist=[
      {'name':'Home','path':'/'},
      {'name':'Register','path':'/register'},
      {'name':'Login','path':'/login'},
      {'name':'Lawyer','path':'/lawyer'},
    ];

    const navlistafter=[
      {'name':'Home','path':'/dash'},
      {'name':'My Profile','path':'/dash'},
      {'name':'Register a case','path':'/case'},
      {'name':'Registered Cases','path':'/viewcases'},
      {'name':'History of hearings','path':'/dash'},
    ];

    const routecomponents=[
      {'Component':Home,'path':'/'},
      {'Component':Registration,'path':'/register'},
      {'Component':Login,'path':'/login'},
      {'Component':Dashboard,'path':'/dash'},
    ];
    const height=window.height;
    const width=window.width;
    const a=(
    <Confetti
        width={width}
        height={height}
     />);

    if( this.state.loggedInStatus==="NOT_LOGGED_IN")
    {
      return (
          <div className="app" >

          {this.state.on?a:null}
      
            <BrowserRouter>
            
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                  <div className="navbar-brand" ><div className="display-4">COURT CASE MANAGEMENT</div></div>
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                  {navlist.map((item) =>   
                    <li className="nav-item active">
                    <div className="nav-link"><Link to={item.path}>{item.name}</Link></div>
                    </li>  
                    )}

                  </ul>

                </div>
            </nav>

              <Switch>

              {routecomponents.map(({Component:C,path}) =>   
                   <Route
                   exact
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


                <Route
                  exact
                  path={"/lawyer"}
                  render={props => (
                    <LawyerLogin
                      {...props}
                       handleLogin={this.handleLogin}
                       animation={this.toggle}
                       loggedInStatus={this.state.loggedInStatus}
                       User={this.state.user}
                    />
                  )}
                />


              </Switch>

            </BrowserRouter>

          </div>
      );
    }
    else
    {
      
      if(this.state.user.Usertype===1)
      {
        return (
            <div className="app" >
            {this.state.on?a:null}

              <BrowserRouter>

              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                  <div className="navbar-brand"><div className="display-4">COURT CASE MANAGEMENT</div></div>
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">


                  {navlistafter.map((item) =>   
                      <li className="nav-item active">
                      <div className="nav-link"><Link to={item.path}>{item.name}</Link></div>
                      </li>  
                      )}

                    <li className="nav-item">
                    <div className="nav-link" onClick={this.handleLogoutClick}>Logout</div>
                    </li>
                  </ul>

                </div>
              </nav>

                <Switch>

                <Route
                    exact
                    path={"/dash"}
                    render={props => (
                      <Notify
                        {...props}
                        loggedInStatus={this.state.loggedInStatus}
                        User={this.state.user}
                        loggedOut={this.handleLogout}
                        animation={this.toggle}
                      />
                    )}
                  />

                  <Route
                    exact
                    path={"/case"}
                    render={props => (
                      <Dashboard
                        {...props}
                        loggedInStatus={this.state.loggedInStatus}
                        User={this.state.user}
                        loggedOut={this.handleLogout}
                        animation={this.toggle}
                      />
                    )}
                  />

                  <Route
                    exact
                    path={"/viewcases"}
                    render={props => (
                      <Viewcase
                      User={this.state.user}
                        {...props}
                      />
                    )}
                  />


                </Switch>

              </BrowserRouter>

            </div>
        );
      }
      else{
        return (
          <div className="app" >
    
            {this.state.on?a:null}
    
              <BrowserRouter>
   
    
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                  <div className="navbar-brand"><div className="display-4">COURT CASE MANAGEMENT</div></div>
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                    <div className="nav-link"><Link to="/dash">Home</Link></div>
                    </li>
    
                    <li className="nav-item">
                    <div className="nav-link"><Link to="/dash">My profile</Link></div>
                    </li>
    
                    <li className="nav-item">
                    <div className="nav-link"><Link to="/dash">History of hearings</Link></div>
                    </li>
    
                    <li className="nav-item">
                    <div className="nav-link" onClick={this.handleLogoutClick}>Logout</div>
                    </li>
                  </ul>
    
                </div>
              </nav>
    
              <Switch>
    
              <Route
                    exact
                    path={"/dash"}
                    render={props => (
                      <SelectClient
                        {...props}
                        loggedInStatus={this.state.loggedInStatus}
                        User={this.state.user}
                        loggedOut={this.handleLogout}
                        animation={this.toggle}
                      />
                    )}
                  />
    
    
    
              </Switch>
              </BrowserRouter>
          
          </div>
        );
      }
    }
  }
}



export default App;