import React, { Component } from 'react'
import { MdAccountBalance } from "react-icons/md";
import '../App.css';

class Home extends Component {

    fun=()=>{
        //this.props.animation();
        this.props.history.push("/register");
    }
    render() {

        
        return (
            <div className="Home">
                <div style={{textAlign:'center'}}>
                <MdAccountBalance color='purple' size='520px'/>   
              
                <br/><br/>
                <button className="btn btn-outline-primary btn-lg" onClick={this.fun}>GET STARTED!</button>
                </div>

            </div>
        )
    }
}

export default Home
