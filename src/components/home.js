import React, { Component } from 'react'


export class Home extends Component {
    render() {
        return (
            <div>
                COURT CASE MANAGEMENT<br/>
                 {this.props.loggedInStatus==="LOGGED_IN"?1:0}  
                <div className="btn btn-primary" onClick={()=>this.props.history.push("/register")}>REGISTER</div>
                
                <div className="btn btn-primary" onClick={()=>this.props.history.push("/login")}>LOGIN</div>
            </div>
        )
    }
}

export default Home
