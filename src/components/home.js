import React, { Component } from 'react'
import { MdAccountBalance } from "react-icons/md";


class Home extends Component {
    render() {

        return (
            <div>
                <div style={{textAlign:'center'}}>
                <MdAccountBalance color='purple' size='520px'/>
        
              
                <br/><br/>
                <button className="btn btn-outline-primary btn-lg" onClick={()=>this.props.history.push("/register")}>GET STARTED!</button>
                </div>

                
                
                 {this.props.loggedInStatus}  
                 &nbsp;
                {/* <div className="btn btn-primary" onClick={()=>this.props.history.push("/register")}>REGISTER</div>
                &nbsp;
                <div className="btn btn-primary" onClick={()=>this.props.history.push("/login")}>LOGIN</div> */}
            </div>
        )
    }
}

export default Home
