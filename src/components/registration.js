import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password_confirmation: "",
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
      
    const { user, password, password_confirmation } = this.state;

    axios
        .post('http://127.0.0.1:4000/client/add', 
            {
                "username":user,
                "pass":password,
                "repass":password_confirmation
            }
			,
        { withCredentials: true }
      )
      .then(response => {
        if (response.status === 200) {
            this.props.handleLogin();
            this.props.history.push("/dash");
            
        }
       
        console.log(response.data)
      })
      .catch(error => {
        console.log("registration error", error);
        if(error.response.status===420)
        this.setState({
            registrationErrors:"Enter correct Password!"
          });
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="user"
            placeholder="username"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button><br/>

          <div className="btn btn-info">{this.state.registrationErrors}</div>

        </form>
      </div>
    );
  }
}