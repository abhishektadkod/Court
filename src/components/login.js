import React, { Component } from "react";
import axios from "axios";
import {Fade} from 'react-reveal';
import {Zoom} from 'react-reveal';

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
          this.props.handleLogin(response.data);
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
      <div className="container">
        <Zoom>
        <br/><br/><br/><br/>
      <div  className="row" style={{color:"#4a4538",backgroundColor:"#edebe6",fontSize:"30px",fontWeight:"lighter"}}>
      <div className="col-md-2"></div>
      <div className="col-md-8"><br/>
        <Fade top opposite cascade>
            <div className="display-4">Login Form</div><br/>
        </Fade>
        <form className="mx-auto d-block" onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label>Username:</label>
          <input
            type="text"
            name="user"
            placeholder="Enter username"
            className="form-control"
            value={this.state.email}
            onChange={this.handleChange}
            ref={input => input && input.focus()}
            required
          />
          </div><br/>
        <div className="form-group">
        <label>Password:</label>
          <input
            type="text"
            name="password"
            placeholder="Enter password"
            className="form-control"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          </div><br/>

          

         

        <button className="btn btn-primary" type="submit">Login</button><br/>

        <h2><span className="badge badge-secondary">{this.state.registrationErrors}</span></h2>
        </form>
        <br/>
      </div>
      </div>
      </Zoom>
      </div>
    );
  }
}