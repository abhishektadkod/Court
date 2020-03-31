import React, { Component } from 'react'
import axios from 'axios';
import Register from './Dashboard/register';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    
    handleLogoutClick() {
        
        axios
          .get("http://localhost:4000/client/logout", { withCredentials: true })
          .then(response => {
            this.props.loggedOut();
            this.props.history.push("/");
          })
          .catch(error => {
            console.log("logout error", error);
          });
      }
      
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="">
                        
                        <h1>Status: {this.props.loggedInStatus}</h1><br/>
                        
                        <h1>Username: {this.props.User.username}</h1><br/>
                        {this.props.location.pathname}

                        <Register/>

                        <div className="btn btn-danger" onClick={this.handleLogoutClick}>LOGOUT</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
