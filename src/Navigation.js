import React, { Component } from 'react'
import { MdAccountBalance } from 'react-icons/md'

export class Navigation extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light">

                <div className="container" style={{textAlign:"center"}}>
                    <div className="display-4 "> 
                        <a href="/" style={{textDecoration:"none",color:"black"}}>
                        <MdAccountBalance/>
                        <span className="h5" style={{verticalAlign:"middle"}}>&nbsp;&nbsp;Court Case Management</span>
                        </a>
                    </div>
                </div>

                <button className="navbar-toggler ml-auto" style={{backgroundColor:"white"}} type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon pl-5" ></span>
                </button>
                    
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                     
                    <ul className="navbar-nav  ml-auto">
                        {this.props.content}
                    </ul>

                </div>
                
                </nav>
                <hr/>
            </div>
        )
    }
}

export default Navigation
