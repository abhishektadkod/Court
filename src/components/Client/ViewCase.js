import React, { Component } from 'react'
import axios from 'axios';
import { SERVER_URL } from '../../config';
import LawyerList from './lawyerList';

export class Notify extends Component {
    constructor(props){
        super(props);
        this.state={value: '',loading:true}

        this.view_all = this.view_all.bind(this);

    }


        view_all(){
            axios
            .get(SERVER_URL+"/client/case/"+this.props.User._id, { withCredentials: true })
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
        console.log("Print id: " + this.props.match.params.id);
        this.view_all();
    }
    render() {
        if(this.state.loading){
        return (
            <div className="container">
             <div class="spinner-border text-center display-1"></div>
            </div>
            
        )
        }
        else{
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 p-5">
                            <div className="h4">REGISTERED CASES</div><br/>
                            <ul className="list-group">
            {this.state.value.map((ele,key)=>( <><a href={"/viewcases/"+ele._id} class="list-group-item list-group-item-action list-group-item-primary">Case {key+1}</a></>))}
                            </ul>
           
                        </div>

                        <div className="col-md-9">
                            <div className="container">
                            {this.props.match.params.id==='0'?<div className="display-1">Select a Case on the Left</div>:""}
                            {this.state.value.filter(u=>u._id===this.props.match.params.id).map((ele,key)=>(
                                <>
                                <div className="row" >
                                    <div className="p-5 border border-secondary">
                                    
                                    <div className="h3">
                                        
                                        <div>Case Number:{ele._id[10]}</div>   
                                        <div>Case Type:{ele.case_type}</div>
                                        <div>Case Description:{ele.case_description}</div><br/>
                                        {ele.accepted_lawyer===undefined?
                                        <div className="btn btn-danger">{ele.lawyer_id.length===0?"Add a lawyer first":"No accepted Lawyers"}</div>:
                                        <>
                                        <div>Accepted Lawyer:{ele.accepted_lawyer.username}</div>
                                        <div><a href={"tel:"+ele.accepted_lawyer.phone}>Lawyer Phone number:{ele.accepted_lawyer.phone}</a></div>
                                        <div className="btn btn-outline-dark">Contact the lawyer</div>
                                        </>
                                        }
                                        <br/>
                                        
                                        
                                        
                                        
                                    </div>
                                    
                                    </div>

                                    <div className="p-5">
                                    <div className="display-4">Selected Lawyers</div>
                                        {ele.lawyer_id?ele.lawyer_id.map((ele)=>(<ul><li className="h3">{ele.username}</li></ul>)):""}
                                        <div className="btn btn-primary" data-toggle="modal" data-target="#myModal">ADD MORE LAWYERS</div>
                                        
                                        <div class="modal" id="myModal">
                                            <div class="modal-dialog">
                                            <div class="modal-content">
                                            
                                                
                                                <div class="modal-header">
                                                <h4 class="modal-title"></h4>
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                </div>
                                                

                                                <div class="modal-body">
                                                <LawyerList clients={this.props.User} caseid={ele._id} animation={this.props.animation}/>
                                                </div>
                                                
                                                
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                                </div>
                                                
                                            </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>

                                <hr style={{color:"#333"}}/>

                                <div className="row">
                                    <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                <a class="btn btn-outline-dark p-4 active"  data-toggle="tab" href="#demo1">NOTIFICATIONS</a>&nbsp;
                                </li>
                                <li class="nav-item">
                                <a class="btn btn-outline-dark p-4"  data-toggle="tab" href="#demo2">DOCUMENTS</a>&nbsp;
                                </li>
                                <li class="nav-item">
                                <a class="btn btn-outline-dark p-4"  data-toggle="tab" href="#demo3">HEARINGS</a>&nbsp;
                                </li>
                                    </ul>
                                </div>
                                
                                <br/><br/>

                                <div class="tab-content">
                                <div id="demo1" class="container tab-pane active display-1">
                                    No Notifications
                                </div>
                                <div id="demo2" class="container tab-pane fade display-1">
                                    No Documents Attached
                                </div>
                                <div id="demo3" class="container tab-pane fade display-1">
                                    No Hearing Dates Announced
                                </div>
                                </div>
                                </>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                
            )
        }
    }
}

export default Notify
