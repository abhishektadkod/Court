import React, { Component } from "react";
import axios from "axios";
import {Fade} from 'react-reveal';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
      
    const { user, password } = this.state;

    axios
        .post('http://127.0.0.1:4000/client/login', 
            {
                "username":user,
                "pass":password
            }
			,
        { withCredentials: true }
      )
      .then(response => {
        if (response.status === 200 ) {
          this.props.handleLogin();
            this.props.history.push("/dash");
        }
       
        console.log(response.data)
      })
      .catch(error => {
        console.log("registration error", error);
        //if(error.response.status===420)
        this.setState({
            registrationErrors:"Enter correct Password!"
          });
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Fade top opposite cascade>
            <div className="display-4">Login Form</div><br/>
            </Fade>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="user"
            placeholder="Enter username"
            value={this.state.email}
            onChange={this.handleChange}
            required
          /><br/>

          <input
            type="text"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          /><br/>

          

         

        <button className="btn btn-primary" type="submit">Login</button><br/>

        <h2><span className="badge badge-secondary">{this.state.registrationErrors}</span></h2>
        </form>
      </div>
    );
  }
}