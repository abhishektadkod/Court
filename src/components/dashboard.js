import React, { Component } from 'react'
import Sidebar from './sidebar'
import Home from './home'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-2 bg-dark">
                            <Sidebar/>
                        </div>
                        <div class="col-md-10">
                            <Home/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
