import './App.css';
import ReactDOM from 'react-dom'
import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter, Switch, Route ,Link} from "react-router-dom";
import Confetti from 'react-confetti'


import Home from './components/home';
import Registration from './components/registration';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Notify from './components/Dashboard/notify';
import Viewcase from './components/Dashboard/ViewCase';



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

  handleLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });

  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user:{}
    });
  }

  handleLogoutClick() {
        
    axios
      .get("http://localhost:4000/client/logout", { withCredentials: true })
      .then(response => {
        this.handleLogout();
        window.location.href="/";
        
      })
      .catch(error => {
        console.log("logout error", error);
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
     
  }

  render() {

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
                    <li className="nav-item active">
                    <div className="nav-link"><Link to="/">Home</Link></div>
                    </li>
                    <li className="nav-item">

                    <div className="nav-link"><Link to="/register">Register</Link></div>
                    </li>
                    <li className="nav-item">
                    <div className="nav-link"><Link to="/login">Login</Link></div>
                    </li>
                  </ul>

                </div>
            </nav>

              <Switch>

              <Route
                  exact
                  path={"/register"}
                  render={props => (
                    <Registration
                      {...props}
                      handleLogin={this.handleLogin}
                      animation={this.toggle}
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
                      animation={this.toggle}
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
                  <div className="nav-link"><Link to="/case">Register a case</Link></div>
                  </li>

                  <li className="nav-item">
                  <div className="nav-link"><Link to="/viewcases">Registered cases</Link></div>
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
                      {...props}
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

ReactDOM.render(<App/>, document.getElementById('root'));

export default App;
