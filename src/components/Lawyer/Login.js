import React, { Component } from "react";
import axios from "axios";
import {Fade} from 'react-reveal';
import {Zoom} from 'react-reveal';
import { SERVER_URL } from "../../config";

 
export default class Login extends Component {
 constructor(props) {
   super(props);
 
   this.state = {
     phone: "",
     otp:"",
     val:"",
     view: false,
     registrationErrors: ""
   };
 
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleVerification = this.handleVerification.bind(this)
 }
 
 handleChange(event) {
   this.setState({
     [event.target.name]: event.target.value
   });
 }
 
 handleSubmit(event) {
    
   const mobile = this.state.mobile;
   const otp = this.state.otp;
  
 
   if(this.state.val===otp){
 
   axios
       .post(SERVER_URL+'/lawyer/login',
           {
               "phone":mobile,
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
       console.log("login error", error);
       //if(error.response.status===420)
       this.setState({
           registrationErrors:"Enter correct OTP!"
         });
     });
   }
   else{
     this.setState({registrationErrors:"Invalid OTP"});
   }
   event.preventDefault();
 }
 
 handleVerification(event){
   const { mobile } = this.state;
   axios
       .put(SERVER_URL+'/lawyer/login',
       {
         "phone":mobile
       }
       ,
       { withCredentials: true })
     .then(response => {
         this.setState({val:response.data.OTP});
         this.setState({view:true});
         console.log(response.data.OTP)
         //this.props.history.push("/login");
         this.setState({registrationErrors:""});
      
     
       console.log(response.data)
     })
     .catch(error => {
       console.log("user does not exist", error);
       //if(error.response.status===420)
       this.setState({
           registrationErrors:"Enter correct Mobile number!"
         });
     });
     if(this.state.view===false){
       event.preventDefault();
     }
    
 }
 
 
 render() {
   if(this.state.view===false){
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
         <form className="mx-auto d-block" >
         <div className="form-group">
         <label>Enter Registered Mobile Number:</label>
           <input
             type="text"
             name="mobile"
             placeholder="Enter mobile number"
             className="form-control"
             value={this.state.email}
             onChange={this.handleChange}
             required
           />
           </div><br/>
          <button className="btn btn-primary" onClick={this.handleVerification}>Send OTP</button><br/>
          <h2><span className="badge badge-secondary">{this.state.registrationErrors}</span></h2>
         </form>
         <br/>
       </div>
       </div>
       </Zoom>
       </div>
     );
 
   }
   else{
     return (
       <div className="container">
         <Zoom>
         <br/><br/><br/><br/>
       <div  className="row" style={{color:"#4a4538",backgroundColor:"#edebe6",fontSize:"30px",fontWeight:"lighter"}}>
       <div className="col-md-2"></div>
       <div className="col-md-8"><br/>
         <Fade top opposite cascade>
             <div className="display-4">OTP Verification</div><br/>
         </Fade>
         <form className="mx-auto d-block" onSubmit={this.handleSubmit}>
         <div className="form-group">
         <label>OTP:</label>
           <input
             type="text"
             name="otp"
             placeholder="Enter OTP"
             value={this.state.otp}
             onChange={this.handleChange}
             ref=""
             />
             {/* <OtpInput
             type="input"
             name="otp"
             value={this.state.otp}
             onChange={(event) => {this.setState({otp: event.target.value})}}
             numInputs={6}
             separator={<span>-</span>}
             /> */}
           </div><br/>
          <button className="btn btn-primary" type="submit">Verify</button><br/>
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
}
