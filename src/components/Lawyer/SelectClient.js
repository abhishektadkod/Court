
import React, { Component } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade';
import socketIOClient from "socket.io-client";

 
export class SelectClient extends Component {
   constructor(props){
       super(props);
       this.state={
           cases:'',
           loading:true,
           caseid:'',
           endpoint:'http://localhost:4001',
       }; 
       this.acceptRequest=this.acceptRequest.bind(this);
   }
 
   acceptRequest()
   {
    //post api updating lawyers ka cases(cid in lawyers)
      
        axios.post("http://localhost:4000/lawyer/select/"+this.props.User._id,
            {
                "caseid": this.state.caseid._id
            },
            {withCredentials: true})
            .then(response=> {
                console.log(response);
                this.props.animation();
            })
            .catch(error=> {
                console.log("error in adding case", error)
            });
          
    // => updating cases ka selected attribute from 0 to 1
   }

   componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit("lawyerid",this.props.User._id);
        socket.on("F", data => {console.log(data[0].selected);this.setState({ cases: data,loading:false});});
        socket.on("disconnect", data => this.setState({ response: "server disconnected!"}));
    }
     
 
   render() {
    if(this.state.loading){
        return (
            <div className="container">
              Loading....
            </div>
            
        )
        }
        else{
    return(
        <div className="container p-3 my-3" style={{fontFamily:"FreeMono, monospace",fontVariant:"small-caps",fontSize:"45px"}}>
            {this.props.User._id}
            <div className="display-4" style={{color:"#391463"}}>CASE REQUESTS</div><br/>
            {this.state.cases.filter(u=>!u.selected).map((user) => (
                <div>
                   
        <div className="row p-3 v" style={{color: "white",backgroundColor:"#7703fc"}}>
        <Fade right>
        <div className="col-md-8">
            <h4>Case Type:{user.case_type}</h4>
            <button className="btn btn-outline-light" data-toggle="collapse" data-target="#demo">Case Description</button>
            <div id="demo" class="collapse">{user.case_description}</div>
        </div>
        
        <div className="col-md-4 my-3">
        <div className="btn btn-warning" data-toggle="modal" onClick={()=>this.setState({caseid:user})} data-target="#exampleModalCenter">Select</div>
        </div>
        </Fade>
        </div>
        <br/><br/>
      
        </div>
        ))}
        <div class="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{fontSize:"25px"}}>
           <div class="modal-dialog modal-dialog-centered" role="document">
               <div class="modal-content">
               <div class="modal-header">
                   <h5 class="modal-title" id="exampleModalCenterTitle">Final call</h5>
                   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                   </button>
               </div>
               <div class="modal-body">
                  You have chosen {this.state.caseid._id} as your client<br/>
               </div>
               <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                   <button type="button" class="btn btn-primary" onClick={this.acceptRequest} data-dismiss="modal" >Save changes</button>
               </div>
               </div>
           </div>
           </div>
           
        </div>
    );
   }
}
}
 
export default SelectClient