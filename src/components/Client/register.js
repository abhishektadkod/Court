import React, { Component } from 'react'
import axios from 'axios'
import { SERVER_URL } from '../../config';
 
export class Register extends Component {
   constructor(props){
       super(props);
       this.state={
           value: "",
           description:'',
           users:[],
           v:'',
           search:'',
           select:'',
           c:''
       };
 
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
 
   }
 
   updateSearch(event){
       this.setState({search: event.target.value});
   }
 
   filterSearch(event){
       this.setState({select: event.target.value})
   }
 
   handleChange(event) {
       this.setState({
           [event.target.name]: event.target.value
         });
   }
 
   handleSubmit(event) {
       let url = SERVER_URL+'/client/case';
       const client= this.props.clients._id;
        let case_type = this.state.c;
        let case_description= this.state.description;
        axios.post(url,
            {
                "client_id": client,
                "case_type": case_type,
                "case_description": case_description
            },
            {withCredentials: true})
            .then(response=> {
                console.log(response.data);
                this.props.changeview(response.data._id);
            })
            .catch(error=> {
                console.log("error in adding case", error)
            });
            event.preventDefault();
       
   }
 
   componentDidMount() {
       let url = SERVER_URL+'/lawyer';
       axios.get(url).then(response => response.data)
       .then((data) => {
         this.setState({ users: data })
         console.log(this.state.users);
         
        })
     }
 

   render() {
 
      
      
 
       return (
 
           <div className="container p-3 my-3 ">
               {}
               <div className="display-4">Adding a Case</div><br/>
           <form className="mx-auto d-block" onSubmit={this.handleSubmit}>
           <div className="form-group">
           <label>Case Type:
               <select className="form-control" name="c" value={this.state.c} onChange={this.handleChange} required>
               <option selected>Select case type</option>
               <option name="cc" value="civilcase">Civil case</option>
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
                   value={this.state.description}
                   onChange={this.handleChange}
                   name="description"
                   className="form-control"
                   placeholder="Enter case description"
                   required
               />
           </div>
 
 
           <button className="btn btn-primary" type="submit" value='Submit'/*onClick={this.addCase.bind(this)}*/>Add Case</button><br/>
           </form>

           </div>
          
       )
   }
}
 
export default Register