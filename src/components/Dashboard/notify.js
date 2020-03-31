import React, { Component } from 'react'

export class Notify extends Component {
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
            <div className="container p-3 my-3 text-white mx-auto">
                <div style={{textAlign:"center"}}>
               <div className="btn btn-outline-info"><div className="display-4"> No Notifications!</div></div>
               </div>
               {this.props.location.pathname}
            </div>
            
        )
    }
}

export default Notify