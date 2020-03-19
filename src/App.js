
import './App.css';

import ReactDOM from 'react-dom'
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from './components/dashboard';

class App extends Component {
  constructor() {
    super();

    this.state = {
      
    };

    
  }



  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
          
          <Route
              exact
              path={"/dash"}
              render={props => (
                <Dashboard
                  {...props}
                />
              )}
            />
           
           
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));




export default App;
