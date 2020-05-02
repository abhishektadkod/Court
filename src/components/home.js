import React, { Component } from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap';
import ReactTypingEffect from 'react-typing-effect';
import '../App.css';
import '../Home.css'

const ReactTypingEffectDemo = () => {
    const text=["Legal Case", "Clients","Hearing Dates"];
    return (
      <ReactTypingEffect
        speed="100"
        eraseDelay="2000"
        cursor=""
        text={text} 
      />
    );
  };

class Home extends Component {
    

    fun=()=>{
        this.props.history.push("/register");
    }

    render() {
       
        
        return (
            <div className="home">

                {/* The big blue color thing */}
                <div className="container-fluid p-5 text-center" style={{backgroundColor:"#174185",color:"white"}}>
                    <div className="display-4">
                    One Solution, Endless Values
                    </div>
                    <br/>
                    <h4>A powerful <ReactTypingEffectDemo/> Management Software</h4><br/>
                     <button className="btn btn-outline-secondary btn-lg text-light" onClick={this.fun}>GET STARTED!</button>
                </div>

                <br/><br/><br/>

                 {/* The center one having three features explanation */}
                <div className="bot">
                    <div className="display-4 text-center">All the features you want</div>
                    <Container>
                        <Row>
                            
                            <Col md={4}>
                                <div className="mt-5 text-justify-distribute border border-secondary">
                                <h3 className="text-center">Case or Matter Management</h3>
                                <br/>
                                <h5 className="text-muted p-3">
                                Our case management system has made managing information easier than ever before.
                                Create a case in just a few seconds. The case will create its activity stream as you 
                                keep adding information, making updates and attaching documents. Everything comes together 
                                seamlessly to provide the big picture systematically.
                                </h5>
                                </div>
                            </Col>

                            <Col md={4}><br/><br/>
                                <div className="mt-5 text-justify-distribute border border-secondary">
                                <h3 className="text-center">Clients Management for Lawyers</h3>
                                <br/>
                                <h5 className="text-muted p-3">
                                Add any number of clients and their identifiable data. 
                                Organise client information in a structured way. 
                                Easily and accurately match each legal case with a client. 
                                </h5>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="mt-5 text-justify-distribute border border-secondary">
                                <h3 className="text-center">Hearing Dates Management</h3>
                                <br/>
                                <h5 className="text-muted p-3">
                                Identify in advance conflicts in hearing dates falling on the same day. 
                                Eliminate last-minute rush to courts. By getting intimated by our automated 
                                reminders well ahead of time, you can plan both your work, teamwork in an informed 
                                manner. Our legal management for hearing dates will make sure your schedules never clash.
                                </h5>
                                </div>
                            </Col>
                        </Row>
                        <br/><br/>
                    
                    </Container>
                </div>

                 {/* The last one  */}
                <div className="bot text-light bg-dark">
                    <Container fluid>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={3}>
                            <div className="mt-5 text-justify-distribute border border-primary"><br/>
                            <h3 className="text-center mt-2">ABOUT THE DEVELOPERS</h3>
                            <br/>
                            <h5 className="text-muted m-3">
                                We've had an amazing journey coming to where we are today. Feel free to reach out to us with any questions.
                                We are very friendly and always open to discussing new projects or interesting ideas.
                            </h5>
                            </div>
                        
                            </Col>
                            <Col md={6}>
                            <div className="m-5"><br/>
                                    <h3>CONTACT US!</h3>
                                    <br/>
                                    <div className="h4 text-muted">
                                        Abhishek Tadkod - 9148301122<br/>
                                        Humaid Desai - 8971252993<br/>
                                        Faraaz Khatib - 9164447799<br/>
                                    <ReactTypingEffect
                                            speed="100"
                                            eraseDelay="2000"
                                            cursor=""
                                            text={["Some similar kinda animation here (+ we are gonna implement few more things. stay tuned! 😎 "]} 
                                        />
                                    </div>
                            </div>
                            </Col>
                        </Row><br/>
                    <div className="text-center h6"> 2020 CCM - all rights reserved</div>
                    </Container>
                </div>
               
            </div>
        )
    }
}

export default Home
