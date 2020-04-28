import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import socketIOClient from "socket.io-client";
import { SOCKETIO_SERVER } from '../../config';

export class Notify extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            value: 'selectcasetype',
            casedescription:[],
            endpoint:SOCKETIO_SERVER+'/client'};
    }



    // componentDidMount(){
    //     axios.get(SERVER_URL+'/client/select/'+this.props.User._id,{ withCredentials: true })
    //            .then(response=>{
    //                console.log(response.data);
    //            })
    //            .catch(error=>{
    //                console.log("get request error 101",error);
    //            })
    // }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint+'/'+this.props.User._id);
        socket.emit("clientid",this.props.User._id);
        socket.on("F", data => {
            
            if(data.length===0){ 
            }
            else{
            console.log(data[0]);
            this.setState({casedescription:data,loading:false});
            }
        });
        socket.on("disconnect", data => this.setState({ response: "server disconnected!"}));
        
    }

    render() {
        if(this.state.loading===true && this.state.casedescription===[]){
            return(
                <div>
                    Loading...
                </div>
            )
        }
        else{
        return (
            <div className="container p-3 my-3  mx-auto">
                <div style={{textAlign:"center"}}>
               <div className="btn btn-outline-info"><div className="display-4"> Notifications!</div></div><br/><br/>
               </div>
                <div className="container">
                    {this.state.casedescription.filter(u=>u.selected).map((user)=>
                    <div>
                    

                    <div className="row p-3 v" style={{color: "white",backgroundColor:"#7703fc"}}>
                <Fade right>
                <div className="col-md-8">
                    <h4>Accepted lawyer Name:<b>{user.accepted_lawyer.username}</b></h4><br/>
                    <button className="btn btn-outline-light" data-toggle="collapse" data-target="#demo">Case Id:{user._id}</button><br/><br/>
                    <div >Case Description:<b>{user.case_description}</b></div>
                    <div >Case Type:<b>{user.case_type}</b></div>
                </div>
                
                </Fade>
                 </div>

                    </div>
                    )}

                </div>

            </div>
            
        )
    }
}
}

export default Notify