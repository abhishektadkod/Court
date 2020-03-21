import './App.css';
import ReactDOM from 'react-dom'
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './components/dashboard';
import Home from './components/home';
import Registration from './components/registration';
import Login from './components/login';
import axios from 'axios';


class App extends Component {
  constructor() {
    super()
    this.state = {      
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
  }

  handleLogout() {
    
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:4000/client/logged", { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
         
          console.log(response);
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user[0][0]
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
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
   }

  render() {
    return (
      <div className="app" >
        <BrowserRouter>
          <Switch>
          
          <Route
              exact
              path={"/register"}
              render={props => (
                <Registration
                  {...props}
                  handleLogin={this.handleLogin}
                />
              )}
            />

          <Route
              exact
              path={"/login"}
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                />
              )}
            />   
            <Route
              exact
              path={"/dash"}
              render={props => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  User={this.state.user}
                  loggedOut={this.handleLogout}
                />
              )}
            />

            <Route
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />   
             

           
      
      

           
           
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));




export default App;
