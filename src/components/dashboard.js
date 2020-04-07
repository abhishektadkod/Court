import React, { Component } from 'react'
import axios from 'axios';
import Register from './Dashboard/register';
import LawyerList from './Dashboard/lawyerList';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             on:true,
             page:""
        }
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        
        this.changeview= this.changeview.bind(this);
        this.view= this.view.bind(this);
    }
    
    changeview()
    {
        this.setState({ on: false });
        console.log("hello");
    }
    view()
    {
        this.setState({ on: false });
        console.log("hello 2");
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

                        {(this.state.on)?<Register clients={this.props.User} changeview={this.changeview}/>:
                                        <LawyerList clients={this.props.User} changeview={this.view} animation={this.props.animation}/>}

                        {/* <div className="btn btn-danger" onClick={this.handleLogoutClick}>LOGOUT</div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
