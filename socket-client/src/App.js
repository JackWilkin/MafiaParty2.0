import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://2601:18e:c401:aa1:e4c1:f8b4:bc41:494f:4001",
      
      ///
      color: 'white'
      ///
      
    };
  }

  // sending sockets
  send = () => {
    debugger;
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('change color', this.state.color) 
  }

  test = () => {
    debugger;
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('add player', this.state.color) 
  }
  
  // adding the function
  setColor = (color) => {
    this.setState({ color })
  }

  render() {
    // testing for socket connections

    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (col) => {
      debugger;
      document.body.style.backgroundColor = col
    });

    socket.on('add player', (player) => {
      debugger;
      document.getElementById("text").innerHTML = "New text!";
    });


    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send() }>Change Color</button>
        <button onClick={() => this.test() }>Change Text</button>
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
        <p id="text">hey</p>
      </div>
    )
  }
}
export default App;