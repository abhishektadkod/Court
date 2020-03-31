import React, { Component } from 'react'
import axios from 'axios'

export class Register extends Component {
    constructor(props){
        super(props);
        this.state=
        {
            value: 'selectcasetype',
            casedescription:'',
            users:[],
            v:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.setState({casedescription: event.target.casedescription});
    }

    handleSubmit(event) {
        alert('Your case type is: ' + this.state.value);
        event.preventDefault();
    }

    componentDidMount() {
        const url = `http://localhost:4000/lawyer`;
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ users: data })
          console.log(this.state.users)
         })
      }

    render() {
        return (
            <div>
                <b>Adding a Case</b>
            <form className="mx-auto d-block" onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label>Case Type:
                <select className="form-control" value={this.state.value} onChange={this.handleChange} required>
                <option value="selectcasetype">Select case type</option>
                <option value="civilcase">Civil case</option>
                <option value="criminalcase">Criminal case</option>
                <option value="enforcementcase">Enforcement case</option>
                <option value="estatecase">Estate administration case</option>
                </select>
            </label>
            </div>

            <div className="form-group">
                <label>Case Description</label>
                <input
                    type="text"
                    value={this.state.casedescription}
                    onChange={this.handleChange}
                    name="description"
                    className="form-control"
                    placeholder="Enter case description"
                    required
                />
            </div>


            <button className="btn btn-primary" type="submit" value="Submit">Add Case</button><br/>
 
            </form>
                        
            
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Final call</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                   You have chosen {this.state.v} as your lawyer<br/>
                   (seriously?)
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" >Save changes</button>
                </div>
                </div>
            </div>
            </div>
            <div className="container">
                <div className="col-xs-8">
                <h1>Lawyer List</h1>
                {this.state.users.map((user) => (
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{user.username}</h5>
                    <h5 className="card-title">Type:{user.type}</h5>
                    <div className="btn btn-primary" data-toggle="modal" onClick={()=>this.setState({v:user.username})} data-target="#exampleModalCenter">Select</div>
                    <h6 className="card-subtitle mb-2 text-muted">
                    {user.email}             
                    </h6>
                    </div>
                </div>
                ))}
                </div>
            </div>
            </div>
            
        )
    }
}

export default Register