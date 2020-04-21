import React, { Component } from 'react'
import axios from 'axios'

 
export class LawyerList extends Component {
   constructor(props){
       super(props);
       this.state={
           value: "",
           description:'',
           users:[],
           v:'',
           search:'',
           select:'',
           c:'',
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
    let url = 'http://127.0.0.1:4000/client/advocate';
    const client= this.props.clients._id;
    const cases=this.props.caseid;
    //alert(cases);
     axios.post(url,
         {
             "client_id": client,
             "lawyer_id": this.state.v._id,
             "caseid":cases,

         },
         {withCredentials: true})
         .then(response=> {
             console.log(response.data);
             this.props.animation();
         })
         .catch(error=> {
             console.log("error in adding case", error)
         });
         event.preventDefault();
    
}
 
   componentDidMount() {
       let url = `http://localhost:4000/lawyer`;
       axios.get(url).then(response => response.data)
       .then((data) => {
         this.setState({ users: data })
         console.log(this.state.users);
         
        })
     }
 

   render() {
 
       
    let filteredUsers= this.state.users.filter(
        (user) =>{
            if(this.state.select== "Civil Case" || this.state.select=="Criminal Case" || this.state.select=="Enforcement Case" || this.state.select=="Estate administration case")
                return(user.type.toLowerCase().indexOf(this.state.select.toLowerCase())!== -1);
            if(user.username.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1)
                return(user.username.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1)
        }
    );


 
       return (
 
           <div className="container p-3 my-3 ">
               {this.props.caseid}
              
           <div className="display-4"><b>Select a Lawyer for your case</b></div><br/><br/>
            <div className="row">
           <div className="col-md-6">
               <input type="text" placeholder="Enter Lawyer name" name="search" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
           </div>
 
           <div className="col-md-6">
               <select name="select" value={this.state.select} onChange={this.filterSearch.bind(this)}>
                   <option selected>Select lawyer's domain</option>
                   <option value="Civil Case">Civil cases</option>
                   <option value="Criminal Case">Criminal cases</option>
                   <option value="Enforcement Case">Enforcement cases</option>
                   <option value="Estate administration case">Estate administration cases</option>
               </select>
           </div>
           </div>
 
 
           {/* <div>
           <input type="text" placeholder="Enter lawyer to be searched" onChange={(e)=>this.searchSpace(e)} />
               {items}
           </div> */}
                      
          
           <div class="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
           <div class="modal-dialog modal-dialog-centered" role="document">
               <div class="modal-content">
               <div class="modal-header">
                   <h5 class="modal-title" id="exampleModalCenterTitle">Final call</h5>
                   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                   </button>
               </div>
               <div class="modal-body">
                  You have chosen {this.state.v.username} as your lawyer<br/>
                  (seriously?)
               </div>
               <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                   <button type="button" class="btn btn-primary" onClick={this.handleSubmit} data-dismiss="modal" >Save changes</button>
               </div>
               </div>
           </div>
           </div>
           <div className="container">
               <div className="col-xs-8">
               <br/><br/>
               {filteredUsers.map((user) => (
               <div className="card">
               <div className="card-body">
                   <h5 className="card-title">{user.username}</h5>
                   <h5 className="card-title">Type:{user.type}</h5>
                   <div className="btn btn-primary" data-toggle="modal" onClick={()=>this.setState({v:user})} data-target="#exampleModalCenter">Select</div>
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
 
export default LawyerList