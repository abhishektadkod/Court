import React, { Component } from 'react'
import { MdAccountBalance } from "react-icons/md";
 
class Home extends Component {
 
   fun=()=>{
       //this.props.animation();
       this.props.history.push("/login");
   }
   render() {
 
      
       return (
           <div>
               <div style={{textAlign:'center'}}>
               <MdAccountBalance color='purple' size='520px'/>
      
            
               <br/><br/>
               <button className="btn btn-outline-primary btn-lg" onClick={this.fun}>LOGIN</button>
               </div>
 
              
              
                 
                &nbsp;
               {/* <div className="btn btn-primary" onClick={()=>this.props.history.push("/register")}>REGISTER</div>
               &nbsp;
               <div className="btn btn-primary" onClick={()=>this.props.history.push("/login")}>LOGIN</div> */}
           </div>
       )
   }
}
 
export default Home
