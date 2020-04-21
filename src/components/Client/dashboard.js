import React, { Component } from 'react'
import axios from 'axios';
import Register from './register';
import LawyerList from './lawyerList';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             on:true,
             caseid:"",
        }
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        
        this.changeview= this.changeview.bind(this);
    }
    
    changeview(data)
    {
        this.setState({ on: false });
        this.setState({caseid:data});
        const a=JSON.stringify(this.state)
        localStorage.setItem('clientdash',a)
        console.log(data);
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
    
    componentDidMount(){
        console.log(this.state.on);
        const a=localStorage.getItem('clientdash')
        if(a===null){
            console.log(undefined);
        }
        else{
        this.setState(JSON.parse(a));    
        console.log(JSON.parse(a));
        }
    }  
    
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="">

                        {(this.state.on)?<Register clients={this.props.User} changeview={this.changeview}/>:
                                        <LawyerList clients={this.props.User} caseid={this.state.caseid} animation={this.props.animation}/>}

                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
