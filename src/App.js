import './App.css';
import ReactDOM from 'react-dom'
import React, { Component } from "react";
import { BrowserRouter, Switch, Route ,Link} from "react-router-dom";
import Dashboard from './components/dashboard';
import Home from './components/home';
import Registration from './components/registration';
import Login from './components/login';
import axios from 'axios';
import Notify from './components/Dashboard/notify';



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
      user:{}
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
    if( this.state.loggedInStatus==="NOT_LOGGED_IN")
    {
    return (
      <div className="app" >
        
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
    else
    {
      return (
        <div className="app" >
       
          
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
                <div className="nav-link"><Link to="/dash">Registered cases</Link></div>
                </li>

                <li className="nav-item">
                <div className="nav-link"><Link to="/dash">History of hearings</Link></div>
                </li>

                <li className="nav-item">
                <div className="nav-link" onClick={this.handleLogout}>Logout</div>
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
