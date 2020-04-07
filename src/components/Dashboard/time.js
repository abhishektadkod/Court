import React from 'react'
import ReactTimeout from 'react-timeout'
import Confetti from 'react-confetti'
 
class Clock extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            on: false,
        }
     this.toggle = this.toggle.bind(this);
    }
  toggle = () => {
    this.setState({ on: true });
    setTimeout(function() { //Start the timer
        this.setState({on: false}) //After 1 second, set render to true
    }.bind(this), 4000)
  }

  render () {
    const height=window.height;
    const width=window.width;
    const a=(<Confetti
        width={width}
        height={height}
        />);
    return (
      <div>
        <button onClick={this.props.jh=="d"?this.toggle:null}>Click me!</button>
        {this.props.jh=="d"?this.toggle:null}
        {this.state.on?a:null}
      </div>
    )
  }
}
export default ReactTimeout(Clock)