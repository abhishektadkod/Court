import React, { Component } from 'react'

export class Register extends Component {
    constructor(props){
        super(props);
        this.state={value: 'selectcasetype',
        casedescription:''};

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
            </div>
            
        )
    }
}

export default Register