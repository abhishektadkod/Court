import React, { Component } from 'react'
import axios from 'axios';

export class Notify extends Component {
    constructor(props){
        super(props);
        this.state={value: '',loading:true}

        this.view_all = this.view_all.bind(this);

    }

        view_all(){
            axios
            .get("http://localhost:4000/client/case/"+this.props.User._id, { withCredentials: true })
            .then(response => {  
               
                this.setState({
                  value:response.data,
                  loading:false
                });
              
            })
            .catch(error => {
              console.log("check login error", error);
            });
    }

    componentDidMount(){
        this.view_all();
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
            return (
                <div className="container">
                    <br/><br/>

                  {this.state.value.map((user) => (
               <div className="card">
               <div className="card-body">
                   <h5 className="card-title">CLIENT ID:{user._id}</h5>
                   <h5 className="card-title">DATABASE CLIENT_ID:{user.client_id}</h5>
                  
                   <h5 className="card-title">CASE-TYPE:{user.case_type}</h5>
                   <h5 className="card-title">CASE-DESCRIPTION:{user.case_description}</h5>
                   <br/><br/>
                   LAWYERS CHOOSEN:<br/>{user.lawyer_id.map((u)=>(<h5>LAWYER-ID:{u}</h5>))}
                   <div className="btn btn-primary" data-toggle="modal" onClick={()=>this.setState({v:user})} data-target="#exampleModalCenter">Select</div>
                   <h6 className="card-subtitle mb-2 text-muted">
                   {user.email}            
                   </h6>
                   </div>
               </div>
               ))}
                </div>
                
            )
        }
    }
}

export default Notify
